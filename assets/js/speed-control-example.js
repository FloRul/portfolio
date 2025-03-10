/**
 * Example of how to control the tech icons animation speed
 * 
 * You can add this to your main.js or create event listeners for UI controls
 */

// Example 1: Adjust speed based on user preference (e.g., from a slider)
function setupSpeedControl()
{
    // This could be connected to a UI slider or buttons
    const slowButton = document.getElementById('slow-speed');
    const normalButton = document.getElementById('normal-speed');
    const fastButton = document.getElementById('fast-speed');

    if (slowButton) {
        slowButton.addEventListener('click', () => setTechIconsSpeed(0.5));
    }

    if (normalButton) {
        normalButton.addEventListener('click', () => setTechIconsSpeed(1));
    }

    if (fastButton) {
        fastButton.addEventListener('click', () => setTechIconsSpeed(2));
    }
}

// Example 2: Adjust speed programmatically when needed
function adjustSpeedForSection(section)
{
    if (section === 'hero') {
        // Slower in hero section for subtle effect
        setTechIconsSpeed(0.5);
    } else if (section === 'skills') {
        // Faster in skills section for more energy
        setTechIconsSpeed(1.5);
    } else {
        // Normal speed elsewhere
        setTechIconsSpeed(1);
    }
}

// Example 3: Adjust based on scroll position
function setupScrollBasedSpeed()
{
    window.addEventListener('scroll', () =>
    {
        const scrollPosition = window.scrollY;
        const documentHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercentage = scrollPosition / documentHeight;

        // Speed increases as user scrolls down (between 0.5x and 2x)
        const newSpeed = 1.5 + (scrollPercentage * 1.5);
        setTechIconsSpeed(newSpeed);
    });
}

/**
 * Usage:
 * 
 * 1. To set a fixed speed, just call:
 *    setTechIconsSpeed(1.5);  // 1.5x normal speed
 * 
 * 2. For UI controls, call setupSpeedControl() after the DOM is loaded
 * 
 * 3. For section-based speed, call adjustSpeedForSection() when section changes
 * 
 * 4. For scroll-based speed, call setupScrollBasedSpeed() after DOM is loaded
 */