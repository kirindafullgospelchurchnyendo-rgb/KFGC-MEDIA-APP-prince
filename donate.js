// ===========================
// KFGC Media App — donate.js
// Handles: donations, theme, payment selection, recent donations
// ===========================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ------------------- Firebase Init -------------------
const firebaseConfig = {
  apiKey: "AIzaSyCPWH5BCSFp3Qqs_-JVfqDkUCEfhyg4VX4",
  authDomain: "kfgc-media-app.firebaseapp.com",
  projectId: "kfgc-media-app",
  storageBucket: "kfgc-media-app.firebasestorage.app",
  messagingSenderId: "203397572574",
  appId: "1:203397572574:web:db903da199482fd6cedf4f"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ------------------- Apply Stored Theme -------------------
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('kfgcTheme');
  if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

  // Optional: donate page theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('kfgcTheme', newTheme);
    });
  }
});

// ------------------- Payment Card Selection -------------------
const paymentCards = document.querySelectorAll('.payment-card');
paymentCards.forEach(card => {
  card.addEventListener('click', () => {
    paymentCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    const radio = card.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
  });
});

// ------------------- Donation Form Submission -------------------
const donationForm = document.getElementById('donation-form');

donationForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = donationForm.name.value;
  const email = donationForm.email.value;
  const donationType = donationForm['donation-type'].value;
  const amount = parseFloat(donationForm.amount.value);
  const paymentMethod = donationForm.querySelector('input[name="payment-method"]:checked')?.value;

  if (!paymentMethod) {
    alert("Please select a payment method.");
    return;
  }

  // Save donation in Firebase
  try {
    await addDoc(collection(db, "donations"), {
      name,
      email,
      donationType,
      amount,
      paymentMethod,
      timestamp: serverTimestamp()
    });
  } catch (err) {
    console.error("Error saving donation:", err);
  }

  // Flutterwave payment (example)
  if (paymentMethod === "momo" || paymentMethod === "card") {
    FlutterwaveCheckout({
      public_key: "YOUR_FLUTTERWAVE_PUBLIC_KEY",
      tx_ref: `KFGC-${Date.now()}`,
      amount: amount,
      currency: "UGX",
      payment_options: paymentMethod === "momo" ? "mobilemoneyuganda" : "card",
      customer: { email, name },
      callback: (data) => {
        alert(`Payment successful. Ref: ${data.transaction_id}`);
      },
      onclose: () => { console.log("Payment closed"); }
    });
  } else if (paymentMethod === "paypal") {
    alert("PayPal payment selected. Implement PayPal flow here.");
  }

  donationForm.reset();
  paymentCards.forEach(c => c.classList.remove('selected'));
});

// ------------------- Real-time Recent Donations -------------------
const recentDonationsList = document.querySelector('#recent-donations ul');

const donationsQuery = query(collection(db, "donations"), orderBy("timestamp", "desc"));

onSnapshot(donationsQuery, snapshot => {
  recentDonationsList.innerHTML = "";
  snapshot.forEach(doc => {
    const data = doc.data();
    const li = document.createElement('li');
    li.innerHTML = `<strong>${data.name || "Anonymous"}</strong> — UGX ${Number(data.amount).toLocaleString()}`;
    recentDonationsList.appendChild(li);
  });
});
