import { fonts } from "@/app/_layout";
import { Ionicons } from "@expo/vector-icons";
import { memo } from "react";
import { Text, View } from "react-native";

// 📋 Definição dos dados que o componente espera receber do banco de dados
interface UsuarioDadosProps {
  usuario?: {
    nome: string;
    email: string;
    // telefone: string;
  };
}

export const DadosPessoaisCard = memo(function DadosPessoaisCard({
  usuario,
}: UsuarioDadosProps) {
  // ⚡ Valores padrão caso o banco de dados demore a carregar ou venha nulo
  const nome = usuario?.nome || "-";
  const email = usuario?.email || "-";
  // const telefone = usuario?.telefone || "-";

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
      {/* <View className="w-full mb-5">
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
      </View> */}
    </View>
  );
});
