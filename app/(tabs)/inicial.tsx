import { Text, View } from "react-native";
import { Screen } from "../../components/safearea";

export default function Inicial() {
  return (
    <Screen>
      <View className="flex-1 items-center justify-center">
        <Text>Você chegou na Home 🚀</Text>
      </View>
    </Screen>
  );
}
