import { Ionicons } from "@expo/vector-icons";
import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { fonts } from "../app/_layout"; // Ajuste o caminho do seu _layout se precisar

interface MenuOpcoesBlocoProps {
  aoClicarPerfil: () => void;
  aoClicarConta: () => void;
}

export const MenuOpcoesBloco = memo(function MenuOpcoesBloco({
  aoClicarPerfil,
  aoClicarConta,
}: MenuOpcoesBlocoProps) {
  return (
    <View className="w-full bg-white border border-gray-100 rounded-[28px] p-2 mt-2 shadow-sm overflow-hidden">
      {/* OPÇÃO: PERFIL */}
      <Pressable
        onPress={aoClicarPerfil}
        style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
        className="w-full flex-row items-center justify-between p-3 border-b border-gray-100"
      >
        <View className="flex-row items-center gap-4">
          <View className="w-11 h-11 bg-[#2563EB] rounded-[14px] items-center justify-center">
            <Ionicons name="person-outline" size={20} color="#FFFFFF" />
          </View>
          <Text
            style={{ fontFamily: fonts.bold }}
            className="text-gray-900 text-base"
          >
            Perfil
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#64748B" />
      </Pressable>

      {/* OPÇÃO: CONTA */}
      <Pressable
        onPress={aoClicarConta}
        style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
        className="w-full flex-row items-center justify-between p-3"
      >
        <View className="flex-row items-center gap-4">
          <View className="w-11 h-11 bg-[#2563EB] rounded-[14px] items-center justify-center">
            <Ionicons name="settings-outline" size={20} color="#FFFFFF" />
          </View>
          <Text
            style={{ fontFamily: fonts.bold }}
            className="text-gray-900 text-base"
          >
            Conta
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#64748B" />
      </Pressable>
    </View>
  );
});
