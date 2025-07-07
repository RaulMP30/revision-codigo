const baseEndpoint = 'https://api.github.com';
const usersEndpoint = `${baseEndpoint}/users`;
const $n = document.querySelector('.name'); //agregado un . faltante para llamar correctamente a la clase
const $b = document.querySelector('.blog'); //agregado un . faltante para llamar correctamente a la clase
const $l = document.querySelector('.location'); 

//cambiado a función asíncrona
async function displayUser(username) {
  $n.textContent = 'cargando...';
  $b.textContent = ''; //agregado
  $l.textContent = ''; //agregado 


  try { //se cambia a try para manejar errores en la función async
    const response = await fetch(`${usersEndpoint}/${username}`);

    // Si la respuesta no es ok se lanza un error
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // se delcara la variable data y se convierte a JSON

    // Mostramos los datos en el DOM
    $n.textContent = data.name || 'Nombre no disponible';
    $b.textContent = data.blog || 'Blog no disponible';
    $l.textContent = data.location || 'Ubicación no disponible';

  } catch (err) {
    handleError(err); // En caso de error, lo manejamos
  }
}

// Función para mostrar errores
function handleError(err) {
  console.error('¡Ocurrió un error!', err);

  // se muestra  el error en el DOM
  $n.textContent = `Algo salió mal: ${err.message}`;
  $b.textContent = '';
  $l.textContent = '';
}

// se cambió el llamado a la función para mostrar errores
displayUser('stolinski');