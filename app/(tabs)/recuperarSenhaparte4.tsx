import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import CheckSimbolo from "../../assets/icons/check-circle.svg";
import { AuthHeader } from "../../components/AuthHeader";
import ButtonAzulPadrao from "../../components/buttonAzulPadrao";
import CardBranco from "../../components/CardBranco";
import { FundoAzul } from "../../components/fundoazul";
import { Screen } from "../../components/safearea";
import { TituloCustomizadoAzul } from "../../components/tituloSenhaAlterada";
export default function RecuperarSenha() {
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
            <View className="flex-row gap-4 px-4 w-full">
              <CheckSimbolo />
              <TituloCustomizadoAzul
                titulo="Senha Alterada!"
                corDoTexto="#0040A1"
              />
            </View>

            <View className="px-6">
              <Text className="text-2xl text-[#424654]">
                Sua senha foi redefinida com sucesso! Agora você já pode acessar
                sua conta com a nova senha.
              </Text>
            </View>

            {/* Container do Input */}
            <View className="px-2 mb-8 mt-8">
              <ButtonAzulPadrao
                titulo="Login"
                onPress={() => router.push("/loginCadastro")}
              />
            </View>
          </CardBranco>
        </View>
      </Screen>
    </FundoAzul>
  );
}
