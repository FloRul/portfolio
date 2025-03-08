// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease',
            once: true,
            offset: 100
        });
    } else {
        console.warn('AOS library not loaded');
    }

    // Update progress bars with dynamic widths for animation
    const progressBars = document.querySelectorAll('.skill-progress .progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.setProperty('--width', width);
        bar.style.width = '0';
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    
    // Throttle scroll event for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                // Header background change on scroll
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                // Back to top button visibility
                if (backToTop) {
                    if (window.scrollY > 300) {
                        backToTop.classList.add('active');
                    } else {
                        backToTop.classList.remove('active');
                    }
                }
                
                // Highlight active nav link based on scroll position
                updateActiveNavLink();
                
                // Animate timeline items when they come into view
                animateTimelineItems();
                
                scrollTimeout = null;
            }, 50);
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    if (hamburger && navList) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navList.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button functionality
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const subject = this.querySelector('#subject').value;
            const message = this.querySelector('#message').value;
            
            // For demo purposes, log the data
            console.log('Form submitted:', { name, email, subject, message });
            
            // Reset the form
            this.reset();
            
            // Show success message
            alert('Thank you for your message! I\'ll get back to you soon.');
        });
    }
    
    // Initialize typed.js effect for the subtitle
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement && typeof Typed !== 'undefined') {
        new Typed('.typed-text', {
            strings: [
                'Cloud Architect', 
                'AI Orchestration Specialist',
                'AWS & Terraform Expert',
                'LLM Technologies Enthusiast'
            ],
            typeSpeed: 70,
            backSpeed: 40,
            backDelay: 2000,
            loop: true
        });
    } else if (typedTextElement) {
        console.warn('Typed.js library not loaded');
    }
    
    // Function to update active nav link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionId = section.getAttribute('id');
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            } else {
                const inactiveLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (inactiveLink) {
                    inactiveLink.classList.remove('active');
                }
            }
        });
    }
    
    // Function to animate timeline items when scrolled into view
    function animateTimelineItems() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight - 100) {
                item.classList.add('active');
            }
        });
    }
    
    // Trigger initial animations
    updateActiveNavLink();
    animateTimelineItems();
    
    // Lazy load images for better performance
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window && lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('loading');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});