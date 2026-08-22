const botones = document.querySelectorAll(".boton");
const listaCarrito = document.querySelector("#lista-carrito");
const totalTexto = document.querySelector("#total");
const cantidadCarrito = document.querySelector("#cantidad-carrito");

let carrito = [];

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
    });
});

function mostrarCarrito() {

    listaCarrito.innerHTML = "";
    let cantidadTotal = 0;

carrito.forEach(function(producto) {
    cantidadTotal += producto.cantidad;
});

cantidadCarrito.textContent = cantidadTotal;

    let total = 0;

    carrito.forEach(function(producto, indice) {

        const elemento = document.createElement("div");

        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        elemento.innerHTML = `
            <p>
                ${producto.nombre} x${producto.cantidad}
                - $${subtotal}
                <button onclick="eliminarProducto(${indice})">❌</button>
            </p>
        `;

        listaCarrito.appendChild(elemento);
    });

    totalTexto.textContent = "Total: $" + total;
}

function eliminarProducto(indice) {

    if (carrito[indice].cantidad > 1) {
        carrito[indice].cantidad--;
    } else {
        carrito.splice(indice, 1);
    }

    mostrarCarrito();
}
document.querySelector("#vaciar-carrito").addEventListener("click", function() {
    carrito = [];
    mostrarCarrito();
});
const abrirCarrito = document.querySelector("#abrir-carrito");
const cerrarCarrito = document.querySelector("#cerrar-carrito");
const carritoElemento = document.querySelector("#carrito");

abrirCarrito.addEventListener("click", function() {
    carritoElemento.classList.add("abierto");
});

cerrarCarrito.addEventListener("click", function() {
    carritoElemento.classList.remove("abierto");
});