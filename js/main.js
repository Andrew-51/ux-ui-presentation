document.addEventListener('DOMContentLoaded', function () {
  const presentationContainer = document.getElementById('presentation-container');

  // List of all section files to load, in order
  const sections = [
    'sections/title/title.html',
    'sections/intro/what-is-ui.html',
    'sections/intro/why-ui.html',
    'sections/intro/what-is-ux.html',
    'sections/intro/why-ux.html',
    'sections/intro/importance.html',
    'sections/best-practices/color.html',
    'sections/best-practices/form-fields.html',
    'sections/best-practices/feedback.html',
    'sections/best-practices/navigation.html',
    'sections/best-practices/microcopy.html',
    'sections/best-practices/visual-hierarchy.html',
    'sections/best-practices/empty-states.html',
    'sections/responsive/responsive.html',
    //'sections/responsive/responsive-2.html',
    'sections/responsive/responsive-demo.html',
    //'sections/responsive/typography.html',
    'sections/responsive/cognitive-load.html',
    'sections/responsive/gestures.html',
    'sections/responsive/gestures-2.html',
    //'sections/responsive/gestures-3.html',
    'sections/components/dark-mode.html',
    'sections/components/onboarding.html',
    'sections/components/consistency.html',
    'sections/components/animations.html',
    'sections/components/visualization.html',
    'sections/components/whitespace.html',
    'sections/accessibility/intro-accessibility.html',
    'sections/accessibility/foundations.html',
    'sections/accessibility/contrast.html',
    //'sections/accessibility/keyboard.html',
    //'sections/accessibility/screen-readers.html',
    'sections/accessibility/touch-targets.html',
    'sections/accessibility/text-alternatives.html',
    'sections/accessibility/content-structure.html',
    'sections/costs/intro-costs.html',
    'sections/costs/cost-analysis.html',
    'sections/costs/roi.html',
    'sections/costs/income-impact.html',
    'sections/costs/income-channels.html',
    'sections/conclusion/thank-you.html'
  ];

  // Map of section folder names to preferred transition types
  const sectionTransitions = {
    'title': ['zoom', 'fade'],
    'intro': ['slide', 'convex', 'fade'],
    'best-practices': ['convex', 'concave', 'zoom'],
    'responsive': ['slide', 'fade'],
    'components': ['zoom', 'convex'],
    'accessibility': ['fade', 'slide'],
    'costs': ['concave', 'zoom'],
    'conclusion': ['zoom', 'fade']
  };

  // Function to get a random transition from a section's transition options
  function getRandomTransition(sectionFolder) {
    const transitionOptions = sectionTransitions[sectionFolder] || ['slide'];
    const randomIndex = Math.floor(Math.random() * transitionOptions.length);
    return transitionOptions[randomIndex];
  }

  // Function to extract the section folder from a file path
  function getSectionFolder(filePath) {
    const parts = filePath.split('/');
    if (parts.length >= 2) {
      return parts[1]; // "sections/intro/file.html" -> "intro"
    }
    return 'default';
  }

  // Function to fetch and load each section
  async function loadSections() {
    let allSectionsContent = '';

    for (const section of sections) {
      try {
        const response = await fetch(section);
        if (!response.ok) {
          console.error(`Failed to load section ${section}`);
          continue;
        }

        let sectionContent = await response.text();
        const sectionFolder = getSectionFolder(section);

        // Add data attribute for the section folder to help with CSS targeting
        sectionContent = sectionContent.replace('<section', `<section data-section-folder="${sectionFolder}" data-transition="${getRandomTransition(sectionFolder)}"`);

        // Add data-item-index to elements for staggered animations
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = sectionContent;

        // Add index attributes to common elements for staggered animations
        ['svg', '.icon-item', 'li', '.form-field', '.button'].forEach(selector => {
          const elements = tempDiv.querySelectorAll(selector);
          elements.forEach((el, index) => {
            el.style.setProperty('--item-index', index);
          });
        });

        // Add responsive classes to all sections
        const sectionElement = tempDiv.querySelector('section');
        if (sectionElement) {
          if (!sectionElement.classList.contains('responsive-slide')) {
            sectionElement.classList.add('responsive-slide');
          }
          
          // Add viewport-aware class for better scaling
          sectionElement.classList.add('viewport-aware');
          
          // Add touch-friendly class for better mobile interaction
          sectionElement.classList.add('touch-friendly');
          
          // Ensure section has proper overflow settings
          sectionElement.style.overflowY = 'auto';
          sectionElement.style.overflowX = 'hidden';
          sectionElement.style.webkitOverflowScrolling = 'touch';
        }

        sectionContent = tempDiv.innerHTML;
        allSectionsContent += sectionContent;
      } catch (error) {
        console.error(`Error loading section ${section}:`, error);
      }
    }

    // Insert all sections into the container
    presentationContainer.innerHTML = allSectionsContent;

    // Initialize RevealJS after all content is loaded
    Reveal.initialize({
      controls: true,
      progress: true,
      center: true,
      hash: true,
      transition: 'slide', // Default transition, will be overridden by data-transition
      backgroundTransition: 'fade',
      transitionSpeed: 'default', // can be 'slow', 'default', or 'fast'
      width: '100%',
      height: '100%',
      margin: 0.04, // Increased margin for better content visibility
      minScale: 0.2, // More aggressive scaling for smaller screens
      maxScale: 2.0, // Allow more magnification for accessibility
      display: 'flex',
      viewDistance: 3,
      disableLayout: false,
      embedded: false,
      slideNumber: false,
      autoSlide: 0,
      mouseWheel: false,
      navigationMode: 'default',
      autoAnimateDuration: 0.8,
      autoAnimateEasing: 'ease-out',
      touch: true, // Enable touch navigation
      width: "100%", // Force width to 100%
      height: "100%", // Force height to 100%
      plugins: [RevealNotes, RevealHighlight],
      // Add responsive settings
      responsive: true,
      // Improve mobile experience
      hideInactiveCursor: 3000,
      previewLinks: false
    });

    // Apply special effects to code blocks if using highlight.js
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
    
    // Apply responsive fixes after initialization
    setTimeout(applyResponsiveFixes, 500);
  }
  
  // New function to apply responsive fixes after Reveal is initialized
  function applyResponsiveFixes() {
    // Fix for iOS Safari viewport issues
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    
    // Fix for mobile scrolling
    const allSlides = document.querySelectorAll('.reveal .slides section');
    allSlides.forEach(slide => {
      // Ensure slide can scroll vertically
      slide.style.overflowY = 'auto';
      slide.style.overflowX = 'hidden';
      slide.style.webkitOverflowScrolling = 'touch';
      
      // Add bottom padding for better scrolling
      slide.style.paddingBottom = '50px';
      
      // Ensure all content is visible
      const contentElements = slide.querySelectorAll('.container, .example-container, .grid');
      contentElements.forEach(el => {
        el.style.width = '100%';
        el.style.maxWidth = '100%';
        el.style.boxSizing = 'border-box';
      });
    });
    
    // Enable proper touch handling on mobile
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      document.body.classList.add('mobile-device');
      
      // Prevent Reveal.js from capturing touch events that should be used for scrolling
      allSlides.forEach(slide => {
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
      });
    }
  }

  loadSections();
});