function isAtBottom() {
    return (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
}

function promptUser(items) {
    let format = '';
    items.forEach(item => format += `<a href='${item}'>${item}</a><br>`);

    document.write(`<html style='font-family: sans-serif'><head><title>Your Repl Files</title></head><body><h1>Success!</h1><br><h3>Your Replit files have been successfully fetched.</h3><button onclick="downloadAll();">Download All</button><br><br><br>${format}</body></html>`);

    const script = document.createElement('script');
    script.textContent = `
        function downloadAll() {
            const items = ${JSON.stringify(items)};
            
            items.forEach(item => window.open(item));
        }
    `;
    document.body.appendChild(script);
}

function finishSetup() {
    let items = [];
    console.log('Process complete! Fetching all Repls...');
    
    document.querySelectorAll('.css-ow5df0 a').forEach(element => {
        let currentHref = new URL(element.href);
        currentHref.search = '';
        let newHref = currentHref.toString() + '.zip';

        items.push(newHref);
    });

    promptUser(items);
}

function scrollToBottom() {
    const scrollSpeed = 300;
    
    function performScroll() {
        window.scrollBy(0, scrollSpeed);
        
        if (isAtBottom()) {
            console.log('Checking if any more Repls are available...');
            
            setTimeout(function() {
                if(isAtBottom() && !document.querySelector('.load-more-spinner')) {
                    // this will run if they're still at the bottom after 2 seconds and the page is not loading (meaning it's complete, i know i know, it's not the most reliable thing ever but I don't have a choice)
                    finishSetup();
                } else {
                    requestAnimationFrame(performScroll);
                }
            }, 2000);
        } else {
            requestAnimationFrame(performScroll);
        }
    }
    
    requestAnimationFrame(performScroll);
}

console.clear();
scrollToBottom();