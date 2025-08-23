// Projects Page JavaScript for Walls And Dreams

// ===== PROJECT DATA =====
window.projectData = {
    1: {
        title: "Modern Living Room",
        description: "Contemporary living room design with elegant furniture and sophisticated color palette. This project showcases our expertise in creating functional yet aesthetically pleasing spaces that reflect modern design trends.",
        image: "img/AllProjects/project1.jpg",
        category: "interior",
        date: "March 2024",
        location: "Kurnool, Andhra Pradesh",
        area: "400 sq ft",
        details: "Complete living room transformation including custom furniture, lighting design, and wall treatments."
    },
    2: {
        title: "Kitchen Transformation",
        description: "Complete kitchen renovation with modern appliances and functional design. We transformed an outdated kitchen into a modern, efficient cooking space that meets all the family's needs.",
        image: "img/AllProjects/project2.jpg",
        category: "renovation",
        date: "February 2024",
        location: "Kurnool, Andhra Pradesh",
        area: "250 sq ft",
        details: "Full kitchen renovation with new cabinets, countertops, appliances, and improved layout."
    },
    3: {
        title: "Bedroom Suite",
        description: "Custom bedroom furniture including bed frame, wardrobes, and bedside tables. Every piece was designed and crafted to perfectly fit the space and reflect the client's personal style.",
        image: "img/AllProjects/project3.jpg",
        category: "furniture",
        date: "January 2024",
        location: "Kurnool, Andhra Pradesh",
        material: "Premium Wood & Fabric",
        details: "Bespoke bedroom furniture set with premium materials and custom finishes."
    },
    4: {
        title: "Wall Texture Art",
        description: "Creative texture painting techniques applied to accent walls and feature areas. We used innovative methods to create unique wall textures that add depth and character to the space.",
        image: "img/AllProjects/project4.jpg",
        category: "interior",
        date: "December 2023",
        location: "Kurnool, Andhra Pradesh",
        technique: "Multi-layer Texture",
        details: "Custom texture painting on feature walls using specialized techniques and materials."
    },
    5: {
        title: "Feature Wall Design",
        description: "Stunning wallpaper installation creating focal points in living spaces. We carefully selected and installed premium wallpapers to transform ordinary walls into extraordinary design elements.",
        image: "img/AllProjects/project5.png",
        category: "interior",
        date: "November 2023",
        location: "Kurnool, Andhra Pradesh",
        material: "Premium Wallpaper",
        details: "Premium wallpaper installation with custom pattern matching and seamless application."
    },
    6: {
        title: "Modern Ceiling",
        description: "Innovative ceiling design with geometric patterns and ambient lighting. This project demonstrates our ability to think beyond traditional ceiling treatments and create architectural interest above.",
        image: "img/AllProjects/project6.png",
        category: "interior",
        date: "October 2023",
        location: "Kurnool, Andhra Pradesh",
        features: "Geometric Patterns & LED",
        details: "Custom ceiling design with geometric patterns, recessed lighting, and acoustic considerations."
    },
    7: {
        title: "Elegant Dining Room",
        description: "Sophisticated dining room with custom lighting and premium finishes. We created an elegant dining space that combines functionality with luxury, perfect for both daily meals and special occasions.",
        image: "img/AllProjects/project7.png",
        category: "interior",
        date: "September 2023",
        location: "Kurnool, Andhra Pradesh",
        area: "300 sq ft",
        details: "Complete dining room design with custom lighting, premium materials, and elegant furnishings."
    },
    8: {
        title: "Luxury Sofa Set",
        description: "Bespoke sofa design with premium upholstery and ergonomic comfort. Every detail was carefully considered to create furniture that is both beautiful and comfortable for years to come.",
        image: "img/AllProjects/project8.png",
        category: "furniture",
        date: "August 2023",
        location: "Kurnool, Andhra Pradesh",
        material: "Premium Fabric & Wood",
        details: "Custom sofa design with premium fabrics, ergonomic design, and expert craftsmanship."
    },
    9: {
        title: "Bathroom Makeover",
        description: "Complete bathroom renovation with modern fixtures and spa-like atmosphere. We transformed a basic bathroom into a luxurious retreat that provides both functionality and relaxation.",
        image: "img/AllProjects/project9.png",
        category: "renovation",
        date: "July 2023",
        location: "Kurnool, Andhra Pradesh",
        area: "120 sq ft",
        details: "Full bathroom renovation including new fixtures, tiles, lighting, and storage solutions."
    }
};

// ===== FILTER FUNCTIONALITY =====
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects immediately
            filterProjects(filter);
        });
    });
}

function filterProjects(category) {
    const projectItems = document.querySelectorAll('.project-item');
    let visibleCount = 0;
    
    projectItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
            item.classList.remove('hidden');
            visibleCount++;
        } else {
            item.style.display = 'none';
            item.classList.add('hidden');
        }
    });
    
    // Update project count immediately
    updateProjectCount(category, visibleCount);
}

function updateProjectCount(category, visibleCount) {
    const countElement = document.querySelector('.filters-title');
    
    if (countElement) {
        const totalProjects = document.querySelectorAll('.project-item').length;
        
        if (category === 'all') {
            countElement.textContent = `All Projects (${totalProjects})`;
        } else {
            const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
            countElement.textContent = `${categoryName} Projects (${visibleCount})`;
        }
    }
}

// ===== PROJECT MODAL FUNCTIONALITY =====
function initProjectModals() {
    const viewButtons = document.querySelectorAll('.view-project');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            showProjectModal(projectId);
        });
    });
}

function showProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;
    
    // Update modal content
    const modal = document.getElementById('projectModal');
    if (modal) {
        document.getElementById('modalProjectImage').src = project.image;
        document.getElementById('modalProjectTitle').textContent = project.title;
        document.getElementById('modalProjectDescription').textContent = project.description;
        document.getElementById('modalProjectDate').textContent = project.date;
        document.getElementById('modalProjectLocation').textContent = project.location;
        document.getElementById('modalProjectCategory').textContent = project.category.charAt(0).toUpperCase() + project.category.slice(1);
        
        // Show modal
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    }
}

// ===== IMAGE OPTIMIZATION =====
function initImageOptimization() {
    const images = document.querySelectorAll('.project-image img');
    
    // FORCE ALL IMAGES TO LOAD IMMEDIATELY - NO MORE SCROLL DELAYS
    images.forEach(img => {
        // Force immediate loading
        if (img.src) {
            // Create a new image object to force loading
            const newImg = new Image();
            newImg.onload = function() {
                // Ensure the original image is visible
                img.style.opacity = '1';
                img.style.visibility = 'visible';
                img.style.display = 'block';
            };
            newImg.src = img.src;
        }
        
        // Force visibility immediately
        img.style.opacity = '1';
        img.style.visibility = 'visible';
        img.style.display = 'block';
    });
    
    // Add error handling for failed images
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Handle image loading errors gracefully
            this.style.display = 'none';
            const parent = this.closest('.project-image');
            if (parent) {
                parent.innerHTML = '<div class="text-center p-4"><i class="fas fa-image fa-3x text-muted"></i><p class="mt-2 text-muted">Image not available</p></div>';
            }
        });
    });
}

// ===== COUNTING ANIMATION =====
function initCountingAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Auto-increment counter animation
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.getAttribute('data-target'));
        animateCount(stat, finalValue);
    });
}

function animateCount(element, finalValue) {
    let currentValue = 0;
    const increment = finalValue / 30; // 30 steps for smooth animation
    const duration = 1500; // 1.5 seconds for smooth animation
    const stepTime = duration / 30;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            currentValue = finalValue;
            clearInterval(timer);
        }
        // Add "+" symbol for display
        element.textContent = Math.floor(currentValue) + '+';
    }, stepTime);
}

// ===== PERFORMANCE OPTIMIZED ANIMATIONS =====
function initAnimations() {
    // REMOVED - No more intersection observer that prevents images from showing
    // All project items are now visible immediately
}

// ===== KEYBOARD NAVIGATION =====
function initKeyboardNavigation() {
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

// ===== ACCESSIBILITY IMPROVEMENTS =====
function initAccessibility() {
    // Add ARIA labels
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        const filter = button.getAttribute('data-filter');
        button.setAttribute('aria-label', `Filter projects by ${filter}`);
    });
    
    // Add keyboard navigation to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll('button, a, input, select, textarea');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--secondary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// ===== FORCE IMMEDIATE VISIBILITY =====
function forceImmediateVisibility() {
    // Force all project items to be visible immediately
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.style.opacity = '1';
        item.style.visibility = 'visible';
        item.style.display = 'block';
        item.style.transform = 'none';
    });
    
    // Force all images to be visible immediately
    const images = document.querySelectorAll('.project-image img');
    images.forEach(img => {
        img.style.opacity = '1';
        img.style.visibility = 'visible';
        img.style.display = 'block';
    });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // FORCE IMMEDIATE VISIBILITY FIRST - NO MORE SCROLL DELAYS
    forceImmediateVisibility();
    
    // Initialize all functionality
    initProjectFilters();
    initProjectModals();
    initCountingAnimation();
    initAnimations();
    initImageOptimization();
    initKeyboardNavigation();
    initAccessibility();
    initPerformanceMonitoring();
    
    // Set initial project count
    updateProjectCount('all', document.querySelectorAll('.project-item').length);
    

});

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// ===== PERFORMANCE MONITORING =====
function initPerformanceMonitoring() {
    // Track page load performance
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    // Performance data available for analytics
                }
            }, 0);
        });
    }
    
    // REMOVED - Duplicate filter event listeners that were interfering with main filter functionality
    // The main filter functionality is handled in initProjectFilters()
}

// ===== ANALYTICS TRACKING =====
function trackProjectView(projectId) {
    // Track project views for analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'view_project', {
            'project_id': projectId,
            'project_title': projectData[projectId]?.title
        });
    }
    
    // Project view tracked
}

function trackFilterUsage(category) {
    // Track filter usage for analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'filter_projects', {
            'category': category
        });
    }
    
    // Filter usage tracked
}
