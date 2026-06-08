import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { AuthHeader } from "../components/AuthHeader";
import CardBranco from "../components/CardBranco";
import ButtonAzulPadrao from "../components/buttonAzulPadrao";

import { Link } from "expo-router";
import { FundoAzul } from "../components/fundoazul";
import { Screen } from "../components/safearea";

type TabOption = "cadastrar" | "entrar";

export default function LoginCadastro() {
  const [activeTab, setActiveTab] = useState<TabOption>("entrar");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const activeShadow: ViewStyle = {
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  };

  return (
    <FundoAzul>
      {/* O <Screen> envolve tudo aqui dentro, garantindo que NADA passe das áreas seguras (nem em cima, nem embaixo) */}
      <Screen>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          {/* Removemos qualquer margem negativa daqui. A View respeita o teto e o chão do celular */}
          <View className="flex-1 pt-4">
            <AuthHeader
              titulo="Comece Agora"
              subtitulo="Crie uma conta ou faça seu login"
            />

            {/* Este container flex-1 limita o tamanho máximo que o CardBranco pode ter dentro da Safe Area */}
            <View className="flex-1">
              <CardBranco>
                {/* SELETOR DE ABAS */}
                <View className="flex-row bg-[#F2F4F7] border border-[#D1D5DB] rounded-2xl p-1 mb-6">
                  <TouchableOpacity
                    onPress={() => setActiveTab("cadastrar")}
                    className={`flex-1 py-3 rounded-xl items-center justify-center ${activeTab === "cadastrar" ? "bg-white border border-[#7B8AD7]" : ""}`}
                    style={activeTab === "cadastrar" ? activeShadow : {}}
                  >
                    <Text
                      className={`text-base ${activeTab === "cadastrar" ? "text-black font-bold" : "text-gray-400"}`}
                    >
                      Cadastrar
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setActiveTab("entrar")}
                    className={`flex-1 py-3 rounded-xl items-center justify-center ${activeTab === "entrar" ? "bg-white border border-[#7B8AD7]" : ""}`}
                    style={activeTab === "entrar" ? activeShadow : {}}
                  >
                    <Text
                      className={`text-base ${activeTab === "entrar" ? "text-black font-bold" : "text-gray-400"}`}
                    >
                      Entrar
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* ÁREA DE INPUTS */}
                <View className="flex-1 px-2">
                  {activeTab === "entrar" ? (
                    <View>
                      {/* EMAIL */}
                      <View className="mb-5">
                        <Text className="text-black text-base mb-2 font-medium">
                          Email
                        </Text>
                        <View className="border border-gray-400 rounded-2xl px-4 py-3">
                          <TextInput
                            placeholder="Insira seu endereço de email"
                            placeholderTextColor="#9CA3AF"
                            className="text-base text-black"
                            keyboardType="email-address"
                            autoCapitalize="none"
                          />
                        </View>
                      </View>

                      {/* SENHA */}
                      <View className="mb-5">
                        <Text className="text-black text-base mb-2 font-medium">
                          Senha
                        </Text>
                        <View className="border border-gray-400 rounded-2xl px-4 py-3 flex-row items-center">
                          <TextInput
                            placeholder="Insira sua senha"
                            placeholderTextColor="#9CA3AF"
                            className="text-base text-black flex-1"
                            secureTextEntry={!showPassword}
                          />
                          <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                          >
                            <Ionicons
                              name={
                                showPassword ? "eye-outline" : "eye-off-outline"
                              }
                              size={22}
                              color="#9CA3AF"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View className="flex-row justify-between items-center mt-4 px-1 mb-6">
                        <TouchableOpacity
                          onPress={() => setRememberMe(!rememberMe)}
                          className="flex-row items-center"
                          activeOpacity={0.7}
                        >
                          <Ionicons
                            name={rememberMe ? "checkbox" : "square-outline"}
                            size={24}
                            color={rememberMe ? "#1F3369" : "#D1D5DB"}
                          />
                          <Text className="ml-2 text-black text-base">
                            Lembrar de mim
                          </Text>
                        </TouchableOpacity>

                        <Link href="/recuperarSenha" asChild>
                          <TouchableOpacity>
                            <Text className="text-blue-500 text-base font-medium">
                              Esqueci a senha
                            </Text>
                          </TouchableOpacity>
                        </Link>
                      </View>

                      <ButtonAzulPadrao
                        titulo="Entrar"
                        onPress={() => console.log("Login pressionado")}
                      />
                    </View>
                  ) : (
                    /* O ScrollView do cadastro rola perfeitamente aqui dentro, sem vazar */
                    <ScrollView
                      showsVerticalScrollIndicator={true}
                      contentContainerStyle={{ paddingBottom: 20 }}
                      keyboardShouldPersistTaps="handled"
                      className="flex-1"
                    >
                      {/* NOME */}
                      <View className="mb-4">
                        <Text className="text-black text-base mb-1 font-medium">
                          Nome
                        </Text>
                        <View className="border border-gray-200 rounded-2xl px-4 py-3 bg-white">
                          <TextInput
                            placeholder="Digite seu nome"
                            placeholderTextColor="#9CA3AF"
                            className="text-base text-black"
                          />
                        </View>
                      </View>

                      {/* EMAIL */}
                      <View className="mb-4">
                        <Text className="text-black text-base mb-1 font-medium">
                          Email
                        </Text>
                        <View className="border border-gray-200 rounded-2xl px-4 py-3 bg-white">
                          <TextInput
                            placeholder="Digite seu email"
                            placeholderTextColor="#9CA3AF"
                            className="text-base text-black"
                            keyboardType="email-address"
                            autoCapitalize="none"
                          />
                        </View>
                      </View>

                      {/* SENHA */}
                      <View className="mb-4">
                        <Text className="text-black text-base mb-1 font-medium">
                          Senha
                        </Text>
                        <View className="border border-gray-200 rounded-2xl px-4 py-3 bg-white flex-row items-center">
                          <TextInput
                            placeholder="Digite sua senha"
                            placeholderTextColor="#9CA3AF"
                            className="text-base text-black flex-1"
                            secureTextEntry={!showPassword}
                          />
                          <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                          >
                            <Ionicons
                              name={
                                showPassword ? "eye-outline" : "eye-off-outline"
                              }
                              size={20}
                              color="#9CA3AF"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>

                      {/* CONFIRMAR SENHA */}
                      <View className="mb-4">
                        <Text className="text-black text-base mb-1 font-medium">
                          Confirmar Senha
                        </Text>
                        <View className="border border-gray-200 rounded-2xl px-4 py-3 bg-white flex-row items-center">
                          <TextInput
                            placeholder="Digite sua senha"
                            placeholderTextColor="#9CA3AF"
                            className="text-base text-black flex-1"
                            secureTextEntry={!showPassword}
                          />
                          <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                          >
                            <Ionicons
                              name={
                                showPassword ? "eye-outline" : "eye-off-outline"
                              }
                              size={20}
                              color="#9CA3AF"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>

                      {/* TELEFONE */}
                      <View className="mb-6">
                        <Text className="text-black text-base mb-1 font-medium">
                          Telefone
                        </Text>
                        <View className="border border-gray-200 rounded-2xl px-4 py-3 bg-white">
                          <TextInput
                            placeholder="Digite seu DDD + Telefone"
                            placeholderTextColor="#9CA3AF"
                            className="text-base text-black flex-1"
                            keyboardType="phone-pad"
                          />
                        </View>
                      </View>

                      <ButtonAzulPadrao
                        titulo="Cadastrar"
                        onPress={() => console.log("Cadastro pressionado")}
                      />
                    </ScrollView>
                  )}
                </View>
              </CardBranco>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Screen>
    </FundoAzul>
  );
}
