import { useRef, useState } from "react";
import { NativeSyntheticEvent, TextInput, View } from "react-native";

// Definimos o que o nosso componente reutilizável pode receber
interface CodigoVerificacaoProps {
  onCodeComplete?: (code: string) => void; // Dispara quando o usuário digita os 4 números
}

export default function InputsCodigoVerificacao({
  onCodeComplete,
}: CodigoVerificacaoProps) {
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const inputs = [
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
    if (onCodeComplete && fullCode.length === 4) {
      onCodeComplete(fullCode);
    }

    if (numericText && index < 3) {
      inputs[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (
    // CORRIGIDO: Removido o tipo deprecated e usada a abordagem genérica compatível
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
              width: 64,
              height: 64,
              marginRight: index !== code.length - 1 ? 12 : 0,
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
