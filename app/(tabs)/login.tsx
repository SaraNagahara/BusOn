import { Text, TextInput, View } from "react-native";
import LogoApp from "../../assets/icons/logoApp.svg";
import SetaBrancaEsquerda from "../../assets/icons/setaBrancaEsquerda.svg";

import { fonts } from "../_layout";
import { Screen } from "./../../components/safearea";

export default function Login() {
  return (
    <Screen>
      <View className="bg-[#1F3369] h-screen ">
        {/*"div" de seta e logo do app */}
        <View className="flex-row justify-between mx-2 ">
          <View className="w-8 h-8">
            <SetaBrancaEsquerda width="100%" height="100%" />
          </View>

          {/* LOGO: Ocupa um espaço retangular (ex: 120px) */}
          <View className="w-32 h-10">
            <LogoApp width="100%" height="100%" />
          </View>
        </View>

        <Text style={{ fontFamily: fonts.bold }} className="text-white">
          Comece Agora
        </Text>
        <Text className="text-white">Crie uma conta ou faça seu login</Text>
        {/*"div" de login e cadastro */}
        <View className="flex-1 bg-white rounded-3xl mx-2">
          {/*"div" que separa input de login e cadastro */}
          <View className="flex-row justify-around">
            <TextInput>Cadastrar</TextInput>
            <TextInput>Entrar</TextInput>
          </View>
        </View>
      </View>
    </Screen>
  );
}
