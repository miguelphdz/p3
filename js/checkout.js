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

// ----------------- NUEVA FUNCIÓN PARA FINALIZAR COMPRA -----------------

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("payment-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita que se envíe el formulario por defecto

    // Obtener todos los inputs requeridos
    const requiredFields = form.querySelectorAll("input[required]");
    let allFieldsFilled = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        allFieldsFilled = false;
        field.style.border = "2px solid red"; // Resaltar los campos vacíos
      } else {
        field.style.border = ""; // Restablecer el estilo si está lleno
      }
    });

    // Si todos los campos están llenos, mostrar mensaje de éxito
    if (allFieldsFilled) {
      showSuccessModal(); // Función para mostrar el modal
    }
  });

  // Función para mostrar el modal de compra exitosa
  function showSuccessModal() {
    const modal = document.createElement("div");
    modal.classList.add("modal");

    modal.innerHTML = `
      <div class="modal-content">
        <h2>¡Compra Exitosa!</h2>
        <p>Tu pedido ha sido procesado correctamente. ¡Gracias por tu compra!</p>
        <button id="close-modal">Cerrar</button>
      </div>
    `;

    document.body.appendChild(modal);

    const closeModalButton = document.getElementById("close-modal");
    closeModalButton.addEventListener("click", () => {
      modal.remove(); // Elimina el modal al cerrar
      sessionStorage.clear(); // Limpia el carrito después de la compra
      location.reload(); // Recarga la página
    });
  }
});
