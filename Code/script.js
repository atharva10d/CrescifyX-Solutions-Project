/**
 * ==========================================
 * 1. SMART NAVBAR SCROLL EFFECT
 * ==========================================
 * Makes the navbar background solid when scrolling down.
 */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/**
 * ==========================================
 * 2. MOBILE MENU TOGGLE
 * ==========================================
 * Basic logic to toggle the mobile menu.
 */
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        // Toggles the active class for mobile dropdowns
        navLinks.classList.toggle('active'); 
        
        // Change hamburger icon to an X
        const icon = menuToggle.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

/**
 * ==========================================
 * 3. HERO ANIMATIONS ON LOAD (FIXED)
 * ==========================================
 * Uses DOMContentLoaded so animations trigger immediately
 * without waiting for heavy videos or images to finish loading.
 */
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-up');
    
    revealElements.forEach(el => {
        // Adding the 'active' class triggers the CSS transition
        el.classList.add('active');
    });
});

/**
 * ==========================================
 * 4. SCROLL REVEAL ANIMATIONS (Intersection Observer)
 * ==========================================
 * Watches elements with the '.fade-up' class and adds the
 * '.active' class only when they scroll into the viewport.
 */
const fadeUpElements = document.querySelectorAll('.fade-up');

const revealOptions = {
    root: null,       // Use the viewport as the container
    rootMargin: '0px',
    threshold: 0.15   // Trigger when 15% of the element is visible
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Stop observing once the animation has played
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

fadeUpElements.forEach(element => {
    revealOnScroll.observe(element);
});

/**
 * ==========================================
 * 5. MAGNETIC BUTTON MICRO-INTERACTION
 * ==========================================
 * Calculates the distance between the mouse cursor and the center
 * of the button, then gently pulls the button towards the cursor.
 */
const magneticBtns = document.querySelectorAll('.magnetic-btn');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const position = btn.getBoundingClientRect();
        
        // Calculate the center of the button
        const xCenter = position.left + position.width / 2;
        const yCenter = position.top + position.height / 2;
        
        // Calculate the distance from cursor to center
        const xCursor = e.clientX;
        const yCursor = e.clientY;
        
        // Calculate the distance to move (the multiplier controls the pull strength)
        const xMove = (xCursor - xCenter) * 0.3;
        const yMove = (yCursor - yCenter) * 0.3;
        
        // Apply the transform
        btn.style.transform = `translate(${xMove}px, ${yMove}px)`;
    });
    
    // Reset the button position when the mouse leaves
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
        btn.style.transition = 'transform 0.5s ease'; // Smooth snap back
    });
    
    // Remove the transition while moving so it doesn't lag
    btn.addEventListener('mouseenter', () => {
        btn.style.transition = 'none'; 
    });
});

/**
 * ==========================================
 * 6. DESTINATION FILTER LOGIC
 * ==========================================
 * Filters the bento box grid based on the selected category
 * on the destinations.html page.
 */
const filterBtns = document.querySelectorAll('.filter-btn');
const bentoCards = document.querySelectorAll('.bento-card');

// Only run this if we are actually on the destinations page
if (filterBtns.length > 0 && bentoCards.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            
            // 1. Remove 'active' styling from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // 2. Add 'active' styling to the clicked button
            btn.classList.add('active');
            
            // 3. Identify which category was clicked
            const filterValue = btn.getAttribute('data-filter');
            
            // 4. Loop through the cards and show/hide accordingly
            bentoCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.style.display = ''; // Reverts to CSS Grid layout
                    
                    // Small delay to let the browser process the display change before fading in
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.display = 'none'; // Hides the card completely
                    card.style.opacity = '0';
                }
            });
        });
    });
}

/**
 * ==========================================
 * 7. FAQ ACCORDION LOGIC
 * ==========================================
 * Smoothly opens and closes the FAQ answers on the Contact page.
 */
const faqQuestions = document.querySelectorAll('.faq-question');

if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // Find the parent item and the answer div
            const faqItem = question.parentElement;
            const faqAnswer = question.nextElementSibling;
            
            // Toggle the active class (handles the icon rotation and shadow via CSS)
            faqItem.classList.toggle('active');
            
            // Animate the height
            if (faqItem.classList.contains('active')) {
                // Expand to the exact scroll height of the content inside
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px";
            } else {
                // Collapse back to 0
                faqAnswer.style.maxHeight = null;
            }
        });
    });
}