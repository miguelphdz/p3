//para mantener visible el carro 
var carritoVisible = false;

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}
else{
    ready();
}



//FUNCION PRINCIPAL
function ready(){
    //Agregamos funcionalidad a los botones de elimar
    var botonesEliminar = document.getElementsByClassName('btn-delete');
    for(var i=0; i<botonesEliminar.length;i++){
        var button = botonesEliminar[i];
        button.addEventListener('click', eliminarItemCarrito)
    }

    var botonesSumarCantidad  = document.getElementsByClassName('suma');
    for(var i = 0; i < botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    var botonesRestarCantidad  = document.getElementsByClassName('resta');
    for(var i = 0; i < botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    var botonesAgregarCarrito = document.getElementsByClassName('button-item');
    for(var i=0; i<botonesAgregarCarrito.length; i++){
        var button = botonesAgregarCarrito[i];
        button.addEventListener('click',agregarAlCarritoClicked);
    }

    //boton pagar
    document.getElementsByClassName('btn-pay')[0].addEventListener('click',pagarClick);

}


//FUNCIONES SECUNDARIAS 
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();

    //actualizamos el total del carrito cuando  eliminamos algo
    actualizarTotalCarrito();
    //si no hay elementos en el carrito 
    ocultarCarrito();
}

/*
function actualizarTotalCarrito(){

    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var  carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;

    for(var i=0; i< carritoItems.length; i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-price')[0];
        console.log(precioElemento);

        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        console.log(precio);
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = cantidadItem.value;
        console.log(cantidad);
        total = total + (precio*cantidad);
    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$'+total.toLocaleString("es") + ",00";
}*/


function actualizarTotalCarrito() {
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;

    for (var i = 0; i < carritoItems.length; i++) {
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-price')[0];
        
        // Convertimos el texto del precio en un número flotante eliminando el símbolo '$' y la coma o punto de los miles.
        var precio = parseFloat(precioElemento.innerText.replace('$', '').replace(',', ''));
        
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = parseInt(cantidadItem.value); // Asegúrate de obtener el valor como número entero.
        
        total += precio * cantidad; // Sumar el precio del artículo por su cantidad
    }
    
    // Redondear el total a dos decimales y formatear para mostrar con dos decimales siempre
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toFixed(2);
}


function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false; 


        var items = document.getElementsByClassName('container-items')[0];
        items.style.width = '100%'
    }

}

function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;

    actualizarTotalCarrito();

}

function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;

    if(cantidadActual>=1){
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
    }
}

function agregarAlCarritoClicked(event){
    var button =event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    console.log(titulo);
    var precio = item.getElementsByClassName('price-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlcarrito(titulo, precio, imagenSrc);
    hacerVisibleCarrito();
}


function agregarItemAlcarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add('producto-item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('item-title');
    for(var i=0; i<nombresItemsCarrito.length; i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("El item ya esta dentro en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
    <div class="carrito-item">
                    <img src="${imagenSrc}" alt="producto" width="80px">
                    <div class="info-car">
                        <span class="item-title">${titulo}</span>
                        <div class="selector-cantidad">
                            <i class="fa-solid fa-minus resta" ></i>
                            <input type="text" value="1" class="carrito-item-cantidad" disabled>
                            <i class="fa-solid fa-plus suma"></i>
                        </div>
                        <span class="carrito-item-price">${precio}</span>
                    </div>
                    <button class="btn-delete">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>`
                item.innerHTML = itemCarritoContenido;
                itemsCarrito.append(item);

                //para eliminar items
                item.getElementsByClassName('btn-delete')[0].addEventListener('click',eliminarItemCarrito);

                var botonSumarCantidad = item.getElementsByClassName('suma')[0];
                botonSumarCantidad.addEventListener('click',sumarCantidad);

                var botonesRestarCantidad = item.getElementsByClassName('resta')[0];
                botonesRestarCantidad.addEventListener('click',restarCantidad);

                actualizarTotalCarrito();
}

function pagarClick(event){
    alert("Gracias por tu compra");
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while(carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}

function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = "1";

    var items = document.getElementsByClassName('container-items')[0];
    items.style.width = "60%"
}