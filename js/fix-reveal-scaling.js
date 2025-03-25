/**
 * Fix scaling issues in RevealJS
 * This script applies runtime fixes to ensure presentation fits perfectly in the viewport
 */

// Function to ensure proper scaling after Reveal is initialized
function fixRevealScaling() {
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
            section.style.padding = '2vw';
            section.style.boxSizing = 'border-box';
            section.style.width = '100%';
            section.style.height = '100%';
            section.style.maxHeight = '100%';
            section.style.overflow = 'hidden';
        });

        // Apply specific fixes to components - maintain horizontal layout
        const containers = document.querySelectorAll('.container');
        containers.forEach(container => {
            container.style.display = 'flex';
            container.style.flexDirection = 'row';
            container.style.flexWrap = 'nowrap';
            container.style.width = '100%';

            // Ensure children have proper sizing - always horizontal
            const columns = container.querySelectorAll('.column');
            columns.forEach(column => {
                column.style.width = '48%';
                column.style.minWidth = '45%';
                column.style.marginBottom = '0';

                // Adjust font size on smaller screens but keep horizontal layout
                if (window.innerWidth < 700) {
                    column.style.fontSize = '0.85em';
                }
            });
        });

        // Fix example containers - always horizontal
        const exampleContainers = document.querySelectorAll('.example-container');
        exampleContainers.forEach(container => {
            container.style.display = 'flex';
            container.style.flexDirection = 'row';
            container.style.flexWrap = 'nowrap';
            container.style.width = '100%';

            const examples = container.querySelectorAll('.example');
            examples.forEach(example => {
                example.style.width = '48%';
                example.style.minWidth = '45%';
                example.style.marginBottom = '0';

                // Adjust font size on smaller screens but keep horizontal layout
                if (window.innerWidth < 700) {
                    example.style.fontSize = '0.85em';
                }
            });
        });

        // Fix highlight boxes
        const highlightBoxes = document.querySelectorAll('.highlight-box');
        highlightBoxes.forEach(box => {
            box.style.width = '100%';
            box.style.boxSizing = 'border-box';
        });

        // Scale text in icon grids
        const iconItems = document.querySelectorAll('.icon-item');
        iconItems.forEach(item => {
            const text = item.querySelector('p');
            if (text) {
                text.style.fontSize = window.innerWidth < 800 ? '0.8em' : '0.9em';
            }
        });

        // Make sure SVGs scale properly
        const svgs = document.querySelectorAll('svg');
        svgs.forEach(svg => {
            svg.style.maxWidth = '100%';
            svg.style.height = 'auto';
        });

        // Fix buttons
        const buttons = document.querySelectorAll('.button');
        buttons.forEach(button => {
            button.style.fontSize = window.innerWidth < 800 ? '0.8em' : '0.9em';
        });

        // Fix tables
        const tables = document.querySelectorAll('table');
        tables.forEach(table => {
            table.style.width = '100%';
            table.style.fontSize = window.innerWidth < 800 ? '0.8em' : '0.9em';
        });

        // Fix pre and code blocks
        const preBlocks = document.querySelectorAll('pre');
        preBlocks.forEach(pre => {
            pre.style.maxWidth = '100%';
            pre.style.overflow = 'auto';
            pre.style.fontSize = window.innerWidth < 800 ? '0.7em' : '0.8em';
        });

        // Force Reveal to update its layout
        if (typeof Reveal.layout === 'function') {
            Reveal.layout();
        }
    }
}

// Ensure the fix runs at the right time
document.addEventListener('DOMContentLoaded', function () {
    // Check if Reveal is available
    if (typeof Reveal !== 'undefined') {
        // Add a listener for when Reveal is ready
        Reveal.addEventListener('ready', function () {
            // Apply fixes
            fixRevealScaling();

            // Also apply when changing slides
            Reveal.addEventListener('slidechanged', fixRevealScaling);
        });
    }

    // Run the fix after slight delays to ensure everything's loaded
    setTimeout(fixRevealScaling, 500);
    setTimeout(fixRevealScaling, 1000);
});

// Apply fixes when the window is resized
window.addEventListener('resize', function () {
    fixRevealScaling();
    // Apply again after a slight delay to handle any transition effects
    setTimeout(fixRevealScaling, 100);
});