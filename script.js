// Navigation
const navbar = document.querySelector('.navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

// Mobile menu toggle with premium animation
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (mobileMenuBtn.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Navbar scroll effect with smooth transition
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
        if (currentScroll > lastScroll) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Services Slider
const services = [
    {
        title: "Closet Sort & Store",
        description: "This is a service that declutters and organizes any closet—creating practical systems that make daily essentials easy to reach while keeping sentimental items neatly and respectfully stored.",
        beforeImage: "assets/closets-after.png",
        afterImage: "assets/closets-before.png"
    },
    {
        title: "Tidy Pantries to Sorted Fridges",
        description: "Transform messy pantries and fridges into organized, efficient spaces—improving visibility, reducing waste, and making food storage effortless.",
        beforeImage: "assets/fridge-after.png",
        afterImage: "assets/fridge-before.png"
    },
    {
        title: "Growing Spaces, Sorted",
        description: "Sort It Out redesigns and reorganizes kids' spaces to grow with them—blending function, personality, and age-appropriate solutions from nursery to teen.",
        beforeImage: "assets/kids-after.png",
        afterImage: "assets/kids-before.png"
    },
    {
        title: "Sorted & School Ready",
        description: "Preps bedrooms, study zones, and dorms for a smooth, focused start to the school year.",
        beforeImage: "assets/school-after.png",
        afterImage: "assets/school-before.png"
    },
    {
        title: "Senior Support & Sort",
        description: "Helps older adults downsize and organize with care, making life transitions smoother and more supportive.",
        beforeImage: "assets/senior-after.png",
        afterImage: "assets/senior-before.png"
    },
    {
        title: "Seasonal Sort & Store",
        description: "Takes care of packing away holiday décor—working with existing storage or providing practical, easy-to-use options that make unpacking next season a breeze.",
        beforeImage: "assets/seasonal-after.png",
        afterImage: "assets/seasonal-before.png"
    },
    {
        title: "Move Smart, Sort First",
        description: "Helps declutter and organize before packing—so you move only what matters, lighten the load, and start fresh in your new space.",
        beforeImage: "assets/moving-after.png",
        afterImage: "assets/moving-before.png"
    }
];

let currentSlide = 0;
let slideInterval;
const sliderContainer = document.querySelector('.slider-container');
const indicatorsContainer = document.querySelector('.slide-indicators');

// Initialize slider
function initSlider() {
    // Create slides
    services.forEach((service, index) => {
        const slide = document.createElement('div');
        slide.className = `service-slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `
            <div class="service-content">
                <div class="service-images">
                    <div class="before-after">
                        <img src="${service.afterImage}" alt="After" class="after">
                        <img src="${service.beforeImage}" alt="Before" class="before">
                        <div class="slider-handle"></div>
                    </div>
                </div>
                <div class="service-info">
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                    <a href="#contact" class="book-now">Book Now</a>
                </div>
            </div>
        `;
        sliderContainer.appendChild(slide);
        
        // Create indicator
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
    
    // Initialize before/after sliders
    initBeforeAfterSliders();
    
    // Start auto-advance
    startSlideInterval();
}

// Before/After Slider functionality
function initBeforeAfterSliders() {
    const beforeAfterSliders = document.querySelectorAll('.before-after');
    
    beforeAfterSliders.forEach(slider => {
        const handle = slider.querySelector('.slider-handle');
        const before = slider.querySelector('.before');
        let isDragging = false;
        
        // Set initial position to 25%
        function setInitialPosition() {
            const initial = 0.25;
            before.style.clipPath = `polygon(0 0, ${initial * 100}% 0, ${initial * 100}% 100%, 0 100%)`;
            handle.style.left = `${initial * 100}%`;
        }
        setInitialPosition();

        function updateSliderPosition(x) {
            const rect = slider.getBoundingClientRect();
            const position = (x - rect.left) / rect.width;
            const clampedPosition = Math.max(0, Math.min(1, position));
            before.style.clipPath = `polygon(0 0, ${clampedPosition * 100}% 0, ${clampedPosition * 100}% 100%, 0 100%)`;
            handle.style.left = `${clampedPosition * 100}%`;
        }
        
        handle.addEventListener('mousedown', () => {
            isDragging = true;
        });
        
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                updateSliderPosition(e.clientX);
            }
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
        
        slider.addEventListener('touchstart', (e) => {
            isDragging = true;
            updateSliderPosition(e.touches[0].clientX);
        });
        
        slider.addEventListener('touchmove', (e) => {
            if (isDragging) {
                updateSliderPosition(e.touches[0].clientX);
            }
        });
        
        slider.addEventListener('touchend', () => {
            isDragging = false;
        });
    });
}

// Slide navigation
function goToSlide(index) {
    const slides = document.querySelectorAll('.service-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
    
    // Reset auto-advance
    resetSlideInterval();
}

function nextSlide() {
    const next = (currentSlide + 1) % services.length;
    goToSlide(next);
}

function prevSlide() {
    const prev = (currentSlide - 1 + services.length) % services.length;
    goToSlide(prev);
}

// Auto-advance functionality
function startSlideInterval() {
    slideInterval = setInterval(nextSlide, 6000);
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideInterval();
}

// Pause auto-advance on hover
sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

sliderContainer.addEventListener('mouseleave', () => {
    startSlideInterval();
});

// Navigation buttons
document.querySelector('.next-slide').addEventListener('click', () => {
    nextSlide();
});

document.querySelector('.prev-slide').addEventListener('click', () => {
    prevSlide();
});

// Initialize slider
initSlider();

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Update active navigation item
            const id = entry.target.getAttribute('id');
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${id}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
});

// Form handling with premium validation
const contactForm = document.getElementById('contact-form');
const formGroups = document.querySelectorAll('.form-group');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Premium form validation
    let isValid = true;
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        if (!input.value.trim()) {
            isValid = false;
            group.classList.add('error');
            label.style.color = '#ff4444';
        } else {
            group.classList.remove('error');
            label.style.color = '';
        }
    });

    if (isValid) {
        // Show success message with premium animation
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <svg class="checkmark" viewBox="0 0 52 52">
                <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
            <p>Thank you for your message! We'll get back to you soon.</p>
        `;
        contactForm.appendChild(successMessage);

        // Reset form
        contactForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.style.opacity = '0';
            setTimeout(() => {
                successMessage.remove();
            }, 500);
        }, 5000);
    }
});

// Add placeholder to form inputs for floating label effect
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.setAttribute('placeholder', ' ');
});

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Optimize scroll performance
window.addEventListener('scroll', throttle(() => {
    // Your scroll handling code here
}, 100));

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// Auto-expand textarea for message field
const messageTextarea = document.getElementById('message');
if (messageTextarea) {
  messageTextarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });
} 