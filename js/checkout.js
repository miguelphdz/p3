// Cargamos los sessionStorage
const carritoDatos = JSON.parse(sessionStorage.getItem('carrito')) || [];

// Agregar console.log para verificar los datos del carrito
console.log("Carrito cargado desde sessionStorage:", carritoDatos);

// Convertir el id de cada producto a un número entero
carritoDatos.forEach(item => {
    item.id = parseInt(item.id, 10); // Convertir el id a entero
});

let total = carritoDatos.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

// Si hay productos en el carrito
if (carritoDatos.length > 0) {
    const container = document.querySelector('.order-summary');

    carritoDatos.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('producto-checkout');
        div.setAttribute('data-index', index);

        div.innerHTML = `
            <div id="carrito-contenedor">
                <div class="product-summary">
                    <img src="${item.imagenSrc}" alt="${item.titulo}" id="${item.id}" class="product-img">
                    <div>
                        <span>${item.titulo}:</span>
                    </div>
                    <span>$${item.precio}</span>
                    
                    <button class="btn-eliminar" data-index="${index}">Eliminar</button>
                </div>
            </div>
        `;

        container.appendChild(div);
    });

    // Crear un div para mostrar el total
    const totalDiv = document.createElement('div');
    totalDiv.classList.add('total-checkout');
    totalDiv.innerHTML = `
        <hr>
        <p><strong>Total: $<span id="total-amount">${total.toFixed(2)}</span></strong></p>
    `;
    container.appendChild(totalDiv);

    // Agregar funcionalidad al botón "Eliminar"
    const botonesEliminar = document.querySelectorAll('.btn-eliminar');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            eliminarProducto(index);
        });
    });
} else {
    console.log('No hay productos en el carrito');
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
    carritoDatos.splice(index, 1); // Eliminar el producto del arreglo
    total = carritoDatos.reduce((acc, item) => acc + item.precio * item.cantidad, 0); // Recalcular el total
    sessionStorage.setItem('carrito', JSON.stringify(carritoDatos)); // Actualizar sessionStorage

    // Actualizar el DOM
    const productoDiv = document.querySelector(`.producto-checkout[data-index="${index}"]`);
    productoDiv.remove(); // Eliminar el producto del DOM

    // Actualizar el total en el DOM
    const totalAmountElement = document.getElementById('total-amount');
    totalAmountElement.textContent = total.toFixed(2);

    // Verificar si el carrito está vacío y mostrar un mensaje
    if (carritoDatos.length === 0) {
        const container = document.querySelector('.order-summary');
        container.innerHTML = '<p>No hay productos en el carrito</p>';
    }
}

