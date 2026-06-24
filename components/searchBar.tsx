import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";
import { fonts } from "../app/_layout";

interface SearchBarProps {
  placeholder?: string;
  onChangeText: (text: string) => void;
  value: string;
  onFocus?: () => void;
  // Mudando para 'any' o TypeScript para de brigar entre o Inicial.tsx e o SearchBar.tsx
  inputRef?: any;
}

export function SearchBar({
  placeholder = "Procurar linhas de ônibus",
  onChangeText,
  value,
  onFocus,
  inputRef,
}: SearchBarProps) {
  return (
    <View
      className="w-full flex-row items-center bg-white border border-gray-400 rounded-full h-14 px-5 my-4"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <TextInput
        ref={inputRef}
        style={{
          fontFamily: fonts.regular,
          fontSize: 16,
        }}
        className="flex-1 h-full text-gray-700 pr-3"
        placeholder={placeholder}
        placeholderTextColor="#888888"
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        cursorColor="#3F5CC4"
      />

      <Ionicons name="search-outline" size={22} color="#666666" />
    </View>
  );
}
