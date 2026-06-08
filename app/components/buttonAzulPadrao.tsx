import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity, ViewStyle } from "react-native";

interface ButtonProps {
  titulo: string;
  onPress: () => void;
  style?: ViewStyle;
}

export default function ButtonAzulPadrao({
  titulo,
  onPress,
  style,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="mt-10 w-full"
      style={[
        {
          // CORRIGIDO: Era selfAlign, o correto é alignSelf
          alignSelf: "stretch",
          width: "auto", // Garante que a margem horizontal funcione

          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          borderRadius: 9999,
        },
        style,
      ]}
    >
      <LinearGradient
        colors={["#1D61E7", "#1D61E7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="py-4 items-center justify-center borderColor: #ffff"
        style={{
          borderRadius: 20,
          width: "100%",
        }}
      >
        <Text className="text-white text-xl font-bold">{titulo}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
