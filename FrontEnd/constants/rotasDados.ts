// components/rotasDados.ts

export interface HorarioItem {
  hora: string;
  detalhe?: string; // Mantido conforme solicitado
  direcao: "origem" | "destino";
}

export interface BlocoHorarios {
  titulo: string;
  itens: HorarioItem[];
}

export interface RotaProps {
  id: string;
  destino: string;
  origem: string;
  tipo: "urbanas" | "intermunicipais";
  horarios: BlocoHorarios[];
}

export const calcularProximoHorario = (
  horarios: BlocoHorarios[],
  direcaoEscolhida: "origem" | "destino",
) => {
  const agora = new Date();
  const minutosAtuais = agora.getHours() * 60 + agora.getMinutes();

  const todosHorarios = horarios.flatMap((bloco) =>
    bloco.itens
      .filter((item) => item.direcao === direcaoEscolhida)
      .map((item) => {
        const [h, m] = item.hora.split(":").map(Number);
        return { horaOriginal: item.hora, minutos: h * 60 + m };
      }),
  );

  todosHorarios.sort((a, b) => a.minutos - b.minutos);
  const proximo = todosHorarios.find((h) => h.minutos > minutosAtuais);

  return proximo
    ? proximo.horaOriginal
    : todosHorarios[0]?.horaOriginal || "--:--";
};

export const ROTAS_MOCK: RotaProps[] = [
  {
    id: "1",
    destino: "Canguera",
    origem: "Terminal de São Roque",
    tipo: "urbanas",
    horarios: [
      {
        titulo: "Segunda a Sábado",
        itens: [
          {
            hora: "06:15",
            detalhe: "Direto",
            direcao: "origem",
          },
          {
            hora: "08:30",
            detalhe: "Via Paisagem Colonial",
            direcao: "origem",
          },
          { hora: "07:00", detalhe: "Direto", direcao: "destino" },
          {
            hora: "09:15",
            detalhe: "Via Paisagem Colonial",
            direcao: "destino",
          },
        ],
      },
      {
        titulo: "Domingo e Feriados",
        itens: [
          { hora: "07:00", detalhe: "Direto", direcao: "origem" },
          { hora: "09:00", detalhe: "Direto", direcao: "origem" },
          { hora: "08:00", detalhe: "Direto", direcao: "destino" },
          { hora: "10:00", detalhe: "Direto", direcao: "destino" },
        ],
      },
    ],
  },
  {
    id: "2",
    destino: "Sorocaba",
    origem: "Terminal de São Roque",
    tipo: "intermunicipais",
    horarios: [
      {
        titulo: "Segunda a Sábado",
        itens: [
          { hora: "06:00", detalhe: "Executivo", direcao: "origem" },
          { hora: "16:10", detalhe: "Direto", direcao: "origem" },
          { hora: "08:30", detalhe: "Executivo", direcao: "destino" },
          { hora: "18:40", detalhe: "Direto", direcao: "destino" },
        ],
      },
      {
        titulo: "Domingo e Feriados",
        itens: [
          { hora: "09:00", detalhe: "Direto", direcao: "origem" },
          { hora: "14:00", detalhe: "Direto", direcao: "origem" },
          { hora: "12:00", detalhe: "Direto", direcao: "destino" },
          { hora: "17:00", detalhe: "Direto", direcao: "destino" },
        ],
      },
    ],
  },
  {
    id: "3",
    destino: "Guaçu",
    origem: "Terminal de São Roque",
    tipo: "urbanas",
    horarios: [
      {
        titulo: "Segunda a Sábado",
        itens: [
          { hora: "06:30", detalhe: "Direto", direcao: "origem" },
          { hora: "17:35", detalhe: "Via Centro", direcao: "origem" },
          { hora: "07:30", detalhe: "Direto", direcao: "destino" },
          { hora: "18:30", detalhe: "Via Centro", direcao: "destino" },
        ],
      },
      {
        titulo: "Domingo e Feriados",
        itens: [
          { hora: "08:00", detalhe: "Direto", direcao: "origem" },
          { hora: "10:00", detalhe: "Direto", direcao: "origem" },
          { hora: "09:00", detalhe: "Direto", direcao: "destino" },
          { hora: "11:00", detalhe: "Direto", direcao: "destino" },
        ],
      },
    ],
  },
  {
    id: "4",
    destino: "Mairinque",
    origem: "Terminal de São Roque",
    tipo: "intermunicipais",
    horarios: [
      {
        titulo: "Segunda a Sábado",
        itens: [
          { hora: "07:45", detalhe: "Via Vila Granada", direcao: "origem" },
          { hora: "15:45", detalhe: "Direto", direcao: "origem" },
          { hora: "08:45", detalhe: "Via Vila Granada", direcao: "destino" },
          { hora: "16:45", detalhe: "Direto", direcao: "destino" },
        ],
      },
      {
        titulo: "Domingo e Feriados",
        itens: [
          { hora: "09:00", detalhe: "Direto", direcao: "origem" },
          { hora: "12:00", detalhe: "Direto", direcao: "origem" },
          { hora: "10:00", detalhe: "Direto", direcao: "destino" },
          { hora: "13:00", detalhe: "Direto", direcao: "destino" },
        ],
      },
    ],
  },
  {
    id: "5",
    destino: "Mailasqui",
    origem: "Terminal de São Roque",
    tipo: "urbanas",
    horarios: [
      {
        titulo: "Segunda a Sábado",
        itens: [
          { hora: "06:00", detalhe: "Direto", direcao: "origem" },
          { hora: "19:00", detalhe: "Via Rodovia", direcao: "origem" },
          { hora: "07:00", detalhe: "Direto", direcao: "destino" },
          { hora: "20:00", detalhe: "Via Rodovia", direcao: "destino" },
        ],
      },
      {
        titulo: "Domingo e Feriados",
        itens: [
          { hora: "08:00", detalhe: "Direto", direcao: "origem" },
          { hora: "15:00", detalhe: "Direto", direcao: "origem" },
          { hora: "09:00", detalhe: "Direto", direcao: "destino" },
          { hora: "16:00", detalhe: "Direto", direcao: "destino" },
        ],
      },
    ],
  },
  {
    id: "6",
    destino: "São João novo",
    origem: "Terminal de São Roque",
    tipo: "urbanas",
    horarios: [
      {
        titulo: "Segunda a Sábado",
        itens: [
          { hora: "06:15", detalhe: "Direto", direcao: "origem" },
          { hora: "20:15", detalhe: "Via Estrada Velha", direcao: "origem" },
          { hora: "07:15", detalhe: "Direto", direcao: "destino" },
          { hora: "21:15", detalhe: "Via Estrada Velha", direcao: "destino" },
        ],
      },
      {
        titulo: "Domingo e Feriados",
        itens: [
          { hora: "09:00", detalhe: "Direto", direcao: "origem" },
          { hora: "16:00", detalhe: "Direto", direcao: "origem" },
          { hora: "10:00", detalhe: "Direto", direcao: "destino" },
          { hora: "17:00", detalhe: "Direto", direcao: "destino" },
        ],
      },
    ],
  },
  {
    id: "7",
    destino: "São Paulo",
    origem: "Terminal de São Roque",
    tipo: "intermunicipais",
    horarios: [
      {
        titulo: "Segunda a Sábado",
        itens: [
          { hora: "06:30", detalhe: "Seletivo", direcao: "origem" },
          { hora: "14:30", detalhe: "Direto", direcao: "origem" },
          { hora: "09:00", detalhe: "Seletivo", direcao: "destino" },
          { hora: "17:00", detalhe: "Direto", direcao: "destino" },
        ],
      },
      {
        titulo: "Domingo e Feriados",
        itens: [
          { hora: "08:00", detalhe: "Direto", direcao: "origem" },
          { hora: "11:00", detalhe: "Direto", direcao: "origem" },
          { hora: "09:30", detalhe: "Direto", direcao: "destino" },
          { hora: "12:30", detalhe: "Direto", direcao: "destino" },
        ],
      },
    ],
  },
  {
    id: "8",
    destino: "Ibiúna",
    origem: "Terminal de São Roque",
    tipo: "intermunicipais",
    horarios: [
      {
        titulo: "Segunda a Sábado",
        itens: [
          { hora: "07:40", detalhe: "Via Vargem Grande", direcao: "origem" },
          { hora: "21:40", detalhe: "Direto", direcao: "origem" },
          { hora: "09:00", detalhe: "Via Vargem Grande", direcao: "destino" },
          { hora: "23:00", detalhe: "Direto", direcao: "destino" },
        ],
      },
      {
        titulo: "Domingo e Feriados",
        itens: [
          { hora: "10:00", detalhe: "Direto", direcao: "origem" },
          { hora: "18:00", detalhe: "Direto", direcao: "origem" },
          { hora: "11:00", detalhe: "Direto", direcao: "destino" },
          { hora: "19:00", detalhe: "Direto", direcao: "destino" },
        ],
      },
    ],
  },
];
