// Load header and footer components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        
        // Set active navigation item after header is loaded
        if (elementId === 'header-placeholder') {
            setActiveNavItem();
        }
        
        return Promise.resolve();
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
        return Promise.reject(error);
    }
}

// Set active navigation item based on current page
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'concept1-heritage.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === currentPage || 
            (currentPage === 'concept1-heritage.html' && link.id === 'nav-home') ||
            (currentPage === 'about.html' && link.id === 'nav-about') ||
            (currentPage === 'scholarships.html' && link.id === 'nav-scholarships') ||
            (currentPage === 'events.html' && link.id === 'nav-events') ||
            (currentPage === 'gallery.html' && link.id === 'nav-gallery')) {
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
