document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 1;
    const totalSlides = 5;
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const radioButtons = document.querySelectorAll('.slider-nav label');
    
    function showSlide(index) {
        sliderWrapper.style.transform = `translateX(calc(-100% * ${index - 1}))`;
        updateActiveRadioButton(index);
    }

    function nextSlide() {
        currentSlide = (currentSlide % totalSlides) + 1;
        showSlide(currentSlide);
    }

    // Auto-slide every 5 seconds
    const slideInterval = setInterval(nextSlide, 5000);

    // Handle radio button navigation
    radioButtons.forEach((label, index) => {
        label.addEventListener('click', () => {
            currentSlide = index + 1;
            showSlide(currentSlide);
            clearInterval(slideInterval); // Stop auto-sliding when user interacts
        });
    });

    function updateActiveRadioButton(index) {
        radioButtons.forEach((label, idx) => {
            label.classList.toggle('active', idx + 1 === index);
        });
    }

    // Initialize active radio button
    updateActiveRadioButton(currentSlide);

    /*** Mobile Navigation Menu ***/
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    function toggleMenu() {
        navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    }

    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            toggleMenu();
        }
    });

    /*** Back to Top Button ***/
    let backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    backToTopButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});
