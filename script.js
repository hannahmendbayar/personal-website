let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a [href* =' + id + ' ]').classList.add('active');
            })
        }
    })
}
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const carouselInner = document.querySelector('.carousel-inner');
const projectCards = document.querySelectorAll('.carousel-inner .project-card');
const dotsContainer = document.createElement('div');

dotsContainer.className = 'carousel-dots';
document.querySelector('.projects').appendChild(dotsContainer);

let currentIndex = 0;
const itemsPerView = 3;
let autoSlideInterval;

// Clone the first and last set of project cards to create the infinite loop effect
for (let i = 0; i < itemsPerView; i++) {
    const firstClone = projectCards[i].cloneNode(true);
    const lastClone = projectCards[projectCards.length - 1 - i].cloneNode(true);
    carouselInner.appendChild(firstClone);
    carouselInner.insertBefore(lastClone, carouselInner.firstChild);
}

// Create dots for each slide
const totalSlides = projectCards.length;
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('button');
    dot.dataset.index = i;
    dot.addEventListener('click', () => {
        stopAutoSlide();
        currentIndex = parseInt(dot.dataset.index);
        updateCarousel();
        startAutoSlide();
    });
    dotsContainer.appendChild(dot);
}
const dots = dotsContainer.querySelectorAll('button');

currentIndex = itemsPerView;
carouselInner.style.transform = `translateX(-${currentIndex * (100 / itemsPerView)}%)`;

function updateCarousel() {
    carouselInner.style.transition = 'transform 0.5s ease-in-out';
    const translateXValue = -currentIndex * (100 / itemsPerView);
    carouselInner.style.transform = `translateX(${translateXValue}%)`;
    
    // Update active dot
    dots.forEach(dot => dot.classList.remove('active'));
    dots[(currentIndex - itemsPerView) % totalSlides].classList.add('active');

    if (currentIndex === 0) {
        setTimeout(() => {
            carouselInner.style.transition = 'none';
            currentIndex = projectCards.length;
            carouselInner.style.transform = `translateX(-${currentIndex * (100 / itemsPerView)}%)`;
        }, 500);
    } else if (currentIndex === projectCards.length + itemsPerView) {
        setTimeout(() => {
            carouselInner.style.transition = 'none';
            currentIndex = itemsPerView;
            carouselInner.style.transform = `translateX(-${currentIndex * (100 / itemsPerView)}%)`;
        }, 500);
    }
}

function nextSlide() {
    currentIndex++;
    updateCarousel();
}

function prevSlide() {
    currentIndex--;
    updateCarousel();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

nextButton.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
});

prevButton.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
});

startAutoSlide();
updateCarousel();
