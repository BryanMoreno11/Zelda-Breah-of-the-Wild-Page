//region atributos
let productos = [
    {
        id: 1,
        nombre: "Link Jinete",
        imagen: "https://zelda.nintendo.com/breath-of-the-wild/assets/img/amiibo/amiibo-link-rider.png",
        precio: 15.99,
        stock: 50
    },
    {
        id: 2,
        nombre: "Zelda",
        imagen: "https://zelda.nintendo.com/breath-of-the-wild/assets/img/amiibo/amiibo-zelda.png",
        precio: 14.99,
        stock: 30
    },
    {
        id: 3,
        nombre: "Link arquero",
        imagen: "https://zelda.nintendo.com/breath-of-the-wild/assets/img/amiibo/amiibo-link-archer.png",
        precio: 16.99,
        stock: 40
    },
    {
        id: 4,
        nombre: "Revali",
        imagen: "https://zelda.nintendo.com/breath-of-the-wild/assets/img/amiibo/amiibo-revali.png",
        precio: 17.99,
        stock: 20
    },
    {
        id: 5,
        nombre: "Mipha",
        imagen: "https://zelda.nintendo.com/breath-of-the-wild/assets/img/amiibo/amiibo-mipha.png",
        precio: 15.49,
        stock: 25
    },
    {
        id: 6,
        nombre: "Urbosa",
        imagen: "https://zelda.nintendo.com/breath-of-the-wild/assets/img/amiibo/amiibo-urbosa.png",
        precio: 18.99,
        stock: 10
    },
    {
        id: 7,
        nombre: "Daruk",
        imagen: "https://zelda.nintendo.com/breath-of-the-wild/assets/img/amiibo/amiibo-daruk.png",
        precio: 16.49,
        stock: 35
    }
];


//region funciones
function cargarProductosHtml(){
    let contenedorProductos = document.getElementById("contenedorProductos");
    productos.forEach(producto => {
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
                <p class="text-center">Precio: ${producto.precio}</p>
                <p class="text-center">Stock: ${producto.stock}</p>
              </div>
             <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
                <div class="flex sm:items-center sm:justify-center w-full">
                    <button onclick="decrementarContador(valor${producto.id})"
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
                        id="valor${producto.id}"
                        oninput="validarNumero(this)"
                       >
                    <button onclick="incrementarContador(valor${producto.id})"
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
                <button
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
   
    let  valor= parseInt(elementoHtml.value,10);
    valor= isNaN(valor) ? 0 : valor;
    valor++;
    elementoHtml.value = valor; 

}

function decrementarContador(elementoHtml) {
   
    let  valor= parseInt(elementoHtml.value,10);
    valor= isNaN(valor) ? 0 : valor;
    if(valor>1){
        valor--;
    }
    elementoHtml.value = valor; 

}

function validarNumero(elementoHtml){
    let valor= elementoHtml.value;
    if(valor==null || isNaN(valor)  || valor<0){
        elementoHtml.value = 1;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    cargarProductosHtml();
});