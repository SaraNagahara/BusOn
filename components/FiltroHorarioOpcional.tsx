import { fonts } from "@/app/_layout";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

// Definição dos tipos para os dados que vêm do Banco de Dados
export interface OperacaoItem {
  id: string;
  label: string; // Ex: "Seg - Sáb", "Dom / Fer"
}

export interface PeriodoItem {
  id: string;
  label: string; // Ex: "06:00 - 09:00", "09:00 - 12:00"
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
  // Estados para controlar o item clicado/ativo
  const [operacaoAtiva, setOperacaoAtiva] = useState<string>(operacoesDisponiveis[0]?.id || "");
  const [periodoAtivo, setPeriodoAtivo] = useState<string>(periodosDisponiveis[0]?.id || "");

  const handleMudarOperacao = (id: string) => {
    setOperacaoAtiva(id);
    onSelecionarFiltros(id, periodoAtivo);
  };

  const handleMudarPeriodo = (id: string) => {
    setPeriodoAtivo(id);
    onSelecionarFiltros(operacaoAtiva, id);
  };

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
          {operacoesDisponiveis.map((item) => {
            const ehAtivo = operacaoAtiva === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleMudarOperacao(item.id)}
                activeOpacity={0.8}
                style={{ backgroundColor: ehAtivo ? "#3F5CC4" : "#F1F3F6" }}
                className={`flex-1 min-w-[120px] h-12 rounded-2xl items-center justify-center border ${
                  ehAtivo ? "border-[#3F5CC4]" : "border-[#E5E7EB]"
                }`}
              >
                <Text
                  style={{ fontFamily: fonts.medium }}
                  className={`text-sm ${ehAtivo ? "text-white font-semibold" : "text-[#424654]"}`}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
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
        
        {/* Usamos flex-row e flex-wrap para que os horários quebrem de linha sozinhos caso cheguem muitos */}
        <View className="flex-row flex-wrap gap-2.5">
          {periodosDisponiveis.map((item) => {
            const ehAtivo = periodoAtivo === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleMudarPeriodo(item.id)}
                activeOpacity={0.8}
                style={{ backgroundColor: ehAtivo ? "#3F5CC4" : "#F1F3F6" }}
                className={`px-4 py-2.5 rounded-2xl items-center justify-center border ${
                  ehAtivo ? "border-[#3F5CC4]" : "border-[#E5E7EB]"
                }`}
              >
                <Text
                  style={{ fontFamily: fonts.regular }}
                  className={`text-sm ${ehAtivo ? "text-white font-medium" : "text-[#424654]"}`}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

    </View>
  );
}