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
        document.querySelector('.logo img').src = 'assets/logo-black.png';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.transform = 'translateY(0)';
        document.querySelector('.logo img').src = 'assets/logo-white.png';
    }
    
    lastScroll = currentScroll;
});

// Services Slider
const services = [
    {
        title: "Growing Spaces, Sorted",
        description: "As kids grow, so do their needs. Whether transitioning from a nursery to a toddler's room, upgrading for a grade schooler, or adapting a space for a tween or teen, we help redesign and reorganize their environment to reflect evolving personalities, interests, and routines. From creating age-appropriate storage to refreshing layouts, Sort it Out brings function and personality together in spaces that grow with your child.",
        beforeImage: "assets/kids-after.png",
        afterImage: "assets/kids-before.png"
    },
    {
        title: "Sorted & School Ready",
        description: "Ease the shift from summer break to school days by giving your child's space a fresh start for the semester. Whether it's refreshing a bedroom that's become cluttered over the summer or setting up a distraction-free homework zone, Sort it Out can help create a calm, organized environment that supports learning, productivity, and daily routines. Dorm room prep is also available for college-bound students, helping your grad start their next chapter feeling settled, confident, and ready to thrive.",
        beforeImage: "assets/school-after.png",
        afterImage: "assets/school-before.png"
    },
    {
        title: "Senior Support & Sort",
        description: "Supporting older adults through life changes requires both care and clarity. Whether downsizing, relocating to be closer to family, or transitioning to assisted living, Sort it Out offers respectful, compassionate help in sorting through years of belongings. We assist in identifying what to keep, donate, or pass on—helping preserve cherished memories while making the transition smoother and less stressful.",
        beforeImage: "assets/senior-after.png",
        afterImage: "assets/senior-before.png"
    },
    {
        title: "Seasonal Sort & Store",
        description: "Whether it's ornaments, garlands, or other festive touches around your home, your decorations will be carefully sorted, organized, and packed away using either existing containers or introducing new, efficient labeled storage to keep everything neat, protected, and ready for the next season.",
        beforeImage: "assets/seasonal-after.png",
        afterImage: "assets/seasonal-before.png"
    },
    {
        title: "Tidy Pantries to Sorted Fridges",
        description: "Struggling to put away the weekly shop? Tired of finding forgotten, wasted food? We'll help you transform your kitchen storage into a space that works for you and your family. By reorganizing pantry shelves and fridge storage, we create a kitchen that's fresh, functional, and effortlessly organized.",
        beforeImage: "assets/fridge-after.png",
        afterImage: "assets/fridge-before.png"
    },
    {
        title: "Closet Sort & Store",
        description: "Closets of all kinds tend to accumulate more than they should, from daily necessities to forgotten items and sentimental keepsakes. Whether you're organizing a chaotic hallway closet, updating a medicine cabinet, or sorting out an entire wardrobe, Sort it Out can help edit, sort, and provide solutions that are practical, aesthetically pleasing, and easy to maintain for all your closet needs, making everyday essentials easy to access whilst keeping treasured memories and keepsakes thoughtfully stored.",
        beforeImage: "assets/closets-after.png",
        afterImage: "assets/closets-before.png"
    },
    {
        title: "Move Smart, Sort First",
        description: "Preparing for a home move can feel like a huge task, but our pre-packing service is designed to ease the process. We help you sort and pack only what you truly need or use. From decluttering areas and closets to organizing what goes with you, we'll help lighten the load and bring order to your move. As moving day approaches, you'll be decluttered, organized, and truly ready to pack.",
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
}

function nextSlide() {
    const next = (currentSlide + 1) % services.length;
    goToSlide(next);
}

function prevSlide() {
    const prev = (currentSlide - 1 + services.length) % services.length;
    goToSlide(prev);
}

// Add click event listeners for next/prev buttons
document.querySelector('.next-slide').addEventListener('click', nextSlide);
document.querySelector('.prev-slide').addEventListener('click', prevSlide);

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

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      const submitBtn = contactForm.querySelector('.submit-btn');
      // Wait a short moment to allow FormSubmit to process, then update button
      setTimeout(() => {
        submitBtn.textContent = 'Thank you for submitting';
        submitBtn.disabled = true;
      }, 100);
    });
  }
}); 