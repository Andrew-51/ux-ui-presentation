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
            
            // Fix for landscape orientation
            if (window.innerWidth > window.innerHeight) {
                document.body.classList.add('landscape-orientation');
                
                // Make example containers horizontal in landscape
                const exampleContainers = document.querySelectorAll('.example-container');
                exampleContainers.forEach(container => {
                    container.style.flexDirection = 'row';
                    container.style.flexWrap = 'nowrap';
                });
            } else {
                document.body.classList.remove('landscape-orientation');
            }
            
            // Fix for very small screens
            if (window.innerWidth <= 480) {
                document.body.classList.add('very-small-screen');
                
                // Reduce padding on small screens
                sections.forEach(section => {
                    section.style.padding = '10px';
                    section.style.paddingBottom = '60px';
                });
            } else {
                document.body.classList.remove('very-small-screen');
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
        
        slide.addEventListener('touchmove', function(e) {
            // If the slide has scrollable content
            if (slide.scrollHeight > slide.clientHeight) {
                // Don't let Reveal.js capture this touch event
                e.stopPropagation();
            }
        }, { passive: true });
        
        // Fix for iOS momentum scrolling
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            slide.style.WebkitOverflowScrolling = 'touch';
            
            // Add extra padding at the bottom for iOS
            slide.style.paddingBottom = '70px';
        }
    });
    
    // Add a helper class to body
    document.body.classList.add('mobile-device');
    
    // Fix for iOS viewport height issues
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        document.documentElement.style.height = '-webkit-fill-available';
        document.body.style.height = '-webkit-fill-available';
    }
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
    
    // Fix on orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(fixRevealScaling, 200);
    });
});