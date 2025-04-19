/**
 * Interactive Elements for UI/UX Presentation
 * Adds interactive features to enhance audience engagement
 */

document.addEventListener('DOMContentLoaded', function () {
    // Wait for RevealJS to be fully initialized
    if (typeof Reveal !== 'undefined') {
        Reveal.addEventListener('ready', function () {
            // Initialize all interactive elements
            //addHighlightableElements();
            //addExpandableExamples();
            addInteractiveButtons();
            addFormInteraction();
            //addColorToggleDemo();
            addDarkModeDemo();
            //addResponsiveDemo();
            addAccessibilityDemo();

            // Add keyboard shortcuts overview
            addKeyboardShortcuts();
        });
    }
});

/**
 * Add the ability to highlight text by clicking on it
 */
function addHighlightableElements() {
    // Find suitable elements for highlighting
    const elements = document.querySelectorAll('.reveal p, .reveal li');

    elements.forEach(element => {
        element.style.cursor = 'pointer';
        element.style.transition = 'background-color 0.3s ease';

        element.addEventListener('click', function (e) {
            // Check if already highlighted
            const isHighlighted = this.classList.contains('highlighted');

            // Remove any existing highlights
            document.querySelectorAll('.highlighted').forEach(el => {
                el.classList.remove('highlighted');
                el.style.backgroundColor = '';
            });

            // Add highlight if not already highlighted
            if (!isHighlighted) {
                this.classList.add('highlighted');
                this.style.backgroundColor = 'rgba(10, 132, 255, 0.1)';
            }

            // Don't interfere with RevealJS navigation
            e.stopPropagation();
        });
    });
}

/**
 * Make examples expandable for closer inspection
 */
function addExpandableExamples() {
    const examples = document.querySelectorAll('.example');

    examples.forEach(example => {
        // Add expand/collapse button
        const expandButton = document.createElement('button');
        expandButton.className = 'expand-button';
        expandButton.style.position = 'absolute';
        expandButton.style.top = '5px';
        expandButton.style.right = '5px';
        expandButton.style.background = 'rgba(0,0,0,0.2)';
        expandButton.style.border = 'none';
        expandButton.style.borderRadius = '4px';
        expandButton.style.width = '20px';
        expandButton.style.height = '20px';
        expandButton.style.fontSize = '14px';
        expandButton.style.lineHeight = '1';
        expandButton.style.color = 'white';
        expandButton.style.cursor = 'pointer';
        expandButton.style.zIndex = '10';
        expandButton.innerHTML = '+';

        // Set relative positioning on the example container
        example.style.position = 'relative';

        // Add the button
        example.appendChild(expandButton);

        // Handle expand/collapse
        let isExpanded = false;

        expandButton.addEventListener('click', function (e) {
            e.stopPropagation();

            if (!isExpanded) {
                // Save the original state
                example.setAttribute('data-original-width', example.style.width);
                example.setAttribute('data-original-position', example.style.position);
                example.setAttribute('data-original-zindex', example.style.zIndex);

                // Expand the example
                example.style.position = 'absolute';
                example.style.width = '80%';
                example.style.height = 'auto';
                example.style.top = '10%';
                example.style.left = '10%';
                example.style.zIndex = '1000';
                example.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';

                // Update button
                expandButton.innerHTML = '−';
                isExpanded = true;
            } else {
                // Restore original state
                example.style.position = example.getAttribute('data-original-position') || '';
                example.style.width = example.getAttribute('data-original-width') || '';
                example.style.height = '';
                example.style.top = '';
                example.style.left = '';
                example.style.zIndex = example.getAttribute('data-original-zindex') || '';
                example.style.boxShadow = '';

                // Update button
                expandButton.innerHTML = '+';
                isExpanded = false;
            }
        });
    });
}

/**
 * Add interaction to buttons
 */
function addInteractiveButtons() {
    const buttons = document.querySelectorAll('.button');

    buttons.forEach(button => {
        button.style.cursor = 'pointer';

        button.addEventListener('click', function (e) {
            e.stopPropagation();

            // Add click effect
            this.style.transform = 'scale(0.95)';

            // Show feedback message
            const feedbackMsg = document.createElement('div');
            feedbackMsg.className = 'button-feedback';
            feedbackMsg.style.position = 'absolute';
            feedbackMsg.style.bottom = '100%';
            feedbackMsg.style.left = '50%';
            feedbackMsg.style.transform = 'translateX(-50%)';
            feedbackMsg.style.backgroundColor = 'rgba(0,0,0,0.7)';
            feedbackMsg.style.color = 'white';
            feedbackMsg.style.padding = '5px 10px';
            feedbackMsg.style.borderRadius = '4px';
            feedbackMsg.style.fontSize = '0.8em';
            feedbackMsg.style.whiteSpace = 'nowrap';
            feedbackMsg.style.zIndex = '1000';
            feedbackMsg.textContent = 'Button clicked';

            // Position the button for absolute positioning
            this.style.position = 'relative';

            // Add the feedback message
            this.appendChild(feedbackMsg);

            // Remove the feedback message after a delay
            setTimeout(() => {
                this.style.transform = '';
                feedbackMsg.remove();
            }, 1000);
        });
    });
}

/**
 * Add interaction to form fields
 */
function addFormInteraction() {
    const formFields = document.querySelectorAll('.form-field input');

    formFields.forEach(input => {
        // Make inputs actually work
        input.addEventListener('focus', function () {
            this.style.borderColor = 'var(--accent-color)';
        });

        input.addEventListener('blur', function () {
            // Reset border if empty
            if (this.value.trim() === '') {
                if (this.parentElement.classList.contains('correct')) {
                    this.style.borderColor = 'var(--success-color)';
                } else if (this.parentElement.classList.contains('error')) {
                    this.style.borderColor = 'var(--error-color)';
                } else {
                    this.style.borderColor = 'rgba(255,255,255,0.1)';
                }
            } else {
                // Show success state for non-empty input
                this.style.borderColor = 'var(--success-color)';
            }
        });
    });
}

/**
 * Add color toggle demo for accessibility slides
 */
function addColorToggleDemo() {
    // Find slides that talk about color
    const colorSlides = Array.from(document.querySelectorAll('.reveal .slides section'))
        .filter(slide => slide.textContent.toLowerCase().includes('color contrast') ||
            slide.textContent.toLowerCase().includes('color accessibility'));

    colorSlides.forEach(slide => {
        // Create a color toggle button
        const toggleButton = document.createElement('button');
        toggleButton.className = 'color-toggle';
        toggleButton.textContent = 'Toggle Colorblind Mode';
        toggleButton.style.position = 'absolute';
        toggleButton.style.bottom = '10px';
        toggleButton.style.left = '10px';
        toggleButton.style.backgroundColor = 'rgba(0,0,0,0.2)';
        toggleButton.style.color = 'white';
        toggleButton.style.border = 'none';
        toggleButton.style.borderRadius = '4px';
        toggleButton.style.padding = '5px 10px';
        toggleButton.style.fontSize = '0.7em';
        toggleButton.style.cursor = 'pointer';

        // Set relative positioning on the slide
        slide.style.position = 'relative';

        // Add the button
        slide.appendChild(toggleButton);

        // Handle toggling
        let colorblindMode = false;

        toggleButton.addEventListener('click', function (e) {
            e.stopPropagation();

            colorblindMode = !colorblindMode;

            if (colorblindMode) {
                // Apply deuteranopia simulation (red-green colorblindness)
                const filter = `
          <svg style="display:none">
            <filter id="deuteranopia">
              <feColorMatrix
                type="matrix"
                values="0.625, 0.375, 0, 0, 0
                        0.7, 0.3, 0, 0, 0
                        0, 0.3, 0.7, 0, 0
                        0, 0, 0, 1, 0">
              </feColorMatrix>
            </filter>
          </svg>
        `;

                // Add filter to document if it doesn't exist
                if (!document.getElementById('deuteranopia')) {
                    const filterDiv = document.createElement('div');
                    filterDiv.innerHTML = filter;
                    document.body.appendChild(filterDiv);
                }

                // Apply filter to examples
                const examples = slide.querySelectorAll('.example');
                examples.forEach(example => {
                    example.style.filter = 'url(#deuteranopia)';
                });

                toggleButton.textContent = 'Normal Color Mode';
            } else {
                // Remove filter
                const examples = slide.querySelectorAll('.example');
                examples.forEach(example => {
                    example.style.filter = '';
                });

                toggleButton.textContent = 'Toggle Colorblind Mode';
            }
        });
    });
}

/**
 * Add dark mode toggle demo
 */
function addDarkModeDemo() {
    // Find dark mode slides
    const darkModeSlides = Array.from(document.querySelectorAll('.reveal .slides section'))
        .filter(slide => slide.textContent.toLowerCase().includes('dark mode'));

    darkModeSlides.forEach(slide => {
        // Find examples
        const examples = slide.querySelectorAll('.example');

        examples.forEach(example => {
            // Add a toggle switch for dark/light mode
            const toggleContainer = document.createElement('div');
            toggleContainer.className = 'theme-toggle';
            toggleContainer.style.position = 'absolute';
            toggleContainer.style.top = '10px';
            toggleContainer.style.right = '30px';
            toggleContainer.style.display = 'flex';
            toggleContainer.style.alignItems = 'center';
            toggleContainer.style.zIndex = '10';

            const toggleLabel = document.createElement('span');
            toggleLabel.textContent = 'Light';
            toggleLabel.style.fontSize = '0.7em';
            toggleLabel.style.marginRight = '5px';

            const toggleSwitch = document.createElement('div');
            toggleSwitch.className = 'toggle-switch';
            toggleSwitch.style.width = '30px';
            toggleSwitch.style.height = '15px';
            toggleSwitch.style.backgroundColor = 'rgba(255,255,255,0.3)';
            toggleSwitch.style.borderRadius = '15px';
            toggleSwitch.style.position = 'relative';
            toggleSwitch.style.cursor = 'pointer';

            const toggleKnob = document.createElement('div');
            toggleKnob.className = 'toggle-knob';
            toggleKnob.style.width = '11px';
            toggleKnob.style.height = '11px';
            toggleKnob.style.backgroundColor = 'white';
            toggleKnob.style.borderRadius = '50%';
            toggleKnob.style.position = 'absolute';
            toggleKnob.style.top = '2px';
            toggleKnob.style.left = '2px';
            toggleKnob.style.transition = 'left 0.3s ease';

            toggleSwitch.appendChild(toggleKnob);
            toggleContainer.appendChild(toggleLabel);
            toggleContainer.appendChild(toggleSwitch);

            // Set position on example
            example.style.position = 'relative';

            // Add the toggle
            example.appendChild(toggleContainer);

            // Handle toggling
            let isDarkMode = example.classList.contains('good');
            updateToggleState();

            toggleSwitch.addEventListener('click', function (e) {
                e.stopPropagation();

                isDarkMode = !isDarkMode;
                updateToggleState();

                // Update example content
                const content = example.querySelector(':not(.theme-toggle):not(.expand-button)');
                if (content) {
                    if (isDarkMode) {
                        content.style.backgroundColor = '#121212';
                        content.style.color = 'rgba(255,255,255,0.87)';
                    } else {
                        content.style.backgroundColor = 'white';
                        content.style.color = '#333333';
                    }
                }
            });

            function updateToggleState() {
                if (isDarkMode) {
                    toggleKnob.style.left = '17px';
                    toggleLabel.textContent = 'Dark';
                } else {
                    toggleKnob.style.left = '2px';
                    toggleLabel.textContent = 'Light';
                }
            }
        });
    });
}

/**
 * Add responsive layout demo
 */
function addResponsiveDemo() {
    // Find responsive design slides
    const responsiveSlides = Array.from(document.querySelectorAll('.reveal .slides section'))
        .filter(slide => slide.textContent.toLowerCase().includes('responsive design'));

    responsiveSlides.forEach(slide => {
        // Create device switcher
        const deviceSwitcher = document.createElement('div');
        deviceSwitcher.className = 'device-switcher';
        deviceSwitcher.style.position = 'absolute';
        deviceSwitcher.style.bottom = '10px';
        deviceSwitcher.style.left = '10px';
        deviceSwitcher.style.display = 'flex';
        deviceSwitcher.style.gap = '10px';
        deviceSwitcher.style.zIndex = '10';

        // Create device buttons
        const devices = [
            { name: 'Mobile', width: '320px' },
            { name: 'Tablet', width: '768px' },
            { name: 'Desktop', width: '100%' }
        ];

        devices.forEach(device => {
            const button = document.createElement('button');
            button.textContent = device.name;
            button.style.backgroundColor = 'rgba(0,0,0,0.2)';
            button.style.color = 'white';
            button.style.border = 'none';
            button.style.borderRadius = '4px';
            button.style.padding = '5px 10px';
            button.style.fontSize = '0.7em';
            button.style.cursor = 'pointer';

            // Add click handler
            button.addEventListener('click', function (e) {
                e.stopPropagation();

                // Find all examples in the slide
                const examples = slide.querySelectorAll('.example .device-framed');

                examples.forEach(example => {
                    // Update width
                    example.style.width = device.width;
                    example.style.transition = 'width 0.5s ease';

                    // Update aspect ratio
                    if (device.name === 'Mobile') {
                        example.style.aspectRatio = '9/16';
                    } else if (device.name === 'Tablet') {
                        example.style.aspectRatio = '4/3';
                    } else {
                        example.style.aspectRatio = '16/9';
                    }
                });

                // Update active button
                deviceSwitcher.querySelectorAll('button').forEach(btn => {
                    btn.style.backgroundColor = 'rgba(0,0,0,0.2)';
                });
                button.style.backgroundColor = 'var(--accent-color)';
            });

            deviceSwitcher.appendChild(button);
        });

        // Set first button as active
        deviceSwitcher.querySelector('button').style.backgroundColor = 'var(--accent-color)';

        // Add to slide
        slide.style.position = 'relative';
        slide.appendChild(deviceSwitcher);
    });
}

/**
 * Add interactive accessibility demo
 */
function addAccessibilityDemo() {
    // Find keyboard accessibility slides
    const keyboardSlides = Array.from(document.querySelectorAll('.reveal .slides section'))
        .filter(slide => slide.textContent.toLowerCase().includes('keyboard accessibility'));

    keyboardSlides.forEach(slide => {
        // Find examples with tabindex
        const tabbableItems = slide.querySelectorAll('[tabindex]');

        // Make them actually focusable
        tabbableItems.forEach(item => {
            // Ensure tabindex is set correctly
            if (!item.getAttribute('tabindex') || item.getAttribute('tabindex') === '-1') {
                item.setAttribute('tabindex', '0');
            }

            // Add keyboard handler
            item.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();

                    // Add active state
                    this.style.outline = '3px solid var(--accent-color)';
                    this.style.backgroundColor = 'rgba(10, 132, 255, 0.2)';

                    // Remove after delay
                    setTimeout(() => {
                        this.style.outline = '';
                        this.style.backgroundColor = '';
                    }, 1000);
                }
            });
        });

        // Add keyboard navigation hint
        const hint = document.createElement('div');
        hint.className = 'keyboard-hint';
        hint.textContent = 'Press Tab to navigate, Enter to activate';
        hint.style.position = 'absolute';
        hint.style.bottom = '10px';
        hint.style.left = '10px';
        hint.style.backgroundColor = 'rgba(0,0,0,0.2)';
        hint.style.color = 'white';
        hint.style.padding = '5px 10px';
        hint.style.borderRadius = '4px';
        hint.style.fontSize = '0.7em';

        // Add to slide
        slide.style.position = 'relative';
        slide.appendChild(hint);
    });
}

/**
 * Add keyboard shortcuts overview
 */
function addKeyboardShortcuts() {
    // Create keyboard shortcuts button
    const shortcutsButton = document.createElement('button');
    shortcutsButton.className = 'shortcuts-button';
    shortcutsButton.innerHTML = '⌨️';
    shortcutsButton.style.position = 'fixed';
    shortcutsButton.style.bottom = '20px';
    shortcutsButton.style.left = '20px';
    shortcutsButton.style.width = '30px';
    shortcutsButton.style.height = '30px';
    shortcutsButton.style.borderRadius = '50%';
    shortcutsButton.style.backgroundColor = 'rgba(0,0,0,0.3)';
    shortcutsButton.style.border = 'none';
    shortcutsButton.style.color = 'white';
    shortcutsButton.style.fontSize = '16px';
    shortcutsButton.style.display = 'flex';
    shortcutsButton.style.alignItems = 'center';
    shortcutsButton.style.justifyContent = 'center';
    shortcutsButton.style.cursor = 'pointer';
    shortcutsButton.style.zIndex = '1000';

    // Create shortcuts panel
    const shortcutsPanel = document.createElement('div');
    shortcutsPanel.className = 'shortcuts-panel';
    shortcutsPanel.style.position = 'fixed';
    shortcutsPanel.style.bottom = '60px';
    shortcutsPanel.style.left = '20px';
    shortcutsPanel.style.width = '280px';
    shortcutsPanel.style.backgroundColor = 'rgba(0,0,0,0.8)';
    shortcutsPanel.style.borderRadius = '8px';
    shortcutsPanel.style.padding = '15px';
    shortcutsPanel.style.color = 'white';
    shortcutsPanel.style.fontSize = '14px';
    shortcutsPanel.style.display = 'none';
    shortcutsPanel.style.zIndex = '1000';
    shortcutsPanel.style.boxShadow = '0 0 20px rgba(0,0,0,0.3)';

    // Add shortcuts content
    shortcutsPanel.innerHTML = `
    <h3 style="margin-top: 0; font-size: 16px; color: var(--accent-color);">Keyboard Shortcuts</h3>
    <div style="display: grid; grid-template-columns: auto 1fr; gap: 5px 10px; align-items: center;">
      <div style="background: rgba(255,255,255,0.2); padding: 2px 6px; border-radius: 4px; text-align: center;">→</div>
      <div>Next slide</div>
      
      <div style="background: rgba(255,255,255,0.2); padding: 2px 6px; border-radius: 4px; text-align: center;">←</div>
      <div>Previous slide</div>
      
      <div style="background: rgba(255,255,255,0.2); padding: 2px 6px; border-radius: 4px; text-align: center;">Space</div>
      <div>Next slide</div>
      
      <div style="background: rgba(255,255,255,0.2); padding: 2px 6px; border-radius: 4px; text-align: center;">F</div>
      <div>Fullscreen</div>
      
      <div style="background: rgba(255,255,255,0.2); padding: 2px 6px; border-radius: 4px; text-align: center;">O</div>
      <div>Slide overview</div>
      
      <div style="background: rgba(255,255,255,0.2); padding: 2px 6px; border-radius: 4px; text-align: center;">B</div>
      <div>Pause/Resume presentation</div>
      
      <div style="background: rgba(255,255,255,0.2); padding: 2px 6px; border-radius: 4px; text-align: center;">S</div>
      <div>Speaker notes</div>
    </div>
  `;

    // Add toggle functionality
    let isOpen = false;

    shortcutsButton.addEventListener('click', function (e) {
        e.stopPropagation();

        isOpen = !isOpen;
        shortcutsPanel.style.display = isOpen ? 'block' : 'none';
    });

    // Close when clicking elsewhere
    document.addEventListener('click', function () {
        isOpen = false;
        shortcutsPanel.style.display = 'none';
    });

    // Prevent closing when clicking inside panel
    shortcutsPanel.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    // Add to document
    document.body.appendChild(shortcutsButton);
    document.body.appendChild(shortcutsPanel);
}