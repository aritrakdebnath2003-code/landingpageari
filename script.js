// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Colorway Selector Logic
    const swatches = document.querySelectorAll('.color-swatch');
    const previewBox = document.querySelector('.colorway-preview');

    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            // Remove active class from all
            swatches.forEach(s => s.classList.remove('active'));
            // Add active to clicked
            swatch.classList.add('active');

            // Update preview color
            const color = swatch.style.backgroundColor;
            previewBox.style.backgroundColor = color;

            // In a real app, this would swap the image source
            // previewImage.src = `assets/gator-${swatch.dataset.color}.png`;
        });
    });

    // Drag Scroll Logic
    const enableDragScroll = (element) => {
        let isDown = false;
        let startX;
        let scrollLeft;

        element.addEventListener('mousedown', (e) => {
            isDown = true;
            element.classList.add('active');
            startX = e.pageX - element.offsetLeft;
            scrollLeft = element.scrollLeft;
        });
        element.addEventListener('mouseleave', () => {
            isDown = false;
            element.classList.remove('active');
        });
        element.addEventListener('mouseup', () => {
            isDown = false;
            element.classList.remove('active');
        });
        element.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - element.offsetLeft;
            const walk = (x - startX) * 2;
            element.scrollLeft = scrollLeft - walk;
        });
    };

    const featuresCarousel = document.getElementById('features-carousel');
    const galleryCarousel = document.getElementById('gallery-carousel');

    if (featuresCarousel) enableDragScroll(featuresCarousel);
    if (galleryCarousel) enableDragScroll(galleryCarousel);

    // Focus / Blur Logic
    const updateFocus = (container, itemSelector) => {
        const center = container.scrollLeft + (container.offsetWidth / 2);
        const items = container.querySelectorAll(itemSelector);

        items.forEach(item => {
            const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
            const distance = Math.abs(center - itemCenter);

            // If distance is less than half the item width, it's roughly in center
            if (distance < item.offsetWidth / 2 + 20) {
                item.classList.add('in-focus');
            } else {
                item.classList.remove('in-focus');
            }
        });
    };

    // Attach scroll listeners for focus
    if (featuresCarousel) {
        featuresCarousel.addEventListener('scroll', () => updateFocus(featuresCarousel, '.carousel-card'));
        // Initial call
        setTimeout(() => updateFocus(featuresCarousel, '.carousel-card'), 100);
    }
    if (galleryCarousel) {
        galleryCarousel.addEventListener('scroll', () => updateFocus(galleryCarousel, '.gallery-item'));
        setTimeout(() => updateFocus(galleryCarousel, '.gallery-item'), 100);
    }

    // Arrow Buttons Logic
    document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
        const container = wrapper.querySelector('.carousel-container, .gallery-carousel');
        const prevBtn = wrapper.querySelector('.prev');
        const nextBtn = wrapper.querySelector('.next');

        if (container && prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                const cardWidth = container.querySelector('.carousel-card, .gallery-item').offsetWidth;
                container.scrollBy({ left: -(cardWidth + 40), behavior: 'smooth' });
            });
            nextBtn.addEventListener('click', () => {
                const cardWidth = container.querySelector('.carousel-card, .gallery-item').offsetWidth;
                container.scrollBy({ left: (cardWidth + 40), behavior: 'smooth' });
            });
        }
    });

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
});
