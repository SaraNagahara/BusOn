import { Ionicons } from "@expo/vector-icons";
import { memo } from "react";
import { Text, View } from "react-native";
import { fonts } from "../app/_layout";

// 📋 Definição dos dados que o componente espera receber do banco de dados
interface UsuarioDadosProps {
  usuario?: {
    nome: string;
    email: string;
    telefone: string;
    dataVerificacao?: string;
  };
}

export const DadosPessoaisCard = memo(function DadosPessoaisCard({
  usuario,
}: UsuarioDadosProps) {
  // ⚡ Valores padrão caso o banco de dados demore a carregar ou venha nulo
  const nome = usuario?.nome || "-";
  const email = usuario?.email || "-";
  const telefone = usuario?.telefone || "-";
  const dataVerificacao = usuario?.dataVerificacao || "03/04/2026";

  return (
    <View className="w-full bg-white border border-gray-100 rounded-[28px] p-5 shadow-sm">
      {/* 📋 TÍTULO DO BLOCO */}
      <Text
        style={{ fontFamily: fonts.bold }}
        className="text-xl text-slate-900 mb-5"
      >
        Dados Pessoais
      </Text>

      {/* 👤 CAMPO: NOME COMPLETO */}
      <View className="w-full mb-4">
        <Text
          style={{ fontFamily: fonts.regular }}
          className="text-sm text-gray-400 mb-1.5"
        >
          Nome completo
        </Text>
        <View className="w-full flex-row items-center bg-[#F8FAFC] border border-gray-200 rounded-[16px] px-4 py-3.5">
          <Ionicons
            name="person-outline"
            size={20}
            color="#64748B"
            className="mr-3"
          />
          <Text
            style={{ fontFamily: fonts.bold }}
            className="text-slate-900 text-base flex-1"
          >
            {nome}
          </Text>
        </View>
      </View>

      {/* ✉️ CAMPO: ENDEREÇO DE E-MAIL */}
      <View className="w-full mb-4">
        <Text
          style={{ fontFamily: fonts.regular }}
          className="text-sm text-gray-400 mb-1.5"
        >
          Endereço de e-mail
        </Text>
        <View className="w-full flex-row items-center bg-[#F8FAFC] border border-gray-100 rounded-[16px] px-4 py-3.5">
          <Ionicons
            name="mail-outline"
            size={20}
            color="#64748B"
            className="mr-3"
          />
          <Text
            style={{ fontFamily: fonts.bold }}
            className="text-slate-900 text-base flex-1"
          >
            {email}
          </Text>
        </View>
      </View>

      {/* 📞 CAMPO: TELEFONE */}
      <View className="w-full mb-5">
        <Text
          style={{ fontFamily: fonts.regular }}
          className="text-sm text-gray-400 mb-1.5"
        >
          Telefone
        </Text>
        <View className="w-full flex-row items-center bg-[#F8FAFC] border border-gray-100 rounded-[16px] px-4 py-3.5">
          <Ionicons
            name="call-outline"
            size={20}
            color="#64748B"
            className="mr-3"
          />
          <Text
            style={{ fontFamily: fonts.bold }}
            className="text-slate-900 text-base flex-1"
          >
            {telefone}
          </Text>
        </View>
      </View>

      {/* 🛡️ INDICADOR DE CONTA VERIFICADA */}
      <View className="w-full flex-row items-center justify-center gap-1.5 pt-1">
        <Ionicons name="checkmark-circle" size={16} color="#84CC16" />
        <Text
          style={{ fontFamily: fonts.regular }}
          className="text-xs text-gray-400"
        >
          Conta verificada em {dataVerificacao}
        </Text>
      </View>
    </View>
  );
});
