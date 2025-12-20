// ================================
// Firebase (Firestore only)
// ================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔴 REPLACE WITH YOUR FIREBASE DETAILS
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ================================
// Cloudinary Config (YOUR REAL DATA)
// ================================
const CLOUD_NAME = "dvnyyq3ru";
const UPLOAD_PRESET = "xdapq0dq";

// ================================
// Form Elements
// ================================
const form = document.getElementById("testimonial-form");
const cardsContainer = document.getElementById("testimonial-cards");

const nameInput = document.getElementById("member-name");
const messageInput = document.getElementById("testimonial-message");
const imageInput = document.getElementById("testimonial-image");

// ================================
// Submit Testimonial
// ================================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const message = messageInput.value.trim();
  const imageFile = imageInput.files[0];

  if (!name || !message) {
    alert("Please enter your name and testimony");
    return;
  }

  let imageURL = "";

  try {
    // Upload image to Cloudinary (if provided)
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();
      imageURL = data.secure_url;
    }

    // Save testimony to Firestore
    await addDoc(collection(db, "testimonials"), {
      name: name,
      message: message,
      imageURL: imageURL,
      createdAt: serverTimestamp()
    });

    alert("🙏 Testimony submitted successfully!");
    form.reset();

  } catch (error) {
    console.error(error);
    alert("❌ Failed to submit testimony");
  }
});

// ================================
// Display Testimonials (Live)
// ================================
const q = query(
  collection(db, "testimonials"),
  orderBy("createdAt", "desc")
);

onSnapshot(q, (snapshot) => {
  cardsContainer.innerHTML = "";

  snapshot.forEach((doc) => {
    const t = doc.data();

    cardsContainer.innerHTML += `
      <div class="col-md-4">
        <div class="testimonial-card">
          <div class="testimonial-header">
            <img src="${t.imageURL || 'default-user.png'}" alt="${t.name}">
            <div>
              <h5>${t.name}</h5>
              <p>Church Member</p>
            </div>
          </div>
          <p class="testimonial-message">"${t.message}"</p>
        </div>
      </div>
    `;
  });
});
