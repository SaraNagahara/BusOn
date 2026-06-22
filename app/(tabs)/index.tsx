import { Redirect, router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Screen } from "./../../components/safearea";

export default function Index() {
  return (
    <Screen>
      <View className="flex-1 items-center justify-center">
        <Text>Tela inicial</Text>
        {/*Codigo criado somente para direcionar direto pra uma pagina pra vizualização no expo go */}
        <Redirect href="/loginCadastro" />
        <Pressable
          onPress={() => router.push("/inicial")}
          className="mt-4 bg-blue-500 px-4 py-2 rounded"
        >
          <Text className="text-white">Continuar</Text>
        </Pressable>
      </View>
    </Screen>
  );
}
