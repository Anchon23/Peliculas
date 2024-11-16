const TMDB_API_KEY = 'f91debdf958962ba91eb336ae9326030'; // Reemplaza con tu clave de API de TMDb

// Función para renderizar la vista de búsqueda
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
  document.getElementById('searchButton').addEventListener('click', searchMovies);
}

// Función para realizar la búsqueda de películas en la API
function searchMovies() {
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
      displayResults(data.results);
    })
    .catch(err => {
      console.error(err);
      resultsContainer.innerHTML = `<p class="error">No se pudo completar la búsqueda. Intenta de nuevo más tarde.</p>`;
    });
}

// Función para mostrar los resultados en la interfaz
function displayResults(results) {
  const resultsContainer = document.getElementById('results');
  if (results.length === 0) {
    resultsContainer.innerHTML = `<p class="no-results">No se encontraron películas para este término de búsqueda.</p>`;
    return;
  }

  const moviesHTML = results.map(movie => {
    const poster = movie.poster_path 
      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` 
      : 'https://via.placeholder.com/200x300?text=No+Image';
    return `
      <div class="movie-card">
        <img src="${poster}" alt="${movie.title}" />
        <h3>${movie.title}</h3>
        <p>${movie.release_date ? movie.release_date : 'Fecha no disponible'}</p>
        <p>${movie.overview ? movie.overview : 'Sin descripción'}</p>
      </div>
    `;
  }).join('');

  resultsContainer.innerHTML = `<div class="movies-grid">${moviesHTML}</div>`;
}

// Agregar la opción de búsqueda al inicializar
document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('main');
  const searchButton = document.createElement('button');
  searchButton.textContent = 'Buscar Películas';
  searchButton.addEventListener('click', searchView);
  main.parentNode.insertBefore(searchButton, main);
});