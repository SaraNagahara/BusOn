import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface PasswordInputFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: boolean;
  errorMessage?: string;
}

export default function PasswordInputField({
  label,
  placeholder = "Digite sua senha",
  value,
  onChangeText,
  error = false,
  errorMessage,
}: PasswordInputFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  // Se 'error' for verdadeiro ou se 'errorMessage' existir, aplica o estado de erro
  const hasError = error || !!errorMessage;

  return (
    <View className="mb-5">
      <Text
        className={`font-bold mb-2 tracking-wide text-xm ${
          hasError ? "text-red-600" : "text-slate-700"
        }`}
      >
        {label}
      </Text>

      <View
        className={`flex-row items-center border rounded-2xl px-4 py-5 bg-white ${
          hasError ? "border-red-600" : "border-slate-300"
        }`}
      >
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
            size={22}
            color={hasError ? "#DC2626" : "#94A3B8"}
          />
        </TouchableOpacity>
      </View>

      {errorMessage && (
        <Text className="text-sm text-red-600 mt-1">{errorMessage}</Text>
      )}
    </View>
  );
}
