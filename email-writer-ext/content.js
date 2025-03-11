console.log("Email Writer Extension - content script loaded");

function createAIButton() {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji ao0 v7 T-I-atl L3';
    button.style.marginRight = '8px';
    button.innerHTML = 'AI Reply';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI Reply');
    return button;
}

function getEmailContent() {
    const selectors = [
        'h7',
        '.a3s.aiL',
        '#gmail_quote',
        '[role="presentation"]'
    ];
    
    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content) {
            return content.innerText.trim();
        }
    }
    return ''; // Moved this outside the loop
}

function findComposeToolbar() {
    const selectors = [
        '.btC',
        '.aDH',
        '[role="toolbar"]',
        '.gU.Up'
    ];
    
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) {
            return toolbar; // Return only if toolbar is found
        }
    }
    return null;
}

function injectButton() {
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) existingButton.remove();

    const toolbar = findComposeToolbar();
    if (!toolbar) { // Fix: Correct condition
        console.log("Toolbar Not Found");
        return;
    }

    console.log("Toolbar Found. Creating AI Button");
    const button = createAIButton();
    button.classList.add('ai-reply-button');

    button.addEventListener('click', async () => {
        try {
            button.innerHTML = 'Generating...';
            button.disabled = true;

            const emailContent = getEmailContent();
            const response = await fetch('http://localhost:8080/api/email/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailContent: emailContent,
                    tone: "professional"
                })
            });
         if(!response.ok){
         throw new Error('API Request Failed');
         }
        const generatedReply= await response.text();
        const composebox=document.querySelector('[role="textbox"][g_editable="true"]');
        if(composebox){
            composebox.focus();
            document.execCommand('insertText',false,generatedReply);
        }else{
            console.error('Compose Box was not found');
        }
        } catch (error) {
            console.error("Error generating AI reply:", error);
        }finally{
            button.innerHTML='AI Reply';
            button.disabled=false;
        }
    });

    toolbar.insertBefore(button, toolbar.firstChild); // Fix: Corrected function name
}

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElements = addedNodes.some(node =>
            node.nodeType === Node.ELEMENT_NODE && 
            node instanceof Element && 
            (node.matches('.aDH, .btC, [role="dialog"]') || node.querySelector('.aDH, .btC, [role="dialog"]'))
        );

        if (hasComposeElements) {
            console.log("Compose Window Detected");
            setTimeout(injectButton, 500);
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
