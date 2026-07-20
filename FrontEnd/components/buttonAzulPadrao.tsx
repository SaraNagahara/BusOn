import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { Text, TouchableOpacity, ViewStyle } from "react-native";

interface ButtonProps {
  titulo: string;
  onPress: () => void;
  style?: ViewStyle;
  icone?: ReactNode;
}

export default function ButtonAzulPadrao({
  titulo,
  onPress,
  style,
  icone,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="w-full"
      style={[
        {
          alignSelf: "stretch",
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          borderRadius: 20,
          overflow: "hidden",
        },
        style,
      ]}
    >
      <LinearGradient
        colors={["#1D61E7", "#1D61E7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          paddingVertical: 14, // ⚡ Reduzi de 16 para 14 para ficar menos robusto
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: 8,
          width: "100%",
        }}
      >
        {icone}
        <Text
          style={{
            color: "#fff",
            fontSize: 16, // ⚡ Reduzi de 20 para 16 para ficar mais harmônico na página
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {titulo}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
