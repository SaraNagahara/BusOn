import { fonts } from "@/app/_layout";
import ButtonAzulPadrao from "@/components/buttonAzulPadrao";
import { Screen } from "@/components/safearea";
import { useAuth } from "@/context/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function TemCertezaLogout() {
  const router = useRouter();

  // ⚡ Desestruturação com a função 'encerrarSessao' ajustada do Provider
  const { usuarioLogado, encerrarSessao } = useAuth();

  // 🚪 EFETUA O LOGOUT REAL: Limpa o AsyncStorage, reseta os estados e redireciona
  const handleConfirmarLogout = useCallback(async () => {
    try {
      if (encerrarSessao) {
        await encerrarSessao(); // Limpa @token e @user do AsyncStorage
      }

      // 🚀 Redireciona para o perfil (ou login) informando a ação
      router.replace({
        pathname: "/perfil",
        params: { deslogado: "true" },
      });
    } catch (error) {
      console.error("Erro ao encerrar a sessão:", error);
    }
  }, [encerrarSessao, router]);

  // ↩️ APENAS CANCELA: Retorna à tela anterior mantendo a sessão ativa
  const handleCancelar = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <View className="flex-1 bg-[#F2F2F7]">
      <Screen>
        {/* 📦 CONTEÚDO CENTRAL */}
        <View className="flex-1 items-center justify-center px-8">
          {/* 🚪 CÍRCULO AZUL COM ÍCONE DE LOGOUT */}
          <View className="w-24 h-24 bg-[#1D61E7] rounded-full items-center justify-center mb-8 shadow-sm">
            <Ionicons
              name="log-out-outline"
              size={44}
              color="#FFFFFF"
              style={{ marginLeft: 4 }}
            />
          </View>

          {/* 💬 TEXTOS DE AVISO */}
          <Text
            style={{ fontFamily: fonts.bold }}
            className="text-[26px] text-slate-950 text-center leading-tight mb-4"
          >
            Tem certeza que deseja sair?
          </Text>

          <Text
            style={{ fontFamily: fonts.regular }}
            className="text-base text-gray-500 text-center leading-relaxed mb-12 max-w-[280px] pb-4"
          >
            Você precisará entrar novamente para acessar suas viagens e
            configurações de conta.
          </Text>

          {/* 🔘 CONJUNTO DE BOTÕES DE AÇÃO */}
          <View className="w-full gap-3">
            {/* Botão Sair da Conta (Branco / Vazado com Texto Azul) */}
            <TouchableOpacity
              onPress={handleConfirmarLogout}
              activeOpacity={0.7}
              className="w-full py-4 rounded-3xl items-center justify-center bg-white border border-gray-200 shadow-sm active:bg-gray-50"
            >
              <Text
                style={{ fontFamily: fonts.bold, color: "#1D61E7" }}
                className="text-base"
              >
                Sair da Conta
              </Text>
            </TouchableOpacity>

            {/* Botão Cancelar */}
            <ButtonAzulPadrao
              titulo="Cancelar"
              onPress={handleCancelar}
              style={{ marginTop: 0 }}
            />
          </View>
        </View>
      </Screen>
    </View>
  );
}
