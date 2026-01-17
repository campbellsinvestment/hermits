// Load header and footer components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        let html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        
        // Fix footer links based on page location
        if (elementId === 'footer-placeholder') {
            fixFooterLinks();
        }
        
        // Fix header links based on page location
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

// Fix footer links to work from current page location
function fixFooterLinks() {
    const currentPath = window.location.pathname;
    const isInDesignsFolder = currentPath.includes('/designs/') || currentPath.endsWith('/designs/');
    const footerLinks = document.querySelectorAll('.footer a[href^="designs/"]');
    
    if (isInDesignsFolder) {
        // Remove "designs/" prefix for pages in designs folder
        footerLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href.startsWith('designs/')) {
                link.setAttribute('href', href.replace('designs/', ''));
            }
        });
    }
    // If in root, keep "designs/" prefix (already correct)
}

// Fix header links to work from current page location
function fixHeaderLinks() {
    const currentPath = window.location.pathname;
    const isInDesignsFolder = currentPath.includes('/designs/') || currentPath.endsWith('/designs/');
    const headerLinks = document.querySelectorAll('.nav-menu a, .logo-section a');
    
    if (isInDesignsFolder) {
        headerLinks.forEach(link => {
            const href = link.getAttribute('href');
            // Fix home link
            if (href === 'index.html') {
                link.setAttribute('href', '../index.html');
            }
            // Fix other page links (remove designs/ prefix)
            else if (href.startsWith('designs/')) {
                link.setAttribute('href', href.replace('designs/', ''));
            }
        });
    }
    // If in root, links are already correct
}

// Set active navigation item based on current page
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Check if current page matches the link
        if (href === currentPage || 
            (currentPage === 'index.html' && link.id === 'nav-home') ||
            (currentPage === 'about.html' && link.id === 'nav-about') ||
            (currentPage === 'scholarships.html' && link.id === 'nav-scholarships') ||
            (currentPage === 'events.html' && link.id === 'nav-events') ||
            (currentPage === 'gallery.html' && link.id === 'nav-gallery') ||
            (currentPage === 'donate.html' && link.classList.contains('nav-cta'))) {
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
    const currentPath = window.location.pathname;
    // If we're in the root (index.html), use root-relative paths
    // If we're in designs/ folder, use parent-relative paths
    if (currentPath.includes('/designs/') || currentPath.endsWith('/designs/')) {
        return `../components/${componentName}`;
    } else {
        return `components/${componentName}`;
    }
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
