/**
 * Fix scaling issues in RevealJS
 * This script applies runtime fixes to ensure presentation fits perfectly in the viewport
 */

// Function to ensure proper scaling after Reveal is initialized
function fixRevealScaling() {
    try {
        // Get the current scale
        const currentScale = Reveal.getScale();

        // Get the slides container
        const slidesContainer = document.querySelector('.reveal .slides');

        if (slidesContainer) {
            // Fix potential sizing issues
            slidesContainer.style.width = '100%';
            slidesContainer.style.height = '100%';
            slidesContainer.style.maxWidth = 'none';

            // Force all sections to fill the available space
            const sections = document.querySelectorAll('.reveal .slides section');
            sections.forEach(section => {
                section.style.padding = 'clamp(10px, 2vw, 20px)';
                section.style.boxSizing = 'border-box';
                section.style.width = '100%';
                section.style.height = '100%';
                section.style.maxHeight = '100%';
                section.style.overflowY = 'auto'; // Enable vertical scrolling
                section.style.overflowX = 'hidden'; // Prevent horizontal scrolling
                
                // Fix for iOS scrolling
                section.style.webkitOverflowScrolling = 'touch';
                
                // Add bottom padding for better scrolling experience
                section.style.paddingBottom = '50px';
                
                // Ensure content is visible
                const contentElements = section.querySelectorAll('h1, h2, h3, h4, p, ul, .container, .example-container');
                contentElements.forEach(el => {
                    el.style.maxWidth = '100%';
                    if (el.tagName === 'UL' || el.tagName === 'OL') {
                        el.style.paddingLeft = 'clamp(15px, 5vw, 30px)';
                    }
                });
            });
            
            // Fix for mobile devices
            if (isMobileDevice()) {
                enableMobileScrolling();
            }

            // Detect device type and browser
            const isMobile = window.innerWidth <= 480;
            const isTablet = window.innerWidth > 480 && window.innerWidth <= 768;
            const isLandscape = window.innerWidth > window.innerHeight;
            
            // Apply device-specific fixes
            if (isMobile) {
                // Mobile-specific fixes
                document.body.classList.add('mobile-device');
                
                // Make text more readable on small screens
                const allText = document.querySelectorAll('.reveal .slides p, .reveal .slides li');
                allText.forEach(text => {
                    text.style.fontSize = 'clamp(14px, 4vw, 16px)';
                    text.style.lineHeight = '1.4';
                });
                
                // Adjust headings for mobile
                const headings = document.querySelectorAll('.reveal .slides h1, .reveal .slides h2');
                headings.forEach(heading => {
                    heading.style.fontSize = 'clamp(1.5rem, 6vw, 2rem)';
                    heading.style.lineHeight = '1.2';
                });
                
                // Make buttons and interactive elements easier to tap
                const interactiveElements = document.querySelectorAll('.reveal .slides button, .reveal .slides .button, .reveal .slides input[type="checkbox"], .reveal .slides input[type="radio"]');
                interactiveElements.forEach(el => {
                    el.style.minHeight = '44px';
                    el.style.minWidth = '44px';
                });
                
                // Fix example containers on mobile
                const exampleContainers = document.querySelectorAll('.example-container');
                exampleContainers.forEach(container => {
                    container.style.flexDirection = 'column';
                    container.style.gap = '15px';
                    
                    // Make examples full width
                    const examples = container.querySelectorAll('.example');
                    examples.forEach(example => {
                        example.style.width = '100%';
                        example.style.maxWidth = '100%';
                    });
                });
            }
            
            if (isTablet) {
                // Tablet-specific fixes
                document.body.classList.add('tablet-device');
                
                // Adjust container layouts for tablets
                const containers = document.querySelectorAll('.container:not(.responsive-container)');
                containers.forEach(container => {
                    if (isLandscape) {
                        container.style.flexDirection = 'row';
                    } else {
                        container.style.flexDirection = 'column';
                    }
                });
            }
            
            if (isLandscape && (isMobile || isTablet)) {
                // Landscape orientation fixes for mobile/tablet
                document.body.classList.add('landscape-orientation');
                
                // Adjust content for landscape
                const containers = document.querySelectorAll('.reveal .slides .container, .reveal .slides .example-container');
                containers.forEach(container => {
                    if (isMobile) {
                        // For mobile landscape, still use column layout but with smaller text
                        container.style.flexDirection = 'column';
                        
                        // Reduce text size in landscape mode on mobile
                        const textElements = container.querySelectorAll('p, li, h3, h4');
                        textElements.forEach(el => {
                            el.style.fontSize = '0.9em';
                            el.style.marginBottom = '0.5em';
                        });
                    } else {
                        // For tablet landscape, use row layout
                        container.style.flexDirection = 'row';
                        container.style.flexWrap = 'nowrap';
                    }
                });
            }
        }
    } catch (error) {
        console.error('Error in fixRevealScaling:', error);
    }
}

// Add this new function to detect mobile devices
function isMobileDevice() {
    return (window.innerWidth <= 768) || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Add this new function to enable proper mobile scrolling
function enableMobileScrolling() {
    // Get all slides
    const slides = document.querySelectorAll('.reveal .slides section');
    
    slides.forEach(slide => {
        // Make sure slide can scroll
        slide.style.overflowY = 'auto';
        slide.style.webkitOverflowScrolling = 'touch';
        
        // Prevent Reveal.js from capturing touch events that should be used for scrolling
        slide.addEventListener('touchstart', function(e) {
            // If the slide has scrollable content
            if (slide.scrollHeight > slide.clientHeight) {
                // Don't let Reveal.js capture this touch event
                e.stopPropagation();
            }
        }, { passive: true });
        
        // Handle touch move events for scrolling
        slide.addEventListener('touchmove', function(e) {
            // If the slide has scrollable content
            if (slide.scrollHeight > slide.clientHeight) {
                // Don't let Reveal.js capture this touch event
                e.stopPropagation();
            }
        }, { passive: true });
        
        // Fix for nested scrollable containers
        const nestedScrollables = slide.querySelectorAll('.scrollable-container, .code-sample, pre');
        nestedScrollables.forEach(container => {
            container.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });
            container.addEventListener('touchmove', e => e.stopPropagation(), { passive: true });
        });
    });
    
    // Add a helper class to body
    document.body.classList.add('mobile-device');
}

// Call the fix function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initial fix
    setTimeout(fixRevealScaling, 500);
    
    // Fix on slide change
    if (typeof Reveal !== 'undefined') {
        Reveal.addEventListener('slidechanged', fixRevealScaling);
    }
    
    // Fix on window resize
    window.addEventListener('resize', function() {
        setTimeout(fixRevealScaling, 100);
    });
});