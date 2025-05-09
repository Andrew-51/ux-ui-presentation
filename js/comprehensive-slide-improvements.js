/**
 * Comprehensive Slide Improvements
 * This script enhances all slides with improved visual hierarchy, 
 * visualizations, transitions, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function () {
    // Wait for RevealJS to be fully initialized
    if (typeof Reveal !== 'undefined') {
        Reveal.addEventListener('ready', enhanceAllSlides);
    } else {
        // Fallback if Reveal isn't available yet
        setTimeout(enhanceAllSlides, 1000);
    }
});

// Main function to enhance all slides
function enhanceAllSlides() {
    // Get all slides
    const slides = document.querySelectorAll('.reveal .slides section');

    slides.forEach(function (slide) {
        // Get the section type from the data attribute
        const sectionType = slide.getAttribute('data-section-folder');

        // Apply enhancements based on section type
        switch (sectionType) {
            case 'title':
                enhanceTitleSlide(slide);
                break;
            case 'intro':
                enhanceIntroSlide(slide);
                break;
            case 'best-practices':
                enhanceBestPracticesSlide(slide);
                break;
            case 'responsive':
                enhanceResponsiveSlide(slide);
                break;
            case 'components':
                enhanceComponentsSlide(slide);
                break;
            case 'accessibility':
                enhanceAccessibilitySlide(slide);
                break;
            case 'costs':
                enhanceCostsSlide(slide);
                break;
            case 'conclusion':
                enhanceConclusionSlide(slide);
                break;
            default:
                // General enhancement for any slide type
                enhanceGeneralSlide(slide);
        }

        // Apply common enhancements to all slides
        addProgressIndicator(slide);
        improveSectionTransitions(slide);
        enhanceVisualHierarchy(slide);
        improveListPresentation(slide);
    });

    // Add navigation hints
    addNavigationHints();

    // Run the layout update
    if (typeof Reveal.layout === 'function') {
        Reveal.layout();
    }
}

// Title slide enhancements
function enhanceTitleSlide(slide) {
    // Add particle background effect
    const titleBackground = document.createElement('div');
    titleBackground.className = 'title-particles';
    titleBackground.innerHTML = `
    <div class="particles">
      ${Array(20).fill().map((_, i) =>
        `<div class="particle" style="
          left: ${Math.random() * 100}%; 
          top: ${Math.random() * 100}%; 
          animation-delay: ${Math.random() * 5}s;
          animation-duration: ${5 + Math.random() * 5}s;
        "></div>`
    ).join('')}
    </div>
  `;
    slide.appendChild(titleBackground);

    // Add subtle text shadow to title for better visibility
    const titleHeader = slide.querySelector('h1');
    if (titleHeader) {
        titleHeader.style.textShadow = '0 0 15px rgba(0,0,0,0.5)';
    }

    // Add subtle typing animation to subtitle
    const subtitle = slide.querySelector('h3');
    if (subtitle) {
        const originalText = subtitle.textContent;
        subtitle.innerHTML = '';
        subtitle.setAttribute('data-original-text', originalText);
        subtitle.classList.add('typing-animation');
    }
}

// Intro slide enhancements
function enhanceIntroSlide(slide) {
    // Add subtle highlight to key concepts
    const keyTerms = ['UI', 'UX', 'user interface', 'user experience'];
    highlightKeyTerms(slide, keyTerms);

    // Add subtle background pattern
    addSubtleBackground(slide, 'intro-pattern');

    // Improve spacing for better readability
    const contentContainer = slide.querySelector('.container');
    if (contentContainer) {
        contentContainer.style.marginTop = '1em';
    }

    // Add visual indicators for importance
    const importantPoints = slide.querySelectorAll('li');
    importantPoints.forEach((point, index) => {
        point.style.paddingLeft = '0.5em';
        point.style.position = 'relative';

        // Create a subtle indicator for each point
        const indicator = document.createElement('span');
        indicator.className = 'point-indicator';
        indicator.style.position = 'absolute';
        indicator.style.left = '-0.8em';
        indicator.style.top = '0.4em';
        indicator.style.width = '0.4em';
        indicator.style.height = '0.4em';
        indicator.style.backgroundColor = 'var(--accent-color)';
        indicator.style.borderRadius = '50%';
        indicator.style.opacity = '0.8';
        indicator.style.transform = 'scale(0)';
        indicator.style.animation = `pointIndicator 0.5s ${0.3 + index * 0.1}s forwards`;

        point.insertBefore(indicator, point.firstChild);
    });
}

// Best practices slide enhancements
function enhanceBestPracticesSlide(slide) {
    // Add subtle indicator for DO vs DON'T sections
    const doSection = slide.querySelector('.do');
    const dontSection = slide.querySelector('.dont');

    if (doSection) {
        doSection.style.position = 'relative';
        doSection.style.overflow = 'hidden';

        // Add subtle checkmark background
        const checkmark = document.createElement('div');
        checkmark.className = 'checkmark-bg';
        checkmark.innerHTML = `
      <svg width="100" height="100" viewBox="0 0 24 24" style="position: absolute; right: -20px; bottom: -20px; opacity: 0.1; transform: scale(3);">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="var(--success-color)" />
      </svg>
    `;
        doSection.appendChild(checkmark);
    }

    if (dontSection) {
        dontSection.style.position = 'relative';
        dontSection.style.overflow = 'hidden';

        // Add subtle X background
        const xmark = document.createElement('div');
        xmark.className = 'xmark-bg';
        xmark.innerHTML = `
      <svg width="100" height="100" viewBox="0 0 24 24" style="position: absolute; right: -20px; bottom: -20px; opacity: 0.1; transform: scale(3);">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="var(--error-color)" />
      </svg>
    `;
        dontSection.appendChild(xmark);
    }

    // Add helpful labels to examples
    const examples = slide.querySelectorAll('.example');
    examples.forEach(example => {
        // If it already has a label skip it
        if (example.querySelector('.example-label')) return;

        const exampleType = example.classList.contains('good') ? 'DO' : 'DON\'T';
        const labelColor = example.classList.contains('good') ? 'var(--success-color)' : 'var(--error-color)';

        const label = document.createElement('div');
        label.className = 'example-label';
        label.style.padding = '5px 10px';
        label.style.backgroundColor = labelColor;
        label.style.color = 'white';
        label.style.fontWeight = 'bold';
        label.style.borderRadius = '4px 4px 0 0';
        label.style.fontSize = '0.8em';
        label.style.textAlign = 'center';
        label.textContent = exampleType;

        // Insert at the beginning
        example.insertBefore(label, example.firstChild);
    });
}

// Responsive slide enhancements
function enhanceResponsiveSlide(slide) {
    // Add responsive device frames to examples
    const examples = slide.querySelectorAll('.example');
    examples.forEach(example => {
        const content = example.querySelector('div');
        if (content && !content.classList.contains('device-framed')) {
            content.classList.add('device-framed');
            content.style.border = '2px solid rgba(255,255,255,0.2)';
            content.style.borderRadius = '8px';
            content.style.overflow = 'hidden';
            content.style.position = 'relative';

            // Add device frame indicator
            const deviceIndicator = document.createElement('div');
            deviceIndicator.className = 'device-indicator';
            deviceIndicator.style.position = 'absolute';
            deviceIndicator.style.top = '0';
            deviceIndicator.style.left = '0';
            deviceIndicator.style.right = '0';
            deviceIndicator.style.height = '8px';
            deviceIndicator.style.backgroundColor = 'rgba(255,255,255,0.1)';
            deviceIndicator.style.borderBottom = '1px solid rgba(255,255,255,0.2)';
            deviceIndicator.style.borderRadius = '6px 6px 0 0';

            const deviceDot = document.createElement('div');
            deviceDot.style.position = 'absolute';
            deviceDot.style.width = '4px';
            deviceDot.style.height = '4px';
            deviceDot.style.borderRadius = '50%';
            deviceDot.style.backgroundColor = 'rgba(255,255,255,0.4)';
            deviceDot.style.top = '2px';
            deviceDot.style.left = '4px';

            deviceIndicator.appendChild(deviceDot);
            content.insertBefore(deviceIndicator, content.firstChild);
        }
    });

    // Add media query indicators to code examples
    const codeBlocks = slide.querySelectorAll('pre code');
    codeBlocks.forEach(code => {
        if (code.textContent.includes('@media')) {
            code.parentElement.style.borderLeft = '3px solid var(--accent-color)';
        }
    });
}

// Components slide enhancements
function enhanceComponentsSlide(slide) {
    // Add subtle component grid background
    const gridBg = document.createElement('div');
    gridBg.className = 'component-grid-bg';
    gridBg.style.position = 'absolute';
    gridBg.style.top = '0';
    gridBg.style.left = '0';
    gridBg.style.right = '0';
    gridBg.style.bottom = '0';
    gridBg.style.zIndex = '-1';
    gridBg.style.opacity = '0.05';
    gridBg.style.backgroundImage = 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)';
    gridBg.style.backgroundSize = '20px 20px';
    gridBg.style.pointerEvents = 'none';

    // Only add if it doesn't exist yet
    if (!slide.querySelector('.component-grid-bg')) {
        slide.style.position = 'relative';
        slide.appendChild(gridBg);
    }

    // Enhance component icons
    const iconItems = slide.querySelectorAll('.icon-item');
    iconItems.forEach(icon => {
        const svg = icon.querySelector('svg');
        if (svg) {
            // Add subtle pulse effect
            svg.style.animation = 'iconPulse 3s infinite alternate ease-in-out';
            svg.style.transformOrigin = 'center';
        }
    });
}

// Accessibility slide enhancements
function enhanceAccessibilitySlide(slide) {
    // Add subtle a11y icon in the background
    const a11yBg = document.createElement('div');
    a11yBg.className = 'a11y-bg';
    a11yBg.style.position = 'absolute';
    a11yBg.style.top = '10px';
    a11yBg.style.right = '10px';
    a11yBg.style.zIndex = '-1';
    a11yBg.style.opacity = '0.07';
    a11yBg.style.pointerEvents = 'none';
    a11yBg.innerHTML = `
    <svg width="120" height="120" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="white"/>
      <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm3 7H9v-2h6v2z" fill="white"/>
    </svg>
  `;

    // Only add if it doesn't exist yet
    if (!slide.querySelector('.a11y-bg')) {
        slide.style.position = 'relative';
        slide.appendChild(a11yBg);
    }

    // Enhance contrast examples
    const contrastExamples = slide.querySelectorAll('.example');
    contrastExamples.forEach(example => {
        if (slide.textContent.toLowerCase().includes('contrast')) {
            const contrastRatioIndicator = document.createElement('div');
            contrastRatioIndicator.className = 'contrast-ratio';
            contrastRatioIndicator.style.position = 'absolute';
            contrastRatioIndicator.style.bottom = '10px';
            contrastRatioIndicator.style.right = '10px';
            contrastRatioIndicator.style.fontSize = '0.8em';
            contrastRatioIndicator.style.padding = '4px 8px';
            contrastRatioIndicator.style.borderRadius = '4px';
            contrastRatioIndicator.style.backgroundColor = 'rgba(0,0,0,0.2)';

            if (example.classList.contains('good')) {
                contrastRatioIndicator.textContent = 'AA & AAA';
                contrastRatioIndicator.style.color = 'var(--success-color)';
            } else {
                contrastRatioIndicator.textContent = 'Fails AA & AAA';
                contrastRatioIndicator.style.color = 'var(--error-color)';
            }

            const contentDiv = example.querySelector('div');
            if (contentDiv) {
                contentDiv.style.position = 'relative';
                contentDiv.appendChild(contrastRatioIndicator);
            }
        }
    });
}

// Costs slide enhancements
function enhanceCostsSlide(slide) {
    // Add financial indicator icons to cost-related content
    const costHeadings = slide.querySelectorAll('h3');
    costHeadings.forEach(heading => {
        if (heading.textContent.toLowerCase().includes('cost') ||
            heading.textContent.toLowerCase().includes('roi') ||
            heading.textContent.toLowerCase().includes('income')) {

            // Only add if it doesn't have an icon yet
            if (!heading.querySelector('.cost-icon')) {
                heading.style.position = 'relative';
                heading.style.paddingLeft = '1.5em';

                const costIcon = document.createElement('span');
                costIcon.className = 'cost-icon';
                costIcon.style.position = 'absolute';
                costIcon.style.left = '0';
                costIcon.style.top = '50%';
                costIcon.style.transform = 'translateY(-50%)';
                costIcon.innerHTML = `
          <svg width="1em" height="1em" viewBox="0 0 24 24">
            <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" fill="currentColor"/>
          </svg>
        `;

                heading.insertBefore(costIcon, heading.firstChild);
            }
        }
    });

    // Enhance ROI figures with visual indicators
    const roiFigures = [];
    const allElements = slide.querySelectorAll('*');
    allElements.forEach(el => {
        if (el.textContent.match(/\d+(\.\d+)?%/)) {
            roiFigures.push(el);
        }
    });

    roiFigures.forEach(figure => {
        figure.style.position = 'relative';
        figure.style.color = 'var(--accent-color)';
        figure.style.fontWeight = 'bold';
    });
}

// Conclusion slide enhancements
function enhanceConclusionSlide(slide) {
    // Add thank you animation
    const thankYou = slide.querySelector('h2, h1');
    if (thankYou && thankYou.textContent.toLowerCase().includes('thank')) {
        thankYou.style.animation = 'thankYouPulse 3s infinite alternate ease-in-out';
        thankYou.style.transformOrigin = 'center';
    }

    // Add contact info styling
    const contactInfo = slide.querySelectorAll('p');
    contactInfo.forEach(info => {
        if (info.textContent.includes('@') ||
            info.textContent.includes('.com') ||
            info.textContent.includes('contact')) {

            info.style.borderTop = '1px solid rgba(255,255,255,0.2)';
            info.style.borderBottom = '1px solid rgba(255,255,255,0.2)';
            info.style.padding = '0.5em 0';
            info.style.marginTop = '2em';
        }
    });
}

// General slide enhancements for any type
function enhanceGeneralSlide(slide) {
    // Add subtle reveal animations to key elements
    const headings = slide.querySelectorAll('h1, h2, h3');
    headings.forEach(heading => {
        heading.style.position = 'relative';

        // Add subtle underline
        const underline = document.createElement('div');
        underline.style.position = 'absolute';
        underline.style.bottom = '-5px';
        underline.style.left = '0';
        underline.style.width = '40px';
        underline.style.height = '3px';
        underline.style.backgroundColor = 'var(--accent-color)';
        underline.style.borderRadius = '1.5px';

        heading.appendChild(underline);
    });
}

// Add progress indicator to all slides
function addProgressIndicator(slide) {
    // Check if there's already a progress indicator
    if (slide.querySelector('.slide-progress')) return;

    // Create progress indicator
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'slide-progress';
    progressIndicator.style.position = 'absolute';
    progressIndicator.style.bottom = '15px';
    progressIndicator.style.right = '15px';
    progressIndicator.style.fontSize = '0.7em';
    progressIndicator.style.padding = '3px 8px';
    progressIndicator.style.backgroundColor = 'rgba(0,0,0,0.2)';
    progressIndicator.style.borderRadius = '4px';
    progressIndicator.style.color = 'rgba(255,255,255,0.6)';
    progressIndicator.style.opacity = '0';
    progressIndicator.style.transition = 'opacity 0.3s';

    slide.style.position = 'relative';
    slide.appendChild(progressIndicator);

    // Add event to show/update the progress indicator
    Reveal.addEventListener('slidechanged', function (event) {
        // Update all progress indicators
        const allIndicators = document.querySelectorAll('.slide-progress');
        allIndicators.forEach(indicator => {
            const currentSlideIndex = Reveal.getIndices().h;
            const totalSlides = document.querySelectorAll('.reveal .slides > section').length;
            indicator.textContent = `${currentSlideIndex + 1}/${totalSlides}`;
            indicator.style.opacity = '1';

            // Hide after 3 seconds
            setTimeout(() => {
                indicator.style.opacity = '0';
            }, 3000);
        });
    });
}

// Improve section transitions
function improveSectionTransitions(slide) {
    // Get the section type
    const sectionType = slide.getAttribute('data-section-folder');

    // If this is the first slide of a section, add special attributes
    const headerText = slide.querySelector('h1, h2')?.textContent.toLowerCase() || '';

    if (headerText.includes('what is') ||
        headerText.includes('introduction') ||
        headerText.includes('overview') ||
        headerText === sectionType) {

        // This is likely a section start slide
        slide.classList.add('section-start');

        // Add section indicator
        const sectionIndicator = document.createElement('div');
        sectionIndicator.className = 'section-indicator';
        sectionIndicator.style.position = 'absolute';
        sectionIndicator.style.top = '15px';
        sectionIndicator.style.left = '15px';
        sectionIndicator.style.fontSize = '0.7em';
        sectionIndicator.style.padding = '3px 8px';
        sectionIndicator.style.backgroundColor = 'var(--accent-color)';
        sectionIndicator.style.borderRadius = '4px';
        sectionIndicator.style.color = 'white';
        sectionIndicator.style.textTransform = 'uppercase';
        sectionIndicator.style.letterSpacing = '1px';
        sectionIndicator.textContent = sectionType || 'Section';

        slide.style.position = 'relative';
        slide.appendChild(sectionIndicator);
    }
}

// Enhance visual hierarchy
function enhanceVisualHierarchy(slide) {
    // Add subtle dividers between sections
    const containers = slide.querySelectorAll('.container, .example-container');
    containers.forEach(container => {
        container.style.position = 'relative';

        // Add divider only if there isn't one already
        if (!container.querySelector('.content-divider')) {
            const divider = document.createElement('div');
            divider.className = 'content-divider';
            divider.style.position = 'absolute';
            divider.style.top = '-10px';
            divider.style.left = '0';
            divider.style.right = '0';
            divider.style.height = '1px';
            divider.style.backgroundColor = 'rgba(255,255,255,0.1)';
            divider.style.marginBottom = '10px';

            container.parentNode.insertBefore(divider, container);
        }
    });

    // Enhance button visibility
    const buttons = slide.querySelectorAll('.button');
    buttons.forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';

        // Add hover effect
        button.addEventListener('mouseover', function () {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });

        button.addEventListener('mouseout', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

// Improve list presentation
function improveListPresentation(slide) {
    // Make lists more visually appealing
    const lists = slide.querySelectorAll('ul, ol');
    lists.forEach(list => {
        list.style.listStyleType = 'none';
        list.style.paddingLeft = '1em';

        const items = list.querySelectorAll('li');
        items.forEach((item, index) => {
            item.style.position = 'relative';
            item.style.paddingLeft = '1em';
            item.style.marginBottom = '0.3em';

            // If there's not already a custom bullet
            if (!item.querySelector('.custom-bullet') && !item.querySelector('.point-indicator')) {
                const bullet = document.createElement('span');
                bullet.className = 'custom-bullet';
                bullet.style.position = 'absolute';
                bullet.style.left = '0';
                bullet.style.top = '0.45em';
                bullet.style.width = '0.4em';
                bullet.style.height = '0.4em';
                bullet.style.backgroundColor = 'var(--accent-color)';
                bullet.style.borderRadius = '50%';
                bullet.style.opacity = '0.8';

                // Add to list item
                item.insertBefore(bullet, item.firstChild);
            }
        });
    });
}

// Add navigation hints
function addNavigationHints() {
    // Create navigation hint container
    const navHint = document.createElement('div');
    navHint.className = 'navigation-hint';
    navHint.style.position = 'absolute';
    navHint.style.bottom = '20px';
    navHint.style.left = '50%';
    navHint.style.transform = 'translateX(-50%)';
    navHint.style.fontSize = '0.8em';
    navHint.style.padding = '5px 15px';
    navHint.style.backgroundColor = 'rgba(0,0,0,0.2)';
    navHint.style.borderRadius = '20px';
    navHint.style.color = 'rgba(255,255,255,0.7)';
    navHint.style.display = 'flex';
    navHint.style.alignItems = 'center';
    navHint.style.gap = '10px';
    navHint.style.zIndex = '100';
    navHint.style.opacity = '0';
    navHint.style.transition = 'opacity 0.5s';

    navHint.innerHTML = `
    <span>← →</span>
    <span>Navigate</span>
    <span>Space</span>
    <span>Next</span>
  `;

    // Add to the presentation
    const reveal = document.querySelector('.reveal');
    if (reveal && !document.querySelector('.navigation-hint')) {
        reveal.appendChild(navHint);

        // Show briefly, then hide
        setTimeout(() => {
            navHint.style.opacity = '1';

            setTimeout(() => {
                navHint.style.opacity = '0';
            }, 5000);
        }, 2000);
    }
}

// Helper function to add subtle background
function addSubtleBackground(slide, className) {
    if (!slide.querySelector('.' + className)) {
        const bg = document.createElement('div');
        bg.className = className;
        bg.style.position = 'absolute';
        bg.style.top = '0';
        bg.style.left = '0';
        bg.style.right = '0';
        bg.style.bottom = '0';
        bg.style.zIndex = '-1';
        bg.style.opacity = '0.03';
        bg.style.pointerEvents = 'none';

        // Different patterns based on class
        if (className === 'intro-pattern') {
            bg.style.backgroundImage = 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)';
            bg.style.backgroundSize = '20px 20px';
        }

        slide.style.position = 'relative';
        slide.appendChild(bg);
    }
}

// Highlight key terms in text
function highlightKeyTerms(slide, terms) {
    // Find all text nodes
    const textNodes = [];
    function findTextNodes(node) {
        if (node.nodeType === 3) { // Text node
            textNodes.push(node);
        } else if (node.nodeType === 1) { // Element node
            // Skip script tags and already highlighted elements
            if (node.tagName.toLowerCase() !== 'script' &&
                !node.classList.contains('key-term')) {
                for (let i = 0; i < node.childNodes.length; i++) {
                    findTextNodes(node.childNodes[i]);
                }
            }
        }
    }

    findTextNodes(slide);

    // Replace key terms with highlighted spans
    textNodes.forEach(textNode => {
        let html = textNode.nodeValue;

        terms.forEach(term => {
            // Case insensitive replace with capturing group
            const regex = new RegExp(`(${term})`, 'gi');
            html = html.replace(regex, '<span class="key-term" style="color: var(--accent-color); font-weight: 500;">$1</span>');
        });

        // Only replace if we found a term
        if (html !== textNode.nodeValue) {
            const newNode = document.createElement('span');
            newNode.innerHTML = html;
            textNode.parentNode.replaceChild(newNode, textNode);
        }
    });
}

// Add CSS for the new elements and animations
function addCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
    /* Particle animation for title slide */
    .title-particles .particle {
      position: absolute;
      width: 5px;
      height: 5px;
      background-color: var(--accent-color);
      border-radius: 50%;
      opacity: 0.3;
      animation: float 10s infinite ease-in-out;
    }

    @keyframes float {
      0%, 100% {
        transform: translate(0, 0) scale(1);
      }
      25% {
        transform: translate(20px, -15px) scale(1.2);
      }
      50% {
        transform: translate(-10px, 10px) scale(0.8);
      }
      75% {
        transform: translate(15px, 15px) scale(1.1);
      }
    }

    /* Typing animation for subtitle */
    .typing-animation::after {
      content: '|';
      display: inline-block;
      animation: blink 1s infinite;
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    /* Point indicator animation */
    @keyframes pointIndicator {
      0% { transform: scale(0); }
      70% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }

    /* Icon pulse animation */
    @keyframes iconPulse {
      0% { transform: scale(1); }
      100% { transform: scale(1.1); }
    }

    /* Thank you pulse animation */
    @keyframes thankYouPulse {
      0% { transform: scale(1); }
      100% { transform: scale(1.05); opacity: 0.8; }
    }

    /* Apply custom styles to key terms */
    .key-term {
      transition: color 0.3s, text-shadow 0.3s;
    }
    .key-term:hover {
      text-shadow: 0 0 8px var(--accent-color);
    }

    /* Add hover effects to buttons */
    .button {
      transition: transform 0.3s, box-shadow 0.3s;
    }

    /* Add styles for custom bullets */
    .custom-bullet {
      transition: transform 0.3s, background-color 0.3s;
    }
    li:hover .custom-bullet {
      transform: scale(1.5);
      background-color: var(--accent-color);
    }

    /* Section indicator styling */
    .section-indicator {
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
  `;

    // Add the style to the document
    document.head.appendChild(style);
}

// Initialize typing animation for subtitle
function initTypingAnimation() {
    const subtitles = document.querySelectorAll('.typing-animation');

    subtitles.forEach(subtitle => {
        const originalText = subtitle.getAttribute('data-original-text');
        if (originalText) {
            let currentIndex = 0;

            function typeNextChar() {
                if (currentIndex < originalText.length) {
                    subtitle.textContent = originalText.substring(0, currentIndex + 1);
                    currentIndex++;
                    setTimeout(typeNextChar, 100 + Math.random() * 50);
                } else {
                    // Remove typing cursor when done
                    subtitle.classList.remove('typing-animation');
                }
            }

            // Start typing animation
            typeNextChar();
        }
    });
}

// Call the function to add custom styles
addCustomStyles();

// Wait a bit and initialize typing animation
setTimeout(initTypingAnimation, 2000);