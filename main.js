
// Importar las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyCOfqLPDoHCP1E6ShROX7YYteBmn3NYB6M",
  authDomain: "zelda-breath-of-the-wild-page.firebaseapp.com",
  projectId: "zelda-breath-of-the-wild-page",
  storageBucket: "zelda-breath-of-the-wild-page.appspot.com",
  messagingSenderId: "953911522581",
  appId: "1:953911522581:web:8d8ca0eb364d3febdd251c",
};
// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('[data-collapse-toggle="navbar-default"]');
    const navbarMenu = document.getElementById('navbar-default');
  
    toggleButton.addEventListener('click', function () {
      navbarMenu.classList.toggle('hidden');
    });
  });


  cerrar.addEventListener('click', function () {
    signOut(auth).then(() => {
      mostrarMensaje("Sesión cerrada", "¡Hasta luego!", "success");
    }).catch((error) => {
      mostrarMensaje("Error al cerrar sesión", error.message, "error");
    });
  });

onAuthStateChanged(auth, (user) => {
  let sesion = document.getElementById("sesion");
  let cerrar = document.getElementById("cerrar");
  if (user) {
   sesion.classList.add("hidden");
   cerrar.classList.remove("hidden");
  } else {
    sesion.classList.remove("hidden");
    cerrar.classList.add("hidden");

  }
});



function mostrarMensaje(titulo, mensaje, icono) {
  Swal.fire({
    title: titulo,
    text: mensaje,
    icon: icono,
  });
}

