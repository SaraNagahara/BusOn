import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { AuthHeader } from "./../../components/AuthHeader";
import ButtonAzulPadrao from "./../../components/buttonAzulPadrao";
import CardBranco from "./../../components/CardBranco";
import ReenviarBotao from "./../../components/enviarNovamente";
import { FundoAzul } from "./../../components/fundoazul";
import InputsCodigoVerificacao from "./../../components/insiracodigoverificacao";
import { Screen } from "./../../components/safearea";
import { TituloCustomizado } from "./../../components/TituloCustomizado";
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
            <TituloCustomizado
              titulo="Insira o Código."
              corDoTexto="#1A1C1E" // Ex: Texto branco (se fosse num fundo escuro)
              corDoTextoDestacado="#0040A1" // Ex: Destacado vermelho (ex: "Acesso.")
            />

            <View className="px-2 mb-8 mt-8">
              <Text className="text-[#424654] text-lg leading-7">
                Enviaremos um código de 5 dígitos para o seu e-mail.
              </Text>
            </View>

            {/* Container do Input */}

            <InputsCodigoVerificacao />

            <View className="px-2 mb-8 mt-8">
              <ReenviarBotao
                onPress={() =>
                  console.log("vamo trancar e abrir um estacionamento")
                }
              />
            </View>

            <View className="px-2 mb-8 mt-8">
              <ButtonAzulPadrao
                titulo="Verificar Código"
                onPress={() => router.push("/recuperarSenhaparte3")}
              />
            </View>
          </CardBranco>
        </View>
      </Screen>
    </FundoAzul>
  );
}
