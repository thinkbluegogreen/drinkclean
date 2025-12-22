/**
 * Navigation Smooth Scroll Enhancement
 * Handles smooth scrolling and active link highlighting
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        
        // ============================================
        // MOBILE MENU TOGGLE
        // ============================================
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                const isActive = navMenu.classList.contains('active');
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                if (!isActive) {
                    document.body.classList.add('menu-open');
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.classList.remove('menu-open');
                    document.body.style.overflow = '';
                }
            });
            
            // Close menu when clicking on a link
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    document.body.style.overflow = '';
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (navMenu.classList.contains('active') && 
                    !navToggle.contains(e.target) && 
                    !navMenu.contains(e.target)) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    document.body.style.overflow = '';
                }
            });
            
            // Close menu on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    document.body.style.overflow = '';
                }
            });
        }
        
        // Get all navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');
        
        // Smooth scroll behavior for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Only handle anchor links
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        const navHeight = document.querySelector('.header').offsetHeight;
                        const targetPosition = targetSection.offsetTop - navHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
        
        // Highlight active navigation link on scroll
        function updateActiveNavLink() {
            const scrollPosition = window.scrollY + 100; // Offset for better UX
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
        
        // Update active link on scroll
        window.addEventListener('scroll', updateActiveNavLink);
        
        // Initial call to set active link
        updateActiveNavLink();
        
        // ============================================
        // EXPANDABLE SCHOOL DETAILS FUNCTIONALITY
        // ============================================
        
        // Get all "View details" buttons
        const viewDetailsButtons = document.querySelectorAll('.btn-view-details');
        
        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', function() {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                const detailsId = this.getAttribute('aria-controls');
                const detailsElement = document.getElementById(detailsId);
                
                if (detailsElement) {
                    if (isExpanded) {
                        // Collapse: hide details
                        detailsElement.hidden = true;
                        this.setAttribute('aria-expanded', 'false');
                    } else {
                        // Expand: show details
                        detailsElement.hidden = false;
                        this.setAttribute('aria-expanded', 'true');
                    }
                }
            });
        });
        
        // ============================================
        // SECTION REVEAL ON SCROLL
        // Performance-focused using Intersection Observer
        // ============================================
        
        // Create Intersection Observer for section reveal animations
        const observerOptions = {
            threshold: 0.1, // Trigger when 10% of section is visible
            rootMargin: '0px 0px -50px 0px' // Trigger slightly before section enters viewport
        };
        
        const sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Unobserve after animation to improve performance
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all sections except hero (which should be visible immediately)
        const sectionsToObserve = document.querySelectorAll('.section:not(.section-hero)');
        sectionsToObserve.forEach(section => {
            sectionObserver.observe(section);
        });
        
        // ============================================
        // BUTTON HOVER FEEDBACK ENHANCEMENT
        // Adds subtle interactive feedback
        // ============================================
        
        // Get all buttons for enhanced hover feedback
        const allButtons = document.querySelectorAll('.btn, .btn-view-details, .social-link');
        
        allButtons.forEach(button => {
            // Add subtle scale effect on hover (already handled by CSS, but adding for consistency)
            button.addEventListener('mouseenter', function() {
                this.style.transition = 'all var(--transition-base)';
            });
            
            // Ensure smooth transitions
            button.addEventListener('mouseleave', function() {
                this.style.transition = 'all var(--transition-base)';
            });
        });
        
        // ============================================
        // SMOOTH SCROLLING ENHANCEMENT
        // Ensures smooth scrolling works across all browsers
        // ============================================
        
        // Enhanced smooth scroll for all anchor links (not just nav)
        const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
        
        allAnchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip empty hash or just #
                if (href === '#' || href === '') {
                    return;
                }
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    const navHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // ============================================
        // HERO IMAGE GALLERY AUTO-ROTATE
        // Rotates through home images on scroll/view
        // ============================================
        
        const galleryImages = document.querySelectorAll('.gallery-image');
        if (galleryImages.length > 0) {
            let currentImageIndex = 0;
            
            // Function to show next image
            function showNextImage() {
                // Remove active class from current image
                galleryImages[currentImageIndex].classList.remove('active');
                
                // Move to next image
                currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
                
                // Add active class to new image
                galleryImages[currentImageIndex].classList.add('active');
            }
            
            // Auto-rotate every 4 seconds
            setInterval(showNextImage, 4000);
            
            // Also rotate on scroll for better engagement
            let lastScrollTop = 0;
            window.addEventListener('scroll', function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const heroSection = document.querySelector('.section-hero');
                
                if (heroSection) {
                    const heroRect = heroSection.getBoundingClientRect();
                    // If hero is in view, rotate on scroll
                    if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
                        if (Math.abs(scrollTop - lastScrollTop) > 50) {
                            showNextImage();
                            lastScrollTop = scrollTop;
                        }
                    }
                }
            });
        }
        
        // ============================================
        // HEADER SCROLL EFFECT
        // ============================================
        
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // ============================================
        // PARALLAX EFFECT FOR HERO
        // ============================================
        
        const heroSection = document.querySelector('.section-hero');
        if (heroSection) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const heroContent = document.querySelector('.hero-content');
                const heroBackground = document.querySelector('.hero-background');
                
                if (heroContent && heroBackground && scrolled < window.innerHeight) {
                    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
            });
        }
    });
    
    // ============================================
    // DEVELOPER MODAL
    // ============================================
    
    const developerBtn = document.getElementById('developerBtn');
    const developerModal = document.getElementById('developerModal');
    const modalClose = document.getElementById('modalClose');
    
    if (developerBtn && developerModal && modalClose) {
        developerBtn.addEventListener('click', function() {
            developerModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        modalClose.addEventListener('click', function() {
            developerModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        developerModal.addEventListener('click', function(e) {
            if (e.target === developerModal) {
                developerModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && developerModal.classList.contains('active')) {
                developerModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
})();

