import { fonts } from "@/app/_layout";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export interface OperacaoItem {
  id: string;
  label: string;
}
export interface PeriodoItem {
  id: string;
  label: string;
}

interface FiltroHorarioOpcionalProps {
  operacoesDisponiveis: OperacaoItem[];
  periodosDisponiveis: PeriodoItem[];
  onSelecionarFiltros: (operacaoId: string, periodoId: string) => void;
}

export default function FiltroHorarioOpcional({
  operacoesDisponiveis,
  periodosDisponiveis,
  onSelecionarFiltros,
}: FiltroHorarioOpcionalProps) {
  const [operacaoAtiva, setOperacaoAtiva] = useState<string>(
    operacoesDisponiveis[0]?.id || "",
  );
  const [periodoAtivo, setPeriodoAtivo] = useState<string>(
    periodosDisponiveis[0]?.id || "",
  );

  return (
    <View className="w-full bg-white rounded-3xl p-5 border border-gray-100 shadow-sm gap-y-6">
      {/* 📅 SEÇÃO: OPERAÇÃO */}
      <View>
        <Text
          style={{ fontFamily: fonts.medium }}
          className="text-[#5E6370] text-xs uppercase tracking-wider mb-3"
        >
          Operação
        </Text>
        <View className="flex-row flex-wrap gap-3">
          {operacoesDisponiveis.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setOperacaoAtiva(item.id)}
              style={{
                backgroundColor:
                  operacaoAtiva === item.id ? "#3F5CC4" : "#F1F3F6",
              }}
              className={`flex-1 min-w-[120px] h-12 rounded-2xl items-center justify-center border ${operacaoAtiva === item.id ? "border-[#3F5CC4]" : "border-[#E5E7EB]"}`}
            >
              <Text
                style={{ fontFamily: fonts.medium }}
                className={`text-sm ${operacaoAtiva === item.id ? "text-white" : "text-[#424654]"}`}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ⏰ SEÇÃO: PERÍODO */}
      <View>
        <Text
          style={{ fontFamily: fonts.medium }}
          className="text-[#5E6370] text-xs uppercase tracking-wider mb-3"
        >
          Período
        </Text>
        <View className="flex-row flex-wrap gap-2.5">
          {periodosDisponiveis.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setPeriodoAtivo(item.id)}
              style={{
                backgroundColor:
                  periodoAtivo === item.id ? "#3F5CC4" : "#F1F3F6",
              }}
              className={`px-4 py-2.5 rounded-2xl border ${periodoAtivo === item.id ? "border-[#3F5CC4]" : "border-[#E5E7EB]"}`}
            >
              <Text
                style={{ fontFamily: fonts.regular }}
                className={`text-sm ${periodoAtivo === item.id ? "text-white" : "text-[#424654]"}`}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* BOTÃO APLICAR */}
      <TouchableOpacity
        onPress={() => onSelecionarFiltros(operacaoAtiva, periodoAtivo)}
        className="bg-[#3F5CC4] h-14 rounded-2xl items-center justify-center mt-2"
        activeOpacity={0.8}
      >
        <Text
          style={{ fontFamily: fonts.medium }}
          className="text-white text-base font-semibold"
        >
          Aplicar Filtros
        </Text>
      </TouchableOpacity>
    </View>
  );
}
