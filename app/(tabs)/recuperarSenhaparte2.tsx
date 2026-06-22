import { useRouter } from "expo-router";
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
              {/* 1. TOPO FIXO: Título fora da ScrollView */}
              <View className="pb-2">
                <TituloCustomizado
                  titulo="Insira o Código."
                  corDoTexto="#1A1C1E"
                  corDoTextoDestacado="#0040A1"
                />
              </View>

              {/* 2. ÁREA DE ROLAGEM: Inputs e botões rolam livremente */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                className="flex-1"
              >
                <View className="px-2 mb-6 mt-6">
                  <Text className="text-[#424654] text-lg leading-7">
                    Enviaremos um código de 5 dígitos para o seu e-mail.
                  </Text>
                </View>

                {/* Container do Input de Código */}
                <InputsCodigoVerificacao />

                {/* Botão Reenviar */}
                <View className="px-2 mb-6 mt-6">
                  <ReenviarBotao
                    onPress={() =>
                      console.log("vamo trancar e abrir um estacionamento")
                    }
                  />
                </View>

                {/* Botão de Confirmar */}
                <View className="px-2 mb-4 mt-4">
                  <ButtonAzulPadrao
                    titulo="Verificar Código"
                    onPress={() => router.push("/recuperarSenhaparte3")}
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
