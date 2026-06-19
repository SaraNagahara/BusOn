import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TextInput, View } from "react-native";
import { AuthHeader } from "../../components/AuthHeader";
import ButtonAzulPadrao from "../../components/buttonAzulPadrao";
import CardBranco from "../../components/CardBranco";
import { FundoAzul } from "../../components/fundoazul";
import { Screen } from "../../components/safearea";
import { TituloCustomizado } from "../../components/TituloCustomizado";
export default function RecuperarSenha() {
  const router = useRouter(); //ta sendo usado so pra usar o botao pra navegar entre as paginas no momento
  return (
    <FundoAzul>
      <Screen>
        <View className="flex-1 pt-4 ">
          <AuthHeader
            titulo="Comece Agora"
            subtitulo="Crie uma conta ou faça seu login"
          />
          <CardBranco>
            <TituloCustomizado
              titulo="Recupere seu Acesso."
              corDoTexto="#1A1C1E" // Ex: Texto branco (se fosse num fundo escuro)
              corDoTextoDestacado="#0040A1" // Ex: Destacado vermelho (ex: "Acesso.")
            />

            {/* Label Superior */}
            <View className="mt-6 mb-2">
              <Text className="text-[#424654] text-xs font-bold uppercase tracking-widest px-2">
                Email
              </Text>
            </View>

            {/* Container do Input */}
            <View className="flex-row items-center border border-[#D1D5DB] rounded-2xl px-4 py-4 bg-white">
              {/* Ícone de E-mail */}
              {/* Se estiver usando Ionicons: */}
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
          </CardBranco>
        </View>
      </Screen>
    </FundoAzul>
  );
}
