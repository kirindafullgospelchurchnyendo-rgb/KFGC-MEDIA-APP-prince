// admin.js (WORKING VERSION)

// Firebase CDN imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// ✅ YOUR REAL CONFIG (correct)
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

// Form
const form = document.getElementById("adminLoginForm");
const errorBox = document.getElementById("loginError");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("adminEmail").value.trim();
  const password = document.getElementById("adminPassword").value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error(error.code);

    // Friendly errors
    if (error.code === "auth/user-not-found") {
      errorBox.textContent = "Admin account not found.";
    } else if (error.code === "auth/wrong-password") {
      errorBox.textContent = "Wrong password.";
    } else {
      errorBox.textContent = "Login failed. Check details.";
    }
  }
});
