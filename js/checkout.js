const carritoDatos = JSON.parse(localStorage.getItem('carrito'));

// Si hay productos en el carrito
if (carritoDatos && carritoDatos.length > 0) {
    const container = document.getElementById('carrito-contenedor');

    carritoDatos.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('producto-checkout');

        div.innerHTML = `
            <img src="${item.imagenSrc}" alt="${item.titulo}" class="img-item-checkout">
            <p><strong>${item.titulo}</strong></p>
            <p>Precio: $${item.precio}</p>
            <p>Cantidad: ${item.cantidad}</p>
            <p>ID: ${item.id}</p>
        `;

        container.appendChild(div);
    });
} else {
    console.log('No hay productos en el carrito');
}