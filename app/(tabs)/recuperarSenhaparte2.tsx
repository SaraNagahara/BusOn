import { useLocalSearchParams, useRouter } from "expo-router";
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

export default function RecuperarSenhaParte2() {
  const router = useRouter();
  const params = useLocalSearchParams(); // 🚀 Captura o parâmetro 'origem' vindo da tela anterior

  // 🧭 Identifica se o fluxo atual é o de alteração de e-mail do Perfil
  const veioDoPerfil = params?.origem === "perfil";

  const handleVerificarCodigo = () => {
    if (veioDoPerfil) {
      // 📧 FLUXO DO PERFIL: O código do novo e-mail deu certo, manda direto para a tela de sucesso (Parte 4)
      router.push({
        pathname: "/recuperarSenhaparte4",
        params: { origem: "perfil" },
      });
    } else {
      // 🔒 FLUXO EXTERNO: É recuperação de senha padrão, manda para criar a nova senha (Parte 3)
      router.push({
        pathname: "/recuperarSenhaparte3",
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
            {/* 🚀 Cabeçalho dinâmico baseado no contexto */}
            <AuthHeader
              titulo={veioDoPerfil ? "Verificação " : "Comece Agora"}
              subtitulo={
                veioDoPerfil
                  ? "Digite o código enviado para o seu novo e-mail"
                  : "Crie uma conta ou faça seu login"
              }
            />
            <CardBranco>
              {/* 1. TOPO FIXO: Título no estilo original que você tinha */}
              <View className="pb-2">
                <TituloCustomizado
                  titulo="Insira o Código."
                  corDoTexto="#1A1C1E"
                  corDoTextoDestacado="#0040A1"
                />
              </View>

              {/* 2. ÁREA DE ROLAGEM: Restante do conteúdo */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                className="flex-1"
              >
                {/* 🚀 Texto explicativo adaptado conforme o objetivo do fluxo */}
                <View className="px-2 mb-6 mt-6">
                  <Text className="text-[#424654] text-lg leading-7">
                    {veioDoPerfil
                      ? "Enviaremos um código de 5 dígitos para o seu novo endereço de e-mail para validação."
                      : "Enviaremos um código de 5 dígitos para o seu e-mail."}
                  </Text>
                </View>

                {/* 🛡️ CONTAINER RESPONSIVO ADICIONADO: 
                    Garante que os 5 blocos fiquem centralizados e caibam em qualquer largura de tela sem quebrar */}
                <View className="w-full justify-center items-center my-2 px-2">
                  <View className="w-full max-w-[340px] items-center justify-center">
                    <InputsCodigoVerificacao />
                  </View>
                </View>

                {/* Botão Reenviar */}
                <View className="px-2 mb-6 mt-6">
                  <ReenviarBotao
                    onPress={() => console.log("botão reenviar pressionado")}
                  />
                </View>

                {/* Botão de Confirmar dinâmico */}
                <View className="px-2 mb-4 mt-4">
                  <ButtonAzulPadrao
                    titulo={
                      veioDoPerfil
                        ? "Confirmar Novo E-mail"
                        : "Verificar Código"
                    }
                    onPress={handleVerificarCodigo} // 🚀 Dispara a função inteligente
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
