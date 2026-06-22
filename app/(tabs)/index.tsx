import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router"; // Importado useLocalSearchParams
import { useEffect, useState } from "react"; // Importado useEffect
import { Pressable, Text, View } from "react-native";
import { FundoAzul } from "../../components/fundoazul";
import LogoApp from "./../../assets/icons/logoApp.svg";
import { Screen } from "./../../components/safearea";
import { fonts } from "./../_layout";

export default function Index() {
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const params = useLocalSearchParams(); // Captura os parâmetros vindos da rota

  // Monitora se o parâmetro "aceitou" veio da outra tela
  useEffect(() => {
    if (params?.aceitou === "true") {
      setAceitouTermos(true);
    }
  }, [params?.aceitou]);

  return (
    <FundoAzul>
      <Screen>
        <View className="flex-1 items-start justify-center px-8">
          <View className="w-32 h-10 mb-4 items-start">
            <LogoApp
              width="100%"
              height="100%"
              preserveAspectRatio="xMinYMin meet"
            />
          </View>

          <View className="mb-2">
            <Text
              style={{
                fontFamily: fonts.bold,
                color: "#ffffff",
                fontSize: 32,
                lineHeight: 38,
              }}
            >
              Seja Bem-Vindo
            </Text>
          </View>

          <View className="mb-1">
            <Text
              style={{
                fontFamily: fonts.regular,
                color: "#ffffff",
                fontSize: 14,
                lineHeight: 20,
              }}
            >
              Busque suas rotas favoritas
            </Text>
          </View>

          {/* COMPONENTE DOS TERMOS DE USO */}
          <View className="flex-row items-center mt-6">
            <Pressable
              onPress={() => setAceitouTermos(!aceitouTermos)} // Permitindo alternar livremente também pelo clique direto
              className="mr-3 justify-center items-center"
              hitSlop={10}
            >
              <Ionicons
                name={aceitouTermos ? "checkbox" : "square-outline"}
                size={24}
                color={aceitouTermos ? "#ffffff80" : "#ffffff"}
              />
            </Pressable>

            <Text
              style={{
                fontFamily: fonts.regular,
                color: aceitouTermos ? "#ffffff80" : "#ffffff",
              }}
              className="text-sm flex-1 leading-5"
            >
              Li e estou de acordo com os{" "}
              <Text
                style={{
                  fontFamily: fonts.bold,
                  color: aceitouTermos ? "#ffffff80" : "#ffffff",
                }}
                className="underline"
                onPress={() => router.push("/termosDeUso")}
              >
                Termos de Uso e Políticas de Privacidade
              </Text>{" "}
              .
            </Text>
          </View>

          {/* BOTÃO CONTINUAR */}
          <Pressable
            onPress={() => router.push("/loginCadastro")}
            className="mt-8 rounded-xl items-center justify-center"
            style={{
              backgroundColor: "#14641E",
              width: 200,
              height: 46,
            }}
          >
            <Text
              style={{
                fontFamily: fonts.bold,
                color: "#ffffff",
                fontSize: 18,
              }}
              className="tracking-tight"
            >
              Continuar
            </Text>
          </Pressable>
        </View>
      </Screen>
    </FundoAzul>
  );
}
