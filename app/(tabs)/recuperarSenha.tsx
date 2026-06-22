import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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
              {/* 1. TOPO FIXO: Titulo inserido antes da ScrollView */}
              <View className="pb-2">
                <TituloCustomizado
                  titulo="Recupere seu Acesso."
                  corDoTexto="#1A1C1E"
                  corDoTextoDestacado="#0040A1"
                />
              </View>

              {/* 2. ÁREA DE ROLAGEM: Apenas o formulário e as instruções rolam */}
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
                    Email
                  </Text>
                </View>

                {/* Container do Input */}
                <View className="flex-row items-center border border-[#D1D5DB] rounded-2xl px-4 py-4 bg-white">
                  <Ionicons name="mail-outline" size={22} color="#6B7280" />

                  {/* Campo de Texto */}
                  <TextInput
                    placeholder="Insira seu endereço de email"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="flex-1 ml-3 text-[#424654] text-base"
                  />
                </View>

                <View className="px-2 mb-8 mt-8">
                  <Text className="text-[#424654] text-lg leading-7">
                    Insira seu e-mail para receber um código de recuperação
                  </Text>
                </View>

                <ButtonAzulPadrao
                  titulo="Enviar Código"
                  onPress={() => router.push("/recuperarSenhaparte2")}
                />
              </ScrollView>
            </CardBranco>
          </View>
        </KeyboardAvoidingView>
      </Screen>
    </FundoAzul>
  );
}
