import { AuthHeader } from "@/components/AuthHeader";
import ButtonAzulPadrao from "@/components/buttonAzulPadrao";
import CardBranco from "@/components/CardBranco";
import { FundoAzul } from "@/components/fundoazul";
import PasswordInputField from "@/components/PasswordInputField";
import { Screen } from "@/components/safearea";
import { TituloCustomizado } from "@/components/TituloCustomizado";
import { useAuth } from "@/context/AuthProvider";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function RecuperarSenhaParte3() {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(
    "A senha deve ter no mínimo 6 dígitos",
  );

  const { usuarioLogado, token } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();

  const veioDoPerfil = params?.origem === "perfil";

  if (usuarioLogado && !veioDoPerfil) {
    return <Redirect href="/notfound" />;
  }

  // 🚀 CORRIGIDO: Agora ambos os fluxos vão para a Parte 4, mas com flags diferentes
  const handleAlterarSenha = async () => {
    // Validação das senhas (boa prática de UX)
    if (newPassword.length < 6) {
      setErrorMessage("A senha deve ter no mínimo 6 dígitos");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("As senhas não coincidem");
      return;
    }

    // 🛡️ VERIFICAÇÃO DE SEGURANÇA: Checa se o token ainda existe
    if (!token) {
      setErrorMessage("Sessão expirada. Por favor, faça login novamente.");
      // Opcional: redirecionar para o login
      // router.replace("/login");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/users/changePassowrd",
        {
          method: "POST", //TROCAR PARA PATCH
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            password: oldPassword,
            newPassword: newPassword,
            newPasswordConfirmation: confirmPassword,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return;
      }
      console.log("sucesso: ", data.message);

      if (veioDoPerfil) {
        // 🔄 Veio do Perfil
        router.push({
          pathname: "/recuperarSenhaparte4",
          params: { origem: "perfil_senha" },
        });
      }
    } catch (error) {
      console.log("mensagem: ", error);
    }

    // 🚀 Fluxos de Navegação mantidos
    //  else {
    //   // 🔒 Fluxo Externo
    //   router.push({
    //     pathname: "/recuperarSenhaparte4",
    //     params: { origem: "externo" },
    //   });
    // }
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
              titulo={veioDoPerfil ? "Verificação" : "Comece Agora"}
              subtitulo={
                veioDoPerfil
                  ? "Atualize sua senha de acesso com segurança"
                  : "Crie uma conta ou faça seu login"
              }
            />

            <CardBranco>
              <View className="pb-2">
                <TituloCustomizado
                  titulo={
                    veioDoPerfil ? "Altere sua Senha." : "Crie sua nova senha"
                  }
                  corDoTexto="#0040A1"
                />
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                className="flex-1"
              >
                {veioDoPerfil && (
                  <View className="mt-4">
                    <PasswordInputField
                      label="SENHA ATUAL"
                      value={oldPassword}
                      onChangeText={setOldPassword}
                    />
                  </View>
                )}

                <View className="mt-4">
                  <PasswordInputField
                    label="NOVA SENHA"
                    value={newPassword}
                    onChangeText={setNewPassword}
                  />

                  <PasswordInputField
                    label="CONFIRMAR NOVA SENHA"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />

                  {errorMessage && newPassword !== "" && (
                    <Text className="text-sm text-red-500 mt-2 px-1">
                      {errorMessage}
                    </Text>
                  )}
                </View>

                <View className="px-2 mb-4 mt-8">
                  <ButtonAzulPadrao
                    titulo={
                      veioDoPerfil ? "Salvar Nova Senha" : "Alterar senha"
                    }
                    onPress={handleAlterarSenha}
                  />
                </View>
              </ScrollView>
            </CardBranco>
          </View>
        </KeyboardAvoidingView>
      </Screen>
    </FundoAzul>
  );
}
