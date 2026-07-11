/* ============================================
   HMC Roofing Pro LLC - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // --- Elements ---
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const backToTop = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');

    // --- Hamburger Menu Toggle ---
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            nav.classList.toggle('open');
        });

        // Close menu on link click
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                nav.classList.remove('open');
            });
        });

        // Close menu on outside click
        document.addEventListener('click', function(e) {
            if (!header.contains(e.target)) {
                hamburger.classList.remove('active');
                nav.classList.remove('open');
            }
        });
    }

    // --- Header Scroll Effect ---
    let lastScrollY = 0;

    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;

        // Add shadow on scroll
        if (scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollY = scrollY;
    }, { passive: true });

    // --- Back to Top Button ---
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, { passive: true });
    }

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Contact Form Handler (sends to email) ---
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic validation
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();

            if (!name || !phone || !email) {
                alert('Please fill in the required fields: Name, Phone, and Email.');
                return;
            }

            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            }

            // Submit to FormSubmit which forwards to your Gmail
            const formData = new FormData(contactForm);

            fetch('https://formsubmit.co/ajax/zhexuuv@gmail.com', {
                method: 'POST',
                body: formData
            })
            .then(function(response) {
                return response.json();
            })
            .then(function() {
                contactForm.innerHTML = `
                    <div class="form-success">
                        <i class="fas fa-check-circle"></i>
                        <h3>Thank You for Reaching Out!</h3>
                        <p>Your message has been sent. We'll get back to you shortly.</p>
                        <p style="margin-top: 12px; font-size: 0.9rem; color: #64748b;">In the meantime, call us at <strong>(610) 349-2174</strong> for immediate assistance.</p>
                    </div>
                `;
            })
            .catch(function() {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                }
                alert('Something went wrong. Please email us directly at zhexuuv@gmail.com or call (610) 349-2174.');
            });
        });
    }

    // --- Scroll Animation: Fade In Elements ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe service cards for animation
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(24px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe benefits
    document.querySelectorAll('.benefit').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(16px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Observe stat items
    document.querySelectorAll('.stat').forEach(stat => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        stat.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(stat);
    });

    // Observe why us image
    const whyUsImage = document.querySelector('.why-us__image');
    if (whyUsImage) {
        whyUsImage.style.opacity = '0';
        whyUsImage.style.transform = 'translateX(24px)';
        whyUsImage.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        observer.observe(whyUsImage);
    }

    // Observe contact form
    const contactFormEl = document.querySelector('.contact__form-wrapper');
    if (contactFormEl) {
        contactFormEl.style.opacity = '0';
        contactFormEl.style.transform = 'translateY(24px)';
        contactFormEl.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(contactFormEl);
    }

    // Observe contact info
    const contactInfo = document.querySelector('.contact__info');
    if (contactInfo) {
        contactInfo.style.opacity = '0';
        contactInfo.style.transform = 'translateY(24px)';
        contactInfo.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(contactInfo);
    }

    console.log('HMC Roofing Pro LLC - Website loaded successfully');
});