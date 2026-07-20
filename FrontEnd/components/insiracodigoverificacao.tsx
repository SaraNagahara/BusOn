import { useRef, useState } from "react";
import { NativeSyntheticEvent, TextInput, View } from "react-native";

// Definimos o que o nosso componente reutilizável pode receber
interface CodigoVerificacaoProps {
  onCodeComplete?: (code: string) => void; // 🚀 Agora dispara quando o usuário digita os 5 números
}

export default function InputsCodigoVerificacao({
  onCodeComplete,
}: CodigoVerificacaoProps) {
  // 🚀 CORRIGIDO: Agora o estado inicial tem 5 posições
  const [code, setCode] = useState<string[]>(["", "", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // 🚀 Seus 5 refs perfeitos aqui
  const inputs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleChangeText = (text: string, index: number) => {
    const numericText = text.replace(/[^0-9]/g, "");
    const newCode = [...code];
    newCode[index] = numericText.slice(-1);
    setCode(newCode);

    // Junta o array para mandar o texto completo para o componente pai
    const fullCode = newCode.join("");
    // 🚀 CORRIGIDO: Verifica se atingiu os 5 dígitos
    if (onCodeComplete && fullCode.length === 5) {
      onCodeComplete(fullCode);
    }

    // 🚀 CORRIGIDO: Se digitou e não for o último (índice 4), pula pro próximo
    if (numericText && index < 4) {
      inputs[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<{ key: string }>,
    index: number,
  ) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputs[index - 1].current?.focus();
    }
  };

  return (
    <View className="flex-row justify-center items-center">
      {code.map((value, index) => (
        <TextInput
          key={index}
          ref={inputs[index]}
          value={value}
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(null)}
          keyboardType="number-pad"
          maxLength={1}
          textAlign="center"
          className="rounded-2xl bg-white text-2xl text-black font-bold"
          style={[
            {
              width: 56, // 💡 Reduzi levemente de 64 para 56 para garantir que 5 blocos caibam bem em telas menores
              height: 64,
              marginRight: index !== code.length - 1 ? 10 : 0, // Ajustado o espaçamento dinâmico
              borderWidth: 2,
              borderRadius: 16,
              backgroundColor: "white",
              textAlign: "center",
              fontSize: 24,
              fontWeight: "bold",
              color: "black",
            },
            focusedIndex === index
              ? { borderColor: "#42C6C5" }
              : { borderColor: "#D1D5DB" },
          ]}
        />
      ))}
    </View>
  );
}
