// dashboard.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ----- Firebase config -----
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
const db = getFirestore(app);

// DOM elements
const totalAmountEl = document.getElementById("totalAmount");
const totalDonorsEl = document.getElementById("totalDonors");
const lastDonationEl = document.getElementById("lastDonation");
const donationsTable = document.getElementById("donationsTable");

// ----- Real-time listener -----
const donationsCol = collection(db, "donations");
const donationsQuery = query(donationsCol, orderBy("timestamp", "desc"));

onSnapshot(donationsQuery, snapshot => {
  let totalAmount = 0;
  const donorsSet = new Set();
  donationsTable.innerHTML = "";

  snapshot.forEach(doc => {
    const data = doc.data();
    totalAmount += data.amount || 0;
    if (data.name) donorsSet.add(data.name);

    const tr = document.createElement("tr");
    const date = data.timestamp?.toDate?.()?.toLocaleString() || "—";
    tr.innerHTML = `
      <td>${data.name || "Anonymous"}</td>
      <td>${data.email || "—"}</td>
      <td>UGX ${Number(data.amount).toLocaleString()}</td>
      <td>${data.donationType || "—"}</td>
      <td>${date}</td>
    `;
    donationsTable.appendChild(tr);
  });

  // Update stats
  totalAmountEl.textContent = `UGX ${totalAmount.toLocaleString()}`;
  totalDonorsEl.textContent = donorsSet.size;

  // Last donation
  const lastDonationDoc = snapshot.docs[0];
  if (lastDonationDoc) {
    const last = lastDonationDoc.data();
    lastDonationEl.textContent = `${last.name || "Anonymous"} — UGX ${Number(last.amount).toLocaleString()}`;
  } else {
    lastDonationEl.textContent = "—";
  }
});

// Optional: Logout function
function logout() {
  alert("Logout clicked! Implement auth logout here.");
}
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth();
onAuthStateChanged(auth, user => {
  if (!user) {
    // Not logged in → redirect
    window.location.href = "admin-login.html";
  }
});

<script>
  document.getElementById("logoutBtn").addEventListener("click", function () {

    // Optional: clear login/session data
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to donation page
    window.location.href = "donate.html";
  });
</script>
