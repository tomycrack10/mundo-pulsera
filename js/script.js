const botones = document.querySelectorAll(".boton");
const listaCarrito = document.querySelector("#lista-carrito");
const totalTexto = document.querySelector("#total");
const cantidadCarrito = document.querySelector("#cantidad-carrito");

const abrirCarrito = document.querySelector("#abrir-carrito");
const cerrarCarrito = document.querySelector("#cerrar-carrito");
const carritoElemento = document.querySelector("#carrito");
const avisoCarrito = document.querySelector("#aviso-carrito");
const botonFinalizar = document.querySelector("#finalizar-compra");
const botonVaciar = document.querySelector("#vaciar-carrito");
const fondoCarrito = document.querySelector("#fondo-carrito");
let carrito = [];


// AGREGAR PRODUCTOS
botones.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const producto = boton.dataset.producto;
        const precio = Number(boton.dataset.precio);

        const productoExistente = carrito.find(function(item) {
            return item.nombre === producto;
        });

        if (productoExistente) {

            productoExistente.cantidad++;

        } else {

            carrito.push({
                nombre: producto,
                precio: precio,
                cantidad: 1
            });

        }

        mostrarCarrito();
        avisoCarrito.textContent = `✅ Agregaste ${producto} al carrito`;
avisoCarrito.classList.add("mostrar");

setTimeout(function() {
    avisoCarrito.classList.remove("mostrar");
}, 2000);
    });

});


// MOSTRAR CARRITO
function mostrarCarrito() {

    listaCarrito.innerHTML = "";

    let total = 0;
    let cantidadTotal = 0;

    if (carrito.length === 0) {

        listaCarrito.innerHTML = `
            <div class="carrito-vacio">
                <div class="carrito-vacio-icono">🛒</div>
                <h3>Tu carrito está vacío</h3>
                <p>Agregá algunos productos para comenzar tu compra ✨</p>
            </div>
        `;

    }

    carrito.forEach(function(producto, indice) {

        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;
        cantidadTotal += producto.cantidad;

        const elemento = document.createElement("div");

        elemento.innerHTML = `
            <div class="producto-carrito">

                <div>
                    <strong>${producto.nombre}</strong>
                    <span>$${producto.precio} c/u</span>
                </div>

                <div class="controles-cantidad">
                    <button onclick="eliminarProducto(${indice})">−</button>

                    <span>${producto.cantidad}</span>

                    <button onclick="agregarCantidad(${indice})">+</button>
                </div>

                <strong class="subtotal">$${subtotal}</strong>

            </div>
        `;

        listaCarrito.appendChild(elemento);

    });

    totalTexto.textContent = "Total: $" + total;

    cantidadCarrito.textContent = cantidadTotal;
}


// ELIMINAR PRODUCTO
function eliminarProducto(indice) {

    if (carrito[indice].cantidad > 1) {

        carrito[indice].cantidad--;

    } else {

        carrito.splice(indice, 1);

    }

    mostrarCarrito();
}
function agregarCantidad(indice) {

    carrito[indice].cantidad++;

    mostrarCarrito();

}


// VACIAR CARRITO
botonVaciar.addEventListener("click", function() {

    carrito = [];

    mostrarCarrito();

});


// ABRIR CARRITO
abrirCarrito.addEventListener("click", function() {

    carritoElemento.classList.add("abierto");
    fondoCarrito.classList.add("activo");

});

// CERRAR CARRITO
cerrarCarrito.addEventListener("click", function() {

    carritoElemento.classList.remove("abierto");
    fondoCarrito.classList.remove("activo");

});


// FINALIZAR COMPRA POR WHATSAPP
botonFinalizar.addEventListener("click", function() {

    if (carrito.length === 0) {

        alert("Tu carrito está vacío.");

        return;
    }

    let mensaje = "Hola! Quiero hacer un pedido en Mundo Pulsera 📿\n\n";

    let total = 0;

    carrito.forEach(function(producto) {

        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;

        mensaje += `- ${producto.nombre} x${producto.cantidad} — $${subtotal}\n`;

    });

    mensaje += `\nTotal: $${total}`;

    const numero = "5491162930737";

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");

carritoElemento.classList.remove("abierto");
document.querySelector(".fondo-carrito").classList.remove("activo");

});
mostrarCarrito();
