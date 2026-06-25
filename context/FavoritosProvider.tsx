import { ROTAS_MOCK } from "@/constants/rotasDados";
import React, { createContext, useContext, useState } from "react";

interface RotaFavoritaDinamicaProps {
  id: string;
  destino: string;
  horarioRodoviaria: string;
  horarioDestino: string;
}

// 🔔 Cada alerta agora ganha uma identidade própria (idAlerta) para permitir múltiplos na mesma rota
interface AlertaProps {
  idAlerta: string; // Ex: "1-18:10" ou um timestamp
  idRota: string;
  horario: string;
  dias: string[];
}

interface FavoritosContextType {
  meusFavoritos: RotaFavoritaDinamicaProps[];
  listaFavoritosIds: string[];
  meusAlertas: AlertaProps[]; // 👈 Nova lista global de alertas
  alternarFavorito: (id: string, destino: string) => void;
  limparFavoritos: () => void;
  configurarAlerta: (
    idRota: string,
    horario: string,
    dias: string[],
    idAlertaExistente?: string | null,
  ) => boolean;
  removerAlertaPorId: (idAlerta: string) => void;
}

const FavoritosContext = createContext<FavoritosContextType | undefined>(
  undefined,
);

export function FavoritosProvider({ children }: { children: React.ReactNode }) {
  const [meusFavoritos, setMeusFavoritos] = useState<
    RotaFavoritaDinamicaProps[]
  >([]);
  const [meusAlertas, setMeusAlertas] = useState<AlertaProps[]>([]); // 👈 Estado dos alertas separado

  const listaFavoritosIds = meusFavoritos.map((f) => f.id);

  const alternarFavorito = (id: string, destino: string) => {
    if (listaFavoritosIds.includes(id)) {
      setMeusFavoritos((prev) => prev.filter((item) => item.id !== id));
      // Se remover dos favoritos, limpa os alertas atrelados a essa rota por segurança
      setMeusAlertas((prev) => prev.filter((alerta) => alerta.idRota !== id));
    } else {
      if (meusFavoritos.length >= 3) {
        alert("Você atingiu o limite máximo de 3 rotas favoritas.");
        return;
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

  // 🔔 CONFIGURAR OU ATUALIZAR ALERTA (Máximo 2 ativos no App no total)
  const configurarAlerta = (
    idRota: string,
    horario: string,
    dias: string[],
    idAlertaExistente?: string | null,
  ): boolean => {
    // Filtra os outros alertas (menos o que está sendo editado) para validar a trava de 2
    const outrosAlertas = meusAlertas.filter(
      (alerta) => alerta.idAlerta !== idAlertaExistente,
    );

    if (outrosAlertas.length >= 2) {
      alert(
        "Limite atingido! Você só pode definir até 2 notificações no aplicativo.",
      );
      return false;
    }

    if (idAlertaExistente) {
      // Editando um alerta que já existia
      setMeusAlertas((prev) =>
        prev.map((alerta) =>
          alerta.idAlerta === idAlertaExistente
            ? { ...alerta, horario, dias }
            : alerta,
        ),
      );
    } else {
      // Criando um alerta totalmente novo (mesmo que seja para um ID de rota repetido!)
      const novoAlerta: AlertaProps = {
        idAlerta: `${idRota}-${Date.now()}`, // Identificador único composto
        idRota,
        horario,
        dias,
      };
      setMeusAlertas((prev) => [...prev, novoAlerta]);
    }

    return true;
  };

  // 🔕 Remove um alerta específico usando o ID dele
  const removerAlertaPorId = (idAlerta: string) => {
    setMeusAlertas((prev) =>
      prev.filter((alerta) => alerta.idAlerta !== idAlerta),
    );
  };

  const limparFavoritos = () => {
    setMeusFavoritos([]);
    setMeusAlertas([]);
  };

  return (
    <FavoritosContext.Provider
      value={{
        meusFavoritos,
        listaFavoritosIds,
        meusAlertas,
        alternarFavorito,
        limparFavoritos,
        configurarAlerta,
        removerAlertaPorId,
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
