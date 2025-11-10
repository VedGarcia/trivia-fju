// Paleta de colores para equipos
const TEAM_COLORS = [
  { primary: "#3B82F6", light: "#DBEAFE", name: "Azul" }, // blue-500, blue-100
  { primary: "#10B981", light: "#D1FAE5", name: "Verde" }, // green-500, green-100
  { primary: "#F59E0B", light: "#FEF3C7", name: "Amarillo" }, // amber-500, amber-100
  { primary: "#EF4444", light: "#FEE2E2", name: "Rojo" }, // red-500, red-100
  { primary: "#8B5CF6", light: "#EDE9FE", name: "Morado" }, // violet-500, violet-100
  { primary: "#EC4899", light: "#FCE7F3", name: "Rosa" }, // pink-500, pink-100
  { primary: "#06B6D4", light: "#CFFAFE", name: "Cian" }, // cyan-500, cyan-100
  { primary: "#84CC16", light: "#ECFCCB", name: "Lima" }, // lime-500, lime-100
];

export const getTeamColor = (index: number) => {
  return TEAM_COLORS[index % TEAM_COLORS.length];
};

export const getTeamColorByIndex = (index: number) => {
  const color = getTeamColor(index);
  return {
    bg: color.light,
    border: color.primary,
    text: color.primary,
    name: color.name,
  };
};

