import { fonts } from "@/app/_layout";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export interface HorarioItem {
  hora: string;
  detalhe?: string;
}

export interface BlocoHorarios {
  titulo: string;
  itens: HorarioItem[];
}

interface Props {
  dados: BlocoHorarios[];
}

export const ListaHorariosDaRotaSelecionada = ({ dados }: Props) => {
  return (
    <View className="flex-1 w-full gap-y-4">
      {dados.map((bloco, bIndex) => (
        <View
          key={bIndex}
          className="border border-gray-200 rounded-2xl bg-white overflow-hidden"
        >
          {/* Cabeçalho do Bloco */}
          <View className="flex-row items-center p-4 border-b border-gray-100">
            <FontAwesome name="calendar-o" size={16} color="#64748b" />
            <Text
              style={{ fontFamily: fonts.bold }}
              className="ml-2 text-gray-600 text-xs tracking-widest"
            >
              {bloco.titulo.toUpperCase()}
            </Text>
          </View>

          {/* Lista de Horários */}
          {bloco.itens.map((item, iIndex) => {
            const isDireto = !item.detalhe || item.detalhe === "Direto";

            return (
              <View
                key={iIndex}
                className={`flex-row items-center px-4 py-4 ${iIndex !== bloco.itens.length - 1 ? "border-b border-gray-100" : ""}`}
              >
                <Text
                  style={{ fontFamily: fonts.bold }}
                  className="text-gray-900 text-lg w-20"
                >
                  {item.hora}
                </Text>

                {/* Badge personalizada para "Via..." */}
                {!isDireto ? (
                  <View className="flex-row items-center px-2 py-1 rounded-md bg-slate-100 border border-slate-200">
                    <MaterialCommunityIcons
                      name="transit-connection-variant"
                      size={12}
                      color="#64748b"
                      className="mr-1"
                    />
                    <Text
                      style={{ fontFamily: fonts.medium }}
                      className="text-slate-600 text-xs ml-1"
                    >
                      {item.detalhe}
                    </Text>
                  </View>
                ) : (
                  <Text
                    style={{ fontFamily: fonts.medium }}
                    className="text-gray-500 text-sm"
                  >
                    Direto
                  </Text>
                )}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};
