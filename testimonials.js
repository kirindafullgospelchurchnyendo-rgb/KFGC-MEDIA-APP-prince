// ================================
// Cloudinary Config
// ================================
const CLOUD_NAME = "dvnyyq3ru";
const UPLOAD_PRESET = "xdapq0dq";

// Google Apps Script Web App URL
const API_URL = "https://script.google.com/macros/s/AKfycbxlPtJuzw6bjTpN8iyh1r1t8dB5gWVJ7uwj7ppCb_i5Y3Z6mRRXhITZdVqdOOaRHVJG/exec";

// ================================
// Elements
// ================================
const form = document.getElementById("testimonial-form");
const container = document.getElementById("testimonial-cards");

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
    // ================================
    // Upload image to Cloudinary
    // ================================
    if (imageFile) {
      const fd = new FormData();
      fd.append("file", imageFile);
      fd.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: fd }
      );

      const img = await res.json();

      if (!img.secure_url) {
        throw new Error("Image upload failed");
      }

      imageURL = img.secure_url;
    }

    // ================================
    // Save testimony to Google Sheets
    // ================================
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        message: message,
        imageURL: imageURL
      })
    });

    alert("🙏 Testimony submitted successfully");
    form.reset();
    loadTestimonials();

  } catch (err) {
    console.error(err);
    alert("❌ Failed to submit testimony");
  }
});

// ================================
// Load Testimonials
// ================================
async function loadTestimonials() {
  container.innerHTML = "<p>Loading testimonies...</p>";

  const res = await fetch(API_URL);
  const data = await res.json();

  if (!data || !data.length) {
    container.innerHTML = "<p>No testimonies yet. Be the first 🙏</p>";
    return;
  }

  container.innerHTML = "";

  data.reverse().forEach(t => {
    const imgSrc = t.imageURL && t.imageURL.trim()
      ? t.imageURL
      : "default-user.png";

    container.innerHTML += `
      <div class="col-md-4">
        <div class="testimonial-card">
          <div class="testimonial-header">
            <img src="${imgSrc}" alt="${t.name}">
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
}

// Load on page start
loadTestimonials();

