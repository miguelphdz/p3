// Variables de configuración
const SUPABASE_URL = 'https://vnkohvizfizhindrprxj.supabase.co'; // Reemplaza con la URL de tu proyecto Supabase
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZua29odml6Zml6aGluZHJwcnhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1Mzk2NzQsImV4cCI6MjA0NzExNTY3NH0.bdnM5VJcQqsMPSQgdLmZQ-d6OLxT1Je-s5N2uPgWWAw'; // Reemplaza con tu clave API pública
const TABLE_NAME = 'producto'; // Nombre de la tabla

// Función para hacer una consulta GET a la tabla 'producto'
async function getData() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE_NAME}?select=*`, {
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
        const div = document.createElement('producto-item');
        div.innerHTML = `
            
                <div class="img-container">
                    <img src="../imgProducto/2.jpg" class="img-item" alt="producto">
                </div>
                <h2 class="titulo-item">Blusa bordado rojo</h2>
                <span class="price-item">$21000</span>
                <button class="button-item">Agregar al Carrito</button>
            
        `;
        container.appendChild(div);
    });
}

// Llama a la función para obtener datos al cargar la página
document.addEventListener('DOMContentLoaded', getData);
