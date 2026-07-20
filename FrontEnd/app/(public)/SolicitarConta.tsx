import { fonts } from "@/app/_layout";
import { Screen } from "@/components/safearea";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function SolicitarConta() {
  const router = useRouter();
  const { origem } = useLocalSearchParams<{ origem: "favoritas" | "perfil" }>();

  // Define se a tela vai se comportar como foco em Perfil ou Favoritos
  const ehPerfil = origem === "perfil";

  const handleCriarConta = () => {
    console.log("Redirecionando para tela de login/cadastro...");
    router.push("/loginCadastro");
  };

  const handleVoltar = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-[#F9FAFF]">
      <Screen>
        <View className="flex-1 px-6 justify-between py-10">
          {/* BLOCO CENTRAL: ÍCONE E TEXTOS DINÂMICOS */}
          <View className="flex-1 justify-center items-center px-4">
            {/* Círculo Azul que altera o ícone dinamicamente */}
            <View className="w-24 h-24 bg-[#2563EB] rounded-full items-center justify-center mb-8 shadow-sm flex-row">
              <Ionicons
                name={ehPerfil ? "person-outline" : "star-outline"}
                size={44}
                color="#FFFFFF"
              />
            </View>

            {/* Título Principal Adaptável */}
            <Text
              style={{ fontFamily: fonts.bold }}
              className="text-[#0D1B2A] text-2xl text-center tracking-tight mb-4"
            >
              {ehPerfil
                ? "Quer acessar o seu Perfil?"
                : "Quer criar uma lista de favoritos?"}
            </Text>

            {/* Subtítulo Descritivo Adaptável */}
            <Text
              style={{ fontFamily: fonts.regular }}
              className="text-[#64748B] text-base text-center leading-6 max-w-[280px]"
            >
              {ehPerfil
                ? "Para visualizar e editar os dados do seu perfil você precisa criar uma conta"
                : "Para utilizar o serviço de favoritos você precisa criar uma conta"}
            </Text>
          </View>

          {/* BLOCO INFERIOR: BOTÕES DE AÇÃO */}
          <View className="w-full flex-col">
            {/* Botão Voltar */}
            <Pressable
              onPress={handleVoltar}
              className="w-full bg-white border border-[#DBEAFE] h-14 rounded-full items-center justify-center active:opacity-80"
            >
              <Text
                style={{ fontFamily: fonts.medium }}
                className="text-[#2563EB] text-base"
              >
                Voltar
              </Text>
            </Pressable>

            {/* Botão Criar Conta */}
            <Pressable
              onPress={handleCriarConta}
              className="w-full bg-[#2563EB] h-14 rounded-full items-center justify-center active:opacity-90 mt-3"
            >
              <Text
                style={{ fontFamily: fonts.bold }}
                className="text-white text-base"
              >
                Criar Conta
              </Text>
            </Pressable>
          </View>
        </View>
      </Screen>
    </View>
  );
}
