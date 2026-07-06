import { fonts } from "@/app/_layout";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, TextInput, View } from "react-native";

interface SearchBarProps {
  placeholder?: string;
  onChangeText: (text: string) => void;
  value: string;
  onFocus?: () => void;
  inputRef?: React.RefObject<TextInput | null>;
  aoLimpar?: () => void; // 👈 1. ADICIONADO AQUI NA INTERFACE
}

export function SearchBar({
  placeholder = "Procurar linhas de ônibus",
  onChangeText,
  value,
  onFocus,
  inputRef,
  aoLimpar, // 👈 2. RECEBIDO AQUI
}: SearchBarProps) {
  // Função atualizada para limpar o texto e notificar o componente pai
  const handleLimparBusca = () => {
    onChangeText("");
    inputRef?.current?.blur(); // Tira o foco do teclado
    aoLimpar?.(); // 👈 3. GATILHO DISPARADO: Avisa a Home para fechar o "estaBuscando"
  };

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
      {/* Ícone de Lupa fixado no lado esquerdo */}
      <Ionicons
        name="search-outline"
        size={22}
        color="#666666"
        style={{ marginRight: 10 }}
      />

      <TextInput
        ref={inputRef}
        style={{
          fontFamily: fonts.regular,
          fontSize: 16,
        }}
        className="flex-1 h-full text-gray-700 pl-1 pr-2"
        placeholder={placeholder}
        placeholderTextColor="#888888"
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        cursorColor="#3F5CC4"
      />

      {/* BOTÃO DINÂMICO DE LIMPAR: Só renderiza se houver texto digitado */}
      {value.length > 0 && (
        <Pressable
          onPress={handleLimparBusca}
          className="p-1 -mr-1 rounded-full active:bg-gray-100"
        >
          <Ionicons name="close-circle" size={22} color="#888888" />
        </Pressable>
      )}
    </View>
  );
}
