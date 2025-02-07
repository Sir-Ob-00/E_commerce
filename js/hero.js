
document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 1;
    const totalSlides = 5;
    const sliderWrapper = document.querySelector('.slider-wrapper');

    function showSlide(index) {
        sliderWrapper.style.transform = `translateX(calc(-100% * ${index - 1}))`;
        updateActiveRadioButton(index);
    }

    function nextSlide() {
        currentSlide = (currentSlide % totalSlides) + 1;
        showSlide(currentSlide);
    }

    // Change slides automatically every 5 seconds
    setInterval(nextSlide, 5000);

    // Handle radio button navigation
    document.querySelectorAll('.slider-nav label').forEach((label, index) => {
        label.addEventListener('click', () => {
            currentSlide = index + 1;
            showSlide(currentSlide);
        });
    });

    function updateActiveRadioButton(index) {
        document.querySelectorAll('.slider-nav label').forEach((label, idx) => {
            if (idx + 1 === index) {
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
        });
    }

    // Initial call to update the active radio button on page load
    updateActiveRadioButton(currentSlide);
});

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}


// Get the button
let backToTopButton = document.getElementById("back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
backToTopButton.onclick = function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
