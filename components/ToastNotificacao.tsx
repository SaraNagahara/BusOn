import { Ionicons } from "@expo/vector-icons";
import { memo, useEffect } from "react"; // 🚀 Adicionado useEffect
import { Text, TouchableOpacity, View } from "react-native";
import { fonts } from "../app/_layout";

interface ToastNotificacaoProps {
  mensagem: string;
  tipo: "sucesso" | "erro";
  aoFechar: () => void;
  mostrar?: boolean;
}

export const ToastNotificacao = memo(function ToastNotificacao({
  mensagem,
  tipo,
  aoFechar,
  mostrar = true,
}: ToastNotificacaoProps) {
  // 🚀 UX AUTOMÁTICA: Fecha o toast sozinho após 4 segundos
  useEffect(() => {
    if (mostrar) {
      const timer = setTimeout(() => {
        aoFechar();
      }, 4000); // 4000ms = 4 segundos (tempo ideal de leitura para frases curtas)

      return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado antes
    }
  }, [mostrar, aoFechar]);

  if (!mostrar) return null;

  const ehSucesso = tipo === "sucesso";
  const iconeNome = ehSucesso
    ? "shield-checkmark-outline"
    : "alert-circle-outline";
  const corPrincipal = ehSucesso ? "#1D61E7" : "#EF4444";

  return (
    <View
      style={{
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
      className="w-full bg-white border border-gray-100 rounded-2xl p-4 flex-row items-center justify-between"
    >
      {/* LADO ESQUERDO: ÍCONE + TEXTO */}
      <View className="flex-row items-center flex-1 pr-4 gap-3">
        <Ionicons name={iconeNome} size={22} color={corPrincipal} />

        <Text
          style={{ fontFamily: fonts.bold }}
          className="text-slate-950 text-base flex-1"
        >
          {mensagem}
        </Text>
      </View>

      {/* LADO DIREITO: BOTÃO FECHAR MANUALLY (X) */}
      <TouchableOpacity onPress={aoFechar} activeOpacity={0.6} className="p-1">
        <Ionicons name="close-outline" size={22} color="#0f172a" />
      </TouchableOpacity>
    </View>
  );
});
