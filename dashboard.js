// dashboard.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ----- Firebase config -----
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_PROJECT.firebaseapp.com",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  storageBucket: "YOUR_FIREBASE_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
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