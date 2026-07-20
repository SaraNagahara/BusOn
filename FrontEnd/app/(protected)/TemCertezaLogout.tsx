import { fonts } from "@/app/_layout";
import ButtonAzulPadrao from "@/components/buttonAzulPadrao";
import { Screen } from "@/components/safearea";
import { useAuth } from "@/context/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function TemCertezaLogout() {
  const router = useRouter();
  const { usuarioLogado, setUsuarioLogado } = useAuth(); // ⚡ Acesse a mutation do seu Provider aqui

  // 🛡️ Trava de segurança: impede acesso direto via URL caso não esteja logado
  if (!usuarioLogado) {
    return <Redirect href="/notfound" />;
  }

  // 🚪 EFETUA O LOGOUT REAL: Altera o estado global e redireciona de volta ao perfil
  const handleConfirmarLogout = useCallback(() => {
    if (setUsuarioLogado) {
      setUsuarioLogado(false);
    }
    // 🚀 Passando o parâmetro na rota para a tela de Perfil saber que teve um logout
    router.replace({
      pathname: "/perfil",
      params: { deslogado: "true" },
    });
  }, [setUsuarioLogado, router]);

  // ↩️ APENAS CANCELA: Retorna à tela de configurações mantendo a sessão ativa
  const handleCancelar = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <View className="flex-1 bg-[#F2F2F7]">
      <Screen>
        {/* 📦 CONTEÚDO CENTRAL (FIEL AO SEU SEGUNDO PRINT) */}
        <View className="flex-1 items-center justify-center px-8">
          {/* 🚪 CIRCULO AZUL COM ÍCONE DE LOGOUT */}
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
            {/* Botão Sair da Conta (Branco / Vazado com Texto Azul Correto) */}
            <TouchableOpacity
              onPress={handleConfirmarLogout}
              activeOpacity={0.7}
              className="w-full py-4 rounded-3xl items-center justify-center bg-white border border-gray-200 shadow-sm active:bg-gray-50"
            >
              <Text
                style={{ fontFamily: fonts.bold, color: "#1D61E7" }} // ⚡ Cor alterada via Style nativo para ignorar heranças incorretas
                className="text-base"
              >
                Sair da Conta
              </Text>
            </TouchableOpacity>

            {/* Botão Cancelar (Nosso ButtonAzulPadrao Reutilizável) */}
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
