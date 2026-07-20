import { fonts } from "@/app/_layout";
import ButtonAzulPadrao from "@/components/buttonAzulPadrao";
import { Stack, useRouter } from "expo-router";
import { Image, Text, View } from "react-native";

// Importe a sua imagem aqui (ajuste o caminho se necessário)
const backgroundImage = require("@/assets/images/fundoNotFound.png");

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Container Principal */}
      <View className="flex-1 bg-white pt-24 pb-12">
        {/* Imagem de Fundo Absoluta (Não afeta o layout dos outros componentes) */}
        <Image
          source={backgroundImage}
          resizeMode="cover"
          className="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
        />

        {/* Conteúdo sobreposto */}
        {/* Mantemos o px-6 e justify-between aqui para preservar o comportamento original */}
        <View className="flex-1 justify-between px-6">
          {/* Parte Superior: O Clássico 404 */}
          <View className="items-center mt-12">
            {/* Número 404 estilizado e gigante, mas elegante */}
            <Text
              style={{ fontFamily: fonts.bold }}
              className="text-[110px] leading-[100px] text-slate-300 tracking-tighter"
            >
              404
            </Text>

            <Text
              style={{ fontFamily: fonts.bold }}
              className="text-xl text-slate-900 text-center mt-6 mb-2"
            >
              Página Não Encontrada
            </Text>

            <Text
              style={{ fontFamily: fonts.regular }}
              className="text-sm text-slate-500 text-center max-w-[280px] leading-relaxed"
            >
              O link que você acessou pode estar quebrado ou a página requer
              permissões de administrador.
            </Text>
          </View>

          {/* Parte Inferior: Botão empurrado para a base da tela */}
          <View className="w-full">
            <ButtonAzulPadrao
              titulo="Voltar para o início"
              onPress={() => router.replace("/inicial")}
              style={{ marginTop: 0 }}
            />
          </View>
        </View>
      </View>
    </>
  );
}
