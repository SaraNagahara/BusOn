import { PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export function Screen({ children }: PropsWithChildren) {
  return <SafeAreaView className="flex-1">{children}</SafeAreaView>;
}

//Componente da safe area utilizado em todos as paginas para garantir area segura de vizualização dos componentes
