import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface PasswordInputFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  errorMessage?: string;
}

export default function PasswordInputField({
  label,
  placeholder = "Digite sua senha",
  value,
  onChangeText,
  errorMessage,
}: PasswordInputFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <View className="mb-5">
      <Text className="text-slate-700 font-bold mb-2 tracking-wide text-xm">
        {label}
      </Text>

      <View className="flex-row items-center border border-slate-300 rounded-2xl px-4 py-5 bg-white">
        <TextInput
          className="flex-1 text-base text-gray-800 p-0 m-0"
          placeholder={placeholder}
          secureTextEntry={!isPasswordVisible}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#A9A9A9"
        />

        <TouchableOpacity onPress={togglePasswordVisibility} className="ml-2">
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={22} // Aumentado levemente para acompanhar a nova altura
            color="#94A3B8"
          />
        </TouchableOpacity>
      </View>

      {errorMessage && (
        <Text className="text-sm text-red-600 mt-1">{errorMessage}</Text>
      )}
    </View>
  );
}
