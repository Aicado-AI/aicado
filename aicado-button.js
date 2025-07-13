;(function() {
    // Select all trigger elements
    const triggers = document.querySelectorAll('.aicado-button-trigger');
  
    triggers.forEach(el => {
      // Read required attributes from the placeholder
      const src        = el.dataset.iframeSrc;
      const label      = el.dataset.label      || 'Open';
      const opts       = {
        bgColor    : el.dataset.bgColor,
        hoverColor : el.dataset.hoverColor,
        fontSize   : el.dataset.fontSize,
        fontFamily : el.dataset.fontFamily
      };
      const btnWeight   = el.dataset.fontWeight;
      const padX        = el.dataset.paddingX;   // horizontal padding
      const padY        = el.dataset.paddingY;   // vertical padding
  
      // Create the actual button element
      const btn = document.createElement('button');
      btn.className   = 'aicado-button';
      btn.textContent = label;
  
      // Apply custom style properties using CSS variables
      Object.entries(opts).forEach(([key, val]) => {
        if (!val) return;
        const varMap = {
          bgColor:    '--mw-bg',
          hoverColor: '--mw-hover-bg',
          fontSize:   '--mw-font-size',
          fontFamily: '--mw-font-family'
        };
        btn.style.setProperty(varMap[key], val);
      });
  
      // Apply font weight and padding if provided
      if (btnWeight) btn.style.fontWeight = btnWeight;
      if (padX) {
        btn.style.paddingLeft  = padX;
        btn.style.paddingRight = padX;
      }
      if (padY) {
        btn.style.paddingTop    = padY;
        btn.style.paddingBottom = padY;
      }
  
      // Attach click event to open the popup
      btn.addEventListener('click', () => {
        // Create overlay to cover the viewport
        const overlay = document.createElement('div');
        overlay.className = 'aicadoEmbedBtn-overlay';
  
        // Create modal container
        const modal = document.createElement('div');
        modal.className = 'aicadoEmbedBtn-modal';
  
        // Spinner displayed while iframe is loading
        const spinner = document.createElement('div');
        spinner.className = 'aicadoEmbedBtn-spinner';
        modal.appendChild(spinner);
  
        // Create and configure iframe
        const iframe = document.createElement('iframe');
        iframe.src             = src;
        iframe.allowFullscreen = true;
        iframe.style.width     = '100%';
        iframe.style.height    = '100%';
        // Remove spinner once iframe content has loaded
        iframe.addEventListener('load', () => spinner.remove());
        modal.appendChild(iframe);
  
        // Create close button for the popup
        const closeBtn = document.createElement('button');
        closeBtn.className = 'aicadoEmbedBtn-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => document.body.removeChild(overlay));
  
        // Build and insert DOM structure
        overlay.appendChild(modal);
        overlay.appendChild(closeBtn);
        document.body.appendChild(overlay);
      });
  
      // Replace the placeholder element with the configured button
      el.replaceWith(btn);
    });
  })();
  