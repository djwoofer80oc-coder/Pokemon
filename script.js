const pokemon = [
  {
    id: 1, nombre: "BULBASAUR", tipos: ["Planta", "Veneno"],
    descripcion: "Un Pokémon amigable que lleva una semilla en el lomo desde su nacimiento. Crece absorbiendo los rayos del sol."
  },
  {
    id: 4, nombre: "CHARMANDER", tipos: ["Fuego"],
    descripcion: "Le gusta todo lo caliente. Se dice que cuando llueve le sale vapor de la punta de su cola."
  },
  {
    id: 7, nombre: "SUIRE", tipos: ["Agua"],
    descripcion: "Cuando retrae su largo cuello en el caparazón, dispara agua a una presión increíble."
  },
  {
    id: 25, nombre: " ", tipos: ["Eléctrico"],
    descripcion: "Cuando varios se juntan, la electricidad que acumulan en las bolsas de sus mejillas puede causar tormentas."
  },
  {
    id: 39, nombre: "Jigglypuff", tipos: ["Normal", "Hada"],
    descripcion: "Cuando canta una canción de cuna con su voz angelical, hace dormir incluso a sus enemigos."
  },
  {
    id: 94, nombre: "Gengar", tipos: ["Fantasma", "Veneno"],
    descripcion: "Se oculta entre las sombras. Se dice que absorbe el calor de todo lo que lo rodea."
  },
  {
    id: 130, nombre: "Gyarados", tipos: ["Agua", "Volador"],
    descripcion: "Aparece en mitos antiguos como el Pokémon que destruyó ciudades enteras en un arrebato de furia."
  },
  {
    id: 149, nombre: "Dragonite", tipos: ["Dragón", "Volador"],
    descripcion: "Es capaz de dar la vuelta al mundo en solo 16 horas. Guía amablemente a los barcos perdidos."
  },
  {
    id: 448, nombre: "Lucario", tipos: ["Lucha", "Acero"],
    descripcion: "Comprende el lenguaje humano. Se dice que solo se deja capturar por aquellos con un espíritu justo."
  },
  {
    id: 658, nombre: "Greninja", tipos: ["Agua", "Siniestro"],
    descripcion: "Comprime el agua para crear hojas afiladas que usa para cortar a sus oponentes con gran precisión."
  },
];

const tipoClase = {
  "Normal": "normal", "Fuego": "fuego", "Agua": "agua", "Planta": "planta",
  "Eléctrico": "electrico", "Hielo": "hielo", "Lucha": "lucha", "Veneno": "veneno",
  "Tierra": "tierra", "Volador": "volador", "Psíquico": "psiquico", "Bicho": "bicho",
  "Roca": "roca", "Fantasma": "fantasma", "Dragón": "dragon", "Siniestro": "siniestro",
  "Acero": "acero", "Hada": "hada",
};

const spriteUrl = id =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

function renderTipos(tipos) {
  return tipos
    .map(t => `<span class="type tipo-${tipoClase[t]}">${t}</span>`)
    .join("");
}

function renderCard(p) {
  return `
    <article class="card" data-nombre="${p.nombre.toLowerCase()}" data-tipos="${p.tipos.join(" ").toLowerCase()}" data-descripcion="${p.descripcion.toLowerCase()}">
      <div class="card-image">
        <img src="${spriteUrl(p.id)}" alt="${p.nombre}" loading="lazy">
      </div>
      <div class="card-header">
        <h2>${p.nombre}</h2>
        <span class="number">#${String(p.id).padStart(3, "0")}</span>
      </div>
      <div class="types">${renderTipos(p.tipos)}</div>
      <p class="card-description">${p.descripcion}</p>
    </article>
  `;
}

const lista = document.getElementById("pokemon-list");
const noResults = document.getElementById("no-results");
const buscador = document.getElementById("buscador");

lista.innerHTML = pokemon.map(renderCard).join("");

function filtrar() {
  const query = buscador.value.trim().toLowerCase();
  const cards = lista.querySelectorAll(".card");
  let visibles = 0;

  cards.forEach(card => {
    const nombre = card.dataset.nombre;
    const tipos = card.dataset.tipos;
    const descripcion = card.dataset.descripcion;
    const coincide = !query || nombre.includes(query) || tipos.includes(query) || descripcion.includes(query);
    card.classList.toggle("hidden", !coincide);
    if (coincide) visibles++;
  });

  noResults.classList.toggle("visible", visibles === 0);
}

buscador.addEventListener("input", filtrar);
