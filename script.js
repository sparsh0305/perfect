/*
   Perfect Bake - JavaScript
   This script provides interactive functionality for the Perfect Bake website
   including preloader, navigation effects, background selector, testimonial slider, and more.
*/

document.addEventListener('DOMContentLoaded', function() {
    // Preloader functionality
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    }

    // Navigation effects
    const navbar = document.querySelector('.navbar');
    const logoIcon = document.querySelector('.logo-icon');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    // Handle navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });

    // Background selector functionality
    const bgSelectorToggle = document.querySelector('.bg-selector-toggle');
    const bgSelector = document.querySelector('.bg-selector');
    const bgOptions = document.querySelectorAll('.bg-option');
    const hero = document.querySelector('.hero');

    if (bgSelectorToggle) {
        bgSelectorToggle.addEventListener('click', function() {
            bgSelector.classList.toggle('active');
        });
    }

    // Background image changing functionality
    if (bgOptions.length > 0) {
        bgOptions.forEach(option => {
            option.addEventListener('click', function() {
                const bgImage = this.getAttribute('data-bg');
                
                // Remove active class from all options
                bgOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Change hero background
                if (hero) {
                    hero.style.backgroundImage = `url(${bgImage})`;
                    
                    // Save to localStorage to persist user preference
                    localStorage.setItem('perfectBake_bg', bgImage);
                }
            });
        });
        
        // Load saved background if exists
        const savedBg = localStorage.getItem('perfectBake_bg');
        if (savedBg && hero) {
            hero.style.backgroundImage = `url(${savedBg})`;
            
            // Mark the saved option as active
            bgOptions.forEach(option => {
                if (option.getAttribute('data-bg') === savedBg) {
                    option.classList.add('active');
                }
            });
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Menu tabs functionality
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuItems = document.querySelectorAll('.menu-item');

    if (menuTabs.length > 0) {
        menuTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Remove active class from all tabs
                menuTabs.forEach(tab => tab.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Filter menu items
                menuItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (category === 'all' || itemCategory === category) {
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
    }

    // Testimonial slider functionality
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
        if (index < 0) {
            currentSlide = testimonials.length - 1;
        } else if (index >= testimonials.length) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }
        
        const translateValue = -currentSlide * 100 + '%';
        document.querySelector('.testimonial-slider').style.transform = 'translateX(' + translateValue + ')';
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    if (testimonials.length > 0) {
        // Initialize slider
        showSlide(currentSlide);
        
        // Set up event listeners for controls
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                showSlide(currentSlide - 1);
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                showSlide(currentSlide + 1);
            });
        }
        
        // Set up dots
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                showSlide(i);
            });
        });
        
        // Auto-rotate slides every 5 seconds
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    // Form validation and submission
    const orderForm = document.getElementById('order-form');
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = this.querySelector('[name="name"]').value;
            const email = this.querySelector('[name="email"]').value;
            const phone = this.querySelector('[name="phone"]').value;
            
            if (!name || !email || !phone) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Show success message (in a real application, you would send data to server)
            const successMessage = document.querySelector('.form-success');
            if (successMessage) {
                successMessage.classList.add('show');
                
                // Reset form
                this.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
            }
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('[name="email"]').value;
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            // Handle newsletter subscription (in a real application)
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }

    // Animation on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    }
    
    // Run once on page load
    checkInView();
    
    // Run on scroll
    window.addEventListener('scroll', checkInView);

    // Modal functionality
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const modalCloses = document.querySelectorAll('.modal-close');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    modalCloses.forEach(close => {
        close.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close modal when clicking outside content
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Product quick view functionality
    const quickViewButtons = document.querySelectorAll('.quick-view');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productId = this.getAttribute('data-product');
            const productName = this.closest('.product-card').querySelector('h3').textContent;
            const productPrice = this.getAttribute('data-price');
            const productImage = this.closest('.product-card').querySelector('img').src;
            const productDesc = this.closest('.product-card').querySelector('p').textContent;
            
            // Populate modal with product data
            const modal = document.getElementById('product-modal');
            if (modal) {
                modal.querySelector('.modal-product-name').textContent = productName;
                modal.querySelector('.modal-product-price').textContent = productPrice;
                modal.querySelector('.modal-product-image').src = productImage;
                modal.querySelector('.modal-product-desc').textContent = productDesc;
                
                // Show modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Image lightbox functionality
    const galleryImages = document.querySelectorAll('.gallery-image');
    const lightbox = document.querySelector('.lightbox');
    
    if (galleryImages.length > 0 && lightbox) {
        galleryImages.forEach(image => {
            image.addEventListener('click', function() {
                const imgSrc = this.getAttribute('data-full') || this.querySelector('img').src;
                const imgAlt = this.querySelector('img').alt;
                
                // Populate lightbox
                lightbox.querySelector('.lightbox-image').src = imgSrc;
                lightbox.querySelector('.lightbox-image').alt = imgAlt;
                lightbox.querySelector('.lightbox-caption').textContent = imgAlt;
                
                // Show lightbox
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close lightbox
        lightbox.querySelector('.lightbox-close').addEventListener('click', function() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    const cartItems = localStorage.getItem('perfectBake_cart') ? JSON.parse(localStorage.getItem('perfectBake_cart')) : [];
    
    // Update cart count on page load
    if (cartCount) {
        cartCount.textContent = cartItems.length;
    }
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productId = this.getAttribute('data-product');
            const productName = this.closest('.product-card, .menu-item, .modal-content').querySelector('h3').textContent;
            const productPrice = this.getAttribute('data-price');
            
            // Add item to cart
            cartItems.push({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1
            });
            
            // Save to localStorage
            localStorage.setItem('perfectBake_cart', JSON.stringify(cartItems));
            
            // Update cart count
            if (cartCount) {
                cartCount.textContent = cartItems.length;
            }
            
            // Show notification
            const notification = document.createElement('div');
            notification.className = 'cart-notification';
            notification.textContent = `${productName} added to cart!`;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        });
    });
});
// Review Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Open Review Modal
    const openReviewBtn = document.querySelector('.open-review-form');
    const reviewModal = document.getElementById('review-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (openReviewBtn && reviewModal) {
        openReviewBtn.addEventListener('click', function() {
            reviewModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    }
    
    if (closeModal && reviewModal) {
        closeModal.addEventListener('click', function() {
            reviewModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
        
        // Also close when clicking outside the modal content
        reviewModal.addEventListener('click', function(e) {
            if (e.target === reviewModal) {
                reviewModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Star Rating System
    const stars = document.querySelectorAll('.star-rating i');
    const ratingInput = document.getElementById('rating-value');
    
    if (stars.length && ratingInput) {
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = this.getAttribute('data-rating');
                ratingInput.value = rating;
                
                // Update visual state of stars
                stars.forEach(s => {
                    const sRating = s.getAttribute('data-rating');
                    if (sRating <= rating) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                        s.classList.add('active');
                    } else {
                        s.classList.add('far');
                        s.classList.remove('fas');
                        s.classList.remove('active');
                    }
                });
            });
            
            // Hover effects
            star.addEventListener('mouseenter', function() {
                const rating = this.getAttribute('data-rating');
                
                stars.forEach(s => {
                    const sRating = s.getAttribute('data-rating');
                    if (sRating <= rating) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                    }
                });
            });
            
            star.addEventListener('mouseleave', function() {
                const currentRating = ratingInput.value;
                
                stars.forEach(s => {
                    const sRating = s.getAttribute('data-rating');
                    if (sRating <= currentRating) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.add('far');
                        s.classList.remove('fas');
                    }
                });
            });
        });
    }
    
    // Photo Upload Preview
    const photoInput = document.getElementById('review-photo');
    const photoPreview = document.querySelector('.photo-preview');
    
    if (photoInput && photoPreview) {
        photoInput.addEventListener('change', function() {
            photoPreview.innerHTML = ''; // Clear previous previews
            
            if (this.files) {
                const files = Array.from(this.files);
                
                files.forEach((file, index) => {
                    if (file.type.match('image.*')) {
                        const reader = new FileReader();
                        
                        reader.onload = function(e) {
                            const imgWrapper = document.createElement('div');
                            imgWrapper.classList.add('preview-image-wrapper');
                            imgWrapper.style.position = 'relative';
                            
                            const img = document.createElement('img');
                            img.classList.add('preview-image');
                            img.src = e.target.result;
                            
                            const removeBtn = document.createElement('div');
                            removeBtn.classList.add('remove-img');
                            removeBtn.innerHTML = '×';
                            removeBtn.dataset.index = index;
                            
                            removeBtn.addEventListener('click', function() {
                                imgWrapper.remove();
                                // Note: This doesn't actually remove from the FileList
                                // In a real application, you would need to handle this
                                // by creating a new FileList or using FormData
                            });
                            
                            imgWrapper.appendChild(img);
                            imgWrapper.appendChild(removeBtn);
                            photoPreview.appendChild(imgWrapper);
                        };
                        
                        reader.readAsDataURL(file);
                    }
                });
            }
        });
    }
    
    // Form Submission
    const reviewForm = document.getElementById('review-form');
    
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate the form
            const name = document.getElementById('review-name').value;
            const email = document.getElementById('review-email').value;
            const rating = document.getElementById('rating-value').value;
            const product = document.getElementById('product-ordered').value;
            const reviewText = document.getElementById('review-text').value;
            
            if (!name || !email || rating === '0' || !product || !reviewText) {
                alert('Please fill in all required fields and provide a rating.');
                return;
            }
            
            // Form data collection for backend submission
            const formData = {
                name,
                email,
                rating,
                product,
                reviewText,
                // In a real application, you'd handle file uploads separately
            };
            
            console.log('Review submitted:', formData);
            
            // Here you would typically send the formData to your backend
            // using fetch() or another AJAX method
            
            // For demo purposes, simulate successful submission
            alert('Thank you for your review! It will be displayed after moderation.');
            
            // Reset the form
            reviewForm.reset();
            
            // Reset star rating visual
            stars.forEach(s => {
                s.classList.add('far');
                s.classList.remove('fas');
                s.classList.remove('active');
            });
            ratingInput.value = '0';
            
            // Clear photo previews
            photoPreview.innerHTML = '';
            
            // Close the modal
            reviewModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Initialize Animation on Scroll
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
});

// This helper function would be useful to display new reviews when they're added
function createReviewCard(review) {
    const card = document.createElement('div');
    card.classList.add('testimonial-card');
    card.setAttribute('data-aos', 'fade-up');
    
    card.innerHTML = `
        <div class="testimonial-header">
            <div class="author-image">
                <img src="${review.image || '/placeholder.svg?height=80&width=80&text=' + review.name.charAt(0)}" alt="${review.name}">
            </div>
            <div class="author-info">
                <h4>${review.name}</h4>
                <p>${review.type || 'Customer'}</p>
            </div>
        </div>
        <div class="testimonial-rating">
            ${generateStars(review.rating)}
        </div>
        <div class="testimonial-text">
            <p>"${review.text}"</p>
        </div>
        <div class="testimonial-date">
            <p>${review.date}</p>
        </div>
    `;
    
    return card;
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}
