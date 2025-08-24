// Modern Scripts for Walls And Dreams Website

// ===== AUTO-TYPING FUNCTIONALITY =====
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

const typingTexts = [
    "Transform Your Space Into Dreams",
    "Custom Interior Solutions",
    "Excellence in Every Detail"
];

// Initialize auto-typing
function initAutoTyping() {
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        typeText();
    }
}

// Type text function
function typeText() {
    const currentText = typingTexts[typingIndex];
    const typingElement = document.getElementById('typing-text');
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typingIndex = (typingIndex + 1) % typingTexts.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeText, typingSpeed);
}

// ===== PARALLAX EFFECT =====
function initParallaxEffect() {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        // Only enable parallax on desktop devices
        if (window.innerWidth > 768) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.6;
                heroBackground.style.transform = `translateY(${rate}px)`;
            });
        } else {
            // Disable parallax on mobile for better performance
            heroBackground.style.transform = 'none';
        }
    }
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                // Use smooth scrolling only on desktop, instant scroll on mobile for better performance
                if (window.innerWidth > 768) {
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                } else {
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'auto'
                    });
                }
                
                // Close mobile navigation if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    if (navbarToggler) {
                        navbarToggler.click();
                    }
                }
            }
        });
    });
}

// ===== NAVIGATION HIGHLIGHTING =====
function initNavigationHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#mainNav .nav-link');
    
    function highlightNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    highlightNav();
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbarScrollEffect() {
    const navbar = document.getElementById('mainNav');
    if (navbar) {
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
    window.addEventListener('scroll', handleNavbarScroll);
        handleNavbarScroll();
    }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.classList.add('aos-animate');
                animationObserver.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(element);
    });
}

// ===== SERVICE HOVER EFFECTS =====
function initServiceHoverEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
}



// ===== CONTACT FORM HANDLING =====
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        // Only validate on form submission - no real-time validation
        const formFields = contactForm.querySelectorAll('.form-control, .form-select');
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();
            
            // Simple validation - only check required fields
            let isValid = true;
            let errorMessage = '';
            
            // Clear any existing validation feedback
            clearAllValidationFeedback();
            
            // Basic required field validation
            if (!name) {
                markFieldAsInvalid('name', 'Please enter your name');
                isValid = false;
            }
            
            if (!email) {
                markFieldAsInvalid('email', 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email)) {
                markFieldAsInvalid('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!message) {
                markFieldAsInvalid('message', 'Please tell us about your project');
                isValid = false;
            }
            
            if (!isValid) {
                showNotification('Please complete the required fields to continue.', 'info');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            // Prepare email content
            const subject = `New Project Inquiry from ${name} - ${service || 'General Inquiry'}`;
            const emailBody = `
Dear Walls And Dreams Team,

You have received a new project inquiry with the following details:

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Service Required: ${service || 'Not specified'}

Project Details:
${message}

This inquiry was submitted through your website contact form.

Best regards,
${name}
            `.trim();
            
            // Create mailto link
            const mailtoLink = `mailto:wallsanddreams4u@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
            
            // Simulate processing delay for better UX
            setTimeout(() => {
                try {
                    // Try to open default email application
                    const emailWindow = window.open(mailtoLink, '_blank');
                    
                    // Check if email application opened successfully
                    if (emailWindow) {
                        // Show success message
                        showNotification('Email application opened successfully! Please review and send the email.', 'success');
                        
                        // Reset form
                        contactForm.reset();
                        
                        // Clear validation feedback
                        clearAllValidationFeedback();
                        
                        // Close the popup after a delay
                        setTimeout(() => {
                            if (emailWindow && !emailWindow.closed) {
                                emailWindow.close();
                            }
                        }, 2000);
                        
                    } else {
                        // Fallback: show email details for manual composition
                        showEmailDetails(name, email, phone, service, message);
                    }
                    
                } catch (error) {
                    // Fallback: show email details for manual composition
                    showEmailDetails(name, email, phone, service, message);
                } finally {
                    // Reset button state
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            }, 1000);
        });
        
        // Add gentle focus effects and clear validation on input
        formFields.forEach(field => {
            field.addEventListener('focus', function() {
                this.style.borderColor = 'var(--secondary-color)';
                this.style.boxShadow = '0 0 0 0.2rem rgba(231, 76, 60, 0.15)';
            });
            
            field.addEventListener('blur', function() {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            });
            
            // Clear validation errors when user starts typing
            field.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    this.classList.remove('is-invalid');
                    const feedback = this.parentNode.querySelector('.invalid-feedback');
                    if (feedback) feedback.remove();
                }
            });
        });
    }
}

// ===== SIMPLIFIED VALIDATION HELPERS =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function markFieldAsInvalid(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.add('is-invalid');
        
        // Remove existing feedback
        const existingFeedback = field.parentNode.querySelector('.invalid-feedback');
        if (existingFeedback) existingFeedback.remove();
        
        // Add feedback message
        const feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        feedback.textContent = message;
        field.parentNode.appendChild(feedback);
    }
}

function clearAllValidationFeedback() {
    // Remove all validation classes
    const formFields = document.querySelectorAll('.contact-form .form-control, .contact-form .form-select');
    formFields.forEach(field => {
        field.classList.remove('is-valid', 'is-invalid');
    });
    
    // Remove all feedback messages
    const feedbacks = document.querySelectorAll('.contact-form .invalid-feedback, .contact-form .valid-feedback');
    feedbacks.forEach(feedback => feedback.remove());
}

// ===== SHOW EMAIL DETAILS FALLBACK =====
function showEmailDetails(name, email, phone, service, message) {
    // Create modal for email details
    const modal = document.createElement('div');
    modal.className = 'email-details-modal';
    modal.innerHTML = `
        <div class="email-details-content">
            <div class="email-details-header">
                <h3>Email Details</h3>
                <button class="close-btn" onclick="this.closest('.email-details-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="email-details-body">
                <p><strong>To:</strong> wallsanddreams4u@gmail.com</p>
                <p><strong>Subject:</strong> New Project Inquiry from ${name} - ${service || 'General Inquiry'}</p>
                <div class="email-body-preview">
                    <p><strong>Email Content:</strong></p>
                    <div class="email-content">
                        <p>Dear Walls And Dreams Team,</p>
                        <p>You have received a new project inquiry with the following details:</p>
                        <ul>
                            <li><strong>Name:</strong> ${name}</li>
                            <li><strong>Email:</strong> ${email}</li>
                            <li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
                            <li><strong>Service Required:</strong> ${service || 'Not specified'}</li>
                        </ul>
                        <p><strong>Project Details:</strong></p>
                        <p>${message}</p>
                        <p>This inquiry was submitted through your website contact form.</p>
                        <p>Best regards,<br>${name}</p>
                    </div>
                </div>
                <div class="email-instructions">
                    <p><strong>Instructions:</strong></p>
                    <ol>
                        <li>Copy the email content above</li>
                        <li>Open your email application (Gmail, Outlook, etc.)</li>
                        <li>Create a new email to: <strong>wallsanddreams4u@gmail.com</strong></li>
                        <li>Paste the content and send</li>
                    </ol>
                </div>
            </div>
            <div class="email-details-footer">
                <button class="btn btn-secondary" onclick="this.closest('.email-details-modal').remove()">Close</button>
                <button class="btn btn-primary" onclick="copyEmailContent()">Copy Content</button>
            </div>
        </div>
    `;
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
    `;
    
    // Add modal styles if not already added
    if (!document.querySelector('#email-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'email-modal-styles';
        style.textContent = `
            .email-details-content {
                background: white;
                border-radius: 12px;
                max-width: 600px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }
            .email-details-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 25px;
                border-bottom: 1px solid #eee;
            }
            .email-details-header h3 {
                margin: 0;
                color: var(--text-dark);
            }
            .close-btn {
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                color: #666;
                padding: 5px;
            }
            .close-btn:hover {
                color: #333;
            }
            .email-details-body {
                padding: 25px;
            }
            .email-details-body p {
                margin-bottom: 15px;
                line-height: 1.6;
            }
            .email-body-preview {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
            }
            .email-content {
                background: white;
                padding: 15px;
                border-radius: 6px;
                border-left: 4px solid var(--secondary-color);
            }
            .email-content ul {
                margin: 15px 0;
                padding-left: 20px;
            }
            .email-content li {
                margin-bottom: 8px;
            }
            .email-instructions {
                background: #e3f2fd;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
            }
            .email-instructions ol {
                margin: 15px 0;
                padding-left: 20px;
            }
            .email-instructions li {
                margin-bottom: 8px;
            }
            .email-details-footer {
                display: flex;
                justify-content: flex-end;
                gap: 15px;
                padding: 20px 25px;
                border-top: 1px solid #eee;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(modal);
    
    // Show success message
    showNotification('Email application could not be opened. Showing email details for manual composition.', 'info');
    
    // Reset form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.reset();
        
        // Remove validation classes
        const formFields = contactForm.querySelectorAll('.form-control, .form-select');
        formFields.forEach(field => {
            field.classList.remove('is-valid', 'is-invalid');
            const feedback = field.parentNode.querySelector('.invalid-feedback, .valid-feedback');
            if (feedback) feedback.remove();
        });
    }
}

// ===== COPY EMAIL CONTENT =====
function copyEmailContent() {
    const emailContent = document.querySelector('.email-content');
    if (emailContent) {
        const textToCopy = emailContent.innerText;
        
        // Use modern clipboard API if available
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                showNotification('Email content copied to clipboard!', 'success');
            }).catch(() => {
                fallbackCopyTextToClipboard(textToCopy);
            });
        } else {
            fallbackCopyTextToClipboard(textToCopy);
        }
    }
}

// ===== FALLBACK COPY FUNCTION =====
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showNotification('Email content copied to clipboard!', 'success');
        } else {
            showNotification('Failed to copy content. Please copy manually.', 'error');
        }
    } catch (err) {
        showNotification('Failed to copy content. Please copy manually.', 'error');
    }
    
    document.body.removeChild(textArea);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.custom-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification custom-notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles - more subtle and less intrusive
    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 25px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 12px 18px;
        border-radius: 6px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        z-index: 10000;
        max-width: 350px;
        animation: slideInRight 0.4s ease;
        font-size: 0.9rem;
        opacity: 0.95;
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .custom-notification .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .custom-notification .notification-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                margin-left: auto;
                padding: 0;
                font-size: 16px;
            }
            .custom-notification .notification-close:hover {
                opacity: 0.8;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove after 8 seconds (less aggressive)
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 8000);
}



// ===== PORTFOLIO PROJECT DATA =====
window.portfolioProjectData = {
    1: {
        title: "Kids Bedroom",
        description: "Playful and functional design that creates the perfect environment for children to sleep, play, and grow. This project features custom storage solutions, vibrant colors, and child-safe materials that make the room both beautiful and practical.",
        image: "img/kidsBedroom.jpg",
        category: "interior",
        date: "March 2024",
        location: "Kurnool, Andhra Pradesh",
        area: "200 sq ft",
        details: "Complete bedroom transformation with custom furniture, playful wall designs, and functional storage solutions."
    },
    2: {
        title: "Classic Custom Sofa",
        description: "Timeless elegance meets comfort in this bespoke sofa design. Every detail was carefully crafted to create a piece that not only looks stunning but provides exceptional comfort for years to come.",
        image: "img/ClassicCustomSofa.jpg",
        category: "furniture",
        date: "February 2024",
        location: "Kurnool, Andhra Pradesh",
        material: "Premium Fabric & Wood",
        details: "Custom sofa design with premium materials, ergonomic design, and expert craftsmanship."
    },
    3: {
        title: "Modern Living Room",
        description: "Contemporary sophistication that transforms your living space into a modern haven. This design combines clean lines, neutral tones, and functional furniture to create a space that's both stylish and comfortable.",
        image: "img/interiorDesign1.jpg",
        category: "interior",
        date: "January 2024",
        location: "Kurnool, Andhra Pradesh",
        area: "350 sq ft",
        details: "Complete living room design with modern furniture, lighting, and sophisticated color palette."
    },
    4: {
        title: "Kitchen Renovation",
        description: "Complete transformation that turns your kitchen into a functional and beautiful space. This renovation project includes modern appliances, efficient storage solutions, and a design that makes cooking a pleasure.",
        image: "img/remodeling.jpg",
        category: "renovation",
        date: "December 2023",
        location: "Kurnool, Andhra Pradesh",
        area: "250 sq ft",
        details: "Full kitchen renovation with new cabinets, countertops, appliances, and improved layout."
    }
};

// ===== PORTFOLIO PROJECT MODAL FUNCTIONALITY =====
function initPortfolioProjectModals() {
    const viewButtons = document.querySelectorAll('.view-project-btn');
    
    console.log(`Found ${viewButtons.length} portfolio view buttons`);
    
    viewButtons.forEach(button => {
        const projectId = button.getAttribute('data-project');
        console.log(`Initializing button for project ${projectId}`);
        
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            console.log(`Portfolio button clicked for project ${projectId}`);
            showPortfolioProjectModal(projectId);
        });
        
        // Add keyboard navigation support
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Add ARIA labels for accessibility
        const project = portfolioProjectData[projectId];
        if (project) {
            button.setAttribute('aria-label', `View details for ${project.title}`);
        } else {
            console.warn(`Project data not found for ID ${projectId}`);
        }
    });
}

function showPortfolioProjectModal(projectId) {
    const project = portfolioProjectData[projectId];
    if (!project) {
        console.error(`Project with ID ${projectId} not found`);
        return;
    }
    
    // Update modal content
    const modal = document.getElementById('projectModal');
    if (modal) {
        try {
            document.getElementById('modalProjectImage').src = project.image;
            document.getElementById('modalProjectTitle').textContent = project.title;
            document.getElementById('modalProjectDescription').textContent = project.description;
            document.getElementById('modalProjectDate').textContent = project.date;
            document.getElementById('modalProjectLocation').textContent = project.location;
            document.getElementById('modalProjectCategory').textContent = project.category.charAt(0).toUpperCase() + project.category.slice(1);
            
            // Show modal
            const modalInstance = new bootstrap.Modal(modal);
            modalInstance.show();
            
            // Track project view for analytics
            trackPortfolioProjectView(projectId);
        } catch (error) {
            console.error('Error showing portfolio project modal:', error);
        }
    } else {
        console.error('Project modal element not found');
    }
}

// ===== ANALYTICS TRACKING =====
function trackPortfolioProjectView(projectId) {
    // Track portfolio project views for analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'view_portfolio_project', {
            'project_id': projectId,
            'project_title': portfolioProjectData[projectId]?.title
        });
    }
    
    // Portfolio project view tracked
    console.log(`Portfolio project ${projectId} viewed: ${portfolioProjectData[projectId]?.title}`);
}

// ===== KEYBOARD NAVIGATION FOR PORTFOLIO MODAL =====
function initPortfolioKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC key to close modal
        if (e.key === 'Escape') {
            const modal = document.getElementById('projectModal');
            if (modal && modal.classList.contains('show')) {
                const modalInstance = bootstrap.Modal.getInstance(modal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            }
        }
    });
}

// ===== CAROUSEL NAVIGATION =====
function initCarouselNavigation() {
    const carousel = document.getElementById('portfolioCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!carousel || !prevBtn || !nextBtn) {
        return;
    }
    
    // Adjust scroll amount and behavior based on device
    const scrollAmount = window.innerWidth > 768 ? 400 : 300;
    const scrollBehavior = window.innerWidth > 768 ? 'smooth' : 'auto';
    
    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: -scrollAmount,
            behavior: scrollBehavior
        });
    });
    
    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: scrollAmount,
            behavior: scrollBehavior
        });
    });
    
    // Mobile touch scrolling improvements
    if (window.innerWidth <= 768) {
        let isScrolling = false;
        let startX = 0;
        let scrollLeft = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            isScrolling = true;
            startX = e.touches[0].pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
        
        carousel.addEventListener('touchmove', (e) => {
            if (!isScrolling) return;
            e.preventDefault();
            const x = e.touches[0].pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
        
        carousel.addEventListener('touchend', () => {
            isScrolling = false;
        });
    }
}

// ===== MOBILE DETECTION AND OPTIMIZATION =====
function isMobileDevice() {
    return window.innerWidth <= 768;
}

function optimizeForMobile() {
    if (isMobileDevice()) {
        // Disable heavy animations on mobile
        document.body.classList.add('mobile-device');
        
        // Optimize images for mobile
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
        });
        
        // Reduce motion for better performance
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
        }
    }
}

// ===== INITIALIZE ALL FEATURES =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile optimization first
    optimizeForMobile();
    
    // Initialize existing features
    initAutoTyping();
    initParallaxEffect();
    initSmoothScrolling();
    initNavigationHighlighting();
    initNavbarScrollEffect();
    initScrollAnimations();
    initServiceHoverEffects();

    initContactForm();

    
    // Initialize new features
    initCarouselNavigation();
    initPortfolioProjectModals();
    initPortfolioKeyboardNavigation();
    
    // Initialize AOS with mobile optimization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: window.innerWidth > 768 ? 800 : 600,
            easing: 'ease-in-out',
            once: true,
            offset: window.innerWidth > 768 ? 100 : 50,
            disable: window.innerWidth <= 768 ? 'mobile' : false
        });
    }
});

// ===== ADDITIONAL CSS ANIMATIONS =====
const additionalStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeInUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    

    
    .navbar-collapse.show {
        display: block !important;
    }
    
    .hero-content {
        animation: fadeInUp 1s ease-out;
    }
    
    .hero-buttons .btn {
        animation: fadeInUp 1s ease-out 0.3s both;
    }
    
    .hero-subtitle {
        animation: fadeInUp 1s ease-out 0.1s both;
    }
    
    @media (max-width: 991.98px) {
        .navbar-collapse {
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            border-radius: 8px;
            margin-top: 10px;
            padding: 20px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
