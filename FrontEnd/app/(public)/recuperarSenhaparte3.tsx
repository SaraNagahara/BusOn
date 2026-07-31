import { AuthHeader } from "@/components/AuthHeader";
import ButtonAzulPadrao from "@/components/buttonAzulPadrao";
import CardBranco from "@/components/CardBranco";
import { FundoAzul } from "@/components/fundoazul";
import PasswordInputField from "@/components/PasswordInputField";
import { Screen } from "@/components/safearea";
import { TituloCustomizado } from "@/components/TituloCustomizado";
import { useAuth } from "@/context/AuthProvider";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { z } from "zod";

// Schema de validação utilizando Zod mantendo o mesmo padrão de regras
const resetPasswordSchema = z
  .object({
    oldPassword: z.string().optional(),
    newPassword: z
      .string()
      .min(1, "A nova senha é obrigatória")
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .regex(/[a-zA-Z]/, "A senha deve conter pelo menos uma letra")
      .regex(/[0-9]/, "A senha deve conter pelo menos um número"),
    confirmPassword: z.string().min(1, "A confirmação de senha é obrigatória"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem!",
    path: ["confirmPassword"],
  });

type ResetPasswordErrors = {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  general?: string;
};

export default function RecuperarSenhaParte3() {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<ResetPasswordErrors>({});

  const { usuarioLogado, token } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();

  const veioDoPerfil = params?.origem === "perfil";

  if (usuarioLogado && !veioDoPerfil) {
    return <Redirect href="/notfound" />;
  }

  const handleAlterarSenha = async () => {
    // Limpa erros anteriores
    setErrors({});

    // Validação extra se veio do perfil
    if (veioDoPerfil && !oldPassword) {
      setErrors((prev) => ({
        ...prev,
        oldPassword: "A senha atual é obrigatória",
      }));
      return;
    }

    // Validação com Zod
    const validation = resetPasswordSchema.safeParse({
      oldPassword,
      newPassword,
      confirmPassword,
    });

    if (!validation.success) {
      const formattedErrors: ResetPasswordErrors = {};
      validation.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ResetPasswordErrors;
        if (field && !formattedErrors[field]) {
          formattedErrors[field] = issue.message;
        }
      });
      setErrors(formattedErrors);
      return;
    }

    // Verificação de token
    if (!token) {
      setErrors({
        general: "Sessão expirada. Por favor, faça login novamente.",
      });
      return;
    }

    try {
      const response = await fetch(
        "http://192.168.0.105:5000/users/changePassowrd",
        {
          method: "POST", // TROCAR PARA PATCH
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            password: oldPassword,
            newPassword: newPassword,
            newPasswordConfirmation: confirmPassword,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        setErrors({ general: data.message || "Erro ao alterar a senha" });
        return;
      }
      console.log("sucesso: ", data.message);

      if (veioDoPerfil) {
        router.push({
          pathname: "/recuperarSenhaparte4",
          params: { origem: "perfil_senha" },
        });
      }
    } catch (error) {
      console.log("mensagem: ", error);
      setErrors({ general: "Ocorreu um erro ao tentar alterar a senha." });
    }
  };

  return (
    <FundoAzul>
      <Screen>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 20}
          className="flex-1"
        >
          <View className="flex-1 pt-4">
            <AuthHeader
              titulo={veioDoPerfil ? "Verificação" : "Comece Agora"}
              subtitulo={
                veioDoPerfil
                  ? "Atualize sua senha de acesso com segurança"
                  : "Crie uma conta ou faça seu login"
              }
            />

            <CardBranco>
              <View className="pb-2">
                <TituloCustomizado
                  titulo={
                    veioDoPerfil ? "Altere sua Senha." : "Crie sua nova senha"
                  }
                  corDoTexto="#0040A1"
                />
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                className="flex-1"
              >
                {veioDoPerfil && (
                  <View className="mt-4">
                    <PasswordInputField
                      label="SENHA ATUAL"
                      value={oldPassword}
                      onChangeText={setOldPassword}
                      error={!!errors.oldPassword}
                      errorMessage={errors.oldPassword}
                    />
                  </View>
                )}

                <View className="mt-4">
                  <PasswordInputField
                    label="NOVA SENHA"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    error={!!errors.newPassword}
                    errorMessage={errors.newPassword}
                  />

                  <PasswordInputField
                    label="CONFIRMAR NOVA SENHA"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    error={!!errors.confirmPassword}
                    errorMessage={errors.confirmPassword}
                  />

                  {errors.general && (
                    <Text className="text-sm text-red-500 mt-2 px-1">
                      {errors.general}
                    </Text>
                  )}
                </View>

                <View className="px-2 mb-4 mt-8">
                  <ButtonAzulPadrao
                    titulo={
                      veioDoPerfil ? "Salvar Nova Senha" : "Alterar senha"
                    }
                    onPress={handleAlterarSenha}
                  />
                </View>
              </ScrollView>
            </CardBranco>
          </View>
        </KeyboardAvoidingView>
      </Screen>
    </FundoAzul>
  );
}
