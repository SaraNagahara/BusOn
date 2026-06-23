import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, View } from "react-native";
import { fonts } from "../app/_layout"; // Ajuste o caminho das fontes se necessário

interface SearchBarProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
}

export function SearchBar({
  placeholder = "Procurar linhas de ônibus",
  onChangeText,
  value,
}: SearchBarProps) {
  const [text, setText] = useState("");

  return (
    <View
      className="w-full flex-row items-center bg-white border border-gray-400 rounded-full h-14 px-5 my-4"
      style={{
        // Cria aquela sombra suave idêntica à da imagem
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3, // Sombra para Android
      }}
    >
      {/* Campo de Texto */}
      <TextInput
        style={{
          fontFamily: fonts.regular,
          fontSize: 16,
        }}
        className="flex-1 h-full text-gray-700 pr-3"
        placeholder={placeholder}
        placeholderTextColor="#888888"
        value={value !== undefined ? value : text}
        onChangeText={onChangeText || setText}
        cursorColor="#3F5CC4" // Cor do cursor combinando com seu menu
      />

      {/* Ícone de Lupa */}
      <Ionicons name="search-outline" size={22} color="#666666" />
    </View>
  );
}
