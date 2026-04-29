async function loadLinks() {
    try {
        const response = await fetch('links.json');
        const data = await response.json();
        const container = document.getElementById('categories');

        data.forEach(section => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'flex flex-col';
            
            let linksHTML = `
                <h2 class="text-[11px] uppercase tracking-[0.25em] text-[#565f89] font-bold mb-6 flex items-center">
                    <span class="w-8 h-[1px] bg-[#565f89] mr-3"></span>
                    ${section.category}
                </h2>
                <div class="space-y-3">
            `;

            section.links.forEach(link => {
                // Determine icon: Use custom icon or Google's high-res favicon API
                const iconSrc = link.icon ? link.icon : `https://www.google.com/s2/favicons?sz=128&domain=${new URL(link.url).hostname}`;
                
                linksHTML += `
                    <a href="${link.url}" class="link-card glass flex items-center p-4 rounded-xl group">
                        <div class="w-10 h-10 flex items-center justify-center mr-4 bg-[#1a1b26]/50 rounded-lg">
                            <img src="${iconSrc}" class="w-5 h-5 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" alt="">
                        </div>
                        <span class="text-sm font-medium tracking-wide text-[#a9b1d6] group-hover:text-white transition-colors">
                            ${link.name}
                        </span>
                    </a>
                `;
            });

            linksHTML += `</div>`;
            categoryDiv.innerHTML = linksHTML;
            container.appendChild(categoryDiv);
        });
    } catch (error) {
        console.error("Error loading JSON. Make sure links.json is valid.", error);
    }
}

function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
});
    
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    document.getElementById('date').textContent = now.toLocaleDateString('en-US', options);
}

loadLinks();
setInterval(updateClock, 1000);
updateClock();
