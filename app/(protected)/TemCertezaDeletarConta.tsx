import ButtonAzulPadrao from "@/components/buttonAzulPadrao"; // 🚀 Importado seu botão padrão
import { Screen } from "@/components/safearea";
import { useAuth } from "@/context/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function TemCertezaDeletarConta() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { usuarioLogado } = useAuth();

  const veioDoPerfil = params?.origem === "perfil";

  /* 🛡️ TRAVA DE SEGURANÇA:
     Garante que a ação destrutiva de deletar conta só possa ser aberta 
     por alguém 100% autenticado vindo de dentro do fluxo do Perfil. */
  if (!usuarioLogado || !veioDoPerfil) {
    return <Redirect href="/notfound" />; // 🎯 Ajustado para o seu /notfound exato
  }

  return (
    <View className="flex-1 bg-[#F8FAFC] justify-center px-6">
      <Screen>
        <View className="flex-1 justify-center items-center">
          {/* 🔴 ÍCONE DE LIXEIRA (Fundo vermelho com ícone branco) */}
          <View className="w-32 h-32 bg-[#FF3B30] rounded-full items-center justify-center shadow-sm mb-10">
            <Ionicons name="trash-outline" size={60} color="white" />
          </View>

          {/* 📝 TÍTULO EM DESTAQUE (Vermelho Vivo conforme a imagem) */}
          <Text className="text-[#FF3B30] text-3xl font-extrabold text-center mb-6 px-4">
            Tem certeza que deseja deletar sua conta?
          </Text>

          {/* ℹ️ TEXTO DESCRITIVO */}
          <Text className="text-[#424654] text-base text-center leading-6 mb-12 px-2">
            Essa ação não tem retorno e irá efetuará a exclusão de todos os seus
            dados e se necessário deverá criar uma conta novamente para pode
            salvar suas rotas no aplicativo
          </Text>

          {/* 🚨 BOTÃO: DELETAR CONTA (Fundo branco, borda sutil e texto em vermelho) */}
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/TemCertezaDeletarConta2",
                params: { origem: "perfil" },
              })
            }
            activeOpacity={0.8}
            className="w-full bg-white border border-[#E5E7EB] rounded-3xl py-4 items-center justify-center mb-4"
            style={{ height: 56 }} // Garante a mesma altura do seu botão padrão
          >
            <Text className="text-[#FF3B30] text-lg font-bold">
              Deletar Conta
            </Text>
          </TouchableOpacity>

          {/* 🔵 BOTÃO: CANCELAR (Seu componente ButtonAzulPadrao oficial) */}
          <View className="w-full">
            <ButtonAzulPadrao titulo="Cancelar" onPress={() => router.back()} />
          </View>
        </View>
      </Screen>
    </View>
  );
}
