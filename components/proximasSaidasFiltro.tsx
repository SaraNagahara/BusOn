import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { fonts } from "../app/_layout";

export type FiltroOpcoes = "rodoviaria" | "destino";

interface ProximasSaidasProps {
  filtroAtivo: FiltroOpcoes;
  aoMudarFiltro: (filtro: FiltroOpcoes) => void;
}

export function ProximasSaidas({
  filtroAtivo,
  aoMudarFiltro,
}: ProximasSaidasProps) {
  const [menuAberto, setMenuAberto] = useState(false);

  // Texto que fica visível no botão principal
  const textoBotao = filtroAtivo === "rodoviaria" ? "Rodoviária" : "Destino";

  const handleSelecionar = (opcao: FiltroOpcoes) => {
    aoMudarFiltro(opcao);
    setMenuAberto(false);
  };

  return (
    <View className="w-full mt-4 mb-2 z-50" style={{ overflow: "visible" }}>
      <View className="w-full flex-row justify-between items-center h-12">
        {/* TÍTULO FIXO */}
        <Text
          style={{ fontFamily: fonts.bold }}
          className="text-[#000000] text-xl tracking-tight"
        >
          Próximas saídas
        </Text>

        {/* SELETOR ESTILO DROPDOWN */}
        <View className="relative">
          <Pressable
            onPress={() => setMenuAberto(!menuAberto)}
            className="flex-row items-center bg-[#F0F2F5] h-10 px-5 rounded-full active:opacity-70"
          >
            <Text
              style={{ fontFamily: fonts.medium }}
              className="text-[#3F5CC4] text-sm mr-2"
            >
              {textoBotao}
            </Text>
            <Ionicons
              name={menuAberto ? "chevron-up" : "chevron-down"}
              size={16}
              color="#3F5CC4"
            />
          </Pressable>

          {/* MENU ABERTO: Agora maior, mais largo e super confortável para o dedo */}
          {menuAberto && (
            <View
              className="absolute right-0 top-12 bg-white border border-gray-100 rounded-2xl w-44 py-2 shadow-xl z-50"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 6,
              }}
            >
              {/* OPÇÃO: RODOVIÁRIA */}
              <Pressable
                onPress={() => handleSelecionar("rodoviaria")}
                className="flex-row justify-between items-center px-5 py-3.5 active:bg-gray-50"
              >
                <Text
                  style={{
                    fontFamily:
                      filtroAtivo === "rodoviaria"
                        ? fonts.medium
                        : fonts.regular,
                  }}
                  className={`text-base ${filtroAtivo === "rodoviaria" ? "text-[#3F5CC4]" : "text-gray-700"}`}
                >
                  Rodoviária
                </Text>
                {filtroAtivo === "rodoviaria" && (
                  <Ionicons name="checkmark" size={18} color="#3F5CC4" />
                )}
              </Pressable>

              {/* OPÇÃO: DESTINO */}
              <Pressable
                onPress={() => handleSelecionar("destino")}
                className="flex-row justify-between items-center px-5 py-3.5 border-t border-gray-50 active:bg-gray-50"
              >
                <Text
                  style={{
                    fontFamily:
                      filtroAtivo === "destino" ? fonts.medium : fonts.regular,
                  }}
                  className={`text-base ${filtroAtivo === "destino" ? "text-[#3F5CC4]" : "text-gray-700"}`}
                >
                  Destino
                </Text>
                {filtroAtivo === "destino" && (
                  <Ionicons name="checkmark" size={18} color="#3F5CC4" />
                )}
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
