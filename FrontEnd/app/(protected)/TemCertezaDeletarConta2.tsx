import ButtonAzulPadrao from "@/components/buttonAzulPadrao";
import PasswordInputField from "@/components/PasswordInputField"; // 🚀 Seu componente padrão de senha
import { Screen } from "@/components/safearea";
import { useAuth } from "@/context/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TemCertezaDeletarConta2() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { usuarioLogado } = useAuth();

  // Estados dos inputs de senha
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // Estado para controlar a exibição do Popup/Modal
  const [modalVisivel, setModalVisivel] = useState(false);

  const veioDoPerfil = params?.origem === "perfil";

  /* 🛡️ TRAVA DE SEGURANÇA:
     Direciona para o seu /notfound.tsx caso o acesso seja inválido */
  if (usuarioLogado && !veioDoPerfil) {
    return <Redirect href="/notfound" />;
  }

  // 🚀 Validação inicial antes de abrir o modal de confirmação
  const handleValidarCampos = () => {
    // if (!senha || !confirmarSenha) {
    //   alert("Por favor, preencha todos os campos de senha.");
    //   return;
    // }
    // if (senha !== confirmarSenha) {
    //   alert("As senhas digitadas não coincidem.");
    //   return;
    // }
    // Se estiver tudo certo localmente, abre o popup de confirmação final
    setModalVisivel(true);
  };

  // 💾 Conexão pronta para receber a integração do Banco de Dados / API futuramente
  const handleDeletarContaDefinitivo = async () => {
    setModalVisivel(false);
    try {
      // const resposta = await api.delete('/usuario/deletar', { data: { senha } });

      // Sucesso na exclusão -> Redireciona para a tela final de sucesso
      router.push("/ContaDeletadaSucesso");
    } catch (error) {
      console.error("Erro ao deletar conta:", error);
      alert("Erro ao validar senha com o servidor. Tente novamente.");
    }
  };

  return (
    <View className="flex-1 bg-[#F8FAFC] px-6">
      <Screen>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
          keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            // 🚀 CORRIGIDO: Removido o alignItems daqui para não esmagar os componentes filhos
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            className="w-full"
            keyboardShouldPersistTaps="handled"
          >
            {/* 🚀 CONTAINER PRINCIPAL: Garante largura total e alinhamento centralizado */}
            <View className="w-full items-center justify-center py-6">
              {/* 🔴 ÍCONE DE LIXEIRA */}
              <View className="w-32 h-32 bg-[#FF3B30] rounded-full items-center justify-center shadow-sm mb-8">
                <Ionicons name="trash-outline" size={60} color="white" />
              </View>

              {/* 📝 TÍTULO ADAPTADO */}
              <Text className="text-[#FF3B30] text-3xl font-extrabold text-center mb-6 px-2">
                Para prosseguir com a exclusão digite sua senha
              </Text>

              {/* ℹ️ TEXTO DESCRITIVO */}
              <Text className="text-[#424654] text-base text-center leading-6 mb-8 px-4">
                Essa ação não tem retorno e irá efetuar a exclusão de todos os
                seus dados e se necessário deverá criar uma conta novamente para
                pode salvar suas rotas no aplicativo
              </Text>

              {/* 🔒 ÁREA DOS INPUTS DE SENHA (w-full garante que eles usem o padding da tela) */}
              <View className="w-full mb-6">
                <View className="mb-4">
                  <PasswordInputField
                    label="Digite sua senha"
                    value={senha}
                    onChangeText={setSenha}
                  />
                </View>

                <View className="mb-2">
                  <PasswordInputField
                    label="Confirme sua senha"
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                  />
                </View>
              </View>

              {/* 🚨 BOTÃO: DELETAR CONTA */}
              <TouchableOpacity
                onPress={handleValidarCampos}
                activeOpacity={0.8}
                className="w-full bg-white border border-[#E5E7EB] rounded-3xl py-4 items-center justify-center mb-4"
                style={{ height: 56 }}
              >
                <Text className="text-[#FF3B30] text-lg font-bold">
                  Deletar Conta
                </Text>
              </TouchableOpacity>

              {/* 🔵 BOTÃO: CANCELAR */}
              <View className="w-full">
                <ButtonAzulPadrao
                  titulo="Cancelar"
                  onPress={() => router.back()}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Screen>

      {/* 📋 POPUP CUSTOMIZADO DE CONFIRMAÇÃO (Fiel à imagem image_a2676c.png) */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View className="flex-1 bg-black/40 justify-center items-center px-6">
          <View className="bg-white rounded-[28px] p-6 w-full max-w-[340px] shadow-2xl">
            {/* Texto de Alerta */}
            <Text className="text-[#1A1C1E] text-lg font-medium leading-6 mb-6 text-left">
              Tem certeza que quer confirmar a exclusão da sua conta? Essa ação
              não poderá ser desfeita.
            </Text>

            {/* Container dos botões horizontais */}
            <View className="flex-row justify-end gap-3 w-full">
              {/* Botão Cancelar do Popup */}
              <TouchableOpacity
                onPress={() => setModalVisivel(false)}
                activeOpacity={0.7}
                className="border border-[#D1D5DB] rounded-full px-5 py-2.5 items-center justify-center"
              >
                <Text className="text-[#5E6370] text-base font-semibold">
                  Cancelar
                </Text>
              </TouchableOpacity>

              {/* Botão Confirmar do Popup */}
              <TouchableOpacity
                onPress={handleDeletarContaDefinitivo}
                activeOpacity={0.7}
                className="bg-[#0040A1] rounded-full px-6 py-2.5 items-center justify-center shadow-sm"
              >
                <Text className="text-white text-base font-bold">
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
