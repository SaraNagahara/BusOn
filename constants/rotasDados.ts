// components/rotasDados.ts

export interface HorarioItem {
  hora: string;
  detalhe?: string;
}

export interface BlocoHorarios {
  titulo: string;
  itens: HorarioItem[];
}

export interface RotaProps {
  id: string;
  numeroLinha: string;
  destino: string;
  origem: string;
  proximoHorario: string;
  tipo: "urbanas" | "intermunicipais";
  horarios: BlocoHorarios[];
}

export const ROTAS_MOCK: RotaProps[] = [
  {
    id: "1",
    numeroLinha: "11",
    destino: "Canguera",
    origem: "Terminal de São Roque",
    proximoHorario: "18:10",
    tipo: "urbanas",
    horarios: [
      {
        titulo: "Segunda a Sábado",
        itens: [
          { hora: "06:15", detalhe: "Direto" },
          { hora: "08:30", detalhe: "Via Paisagem Colonial" },
        ],
      },
      {
        titulo: "Domingo e Feriados",
        itens: [
          { hora: "07:00", detalhe: "Direto" },
          { hora: "09:00", detalhe: "Direto" },
        ],
      },
    ],
  },
  {
    id: "2",
    numeroLinha: "15",
    destino: "Sorocaba",
    origem: "Terminal de São Roque",
    proximoHorario: "16:10",
    tipo: "intermunicipais",
    horarios: [
      {
        titulo: "Segunda a Sábado",
        itens: [{ hora: "16:10", detalhe: "Direto" }],
      },
      {
        titulo: "Domingo e Feriados",
        itens: [{ hora: "14:00", detalhe: "Direto" }],
      },
    ],
  },
  {
    id: "3",
    numeroLinha: "22",
    destino: "Guaçu",
    origem: "Terminal de São Roque",
    proximoHorario: "17:35",
    tipo: "urbanas",
    horarios: [
      {
        titulo: "Segunda a Sábado",
        itens: [{ hora: "17:35", detalhe: "Direto" }],
      },
      {
        titulo: "Domingo e Feriados",
        itens: [{ hora: "10:00", detalhe: "Direto" }],
      },
    ],
  },
  {
    id: "4",
    numeroLinha: "30",
    destino: "Mairinque",
    origem: "Terminal de São Roque",
    proximoHorario: "15:45",
    tipo: "intermunicipais",
    horarios: [
      {
        titulo: "Segunda a Sábado",
        itens: [{ hora: "15:45", detalhe: "Direto" }],
      },
      {
        titulo: "Domingo e Feriados",
        itens: [{ hora: "12:00", detalhe: "Direto" }],
      },
    ],
  },
  {
    id: "5",
    numeroLinha: "41",
    destino: "Mailasqui",
    origem: "Terminal de São Roque",
    proximoHorario: "19:00",
    tipo: "urbanas",
    horarios: [
      {
        titulo: "Segunda a Sábado",
        itens: [{ hora: "19:00", detalhe: "Direto" }],
      },
      {
        titulo: "Domingo e Feriados",
        itens: [{ hora: "15:00", detalhe: "Direto" }],
      },
    ],
  },
  {
    id: "6",
    numeroLinha: "50",
    destino: "São João novo",
    origem: "Terminal de São Roque",
    proximoHorario: "20:15",
    tipo: "urbanas",
    horarios: [
      {
        titulo: "Segunda a Sábado",
        itens: [{ hora: "20:15", detalhe: "Direto" }],
      },
      {
        titulo: "Domingo e Feriados",
        itens: [{ hora: "16:00", detalhe: "Direto" }],
      },
    ],
  },
  {
    id: "7",
    numeroLinha: "60",
    destino: "São Paulo",
    origem: "Terminal de São Roque",
    proximoHorario: "06:30",
    tipo: "intermunicipais",
    horarios: [
      {
        titulo: "Segunda a Sábado",
        itens: [{ hora: "06:30", detalhe: "Direto" }],
      },
      {
        titulo: "Domingo e Feriados",
        itens: [{ hora: "08:00", detalhe: "Direto" }],
      },
    ],
  },
  {
    id: "8",
    numeroLinha: "72",
    destino: "Ibiúna",
    origem: "Terminal de São Roque",
    proximoHorario: "21:40",
    tipo: "intermunicipais",
    horarios: [
      {
        titulo: "Segunda a Sábado",
        itens: [{ hora: "21:40", detalhe: "Direto" }],
      },
      {
        titulo: "Domingo e Feriados",
        itens: [{ hora: "18:00", detalhe: "Direto" }],
      },
    ],
  },
];
