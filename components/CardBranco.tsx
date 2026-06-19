import React from "react";
import { View } from "react-native";

interface CardBrancoProps {
  children: React.ReactNode;
}

export default function CardBranco({ children }: CardBrancoProps) {
  return (
    // Voltamos com o flex-1 para ele preencher o espaço restante da tela rigidamente
    <View className="flex-1 bg-white rounded-t-[40px] mx-2 px-4 pt-8 shadow-2xl">
      {children}
    </View>
  );
}
