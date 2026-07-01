import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react"; // ⚡ Importado
import { Text, TouchableOpacity, ViewStyle } from "react-native";

interface ButtonProps {
  titulo: string;
  onPress: () => void;
  style?: ViewStyle;
  icone?: ReactNode; // ⚡ Nova propriedade opcional para o ícone
}

export default function ButtonAzulPadrao({
  titulo,
  onPress,
  style,
  icone,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="mt-10 w-full"
      style={[
        {
          alignSelf: "stretch",
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          borderRadius: 20,
          overflow: "hidden",
        },
        style,
      ]}
    >
      <LinearGradient
        colors={["#1D61E7", "#1D61E7"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          paddingVertical: 16,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row", // ⚡ Garante que ícone e texto fiquem lado a lado
          gap: 8, // ⚡ Espaçamento entre ícone e texto
          width: "100%",
        }}
      >
        {icone && icone} {/* ⚡ Renderiza o ícone se ele existir */}
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {titulo}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
