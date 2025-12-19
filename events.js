// --- Event Data ---
const events = [
    {title:"Night Prayer 2025-2026", date:"2025-12-31T22:00:00", category:"Prayer", image:"https://images.unsplash.com/photo-1582719478143-39b7a7b4a1b4?auto=format&fit=crop&w=800&q=80"},
    {title:"Sunday Worship Service", date:"2025-12-14T09:00:00", category:"Worship", image:"https://images.unsplash.com/photo-1562072546-d9b6c3ad3848?auto=format&fit=crop&w=800&q=80"},
    {title:"Youth Fellowship", date:"2025-12-12T18:00:00", category:"Youth", image:"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"}
];

// --- Load Event Cards ---
const eventCardsContainer = document.getElementById('eventCards');
function loadEvents(eventList) {
    eventCardsContainer.innerHTML = '';
    eventList.forEach((event, index) => {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.dataset.category = event.category;
        card.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <div class="event-card-content">
                <h3>${event.title}</h3>
                <p>Date: ${new Date(event.date).toLocaleString()}</p>
                <div class="countdown" data-date="${event.date}"></div>
                <div class="tags"><span class="tag ${event.category}">${event.category}</span></div>
                <button class="btn register" data-index="${index}"><i class="fas fa-calendar-check"></i> Register</button>
            </div>
        `;
        eventCardsContainer.appendChild(card);
    });
    startCountdown();
}
loadEvents(events);

// --- Countdown Timer ---
function startCountdown() {
    const countdowns = document.querySelectorAll('.countdown');
    function update() {
        countdowns.forEach(cd => {
            const eventDate = new Date(cd.dataset.date);
            const now = new Date();
            const diff = eventDate - now;
            if(diff > 0) {
                const days = Math.floor(diff / (1000*60*60*24));
                const hours = Math.floor((diff / (1000*60*60)) % 24);
                const minutes = Math.floor((diff / (1000*60)) % 60);
                const seconds = Math.floor((diff / 1000) % 60);
                cd.textContent = `Starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
                if(diff < 3600000) cd.style.color = '#ff3b3b';
            } else cd.textContent = "Event Started!";
        });
    }
    update();
    setInterval(update, 1000);
}

// --- Theme Toggle ---
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => document.body.classList.toggle('dark'));

// --- Search & Filter ---
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
function filterEvents() {
    const searchText = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const filtered = events.filter(event => 
        event.title.toLowerCase().includes(searchText) && 
        (category === 'all' || event.category === category)
    );
    loadEvents(filtered);
}
searchInput.addEventListener('input', filterEvents);
categoryFilter.addEventListener('change', filterEvents);

// --- Sort by Date ---
let sortAsc = true;
const sortBtn = document.getElementById('sortBtn');
sortBtn.addEventListener('click', () => {
    events.sort((a,b) => sortAsc ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date));
    sortAsc = !sortAsc;
    sortBtn.textContent = `Sort by Date ${sortAsc ? '↑' : '↓'}`;
    filterEvents();
});

// --- Registration Modal ---
const modal = document.getElementById('registerModal');
const closeModal = document.getElementById('closeModal');
const submitBtn = document.getElementById('submitRegistration');
document.addEventListener('click', e => {
    if(e.target.classList.contains('register')){
        modal.style.display = 'flex';
        modal.querySelector('h3').textContent = "Register for: " + (e.target.dataset.index !== undefined ? events[e.target.dataset.index].title : "");
    }
});
closeModal.addEventListener('click', () => modal.style.display = 'none');
submitBtn.addEventListener('click', () => {
    alert("Registration Submitted!"); 
    modal.style.display = 'none';
});

// --- FullCalendar Integration ---



document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');

  if (!calendarEl) {
    console.error("Calendar element not found");
    return;
  }

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    height: 'auto',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,listWeek'
    },
    events: []
  });

  calendar.render();
});
