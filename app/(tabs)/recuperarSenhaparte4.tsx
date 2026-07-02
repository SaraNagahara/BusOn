import { useAuth } from "@/context/AuthProvider";
import { useLocalSearchParams, useRouter } from "expo-router"; // 🚀 Adicionado useLocalSearchParams
import { useEffect } from "react";
import { BackHandler, Text, View } from "react-native";
import CheckSimbolo from "../../assets/icons/check-circle.svg";
import { AuthHeader } from "./../../components/AuthHeader";
import ButtonAzulPadrao from "./../../components/buttonAzulPadrao";
import CardBranco from "./../../components/CardBranco";
import { FundoAzul } from "./../../components/fundoazul";
import { Screen } from "./../../components/safearea";
import { TituloCustomizadoAzul } from "./../../components/tituloSenhaAlterada";

export default function RecuperarSenha() {
  const router = useRouter();
  const params = useLocalSearchParams(); // 🚀 Captura se veio do perfil
  const { setUsuarioLogado } = useAuth();

  // 🧭 Identifica se o sucesso é referente à alteração de e-mail do Perfil
  const veioDoPerfil = params?.origem === "perfil";

  useEffect(() => {
    // 1️⃣ ASSIM QUE ENTRA NA TELA: Desloga o usuário obrigatoriamente (vale para senha ou e-mail alterado!)
    if (setUsuarioLogado) {
      setUsuarioLogado(false);
    }

    // 2️⃣ BLOQUEIO DA SETA NATIVA (Gesto/Botão voltar do Android/iOS)
    const acaoBotaoVoltar = () => {
      router.replace("/notfound");
      return true; // Bloqueia o comportamento padrão de voltar de tela
    };

    const assinaturaBackHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      acaoBotaoVoltar,
    );

    return () => assinaturaBackHandler.remove();
  }, [setUsuarioLogado]);

  return (
    <FundoAzul>
      <Screen>
        <View className="flex-1 pt-4 ">
          {/* 🚀 Cabeçalho dinâmico */}
          <AuthHeader
            titulo={veioDoPerfil ? "Conta" : "Comece Agora"}
            subtitulo={
              veioDoPerfil
                ? "E-mail atualizado com sucesso"
                : "Crie uma conta ou faça seu login"
            }
          />
          <CardBranco>
            <View className="flex-row gap-4 px-4 w-full">
              <CheckSimbolo />
              {/* 🚀 Título condicional: Senha vs E-mail */}
              <TituloCustomizadoAzul
                titulo={veioDoPerfil ? "E-mail Alterado!" : "Senha Alterada!"}
                corDoTexto="#0040A1"
              />
            </View>

            {/* 🚀 Texto descritivo condicional */}
            <View className="px-6">
              <Text className="text-2xl text-[#424654]">
                {veioDoPerfil
                  ? "Seu endereço de e-mail foi alterado com sucesso! Por segurança, faça login novamente utilizando suas novas credenciais."
                  : "Sua senha foi redefinida com sucesso! Agora você já pode acessar sua conta com a nova senha."}
              </Text>
            </View>

            {/* Container do Botão */}
            <View className="px-2 mb-8 mt-8">
              <ButtonAzulPadrao
                titulo="Login"
                onPress={() => router.replace("/loginCadastro")}
              />
            </View>
          </CardBranco>
        </View>
      </Screen>
    </FundoAzul>
  );
}
