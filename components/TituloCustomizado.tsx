import React from "react";
import { Text, View } from "react-native";
import { fonts } from "./../app/_layout"; // Certifique-se de que este caminho está correto

// IMPORTANDO SEU SVG PADRÃO
// (conforme você baixou e chamou de tracinho.svg)
import TracinhoSvg from "../assets/icons/tracinho.svg";

interface TituloCustomizadoProps {
  titulo: string; // O texto que você quer exibir (ex: "Recupere seu Acesso")
  corDoTexto?: string; // Cor opcional para o texto principal (padrão será preto)
  corDoTextoDestacado?: string; // Cor opcional para a última palavra (padrão será o azul escuro)
}

export const TituloCustomizado: React.FC<TituloCustomizadoProps> = ({
  titulo,
  corDoTexto = "#000000", // Padrão preto
  corDoTextoDestacado = "#0047AB", // Padrão azul escuro forte (ex: "Acesso")
}) => {
  // Lógica para separar o texto e destacar a última palavra
  const palavras = titulo.trim().split(" ");
  const ultimaPalavra = palavras.pop() || "";
  const restoDoTexto = palavras.join(" ");

  return (
    <View className="mb-6 items-start">
      {/* 1. O TRACINHO SVG PADRÃO (Ele usa a cor original do arquivo) */}
      <View style={{ marginBottom: 12 }}>
        <TracinhoSvg
          width={60} // Largura da linha (ajuste conforme o design)
          height={6} // Altura/espessura da linha (ajuste conforme o design)
        />
      </View>

      {/* 2. O TEXTO CUSTOMIZÁVEL E COM DESTAQUE */}
      <Text
        style={{
          fontFamily: fonts.bold,
          color: corDoTexto,
          fontSize: 32, // Tamanho grande como na imagem
          lineHeight: 38, // Ajuste fino para não sobrepor as linhas
        }}
      >
        {restoDoTexto}{" "}
        <Text style={{ color: corDoTextoDestacado }}>{ultimaPalavra}</Text>
      </Text>
    </View>
  );
};
