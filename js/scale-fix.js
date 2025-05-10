/**
 * Dynamic Scaling Fix for RevealJS
 * Ensures content is perfectly scaled to always be visible without zoom
 */

// Wait until everything is fully loaded
window.addEventListener('load', function () {
    // Allow time for RevealJS to initialize
    setTimeout(applyPerfectScaling, 500);

    // Also apply when slides change
    if (typeof Reveal !== 'undefined') {
        Reveal.addEventListener('slidechanged', applyPerfectScaling);
    }

    // Apply when window is resized
    window.addEventListener('resize', function () {
        applyPerfectScaling();
    });
});

// Function to perfectly scale content
function applyPerfectScaling() {
    // Only proceed if Reveal exists
    if (typeof Reveal === 'undefined') return;

    // Get the current slide
    const currentSlide = document.querySelector('.reveal .slides section.present');
    if (!currentSlide) return;

    // Function to check if content overflows
    function checkOverflow(element) {
        const slideWidth = currentSlide.offsetWidth;
        const slideHeight = currentSlide.offsetHeight;

        // Check if any child elements exceed the slide boundaries
        const children = element.querySelectorAll('*');
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const rect = child.getBoundingClientRect();
            const slideRect = currentSlide.getBoundingClientRect();

            // If element goes outside slide boundaries
            if (rect.right > slideRect.right ||
                rect.bottom > slideRect.bottom) {
                return true;
            }
        }

        return false;
    }

    // Apply scaling to the container directly if needed
    function scaleContainer() {
        // Get current font size
        let currentSize = parseInt(window.getComputedStyle(currentSlide).fontSize);

        // If no size detected, use a default
        if (!currentSize) currentSize = 16;

        // Check if content overflows
        if (checkOverflow(currentSlide)) {
            // Reduce font size until content fits
            let newSize = currentSize;
            const minSize = 8; // Don't go below this font size

            // Try progressively smaller sizes until content fits or we reach minimum
            while (checkOverflow(currentSlide) && newSize > minSize) {
                newSize = newSize - 1;
                currentSlide.style.fontSize = newSize + 'px';
            }
        }

        // Special handling for containers to ensure they're always horizontal
        const containers = currentSlide.querySelectorAll('.container, .example-container');
        containers.forEach(container => {
            container.style.display = 'flex';
            container.style.flexDirection = 'row';
            container.style.flexWrap = 'nowrap';

            const columns = container.querySelectorAll('.column, .example');
            columns.forEach(column => {
                column.style.width = '48%';
                column.style.flex = '0 0 48%';
            });
        });

        // Special handling for the title slide
        if (currentSlide.classList.contains('title-gradient')) {
            const titleContent = currentSlide.querySelector('div');
            if (titleContent) {
                titleContent.style.width = '90%';
                titleContent.style.maxWidth = '90%';
            }
        }

        // Make buttons more compact if needed
        const buttons = currentSlide.querySelectorAll('.button');
        if (checkOverflow(currentSlide) && buttons.length > 0) {
            buttons.forEach(button => {
                button.style.padding = '0.3em 0.6em';
                button.style.margin = '0.2em';
                button.style.fontSize = '0.85em';
            });
        }

        // Reduce spacing in lists if needed
        const lists = currentSlide.querySelectorAll('ul, ol');
        if (checkOverflow(currentSlide) && lists.length > 0) {
            lists.forEach(list => {
                list.style.margin = '0.2em 0';
                list.style.paddingLeft = '1em';

                const items = list.querySelectorAll('li');
                items.forEach(item => {
                    item.style.marginBottom = '0.1em';
                    item.style.lineHeight = '1.2';
                });
            });
        }

        // Scale down SVGs if needed
        const svgs = currentSlide.querySelectorAll('svg');
        if (checkOverflow(currentSlide) && svgs.length > 0) {
            svgs.forEach(svg => {
                svg.style.maxHeight = '2em';
                svg.style.maxWidth = '100%';
            });
        }

        // Force Reveal to update layout
        if (typeof Reveal.layout === 'function') {
            Reveal.layout();
        }
    }

    // Apply the scaling
    scaleContainer();
}