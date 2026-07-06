import { fonts } from "@/app/_layout";
import { FundoAzul } from "@/components/fundoazul";
import { Screen } from "@/components/safearea";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function termosDeUso() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [noFinal, setNoFinal] = useState(false); // Rastreia a posição para mudar o texto do botão menor

  const [clausulas] = useState([
    {
      titulo: "Clause 1",
      texto:
        "O aplicativo não se responsabiliza por mudanças de horários ou atrasos e imprevistos das viações, apenas fornecemos horários publicos disponibilizados pela propria empresa, não temos quais quer envolvimento com a gestão de cada viação",
    },
    {
      titulo: "Clause 2",
      texto:
        "Ao criar uma conta e decidir excluir a mesma, o aplicativo não se responsabiliza pelos dados perdidos, ao deletar todos os dados serão perdidos sem excessão sendo necessário criar uma nova conta\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.",
    },
    {
      titulo: "Clause 3",
      texto:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.",
    },
    {
      titulo: "Clause 4",
      texto:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.",
    },
    {
      titulo: "Clause 5",
      texto:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.",
    },
    {
      titulo: "Clause 6",
      texto:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.",
    },
    {
      titulo: "Clause 7",
      texto:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra condimentum eget purus in. Consectetur eget id morbi amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean leo pharetra in sit semper et. Amet quam placerat sem.",
    },
  ]);

  // Função que calcula se o usuário chegou no fim do texto
  const lidarComRolagem = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const chegouAoFim =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 40;
    setNoFinal(chegouAoFim);
  };

  return (
    <FundoAzul>
      <Screen>
        {/* Container principal do Card Branco */}
        <View
          className="flex-1 bg-white mt-12 relative" // relative aqui permite o posicionamento absoluto do botão flutuante interno
          style={{
            borderTopLeftRadius: 45,
            borderTopRightRadius: 45,
          }}
        >
          {/* 1. CABEÇALHO FIXO APENAS NO TOPO (Fora da ScrollView) */}
          <View
            className="px-8 pt-8 pb-4 bg-white"
            style={{ borderTopLeftRadius: 45, borderTopRightRadius: 45 }}
          >
            <Text
              style={{ fontFamily: fonts.regular }}
              className="text-gray-400 text-xs tracking-widest uppercase mb-1"
            >
              Acordo Geral
            </Text>

            <Text
              style={{ fontFamily: fonts.bold, color: "#333333" }}
              className="text-2xl mb-1"
            >
              Termos de uso & Política de privacidade
            </Text>

            <Text
              style={{ fontFamily: fonts.regular }}
              className="text-gray-400 text-xs"
            >
              Última atualização 5/12/2022
            </Text>

            <View className="h-[1px] bg-gray-100 mt-4 w-full" />
          </View>

          {/* 2. AREA DE ROLAGEM PRINCIPAL */}
          <ScrollView
            ref={scrollViewRef}
            className="flex-1 px-8 pt-2"
            showsVerticalScrollIndicator={true}
            onScroll={lidarComRolagem}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingBottom: 60 }} // Espaço extra sutil no fim para os botões não colarem na borda
          >
            {/* RENDERIZAÇÃO DINÂMICA DAS CLÁUSULAS */}
            {clausulas.map((clausula, index) => (
              <View key={index} className="mb-6">
                <Text
                  style={{ fontFamily: fonts.bold, color: "#333333" }}
                  className="text-lg mb-2"
                >
                  {clausula.titulo}
                </Text>
                <Text
                  style={{ fontFamily: fonts.regular, color: "#555555" }}
                  className="text-sm leading-5 text-justify"
                >
                  {clausula.texto}
                </Text>
              </View>
            ))}

            {/* ÁREA DOS BOTÕES DE AÇÃO: Rola junto com o texto e fica na base do documento */}
            <View className="items-center mt-8 mb-6 w-full gap-y-3">
              {/* BOTÃO AZUL DE ACEITAÇÃO */}
              {/* <Pressable
                onPress={() => {
                  // Retorna para a página index injetando o parâmetro do checkbox preenchido
                  router.replace({
                    pathname: "/",
                    params: { aceitou: "true" },
                  });
                }}
                className="rounded-full items-center justify-center shadow-md mb-2"
                style={{
                  backgroundColor: "#1A73E8",
                  width: 200,
                  height: 44,
                }}
              >
                <Text
                  style={{ fontFamily: fonts.bold }}
                  className="text-white text-sm"
                >
                  Aceitar e Continuar
                </Text>
              </Pressable> */}

              {/* LINK PARA SAIR DA TELA */}
              <View className="mb-5">
                <Pressable onPress={() => router.back()} className="py-1">
                  <Text
                    style={{ fontFamily: fonts.regular }}
                    className="text-gray-400 text-xs"
                  >
                    Voltar
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>

          {/* 3. APENAS O BOTÃO PILULA FICA TOTALMENTE FLUTUANTE (ABSOLUTO) */}
          <View
            className="absolute items-center w-full"
            style={{ bottom: 30, zIndex: 10 }} // Fixado na base do card branco, flutuando sobre o conteúdo
            pointerEvents="box-none" // Permite clicar no texto por trás dele nas áreas vazias
          >
            <Pressable
              onPress={() => {
                if (noFinal) {
                  scrollViewRef.current?.scrollTo({ y: 0, animated: true });
                } else {
                  scrollViewRef.current?.scrollToEnd({ animated: true });
                }
              }}
              className="rounded-full items-center justify-center border shadow-lg"
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#000000",
                width: 140,
                height: 36,
              }}
            >
              <Text
                style={{ fontFamily: fonts.bold, color: "#000000" }}
                className="text-xs"
              >
                {noFinal ? "Rolar para cima" : "Rolar para baixo"}
              </Text>
            </Pressable>
          </View>
        </View>
      </Screen>
    </FundoAzul>
  );
}
