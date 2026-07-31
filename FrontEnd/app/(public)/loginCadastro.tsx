import { AuthHeader } from "@/components/AuthHeader";
import ButtonAzulPadrao from "@/components/buttonAzulPadrao";
import CardBranco from "@/components/CardBranco";
import { FundoAzul } from "@/components/fundoazul";
import { Screen } from "@/components/safearea";
import { ToastNotificacao } from "@/components/ToastNotificacao";
import { useAuth } from "@/context/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { z } from "zod";

type TabOption = "cadastrar" | "entrar";

// 🚀 SCHEMAS DE VALIDAÇÃO ZOD
const loginSchema = z.object({
  loginEmail: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Digite um e-mail válido"),
  loginPassword: z
    .string()
    .min(1, "A senha é obrigatória")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
});

const registerSchema = z
  .object({
    registerName: z
      .string()
      .min(1, "O nome é obrigatório")
      .min(3, "O nome deve ter no mínimo 3 caracteres"),
    registerEmail: z
      .string()
      .min(1, "O e-mail é obrigatório")
      .email("Digite um e-mail válido"),
    registerPassword: z
      .string()
      .min(1, "A senha é obrigatória")
      .min(6, "A senha deve ter no mínimo 6 caracteres"),
    registerConfirmPassword: z
      .string()
      .min(1, "A confirmação de senha é obrigatória"),
  })
  .refine((data) => data.registerPassword === data.registerConfirmPassword, {
    message: "As senhas não coincidem!",
    path: ["registerConfirmPassword"],
  });

export default function LoginCadastro() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<TabOption>("entrar");
  const [rememberMe, setRememberMe] = useState(false);

  // Estados de visibilidade das senhas
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estados dos formulários
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

  // 🚀 ESTADOS DE ERROS INDIVIDUAIS DOS CAMPOS (ZOD)
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 🚀 ESTADO DO TOAST DE NOTIFICAÇÃO
  const [toast, setToast] = useState<{
    mensagem: string;
    tipo: "sucesso" | "erro";
    mostrar: boolean;
  }>({
    mensagem: "",
    tipo: "sucesso",
    mostrar: false,
  });

  const { salvarSessao } = useAuth();

  const activeShadow: ViewStyle = {
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  };

  // Alternar abas limpando erros anteriores
  const handleTabChange = (tab: TabOption) => {
    setErrors({});
    setActiveTab(tab);
  };

  const handleLogin = async () => {
    setErrors({});

    // 1. Validação local com Zod
    const validation = loginSchema.safeParse({
      loginEmail,
      loginPassword,
    });

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0] === "loginEmail") {
          fieldErrors.loginEmail =
            "O email que você inseriu não esta conectado a uma conta";
        } else if (err.path[0] === "loginPassword") {
          fieldErrors.loginPassword = "A senha inserida está incorreta.";
        }
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      const response = await fetch("http://192.168.0.120:5000/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          loginEmail,
          loginPassword,
        }),
      });

      const dataLogin = await response.json();

      if (response.ok && dataLogin.token) {
        await AsyncStorage.setItem("@token", dataLogin.token);
        await AsyncStorage.setItem("@user", JSON.stringify(dataLogin.user));

        if (salvarSessao) {
          await salvarSessao(dataLogin.token, dataLogin.user);
        }

        router.replace({
          pathname: "/inicial",
          params: { boasVindas: "true" },
        });
      } else {
        // Trata as mensagens vindas do backend para exibir no Toast ou no campo
        const respostaBackend = JSON.stringify(dataLogin).toLowerCase();

        let mensagemToast = "Erro ao realizar login.";

        if (
          respostaBackend.includes("senha") ||
          respostaBackend.includes("password") ||
          respostaBackend.includes("incorrect") ||
          respostaBackend.includes("inválid")
        ) {
          mensagemToast = "A senha inserida está incorreta.";
        } else if (
          respostaBackend.includes("email") ||
          respostaBackend.includes("user") ||
          respostaBackend.includes("usuário") ||
          respostaBackend.includes("not found") ||
          respostaBackend.includes("encontrado")
        ) {
          mensagemToast =
            "O email que você inseriu não esta conectado a uma conta";
        }

        setToast({
          mensagem: mensagemToast,
          tipo: "erro",
          mostrar: true,
        });
      }
    } catch (error) {
      console.error("Erro no login:", error);
      setToast({
        mensagem: "Erro ao conectar ao servidor.",
        tipo: "erro",
        mostrar: true,
      });
    }
  };

  const handleRegister = async () => {
    setErrors({});

    // 1. Validação local com Zod
    const validation = registerSchema.safeParse({
      registerName,
      registerEmail,
      registerPassword,
      registerConfirmPassword,
    });

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // 2. Formata o nome antes de enviar
    const nameFormatted = registerName
      .trim()
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(" ");

    try {
      const response = await fetch("http://192.168.0.120:5000/auth/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          registerName: nameFormatted,
          registerEmail,
          registerPassword,
          registerConfirmPassword,
        }),
      });

      const dataRegister = await response.json();

      if (!response.ok) {
        // Converte a resposta do backend para texto legível para inspeção
        const respostaBackend = JSON.stringify(dataRegister).toLowerCase();

        // Se o erro indicar e-mail, duplicidade, "exists" ou "unique", forçamos a mensagem customizada
        let mensagemErro = "Erro ao realizar cadastro.";

        if (
          respostaBackend.includes("email") ||
          respostaBackend.includes("existe") ||
          respostaBackend.includes("exist") ||
          respostaBackend.includes("duplicate") ||
          respostaBackend.includes("unique") ||
          response.status === 400 ||
          response.status === 409 ||
          response.status === 500 // Muitos backends retornam 500 para erro de duplicidade no DB
        ) {
          mensagemErro = "Este e-mail já está cadastrado.";
        }

        setToast({
          mensagem: mensagemErro,
          tipo: "erro",
          mostrar: true,
        });
        return;
      }

      // Sucesso!
      setToast({
        mensagem: "Usuário cadastrado com sucesso!",
        tipo: "sucesso",
        mostrar: true,
      });

      setRegisterName("");
      setRegisterEmail("");
      setRegisterPassword("");
      setRegisterConfirmPassword("");

      // Alterna para a aba de entrar
      setActiveTab("entrar");
    } catch (error) {
      console.error("Erro no registro:", error);
      setToast({
        mensagem: "Erro ao conectar ao servidor.",
        tipo: "erro",
        mostrar: true,
      });
    }
  };

  return (
    <FundoAzul>
      <Screen>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 20}
          className="flex-1"
        >
          <View className="flex-1 pt-4">
            <AuthHeader
              titulo="Comece Agora"
              subtitulo="Crie uma conta ou faça seu login"
            />

            {/* TOAST DE NOTIFICAÇÃO */}
            <View className="absolute top-12 left-4 right-4 z-50">
              <ToastNotificacao
                mensagem={toast.mensagem}
                tipo={toast.tipo}
                mostrar={toast.mostrar}
                aoFechar={() =>
                  setToast((prev) => ({ ...prev, mostrar: false }))
                }
              />
            </View>

            <View className="flex-1">
              <CardBranco>
                {/* SELETOR DE ABAS */}
                <View className="flex-row bg-[#F2F4F7] border border-[#D1D5DB] rounded-2xl p-1 mb-6">
                  <TouchableOpacity
                    onPress={() => handleTabChange("cadastrar")}
                    className={`flex-1 py-3 rounded-xl items-center justify-center ${
                      activeTab === "cadastrar"
                        ? "bg-white border border-[#7B8AD7]"
                        : ""
                    }`}
                    style={activeTab === "cadastrar" ? activeShadow : undefined}
                  >
                    <Text
                      className={`text-base ${
                        activeTab === "cadastrar"
                          ? "text-black font-bold"
                          : "text-gray-400"
                      }`}
                    >
                      Cadastrar
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleTabChange("entrar")}
                    className={`flex-1 py-3 rounded-xl items-center justify-center ${
                      activeTab === "entrar"
                        ? "bg-white border border-[#7B8AD7]"
                        : ""
                    }`}
                    style={activeTab === "entrar" ? activeShadow : undefined}
                  >
                    <Text
                      className={`text-base ${
                        activeTab === "entrar"
                          ? "text-black font-bold"
                          : "text-gray-400"
                      }`}
                    >
                      Entrar
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* ÁREA DE INPUTS */}
                <View className="flex-1 px-2">
                  {activeTab === "entrar" ? (
                    /* ENTRAR (LOGIN) */
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{ paddingBottom: 40 }}
                      keyboardShouldPersistTaps="handled"
                      keyboardDismissMode="on-drag"
                      className="flex-1"
                    >
                      {/* EMAIL LOGIN */}
                      <View className="mb-4">
                        <Text
                          className={`text-base mb-1 font-medium ${
                            Boolean(errors.loginEmail)
                              ? "text-red-500"
                              : "text-black"
                          }`}
                        >
                          Email
                        </Text>
                        <View
                          className={`border rounded-2xl px-4 py-3 bg-white ${
                            Boolean(errors.loginEmail)
                              ? "border-red-500"
                              : "border-gray-400"
                          }`}
                        >
                          <TextInput
                            placeholder="Insira seu endereço de email"
                            placeholderTextColor="#9CA3AF"
                            className="text-base text-black"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={loginEmail}
                            onChangeText={(txt) => {
                              setLoginEmail(txt);
                              if (errors.loginEmail)
                                setErrors((prev) => ({
                                  ...prev,
                                  loginEmail: "",
                                }));
                            }}
                          />
                        </View>
                        {Boolean(errors.loginEmail) && (
                          <Text className="text-red-500 text-sm mt-1 ml-1 font-medium">
                            {errors.loginEmail}
                          </Text>
                        )}
                      </View>

                      {/* SENHA LOGIN */}
                      <View className="mb-4">
                        <Text
                          className={`text-base mb-1 font-medium ${
                            Boolean(errors.loginPassword)
                              ? "text-red-500"
                              : "text-black"
                          }`}
                        >
                          Senha
                        </Text>
                        <View
                          className={`border rounded-2xl px-4 py-3 bg-white flex-row items-center ${
                            Boolean(errors.loginPassword)
                              ? "border-red-500"
                              : "border-gray-400"
                          }`}
                        >
                          <TextInput
                            placeholder="Insira sua senha"
                            placeholderTextColor="#9CA3AF"
                            className="text-base text-black flex-1"
                            secureTextEntry={!showLoginPassword}
                            autoCapitalize="none"
                            value={loginPassword}
                            onChangeText={(txt) => {
                              setLoginPassword(txt);
                              if (errors.loginPassword)
                                setErrors((prev) => ({
                                  ...prev,
                                  loginPassword: "",
                                }));
                            }}
                          />
                          <TouchableOpacity
                            onPress={() =>
                              setShowLoginPassword(!showLoginPassword)
                            }
                          >
                            <Ionicons
                              name={
                                showLoginPassword
                                  ? "eye-outline"
                                  : "eye-off-outline"
                              }
                              size={22}
                              color="#9CA3AF"
                            />
                          </TouchableOpacity>
                        </View>
                        {Boolean(errors.loginPassword) && (
                          <Text className="text-red-500 text-sm mt-1 ml-1 font-medium">
                            {errors.loginPassword}
                          </Text>
                        )}
                      </View>

                      <ButtonAzulPadrao titulo="Entrar" onPress={handleLogin} />

                      <View className="w-full mt-4 mb-6">
                        <Link href="/recuperarSenha" asChild>
                          <Pressable className="w-full py-3.5 rounded-full items-center justify-center bg-transparent active:bg-gray-100 web:hover:bg-gray-100 transition-colors">
                            <Text className="text-black text-base font-medium">
                              Esqueceu a senha?
                            </Text>
                          </Pressable>
                        </Link>
                      </View>
                    </ScrollView>
                  ) : (
                    /* CADASTRO */
                    <ScrollView
                      showsVerticalScrollIndicator={true}
                      contentContainerStyle={{ paddingBottom: 120 }}
                      keyboardShouldPersistTaps="handled"
                      keyboardDismissMode="on-drag"
                      className="flex-1"
                    >
                      {/* NOME */}
                      <View className="mb-4">
                        <Text
                          className={`text-base mb-1 font-medium ${
                            Boolean(errors.registerName)
                              ? "text-red-500"
                              : "text-black"
                          }`}
                        >
                          Nome
                        </Text>
                        <View
                          className={`border rounded-2xl px-4 py-3 bg-white ${
                            Boolean(errors.registerName)
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                        >
                          <TextInput
                            placeholder="Digite seu nome"
                            placeholderTextColor="#9CA3AF"
                            className="text-base text-black"
                            value={registerName}
                            onChangeText={(txt) => {
                              setRegisterName(txt);
                              if (errors.registerName)
                                setErrors((prev) => ({
                                  ...prev,
                                  registerName: "",
                                }));
                            }}
                          />
                        </View>
                        {Boolean(errors.registerName) && (
                          <Text className="text-red-500 text-sm mt-1 ml-1 font-medium">
                            {errors.registerName}
                          </Text>
                        )}
                      </View>

                      {/* EMAIL CADASTRO */}
                      <View className="mb-4">
                        <Text
                          className={`text-base mb-1 font-medium ${
                            Boolean(errors.registerEmail)
                              ? "text-red-500"
                              : "text-black"
                          }`}
                        >
                          Email
                        </Text>
                        <View
                          className={`border rounded-2xl px-4 py-3 bg-white ${
                            Boolean(errors.registerEmail)
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                        >
                          <TextInput
                            placeholder="Digite seu email"
                            placeholderTextColor="#9CA3AF"
                            className="text-base text-black"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={registerEmail}
                            onChangeText={(txt) => {
                              setRegisterEmail(txt);
                              if (errors.registerEmail)
                                setErrors((prev) => ({
                                  ...prev,
                                  registerEmail: "",
                                }));
                            }}
                          />
                        </View>
                        {Boolean(errors.registerEmail) && (
                          <Text className="text-red-500 text-sm mt-1 ml-1 font-medium">
                            {errors.registerEmail}
                          </Text>
                        )}
                      </View>

                      {/* SENHA CADASTRO */}
                      <View className="mb-4">
                        <Text
                          className={`text-base mb-1 font-medium ${
                            Boolean(errors.registerPassword)
                              ? "text-red-500"
                              : "text-black"
                          }`}
                        >
                          Senha
                        </Text>
                        <View
                          className={`border rounded-2xl px-4 py-3 bg-white flex-row items-center ${
                            Boolean(errors.registerPassword)
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                        >
                          <TextInput
                            placeholder="Digite sua senha"
                            placeholderTextColor="#9CA3AF"
                            className="text-base text-black flex-1"
                            secureTextEntry={!showRegisterPassword}
                            autoCapitalize="none"
                            value={registerPassword}
                            onChangeText={(txt) => {
                              setRegisterPassword(txt);
                              if (errors.registerPassword)
                                setErrors((prev) => ({
                                  ...prev,
                                  registerPassword: "",
                                }));
                            }}
                          />
                          <TouchableOpacity
                            onPress={() =>
                              setShowRegisterPassword(!showRegisterPassword)
                            }
                          >
                            <Ionicons
                              name={
                                showRegisterPassword
                                  ? "eye-outline"
                                  : "eye-off-outline"
                              }
                              size={20}
                              color="#9CA3AF"
                            />
                          </TouchableOpacity>
                        </View>
                        {Boolean(errors.registerPassword) && (
                          <Text className="text-red-500 text-sm mt-1 ml-1 font-medium">
                            {errors.registerPassword}
                          </Text>
                        )}
                      </View>

                      {/* CONFIRMAR SENHA */}
                      <View className="mb-4">
                        <Text
                          className={`text-base mb-1 font-medium ${
                            Boolean(errors.registerConfirmPassword)
                              ? "text-red-500"
                              : "text-black"
                          }`}
                        >
                          Confirmar Senha
                        </Text>
                        <View
                          className={`border rounded-2xl px-4 py-3 bg-white flex-row items-center ${
                            Boolean(errors.registerConfirmPassword)
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                        >
                          <TextInput
                            placeholder="Confirme sua senha"
                            placeholderTextColor="#9CA3AF"
                            className="text-base text-black flex-1"
                            secureTextEntry={!showConfirmPassword}
                            autoCapitalize="none"
                            value={registerConfirmPassword}
                            onChangeText={(txt) => {
                              setRegisterConfirmPassword(txt);
                              if (errors.registerConfirmPassword)
                                setErrors((prev) => ({
                                  ...prev,
                                  registerConfirmPassword: "",
                                }));
                            }}
                          />
                          <TouchableOpacity
                            onPress={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            <Ionicons
                              name={
                                showConfirmPassword
                                  ? "eye-outline"
                                  : "eye-off-outline"
                              }
                              size={20}
                              color="#9CA3AF"
                            />
                          </TouchableOpacity>
                        </View>
                        {Boolean(errors.registerConfirmPassword) && (
                          <Text className="text-red-500 text-sm mt-1 ml-1 font-medium">
                            {errors.registerConfirmPassword}
                          </Text>
                        )}
                      </View>

                      <ButtonAzulPadrao
                        titulo="Cadastrar"
                        onPress={handleRegister}
                      />
                    </ScrollView>
                  )}
                </View>
              </CardBranco>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Screen>
    </FundoAzul>
  );
}
