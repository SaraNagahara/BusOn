import { useAuth } from "@/context/AuthProvider"; // 🚀 Importado seu hook de autenticação
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router"; // 🚀 Adicionados useLocalSearchParams e Redirect
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { AuthHeader } from "./../../components/AuthHeader";
import ButtonAzulPadrao from "./../../components/buttonAzulPadrao";
import CardBranco from "./../../components/CardBranco";
import { FundoAzul } from "./../../components/fundoazul";
import { Screen } from "./../../components/safearea";
import { TituloCustomizado } from "./../../components/TituloCustomizado";

export default function RecuperarSenha() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { usuarioLogado } = useAuth(); // 🔒 Estado global de login

  // 🧭 Identifica se veio de dentro do Perfil
  const veioDoPerfil = params?.origem === "perfil";

  /* 🛡️ VALIDAÇÃO DE SEGURANÇA EXTRA: 
     Se o usuário já está logado e tenta acessar essa rota pela URL/Link comum sem ser 
     pelo botão do Perfil (ou seja, sem a flag de origem), barramos e jogamos no notfound */
  if (usuarioLogado && !veioDoPerfil) {
    return <Redirect href="/notfound" />;
  }

  return (
    <FundoAzul>
      <Screen>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 20}
          className="flex-1"
        >
          <View className="flex-1 pt-4">
            {/* 🚀 Cabeçalho dinâmico baseado na origem */}
            <AuthHeader
              titulo={veioDoPerfil ? "Conta" : "Comece Agora"}
              subtitulo={
                veioDoPerfil
                  ? "Atualize seu endereço de e-mail principal"
                  : "Crie uma conta ou faça seu login"
              }
            />
            <CardBranco>
              {/* 1. TOPO FIXO */}
              <View className="pb-2">
                <TituloCustomizado
                  titulo={
                    veioDoPerfil ? "Altere seu E-mail." : "Recupere seu Acesso."
                  }
                  corDoTexto="#1A1C1E"
                  corDoTextoDestacado="#0040A1"
                />
              </View>

              {/* 2. ÁREA DE ROLAGEM */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                className="flex-1"
              >
                {/* Label Superior */}
                <View className="mt-4 mb-2">
                  <Text className="text-[#424654] text-xs font-bold uppercase tracking-widest px-2">
                    {veioDoPerfil ? "Novo E-mail" : "Email"}
                  </Text>
                </View>

                {/* Container do Input */}
                <View className="flex-row items-center border border-[#D1D5DB] rounded-2xl px-4 py-4 bg-white">
                  <Ionicons name="mail-outline" size={22} color="#6B7280" />

                  {/* Campo de Texto */}
                  <TextInput
                    placeholder={
                      veioDoPerfil
                        ? "Insira seu novo e-mail"
                        : "Insira seu endereço de email"
                    }
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="flex-1 ml-3 text-[#424654] text-base"
                  />
                </View>

                {/* 🚀 Texto de instrução condicional */}
                <View className="px-2 mb-8 mt-8">
                  <Text className="text-[#424654] text-lg leading-7">
                    {veioDoPerfil
                      ? "Insira o novo e-mail abaixo. Enviaremos um código de verificação para confirmar a alteração."
                      : "Insira seu e-mail para receber um código de recuperação"}
                  </Text>
                </View>

                <ButtonAzulPadrao
                  titulo={
                    veioDoPerfil ? "Verificar Novo E-mail" : "Enviar Código"
                  }
                  onPress={() =>
                    router.push({
                      pathname: "/recuperarSenhaparte2",
                      params: { origem: veioDoPerfil ? "perfil" : "externo" },
                    })
                  }
                />
              </ScrollView>
            </CardBranco>
          </View>
        </KeyboardAvoidingView>
      </Screen>
    </FundoAzul>
  );
}
