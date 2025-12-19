// admin.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase config (same as donate.js)
const firebaseConfig = {
const firebaseConfig = {
  apiKey: "AIzaSyCPWH5BCSFp3Qqs_-JVfqDkUCEfhyg4VX4",
  authDomain: "kfgc-media-app.firebaseapp.com",
  projectId: "kfgc-media-app",
  storageBucket: "kfgc-media-app.firebasestorage.app",
  messagingSenderId: "203397572574",
  appId: "1:203397572574:web:db903da199482fd6cedf4f"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM elements
const loginForm = document.getElementById("adminLoginForm");
const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Login successful — redirect to dashboard
    window.location.href = "dashboard.html";
  } catch (error) {
    loginError.textContent = "Invalid email or password.";
  }
});
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth();
onAuthStateChanged(auth, user => {
  if (!user) {
    // Not logged in, redirect to login page
    window.location.href = "admin-login.html";
  }
});
