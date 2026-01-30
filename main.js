console.log("Gator Landing Page Initialized");

document.addEventListener('DOMContentLoaded', () => {

    // --- Showreel Logic ---
    const reelItems = document.querySelectorAll('.reel-item');
    const captionEl = document.getElementById('active-caption');
    let currentIndex = 0;

    function updateShowreel() {
        reelItems.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add('active');
                // Update caption
                if (captionEl) {
                    captionEl.style.opacity = '0';
                    setTimeout(() => {
                        captionEl.textContent = item.dataset.caption;
                        captionEl.style.opacity = '1';
                    }, 200);
                }
            } else {
                item.classList.remove('active');
            }
        });
    }

    if (reelItems.length > 0) {
        // Init
        updateShowreel();

        // Auto-play Logic
        let autoPlayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % reelItems.length;
            updateShowreel();
        }, 3000); // 3 seconds

        const resetAutoPlay = () => {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % reelItems.length;
                updateShowreel();
            }, 3000);
        };




    }

    // --- Colorway Logic ---
    const swatches = document.querySelectorAll('.color-swatch');
    const colorName = document.getElementById('color-name');
    const previewBox = document.getElementById('color-preview-box');

    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            // Remove active class from all
            swatches.forEach(s => s.classList.remove('active'));
            // Add to clicked
            swatch.classList.add('active');

            // Update text
            const colorKey = swatch.dataset.color; // e.g., 'swamp-green'
            const formattedName = colorKey.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            colorName.textContent = formattedName;

            // Update preview color (simulated image change)
            if (colorKey === 'swamp-green') {
                previewBox.style.backgroundImage = "url('assets/gator-swamp-green.png')";
                previewBox.style.backgroundColor = 'transparent';
            } else if (colorKey === 'mud-brown') {
                previewBox.style.backgroundImage = "url('assets/gator-mud-brown.png')";
                previewBox.style.backgroundColor = 'transparent';
            } else if (colorKey === 'sand-yellow') {
                previewBox.style.backgroundImage = "url('assets/gator-sand-yellow.png')";
                previewBox.style.backgroundColor = 'transparent';
            } else {
                previewBox.style.backgroundImage = 'none';
                previewBox.style.backgroundColor = swatch.style.backgroundColor;
            }
        });
    });

    // --- Scroll Animations ---
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            } else {
                // Optional: remove class to re-animate
                // reveal.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once to check initial state
    revealOnScroll();

});
