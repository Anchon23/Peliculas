const TMDB_API_KEY = 'f91debdf958962ba91eb336ae9326030'; // Reemplaza con tu clave de API de TMDb

// VISTAS

let mis_peliculas_iniciales = [
  {titulo: "Superlópez",   director: "Javier Ruiz Caldera", "miniatura": "files/superlopez.png"},
  {titulo: "Jurassic Park", director: "Steven Spielberg", "miniatura": "files/jurassicpark.png"},
  {titulo: "Interstellar",  director: "Christopher Nolan", "miniatura": "files/interstellar.png"}
];

let mis_peliculas = [...mis_peliculas_iniciales];

const genreIDs = {
  "Drama": 18,  // ID para "Drama" según la API de TMDB
  "Comedia": 35,  // ID para "Comedia"
  "Acción": 28,  // ID para "Acción"
  "Aventura": 12,  // ID para "Aventura"
  "Ciencia Ficción": 878,  // ID para "Ciencia Ficción"
  "Fantasía": 14,  // ID para "Fantasía"
  "Animación": 16,  // ID para "Animación"
  "Crimen": 80,  // ID para "Crimen"
  "Misterio": 9648,  // ID para "Misterio"
  "Suspense": 53,  // ID para "Suspense"
  "Terror": 27,  // ID para "Terror"
  "Documental": 99,  // ID para "Documental"
  "Música": 10402,  // ID para "Música"
  "Romance": 10749,  // ID para "Romance"
  "Familia": 10751,  // ID para "Familia"
  "Guerra": 10752,  // ID para "Guerra"
  // Añade otros géneros aquí si es necesario
};


// Vista de palabras clave asociadas a una película
const keywordsView = (movieId) => {
  const keywords = [
    { id: 1, name: "Aventura" },
    { id: 2, name: "Ciencia Ficción" },
    { id: 3, name: "Acción" },
    { id: 4, name: "Drama" }
  ]; // Esto debería ser reemplazado por una llamada a la API para obtener las palabras clave
  const processedKeywords = processKeywords(keywords);

  return `
    <h2>Palabras Clave</h2>
    <div class="keywords-container">
      ${processedKeywords.map(keyword => `
        <div class="keyword">
          <span>${keyword}</span>
          <button class="add-keyword" data-keyword="${keyword}">Añadir</button>
        </div>
      `).join('')}
    </div>
    <button class="index">Volver</button>
  `;
}

const processKeywords = (keywords) => {
  return keywords.map(k => k.name.replace(/[^a-zA-Z0-9\s]/g, '').trim());
}

let myKeywords = [];

const addKeywordToList = (keyword) => {
  if (!myKeywords.includes(keyword)) {
    myKeywords.push(keyword);
    alert(`La palabra clave "${keyword}" ha sido añadida a tu lista.`);
  } else {
    alert(`La palabra clave "${keyword}" ya está en tu lista.`);
  }
}

const myKeywordsView = () => {
  return `
    <h2>Mis Palabras Clave</h2>
    <div class="keywords-list">
      ${myKeywords.length > 0 ? myKeywords.map((keyword, index) => `
        <div class="keyword">
          <span>${keyword}</span>
          <button class="remove-keyword" data-index="${index}">Eliminar</button>
        </div>
      `).join('') : '<p>No tienes palabras clave en tu lista.</p>'}
    </div>
    <button class="index">Volver</button>
  `;
}

// Mostrar peliculas por palabras clave de myKeywordsView
const searchByKeywords = () => {
  const results = mis_peliculas.filter(pelicula => {
    const titulo = pelicula.titulo.toLowerCase();
    return myKeywords.some(keyword => titulo.includes(keyword.toLowerCase()));
  });

  document.getElementById('main').innerHTML = indexView(results);
}

const indexView = (peliculas) => {
  let i=0;
  let view = "";

  while(i < peliculas.length) {
    view += `
      <div class="movie">
         <div class="movie-img">
              <img class="show" data-my-id="${i}" src="${peliculas[i].miniatura}" onerror="this.src='./files/placeholder.png'; console.error('Error al cargar la imagen: ${peliculas[i].miniatura}')"/>
              <style>
              .movie-img img {
                  display: block;
                  margin-left: auto;
                  margin-right: auto;
              }
          </style>
         </div>
         <div class="title">
             ${peliculas[i].titulo || "<em>Sin título</em>"}
         </div>
         <div class="actions">
              <button class="show" data-my-id="${i}">ver</button>
              <button class="edit" data-my-id="${i}">editar</button>
              <button class="delete" data-my-id="${i}">borrar</button>
          </div>
      </div>\n`;
    i++;
  };

  view += `<div class="actions">
              <button class="new">Nueva Película</button>
              <button class="reset">Reiniciar</button>
          </div>`;

  return view;
}

const editView = (i, pelicula) => {
  return `<h2>Editar Película </h2>
      <div class="field">
      Título <br>
      <input  type="text" id="titulo" placeholder="Título" 
              value="${pelicula.titulo}">
      </div>
      <div class="field">
      Director <br>
      <input  type="text" id="director" placeholder="Director" 
              value="${pelicula.director}">
      </div>
      <div class="field">
      Miniatura <br>
      <input  type="text" id="miniatura" placeholder="URL de la miniatura" 
              value="${pelicula.miniatura}">
      </div>
      <div class="actions">
          <button class="update" data-my-id="${i}">
              Actualizar
          </button>
          <button class="index">
              Volver
          </button>
      </div>`;
}

const showView = (pelicula) => {
  // Completar: genera HTML con información de la película
  // ...
  return `<h2>${pelicula.titulo}</h2>
      <p style="text-align: center;"><span style="color: #29b6f6;">DIRECTOR</span>: ${pelicula.director}</p>
      <div class="movie-img">
          <img src="${pelicula.miniatura}" alt="Carátula de ${pelicula.titulo}" onerror="this.src='./files/placeholder.png'"/>
          <style>
              .movie-img img {
                  display: block;
                  margin-left: auto;
                  margin-right: auto;
              }
          </style>
      </div>
      <div class="actions">
          <button class="index">Volver</button>
      </div>`;
}

const newView = () => {
  // Completar: genera formulario para crear nuevo quiz
  // ...
  return `
      <h2>Crear Nueva Película</h2>
      <div class="field">
          <label for="titulo">Título</label><br>
          <input type="text" id="titulo" placeholder="Título de la película">
      </div>
      <div class="field">
          <label for="director">Director</label><br>
          <input type="text" id="director" placeholder="Director de la película">
      </div>
      <div class="field">
          <label for="miniatura">URL de la Miniatura</label><br>
          <input type="text" id="miniatura" placeholder="URL de la carátula">
      </div>
      <div class="actions">
          <button class="create">Crear</button>
          <button class="index">Volver</button>
      </div>`;
}

const resultsView = (resultados, query) => {
  const resultsContainer = document.getElementById('results');

  if (resultados.length === 0) {
    resultsContainer.innerHTML = `<p class="no-results">No se encontraron películas para "${query}".</p>`;
    return;
  }

  const resultadosHTML = resultados
    .map((pelicula) => {
      const poster = pelicula.poster_path
        ? `https://image.tmdb.org/t/p/w200${pelicula.poster_path}`
        : 'https://via.placeholder.com/200x300?text=No+Image';

      const background = pelicula.poster_path
        ? `https://image.tmdb.org/t/p/original${pelicula.poster_path}` // Fondo de alta calidad
        : 'https://via.placeholder.com/1920x1080?text=No+Image';

      return `
        <div class="swiper-slide" style="background-image: url('${background}');">
          <div class="movie">
            <div class="movie-img">
              <img src="${poster}" alt="${pelicula.title}" onerror="this.src='./files/placeholder.png'" />
            </div>
            <div class="title">${pelicula.title}</div>
            <div class="overview">${pelicula.overview || "Sin descripción disponible."}</div>
            <button class="add-from-api" data-pelicula='${JSON.stringify(pelicula)}'>Añadir</button>
          </div>
        </div>`;
    })
    .join('');

  resultsContainer.innerHTML = `
    <h2>Resultados para "${query}"</h2>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        ${resultadosHTML}
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
    <button class="index">Volver</button>
  `;

  // Inicializar Swiper
  new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: '.swiper-pagination',
    },
  });

  // Añadir eventos de clic a los botones "Añadir"
  document.querySelectorAll('.add-from-api').forEach((button) => {
    button.addEventListener('click', (event) => {
      const pelicula = JSON.parse(event.target.dataset.pelicula);
      addFromAPIContr(pelicula); // Llamar a la función para agregar la película
    });
  });
};


  
// CONTROLADORES 

const initContr = () => {
  indexContr();
}

const indexContr = () => {
  document.getElementById('main').innerHTML = indexView(mis_peliculas);
}

// Controlador de búsqueda
const searchContr = () => {
  const query = document.getElementById('searchInput').value.trim();
  const resultsContainer = document.getElementById('results');

  if (!query) {
    resultsContainer.innerHTML = `<p class="error">Por favor, ingresa un término de búsqueda.</p>`;
    return;
  }

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud a TMDb');
      }
      return response.json();
    })
    .then(data => {
      resultsView(data.results, query);
    })
    .catch(err => {
      console.error(err);
      resultsContainer.innerHTML = `<p class="error">No se pudo completar la búsqueda. Intenta de nuevo más tarde.</p>`;
    });
};


const showContr = (i) => {
  const pelicula = mis_peliculas[i];
  document.getElementById('main').innerHTML = showView(pelicula);
}

const newContr = () => {
  document.getElementById('main').innerHTML = newView();
}

const createContr = () => {
  const titulo = document.getElementById('titulo').value;
  const director = document.getElementById('director').value;
  const miniatura = document.getElementById('miniatura').value;

  if (titulo && director && miniatura) {
      mis_peliculas.push({ titulo, director, miniatura });
      indexContr();
  } else {
      alert("Por favor, completa todos los campos antes de crear la película.");
  }
}

const editContr = (i) => {
  document.getElementById('main').innerHTML = editView(i,  mis_peliculas[i]);
}

const updateContr = (i) => {
  mis_peliculas[i].titulo   = document.getElementById('titulo').value;
  mis_peliculas[i].director = document.getElementById('director').value;
  mis_peliculas[i].miniatura = document.getElementById('miniatura').value;
  indexContr();
}

const deleteContr = (i) => {
  const confirmDelete = confirm("¿Estás seguro de que deseas eliminar esta película?");
  if (confirmDelete) {
      mis_peliculas.splice(i, 1);
      indexContr();
  }
}

const resetContr = () => {
  const confirmReset = confirm("¿Estás seguro de que deseas restaurar el modelo al estado inicial?");
  if (confirmReset) {
      mis_peliculas = [...mis_peliculas_iniciales];
      indexContr();
  }
}

// Función para añadir una película desde los resultados de la API
const addFromAPIContr = (pelicula) => {
  const existe = mis_peliculas.some(p => p.titulo === pelicula.title);
  if (existe) {
    alert("Esta película ya está en tu lista.");
    return;
  }

  // Añadir la película a la lista local
  mis_peliculas.push({
    titulo: pelicula.title,
    director: pelicula.director || 'Desconocido',
    miniatura: `https://image.tmdb.org/t/p/w200${pelicula.poster_path}`,
  });

  alert(`${pelicula.title} ha sido añadida a tus películas favoritas.`);
};


// ROUTER de eventos
const matchEvent = (ev, sel) => ev.target.matches(sel)
const myId = (ev) => Number(ev.target.dataset.myId)

document.addEventListener('click', ev => {
  if (matchEvent(ev, '.index')) indexContr();
  else if (matchEvent(ev, '.edit')) editContr(myId(ev));
  else if (matchEvent(ev, '.update')) updateContr(myId(ev));
  else if (matchEvent(ev, '.show')) showContr(myId(ev));
  else if (matchEvent(ev, '.new')) newContr();
  else if (matchEvent(ev, '.create')) createContr();
  else if (matchEvent(ev, '.delete')) deleteContr(myId(ev));
  else if (matchEvent(ev, '.reset')) resetContr();
  else if (matchEvent(ev, '.search')) searchContr();
  else if (matchEvent(ev, '.search-by-keywords')) searchByKeywords();
  else if (matchEvent(ev, '.add-from-api')) {
      const pelicula = JSON.parse(ev.target.dataset.pelicula);
      addFromAPIContr(pelicula);
      ev.target.disabled = true; // Deshabilitar el botón temporalmente
  }
  else if (matchEvent(ev, '.add-keyword')) {
      const keyword = ev.target.dataset.keyword;
      addKeywordToList(keyword);
  }
  else if (matchEvent(ev, '.search-by-keywords')) {
    searchByKeywords();
  }
  else if (matchEvent(ev, '.remove-keyword')) {
      const index = myId(ev);
      myKeywords.splice(index, 1);
      myKeywordsView(); // Actualizar la vista de palabras clave
  }
});

// Función para mostrar la vista de palabras clave de una película
const showKeywordsContr = (movieId) => {
  document.getElementById('main').innerHTML = keywordsView(movieId);
}

// Función para mostrar la vista de mis palabras clave
const showMyKeywordsContr = () => {
  document.getElementById('main').innerHTML = myKeywordsView();
}

// Inicialización        
document.addEventListener('DOMContentLoaded', () => {
  initContr();
});

// Función para mostrar la vista de búsqueda
function searchView() {
  const main = document.getElementById('main');
  main.innerHTML = `
    <div class="search-container">
      <h2>Buscar Películas</h2>
      <input type="text" id="searchInput" placeholder="Ingresa el título de una película..." />
      <button id="searchButton">Buscar</button>
      <div id="results"></div>
    </div>
  `;

  // Event listener para el botón de búsqueda
  document.getElementById('searchButton').addEventListener('click', searchContr);
}

// Agregar la opción de búsqueda al inicializar
document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('main');
  const searchButton = document.createElement('button');
  searchButton.textContent = 'Buscar Películas';
  searchButton.addEventListener('click', searchView);
  main.parentNode.insertBefore(searchButton, main);
});

// Agregar la opción de búsqueda palabra clave al inicializar
document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('main');
  const searchButton = document.createElement('button');
  searchButton.textContent = 'Mis Palabras Clave';
  searchButton.addEventListener('click', showMyKeywordsContr);
  main.parentNode.insertBefore(searchButton, main);
});

// Agregar la opción de búsqueda palabra clave al inicializar
document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('main');
  const searchButton = document.createElement('button');
  searchButton.textContent = 'Palabras Clave';
  searchButton.addEventListener('click', () => showKeywordsContr(550)); // ID de película de ejemplo
  main.parentNode.insertBefore(searchButton, main);
});

// Agregar la opción de búsqueda palabra clave al inicializar
document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('main');
  const searchButton = document.createElement('button');
  searchButton.textContent = 'Mis Películas';
  searchButton.addEventListener('click', indexContr);
  main.parentNode.insertBefore(searchButton, main);
});