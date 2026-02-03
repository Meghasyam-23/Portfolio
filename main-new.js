/* ============================================================================
   MEGHASYAM PEDDIREDDY PORTFOLIO
   JavaScript for Interactions and Animations
   ============================================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSmoothScroll();
    initScrollAnimations();
    initHoverEffects();
});

/* ============================================================================
   NAVIGATION
   ============================================================================ */

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Mark current page as active
        if (currentPath === href || 
            (currentPath === '/' && href === '/') ||
            (currentPath.startsWith('/projects') && href === '/projects.html')) {
            link.classList.add('active');
        }
    });

    // Smooth scroll for hash links in navigation
    navLinks.forEach(link => {
        if (link.getAttribute('href')?.startsWith('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed header
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

/* ============================================================================
   SMOOTH SCROLL
   ============================================================================ */

function initSmoothScroll() {
    // Smooth scroll for anchor links throughout the page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for hash links
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/* ============================================================================
   SCROLL ANIMATIONS
   ============================================================================ */

function initScrollAnimations() {
    // Intersection Observer for fade-in animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                entry.target.style.animationDelay = `${index * 0.1}s`;
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('.project-section, .project-card, .role-card, .lesson-card, .project-item').forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

/* ============================================================================
   HOVER EFFECTS
   ============================================================================ */

function initHoverEffects() {
    // Subtle scale effect on card hover
    const cards = document.querySelectorAll('.project-card, .role-card, .lesson-card, .result-card, .link-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Already handled by CSS transitions
        });

        card.addEventListener('mouseleave', () => {
            // Already handled by CSS transitions
        });
    });

    // Cursor tracking for interactive elements (optional enhancement)
    initCursorTracking();
}

/* ============================================================================
   CURSOR TRACKING (Optional Enhancement)
   ============================================================================ */

function initCursorTracking() {
    const interactiveElements = document.querySelectorAll('a, button, .project-card');
    
    document.addEventListener('mousemove', (e) => {
        interactiveElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Store position for potential CSS effects
            el.style.setProperty('--mouse-x', x + 'px');
            el.style.setProperty('--mouse-y', y + 'px');
        });
    });
}

/* ============================================================================
   PAGE TRANSITION ANIMATIONS
   ============================================================================ */

function initPageTransitions() {
    // Add fade-out animation when clicking external links
    const links = document.querySelectorAll('a');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only animate for internal navigation
            if (href && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel')) {
                // Add animation class
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease-out';
            }
        });
    });

    // Fade in on page load
    window.addEventListener('pageshow', () => {
        document.body.style.opacity = '1';
    });
}

/* ============================================================================
   SECTION INTERSECTION FOR DYNAMIC BACKGROUND
   ============================================================================ */

function initDynamicBackground() {
    const sections = document.querySelectorAll('.project-section, .featured-projects, .experience, .about');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bgColor = window.getComputedStyle(entry.target).backgroundColor;
                // Could be used for dynamic background changes
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
}

/* ============================================================================
   PROJECT CARDS - FOCUS MANAGEMENT
   ============================================================================ */

function initProjectCardFocus() {
    const projectCards = document.querySelectorAll('.project-card, .project-preview-card');
    
    projectCards.forEach(card => {
        // Enhanced keyboard navigation
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

/* ============================================================================
   LAZY LOADING FOR IMAGES
   ============================================================================ */

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

/* ============================================================================
   MOBILE MENU HANDLING
   ============================================================================ */

function initMobileMenu() {
    // Handle mobile navigation if needed
    const nav = document.querySelector('.nav');
    
    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            // Mobile menu handling logic here if needed
        });
    });
}

/* ============================================================================
   SCROLL TO TOP
   ============================================================================ */

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

/* ============================================================================
   PERFORMANCE MONITORING
   ============================================================================ */

function initPerformanceMonitoring() {
    if ('PerformanceObserver' in window) {
        // Monitor page performance
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                // Log performance data if needed
            }
        });

        observer.observe({ entryTypes: ['navigation', 'resource', 'paint'] });
    }
}

/* ============================================================================
   KEYBOARD NAVIGATION
   ============================================================================ */

function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Skip to main content on Ctrl/Cmd + Shift + M
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'M') {
            const main = document.querySelector('main');
            if (main) main.focus();
        }

        // Quick navigation
        if (e.key === '/') {
            // Could implement quick search here
        }
    });
}

/* ============================================================================
   INITIALIZE ALL
   ============================================================================ */

// Call all initialization functions
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