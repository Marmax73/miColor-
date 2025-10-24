// utils/getDominantColor.js
export function getDominantColor(imageData) {
  const { data, width, height } = imageData;
  const length = width * height;
  let r = 0, g = 0, b = 0;

  // Sumatoria de los valores RGB de todos los píxeles
  for (let i = 0; i < data.length; i += 4) {
    r += data[i];     // rojo
    g += data[i + 1]; // verde
    b += data[i + 2]; // azul
  }

  // Promedio de cada componente
  r = Math.round(r / length);
  g = Math.round(g / length);
  b = Math.round(b / length);

  return { r, g, b };
}
