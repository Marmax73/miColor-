// utils/getPantoneName.js
export function getPantoneName({ r, g, b }) {
  // Base mínima de equivalencias Pantone (puedes ampliar)
  const pantoneList = [
    { name: "Pantone 485 C", r: 218, g: 41, b: 28 },
    { name: "Pantone 7549 C", r: 255, g: 196, b: 37 },
    { name: "Pantone 347 C", r: 0, g: 166, b: 81 },
    { name: "Pantone 286 C", r: 0, g: 56, b: 168 },
    { name: "Pantone 7672 C", r: 89, g: 79, b: 191 },
    { name: "Pantone 232 C", r: 236, g: 0, b: 140 },
    { name: "Pantone Cool Gray 7 C", r: 151, g: 153, b: 155 },
    { name: "Pantone Black C", r: 45, g: 41, b: 38 },
    { name: "Pantone White", r: 255, g: 255, b: 255 }
  ];

  // Cálculo de la distancia euclidiana RGB
  const distance = (c1, c2) => Math.sqrt(
    Math.pow(c1.r - c2.r, 2) +
    Math.pow(c1.g - c2.g, 2) +
    Math.pow(c1.b - c2.b, 2)
  );

  // Encontrar el Pantone más cercano
  let closest = pantoneList[0];
  let minDistance = distance(color, closest);

  for (const p of pantoneList) {
    const d = distance(color, p);
    if (d < minDistance) {
      minDistance = d;
      closest = p;
    }
  }

  return closest.name;
}
