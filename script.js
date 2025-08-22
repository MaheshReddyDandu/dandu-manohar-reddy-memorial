// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Gallery Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        // Update filtered photo count
        updateFilteredCount(filter);
        
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxCaption = document.querySelector('.lightbox-caption h3');
const lightboxDescription = document.querySelector('.lightbox-caption p');
const closeLightbox = document.querySelector('.close-lightbox');

// Open lightbox when clicking view button
document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const galleryItem = button.closest('.gallery-item');
        const image = galleryItem.querySelector('img');
        const title = galleryItem.querySelector('h3').textContent;
        const description = galleryItem.querySelector('p').textContent;
        
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxCaption.textContent = title;
        lightboxDescription.textContent = description;
        
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add fade-in animation
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
    });
});

// Close lightbox
closeLightbox.addEventListener('click', () => {
    lightbox.style.opacity = '0';
    setTimeout(() => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
});

// Close lightbox when clicking outside
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'block') {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.gallery-item, .skill-item, .contact-item').forEach(item => {
    observer.observe(item);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Message sent successfully!', 'success');
    contactForm.reset();
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.classList.remove('loading');
    });
    
    img.addEventListener('error', () => {
        img.style.display = 'none';
        const errorDiv = document.createElement('div');
        errorDiv.className = 'image-error';
        errorDiv.innerHTML = '<i class="fas fa-image"></i><p>Image not available</p>';
        errorDiv.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            background: #f8f9fa;
            color: #666;
            font-size: 0.9rem;
        `;
        img.parentNode.appendChild(errorDiv);
    });
});

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    .image-error i {
        font-size: 2rem;
        margin-bottom: 10px;
        opacity: 0.5;
    }
    
    .image-error p {
        margin: 0;
        opacity: 0.7;
    }
`;

document.head.appendChild(notificationStyles);

// Dynamic Photo Loader - All your photos are included here
const photoData = [
    {
        src: 'assets/photos/20BCD3A6-E208-4B4A-A9F5-C4E7E213AC19_1_105_c.jpeg',
        alt: 'Family Photo 1',
        title: 'Family Memories',
        description: 'Precious family moments with our farmer father',
        category: 'family',
        crop: 'top' // Options: top, bottom, left, right, center
    },
    {
        src: 'assets/photos/56781745-48B3-4688-8AA2-16D8B80D5117_1_105_c.jpeg',
        alt: 'Family Photo 2',
        title: 'Family Portrait',
        description: 'Beautiful family togetherness built on hard work',
        category: 'family',
        crop: 'top'
    },
    {
        src: 'assets/photos/4EBE2B21-F290-4FAE-8469-0EDAD7AC5C2F_1_105_c 2.jpeg',
        alt: 'Family Photo 3',
        title: 'Family Bond',
        description: 'Unbreakable family connections through honest values',
        category: 'family',
        crop: 'top'
    },
    {
        src: 'assets/photos/4EF15CBC-ADC7-4577-8EBC-00C0351B49D0 2.jpeg',
        alt: 'Family Photo 4',
        title: 'Family Love',
        description: 'Love and warmth nurtured in our family home',
        category: 'family',
        crop: 'top'
    },
    {
        src: 'assets/photos/31206909-F1F9-4374-B24D-1AB4647F0D70_1_201_a.jpeg',
        alt: 'Family Photo 5',
        title: 'New Family Memory',
        description: 'Another beautiful moment in our family story',
        category: 'memories',
        crop: 'top'
    }
];

// Function to create gallery items dynamically
function createGalleryItem(photo) {
    const cropClass = photo.crop ? `crop-${photo.crop}` : 'crop-center';
    return `
        <div class="gallery-item" data-category="${photo.category}">
            <div class="gallery-image">
                <img src="${photo.src}" alt="${photo.alt}" class="${cropClass}">
                <div class="gallery-overlay">
                    <div class="overlay-content">
                        <h3>${photo.title}</h3>
                        <p>${photo.description}</p>
                        <button class="view-btn">View Full</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to load photos into gallery
function loadPhotos() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        galleryGrid.innerHTML = photoData.map(createGalleryItem).join('');
        
        // Update photo counter
        updatePhotoCounter();
        
        // Reinitialize lightbox functionality for new items
        initializeLightbox();
        
        // Add staggered animation to gallery items
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    }
}

// Function to initialize lightbox functionality
function initializeLightbox() {
    // Remove existing event listeners
    document.querySelectorAll('.view-btn').forEach(button => {
        button.removeEventListener('click', handleViewButtonClick);
        button.addEventListener('click', handleViewButtonClick);
    });
}

// Function to handle view button clicks
function handleViewButtonClick(e) {
    e.preventDefault();
    const galleryItem = e.target.closest('.gallery-item');
    const image = galleryItem.querySelector('img');
    const title = galleryItem.querySelector('h3').textContent;
    const description = galleryItem.querySelector('p').textContent;
    
    // Open lightbox
    openLightbox(image.src, image.alt, title, description);
}

// Function to open lightbox
function openLightbox(imageSrc, imageAlt, title, description) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption h3');
    const lightboxDescription = document.querySelector('.lightbox-caption p');
    
    if (lightbox && lightboxImage && lightboxCaption && lightboxDescription) {
        lightboxImage.src = imageSrc;
        lightboxImage.alt = imageAlt;
        lightboxCaption.textContent = title;
        lightboxDescription.textContent = description;
        
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add fade-in animation
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
    }
}

// Function to update photo counter
function updatePhotoCounter() {
    const totalPhotosElement = document.getElementById('total-photos');
    if (totalPhotosElement) {
        totalPhotosElement.textContent = photoData.length;
    }
}

// Function to get photos by category
function getPhotosByCategory(category) {
    if (category === 'all') {
        return photoData;
    }
    return photoData.filter(photo => photo.category === category);
}

// Function to update filtered photo count
function updateFilteredCount(category) {
    const filteredPhotos = getPhotosByCategory(category);
    const totalPhotosElement = document.getElementById('total-photos');
    if (totalPhotosElement) {
        if (category === 'all') {
            totalPhotosElement.textContent = photoData.length;
        } else {
            totalPhotosElement.textContent = `${filteredPhotos.length} of ${photoData.length}`;
        }
    }
}

// Function to add new photos dynamically
function addNewPhoto(photoPath, title, description, category = 'family') {
    const newPhoto = {
        src: photoPath,
        alt: title,
        title: title,
        description: description,
        category: category
    };
    
    photoData.push(newPhoto);
    
    // Reload the gallery
    loadPhotos();
    
    // Show notification
    showNotification(`New photo "${title}" added to gallery!`, 'success');
}

// Function to scan assets folder for new photos (for future enhancement)
function scanForNewPhotos() {
    // This would require a backend server to actually scan the folder
    // For now, we'll use the manual addNewPhoto function
    console.log('Photo scanning would require a backend server');
}

// Function to refresh gallery and check for new photos
function refreshGallery() {
    // Reload all photos
    loadPhotos();
    
    // Show notification
    showNotification('Gallery refreshed!', 'success');
    
    // Reinitialize all event listeners
    initializeEventListeners();
}

// Function to initialize all event listeners
function initializeEventListeners() {
    // Reinitialize filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            updateFilteredCount(filter);
            
            const galleryItems = document.querySelectorAll('.gallery-item');
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Initialize crop controls
    initializeCropControls();
}

// Function to initialize crop controls
function initializeCropControls() {
    const cropButtons = document.querySelectorAll('.crop-btn');
    cropButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all crop buttons
            cropButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const cropType = button.getAttribute('data-crop');
            applyCropToAllImages(cropType);
        });
    });
}

// Function to apply crop to all images
function applyCropToAllImages(cropType) {
    const galleryImages = document.querySelectorAll('.gallery-image img');
    galleryImages.forEach(img => {
        // Remove all crop classes
        img.classList.remove('crop-top', 'crop-bottom', 'crop-left', 'crop-right', 'crop-center');
        // Add new crop class
        img.classList.add(`crop-${cropType}`);
    });
    
    // Show notification
    showNotification(`Images cropped to show ${cropType}`, 'success');
}

// Function to set default crop on page load
function setDefaultCrop() {
    // Set default crop to 'top'
    applyCropToAllImages('top');
    
    // Update the active crop button
    const cropButtons = document.querySelectorAll('.crop-btn');
    cropButtons.forEach(btn => btn.classList.remove('active'));
    const topButton = document.querySelector('[data-crop="top"]');
    if (topButton) {
        topButton.classList.add('active');
    }
}

// Example: How to add a new photo programmatically
// addNewPhoto('assets/photos/new-photo.jpg', 'New Family Memory', 'Another beautiful moment captured', 'family');

// Initialize page with fade-in effect
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Load photos dynamically
    loadPhotos();
    
    // Set default crop to 'top'
    setTimeout(() => {
        setDefaultCrop();
    }, 500);
    
    // Initialize About section animations
    initializeAboutAnimations();
    
    // Initialize Memorial section animations
    initializeMemorialAnimations();
});

// Function to initialize About section animations
function initializeAboutAnimations() {
    const aboutSection = document.querySelector('#about');
    if (!aboutSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateAboutContent();
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(aboutSection);
}

// Function to animate About section content
function animateAboutContent() {
    const descriptions = document.querySelectorAll('.about-description');
    const highlights = document.querySelectorAll('.highlight-item');
    
    // Animate descriptions
    descriptions.forEach((desc, index) => {
        setTimeout(() => {
            desc.style.opacity = '0';
            desc.style.transform = 'translateY(30px)';
            desc.style.transition = 'all 0.8s ease';
            
            setTimeout(() => {
                desc.style.opacity = '1';
                desc.style.transform = 'translateY(0)';
            }, 100);
        }, index * 300);
    });
    
    // Animate highlights
    highlights.forEach((highlight, index) => {
        setTimeout(() => {
            highlight.style.opacity = '0';
            highlight.style.transform = 'scale(0.8)';
            highlight.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                highlight.style.opacity = '1';
                highlight.style.transform = 'scale(1)';
            }, 100);
        }, (descriptions.length * 300) + (index * 200));
    });
}

// Add scroll-triggered animations
const scrollAnimations = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-in');
        }
    });
};

window.addEventListener('scroll', scrollAnimations);

// Add CSS for scroll animations
const scrollAnimationStyles = document.createElement('style');
scrollAnimationStyles.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
`;

document.head.appendChild(scrollAnimationStyles);

// Function to initialize Memorial section animations
function initializeMemorialAnimations() {
    const memorialSection = document.querySelector('#memorial');
    if (!memorialSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateMemorialContent();
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(memorialSection);
}

// Function to animate Memorial section content
function animateMemorialContent() {
    const memorialCard = document.querySelector('.memorial-card');
    const memorialHeader = document.querySelector('.memorial-header');
    const memorialSymbol = document.querySelector('.memorial-symbol');
    const memorialDates = document.querySelector('.memorial-dates');
    const memorialName = document.querySelector('.memorial-name');
    const memorialAge = document.querySelector('.memorial-age');
    const memorialTribute = document.querySelector('.memorial-tribute');
    const ceremonyInvitation = document.querySelector('.ceremony-invitation');
    const memorialFooter = document.querySelector('.memorial-footer');
    const decorationElements = document.querySelectorAll('.decoration-element');
    
    // Initial setup - hide elements
    const elementsToAnimate = [
        memorialCard, memorialSymbol, memorialDates, memorialName, 
        memorialAge, memorialTribute, ceremonyInvitation, memorialFooter
    ];
    
    elementsToAnimate.forEach(element => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.8s ease';
        }
    });
    
    // Animate card entrance
    setTimeout(() => {
        if (memorialCard) {
            memorialCard.style.opacity = '1';
            memorialCard.style.transform = 'translateY(0)';
        }
    }, 200);
    
    // Animate symbol
    setTimeout(() => {
        if (memorialSymbol) {
            memorialSymbol.style.opacity = '1';
            memorialSymbol.style.transform = 'translateY(0) scale(1)';
        }
    }, 400);
    
    // Animate dates
    setTimeout(() => {
        if (memorialDates) {
            memorialDates.style.opacity = '1';
            memorialDates.style.transform = 'translateY(0)';
        }
    }, 600);
    
    // Animate name
    setTimeout(() => {
        if (memorialName) {
            memorialName.style.opacity = '1';
            memorialName.style.transform = 'translateY(0)';
        }
    }, 800);
    
    // Animate age
    setTimeout(() => {
        if (memorialAge) {
            memorialAge.style.opacity = '1';
            memorialAge.style.transform = 'translateY(0)';
        }
    }, 1000);
    
    // Animate tribute
    setTimeout(() => {
        if (memorialTribute) {
            memorialTribute.style.opacity = '1';
            memorialTribute.style.transform = 'translateY(0)';
        }
    }, 1200);
    
    // Animate ceremony invitation
    setTimeout(() => {
        if (ceremonyInvitation) {
            ceremonyInvitation.style.opacity = '1';
            ceremonyInvitation.style.transform = 'translateY(0)';
        }
    }, 1400);
    
    // Animate footer
    setTimeout(() => {
        if (memorialFooter) {
            memorialFooter.style.opacity = '1';
            memorialFooter.style.transform = 'translateY(0)';
        }
    }, 1600);
    
    // Animate decoration elements
    decorationElements.forEach((element, index) => {
        setTimeout(() => {
            if (element) {
                element.style.opacity = '0.6';
                element.style.transform = 'scale(1)';
                element.style.transition = 'all 0.6s ease';
            }
        }, 1800 + (index * 200));
    });
}

// Function to add memorial card hover effects
function addMemorialHoverEffects() {
    const memorialCard = document.querySelector('.memorial-card');
    
    if (memorialCard) {
        memorialCard.addEventListener('mouseenter', () => {
            memorialCard.style.transform = 'translateY(-8px) scale(1.02)';
            memorialCard.style.boxShadow = '0 40px 100px rgba(0, 0, 0, 0.25)';
        });
        
        memorialCard.addEventListener('mouseleave', () => {
            memorialCard.style.transform = 'translateY(0) scale(1)';
            memorialCard.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
        });
    }
}

// Initialize memorial hover effects when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        addMemorialHoverEffects();
    }, 2000); // Add after initial animations complete
});
