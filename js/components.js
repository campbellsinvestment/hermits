// Load header and footer components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        let html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        
        // Fix component links based on page location
        if (elementId === 'footer-placeholder') {
            fixFooterLinks();
        }

        if (elementId === 'header-placeholder') {
            fixHeaderLinks();
            setActiveNavItem();
        }
        
        return Promise.resolve();
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
        return Promise.reject(error);
    }
}

const ROUTE_SLUGS = ['about', 'scholarships', 'events', 'gallery', 'donate', 'privacy-terms'];

function getCurrentRoute() {
    const path = window.location.pathname.replace(/\/+$/, '');
    const parts = path.split('/').filter(Boolean);
    for (let i = parts.length - 1; i >= 0; i--) {
        if (ROUTE_SLUGS.includes(parts[i])) {
            return parts[i];
        }
    }

    return 'home';
}

function isNestedRoute() {
    const path = window.location.pathname.replace(/\/+$/, '');
    const parts = path.split('/').filter(Boolean);

    if (parts.length === 0) {
        return false;
    }

    if (parts.length === 1 && parts[0] === 'index.html') {
        return false;
    }

    return true;
}

function isLocalRouteLink(href) {
    return href &&
        !href.startsWith('http') &&
        !href.startsWith('mailto:') &&
        !href.startsWith('tel:') &&
        !href.startsWith('#') &&
        !href.startsWith('javascript:') &&
        !href.startsWith('/');
}

function fixLinks(selector) {
    const nested = isNestedRoute();
    const links = document.querySelectorAll(selector);

    links.forEach(link => {
        const href = link.getAttribute('href');
        if (!isLocalRouteLink(href)) {
            return;
        }

        if (!nested) {
            if (href.startsWith('../')) {
                link.setAttribute('href', href.replace('../', ''));
            }
            return;
        }

        if (href === './') {
            link.setAttribute('href', '../');
            return;
        }

        if (!href.startsWith('../')) {
            link.setAttribute('href', `../${href}`);
        }
    });
}

function fixFooterLinks() {
    fixLinks('.footer a');
}

function fixHeaderLinks() {
    fixLinks('.nav-menu a, .logo-section a, .mobile-donate-btn');
}

// Set active navigation item based on current page
function setActiveNavItem() {
    const route = getCurrentRoute();
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');

        if ((route === 'home' && link.id === 'nav-home') ||
            (route === 'about' && link.id === 'nav-about') ||
            (route === 'scholarships' && link.id === 'nav-scholarships') ||
            (route === 'events' && link.id === 'nav-events') ||
            (route === 'gallery' && link.id === 'nav-gallery') ||
            (route === 'donate' && link.classList.contains('nav-cta'))) {
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

// Determine component path based on current page location
function getComponentPath(componentName) {
    const path = window.location.pathname.replace(/\/+$/, '');
    const parts = path.split('/').filter(Boolean);

    if (parts[parts.length - 1] === 'index.html') {
        parts.pop();
    }

    const depth = parts.length;
    const prefix = depth > 0 ? '../'.repeat(depth) : '';
    return `${prefix}components/${componentName}`;
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const headerPath = getComponentPath('header.html');
    const footerPath = getComponentPath('footer.html');
    
    loadComponent('header-placeholder', headerPath).then(() => {
        // Initialize mobile menu after header is loaded
        setTimeout(initMobileMenu, 100);
    });
    loadComponent('footer-placeholder', footerPath);
});
