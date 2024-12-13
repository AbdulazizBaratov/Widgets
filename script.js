document.addEventListener('DOMContentLoaded', () => {
    // Existing smooth scrolling and tab switching code remains the same...

        newWidgetSection.innerHTML = `
            <h3>${widgetName}</h3>
            <div class="widget-preview">
                <div class="custom-widget placeholder-widget">
                    <img src="/api/placeholder/400/200" alt="${widgetName} Widget Placeholder">
                </div>
            </div>
            <div class="widget-code">
                <div class="code-tabs">
                    <button class="active html-tab" data-tab="html">HTML</button>
                    <button class="css-tab" data-tab="css">CSS</button>
                </div>
                <pre class="html-code active"><code>${widgetHtml.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
                <pre class="css-code"><code>${widgetCss}</code></pre>
                <div class="copy-buttons">
                    <button class="copy-html">Copy HTML</button>
                    <button class="copy-css">Copy CSS</button>
                </div>
            </div>
        `;

        // Add styles to head
        const styleTag = document.createElement('style');
        styleTag.textContent = widgetCss;
        document.head.appendChild(styleTag);

        // Insert before the "Add New Widget" button
        const addWidgetSection = document.querySelector('.add-widget-section');
        widgetContainer.insertBefore(newWidgetSection, addWidgetSection);

        // Reset and close modal
        newWidgetForm.reset();
        newWidgetModal.style.display = 'none';

        // Re-initialize copy and tab switching for new widget
        initWidgetSections(newWidgetSection);
    });

    // Initialize existing and new widget sections
    function initWidgetSections(section = document) {
        section.querySelectorAll('.widget-section').forEach(section => {
            const htmlTab = section.querySelector('.html-tab');
            const cssTab = section.querySelector('.css-tab');
            const htmlCode = section.querySelector('.html-code');
            const cssCode = section.querySelector('.css-code');
            
            htmlTab.addEventListener('click', () => {
                htmlTab.classList.add('active');
                cssTab.classList.remove('active');
                htmlCode.classList.add('active');
                cssCode.classList.remove('active');
            });

            cssTab.addEventListener('click', () => {
                cssTab.classList.add('active');
                htmlTab.classList.remove('active');
                cssCode.classList.add('active');
                htmlCode.classList.remove('active');
            });

            // Copy Functionality
            const copyButtons = section.querySelectorAll('.copy-buttons button');
            copyButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const isHtml = button.classList.contains('copy-html');
                    const codeElement = isHtml 
                        ? section.querySelector('.html-code code')
                        : section.querySelector('.css-code code');
                    
                    // Create a temporary textarea to copy text
                    const tempTextArea = document.createElement('textarea');
                    tempTextArea.value = codeElement.textContent;
                    document.body.appendChild(tempTextArea);
                    tempTextArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(tempTextArea);

                    // Temporary visual feedback
                    button.textContent = 'Copied!';
                    button.style.backgroundColor = '#4CAF50';
                    setTimeout(() => {
                        button.textContent = isHtml ? 'Copy HTML' : 'Copy CSS';
                        button.style.backgroundColor = '#ff6600';
                    }, 2000);
                });
            });
        });
    }

    // Initialize existing widget sections
    initWidgetSections();

    // Existing newsletter button interaction
    const newsletterButton = document.querySelector('.newsletter-widget button');
    if (newsletterButton) {
        newsletterButton.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Thank you for subscribing! (Note: This is a demo)');
        });
    }