import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Importe de SVGs
import Light from "../assets/icons/Light.svg";
import Linhas from "../assets/icons/linhas.svg";
import StarRound from "../assets/icons/starround.svg";

interface FundoAzulProps {
  children: React.ReactNode;
}

export const FundoAzul: React.FC<FundoAzulProps> = ({ children }) => {
  const insets = useSafeAreaInsets();

  return (
    <View className="bg-[#1F3369] flex-1 relative overflow-hidden">
      {/* Camadas de Fundo */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {/* ========================================================
            CAMADA 1: LINHAS (Espalhadas em cima, meio e baixo)
           ======================================================== */}
        {/* No Topo */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            opacity: 0.6,
          }}
        >
          <Linhas width="100%" height={250} />
        </View>

        {/* No Meio */}
        <View
          style={{
            position: "absolute",
            top: "40%",
            left: 0,
            right: 0,
            opacity: 0.6,
            transform: [{ scaleY: -1 }],
          }}
        >
          {/* O transform espelha o SVG para que o desenho do meio não fique idêntico ao do topo */}
          <Linhas width="100%" height={250} />
        </View>

        {/* Em Baixo */}
        <View
          style={{
            position: "absolute",
            bottom: insets.bottom + 20,
            left: 0,
            right: 0,
            opacity: 0.6,
          }}
        >
          <Linhas width="100%" height={250} />
        </View>

        {/* ========================================================
            CAMADA 2: LUZ / FUMAÇA (Efeito de brilho no topo)
           ======================================================== */}
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
              opacity: 0.5,
            }}
          />
        </View>

        {/* ========================================================
    CAMADA 3: ESTRELAS / PONTOS (Visíveis e Espalhadas)
   ======================================================== */}
        {/* No Topo */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: "60%",
            opacity: 0.7,
          }}
        >
          <StarRound width="100%" height="100%" />
        </View>

        {/* No Meio */}
        <View
          style={{
            position: "absolute",
            top: "30%",
            left: 0,
            right: 0,
            bottom: "30%",
            opacity: 0.7,
            transform: [{ scaleX: -1 }],
          }}
        >
          <StarRound width="100%" height="100%" />
        </View>

        {/* Em Baixo */}
        <View
          style={{
            position: "absolute",
            top: "60%",
            left: 0,
            right: 0,
            bottom: insets.bottom,
            opacity: 0.7,
          }}
        >
          <StarRound width="100%" height="100%" />
        </View>

        {/* No Meio (Invertido e deslocado) */}
        <View
          style={{
            position: "absolute",
            top: "50%",
            left: -40,
            right: 0,
            opacity: 0.5,
            transform: [{ scaleX: -1 }],
          }}
        >
          <StarRound width="100%" height={200} />
        </View>

        {/* Em Baixo */}
        <View
          style={{
            position: "absolute",
            bottom: insets.bottom + 80,
            left: 20,
            right: 0,
            opacity: 0.5,
          }}
        >
          <StarRound width="100%" height={200} />
        </View>
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
