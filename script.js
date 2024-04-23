// Seleccionar el contenedor SVG
const svg = d3.select("svg");

// Variable para el seguimiento del estado del menú
let isSubMenuVisible = false;

// Función para mostrar los subbotones al hacer clic en el botón del medio
function toggleSubMenu() {
  // Alternar la visibilidad de los subbotones
  if (!isSubMenuVisible) {
    // Mostrar los subbotones con una transición suave
    subCircles.transition().duration(500).style("opacity", 1);
    subCircleImages.transition().duration(500).style("opacity", 1);
    isSubMenuVisible = true;
  } else {
    // Ocultar los subbotones con una transición suave
    subCircles.transition().duration(500).style("opacity", 0);
    subCircleImages.transition().duration(500).style("opacity", 0);
    isSubMenuVisible = false;
  }
}

// Función para volver al menú principal
function backToMain() {
  // Mostrar el círculo principal
  mainCircle.style("opacity", 1);
  // Ocultar los círculos secundarios y sus imágenes con una transición suave
  subCircles.transition().duration(500).style("opacity", 0);
  subCircleImages.transition().duration(500).style("opacity", 0);
  // Restablecer el estado del menú
  isSubMenuVisible = false;
}

// Función para mostrar la imagen en un popup al hacer clic en un subbotón
function showImagePopup(imageUrl) {
  // Crear un div para el popup
  const popup = document.createElement("div");
  popup.classList.add("popup");

  // Crear la imagen en el popup
  const image = document.createElement("img");
  image.src = "qr.png"; // Usar la URL de la imagen proporcionada como parámetro
  popup.appendChild(image);

  // Agregar botón de cierre al popup
  const closeButton = document.createElement("button");
  closeButton.textContent = "Cerrar";
  closeButton.addEventListener("click", () => {
    document.body.removeChild(popup); // Cerrar el popup al hacer clic en el botón
  });
  popup.appendChild(closeButton);

  // Agregar el popup al cuerpo del documento
  document.body.appendChild(popup);

  // Reproducir el sonido al mostrar los subbotones
  playSound();
}

// Función para reproducir el sonido
function playSound() {
  const audio = new Audio("bien.mp3"); // Ruta del archivo de sonido
  audio.play();
}

// Datos de ejemplo para las imágenes
const imagePaths = ["auch.png", "confundido.png", "contento.png", "triste.png"];

// Agregar el círculo principal al SVG
const mainCircle = svg.append("circle")
  .attr("cx", 200)
  .attr("cy", 200)
  .attr("r", 100)
  .attr("fill", "lightblue")
  .attr("stroke", "black")
  .attr("stroke-width", 2)
  .on("click", backToMain);

// Agregar texto al círculo principal
svg.append("text")
  .attr("x", 200)
  .attr("y", 200)
  .attr("dy", ".35em")
  .text("Estados de Ánimo")
  .style("font-size", "16px")
  .style("text-anchor", "middle")
  .style("fill", "black");

// Agregar los círculos secundarios y sus imágenes
const subCircles = svg.selectAll(".subCircle")
  .data(imagePaths)
  .enter()
  .append("circle")
  .attr("class", "subCircle")
  .attr("cx", (d, i) => 200 + 150 * Math.cos((i * Math.PI) / 2))
  .attr("cy", (d, i) => 200 + 150 * Math.sin((i * Math.PI) / 2))
  .attr("r", 50)
  .attr("fill", "lightgreen")
  .attr("stroke", "black")
  .attr("stroke-width", 2)
  .style("opacity", 0)
  .on("click", function(d) {
    showImagePopup(d); // Llamar a la función showImagePopup con la URL de la imagen correspondiente
  });

const subCircleImages = svg.selectAll(".subCircleImage")
  .data(imagePaths)
  .enter()
  .append("image")
  .attr("class", "subCircleImage")
  .attr("xlink:href", d => d)
  .attr("x", (d, i) => 200 + 150 * Math.cos((i * Math.PI) / 2) - 25)
  .attr("y", (d, i) => 200 + 150 * Math.sin((i * Math.PI) / 2) - 25)
  .attr("width", 50)
  .attr("height", 50)
  .style("pointer-events", "auto")
  .style("opacity", 0);

// Agregar el círculo del botón del medio al SVG
const middleCircle = svg.append("circle")
  .attr("cx", 200)
  .attr("cy", 200)
  .attr("r", 100)
  .attr("fill", "transparent")
  .attr("stroke", "transparent")
  .attr("stroke-width", 2)
  .on("click", toggleSubMenu); // Función para mostrar u ocultar los subbotones al hacer clic
