// componentes/rotasDados.ts

export interface RotaProps {
  id: string;
  destino: string;
  origem: string;
  proximoHorario: string;
  tipo: "urbanas" | "intermunicipais";
}

// Esta é a única fonte de verdade do seu aplicativo.
// Você pode importar este mesmo array na 'inicial', 'favoritos' e em qualquer outra tela.
export const ROTAS_MOCK: RotaProps[] = [
  {
    id: "1",
    destino: "Canguera",
    origem: "Terminal de São Roque",
    proximoHorario: "18:10",
    tipo: "urbanas",
  },
  {
    id: "2",
    destino: "Sorocaba",
    origem: "Terminal de São Roque",
    proximoHorario: "16:10",
    tipo: "intermunicipais",
  },
  {
    id: "3",
    destino: "Guaçu",
    origem: "Terminal de São Roque",
    proximoHorario: "17:35",
    tipo: "urbanas",
  },
  {
    id: "4",
    destino: "Mairinque",
    origem: "Terminal de São Roque",
    proximoHorario: "15:45",
    tipo: "intermunicipais",
  },
  {
    id: "5",
    destino: "Mailasqui",
    origem: "Terminal de São Roque",
    proximoHorario: "19:00",
    tipo: "urbanas",
  },
  {
    id: "6",
    destino: "São João novo",
    origem: "Terminal de São Roque",
    proximoHorario: "20:15",
    tipo: "urbanas",
  },
  {
    id: "7",
    destino: "São Paulo",
    origem: "Terminal de São Roque",
    proximoHorario: "06:30",
    tipo: "intermunicipais",
  },
  {
    id: "8",
    destino: "Ibiúna",
    origem: "Terminal de São Roque",
    proximoHorario: "21:40",
    tipo: "intermunicipais",
  },
];
