// Importar las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
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
//region funciones

registro.addEventListener("click", register);
login.addEventListener("click", login);

async function register() {
  let email = document.getElementById("email").value; 
  let password = document.getElementById("password").value; 
  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Usuario registrado:", userCredential.user);
  } catch (error) {
    console.error("Error en el registro:", error.message);
  }
}

async function login() {
  let email = document.getElementById("email").value; 
  let password = document.getElementById("password").value; 
  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    console.log("Usuario conectado:", userCredential.user);
  } catch (error) {
    console.error("Error en el inicio de sesión:", error.message);
  }
}
