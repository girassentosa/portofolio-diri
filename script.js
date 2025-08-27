// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Show/hide scroll to top button
const scrollTopButton = document.getElementById('scroll-to-top');

if (scrollTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopButton.classList.add('show');
        } else {
            scrollTopButton.classList.remove('show');
        }
    });

    scrollTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Hero section animation on scroll
const heroSection = document.getElementById('hero');
const heroContent = document.querySelector('.hero-content');

if (heroSection && heroContent && 'IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heroContent.classList.add('hero-content-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });

    heroObserver.observe(heroSection);
}

// General section animation on scroll (exclude hero)
if ('IntersectionObserver' in window) {
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.id !== 'hero') {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.15 });

    sections.forEach(section => {
        if (section.id !== 'hero') {
            sectionObserver.observe(section);
        }
    });
}

// (Removed) Legacy testimonial modal/rendering not used by current UI