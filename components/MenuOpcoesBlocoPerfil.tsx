import { Ionicons } from "@expo/vector-icons";
import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { fonts } from "../app/_layout"; // Ajuste o caminho do seu _layout se precisar

// 📋 Definição de cada item individual do menu
export interface ItemMenuOpcao {
  titulo: string;
  onPress: () => void;
  iconeNome: keyof typeof Ionicons.glyphMap; // Força o TypeScript a sugerir apenas ícones válidos do Ionicons
  iconeCor?: string; // Opcional, padrão é #FFFFFF
  bgIconeCor?: string; // Opcional, você pode passar a cor em HEX ex: '#EF4444' para deletar conta
  mostrarItem?: boolean; // Permite esconder ou mostrar dinamicamente o item (ex: baseado em regras)
}

interface MenuOpcoesBlocoProps {
  opcoes: ItemMenuOpcao[];
}

export const MenuOpcoesBloco = memo(function MenuOpcoesBloco({
  opcoes,
}: MenuOpcoesBlocoProps) {
  // ⚡ Filtra para renderizar apenas os itens que não foram definidos como ocultos (mostrarItem !== false)
  const opcoesVisiveis = opcoes.filter((opcao) => opcao.mostrarItem ?? true);

  // Se não houver nenhuma opção para mostrar, o bloco não renderiza nada na tela (Otimização de layout)
  if (opcoesVisiveis.length === 0) return null;

  return (
    <View className="w-full bg-white border border-gray-100 rounded-[28px] p-2 mt-2 shadow-sm overflow-hidden">
      {opcoesVisiveis.map((opcao, index) => {
        // Verifica se é o último item visível para remover a borda inferior
        const ehOUltimo = index === opcoesVisiveis.length - 1;

        return (
          <Pressable
            key={index}
            onPress={opcao.onPress}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            className={`w-full flex-row items-center justify-between p-3 ${
              ehOUltimo ? "" : "border-b border-gray-100"
            }`}
          >
            <View className="flex-row items-center gap-4">
              {/* Container do Ícone com cor de fundo totalmente customizável */}
              <View
                style={{ backgroundColor: opcao.bgIconeCor || "#2563EB" }}
                className="w-11 h-11 rounded-[14px] items-center justify-center"
              >
                <Ionicons
                  name={opcao.iconeNome}
                  size={20}
                  color={opcao.iconeCor || "#FFFFFF"}
                />
              </View>

              {/* Texto Customizável */}
              <Text
                style={{ fontFamily: fonts.bold }}
                className="text-gray-900 text-base"
              >
                {opcao.titulo}
              </Text>
            </View>

            {/* Seta indicativa padrão */}
            <Ionicons name="chevron-forward" size={18} color="#64748B" />
          </Pressable>
        );
      })}
    </View>
  );
});
