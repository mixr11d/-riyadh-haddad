document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Water Animation
    const waterAnimation = document.getElementById('water-animation');
    let hydrationLevel = 0;

    function updateWaterLevel() {
        hydrationLevel += 1;
        if (hydrationLevel > 100) hydrationLevel = 0;
        
        if (waterAnimation) {
            waterAnimation.style.height = `${hydrationLevel}%`;
        }
        
        setTimeout(updateWaterLevel, 200);
    }

    updateWaterLevel();

    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMessage = document.getElementById('newsletter-message');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Simulate form submission
            newsletterMessage.textContent = 'Subscribing...';
            newsletterMessage.style.color = '#ffffff';
            
            setTimeout(function() {
                newsletterMessage.textContent = `Thanks for subscribing! We've sent a confirmation to ${email}`;
                newsletterForm.reset();
            }, 1500);
        });
    }

    // Gallery Filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Testimonial Carousel
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    if (prevBtn && nextBtn && dots.length > 0) {
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
            showSlide(currentSlide);
        });
        
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % testimonialCards.length;
            showSlide(currentSlide);
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
            });
        });
        
        // Auto slide
        setInterval(function() {
            if (document.hasFocus()) {
                currentSlide = (currentSlide + 1) % testimonialCards.length;
                showSlide(currentSlide);
            }
        }, 5000);
    }

    // Testimonial Rating Filters
    const ratingButtons = document.querySelectorAll('.testimonial-filters .filter-btn');
    const testimonialItems = document.querySelectorAll('.testimonial-item');

    if (ratingButtons.length > 0 && testimonialItems.length > 0) {
        ratingButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                ratingButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const rating = this.getAttribute('data-rating');
                
                // Filter testimonial items
                testimonialItems.forEach(item => {
                    if (rating === 'all' || item.getAttribute('data-rating') === rating) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Load More Reviews
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more reviews
            this.textContent = 'Loading...';
            
            setTimeout(() => {
                const testimonialsContainer = document.querySelector('.testimonials-container');
                
                // Create new testimonial items
                const newTestimonials = [
                    {
                        name: 'Thomas H.',
                        avatar: 'https://randomuser.me/api/portraits/men/72.jpg',
                        rating: 5,
                        text: 'The app integration is seamless. I love how it syncs with my fitness tracker!'
                    },
                    {
                        name: 'Rachel W.',
                        avatar: 'https://randomuser.me/api/portraits/women/72.jpg',
                        rating: 4,
                        text: 'Great product, but I wish it came in more sizes.'
                    },
                    {
                        name: 'Kevin M.',
                        avatar: 'https://randomuser.me/api/portraits/men/62.jpg',
                        rating: 5,
                        text: 'This bottle has completely changed my hydration habits. Highly recommend!'
                    }
                ];
                
                newTestimonials.forEach(testimonial => {
                    const item = document.createElement('div');
                    item.className = 'testimonial-item';
                    item.setAttribute('data-rating', testimonial.rating);
                    
                    item.innerHTML = `
                        <div class="testimonial-header">
                            <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar-small">
                            <div class="testimonial-meta-small">
                                <h4>${testimonial.name}</h4>
                                <div class="testimonial-stars-small">
                                    ${Array(5).fill('').map((_, i) => 
                                        i < testimonial.rating 
                                            ? '<i class="fas fa-star"></i>' 
                                            : '<i class="far fa-star"></i>'
                                    ).join('')}
                                </div>
                            </div>
                        </div>
                        <p>"${testimonial.text}"</p>
                    `;
                    
                    testimonialsContainer.appendChild(item);
                });
                
                // Update button text and disable it
                this.textContent = 'All Reviews Loaded';
                this.disabled = true;
                this.style.opacity = '0.7';
                this.style.cursor = 'default';
                
                // Apply current filter
                const activeFilter = document.querySelector('.testimonial-filters .filter-btn.active');
                if (activeFilter) {
                    const rating = activeFilter.getAttribute('data-rating');
                    const allItems = document.querySelectorAll('.testimonial-item');
                    
                    allItems.forEach(item => {
                        if (rating === 'all' || item.getAttribute('data-rating') === rating) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                }
            }, 1500);
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                    const toggle = item.querySelector('.faq-toggle i');
                    toggle.className = 'fas fa-plus';
                });
                
                // If the clicked item wasn't active, open it
                if (!isActive) {
                    faqItem.classList.add('active');
                    const toggle = faqItem.querySelector('.faq-toggle i');
                    toggle.className = 'fas fa-minus';
                }
            });
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const subject = this.querySelector('#subject').value;
            const message = this.querySelector('#message').value;
            
            // Simulate form submission
            formMessage.textContent = 'Sending message...';
            formMessage.style.color = '#0088cc';
            
            setTimeout(function() {
                formMessage.textContent = `Thanks, ${name}! Your message has been sent. We'll get back to you soon.`;
                formMessage.style.color = '#34c759';
                contactForm.reset();
            }, 1500);
        });
    }
});