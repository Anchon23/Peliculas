const apiKey = 'f91debdf958962ba91eb336ae9326030'; // Reemplaza con tu clave de API real

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json'
  }
};

fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`, options)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Respuesta de autenticación:', data);
  })
  .catch(err => {
    console.error('Error al conectarse a TMDb:', err);
  });
