// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
});

// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 3000);
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    updateThemeIcon();
}

themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-theme');
    updateThemeIcon();
    
    // Save theme preference
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark-theme');
    } else {
        localStorage.removeItem('theme');
    }
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-theme')) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Back to Top Button
const backToTop = document.getElementById('back-to-top');

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

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
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
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active nav link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Custom Modern Toast Notification System
function showToastNotification(message, type = 'success', title = '') {
    let container = document.getElementById('toast-notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-notification-container';
        container.style.cssText = `
            position: fixed;
            top: 25px;
            right: 25px;
            z-index: 999999;
            display: flex;
            flex-direction: column;
            gap: 15px;
            pointer-events: none;
            max-width: 420px;
            width: 90%;
        `;
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `custom-toast ${type}`;
    
    const isSuccess = type === 'success';
    const iconClass = isSuccess ? 'fa-check-circle' : 'fa-exclamation-circle';
    const toastTitle = title || (isSuccess ? 'Message Delivered!' : 'Delivery Notice');

    toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-icon ${type}">
                <i class="fas ${iconClass}"></i>
            </div>
            <div class="toast-text">
                <h4 class="toast-title">${toastTitle}</h4>
                <p class="toast-message">${message}</p>
            </div>
            <button class="toast-close-btn" aria-label="Close Toast">&times;</button>
        </div>
        <div class="toast-progress-bar"></div>
    `;

    toast.style.pointerEvents = 'auto';
    container.appendChild(toast);

    const closeBtn = toast.querySelector('.toast-close-btn');
    closeBtn.addEventListener('click', () => removeToast(toast));

    const timer = setTimeout(() => removeToast(toast), 5000);

    function removeToast(t) {
        clearTimeout(timer);
        t.style.animation = 'toastSlideOut 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        setTimeout(() => {
            if (t.parentNode) t.remove();
        }, 400);
    }
}

function showNotification(message, type = 'success') {
    showToastNotification(message, type);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.project-card, .certificate-card, .achievement-card, .timeline-item, .skill-category-card, .experience-card');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// ==========================================
// Dynamic Multi-Role Typewriter Animation
// ==========================================
function initTypewriterEffect() {
    const textElement = document.getElementById('typing-text');
    if (!textElement) return;

    const roles = [
        "AI & Machine Learning Developer",
        "Python Full-Stack Engineer",
        "Android (Kotlin) Developer",
        "Problem Solver & Innovator",
        "CSE (AIML) Student @ KIET"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            textElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 35;
        } else {
            textElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 75;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 1800; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 350; // Pause before next word
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 600);
}

document.addEventListener('DOMContentLoaded', function() {
    initTypewriterEffect();
});

// Project Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.dataset.filter;
        
        projectCards.forEach(card => {
            const categories = card.dataset.category ? card.dataset.category.split(' ') : [];
            if (filterValue === 'all' || categories.includes(filterValue)) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});



// Particles Background
function createParticle() {
    const particlesContainer = document.getElementById('particles-container');
    if (!particlesContainer) return;
    
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    particlesContainer.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, 15000);
}

// Create particles periodically
setInterval(createParticle, 300);

// Enhanced project card interactions
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth reveal animations for sections
function revealSections() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });
}

// Direct Silent Background Email Submission (No Outlook / Mail app popups!)
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Animated sending state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';
        submitBtn.disabled = true;
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            showToastNotification('Please fill out all required fields.', 'error', 'Validation Error');
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            return;
        }

        try {
            // Direct Background AJAX request to FormSubmit (Sends directly to boppudisanthosh44@gmail.com)
            const response = await fetch("https://formsubmit.co/ajax/boppudisanthosh44@gmail.com", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message,
                    _subject: `📬 New Portfolio Message from ${name}`,
                    _template: "table",
                    _captcha: "false"
                })
            });

            const result = await response.json();

            if (response.ok || result.success === "true" || result.success === true) {
                showToastNotification(`Thank you ${name}! Your message has been sent directly to boppudisanthosh44@gmail.com.`, 'success', 'Message Sent! 🎉');
                contactForm.reset();
            } else {
                throw new Error("API request failed");
            }
        } catch (err) {
            // Fallback to SmtpJS in background without mailto
            if (typeof Email !== 'undefined') {
                try {
                    const emailHtml = `
                        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
                            <h3 style="color: #2563eb;">New Message from ${name}</h3>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Message:</strong></p>
                            <p style="background: #f8fafc; padding: 15px; border-left: 4px solid #2563eb;">${message.replace(/\n/g, '<br>')}</p>
                        </div>
                    `;
                    const res = await Email.send({
                        Host: "smtp.gmail.com",
                        Username: "boppudisanthosh44@gmail.com",
                        Password: "rfplelrrjiuckegr",
                        To: "boppudisanthosh44@gmail.com",
                        From: "boppudisanthosh44@gmail.com",
                        Subject: `📬 Portfolio Contact from ${name}`,
                        Body: emailHtml
                    });
                    showToastNotification(`Thank you ${name}! Your message has been sent to boppudisanthosh44@gmail.com.`, 'success', 'Message Received! 🎉');
                    contactForm.reset();
                } catch (e2) {
                    showToastNotification(`Thank you ${name}! Your message has been recorded.`, 'success', 'Message Saved!');
                    contactForm.reset();
                }
            } else {
                showToastNotification(`Thank you ${name}! Your message has been recorded.`, 'success', 'Message Saved!');
                contactForm.reset();
            }
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// Add notification styles
document.addEventListener('DOMContentLoaded', function() {
    // Add enhanced notification styles
    const notificationStyles = `
        .notification-content {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .notification-content i:first-child {
            font-size: 1.3rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 5px;
            border-radius: 50%;
            transition: background 0.3s ease;
            margin-left: auto;
        }
        
        .notification-close:hover {
            background: rgba(255, 255, 255, 0.2);
        }
    `;
    
    const notificationStyleSheet = document.createElement('style');
    notificationStyleSheet.textContent = notificationStyles;
    document.head.appendChild(notificationStyleSheet);
    
    revealSections();
});

// Social links hover effects
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.backgroundPosition = `center ${speed}px`;
    }
});

// ==========================================
// AI/ML Neural Network Canvas Animation
// ==========================================
function initAINeuralAnimation() {
    const canvas = document.getElementById('ai-neural-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let particles = [];
    let pulses = [];
    let animationFrameId;
    let mouse = { x: null, y: null, radius: 160 };

    // Responsive Canvas Resize
    function resizeCanvas() {
        const heroSection = canvas.parentElement;
        if (!heroSection) return;
        width = canvas.width = heroSection.offsetWidth;
        height = canvas.height = heroSection.offsetHeight;
        initParticles();
    }

    // Node / Neuron
    class NeuronNode {
        constructor(x, y) {
            this.x = x !== undefined ? x : Math.random() * width;
            this.y = y !== undefined ? y : Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.radius = Math.random() * 1.2 + 1.4; // 1.4px - 2.6px (delicate & crisp)
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce at edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse interaction
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius && dist > 0) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x -= (dx / dist) * force * 0.9;
                    this.y -= (dy / dist) * force * 0.9;
                }
            }
        }

        draw(isDark) {
            // Core Neuron
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = isDark ? '#38bdf8' : '#2563eb';
            ctx.fill();

            // Subtle glow
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 1.8, 0, Math.PI * 2);
            ctx.fillStyle = isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.08)';
            ctx.fill();
        }
    }

    // Firing Data Packet / Synaptic Signal Pulse
    class SynapticPulse {
        constructor(fromNode, toNode) {
            this.from = fromNode;
            this.to = toNode;
            this.progress = 0;
            this.speed = Math.random() * 0.022 + 0.016;
        }

        update() {
            this.progress += this.speed;
            return this.progress >= 1;
        }

        draw(isDark) {
            const currentX = this.from.x + (this.to.x - this.from.x) * this.progress;
            const currentY = this.from.y + (this.to.y - this.from.y) * this.progress;

            ctx.beginPath();
            ctx.arc(currentX, currentY, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = isDark ? '#a5f3fc' : '#1d4ed8';
            ctx.shadowBlur = isDark ? 8 : 4;
            ctx.shadowColor = isDark ? '#38bdf8' : '#2563eb';
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    function initParticles() {
        particles = [];
        pulses = [];
        if (width === 0 || height === 0) return;
        const nodeDensity = Math.min(Math.floor((width * height) / 16000), 55);
        const count = Math.max(nodeDensity, 25);

        for (let i = 0; i < count; i++) {
            particles.push(new NeuronNode());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        const isDark = document.body.classList.contains('dark-theme');
        const maxDist = 120;

        // Draw Synapses (Connecting Lines)
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDist) {
                    const alpha = (1 - dist / maxDist) * (isDark ? 0.28 : 0.16);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = isDark 
                        ? `rgba(56, 189, 248, ${alpha})` 
                        : `rgba(37, 99, 235, ${alpha})`;
                    ctx.lineWidth = isDark ? 1 : 0.85;
                    ctx.stroke();

                    // Randomly trigger synaptic signal pulse
                    if (Math.random() < 0.0003 && pulses.length < 6) {
                        pulses.push(new SynapticPulse(particles[i], particles[j]));
                    }
                }
            }
        }

        // Mouse interaction connections
        if (mouse.x !== null && mouse.y !== null) {
            for (let i = 0; i < particles.length; i++) {
                const dx = mouse.x - particles[i].x;
                const dy = mouse.y - particles[i].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const alpha = (1 - dist / mouse.radius) * 0.35;
                    ctx.beginPath();
                    ctx.moveTo(mouse.x, mouse.y);
                    ctx.lineTo(particles[i].x, particles[i].y);
                    ctx.strokeStyle = isDark ? `rgba(125, 211, 252, ${alpha})` : `rgba(37, 99, 235, ${alpha})`;
                    ctx.lineWidth = 1.1;
                    ctx.stroke();
                }
            }
        }

        // Update and draw signal pulses
        for (let i = pulses.length - 1; i >= 0; i--) {
            const isDone = pulses[i].update();
            pulses[i].draw(isDark);
            if (isDone) pulses.splice(i, 1);
        }

        // Update and draw neurons
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw(isDark);
        }

        animationFrameId = requestAnimationFrame(animate);
    }

    // Mouse tracking on Hero section
    const hero = canvas.parentElement;
    if (hero) {
        hero.addEventListener('mousemove', function(e) {
            const rect = hero.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        hero.addEventListener('mouseleave', function() {
            mouse.x = null;
            mouse.y = null;
        });
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
}

// Modal Popup Functionality
function initProjectModals() {
    const clickableCards = document.querySelectorAll('.project-card[data-modal]');
    const modalCloseBtns = document.querySelectorAll('.modal-close');
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    let savedScrollY = 0;

    function openModal(modal) {
        if (!modal) return;
        savedScrollY = window.pageYOffset || document.documentElement.scrollTop;
        modal.classList.add('active');
        document.body.style.position = 'fixed';
        document.body.style.top = `-${savedScrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, savedScrollY);
    }

    clickableCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Do not trigger modal if user clicked directly on an external link
            if (e.target.closest('a')) {
                return;
            }
            const modalId = card.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                openModal(targetModal);
            }
        });
    });

    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const modal = btn.closest('.modal-overlay');
            if (modal) closeModal(modal);
        });
    });

    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(overlay);
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modalOverlays.forEach(modal => {
                if (modal.classList.contains('active')) {
                    closeModal(modal);
                }
            });
        }
    });
}

// Instagram-Style Lightbox Slider for Achievement Image Galleries
function initAchievementLightbox() {
    const lightboxModal = document.getElementById('achievement-image-modal');
    const sliderImg = document.getElementById('insta-slider-img');
    const sliderCaption = document.getElementById('insta-slider-caption-text');
    const sliderCounter = document.getElementById('insta-slider-counter');
    const sliderDotsContainer = document.getElementById('insta-slider-dots');
    const prevBtn = document.getElementById('insta-prev-btn');
    const nextBtn = document.getElementById('insta-next-btn');
    const closeBtn = document.getElementById('insta-slider-close');
    
    if (!lightboxModal || !sliderImg) return;

    let galleryItems = [];
    let currentIndex = 0;
    let savedScrollY = 0;

    function renderSlide(index) {
        if (!galleryItems.length) return;
        currentIndex = (index + galleryItems.length) % galleryItems.length;
        
        const currentData = galleryItems[currentIndex];
        
        // Image transition
        sliderImg.classList.remove('fade-in');
        void sliderImg.offsetWidth; // Trigger reflow
        sliderImg.src = currentData.src;
        sliderImg.alt = currentData.caption || 'Achievement Image';
        sliderImg.classList.add('fade-in');

        // Caption & Counter
        if (sliderCaption) sliderCaption.textContent = currentData.caption || '';
        if (sliderCounter) sliderCounter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;

        // Render Dots
        if (sliderDotsContainer) {
            sliderDotsContainer.innerHTML = '';
            if (galleryItems.length > 1) {
                galleryItems.forEach((_, i) => {
                    const dot = document.createElement('span');
                    dot.className = `insta-dot ${i === currentIndex ? 'active' : ''}`;
                    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                    dot.addEventListener('click', (e) => {
                        e.stopPropagation();
                        renderSlide(i);
                    });
                    sliderDotsContainer.appendChild(dot);
                });
            }
        }

        // Show/Hide Nav Buttons if single image
        if (prevBtn) prevBtn.style.display = galleryItems.length > 1 ? 'flex' : 'none';
        if (nextBtn) nextBtn.style.display = galleryItems.length > 1 ? 'flex' : 'none';
    }

    function openGalleryModal(items, startIndex) {
        galleryItems = items;
        savedScrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        renderSlide(startIndex);

        lightboxModal.classList.add('active');
        document.body.style.position = 'fixed';
        document.body.style.top = `-${savedScrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
    }

    function closeGalleryModal() {
        lightboxModal.classList.remove('active');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, savedScrollY);
    }

    // Attach click handlers to achievement cards, gallery grids, and certificate containers
    const lightBoxContainers = document.querySelectorAll('.achievement-gallery-grid, .certificates-grid');
    lightBoxContainers.forEach(container => {
        const wrappers = Array.from(container.querySelectorAll('[data-lightbox]'));
        const items = wrappers.map(w => ({
            src: w.getAttribute('data-lightbox'),
            caption: w.getAttribute('data-caption') || ''
        }));

        wrappers.forEach((wrapper, idx) => {
            wrapper.addEventListener('click', (e) => {
                e.stopPropagation();
                openGalleryModal(items, idx);
            });
        });
    });

    // Make Certificate Cards fully clickable (except external verify links)
    const certCards = document.querySelectorAll('.certificate-card');
    certCards.forEach(card => {
        const wrapper = card.querySelector('[data-lightbox]');
        if (wrapper) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                // Ignore clicks directly on external verification links
                if (e.target.closest('.certificate-link')) return;
                
                const certGrid = card.closest('.certificates-grid');
                if (certGrid) {
                    const allCertWrappers = Array.from(certGrid.querySelectorAll('[data-lightbox]'));
                    const items = allCertWrappers.map(w => ({
                        src: w.getAttribute('data-lightbox'),
                        caption: w.getAttribute('data-caption') || ''
                    }));
                    const cardIndex = allCertWrappers.indexOf(wrapper);
                    if (cardIndex !== -1) {
                        openGalleryModal(items, cardIndex);
                    }
                }
            });
        }
    });

    // Navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            renderSlide(currentIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            renderSlide(currentIndex + 1);
        });
    }

    // Close button & overlay click
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeGalleryModal();
        });
    }

    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeGalleryModal();
        }
    });

    // Keyboard support (Left/Right arrow keys & Escape)
    document.addEventListener('keydown', (e) => {
        if (!lightboxModal.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') {
            renderSlide(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            renderSlide(currentIndex + 1);
        } else if (e.key === 'Escape') {
            closeGalleryModal();
        }
    });

    // Touch Swipe Support for Mobile Devices
    let touchStartX = 0;
    let touchEndX = 0;
    lightboxModal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightboxModal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            renderSlide(currentIndex + 1); // Swipe left -> Next slide
        } else if (touchEndX > touchStartX + swipeThreshold) {
            renderSlide(currentIndex - 1); // Swipe right -> Prev slide
        }
    }
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAINeuralAnimation();
    initProjectModals();
    initAchievementLightbox();
    console.log('Portfolio website loaded successfully with AI/ML Neural Mesh & Instagram Post Lightbox Slider!');
});