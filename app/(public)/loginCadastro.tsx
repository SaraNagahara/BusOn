import { AuthHeader } from "@/components/AuthHeader";
import ButtonAzulPadrao from "@/components/buttonAzulPadrao";
import CardBranco from "@/components/CardBranco";
import { Ionicons } from "@expo/vector-icons";
import {
  Link,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router"; // 🚀 Adicionados useRouter e useNavigation
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { FundoAzul } from "@/components/fundoazul";
import { Screen } from "@/components/safearea";

type TabOption = "cadastrar" | "entrar";

export default function LoginCadastro() {
  const params = useLocalSearchParams();
  const router = useRouter(); // 🚀 Hook de rotas do expo
  const navigation = useNavigation(); // 🚀 Hook para verificar o histórico de navegação

  const [activeTab, setActiveTab] = useState<TabOption>("entrar");
  const [rememberMe, setRememberMe] = useState(false);
  const [aceitouTermos, setAceitouTermos] = useState(false);

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
  const [registerPhone, setRegisterPhone] = useState("");

  useEffect(() => {
    const assinaturaRemoverTela = navigation.addListener(
      "beforeRemove",
      (e) => {
        // Se existir histórico para voltar, deixa o fluxo seguir normal
        if (navigation.canGoBack()) {
          return;
        }

        // 🔒 Se NÃO tiver para onde voltar, impede o travamento/erro do GO_BACK
        e.preventDefault();

        // 🏠 Chuta o usuário direto para a tela inicial limpando a árvore de navegação
        router.replace("/");
      },
    );

    return () => assinaturaRemoverTela();
  }, [navigation]);

  useEffect(() => {
    if (params?.aceitou === "true") {
      setActiveTab("cadastrar");
      setAceitouTermos(true);
    }
  }, [params?.aceitou]);

  const activeShadow: ViewStyle = {
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  };

  const handleLogin = async () => {
    const response = await fetch(
      "https://noncontributing-spankingly-marianela.ngrok-free.dev/users/login",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          loginEmail,
          loginPassword,
        }),
      },
    );

    const dataLogin = await response.json();
    console.log(dataLogin);
  };

  const handleRegister = async () => {
    if (registerPassword !== registerConfirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    const response = await fetch(
      "https://noncontributing-spankingly-marianela.ngrok-free.dev/users/register",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          registerName,
          registerEmail,
          registerPassword,
          registerConfirmPassword,
          registerPhone,
        }),
      },
    );

    const dataRegister = await response.json();
    console.log(dataRegister);
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

            <View className="flex-1">
              <CardBranco>
                {/* SELETOR DE ABAS */}
                <View className="flex-row bg-[#F2F4F7] border border-[#D1D5DB] rounded-2xl p-1 mb-6">
                  <TouchableOpacity
                    onPress={() => setActiveTab("cadastrar")}
                    className={`flex-1 py-3 rounded-xl items-center justify-center ${activeTab === "cadastrar" ? "bg-white border border-[#7B8AD7]" : ""}`}
                    style={activeTab === "cadastrar" ? activeShadow : {}}
                  >
                    <Text
                      className={`text-base ${activeTab === "cadastrar" ? "text-black font-bold" : "text-gray-400"}`}
                    >
                      Cadastrar
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setActiveTab("entrar")}
                    className={`flex-1 py-3 rounded-xl items-center justify-center ${activeTab === "entrar" ? "bg-white border border-[#7B8AD7]" : ""}`}
                    style={activeTab === "entrar" ? activeShadow : {}}
                  >
                    <Text
                      className={`text-base ${activeTab === "entrar" ? "text-black font-bold" : "text-gray-400"}`}
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
                      <View className="mb-5">
                        <Text className="text-black text-base mb-2 font-medium">
                          Email
                        </Text>
                        <View className="border border-gray-400 rounded-2xl px-4 py-3">
                          <TextInput
                            placeholder="Insira seu endereço de email"
                            placeholderTextColor="#9CA3AF"
                            className="text-base text-black"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={loginEmail}
                            onChangeText={setLoginEmail}
                          />
                        </View>
                      </View>

                      {/* SENHA LOGIN */}
                      <View className="mb-5">
                        <Text className="text-black text-base mb-2 font-medium">
                          Senha
                        </Text>
                        <View className="border border-gray-400 rounded-2xl px-4 py-3 flex-row items-center">
                          <TextInput
                            placeholder="Insira sua senha"
                            placeholderTextColor="#9CA3AF"
                            className="text-base text-black flex-1"
                            secureTextEntry={!showLoginPassword}
                            autoCapitalize="none"
                            value={loginPassword}
                            onChangeText={setLoginPassword}
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
                      </View>

                      <View className="flex-row justify-between items-center mt-2 px-1 mb-6">
                        <TouchableOpacity
                          onPress={() => setRememberMe(!rememberMe)}
                          className="flex-row items-center"
                          activeOpacity={0.7}
                        >
                          <Ionicons
                            name={rememberMe ? "checkbox" : "square-outline"}
                            size={24}
                            color={rememberMe ? "#1F3369" : "#D1D5DB"}
                          />
                          <Text className="ml-2 text-black text-base">
                            Lembrar de mim
                          </Text>
                        </TouchableOpacity>

                        <Link href="/recuperarSenha" asChild>
                          <TouchableOpacity>
                            <Text className="text-blue-500 text-base font-medium">
                              Esqueci a senha
                            </Text>
                          </TouchableOpacity>
                        </Link>
                      </View>

                      <ButtonAzulPadrao titulo="Entrar" onPress={handleLogin} />
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
                        <Text className="text-black text-base mb-1 font-medium">
                          Nome
                        </Text>
                        <View className="border border-gray-200 rounded-2xl px-4 py-3 bg-white">
                          <TextInput
                            placeholder="Digite seu nome"
                            placeholderTextColor="#9CA3AF"
                            className="text-base text-black"
                            value={registerName}
                            onChangeText={setRegisterName}
                          />
                        </View>
                      </View>

                      {/* EMAIL CADASTRO */}
                      <View className="mb-4">
                        <Text className="text-black text-base mb-1 font-medium">
                          Email
                        </Text>
                        <View className="border border-gray-200 rounded-2xl px-4 py-3 bg-white">
                          <TextInput
                            placeholder="Digite seu email"
                            placeholderTextColor="#9CA3AF"
                            className="text-base text-black"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={registerEmail}
                            onChangeText={setRegisterEmail}
                          />
                        </View>
                      </View>

                      {/* SENHA CADASTRO */}
                      <View className="mb-4">
                        <Text className="text-black text-base mb-1 font-medium">
                          Senha
                        </Text>
                        <View className="border border-gray-200 rounded-2xl px-4 py-3 bg-white flex-row items-center">
                          <TextInput
                            placeholder="Digite sua senha"
                            placeholderTextColor="#9CA3AF"
                            className="text-base text-black flex-1"
                            secureTextEntry={!showRegisterPassword}
                            autoCapitalize="none"
                            value={registerPassword}
                            onChangeText={setRegisterPassword}
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
                      </View>

                      {/* CONFIRMAR SENHA */}
                      <View className="mb-4">
                        <Text className="text-black text-base mb-1 font-medium">
                          Confirmar Senha
                        </Text>
                        <View className="border border-gray-200 rounded-2xl px-4 py-3 bg-white flex-row items-center">
                          <TextInput
                            placeholder="Confirme sua senha"
                            placeholderTextColor="#9CA3AF"
                            className="text-base text-black flex-1"
                            secureTextEntry={!showConfirmPassword}
                            autoCapitalize="none"
                            value={registerConfirmPassword}
                            onChangeText={setRegisterConfirmPassword}
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
                      </View>

                      {/* TELEFONE */}
                      <View className="mb-4">
                        <Text className="text-black text-base mb-1 font-medium">
                          Telefone
                        </Text>
                        <View className="border border-gray-200 rounded-2xl px-4 py-3 bg-white">
                          <TextInput
                            placeholder="Digite seu DDD + Telefone"
                            placeholderTextColor="#9CA3AF"
                            className="text-base text-black flex-1"
                            keyboardType="phone-pad"
                            value={registerPhone}
                            onChangeText={setRegisterPhone}
                          />
                        </View>
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
