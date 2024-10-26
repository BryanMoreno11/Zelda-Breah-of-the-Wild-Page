const firebaseConfig = {
  apiKey: "AIzaSyCOfqLPDoHCP1E6ShROX7YYteBmn3NYB6M",
  authDomain: "zelda-breath-of-the-wild-page.firebaseapp.com",
  projectId: "zelda-breath-of-the-wild-page",
  storageBucket: "zelda-breath-of-the-wild-page.appspot.com",
  messagingSenderId: "953911522581",
  appId: "1:953911522591:web:8d8ca0eb364d3febdd251c"
};
// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let productos = [
];

const claveCarrito = "carrito";
const claveCarritoDetalle = "carritoDetalle";
const iva = 0.15;
let carrito = {  subtotal: 0, iva: 0, total: 0, cantidad: 0 };
let carritoDetalle = [];
cargarCarrito();
//region funciones
async function obtenerDatos() {
  try {
      // Obtener la colección
      const querySnapshot = await db.collection("productos").get();
      
      // Convertir la colección en un array de objetos
      productos = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
      }));

      console.log("Datos obtenidos:", arrayDeDatos);
      return arrayDeDatos;
      
  } catch (error) {
      console.error("Error al obtener los datos:", error);
  }
}


function cargarProductosHtml() {
  let contenedorProductos = document.getElementById("contenedorProductos");
  productos.forEach((producto) => {
    contenedorProductos.innerHTML += `
        <div
              class="mx-3 mt-6 flex flex-col self-start rounded-lg   shadow-secondary-1 dark:bg-surface-dark dark:text-white sm:shrink-0 sm:grow sm:basis-0">
              <a href="#!">
                <img
                  class="rounded-t-lg mx-auto"
                  src="${producto.imagen}"
                  alt="Hollywood Sign on The Hill" />
              </a>
              <div class="p-6">
                <h5 class="mb-2 text-2xl font-medium leading-tight text-center">${producto.nombre}</h5>
                <p class="text-center">Precio: $${producto.precio} (Iva incluido al 15%)</p>
                <p class="text-center">Stock: ${producto.stock}</p>
              </div>
             <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
                <div class="flex sm:items-center sm:justify-center w-full">
                    <button onclick="decrementarContador(valor${producto.id_producto})"
                        class="group py-4 px-6 border border-gray-400  bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300">
                        <svg class="stroke-gray-900 group-hover:stroke-black" width="22" height="22"
                            viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.5 11H5.5" stroke="" stroke-width="1.6" stroke-linecap="round" />
                            <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                stroke-linecap="round" />
                            <path d="M16.5 11H5.5" stroke="" stroke-opacity="0.2" stroke-width="1.6"
                                stroke-linecap="round" />
                        </svg>
                    </button>
                    <input type="text"
                        class="text-black font-semibold  cursor-pointer text-lg py-[13px] px-6 w-full sm:max-w-[118px] outline-0 border-y border-gray-400 text-center bg-gray-50"
                        value=1
                        id="valor${producto.id_producto}"
                        onblur="validarNumero(this)"
                        
                       >
                    <button onclick="incrementarContador(valor${producto.id_producto})"
                        class="group py-4 px-6 border border-gray-400  bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300">
                        <svg class="stroke-gray-900 group-hover:stroke-black" width="22" height="22"
                            viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 5.5V16.5M16.5 11H5.5" stroke="#9CA3AF" stroke-width="1.6"
                                stroke-linecap="round" />
                            <path d="M11 5.5V16.5M16.5 11H5.5" stroke="black" stroke-opacity="0.2"
                                stroke-width="1.6" stroke-linecap="round" />
                            <path d="M11 5.5V16.5M16.5 11H5.5" stroke="black" stroke-opacity="0.2"
                                stroke-width="1.6" stroke-linecap="round" />
                        </svg>
                    </button>
                </div>
                <button onclick="insertarProducto(${producto.id_producto})"
                    class="group py-4 px-5 bg-indigo-50 text-indigo-600 font-semibold text-lg w-full flex items-center justify-center gap-2 transition-all duration-500 hover:bg-indigo-100">
                    <svg class="stroke-indigo-600 " width="22" height="22" viewBox="0 0 22 22" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.7394 17.875C10.7394 18.6344 10.1062 19.25 9.32511 19.25C8.54402 19.25 7.91083 18.6344 7.91083 17.875M16.3965 17.875C16.3965 18.6344 15.7633 19.25 14.9823 19.25C14.2012 19.25 13.568 18.6344 13.568 17.875M4.1394 5.5L5.46568 12.5908C5.73339 14.0221 5.86724 14.7377 6.37649 15.1605C6.88573 15.5833 7.61377 15.5833 9.06984 15.5833H15.2379C16.6941 15.5833 17.4222 15.5833 17.9314 15.1605C18.4407 14.7376 18.5745 14.0219 18.8421 12.5906L19.3564 9.84059C19.7324 7.82973 19.9203 6.8243 19.3705 6.16215C18.8207 5.5 17.7979 5.5 15.7522 5.5H4.1394ZM4.1394 5.5L3.66797 2.75"
                            stroke="" stroke-width="1.6" stroke-linecap="round" />
                    </svg>
                    Añadir al carrito</button>
              </div>
            </div>

    `;
  });
}



 function incrementarContador(elementoHtml) {
  let valor = parseInt(elementoHtml.value, 10);
  valor = isNaN(valor) ? 0 : valor;
  valor++;
  elementoHtml.value = valor;
}

function decrementarContador(elementoHtml) {
  let valor = parseInt(elementoHtml.value, 10);
  valor = isNaN(valor) ? 0 : valor;
  if (valor > 1) {
    valor--;
  }
  elementoHtml.value = valor;
}

function validarNumero(elementoHtml) {
  let valor = elementoHtml.value;
  if (valor == null || isNaN(valor) || valor <= 0) {
    elementoHtml.value = 1;
  }
}
//region carrito
function buscarProductoCarrito(id_producto) {
  let productoCarrito = carritoDetalle.find(
    (producto) => producto.id_producto == id_producto
  );
  return productoCarrito;
}

function obtenerProducto(id_producto) {
  let producto = productos.find(
    (producto) => producto.id_producto == id_producto
  );
  return producto;
}

function validarStockProducto(id_producto, cantidadActual) {
  let cantidadTotal = 0;
  let producto = obtenerProducto(id_producto);
  let productoCarrito = buscarProductoCarrito(id_producto);
  if (productoCarrito) {
    cantidadTotal = productoCarrito.cantidad + cantidadActual;
  } else {
    cantidadTotal = cantidadActual;
  }
  if (producto.stock >= cantidadTotal) {
    return true;
  } else {
    let mensaje=`El producto cuenta con ${producto.stock} existencias`;
    if(productoCarrito){
        mensaje+=` y actualmente tienes ${productoCarrito.cantidad} en el carrito`;
    }
    mostrarMensaje("Error", mensaje, "error");
    return false;
  }
}

function insertarProducto(id_producto) {
    console.log("El arreglo de productos carrito detalle es ", carritoDetalle);

  let cantidad = parseInt(
    document.getElementById(`valor${id_producto}`).value,
    10
  );
  if (validarStockProducto(id_producto, cantidad)) {
    let producto = obtenerProducto(id_producto);
    let importe = Math.round(producto.precio * cantidad*100)/100;
    let objProducto = {
      id:producto.id,
      id_producto: id_producto,
      nombre: producto.nombre,
      imagen: producto.imagen,
      precio: producto.precio,
      cantidad: cantidad,
      stock:producto.stock,
      importe: importe,
    };
    let productoCarrito = buscarProductoCarrito(id_producto);

    if (productoCarrito) {
      productoCarrito.cantidad += cantidad;
      productoCarrito.importe += importe;
    } else {
      carritoDetalle.push(objProducto);
    }
    calculosCarrito();
    guardarLocalStorage(claveCarritoDetalle, carritoDetalle);
    guardarLocalStorage(claveCarrito, carrito);
    mostrarMensaje("Producto agregado", "El producto se agrego al carrito", "success");
  }
}

function guardarLocalStorage(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
}

function cargarLocalStorage(clave) {
  let objeto = localStorage.getItem(clave);
  if (objeto) {
    let item = JSON.parse(objeto);
    return item;
  }
}

function cargarCarrito(){
    let objCarrito=cargarLocalStorage(claveCarrito);
    let objCarritoDetalle=cargarLocalStorage(claveCarritoDetalle);
    if(objCarrito && objCarritoDetalle){
        carrito=objCarrito;
        carritoDetalle=objCarritoDetalle;
    }
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

function mostrarMensaje(titulo, mensaje, icono) {
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: icono
      });
}

document.addEventListener("DOMContentLoaded", function () {
  obtenerDatos().then(() => {
    cargarProductosHtml();
    console.log("El arreglo de productos es ", productos);


  });
 
});


