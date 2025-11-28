// Function to adjust animation speed of tech icons background
function setTechIconsSpeed(speedFactor)
{
    // speedFactor: 1 = normal speed, 0.5 = half speed, 2 = double speed
    setBackgroundSpeed(speedFactor);
}

// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', function ()
{
    // Initialize dark mode
    initDarkMode();

    // Create and manage tech icons background
    initTechIconsBackground();

    // Optional: Set speed to 1 (normal) by default
    // You can call setTechIconsSpeed(2) to make it twice as fast
    // Or setTechIconsSpeed(0.5) to make it half as fast

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
    progressBars.forEach(bar =>
    {
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
    window.addEventListener('scroll', () =>
    {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() =>
            {
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
        hamburger.addEventListener('click', () =>
        {
            hamburger.classList.toggle('active');
            navList.classList.toggle('active');
        });

        // Close mobile menu when clicking a nav link
        navLinks.forEach(link =>
        {
            link.addEventListener('click', () =>
            {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor =>
    {
        anchor.addEventListener('click', function (e)
        {
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
        backToTop.addEventListener('click', () =>
        {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e)
        {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            const formStatus = document.getElementById('formStatus');

            // Show loading state
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';

            try {
                const formData = new FormData(this);
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    formStatus.innerHTML = '<p class="success-message">Thank you! Your message has been sent successfully.</p>';
                    formStatus.style.color = '#4CAF50';
                    this.reset();
                } else {
                    throw new Error(data.message || 'Something went wrong');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                formStatus.innerHTML = '<p class="error-message">Sorry, there was an error sending your message. Please try emailing me directly at rumiel.florian@gmail.com</p>';
                formStatus.style.color = '#f44336';
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';

                // Clear status message after 5 seconds
                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 5000);
            }
        });
    }

    // Initialize typed.js effect for the subtitle
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement && typeof Typed !== 'undefined') {
        new Typed('.typed-text', {
            strings: [
                'AI Solutions Architect',
                'RAG Systems Expert',
                'Google Vertex AI Specialist',
                'LLM Orchestration Engineer',
                'AWS Bedrock Developer'
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
    function updateActiveNavLink()
    {
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section =>
        {
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
    function animateTimelineItems()
    {
        const timelineItems = document.querySelectorAll('.timeline-item');

        timelineItems.forEach(item =>
        {
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
        const imageObserver = new IntersectionObserver((entries, observer) =>
        {
            entries.forEach(entry =>
            {
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

        lazyImages.forEach(img =>
        {
            imageObserver.observe(img);
        });
    }
});

// Function to initialize tech icons background
function initTechIconsBackground()
{
    const techIconsContainer = document.getElementById('techIconsBackground');
    if (!techIconsContainer) return;

    // Clear any existing items
    techIconsContainer.innerHTML = '';

    // Tech stack icons reference
    const techIcons = [
        { svg: 'github-mark.svg', name: 'Github' },
        { svg: 'flutter.svg', name: 'Flutter' },
        { svg: 'aws.svg', name: 'AWS' },
        { svg: 'postgresql.svg', name: 'Postgres' },
        { svg: 'terraform.svg', name: 'Terraform' },
        { svg: 'python.svg', name: 'Python' },
    ];

    // Configure grid size and spacing
    const rows = 15;
    const cols = 10;

    // Calculate the width of a full grid pattern for proper wrapping
    const horizontalGap = 120; // From createIconGrid function
    const isEvenRowOffset = 0;
    const isOddRowOffset = horizontalGap / 2;

    // Calculate total grid width (last column + oddRowOffset) - this gives us the pattern repeat width
    const patternWidth = (cols * horizontalGap) + isOddRowOffset;

    // Configure the main container as a fixed backdrop
    techIconsContainer.style.position = 'fixed';
    techIconsContainer.style.top = '0';
    techIconsContainer.style.left = '0';
    techIconsContainer.style.width = '100%';
    techIconsContainer.style.height = '100%';
    techIconsContainer.style.overflow = 'hidden';

    // Create a wrapper div that will contain our repeating grid
    const scrollingWrapper = document.createElement('div');
    scrollingWrapper.className = 'scrolling-wrapper';
    scrollingWrapper.style.position = 'absolute';
    scrollingWrapper.style.top = '0';
    scrollingWrapper.style.left = '0';
    // Make it double width to ensure we always have content to show during animation
    scrollingWrapper.style.width = `${patternWidth * 2}px`;
    scrollingWrapper.style.height = '100%';

    // Create two sets of icons with correct positioning
    // First set at position (0,0)
    let iconSet1 = generateGridIcons(techIcons, rows, cols, 0);

    // Second set at position (patternWidth, 0) - exact offset for seamless looping
    let iconSet2 = generateGridIcons(techIcons, rows, cols, patternWidth);

    // Add all icons to the scrolling wrapper
    for (let icon of [...iconSet1, ...iconSet2]) {
        scrollingWrapper.appendChild(icon);
    }

    // Add the scrolling wrapper to the container
    techIconsContainer.appendChild(scrollingWrapper);

    // Set up the animation with the exact pixel width for perfect looping
    const scrollDuration = 120; // 2 minutes for a complete cycle

    // Apply the animation directly to the wrapper for precise control
    scrollingWrapper.style.animationName = 'scrollPattern';
    scrollingWrapper.style.animationDuration = `${scrollDuration}s`;
    scrollingWrapper.style.animationTimingFunction = 'linear';
    scrollingWrapper.style.animationIterationCount = 'infinite';

    // Store the pattern width as a data attribute for the speed control function
    techIconsContainer.dataset.patternWidth = patternWidth;
}

// Function to generate a grid of tech icons and return them as an array
function generateGridIcons(techIcons, rows, cols, xOffset = 0)
{
    let iconIndex = 0;
    const icons = [];

    // Fixed sizes for consistent grid regardless of screen size
    const iconSize = 48; // Size in pixels
    const horizontalGap = 120; // Fixed pixel gap between icons horizontally
    const verticalGap = 120; // Fixed pixel gap between icons vertically

    // For each grid position
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Use icons in sequence, cycling through the array
            const techIcon = techIcons[iconIndex];
            iconIndex = (iconIndex + 1) % techIcons.length; // Cycle through icons

            // Create icon element using SVG
            const iconElement = document.createElement('img');
            iconElement.className = 'tech-icon';
            iconElement.src = `assets/images/tech-icons/${techIcon.svg}`;
            iconElement.alt = techIcon.name;

            // Add title/tooltip
            iconElement.setAttribute('title', techIcon.name);

            // Calculate exact grid position in pixels
            // Add a slight offset to every other row for visual interest
            const isOddRow = row % 2 === 1;
            const rowOffset = isOddRow ? horizontalGap / 2 : 0; // Offset odd rows by half a column
            const x = xOffset + (col * horizontalGap) + rowOffset;
            const y = row * verticalGap;

            // Fixed opacity for clear visibility
            const opacity = 0.2;

            // Apply styles with pixel values instead of percentages
            iconElement.style.position = 'absolute';
            iconElement.style.left = `${x}px`;
            iconElement.style.top = `${y}px`;
            iconElement.style.width = `${iconSize}px`;
            iconElement.style.height = `${iconSize}px`;
            iconElement.style.opacity = opacity;

            // Add to our collection
            icons.push(iconElement);
        }
    }

    return icons;
}

// Function to adjust animation speed of the infinite scrolling background
function setBackgroundSpeed(speedFactor)
{
    // speedFactor: 1 = normal speed, 0.5 = half speed, 2 = double speed
    const container = document.getElementById('techIconsBackground');
    if (!container) return;

    // Find the scrolling wrapper inside the container
    const wrapper = container.querySelector('.scrolling-wrapper');
    if (!wrapper) return;

    // Base duration is 120 seconds (2 minutes)
    const baseDuration = 120;
    const newDuration = baseDuration / speedFactor;

    // Update the animation duration of the wrapper
    wrapper.style.animationDuration = `${newDuration}s`;
}

// Dark Mode Functionality
function initDarkMode()
{
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Apply the saved theme on page load
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    // Toggle dark mode on button click
    themeToggle.addEventListener('click', () =>
    {
        body.classList.toggle('dark-mode');

        // Update icon
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}