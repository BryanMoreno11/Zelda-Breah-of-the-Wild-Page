//region atributos
const claveCarrito = "carrito";
const claveCarritoDetalle = "carritoDetalle";
const iva = 0.15;
let carrito = { id_usuario: 0, subtotal: 0, iva: 0, total: 0, cantidad: 0 };
let carritoDetalle = [];
//region init
cargarCarrito();
console.log(
  "El arreglo de productos carrito detalle al inicio es ",
  carritoDetalle
);
console.log("El carrito es ", carrito);

//region funciones
function cargarLocalStorage(clave) {
  let objeto = localStorage.getItem(clave);
  if (objeto) {
    let item = JSON.parse(objeto);
    return item;
  }
}

function incrementarContador(id) {
  let elementoHtml = document.getElementById("valor" + id);
  let valor = parseInt(elementoHtml.value, 10);
  valor = isNaN(valor) ? 0 : valor;
  valor++;
  elementoHtml.value = valor;
}

function decrementarContador(id) {
  let elementoHtml = document.getElementById("valor" + id);
  let valor = parseInt(elementoHtml.value, 10);
  valor = isNaN(valor) ? 0 : valor;
  if (valor > 1) {
    valor--;
  }
  elementoHtml.value = valor;
}

function mostrarMensajeOculto(){
  let mensaje = document.getElementById("mensajeOculto");
  if(carritoDetalle<=0){
    mensaje.classList.remove("hidden");
  }else{
    mensaje.classList.add("hidden");
  }
}

function cargarProductosHtml() {
  let contenedorProductos = document.getElementById("contenedorProductos");
  contenedorProductos.innerHTML = "";
  if(carritoDetalle.length>0){
    carritoDetalle.forEach((producto) => {
      contenedorProductos.innerHTML += `
            <div class="rounded-lg border border-gray-200  p-4 shadow-sm dark:border-gray-700 md:p-6 bg-amber-200 bg-opacity-80">
                <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                  <a href="#" class="shrink-0 md:order-1">
                    <img class="hidden h-20 w-20 dark:block" src="${producto.imagen}" />
                  </a>
    
                  <label for="counter-input" class="sr-only">Choose quantity:</label>
                  <div class="flex items-center justify-between md:order-3 md:justify-end">
                    <div class="flex items-center">
                      <button onclick="decrementarCantidad(${producto.id_producto})" type="button" id="decrement-button" data-input-counter-decrement="counter-input" class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 ">
                        <svg class="h-2.5 w-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                        </svg>
                      </button>
                      <input type="text" id="valor${producto.id_producto}" data-input-counter class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 " placeholder="" value=${producto.cantidad} required 
                      
                       onblur="onFocusLeaveModificar(${producto.id_producto})"
                      />
                      <button onclick="incrementarCantidad(${producto.id_producto})"   type="button" id="increment-button" data-input-counter-increment="counter-input" class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 ">
                        <svg class="h-2.5 w-2.5 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                    <div class="text-end md:order-4 md:w-64">
                      <p class="text-base font-bold text-gray-900 ">Precio Unitario: $${producto.precio}</p>
                      <p id="importeTexto${producto.id_producto}" class="text-base font-bold text-gray-900 ">Importe: $${producto.importe.toFixed(2)}</p>
  
                    </div>
                  </div>
    
                  <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <p  class="text-base font-medium text-gray-900  ">${producto.nombre}</p>
    
                    <div class="flex items-center gap-4">
                     
    
                      <button onclick="eliminar(${producto.id})" type="button" class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                        <svg class="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                        </svg>
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
    
        `;
    });
  }
}

function mostrarMensaje(titulo, mensaje, icono) {
  Swal.fire({
    title: titulo,
    text: mensaje,
    icon: icono,
  });
}

function cargarCarritoHtml() {
  console.log("carito: ", carrito);
  let contenedorCarrito = document.getElementById("contenedorCarrito");
  contenedorCarrito.innerHTML = "";

  if(carritoDetalle.length>0){
    contenedorCarrito.innerHTML += `
        <div class="space-y-4 rounded-lg border border-gray-200  p-4 shadow-sm dark:border-gray-700 bg-amber-200 bg-opacity-80 sm:p-6">
            <p class="text-xl font-semibold  ">Detalles de la compra</p>
  
            <div class="space-y-4">
              <div class="space-y-2">
                <dl class="flex items-center justify-between gap-4">
                  <dt class="text-base font-normal ">Subtotal</dt>
                  <dd id="subtotal" class="text-base font-medium ">$${carrito.subtotal}</dd>
                </dl>

                <dl class="flex items-center justify-between gap-4">
                    <dt class="text-base font-normal ">Iva</dt>
                    <dd id="iva" class="text-base font-medium ">$${carrito.iva}</dd>
                  </dl>
                
                  <dl class="flex items-center justify-between gap-4 border-t border-gray-700">
                    <dt class="text-base font-normal ">Total:</dt>
                    <dd id="total" class="text-base font-medium ">$${carrito.total}</dd>
                  </dl>

           
            </div>
  
            <a href="#" onclick="finalizarCompra()" class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Comprar</a>
  
            <div class="flex items-center justify-center gap-2">
              <span class="text-sm font-normal  "> o</span>
              <a href="amiibo.html" title="" class="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                Continuar Comprando
                <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                </svg>
              </a>
            </div>
          </div>
    `;
  }


  
}

function onFocusLeaveModificar(id) {
  validarNumero(id);
  modificarProductoCarrito(id);
  console.log(carritoDetalle);
}

function decrementarCantidad(id) {
  decrementarContador(id);
  modificarProductoCarrito(id);
}

function incrementarCantidad(id) {
  incrementarContador(id);
  modificarProductoCarrito(id);
}

function guardarLocalStorage(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
}

function finalizarCompra(){
  carritoDetalle = [];
  carrito={ id_usuario: 0, subtotal: 0, iva: 0, total: 0, cantidad: 0 }
  guardarLocalStorage(claveCarrito, carrito);
  guardarLocalStorage(claveCarritoDetalle, carritoDetalle);
  cargarProductosHtml();
  cargarCarritoHtml();
  mostrarMensajeOculto();
  Swal.fire({
    title: "Compra finalizada",
    text: "¡Gracias por tu compra! Tu pedido ha sido procesado con éxito.",
    icon: "success"
  });
}


function eliminar(id) {
  Swal.fire({
    title: "Eliminar producto",
    text: "¿Estás seguro de que deseas eliminar este producto del carrito?",
    icon: "warning", 
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'No, cancelar'
}).then((result) => {
    if (result.isConfirmed) {
      eliminarProductoCarrito(id);
        Swal.fire(
            'Eliminado!',
            'El producto ha sido eliminado.',
            'success'
        );
    } 
});
}

function eliminarProductoCarrito(id) {
  id = parseInt(id, 10);
  let producto = buscarProductoCarrito(id);
  let posicion = carritoDetalle.indexOf(producto);
  carritoDetalle.splice(posicion, 1);
  calculosCarrito();
  guardarLocalStorage(claveCarritoDetalle, carritoDetalle);
  guardarLocalStorage(claveCarrito, carrito);
  cargarCarritoHtml();
  cargarProductosHtml();
  mostrarMensajeOculto();
}

function cargarCarrito() {
  let objCarrito = cargarLocalStorage(claveCarrito);
  let objCarritoDetalle = cargarLocalStorage(claveCarritoDetalle);
  if (objCarrito && objCarritoDetalle) {
    carrito = objCarrito;
    carritoDetalle = objCarritoDetalle;
  }
}

function actualizarImporte(id, cantidad, precioUnitario) {
  let importeTexto = document.getElementById("importeTexto" + id);
  let importe = cantidad * precioUnitario;
  importeTexto.textContent = `Importe: $${importe.toFixed(2)}`; // Actualizar el contenido del <p> con el nuevo importe
}



function validarNumero(id) {
  id = parseInt(id, 10);
  let elementoHtml = document.getElementById("valor" + id);
  let productoCarrito = buscarProductoCarrito(id);
  let valor = elementoHtml.value;
  if (valor == null || isNaN(valor) || valor <= 0) {
    elementoHtml.value = productoCarrito.cantidad;
  }
}

function modificarProductoCarrito(id_producto) {
  id_producto = parseInt(id_producto, 10);
  let elementoHtml = document.getElementById("valor" + id_producto);
  let cantidad = parseInt(elementoHtml.value, 10);
  let productoCarrito = buscarProductoCarrito(id_producto);
  let auxCantidad = productoCarrito.cantidad;
  if (productoCarrito) {
    productoCarrito.cantidad = cantidad;
    productoCarrito.importe = 
      productoCarrito.precio * productoCarrito.cantidad;
  }
  if (validarStockProducto(id_producto, 0)) {
    calculosCarrito();
    guardarLocalStorage(claveCarritoDetalle, carritoDetalle);
    guardarLocalStorage(claveCarrito, carrito);
  } else {
    productoCarrito.cantidad = auxCantidad;
    elementoHtml.value = auxCantidad;
  }
  actualizarImporte(id_producto, cantidad, productoCarrito.precio);
  cargarCarritoHtml();
}

function validarStockProducto(id_producto, cantidadActual) {
  let cantidadTotal = 0;
  let productoCarrito = buscarProductoCarrito(id_producto);
  if (productoCarrito) {
    cantidadTotal = productoCarrito.cantidad + cantidadActual;
  } else {
    cantidadTotal = cantidadActual;
  }
  if (productoCarrito.stock >= cantidadTotal) {
    return true;
  } else {
    return false;
  }
}

function buscarProductoCarrito(id_producto) {
  return carritoDetalle.find((producto) => producto.id_producto == id_producto);
}

function calculosCarrito() {
  calcularSubtotal();
  calcularIva();
  calcularTotal();
  calcularCantidad();
}

function calcularSubtotal() {
  let subtotal = carritoDetalle.reduce(
    (accumulator, producto) => accumulator + producto.importe,
    0
  );
  carrito.subtotal = Math.round(subtotal * 100) / 100;
}

function calcularIva() {
  let valorIva = carritoDetalle.reduce(
    (accumulator, producto) => accumulator + producto.importe * iva,
    0
  );
  carrito.iva = Math.round(valorIva * 100) / 100;
}

function calcularTotal() {
  let total = carrito.subtotal + carrito.iva;
  carrito.total = Math.round(total * 100) / 100;
}

function calcularCantidad() {
  carrito.cantidad = carritoDetalle.reduce(
    (accumulator, producto) => accumulator + producto.cantidad,
    0
  );
}

document.addEventListener("DOMContentLoaded", function () {
  mostrarMensajeOculto();
  cargarProductosHtml();
  cargarCarritoHtml();
});
