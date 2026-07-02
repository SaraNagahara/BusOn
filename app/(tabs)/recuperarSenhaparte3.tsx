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
import { AuthHeader } from "./../../components/AuthHeader";
import ButtonAzulPadrao from "./../../components/buttonAzulPadrao";
import CardBranco from "./../../components/CardBranco";
import { FundoAzul } from "./../../components/fundoazul";
import PasswordInputField from "./../../components/PasswordInputField";
import { Screen } from "./../../components/safearea";
import { TituloCustomizado } from "./../../components/TituloCustomizado";

export default function RecuperarSenhaParte3() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(
    "A senha deve ter 8 dígitos",
  );

  const { usuarioLogado } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();

  const veioDoPerfil = params?.origem === "perfil";

  if (usuarioLogado && !veioDoPerfil) {
    return <Redirect href="/notfound" />;
  }

  // 🚀 CORRIGIDO: Agora ambos os fluxos vão para a Parte 4, mas com flags diferentes
  const handleAlterarSenha = () => {
    if (veioDoPerfil) {
      // 🔄 Veio do Perfil: Vai para o sucesso avisando que foi alteração de SENHA interna
      router.push({
        pathname: "/recuperarSenhaparte4",
        params: { origem: "perfil_senha" },
      });
    } else {
      // 🔒 Fluxo Externo: Esqueci a senha tradicional do login
      router.push({
        pathname: "/recuperarSenhaparte4",
        params: { origem: "externo" },
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
              titulo={veioDoPerfil ? "Conta" : "Comece Agora"}
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
