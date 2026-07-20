import React from "react";
import { StyleProp, View, ViewStyle } from "react-native"; // 🚀 Adicionado ViewStyle e StyleProp

interface CardBrancoProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>; // 🚀 Adicionado o style opcional (?) para não quebrar o resto do app
}

export default function CardBranco({ children, style }: CardBrancoProps) {
  return (
    // Voltamos com o flex-1 para ele preencher o espaço restante da tela rigidamente
    // 🚀 Usamos a propriedade style passando uma lista: o estilo vindo de fora complementa o componente
    <View
      style={style}
      className="flex-1 bg-white rounded-t-[40px] mx-2 px-4 pt-8 shadow-2xl"
    >
      {children}
    </View>
  );
}
