// Toggle hidden content
function toggleLearnMore(event) {
    event.preventDefault();
    let content = document.getElementById("learnMoreContent");
    content.style.display = content.style.display === "block" ? "none" : "block";
}

function toggleReadMore(event) {
    event.preventDefault();
    let content = document.getElementById("ReadMoreContent");
    content.style.display = content.style.display === "block" ? "none" : "block";
}

function toggleMoreDetails(event) {
    event.preventDefault();
    let content = document.getElementById("MoreDetailsContent");
    content.style.display = content.style.display === "block" ? "none" : "block";
}

// Scroll indicator for dots
const slider = document.getElementById('slider');
const dots = document.querySelectorAll('.dot');

slider.addEventListener('scroll', () => {
    let scrollLeft = slider.scrollLeft;
    let width = slider.offsetWidth;
    let index = Math.round(scrollLeft / width);

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
});

