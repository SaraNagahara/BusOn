import { ROTAS_MOCK } from "@/constants/rotasDados";
import React, { createContext, useContext, useState } from "react";

interface RotaFavoritaDinamicaProps {
  id: string;
  destino: string;
  horarioRodoviaria: string;
  horarioDestino: string;
}

interface FavoritosContextType {
  meusFavoritos: RotaFavoritaDinamicaProps[];
  listaFavoritosIds: string[];
  alternarFavorito: (id: string, destino: string) => void;
  limparFavoritos: () => void;
}

const FavoritosContext = createContext<FavoritosContextType | undefined>(
  undefined,
);

export function FavoritosProvider({ children }: { children: React.ReactNode }) {
  const [meusFavoritos, setMeusFavoritos] = useState<
    RotaFavoritaDinamicaProps[]
  >([]);
  const listaFavoritosIds = meusFavoritos.map((f) => f.id);

  const alternarFavorito = (id: string, destino: string) => {
    if (listaFavoritosIds.includes(id)) {
      // Se já está na lista, remove normalmente
      setMeusFavoritos((prev) => prev.filter((item) => item.id !== id));
    } else {
      // 👈 LIMITE MÁXIMO DE 3 ROTAS ATIVADO AQUI
      if (meusFavoritos.length >= 3) {
        alert("Você atingiu o limite máximo de 3 rotas favoritas.");
        return; // Para a execução aqui e não deixa adicionar
      }

      const rotaNoMock = ROTAS_MOCK.find((r) => r.id === id);
      const novoFavorito: RotaFavoritaDinamicaProps = {
        id: id,
        destino: destino,
        horarioRodoviaria: rotaNoMock?.proximoHorario || "18:20",
        horarioDestino: "09:45",
      };
      setMeusFavoritos((prev) => [...prev, novoFavorito]);
    }
  };

  const limparFavoritos = () => setMeusFavoritos([]);

  return (
    <FavoritosContext.Provider
      value={{
        meusFavoritos,
        listaFavoritosIds,
        alternarFavorito,
        limparFavoritos,
      }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  const context = useContext(FavoritosContext);
  if (!context) {
    throw new Error(
      "useFavoritos deve ser usado dentro de um FavoritosProvider",
    );
  }
  return context;
}
