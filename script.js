/*
 * DYNAMIC PHOTO GALLERY SYSTEM
 * 
 * To add new photos:
 * 1. Place your photo files in the assets/photos/ folder
 * 2. Update the photoFiles array in the loadAvailablePhotos() function below
 * 3. The gallery will automatically detect and display only available photos
 * 4. Use the refresh button to reload the gallery
 * 
 * The system automatically:
 * - Checks which photos actually exist
 * - Updates the photo counter
 * - Shows a message when no photos are available
 * - Handles missing photos gracefully
 */

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    // Add body class for menu open
    document.body.classList.toggle('menu-open', hamburger.classList.contains('active'));
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
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

// Loading System
let loadingStartTime = Date.now();
let totalPhotosToLoad = 0;
let photosLoaded = 0;
let loadingProgress = 0;

// Loading screen elements - will be initialized when DOM is ready
let loadingScreen;
let progressFill;
let progressText;
let photosLoadedElement;
let loadingTimeElement;

// Dynamic Photo Loader - Automatically detects available photos from assets folder
let photoData = [];

// Function to dynamically scan and load photos from assets folder
async function loadAvailablePhotos() {
    try {
        // Start loading process
        startLoading();
        
        // Set a shorter timeout for mobile users
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const timeoutDuration = isMobile ? 8000 : 12000; // 8s for mobile, 12s for desktop
        
        const loadingTimeout = setTimeout(() => {
            console.log(`Loading timeout reached (${timeoutDuration}ms), proceeding with available photos`);
            if (photoData.length === 0) {
                // If no photos loaded, try fallback method
                loadFallbackPhotos();
            } else {
                completeLoading();
            }
        }, timeoutDuration);
        
        // Dynamic photo detection - automatically find all photos in the assets/photos folder
        console.log('🚀 Scanning for available photos dynamically...');
        updateLoadingProgress(10, 'Scanning for photos...');
        
        // Try to detect photos dynamically by testing common patterns
        const photoPatterns = [];
        let maxPhotoNumber = 10; // Try up to 50 photos to be safe
        
        // First, try to find photos with sequential numbering (most common pattern)
        for (let i = 1; i <= maxPhotoNumber; i++) {
            photoPatterns.push(`assets/photos/photo${i}.jpeg`);
            // photoPatterns.push(`assets/photos/photo${i}.jpg`);
            // photoPatterns.push(`assets/photos/photo${i}.png`);
            // photoPatterns.push(`assets/photos/photo${i}.webp`);
        }
        
        // Also try common variations and alternative naming patterns
        photoPatterns.push('assets/photos/photo.jpeg');
        // photoPatterns.push('assets/photos/photo.jpg');
        // photoPatterns.push('assets/photos/photo.png');
        // photoPatterns.push('assets/photos/photo.webp');
        
        // Try with different naming conventions
        // for (let i = 1; i <= maxPhotoNumber; i++) {
        //     photoPatterns.push(`assets/photos/image${i}.jpeg`);
        //     // photoPatterns.push(`assets/photos/image${i}.jpg`);
        //     // photoPatterns.push(`assets/photos/image${i}.png`);
        //     // photoPatterns.push(`assets/photos/img${i}.jpeg`);
        //     // photoPatterns.push(`assets/photos/img${i}.jpg`);
        //     // photoPatterns.push(`assets/photos/img${i}.png`);
        // }
        
        console.log(`🔍 Testing ${photoPatterns.length} possible photo patterns...`);
        
        const availablePhotos = [];
        let loadedCount = 0;
        let testedCount = 0;
        
        // Test photo patterns in batches for better performance
        const batchSize = 10; // Test 10 photos at a time
        for (let batchStart = 0; batchStart < photoPatterns.length; batchStart += batchSize) {
            const batchEnd = Math.min(batchStart + batchSize, photoPatterns.length);
            const batch = photoPatterns.slice(batchStart, batchEnd);
            
            // Test batch of photos concurrently
            const batchPromises = batch.map(async (photoPath, batchIndex) => {
                const globalIndex = batchStart + batchIndex;
                testedCount++;
                
                try {
                    // Update progress - scanning phase
                    const progress = 10 + (testedCount / photoPatterns.length) * 30; // 10% to 40%
                    updateLoadingProgress(progress, `Testing photo pattern ${testedCount} of ${photoPatterns.length}...`);
                    
                    // Create a test image to check if the file exists
                    const testImg = new Image();
                    return new Promise((resolve, reject) => {
                        const imageTimeout = setTimeout(() => {
                            reject(new Error('Image load timeout'));
                        }, isMobile ? 2000 : 3000); // 2s for mobile, 3s for desktop
                        
                        testImg.onload = () => {
                            clearTimeout(imageTimeout);
                            const photoData = {
                                src: photoPath,
                                alt: getPhotoAlt(photoPath),
                                title: getPhotoTitle(photoPath),
                                description: getPhotoDescription(photoPath),
                                category: 'family',
                                crop: 'top'
                            };
                            console.log(`✅ Found photo: ${photoPath}`);
                            resolve(photoData);
                        };
                        testImg.onerror = () => {
                            clearTimeout(imageTimeout);
                            // Don't log every missing photo to avoid spam
                            if (globalIndex < 20) { // Only log first 20 for debugging
                                console.log(`❌ Photo not available: ${photoPath}`);
                            }
                            reject();
                        };
                        testImg.src = photoPath;
                    });
                } catch (error) {
                    return null; // Return null for failed photos
                }
            });
            
            // Wait for batch to complete
            const batchResults = await Promise.allSettled(batchPromises);
            
            // Process batch results
            batchResults.forEach((result, batchIndex) => {
                if (result.status === 'fulfilled' && result.value) {
                    availablePhotos.push(result.value);
                    loadedCount++;
                    photosLoaded++;
                    updatePhotosLoaded();
                } else {
                    photosLoaded++;
                    updatePhotosLoaded();
                }
            });
            
            // Small delay between batches to prevent overwhelming the browser
            if (batchEnd < photoPatterns.length) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }
        
        // If we have photos, proceed immediately
        if (availablePhotos.length > 0) {
            console.log(`✅ Found ${availablePhotos.length} photos dynamically`);
            
            // Clear the main loading timeout
            clearTimeout(loadingTimeout);
            
            // Update the global photoData array
            photoData = availablePhotos;
            
            // Final progress update
            updateLoadingProgress(100, `Finalizing gallery with ${availablePhotos.length} photos...`);
            
            // Load photos into gallery
            loadPhotos();
            
            console.log(`Successfully loaded ${photoData.length} photos dynamically`);
            
            // Complete loading
            completeLoading();
            
            // Show notification
            showNotification(`Gallery loaded! Found ${photoData.length} photos`, 'success');
            return;
        }
        
        // If no known photos loaded, try dynamic detection
        console.log('🔄 No known photos found, trying dynamic detection...');
        updateLoadingProgress(60, 'Scanning for photos...');
        
        const photoFiles = await scanAssetsFolder();
        console.log(`Found ${photoFiles.length} photos in assets folder:`, photoFiles);
        
        if (photoFiles.length > 0) {
            // Load detected photos
            for (let i = 0; i < photoFiles.length; i++) {
                const photoPath = photoFiles[i];
                if (!availablePhotos.some(p => p.src === photoPath)) {
                    try {
                        const progress = 60 + ((i + 1) / photoFiles.length) * 30; // 60% to 90%
                        updateLoadingProgress(progress, `Loading detected photo ${i + 1}...`);
                        
                        const testImg = new Image();
                        await new Promise((resolve, reject) => {
                            const imageTimeout = setTimeout(() => reject(new Error('Timeout')), 3000);
                            testImg.onload = () => {
                                clearTimeout(imageTimeout);
                                availablePhotos.push({
                                    src: photoPath,
                                    alt: getPhotoAlt(photoPath),
                                    title: getPhotoTitle(photoPath),
                                    description: getPhotoDescription(photoPath),
                                    category: 'family',
                                    crop: 'top'
                                });
                                photosLoaded++;
                                updatePhotosLoaded();
                                resolve();
                            };
                            testImg.onerror = () => {
                                clearTimeout(imageTimeout);
                                reject();
                            };
                            testImg.src = photoPath;
                        });
                    } catch (error) {
                        console.log(`Failed to load detected photo: ${photoPath}`);
                    }
                }
            }
        }
        
        // Clear the main loading timeout
        clearTimeout(loadingTimeout);
        
        // Update the global photoData array
        photoData = availablePhotos;
        
        // Final progress update
        updateLoadingProgress(100, 'Finalizing gallery...');
        
        // Load photos into gallery
        loadPhotos();
        
        console.log(`Successfully loaded ${photoData.length} photos`);
        
        // Complete loading
        completeLoading();
        
        // Show notification
        if (photoData.length > 0) {
            showNotification(`Gallery loaded! Found ${photoData.length} photos`, 'success');
        } else {
            showNotification('No photos found, using fallback', 'warning');
            loadFallbackPhotos();
        }
        
    } catch (error) {
        console.error('Error loading photos:', error);
        // Fallback to empty gallery
        photoData = [];
        loadPhotos();
        showNotification('Error loading photos. Using fallback.', 'error');
        loadFallbackPhotos();
    }
}

// Fallback function to load photos if main method fails
function loadFallbackPhotos() {
    console.log('🚨 Loading fallback photos...');
    updateLoadingProgress(80, 'Loading fallback photos...');
    
    // Use the photos we know exist in the assets folder
    const fallbackPhotos = [
        'assets/photos/photo1.jpeg',
        'assets/photos/photo2.jpeg',
        'assets/photos/photo3.jpeg',
        'assets/photos/photo4.jpeg',
        'assets/photos/photo5.jpeg'
    ];
    
    photoData = fallbackPhotos.map(photoPath => ({
        src: photoPath,
        alt: getPhotoAlt(photoPath),
        title: getPhotoTitle(photoPath),
        description: getPhotoDescription(photoPath),
        category: 'family',
        crop: 'top'
    }));
    
    updateLoadingProgress(100, 'Fallback photos loaded!');
    
    // Load photos into gallery
    loadPhotos();
    
    // Complete loading with a small delay to show progress
    setTimeout(() => {
        completeLoading();
    }, 500);
}

// Function to dynamically scan the assets/photos folder
async function scanAssetsFolder() {
    try {
        // Common image extensions to look for
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
        
        // Try to detect photos using multiple methods
        const detectedPhotos = [];
        
        // Method 1: Try to fetch a directory listing (if server supports it)
        try {
            const response = await fetch('assets/photos/');
            if (response.ok) {
                const text = await response.text();
                // Parse directory listing if available
                const photoMatches = text.match(/href="([^"]*\.(jpg|jpeg|png|gif|webp|svg))"/gi);
                if (photoMatches) {
                    photoMatches.forEach(match => {
                        const filename = match.match(/href="([^"]*)"/)[1];
                        if (filename && !filename.includes('..')) {
                            detectedPhotos.push(`assets/photos/${filename}`);
                        }
                    });
                }
            }
        } catch (e) {
            console.log('Directory listing not available, using fallback method');
        }
        
        // Method 2: Try common naming patterns and extensions
        if (detectedPhotos.length === 0) {
            // Try to detect photos by attempting to load them with common patterns
            const commonPatterns = [
                'photo1', 'photo2', 'photo3', 'photo4', 'photo5', 'photo6', 'photo7', 'photo8', 'photo9', 'photo10',
                'image1', 'image2', 'image3', 'image4', 'image5',
                'img1', 'img2', 'img3', 'img4', 'img5',
                'manohar', 'family', 'memories', 'legacy'
            ];
            
            for (const pattern of commonPatterns) {
                for (const ext of imageExtensions) {
                    const photoPath = `assets/photos/${pattern}${ext}`;
                    try {
                        const testImg = new Image();
                        await new Promise((resolve, reject) => {
                            testImg.onload = () => {
                                if (!detectedPhotos.includes(photoPath)) {
                                    detectedPhotos.push(photoPath);
                                }
                                resolve();
                            };
                            testImg.onerror = () => reject();
                            testImg.src = photoPath;
                        });
                    } catch (e) {
                        // Photo doesn't exist, continue to next
                    }
                }
            }
        }
        
        // Method 3: Fallback to known photos (for backward compatibility)
        if (detectedPhotos.length === 0) {
            const fallbackPhotos = [
                'assets/photos/20BCD3A6-E208-4B4A-A9F5-C4E7E213AC19_1_105_c.jpeg',
                'assets/photos/4EBE2B21-F290-4FAE-8469-0EDAD7AC5C2F_1_105_c 2.jpeg',
                'assets/photos/4EF15CBC-ADC7-4577-8EBC-00C0351B49D0 2.jpeg',
                'assets/photos/31206909-F1F9-4374-B24D-1AB4647F0D70_1_201_a.jpeg'
            ];
            
            // Test each fallback photo
            for (const photoPath of fallbackPhotos) {
                try {
                    const testImg = new Image();
                    await new Promise((resolve, reject) => {
                        testImg.onload = () => {
                            if (!detectedPhotos.includes(photoPath)) {
                                detectedPhotos.push(photoPath);
                            }
                            resolve();
                        };
                        testImg.onerror = () => reject();
                        testImg.src = photoPath;
                    });
                } catch (e) {
                    // Photo doesn't exist, continue to next
                }
            }
        }
        
        // Method 4: Try to detect by file size and common patterns
        if (detectedPhotos.length === 0) {
            // This is a more aggressive approach - try to detect photos by attempting to load them
            // with various combinations of names and extensions
            const aggressivePatterns = [
                'manohar', 'family', 'memories', 'legacy', 'photo', 'image', 'img',
                '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
            ];
            
            for (const pattern of aggressivePatterns) {
                for (const ext of imageExtensions) {
                    const photoPath = `assets/photos/${pattern}${ext}`;
                    try {
                        const testImg = new Image();
                        await new Promise((resolve, reject) => {
                            testImg.onload = () => {
                                if (!detectedPhotos.includes(photoPath)) {
                                    detectedPhotos.push(photoPath);
                                }
                                resolve();
                            };
                            testImg.onerror = () => reject();
                            testImg.src = photoPath;
                        });
                    } catch (e) {
                        // Photo doesn't exist, continue to next
                    }
                }
            }
        }
        
        console.log(`Detected ${detectedPhotos.length} photos using dynamic scanning`);
        return detectedPhotos;
        
    } catch (error) {
        console.error('Error scanning assets folder:', error);
        return [];
    }
}

// Function to preload images with better caching
function preloadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        
        // Add cache-busting for GitHub Pages
        const timestamp = Date.now();
        const separator = src.includes('?') ? '&' : '?';
        img.src = `${src}${separator}v=${timestamp}`;
    });
}

// Helper function to generate alt text for photos
function getPhotoAlt(photoPath) {
    const fileName = photoPath.split('/').pop().split('.')[0];
    return `Family Photo - ${fileName}`;
}

// Helper function to generate title for photos
function getPhotoTitle(photoPath) {
    const fileName = photoPath.split('/').pop().split('.')[0];
    return `Family Memory - ${fileName}`;
}

// Helper function to generate description for photos
function getPhotoDescription(photoPath) {
    const fileName = photoPath.split('/').pop().split('.')[0];
    return `Precious family moment captured in ${fileName}`;
}

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
        if (photoData.length === 0) {
            // Show message when no photos are available
            galleryGrid.innerHTML = `
                <div class="no-photos-message">
                    <i class="fas fa-image"></i>
                    <h3>No Photos Available</h3>
                    <p>Photos will appear here once they are added to the assets folder.</p>
                </div>
            `;
        } else {
        galleryGrid.innerHTML = photoData.map(createGalleryItem).join('');
        
        // Reinitialize lightbox functionality for new items
        initializeLightbox();
        
        // Add staggered animation to gallery items
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
        }
        
        // Update photo counter
        updatePhotoCounter();
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
    // Show loading notification
    showNotification('Scanning for new photos...', 'info');
    
    // Reload all photos dynamically
    loadAvailablePhotos();
    
    // Reinitialize all event listeners
    initializeEventListeners();
}

// Function to manually add a specific photo (for testing)
function addSpecificPhoto(photoPath) {
    if (!photoData.some(photo => photo.src === photoPath)) {
        const newPhoto = {
            src: photoPath,
            alt: getPhotoAlt(photoPath),
            title: getPhotoTitle(photoPath),
            description: getPhotoDescription(photoPath),
            category: 'family',
            crop: 'top'
        };
        
        photoData.push(newPhoto);
        loadPhotos();
        showNotification(`Added new photo: ${photoPath}`, 'success');
    } else {
        showNotification('Photo already exists in gallery', 'info');
    }
}

// Loading utility functions
function startLoading() {
    loadingStartTime = Date.now();
    photosLoaded = 0;
    loadingProgress = 0;
    updateLoadingProgress(0, 'Initializing...');
    updatePhotosLoaded();
    updateLoadingTime();
}

function updateLoadingProgress(progress, text) {
    loadingProgress = progress;
    if (progressFill) progressFill.style.width = `${progress}%`;
    if (progressText) progressText.textContent = text;
}

function updatePhotosLoaded() {
    if (photosLoadedElement) {
        photosLoadedElement.textContent = photosLoaded;
    }
}

function updateLoadingTime() {
    const elapsed = Math.floor((Date.now() - loadingStartTime) / 1000);
    if (loadingTimeElement) {
        loadingTimeElement.textContent = elapsed;
    }
}

function completeLoading() {
    // Update final stats
    updateLoadingProgress(100, 'Ready!');
    updateLoadingTime();
    
    // Clear the global loading flag
    window.loadingInProgress = false;
    
    // Restore body overflow and show main content
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    // Hide loading screen after a short delay
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            // Remove loading screen from DOM after animation
            setTimeout(() => {
                if (loadingScreen) {
                    loadingScreen.remove();
                }
            }, 500);
        }
    }, 1000);
}

// Update loading time every second
setInterval(updateLoadingTime, 1000);

// Safety mechanism: Force complete loading if it takes too long
function forceCompleteLoading() {
    console.log('🚨 Force completing loading due to safety timeout');
    
    // Ensure we have some photos or use fallback
    if (photoData.length === 0) {
        loadFallbackPhotos();
    } else {
        // Just complete with what we have
        updateLoadingProgress(100, 'Ready!');
        updateLoadingTime();
        window.loadingInProgress = false;
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        
        // Force hide loading screen
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
            loadingScreen.remove();
        }
    }
}

// Set a global safety timeout
setTimeout(() => {
    if (loadingScreen && loadingScreen.style.display !== 'none') {
        console.log('⚠️ Global safety timeout triggered');
        forceCompleteLoading();
    }
}, 20000); // 20 second global safety timeout

// Performance optimization for GitHub Pages
function optimizeForGitHubPages() {
    // Add preload hints for critical resources
    const preloadLinks = [
        'assets/photos/manohar.jpeg',
        'assets/photos/photo1.jpeg',
        'assets/photos/photo2.jpeg',
        'assets/photos/photo3.jpeg',
        'assets/photos/photo4.jpeg',
        'assets/photos/photo5.jpeg'
    ];
    
    preloadLinks.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
    
    // Add service worker for better caching (if supported)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('Service Worker registration failed:', err);
        });
    }
}

// Call optimization function
optimizeForGitHubPages();

// Function to easily add new photos (for manual updates)
function addNewPhotoToGallery(photoPath, title, description, category = 'family') {
    // Add the new photo path to the photoFiles array in loadAvailablePhotos function
    // Then call refreshGallery() to reload the gallery
    console.log('To add a new photo:');
    console.log('1. Place the photo in assets/photos/ folder');
    console.log('2. Call refreshGallery() or reload the page');
    console.log('3. The system will automatically detect new photos');
    
    showNotification('Photos are now automatically detected! Use refresh button to scan for new photos.', 'info');
}

// Debug function to see current photos
function debugPhotos() {
    console.log('Current photoData:', photoData);
    console.log('Photo count:', photoData.length);
    console.log('Photo sources:', photoData.map(p => p.src));
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

// Initialize page with immediate loading screen
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading screen elements
    loadingScreen = document.getElementById('loading-screen');
    progressFill = document.getElementById('progress-fill');
    progressText = document.getElementById('progress-text');
    photosLoadedElement = document.getElementById('photos-loaded');
    loadingTimeElement = document.getElementById('loading-time-element');
    
    // Ensure loading screen is visible (should already be visible from CSS)
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
        loadingScreen.style.opacity = '1';
        loadingScreen.style.visibility = 'visible';
        console.log('✅ Loading screen confirmed visible');
    } else {
        console.error('❌ Loading screen element not found!');
    }
    
    // Detect mobile and optimize loading
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        console.log('📱 Mobile device detected - optimizing loading experience');
        // Add mobile-specific loading optimizations
        updateLoadingProgress(5, 'Mobile optimization...');
    }
    
    // Load photos dynamically with debug info
    console.log('🚀 Starting dynamic photo detection...');
    loadAvailablePhotos(); // Changed to loadAvailablePhotos
    
    // Set default crop to 'top'
    setTimeout(() => {
        setDefaultCrop();
    }, 500);
    
    // Initialize About section animations
    initializeAboutAnimations();
    
    // Initialize Memorial section animations
    initializeMemorialAnimations();
    
    // Add animated class to hero title letters after initial animation
    setTimeout(() => {
        const heroLetters = document.querySelectorAll('.hero-title .title-line span');
        heroLetters.forEach(letter => {
            letter.classList.add('animated');
        });
        console.log('✨ Hero title letters animation completed');
    }, 1000); // Reduced time to prevent letters from disappearing
    
    // Add debug info to console
    console.log('💡 Debug commands available:');
    console.log('  - debugPhotos() - Show current photos');
    console.log('  - loadAvailablePhotos() - Rescan for photos');
    console.log('  - refreshGallery() - Refresh gallery');
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

// Enhanced Button Functionality
function initializeInvitationButtons() {
    const buttons = document.querySelectorAll('.invitation-btn');
    
    buttons.forEach(button => {
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
        
        // Add loading state for download button
        if (button.classList.contains('secondary')) {
            button.addEventListener('click', function() {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 2000);
            });
        }
    });
}

// Create ripple effect for buttons
function createRippleEffect(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect CSS
function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .invitation-btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize enhanced buttons when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize enhanced invitation buttons
    initializeInvitationButtons();
    addRippleStyles();
});
