// Load header and footer components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        
        // Set active navigation item after header is loaded
        if (elementId === 'header-placeholder') {
            updateNavLinksForTheme();
            setActiveNavItem();
        }
        
        // Update footer links for storytelling theme
        if (elementId === 'footer-placeholder') {
            updateFooterLinksForTheme();
            // Also update footer-bottom links
            const footerBottomLinks = document.querySelectorAll('.footer-bottom a');
            footerBottomLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === 'privacy-terms.html' && document.body.classList.contains('storytelling-theme')) {
                    link.setAttribute('href', 'privacy-terms-storytelling.html');
                }
            });
        }
        
        return Promise.resolve();
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
        return Promise.reject(error);
    }
}

// Update navigation links based on theme
function updateNavLinksForTheme() {
    const isStorytelling = document.body.classList.contains('storytelling-theme');
    
    if (isStorytelling) {
        const navLinks = document.querySelectorAll('.nav-menu a');
        const logoLink = document.querySelector('.logo-section a');
        
        // Update logo link
        if (logoLink) {
            logoLink.setAttribute('href', 'concept3-storytelling.html');
        }
        
        // Update navigation links
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const id = link.getAttribute('id');
            
            if (id === 'nav-home') {
                link.setAttribute('href', 'concept3-storytelling.html');
            } else if (id === 'nav-about') {
                link.setAttribute('href', 'about-storytelling.html');
            } else if (id === 'nav-scholarships') {
                link.setAttribute('href', 'scholarships-storytelling.html');
            } else if (id === 'nav-events') {
                link.setAttribute('href', 'events-storytelling.html');
            } else if (id === 'nav-gallery') {
                link.setAttribute('href', 'gallery-storytelling.html');
            } else if (link.classList.contains('nav-cta')) {
                link.setAttribute('href', 'donate-storytelling.html');
            }
        });
    }
}

// Update footer links based on theme
function updateFooterLinksForTheme() {
    const isStorytelling = document.body.classList.contains('storytelling-theme');
    
    if (isStorytelling) {
        const footerLinks = document.querySelectorAll('.footer a');
        
        footerLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            if (href === 'about.html') {
                link.setAttribute('href', 'about-storytelling.html');
            } else if (href === 'scholarships.html') {
                link.setAttribute('href', 'scholarships-storytelling.html');
            } else if (href === 'events.html') {
                link.setAttribute('href', 'events-storytelling.html');
            } else if (href === 'gallery.html') {
                link.setAttribute('href', 'gallery-storytelling.html');
            } else if (href === 'donate.html') {
                link.setAttribute('href', 'donate-storytelling.html');
            } else if (href === 'privacy-terms.html') {
                link.setAttribute('href', 'privacy-terms-storytelling.html');
            }
        });
    }
}

// Set active navigation item based on current page
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'concept1-heritage.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        const isStorytelling = document.body.classList.contains('storytelling-theme');
        
        if (href === currentPage || 
            (currentPage === 'concept1-heritage.html' && link.id === 'nav-home' && !isStorytelling) ||
            (currentPage === 'concept3-storytelling.html' && link.id === 'nav-home' && isStorytelling) ||
            (currentPage === 'about.html' && link.id === 'nav-about' && !isStorytelling) ||
            (currentPage === 'about-storytelling.html' && link.id === 'nav-about' && isStorytelling) ||
            (currentPage === 'scholarships.html' && link.id === 'nav-scholarships' && !isStorytelling) ||
            (currentPage === 'scholarships-storytelling.html' && link.id === 'nav-scholarships' && isStorytelling) ||
            (currentPage === 'events.html' && link.id === 'nav-events' && !isStorytelling) ||
            (currentPage === 'events-storytelling.html' && link.id === 'nav-events' && isStorytelling) ||
            (currentPage === 'gallery.html' && link.id === 'nav-gallery' && !isStorytelling) ||
            (currentPage === 'gallery-storytelling.html' && link.id === 'nav-gallery' && isStorytelling)) {
            link.classList.add('active');
        }
    });
}

// Mobile menu toggle functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                if (navMenu.classList.contains('active')) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    navMenu.classList.remove('active');
                }
            }
        });
    }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadComponent('header-placeholder', '../components/header.html').then(() => {
        // Initialize mobile menu after header is loaded
        setTimeout(initMobileMenu, 100);
    });
    loadComponent('footer-placeholder', '../components/footer.html');
});
