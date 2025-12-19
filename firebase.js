import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
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
</script>
