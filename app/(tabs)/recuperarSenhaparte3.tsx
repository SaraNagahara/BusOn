import { useRouter } from "expo-router";
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

export default function RecuperarSenha() {
  // Estados para as senhas
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Estado para mensagem de erro (exemplo)
  const [errorMessage, setErrorMessage] = useState(
    "A senha deve ter 8 dígitos",
  );

  const router = useRouter();

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
            <CardBranco>
              {/* 1. TOPO FIXO: Título fora da área de Scroll */}
              <View className="pb-2">
                <TituloCustomizado
                  titulo="Crie sua nova senha"
                  corDoTexto="#0040A1"
                />
              </View>

              {/* 2. ÁREA DE ROLAGEM: Inputs, erros e botão rolam juntos */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                className="flex-1"
              >
                <View className="mt-4">
                  {/* Usando o componente para 'NOVA SENHA' */}
                  <PasswordInputField
                    label="NOVA SENHA"
                    value={newPassword}
                    onChangeText={setNewPassword}
                  />

                  {/* Usando o componente para 'CONFIRMAR NOVA SENHA' */}
                  <PasswordInputField
                    label="CONFIRMAR NOVA SENHA"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />

                  {/* Exibir mensagem de erro de validação */}
                  {errorMessage && newPassword !== "" && (
                    <Text className="text-sm text-red-500 mt-2 px-1">
                      {errorMessage}
                    </Text>
                  )}
                </View>

                {/* Container do Botão */}
                <View className="px-2 mb-4 mt-8">
                  <ButtonAzulPadrao
                    titulo="Alterar senha"
                    onPress={() => router.push("/recuperarSenhaparte4")}
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
