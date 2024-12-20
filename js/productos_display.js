// Variables de configuración
const SUPABASE_URL = 'https://vnkohvizfizhindrprxj.supabase.co'; // Reemplaza con la URL de tu proyecto Supabase
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZua29odml6Zml6aGluZHJwcnhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1Mzk2NzQsImV4cCI6MjA0NzExNTY3NH0.bdnM5VJcQqsMPSQgdLmZQ-d6OLxT1Je-s5N2uPgWWAw'; // Reemplaza con tu clave API pública
const TABLE_NAME = 'producto'; // Nombre de la tabla

// Función para hacer una consulta GET a la tabla 'producto' con filtro de id > 9 y disponible = true
async function getData() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}?select=*&id=gt.9&disponible=eq.true`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });

        // Verifica si la respuesta es correcta
        if (!response.ok) {
            throw new Error('Error en la consulta');
        }

        // Convierte la respuesta a formato JSON
        const data = await response.json();

        // Muestra los datos en la consola o en la página
        console.log(data);
        displayData(data); // Llama a una función para mostrar los datos
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

// Función para mostrar los datos en la página
function displayData(data) {
    const container = document.getElementById('container-items');
    container.innerHTML = ''; // Limpia el contenedor

    data.forEach(item => {
        // Crear un contenedor para el producto
        const div = document.createElement('div');
        div.classList.add('producto-item');

        // Contenido del producto
        div.innerHTML = `
            <div class="img-container">
                <img src="${item.imagen_url}" class="img-item" alt="producto">
            </div>
            <h2 class="titulo-item">${item.descripcion}</h2>
            <span class="price-item">$${item.precio}</span>
            <button class="button-item" data-id="${item.id}">Agregar al Carrito</button>
        `;
        
        // Agregar el contenedor al DOM
        container.appendChild(div);

        // Agregar el event listener al botón "Agregar al Carrito"
        const button = div.querySelector('.button-item');
        button.addEventListener('click', agregarAlCarritoClicked);
    });
}


// Llama a la función para obtener datos al cargar la página
document.addEventListener('DOMContentLoaded', getData);
