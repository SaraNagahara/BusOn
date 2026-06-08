import React from "react";
import { Text, View } from "react-native";
import { fonts } from "../_layout";

interface TituloCustomizadoAzulProps {
  titulo: string; // O texto que você quer exibir (ex: "Recupere seu Acesso")
  corDoTexto?: string; // Cor opcional para o texto principal (padrão será preto)
  corDoTextoDestacado?: string; // Cor opcional para a última palavra (padrão será o azul escuro)
}

export const TituloCustomizadoAzul: React.FC<TituloCustomizadoAzulProps> = ({
  titulo,
  corDoTexto = "#000000",
  corDoTextoDestacado = "#0047AB",
}) => {
  // Lógica para separar o texto e destacar a última palavra
  const palavras = titulo.trim().split(" ");
  const ultimaPalavra = palavras.pop() || "";
  const restoDoTexto = palavras.join(" ");

  return (
    <View className="mb-6 items-start">
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
