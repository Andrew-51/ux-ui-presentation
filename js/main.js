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
    'sections/responsive/responsive-2.html',
    'sections/responsive/responsive-demo.html',
    'sections/responsive/typography.html',
    'sections/responsive/cognitive-load.html',
    'sections/responsive/gestures.html',
    'sections/responsive/gestures-2.html',
    'sections/responsive/gestures-3.html',
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
    'sections/accessibility/screen-readers.html',
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
      minScale: 0.3, // More conservative scaling to maintain readability
      maxScale: 1.5, // Prevent too much magnification
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
      width: "100%", // Force width to 100%
      height: "100%", // Force height to 100%
      plugins: [RevealNotes, RevealHighlight]
    });

    // Apply special effects to code blocks if using highlight.js
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }

  loadSections();
});