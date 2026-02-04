document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSmoothScroll();
    initScrollAnimations();
    initHoverEffects();
    initScrollProgress();
    initActiveNavOnScroll();
});

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (currentPath === href || 
            (currentPath === '/' && href === '/') ||
            (currentPath.startsWith('/projects') && href === '/projects.html')) {
            link.classList.add('active');
        }
    });

    navLinks.forEach(link => {
        if (link.getAttribute('href')?.startsWith('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    window.history.pushState(null, null, targetId);
                }
            });
        }
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${index * 0.1}s`;
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-section, .project-card, .role-card, .lesson-card, .project-item').forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

function initHoverEffects() {
    const cards = document.querySelectorAll('.project-card, .role-card, .lesson-card, .result-card, .link-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
        });

        card.addEventListener('mouseleave', () => {
        });
    });

    initCursorTracking();
}

function initCursorTracking() {
    const interactiveElements = document.querySelectorAll('a, button, .project-card');
    
    document.addEventListener('mousemove', (e) => {
        interactiveElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            el.style.setProperty('--mouse-x', x + 'px');
            el.style.setProperty('--mouse-y', y + 'px');
        });
    });
}

function initPageTransitions() {
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Skip anchor links, external links, and special protocols
            if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel')) {
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease-out';
            }
        });
    });

    window.addEventListener('pageshow', () => {
        document.body.style.opacity = '1';
    });
}

function initDynamicBackground() {
    const sections = document.querySelectorAll('.project-section, .featured-projects, .experience, .about');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bgColor = window.getComputedStyle(entry.target).backgroundColor;
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
}

function initProjectCardFocus() {
    const projectCards = document.querySelectorAll('.project-card, .project-preview-card');
    
    projectCards.forEach(card => {
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const link = card.getAttribute('href');
                if (link) {
                    window.location.href = link;
                }
            }
        });
    });
}

function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

function initMobileMenu() {
    const nav = document.querySelector('.nav');
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
        });
    });
}

function initScrollToTop() {
    const scrollTopButton = document.createElement('button');
    scrollTopButton.textContent = '↑';
    scrollTopButton.className = 'scroll-to-top';
    scrollTopButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 0.375rem;
        background-color: var(--color-primary);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease-out;
        font-size: 1.25rem;
        font-weight: 600;
        z-index: 50;
    `;

    document.body.appendChild(scrollTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopButton.style.opacity = '1';
            scrollTopButton.style.pointerEvents = 'auto';
        } else {
            scrollTopButton.style.opacity = '0';
            scrollTopButton.style.pointerEvents = 'none';
        }
    });

    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initPerformanceMonitoring() {
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
            }
        });

        observer.observe({ entryTypes: ['navigation', 'resource', 'paint'] });
    }
}

function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'M') {
            const main = document.querySelector('main');
            if (main) main.focus();
        }

        if (e.key === '/') {
        }
    });
}

initNavigation();
initSmoothScroll();
initScrollAnimations();
initHoverEffects();
initPageTransitions();
initDynamicBackground();
initProjectCardFocus();
initLazyLoading();
initMobileMenu();
initScrollToTop();
initPerformanceMonitoring();
initKeyboardNavigation();
initScrollProgress();
initActiveNavOnScroll();

// Scroll Progress Bar & Header Effect
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    const header = document.getElementById('mainHeader');

    if (!progressBar) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = (scrollTop / docHeight) * 100;

                progressBar.style.width = scrollPercent + '%';

                // Header scroll effect
                if (header) {
                    if (scrollTop > 50) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                }

                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// Active Navigation on Scroll (Scrollspy)
function initActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .nav-links a[href^="/#"]');

    if (sections.length === 0 || navLinks.length === 0) return;

    let ticking = false;

    function updateActiveNav() {
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href === '#' + sectionId || href === '/#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Initial call
    updateActiveNav();
}