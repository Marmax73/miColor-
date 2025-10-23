// Extrae color promedio simple
export const getDominantColor = (imageData) => {
  let r = 0, g = 0, b = 0;
  const pixels = imageData.data;
  const total = pixels.length / 4;

  for (let i = 0; i < pixels.length; i += 4) {
    r += pixels[i];
    g += pixels[i + 1];
    b += pixels[i + 2];
  }

  r = Math.round(r / total);
  g = Math.round(g / total);
  b = Math.round(b / total);

  return `rgb(${r}, ${g}, ${b})`;
};

// Mapeo básico a Pantone (simplificado)
const pantoneMap = [
  { name: 'PANTONE 186 C', rgb: [200, 16, 46] },
  { name: 'PANTONE 300 C', rgb: [0, 114, 206] },
  { name: 'PANTONE 347 C', rgb: [0, 166, 81] },
  { name: 'PANTONE Yellow C', rgb: [254, 223, 0] },
];

export const getPantoneName = (rgbString) => {
  const rgb = rgbString.match(/\d+/g).map(Number);

  const closest = pantoneMap.reduce((prev, curr) => {
    const dist = Math.sqrt(
      (rgb[0] - curr.rgb[0]) ** 2 +
      (rgb[1] - curr.rgb[1]) ** 2 +
      (rgb[2] - curr.rgb[2]) ** 2
    );
    return dist < prev.dist ? { name: curr.name, dist } : prev;
  }, { name: 'Desconocido', dist: Infinity });

  return closest.name;
};
