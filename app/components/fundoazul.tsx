import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // Importado para pegar a barra de baixo

// Importe de SVGs
import Light from "../assets/icons/Light.svg";
import Linhas from "../assets/icons/linhas.svg";
import StarRound from "../assets/icons/starround.svg";

interface FundoAzulProps {
  children: React.ReactNode;
}

export const FundoAzul: React.FC<FundoAzulProps> = ({ children }) => {
  const insets = useSafeAreaInsets(); // Descobre o tamanho exato da barra de cliques inferior

  return (
    <View className="bg-[#1F3369] flex-1 relative overflow-hidden">
      {/* Camadas de Fundo */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {/* 1. Linhas */}
        <Linhas
          width="100%"
          height="100%"
          style={{ position: "absolute", opacity: 0.25 }}
        />

        {/* 2. Luz (Fumaça) */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "50%",
          }}
        >
          <Light
            width="180%"
            height="180%"
            style={{
              position: "absolute",
              top: -220,
              left: -120,
              opacity: 0.8,
            }}
          />
        </View>

        {/* 3. Estrelas/Pontos */}
        <StarRound
          width="100%"
          height="100%"
          style={{ position: "absolute", opacity: 0.6 }}
        />
      </View>

      {/* Conteúdo da sua tela */}
      {children}

      
      {insets.bottom > 0 && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: insets.bottom,
            backgroundColor: "#ffffff",
          }}
        />
      )}
    </View>
  );
};
