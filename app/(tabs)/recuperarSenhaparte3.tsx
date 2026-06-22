import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
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
    "A senha deve ter 8 digitos",
  );

  const router = useRouter();
  return (
    <FundoAzul>
      <Screen>
        <View className="flex-1 pt-4 ">
          <AuthHeader
            titulo="Comece Agora"
            subtitulo="Crie uma conta ou faça seu login"
          />
          <CardBranco>
            <TituloCustomizado
              titulo="Crie sua nova senha"
              corDoTexto="#0040A1"
            />

            <View>
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

              {/* Exemplo de exibição de mensagem de erro global ou de validação */}
              {errorMessage && (
                <Text className="text-sm text-gray-700 mt-2">
                  {errorMessage}
                </Text>
              )}

              {/* ... restante da sua tela (botão de envio, etc.) */}
            </View>

            {/* Container do Input */}
            <View className="px-2 mb-8 mt-8">
              <ButtonAzulPadrao
                titulo="Alterar senha"
                onPress={() => router.push("/recuperarSenhaparte4")}
              />
            </View>
          </CardBranco>
        </View>
      </Screen>
    </FundoAzul>
  );
}
