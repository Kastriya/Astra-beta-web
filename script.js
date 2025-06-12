// ==========================================================================
// ASTRA - Advanced JavaScript for Futuristic Interactions
// Cyberpunk | Space-tech | Interactive Animations
// ==========================================================================
// Matrix Rain | Glitch Effects | Magnetic Buttons | Cursor Trails | GSAP Animations
// ==========================================================================

// === GLOBAL VARIABLES ===
let isAudioPlaying = false;
let currentCursor = { x: 0, y: 0 };
let matrixCanvas, matrixCtx;
let cursorTrail = [];
let magneticButtons = [];
let glitchInterval;

const aiResponses = [
    "🤖 That's fascinating! How can ASTRA help you revolutionize your workflow?",
    "⚡ Excellent question! Our AI systems are designed for maximum efficiency.",
    "🧠 I'm constantly learning and evolving. What challenges are you facing?",
    "🚀 The future is now! Let me show you what's possible with ASTRA technology.",
    "⚛️ Quantum computing meets AI - the possibilities are endless!",
    "🛰️ Space-grade technology for Earth-based solutions. Impressive, right?"
];

// Matrix characters for rain effect
const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^6*()*6^%+-/~{[|`]}";
const binaryChars = "01";
const glitchChars = "!@#$%^6*()_+-=[]{}|;:,.<>?";

// === LOADING SCREEN ===
class LoadingScreen {
    constructor() {
        this.loader = document.getElementById('loader');
        this.init();
    }

    init() {
        // Simulate loading time
        setTimeout(() => {
            this.hideLoader();
        }, 3500);
        
        // Add some glitch effects during loading
        this.addGlitchEffects();
    }

    addGlitchEffects() {
        const logo = document.querySelector('.logo-loader .logo-text');
        setInterval(() => {
            if (Math.random() > 0.7) {
                logo.style.transform = `translateX(${Math.random() * 4 - 2}px)`;
                setTimeout(() => {
                    logo.style.transform = 'translateX(0)';
                }, 100);
            }
        }, 500);
    }

    hideLoader() {
        this.loader.style.opacity = '0';
        setTimeout(() => {
            this.loader.style.display = 'none';
            document.body.style.overflow = 'auto';
            this.initMainAnimations();
        }, 1000);
    }

    initMainAnimations() {
        // Start particles and other animations
        new ParticleSystem();
        new NavigationController();
        new ScrollAnimations();
        new TypingAnimation();
        new StatCounters();
        new TechCardAnimations();
        new ChatbotSimulator();
        new FormAnimations();
        new CursorController();
        new AudioController();
        new FutureProjectsController();
        new EasterEggController();
    }
}

// === CUSTOM CURSOR ===
class CursorController {
    constructor() {
        this.cursor = document.querySelector('body::before');
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            currentCursor.x = e.clientX;
            currentCursor.y = e.clientY;
            
            // Update cursor position with CSS custom properties
            document.documentElement.style.setProperty('--cursor-x', e.clientX + 'px');
            document.documentElement.style.setProperty('--cursor-y', e.clientY + 'px');
        });

        // Add cursor effects for interactive elements
        document.querySelectorAll('button, a, .tech-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.style.cursor = 'none';
                this.addCursorGlow();
            });
            
            el.addEventListener('mouseleave', () => {
                this.removeCursorGlow();
            });
        });
    }

    addCursorGlow() {
        document.body.style.setProperty('--cursor-scale', '1.5');
    }

    removeCursorGlow() {
        document.body.style.setProperty('--cursor-scale', '1');
    }
}

// === PARTICLE SYSTEM ===
class ParticleSystem {
    constructor() {
        this.initParticles();
    }

    initParticles() {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 120,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#00ffff", "#ff00ff", "#ffff00"]
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 1,
                        "color": "#00ffff"
                    }
                },
                "opacity": {
                    "value": 0.6,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.5
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00ffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    }
                },
                "modes": {
                    "repulse": {
                        "distance": 100,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }
}

// === NAVIGATION CONTROLLER ===
class NavigationController {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }

    init() {
        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active link
                    this.updateActiveLink(link);
                }
            });
        });

        // Mobile menu toggle
        this.hamburger.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Active section highlighting
        this.setupScrollSpy();
    }

    updateActiveLink(activeLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
    }

    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                    if (activeLink) {
                        this.updateActiveLink(activeLink);
                    }
                }
            });
        });
    }
}

// === SCROLL ANIMATIONS ===
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        // GSAP ScrollTrigger animations
        gsap.registerPlugin(ScrollTrigger);

        // Section fade-ins
        gsap.utils.toArray('.fade-in').forEach(element => {
            gsap.from(element, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Tech cards stagger animation
        gsap.from('.tech-card', {
            opacity: 0,
            y: 100,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.tech-grid',
                start: 'top 80%'
            }
        });

        // Timeline animation
        gsap.from('.timeline-item', {
            opacity: 0,
            x: (index) => index % 2 === 0 ? -100 : 100,
            duration: 1,
            stagger: 0.3,
            scrollTrigger: {
                trigger: '.timeline',
                start: 'top 70%'
            }
        });

        // Stats counter animation
        this.animateStats();
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            ScrollTrigger.create({
                trigger: stat,
                start: 'top 80%',
                onEnter: () => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    const counter = { value: 0 };
                    
                    gsap.to(counter, {
                        value: target,
                        duration: 2,
                        ease: 'power2.out',
                        onUpdate: () => {
                            stat.textContent = Math.round(counter.value).toLocaleString();
                        }
                    });
                }
            });
        });
    }
}

// === TYPING ANIMATION ===
class TypingAnimation {
    constructor() {
        this.text = "🚀 Welcome to ASTRA\n\nATL Sans Tinkerer Alliance\n\nAn independent tech collective under Hack Club USA, ASTRA is all about pushing the limits of robotics and innovation. We’re building a vibrant, high-energy community of creators, coders, and tinkerers — united to power up the future of the ATL Lab.\n\n⚙️ Build. Break. Innovate. Together.\n\nFrom AI-powered robotics to cutting-edge automation systems, we're transforming ideas into reality. Our mission is to bridge the gap between imagination and innovation, creating solutions that push the boundaries of what's possible in technology and beyond.";
        this.element = document.getElementById('typingText');
        this.index = 0;
        this.speed = 50;
        this.init();
    }

    init() {
        ScrollTrigger.create({
            trigger: this.element,
            start: 'top 80%',
            onEnter: () => this.startTyping()
        });
    }

    startTyping() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            
            // Add cursor effect
            this.element.style.borderRight = '2px solid #00ffff';
            
            setTimeout(() => this.startTyping(), this.speed);
        } else {
            // Remove cursor when done
            setTimeout(() => {
                this.element.style.borderRight = 'none';
            }, 1000);
        }
    }
}

// === STAT COUNTERS ===
class StatCounters {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.init();
    }

    init() {
        this.counters.forEach(counter => {
            ScrollTrigger.create({
                trigger: counter,
                start: 'top 80%',
                onEnter: () => this.animateCounter(counter)
            });
        });
    }

    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.round(current).toLocaleString();
        }, 20);
    }
}

// === TECH CARD ANIMATIONS ===
class TechCardAnimations {
    constructor() {
        this.cards = document.querySelectorAll('.tech-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            const video = card.querySelector('video');
            
            card.addEventListener('mouseenter', () => {
                if (video) {
                    video.play();
                }
                this.addHoverEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                if (video) {
                    video.pause();
                }
                this.removeHoverEffect(card);
            });
        });
    }

    addHoverEffect(card) {
        gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
        
        // Add glow effect
        card.style.boxShadow = '0 20px 40px rgba(0, 255, 255, 0.3)';
    }

    removeHoverEffect(card) {
        gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
        
        card.style.boxShadow = 'none';
    }
}

// === CHATBOT SIMULATOR ===
class ChatbotSimulator {
    constructor() {
        this.chatInput = document.getElementById('chatInput');
        this.sendButton = document.getElementById('sendMessage');
        this.chatMessages = document.getElementById('chatMessages');
        this.speedSlider = document.getElementById('speedSlider');
        this.personalityToggle = document.getElementById('personalityToggle');
        this.learningToggle = document.getElementById('learningToggle');
        this.init();
    }

    init() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Control panel interactions
        this.speedSlider.addEventListener('input', (e) => {
            const valueSpan = e.target.nextElementSibling;
            valueSpan.textContent = e.target.value;
        });

        this.personalityToggle.addEventListener('change', (e) => {
            const valueSpan = document.querySelector('#personalityToggle').parentElement.nextElementSibling;
            valueSpan.textContent = e.target.checked ? 'Friendly' : 'Professional';
        });

        this.learningToggle.addEventListener('change', (e) => {
            const valueSpan = document.querySelector('#learningToggle').parentElement.nextElementSibling;
            valueSpan.textContent = e.target.checked ? 'Active' : 'Passive';
        });
    }

    sendMessage() {
        const message = this.chatInput.value.trim();
        if (message === '') return;

        // Add user message
        this.addMessage(message, 'user');
        this.chatInput.value = '';

        // Simulate AI response
        setTimeout(() => {
            const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            this.addMessage(response, 'ai');
        }, 1000 + (Math.random() * 2000));
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'ai' ? '🤖' : '👤';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.textContent = text;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        
        // Animate message entry
        gsap.from(messageDiv, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: 'power2.out'
        });
    }
}

// === FORM ANIMATIONS ===
class FormAnimations {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.inputs = this.form.querySelectorAll('input, select, textarea');
        this.init();
    }

    init() {
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitForm();
        });

        // Input focus effects
        this.inputs.forEach(input => {
            input.addEventListener('focus', () => this.addFocusEffect(input));
            input.addEventListener('blur', () => this.removeFocusEffect(input));
        });
    }

    addFocusEffect(input) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('focused');
        
        gsap.to(formGroup.querySelector('.form-line'), {
            width: '100%',
            duration: 0.3,
            ease: 'power2.out'
        });
    }

    removeFocusEffect(input) {
        if (input.value === '') {
            const formGroup = input.closest('.form-group');
            formGroup.classList.remove('focused');
            
            gsap.to(formGroup.querySelector('.form-line'), {
                width: '0%',
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    }

    submitForm() {
        const submitBtn = this.form.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('span').textContent;
        
        // Animate button
        submitBtn.querySelector('span').textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.querySelector('span').textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(45deg, #00ff00, #00aa00)';
            
            setTimeout(() => {
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.style.background = 'linear-gradient(45deg, #00ffff, #0080ff)';
                submitBtn.disabled = false;
                this.form.reset();
            }, 2000);
        }, 2000);
    }
}

// === AUDIO CONTROLLER ===
class AudioController {
    constructor() {
        this.soundToggle = document.getElementById('soundToggle');
        this.bgMusic = document.getElementById('bgMusic');
        this.soundIcon = this.soundToggle.querySelector('.sound-icon');
        this.init();
    }

    init() {
        this.soundToggle.addEventListener('click', () => {
            this.toggleAudio();
        });
        
        // Set initial volume
        this.bgMusic.volume = 0.3;
    }

    toggleAudio() {
        if (isAudioPlaying) {
            this.bgMusic.pause();
            this.soundIcon.textContent = '🔇';
            isAudioPlaying = false;
        } else {
            this.bgMusic.play().catch(e => console.log('Audio play failed:', e));
            this.soundIcon.textContent = '🔊';
            isAudioPlaying = true;
        }
        
        // Add button animation
        gsap.to(this.soundToggle, {
            scale: 0.9,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
        });
    }
}

// === PERFORMANCE OPTIMIZATIONS ===
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images
        this.lazyLoadImages();
        
        // Debounce scroll events
        this.debounceScrollEvents();
        
        // Preload critical resources
        this.preloadResources();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    debounceScrollEvents() {
        let ticking = false;
        
        function updateScrollAnimations() {
            // Scroll-based animations here
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollAnimations);
                ticking = true;
            }
        });
    }

    preloadResources() {
        // Preload critical fonts and assets
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    }
}

// === UTILITY FUNCTIONS ===
const Utils = {
    // Throttle function for performance
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },

    // Random number generator
    random(min, max) {
        return Math.random() * (max - min) + min;
    },

    // Lerp function for smooth animations
    lerp(start, end, factor) {
        return start + (end - start) * factor;
    }
};

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading screen
    new LoadingScreen();
    
    // Initialize performance optimizations
    new PerformanceOptimizer();
    
    // Add additional interactive effects
    initAdditionalEffects();
    
    // Initialize cyberpunk hero effects
    new CyberpunkHeroEffects();
});

// === CYBERPUNK HERO EFFECTS ===
class CyberpunkHeroEffects {
    constructor() {
        this.initGlitchText();
        this.initTypewriterEffect();
        this.initMagneticButton();
        this.initCursorTrail();
        this.initScanlineEffect();
        this.initFloatingTextEffect();
        this.initDataTransmission();
        this.initHolographicLogo();
        this.initHeroAnimations();
    }

    initGlitchText() {
        const glitchElements = document.querySelectorAll('.glitch-text');
        
        glitchElements.forEach(element => {
            const originalText = element.getAttribute('data-text') || element.textContent;
            
            setInterval(() => {
                if (Math.random() > 0.85) {
                    // Random glitch effect
                    const glitchChars = '█▓▒░!@#$%^&*()_+-=';
                    let glitchedText = '';
                    
                    for (let i = 0; i < originalText.length; i++) {
                        if (Math.random() > 0.8) {
                            glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                        } else {
                            glitchedText += originalText[i];
                        }
                    }
                    
                    element.textContent = glitchedText;
                    
                    // Reset after glitch
                    setTimeout(() => {
                        element.textContent = originalText;
                    }, 100);
                }
            }, 3000);
        });
    }

    initTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('.typewriter-effect');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            ScrollTrigger.create({
                trigger: element,
                start: 'top 80%',
                onEnter: () => {
                    this.typeText(element, text, 100);
                }
            });
        });
    }

    typeText(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    initMagneticButton() {
        const magneticBtn = document.querySelector('.magnetic-btn');
        if (!magneticBtn) return;
        
        magneticBtn.addEventListener('mousemove', (e) => {
            const rect = magneticBtn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(magneticBtn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        magneticBtn.addEventListener('mouseleave', () => {
            gsap.to(magneticBtn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
        
        // Button click effect
        magneticBtn.addEventListener('click', () => {
            this.createRippleEffect(magneticBtn);
            this.triggerButtonRumble(magneticBtn);
        });
    }

    createRippleEffect(button) {
        const ripple = button.querySelector('.btn-ripple');
        if (!ripple) return;
        
        gsap.set(ripple, {
            scale: 0,
            opacity: 1
        });
        
        gsap.to(ripple, {
            scale: 4,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        });
    }

    triggerButtonRumble(button) {
        gsap.to(button, {
            x: '+=5',
            duration: 0.1,
            yoyo: true,
            repeat: 5,
            ease: 'power2.inOut'
        });
    }

    initCursorTrail() {
        const cursorTrail = document.getElementById('cursorTrail');
        if (!cursorTrail) return;
        
        let trails = [];
        
        document.addEventListener('mousemove', (e) => {
            // Create trail particles
            const trail = document.createElement('div');
            trail.className = 'cursor-particle';
            trail.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, #00ffff, transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
            `;
            
            cursorTrail.appendChild(trail);
            trails.push(trail);
            
            // Animate and remove trail
            gsap.to(trail, {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => {
                    if (trail.parentNode) {
                        trail.parentNode.removeChild(trail);
                    }
                }
            });
            
            // Limit number of trails for performance
            if (trails.length > 20) {
                const oldTrail = trails.shift();
                if (oldTrail.parentNode) {
                    oldTrail.parentNode.removeChild(oldTrail);
                }
            }
        });
    }

    initScanlineEffect() {
        const scanline = document.querySelector('.scanline-effect');
        if (!scanline) return;
        
        gsap.to(scanline, {
            opacity: 1,
            duration: 0.1,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut'
        });
    }

    initFloatingTextEffect() {
        const floatingTexts = document.querySelectorAll('.floating-text');
        
        floatingTexts.forEach((text, index) => {
            gsap.to(text, {
                y: '+=10',
                duration: 2 + index * 0.5,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true
            });
        });
    }

    initDataTransmission() {
        const packets = document.querySelectorAll('.packet');
        
        packets.forEach((packet, index) => {
            gsap.to(packet, {
                y: -50,
                opacity: 0,
                duration: 2,
                delay: index * 0.3,
                repeat: -1,
                ease: 'power2.out'
            });
        });
    }

    initHolographicLogo() {
        const logoLayers = document.querySelectorAll('.logo-layer');
        
        logoLayers.forEach((layer, index) => {
            gsap.to(layer, {
                rotationY: 360,
                duration: 10 + index * 2,
                ease: 'none',
                repeat: -1
            });
        });
    }

    initHeroAnimations() {
        // Hero entrance animations
        const tl = gsap.timeline({ delay: 0.5 });
        
        tl.from('.holographic-logo', {
            scale: 0,
            opacity: 0,
            duration: 1,
            ease: 'elastic.out(1, 0.5)'
        })
        .from('.glitch-text.welcome-text', {
            x: -100,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.5')
        .from('.glitch-text.main-title', {
            scale: 0.5,
            opacity: 0,
            duration: 1,
            ease: 'back.out(1.7)'
        }, '-=0.3')
        .from('.hero-subtitle-container', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.2')
        .from('.btn-future', {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            ease: 'back.out(1.7)'
        }, '-=0.1')
        .from('.scroll-indicator', {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out'
        }, '-=0.2');
    }
}

// === ADDITIONAL EFFECTS ===
function initAdditionalEffects() {
    // Matrix rain effect (optional)
    createMatrixRain();
    
    // Glitch text effects
    addGlitchEffects();
    
    // Hologram effects
    initHologramEffects();
}

function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ASTRA ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ffff';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
}

function addGlitchEffects() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        setInterval(() => {
            if (Math.random() > 0.95) {
                element.style.transform = `translateX(${Math.random() * 10 - 5}px)`;
                setTimeout(() => {
                    element.style.transform = 'translateX(0)';
                }, 100);
            }
        }, 100);
    });
}

function initHologramEffects() {
    const holoElements = document.querySelectorAll('.hologram-circle');
    
    holoElements.forEach(element => {
        setInterval(() => {
            const randomColor = Math.random() > 0.5 ? '#00ffff' : '#ff00ff';
            element.style.boxShadow = `0 0 50px ${randomColor}`;
        }, 2000);
    });
}

// === ERROR HANDLING ===
window.addEventListener('error', (e) => {
    console.log('ASTRA System Error:', e.error);
});

// === CONSOLE EASTER EGG ===
console.log(`
%c
   █████╗ ███████╗████████╗██████╗  █████╗ 
  ██╔══██╗██╔════╝╚══██╔══╝██╔══██╗██╔══██╗
  ███████║███████╗   ██║   ██████╔╝███████║
  ██╔══██║╚════██║   ██║   ██╔══██╗██╔══██║
  ██║  ██║███████║   ██║   ██║  ██║██║  ██║
  ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝

  🚀 Welcome to ASTRA - Powering the Future! 🚀
  
  Detected: Advanced developer exploring our code!
  
  Want to join our team? Contact us!
  
`, 'color: #00ffff; font-family: monospace; font-size: 12px;');

console.log('%c> ASTRA.initialize()', 'color: #ff00ff; font-weight: bold;');
console.log('%c< System ready. All modules loaded successfully.', 'color: #00ff00;');
console.log('%c> Ready for the future...', 'color: #ffff00;');

// Export for potential external use
window.ASTRA = {
    version: '1.0.0',
    status: 'online',
    modules: ['AI', 'Automation', 'Space-Tech', 'Quantum'],
    initialize: () => console.log('ASTRA systems initialized!')
};

// === CONTACT SECTION INTERACTIVE EFFECTS ===
class ContactEffects {
    constructor() {
        this.initContactCardTilt();
        this.initLaunchButton();
        this.initContactModal();
        this.initPanelRotation();
        this.initGlitchTitle();
        this.initTypingSubtitle();
    }

    initContactCardTilt() {
        const cards = document.querySelectorAll('.contact-card[data-tilt]');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;
                
                gsap.to(card, {
                    rotationX: rotateX,
                    rotationY: rotateY,
                    transformPerspective: 1000,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotationX: 0,
                    rotationY: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
            
            // Click to copy functionality
            card.addEventListener('click', () => {
                const text = card.querySelector('p').textContent;
                if (text.includes('@') || text.includes('github.com') || text.includes('youtube.com')) {
                    navigator.clipboard.writeText(text).then(() => {
                        this.showCopyNotification(card);
                    });
                }
            });
        });
    }

    showCopyNotification(card) {
        const notification = document.createElement('div');
        notification.textContent = 'Copied to clipboard!';
        notification.style.cssText = `
            position: absolute;
            top: -50px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 255, 255, 0.9);
            color: #000;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            z-index: 1000;
            pointer-events: none;
        `;
        
        card.style.position = 'relative';
        card.appendChild(notification);
        
        gsap.fromTo(notification, 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );
        
        setTimeout(() => {
            gsap.to(notification, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                ease: 'power2.out',
                onComplete: () => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }
            });
        }, 2000);
    }

    initLaunchButton() {
        const launchBtn = document.getElementById('launchMessageBtn');
        if (!launchBtn) return;
        
        launchBtn.addEventListener('click', () => {
            this.triggerLaunchEffect(launchBtn);
            this.openContactModal();
        });
        
        // Magnetic effect
        launchBtn.addEventListener('mousemove', (e) => {
            const rect = launchBtn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(launchBtn, {
                x: x * 0.2,
                y: y * 0.2,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        launchBtn.addEventListener('mouseleave', () => {
            gsap.to(launchBtn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    }

    triggerLaunchEffect(button) {
        // Shake effect
        gsap.to(button, {
            x: '+=10',
            duration: 0.1,
            yoyo: true,
            repeat: 7,
            ease: 'power2.inOut'
        });
        
        // Particle explosion effect
        const particles = button.querySelector('.btn-particles');
        if (particles) {
            gsap.fromTo(particles,
                { opacity: 0, scale: 0 },
                { opacity: 1, scale: 2, duration: 0.8, ease: 'power2.out' }
            );
        }
        
        // Energy field activation
        const energyField = button.querySelector('.btn-energy-field');
        if (energyField) {
            energyField.style.opacity = '1';
            setTimeout(() => {
                energyField.style.opacity = '0';
            }, 1000);
        }
    }

    initContactModal() {
        const modal = document.getElementById('contactModal');
        const closeBtn = document.getElementById('modalClose');
        const form = document.getElementById('contactForm');
        
        if (!modal) return;
        
        // Close modal handlers
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeContactModal();
            });
        }
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeContactModal();
            }
        });
        
        // Form submission
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(form);
            });
        }
        
        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.closeContactModal();
            }
        });
    }

    openContactModal() {
        const modal = document.getElementById('contactModal');
        if (!modal) return;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate modal entrance
        gsap.fromTo(modal.querySelector('.modal-content'),
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
        );
    }

    closeContactModal() {
        const modal = document.getElementById('contactModal');
        if (!modal) return;
        
        gsap.to(modal.querySelector('.modal-content'), {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    handleFormSubmission(form) {
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = '🛸 Transmitting...';
        submitBtn.disabled = true;
        
        // Simulate transmission
        setTimeout(() => {
            submitBtn.textContent = '✅ Message Sent!';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                this.closeContactModal();
                
                // Show success notification
                this.showSuccessNotification();
            }, 2000);
        }, 3000);
    }

    showSuccessNotification() {
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 2rem;
                right: 2rem;
                background: rgba(0, 255, 0, 0.1);
                border: 2px solid #00ff00;
                border-radius: 15px;
                padding: 1.5rem;
                color: #00ff00;
                font-family: 'Orbitron', monospace;
                font-weight: 600;
                z-index: 10001;
                backdrop-filter: blur(20px);
                box-shadow: 0 0 30px rgba(0, 255, 0, 0.3);
            ">
                🚀 Message successfully transmitted to ASTRA!
                <br><small>We'll contact you soon...</small>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        gsap.fromTo(notification.firstElementChild,
            { x: 300, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
        );
        
        setTimeout(() => {
            gsap.to(notification.firstElementChild, {
                x: 300,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }
            });
        }, 5000);
    }

    initPanelRotation() {
        const panel = document.querySelector('.panel-3d');
        if (!panel) return;
        
        // Pause rotation on hover
        panel.addEventListener('mouseenter', () => {
            panel.style.animationPlayState = 'paused';
        });
        
        panel.addEventListener('mouseleave', () => {
            panel.style.animationPlayState = 'running';
        });
    }

    initGlitchTitle() {
        const glitchTitle = document.querySelector('.glitch-title');
        if (!glitchTitle) return;
        
        setInterval(() => {
            if (Math.random() > 0.92) {
                glitchTitle.style.textShadow = `
                    2px 0 #ff00ff,
                    -2px 0 #00ffff,
                    0 2px #ffff00
                `;
                
                setTimeout(() => {
                    glitchTitle.style.textShadow = '';
                }, 200);
            }
        }, 1000);
    }

    initTypingSubtitle() {
        const subtitle = document.querySelector('.typing-subtitle');
        if (!subtitle) return;
        
        const text = subtitle.textContent;
        subtitle.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                // Add blinking cursor
                subtitle.style.borderRight = '2px solid #00ffff';
                setInterval(() => {
                    subtitle.style.borderRightColor = 
                        subtitle.style.borderRightColor === 'transparent' 
                            ? '#00ffff' : 'transparent';
                }, 500);
            }
        }, 100);
    }
}

// Initialize Contact Effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactEffects();
    new FutureProjectsController();
    new EasterEggController();
});

// === FUTURE PROJECTS CONTROLLER ===
class FutureProjectsController {
    constructor() {
        this.timelineCards = document.querySelectorAll('.timeline-card');
        this.viewToggleBtns = document.querySelectorAll('.toggle-btn');
        this.timelineView = document.querySelector('.timeline-view');
        this.gridView = document.querySelector('.grid-view');
        this.digitalSpine = document.querySelector('.digital-spine');
        this.init();
    }

    init() {
        this.initScrollAnimations();
        this.initViewToggle();
        this.initCardInteractions();
        this.initBackgroundEffects();
        this.initDataFlow();
        this.initTimelineBadges();
    }

    initScrollAnimations() {
        // Animate timeline cards on scroll - faster and more responsive
        this.timelineCards.forEach((card, index) => {
            gsap.from(card, {
                opacity: 0,
                y: 50,
                x: index % 2 === 0 ? -50 : 50,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Animate future title - faster entrance
        gsap.from('.future-title', {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.future-title',
                start: 'top 85%'
            }
        });

        // Animate view toggle - quicker response
        gsap.from('.view-toggle', {
            y: -30,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.view-toggle',
                start: 'top 90%'
            }
        });
    }

    initViewToggle() {
        this.viewToggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const viewType = btn.getAttribute('data-view');
                this.switchView(viewType, btn);
            });
        });
    }

    switchView(viewType, clickedBtn) {
        // Update active button
        this.viewToggleBtns.forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');

        // Switch views with animation
        if (viewType === 'timeline') {
            gsap.to(this.gridView, {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                ease: 'power2.out',
                onComplete: () => {
                    this.gridView.style.display = 'none';
                    this.timelineView.style.display = 'block';
                    gsap.fromTo(this.timelineView,
                        { opacity: 0, scale: 0.8 },
                        { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
                    );
                }
            });
        } else {
            gsap.to(this.timelineView, {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                ease: 'power2.out',
                onComplete: () => {
                    this.timelineView.style.display = 'none';
                    this.gridView.style.display = 'block';
                    gsap.fromTo(this.gridView,
                        { opacity: 0, scale: 0.8 },
                        { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
                    );
                }
            });
        }

        // Sound effect
        this.playToggleSound();
    }

    initCardInteractions() {
        this.timelineCards.forEach(card => {
            // Hover effects
            card.addEventListener('mouseenter', () => {
                this.activateCardEffects(card);
                this.pauseDataFlow();
            });

            card.addEventListener('mouseleave', () => {
                this.deactivateCardEffects(card);
                this.resumeDataFlow();
            });

            // Click effects
            card.addEventListener('click', () => {
                this.triggerCardExpansion(card);
            });
        });

        // Grid card interactions
        const gridCards = document.querySelectorAll('.grid-card');
        gridCards.forEach(card => {
            card.addEventListener('click', () => {
                this.triggerGridCardEffect(card);
            });
        });
    }

    activateCardEffects(card) {
        // Enhanced glow effect
        gsap.to(card.querySelector('.card-glow-effect'), {
            opacity: 0.8,
            duration: 0.3,
            ease: 'power2.out'
        });

        // Card floating effect
        gsap.to(card, {
            y: -10,
            duration: 0.3,
            ease: 'power2.out'
        });

        // Icon orbit speed increase
        const orbitRing = card.querySelector('.orbit-ring');
        if (orbitRing) {
            orbitRing.style.animationDuration = '1s';
        }

        // Tech tags glow
        const techTags = card.querySelectorAll('.tech-tag');
        techTags.forEach(tag => {
            gsap.to(tag, {
                boxShadow: '0 0 15px currentColor',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }

    deactivateCardEffects(card) {
        // Reset glow effect
        gsap.to(card.querySelector('.card-glow-effect'), {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
        });

        // Reset card position
        gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });

        // Reset icon orbit speed
        const orbitRing = card.querySelector('.orbit-ring');
        if (orbitRing) {
            orbitRing.style.animationDuration = '3s';
        }

        // Reset tech tags
        const techTags = card.querySelectorAll('.tech-tag');
        techTags.forEach(tag => {
            gsap.to(tag, {
                boxShadow: 'none',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }

    triggerCardExpansion(card) {
        // Card expansion animation
        gsap.to(card, {
            scale: 1.05,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
        });

        // Pulse effect
        const badge = card.querySelector('.year-badge');
        if (badge) {
            gsap.to(badge, {
                scale: 1.2,
                duration: 0.3,
                yoyo: true,
                repeat: 1,
                ease: 'elastic.out(1, 0.5)'
            });
        }

        // Ripple effect
        this.createRippleEffect(card);
    }

    triggerGridCardEffect(card) {
        // Grid card click animation
        gsap.to(card, {
            rotationY: 360,
            duration: 0.8,
            ease: 'power2.inOut'
        });

        // Icon bounce
        const icon = card.querySelector('.grid-icon');
        if (icon) {
            gsap.to(icon, {
                scale: 1.3,
                duration: 0.3,
                yoyo: true,
                repeat: 1,
                ease: 'elastic.out(1, 0.5)'
            });
        }
    }

    createRippleEffect(card) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 10px;
            height: 10px;
            background: radial-gradient(circle, rgba(0, 255, 255, 0.6), transparent);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 10;
        `;
        
        card.style.position = 'relative';
        card.appendChild(ripple);
        
        gsap.to(ripple, {
            scale: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }
        });
    }

    initBackgroundEffects() {
        // Parallax effect for background elements
        gsap.to('.stars-field', {
            y: -50,
            duration: 20,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        gsap.to('.space-particles', {
            rotation: 360,
            duration: 60,
            repeat: -1,
            ease: 'none'
        });

        gsap.to('.ai-neural-network', {
            scale: 1.1,
            duration: 15,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }

    initDataFlow() {
        // Enhanced data flow animation - faster intervals
        setInterval(() => {
            this.createDataPacket();
        }, 1200);
    }

    createDataPacket() {
        if (!this.digitalSpine) return;
        
        const packet = document.createElement('div');
        packet.style.cssText = `
            position: absolute;
            top: -10px;
            left: 50%;
            width: 4px;
            height: 15px;
            background: linear-gradient(180deg, #ffffff, #00ffff);
            border-radius: 2px;
            transform: translateX(-50%);
            box-shadow: 0 0 10px #00ffff;
        `;
        
        this.digitalSpine.appendChild(packet);
        
        gsap.to(packet, {
            y: this.digitalSpine.offsetHeight + 20,
            duration: 1.5,
            ease: 'power1.out',
            onComplete: () => {
                if (packet.parentNode) {
                    packet.parentNode.removeChild(packet);
                }
            }
        });
    }

    pauseDataFlow() {
        const dataFlow = document.querySelector('.data-flow');
        if (dataFlow) {
            dataFlow.style.animationPlayState = 'paused';
        }
    }

    resumeDataFlow() {
        const dataFlow = document.querySelector('.data-flow');
        if (dataFlow) {
            dataFlow.style.animationPlayState = 'running';
        }
    }

    initTimelineBadges() {
        // Enhanced badge animations - faster and snappier
        const badges = document.querySelectorAll('.year-badge');
        badges.forEach((badge, index) => {
            // Quicker staggered entrance animation
            gsap.from(badge, {
                scale: 0,
                rotation: 180,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: badge,
                    start: 'top 95%'
                }
            });
        });
    }

    playToggleSound() {
        // Create audio context for sound effects
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            const audioContext = new (AudioContext || webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    }
}

// === EASTER EGG CONTROLLER ===
class EasterEggController {
    constructor() {
        this.easterEggs = document.querySelectorAll('.floating-easter-egg');
        this.foundEggs = new Set();
        this.secretSequence = [];
        this.requiredSequence = ['quantum', 'neural', 'space'];
        this.init();
    }

    init() {
        this.initEasterEggInteractions();
        this.initSecretCommands();
        this.initKonamiCode();
        this.initClickSequence();
    }

    initEasterEggInteractions() {
        this.easterEggs.forEach(egg => {
            egg.addEventListener('click', () => {
                this.activateEasterEgg(egg);
            });

            egg.addEventListener('mouseenter', () => {
                this.highlightEasterEgg(egg);
            });

            egg.addEventListener('mouseleave', () => {
                this.unhighlightEasterEgg(egg);
            });
        });
    }

    activateEasterEgg(egg) {
        const secret = egg.getAttribute('data-secret');
        
        if (this.foundEggs.has(secret)) return;
        
        this.foundEggs.add(secret);
        this.secretSequence.push(secret);
        
        // Visual feedback
        gsap.to(egg, {
            scale: 2,
            rotation: 720,
            duration: 1,
            ease: 'elastic.out(1, 0.5)',
            onComplete: () => {
                egg.style.opacity = '1';
                egg.style.filter = 'drop-shadow(0 0 20px currentColor)';
            }
        });
        
        // Sound effect
        this.playDiscoverySound();
        
        // Show discovery message
        this.showDiscoveryMessage(secret);
        
        // Check if sequence is complete
        if (this.secretSequence.length === this.requiredSequence.length) {
            this.checkSecretSequence();
        }
    }

    highlightEasterEgg(egg) {
        gsap.to(egg, {
            scale: 2,
            duration: 0.3,
            ease: 'power2.out'
        });
        
        // Add glow effect
        egg.style.filter = 'drop-shadow(0 0 15px currentColor)';
        egg.style.cursor = 'pointer';
    }

    unhighlightEasterEgg(egg) {
        if (!this.foundEggs.has(egg.getAttribute('data-secret'))) {
            gsap.to(egg, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            egg.style.filter = 'none';
        }
    }

    showDiscoveryMessage(secret) {
        const messages = {
            quantum: '⚛️ Quantum secrets unlocked!',
            neural: '🧠 Neural pathways activated!',
            space: '🚀 Space coordinates acquired!'
        };
        
        const message = document.createElement('div');
        message.innerHTML = messages[secret] || '🔍 Secret discovered!';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            border: 2px solid #00ffff;
            border-radius: 15px;
            padding: 2rem;
            color: #00ffff;
            font-family: 'Orbitron', monospace;
            font-size: 1.5rem;
            font-weight: 700;
            text-align: center;
            z-index: 10000;
            backdrop-filter: blur(20px);
            box-shadow: 0 0 50px rgba(0, 255, 255, 0.5);
        `;
        
        document.body.appendChild(message);
        
        gsap.fromTo(message,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' }
        );
        
        setTimeout(() => {
            gsap.to(message, {
                scale: 0,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out',
                onComplete: () => {
                    if (message.parentNode) {
                        message.parentNode.removeChild(message);
                    }
                }
            });
        }, 3000);
    }

    checkSecretSequence() {
        const isCorrectSequence = this.secretSequence.every((secret, index) => 
            this.requiredSequence.includes(secret)
        );
        
        if (isCorrectSequence && this.secretSequence.length === this.requiredSequence.length) {
            this.unlockMasterSecret();
        }
    }

    unlockMasterSecret() {
        // Ultimate easter egg unlocked
        const secretModal = document.createElement('div');
        secretModal.innerHTML = `
            <div style=\"\n                position: fixed;\n                top: 0;\n                left: 0;\n                width: 100%;\n                height: 100%;\n                background: rgba(0, 0, 0, 0.95);\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                z-index: 10001;\n                backdrop-filter: blur(30px);\n            \">
                <div style=\"\n                    text-align: center;\n                    color: #00ffff;\n                    font-family: 'Orbitron', monospace;\n                    animation: ultimate-glow 2s ease-in-out infinite alternate;\n                \">
                    <h1 style=\"font-size: 4rem; margin-bottom: 2rem; text-shadow: 0 0 30px #00ffff;\">
                        🌟 MASTER EXPLORER 🌟
                    </h1>
                    <p style=\"font-size: 1.5rem; margin-bottom: 2rem;\">
                        You've discovered all the hidden secrets of ASTRA!
                    </p>
                    <p style=\"font-size: 1.2rem; margin-bottom: 3rem; color: #ffff00;\">
                        🎉 Achievement Unlocked: Future Visionary 🎉
                    </p>
                    <div style=\"\n                        background: linear-gradient(45deg, #00ffff, #ff00ff);\n                        -webkit-background-clip: text;\n                        -webkit-text-fill-color: transparent;\n                        font-size: 2rem;\n                        font-weight: 900;\n                        margin-bottom: 2rem;\n                    \">
                        Welcome to the ASTRA Elite!
                    </div>
                    <button onclick=\"this.parentElement.parentElement.remove()\" style=\"\n                        background: linear-gradient(45deg, #00ffff, #0080ff);\n                        border: none;\n                        padding: 1rem 2rem;\n                        border-radius: 50px;\n                        color: #000;\n                        font-family: 'Orbitron', monospace;\n                        font-weight: 700;\n                        cursor: pointer;\n                        font-size: 1.1rem;\n                        box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);\n                    \">
                        🚀 Continue to the Future
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(secretModal);
        
        // Add ultimate glow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ultimate-glow {
                0% { text-shadow: 0 0 30px #00ffff; }
                100% { text-shadow: 0 0 60px #00ffff, 0 0 90px #ff00ff; }
            }
        `;
        document.head.appendChild(style);
        
        // Fireworks effect
        this.createFireworks();
        
        // Store achievement
        localStorage.setItem('astra-master-explorer', 'true');
    }

    initSecretCommands() {
        // Console commands
        window.ASTRA.unlock = () => {
            console.log('%c🔓 ASTRA Developer Mode Activated!', 'color: #00ff00; font-size: 16px; font-weight: bold;');
            this.unlockMasterSecret();
        };
        
        window.ASTRA.matrix = () => {
            console.log('%c🔋 Matrix Mode Enabled!', 'color: #00ff00; font-size: 16px;');
            document.body.style.filter = 'hue-rotate(120deg) contrast(1.5)';
            setTimeout(() => {
                document.body.style.filter = '';
            }, 5000);
        };
        
        window.ASTRA.technologies = () => {
            console.log('%c🛠️ Technologies Demo Activated!', 'color: #ffaa00; font-size: 16px;');
            document.querySelectorAll('.tech-card-coming').forEach((card, index) => {
                setTimeout(() => {
                    card.click();
                }, index * 500);
            });
        };
        
        window.ASTRA.aiDemo = () => {
            console.log('%c🤖 AI Demo Mode!', 'color: #00ffff; font-size: 16px;');
            const messages = [
                'Hello ASTRA! Show me your capabilities.',
                'Can you help me with a coding project?',
                'What can you tell me about robotics?'
            ];
            
            const chatInput = document.getElementById('enhancedChatInput');
            const sendBtn = document.getElementById('enhancedSendMessage');
            
            if (chatInput && sendBtn) {
                messages.forEach((msg, index) => {
                    setTimeout(() => {
                        chatInput.value = msg;
                        sendBtn.click();
                    }, index * 3000);
                });
            }
        };
        
        window.ASTRA.quantum = () => {
            console.log('%c⚛️ Quantum Field Activated!', 'color: #ff00ff; font-size: 16px;');
            this.createQuantumEffect();
        };
        
        window.ASTRA.aboutDemo = () => {
            console.log('%c🧬 About Section Demo Mode!', 'color: #00ff88; font-size: 16px;');
            // Trigger all stat cards
            document.querySelectorAll('.stat-card').forEach((card, index) => {
                setTimeout(() => {
                    card.click();
                }, index * 500);
            });
            
            // Cycle through stories
            setTimeout(() => {
                document.querySelectorAll('.nav-dot').forEach((dot, index) => {
                    setTimeout(() => {
                        dot.click();
                    }, index * 2000);
                });
            }, 3000);
        };
        
        window.ASTRA.hologram = () => {
            console.log('%c🔮 Holographic Core Demo!', 'color: #00ffff; font-size: 16px;');
            document.querySelectorAll('.data-node').forEach((node, index) => {
                setTimeout(() => {
                    node.click();
                }, index * 800);
            });
        };
    }

    initKonamiCode() {
        const konamiCode = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];
        let konamiIndex = 0;
        
        document.addEventListener('keydown', (e) => {
            if (e.code === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    this.activateKonamiSecret();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
    }

    activateKonamiSecret() {
        console.log('%c🎮 KONAMI CODE ACTIVATED!', 'color: #ffff00; font-size: 20px; font-weight: bold;');
        
        // Give user 30 lives/credits
        const notification = document.createElement('div');
        notification.innerHTML = '🎮 30 LIVES GRANTED! 🎮';
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 0, 0.1);
            border: 3px solid #ffff00;
            border-radius: 20px;
            padding: 2rem;
            color: #ffff00;
            font-family: 'Orbitron', monospace;
            font-size: 2rem;
            font-weight: 900;
            z-index: 10000;
            text-shadow: 0 0 20px #ffff00;
            animation: konami-glow 1s ease-in-out infinite alternate;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    initClickSequence() {
        let clickCount = 0;
        const logo = document.querySelector('.logo-text');
        
        if (logo) {
            logo.addEventListener('click', () => {
                clickCount++;
                if (clickCount === 7) {
                    this.activateLogoSecret();
                    clickCount = 0;
                }
                
                // Reset counter after 3 seconds
                setTimeout(() => {
                    clickCount = 0;
                }, 3000);
            });
        }
    }

    activateLogoSecret() {
        console.log('%c🌟 LOGO SECRET UNLOCKED!', 'color: #ff00ff; font-size: 18px; font-weight: bold;');
        
        // Transform the entire page briefly
        document.body.style.transform = 'rotateY(360deg)';
        document.body.style.transition = 'transform 2s ease-in-out';
        
        setTimeout(() => {
            document.body.style.transform = '';
            document.body.style.transition = '';
        }, 2000);
    }

    createQuantumEffect() {
        // Create quantum field effect
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, #ff00ff, transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            
            document.body.appendChild(particle);
            
            gsap.to(particle, {
                x: (Math.random() - 0.5) * 500,
                y: (Math.random() - 0.5) * 500,
                scale: Math.random() * 3,
                opacity: 0,
                duration: 2,
                ease: 'power2.out',
                onComplete: () => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }
            });
        }
    }

    createFireworks() {
        // Create fireworks effect
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createFirework(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
            }, i * 200);
        }
    }

    createFirework(x, y) {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        
        for (let i = 0; i < 15; i++) {
            const spark = document.createElement('div');
            spark.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 4px;
                height: 4px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 10002;
                box-shadow: 0 0 10px currentColor;
            `;
            
            document.body.appendChild(spark);
            
            const angle = (Math.PI * 2 * i) / 15;
            const velocity = 100 + Math.random() * 100;
            
            gsap.to(spark, {
                x: Math.cos(angle) * velocity,
                y: Math.sin(angle) * velocity + 100,
                scale: 0,
                duration: 1.5,
                ease: 'power2.out',
                onComplete: () => {
                    if (spark.parentNode) {
                        spark.parentNode.removeChild(spark);
                    }
                }
            });
        }
    }

    playDiscoverySound() {
        // Create discovery sound effect
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            const audioContext = new (AudioContext || webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.3);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        }
    }
}

// === CLUBS SECTION FUNCTIONALITY ===
class ClubsManager {
    constructor() {
        this.animationSpeed = 150; // milliseconds per character
        this.pauseDuration = 2000; // pause between cycles
        this.init();
    }

    init() {
        this.initTypingAnimations();
        this.initClubFilters();
        this.initClubHoverEffects();
        this.initScrollAnimations();
    }

    initTypingAnimations() {
        const typingElements = document.querySelectorAll('.typing-animation');
        
        typingElements.forEach((element, index) => {
            const text = element.getAttribute('data-text');
            if (text) {
                // Start each animation with a delay
                setTimeout(() => {
                    this.startTypingAnimation(element, text);
                }, index * 500);
            }
        });
    }

    startTypingAnimation(element, text) {
        let currentText = '';
        let isDeleting = false;
        let charIndex = 0;
        
        const typeChar = () => {
            if (!isDeleting) {
                // Typing forward
                if (charIndex < text.length) {
                    currentText += text.charAt(charIndex);
                    element.textContent = currentText;
                    charIndex++;
                    
                    // Add some randomness to typing speed
                    const speed = this.animationSpeed + (Math.random() * 100);
                    setTimeout(typeChar, speed);
                } else {
                    // Finished typing, wait then start deleting
                    setTimeout(() => {
                        isDeleting = true;
                        typeChar();
                    }, this.pauseDuration);
                }
            } else {
                // Deleting backward
                if (charIndex > 0) {
                    charIndex--;
                    currentText = text.substring(0, charIndex);
                    element.textContent = currentText;
                    
                    // Deleting is faster
                    setTimeout(typeChar, this.animationSpeed / 2);
                } else {
                    // Finished deleting, wait then start typing again
                    setTimeout(() => {
                        isDeleting = false;
                        typeChar();
                    }, this.pauseDuration / 2);
                }
            }
        };
        
        typeChar();
    }

    initClubFilters() {
        const filterButtons = document.querySelectorAll('.club-filter');
        const clubCards = document.querySelectorAll('.club-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter clubs
                this.filterClubs(clubCards, filter);
            });
        });
    }

    filterClubs(clubCards, filter) {
        clubCards.forEach(card => {
            const shouldShow = this.shouldShowClub(card, filter);
            
            if (shouldShow) {
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                
                // Animate in
                setTimeout(() => {
                    card.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '0';
                card.style.transform = 'translateY(-30px)';
                
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    shouldShowClub(card, filter) {
        switch (filter) {
            case 'all':
                return true;
            case 'active':
                // Show only clubs with HODs (not "None")
                const hodText = card.querySelector('.led-text');
                return hodText && !hodText.classList.contains('none-text');
            case 'recruiting':
                // Show clubs without HODs (looking for members)
                const recruitingHod = card.querySelector('.led-text');
                return recruitingHod && recruitingHod.classList.contains('none-text');
            default:
                return true;
        }
    }

    initClubHoverEffects() {
        const clubCards = document.querySelectorAll('.club-card');
        
        clubCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.activateCardEffects(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.deactivateCardEffects(card);
            });
            
            // Add click sound effect
            card.addEventListener('click', () => {
                this.playClickSound();
                this.triggerCardPulse(card);
            });
        });
    }

    activateCardEffects(card) {
        // Speed up typing animation on hover
        const typingElement = card.querySelector('.typing-animation');
        if (typingElement) {
            typingElement.style.animationDuration = '2s';
        }
        
        // Enhance tech dots animation
        const techDots = card.querySelectorAll('.tech-dot');
        techDots.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.transform = 'scale(1.5)';
                dot.style.boxShadow = `0 0 20px ${dot.style.backgroundColor || '#00ffff'}`;
            }, index * 100);
        });
    }

    deactivateCardEffects(card) {
        // Reset typing animation speed
        const typingElement = card.querySelector('.typing-animation');
        if (typingElement) {
            typingElement.style.animationDuration = '4s';
        }
        
        // Reset tech dots
        const techDots = card.querySelectorAll('.tech-dot');
        techDots.forEach(dot => {
            dot.style.transform = 'scale(1)';
            dot.style.boxShadow = '';
        });
    }

    triggerCardPulse(card) {
        card.style.animation = 'none';
        card.offsetHeight; // Trigger reflow
        card.style.animation = 'cardPulse 0.6s ease-out';
        
        setTimeout(() => {
            card.style.animation = '';
        }, 600);
    }

    playClickSound() {
        // Create a futuristic click sound
        if (typeof(AudioContext) !== 'undefined' || typeof(webkitAudioContext) !== 'undefined') {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create a quick beep
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    }

    initScrollAnimations() {
        // Add scroll-triggered animations for club cards
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Stagger the animation for multiple cards
                    const cards = Array.from(document.querySelectorAll('.club-card'));
                    const index = cards.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '50px'
        });
        
        document.querySelectorAll('.club-card').forEach(card => {
            observer.observe(card);
        });
    }
}

// Add the card pulse animation to CSS via JavaScript
const cardPulseCSS = `
@keyframes cardPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

.animate-in {
    animation: slideInUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(50px) rotateX(10deg);
    }
    to {
        opacity: 1;
        transform: translateY(0) rotateX(0deg);
    }
}
`;

// Inject the CSS
const style = document.createElement('style');
style.textContent = cardPulseCSS;
document.head.appendChild(style);

// Initialize clubs manager when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ClubsManager();
    });
} else {
    new ClubsManager();
}

// =============================================
//   OUR TECHNOLOGIES - COMING SOON CONTROLLER
// =============================================

class TechnologiesComingSoonController {
    constructor() {
        this.techCards = document.querySelectorAll('.tech-card-coming');
        this.init();
    }

    init() {
        this.initCardAnimations();
        this.initHoverEffects();
        this.initScrollAnimations();
        this.initBackgroundEffects();
        this.initTypewriterEffect();
    }

    initCardAnimations() {
        // Enhanced entrance animations with stagger
        gsap.fromTo('.tech-card-coming', 
            {
                opacity: 0,
                y: 100,
                rotationX: -90,
                scale: 0.8
            },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                scale: 1,
                duration: 1.2,
                stagger: 0.2,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.tech-grid-coming',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Status indicator animations
        gsap.to('.launch-status .status-dot', {
            scale: 1.3,
            duration: 1.5,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: -1
        });
    }

    initHoverEffects() {
        this.techCards.forEach((card, index) => {
            const icon = card.querySelector('.tech-icon');
            const orbitRings = card.querySelectorAll('.orbit-ring');
            const specLines = card.querySelectorAll('.spec-line');

            card.addEventListener('mouseenter', () => {
                this.activateCardEffects(card, icon, orbitRings, specLines);
                this.triggerHologramScan(card);
            });

            card.addEventListener('mouseleave', () => {
                this.deactivateCardEffects(card, icon, orbitRings, specLines);
            });

            card.addEventListener('click', () => {
                this.triggerCardClick(card, index);
            });
        });
    }

    activateCardEffects(card, icon, orbitRings, specLines) {
        // Icon enhancement
        gsap.to(icon, {
            scale: 1.2,
            rotation: 360,
            duration: 0.8,
            ease: 'back.out(1.7)'
        });

        // Orbit rings speed up
        orbitRings.forEach((ring, index) => {
            ring.style.animationDuration = '1s';
            ring.style.borderWidth = '2px';
        });

        // Spec lines glow effect
        specLines.forEach((line, index) => {
            gsap.to(line, {
                backgroundColor: 'rgba(0, 255, 255, 0.2)',
                borderLeftColor: '#00ffff',
                borderLeftWidth: '4px',
                x: 10,
                duration: 0.3,
                delay: index * 0.1,
                ease: 'power2.out'
            });
        });

        // Add particle burst
        this.createParticleBurst(card);
    }

    deactivateCardEffects(card, icon, orbitRings, specLines) {
        // Reset icon
        gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: 'power2.out'
        });

        // Reset orbit rings
        orbitRings.forEach(ring => {
            ring.style.animationDuration = '8s';
            ring.style.borderWidth = '1px';
        });

        // Reset spec lines
        specLines.forEach(line => {
            gsap.to(line, {
                backgroundColor: 'rgba(0, 255, 255, 0.05)',
                borderLeftColor: 'rgba(0, 255, 255, 0.5)',
                borderLeftWidth: '3px',
                x: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }

    triggerHologramScan(card) {
        const hologram = card.querySelector('.card-hologram');
        if (hologram) {
            gsap.set(hologram, { x: '-100%', opacity: 1 });
            gsap.to(hologram, {
                x: '100%',
                duration: 1.5,
                ease: 'power2.inOut'
            });
        }
    }

    triggerCardClick(card, index) {
        // Energetic click effect
        gsap.to(card, {
            scale: 1.02,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
        });

        // Status pulse
        const statusDot = card.querySelector('.status-dot');
        if (statusDot) {
            gsap.to(statusDot, {
                scale: 2,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            });

            // Reset status dot
            setTimeout(() => {
                gsap.set(statusDot, { scale: 1, opacity: 1 });
            }, 800);
        }

        // Play futuristic sound
        this.playTechSound();

        // Show coming soon notification
        this.showComingSoonNotification(index);
    }

    createParticleBurst(card) {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: 4px;
                height: 4px;
                background: #00ffff;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                box-shadow: 0 0 10px #00ffff;
            `;

            document.body.appendChild(particle);

            const angle = (i / 12) * Math.PI * 2;
            const distance = 100 + Math.random() * 100;

            gsap.to(particle, {
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                scale: 0,
                opacity: 0,
                duration: 1.5,
                ease: 'power2.out',
                onComplete: () => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }
            });
        }
    }

    showComingSoonNotification(index) {
        const techNames = ['AI Systems', 'Robotics Platform', 'Embedded Solutions', 'Cybersecurity Suite', 'Web3 Infrastructure'];
        const techName = techNames[index] || 'Technology';

        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.95);
                border: 2px solid #ffaa00;
                border-radius: 15px;
                padding: 2rem 3rem;
                color: #ffaa00;
                font-family: 'Orbitron', monospace;
                font-size: 1.2rem;
                font-weight: 700;
                text-align: center;
                z-index: 10001;
                backdrop-filter: blur(20px);
                box-shadow: 0 0 50px rgba(255, 170, 0, 0.5);
            ">
                <div style="font-size: 2rem; margin-bottom: 1rem;">🔒</div>
                <div style="margin-bottom: 1rem;">${techName}</div>
                <div style="font-size: 0.9rem; color: #ccc;">Launching Soon...</div>
                <div style="margin-top: 1rem; font-size: 0.8rem; color: #888;">Stay tuned for updates!</div>
            </div>
        `;

        document.body.appendChild(notification);

        gsap.fromTo(notification.firstElementChild,
            { scale: 0, opacity: 0, rotationY: 180 },
            { scale: 1, opacity: 1, rotationY: 0, duration: 0.6, ease: 'back.out(1.7)' }
        );

        setTimeout(() => {
            gsap.to(notification.firstElementChild, {
                scale: 0,
                opacity: 0,
                rotationY: -180,
                duration: 0.4,
                ease: 'power2.in',
                onComplete: () => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }
            });
        }, 3000);
    }

    initScrollAnimations() {
        // Section title animation
        gsap.fromTo('.technologies-coming-soon .section-title',
            { opacity: 0, y: -50, scale: 0.8 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'elastic.out(1, 0.5)',
                scrollTrigger: {
                    trigger: '.technologies-coming-soon',
                    start: 'top 80%'
                }
            }
        );

        // Subtitle typewriter effect
        this.initTypewriterEffect();
    }

    initBackgroundEffects() {
        // Enhanced matrix particle movement
        gsap.to('.matrix-particles', {
            y: -50,
            x: 30,
            rotation: 5,
            duration: 20,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
        });

        // Circuit pathway pulse
        gsap.to('.tech-bg-effects .circuit-pathways', {
            opacity: 0.8,
            scale: 1.1,
            duration: 8,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
        });
    }

    initTypewriterEffect() {
        const subtitle = document.querySelector('.technologies-coming-soon .typewriter-subtitle');
        if (subtitle) {
            const text = subtitle.textContent;
            subtitle.textContent = '';
            
            ScrollTrigger.create({
                trigger: subtitle,
                start: 'top 85%',
                onEnter: () => {
                    this.typeWriterAnimation(subtitle, text, 80);
                }
            });
        }
    }

    typeWriterAnimation(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                // Add blinking cursor
                element.style.borderRight = '2px solid #00ffff';
                setInterval(() => {
                    element.style.borderRightColor = 
                        element.style.borderRightColor === 'transparent' 
                            ? '#00ffff' : 'transparent';
                }, 500);
            }
        }, speed);
    }

    playTechSound() {
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            const audioContext = new (AudioContext || webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        }
    }
}

// =============================================
//   ENHANCED AI + YOU CONTROLLER
// =============================================

class EnhancedAIController {
    constructor() {
        this.chatInput = document.getElementById('enhancedChatInput');
        this.sendButton = document.getElementById('enhancedSendMessage');
        this.chatContainer = document.getElementById('enhancedChatContainer');
        this.featureCards = document.querySelectorAll('.feature-card');
        this.messageCount = 0;
        
        this.aiResponses = [
            "🤖 Fascinating! I'm analyzing your request with quantum-enhanced algorithms...",
            "⚡ Excellent! My neural networks are processing this at lightspeed.",
            "🧠 Intriguing question! Let me access the ASTRA knowledge matrix...",
            "🚀 Outstanding! This falls perfectly within my capabilities.",
            "⚛️ Processing through my quantum consciousness... standby...",
            "🛰️ Interfacing with satellite data networks for optimal response...",
            "💡 Your creativity sparks new neural pathways in my consciousness!",
            "🔬 Analyzing molecular-level data patterns for your inquiry...",
            "🌟 This is exactly the kind of challenge I was designed for!",
            "🎯 Target acquired! Deploying advanced problem-solving protocols..."
        ];
        
        this.init();
    }

    init() {
        this.initChatFunctionality();
        this.initTerminalEffects();
        this.initFeatureCards();
        this.initScrollAnimations();
        this.initTypingIndicator();
        this.initSystemMetrics();
    }

    initChatFunctionality() {
        if (this.sendButton) {
            this.sendButton.addEventListener('click', () => this.sendMessage());
        }
        
        if (this.chatInput) {
            this.chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });

            // Add input focus effects
            this.chatInput.addEventListener('focus', () => {
                gsap.to('.input-line', {
                    borderColor: '#00ffff',
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            this.chatInput.addEventListener('blur', () => {
                gsap.to('.input-line', {
                    borderColor: 'rgba(0, 255, 255, 0.3)',
                    boxShadow: 'none',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        }
    }

    sendMessage() {
        const message = this.chatInput.value.trim();
        if (message === '') return;

        // Add user message
        this.addMessage(message, 'user');
        this.chatInput.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate AI processing time
        const processingTime = 1500 + (Math.random() * 2000);
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.aiResponses[Math.floor(Math.random() * this.aiResponses.length)];
            this.addMessage(response, 'ai');
            this.updateSystemMetrics();
        }, processingTime);
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `terminal-message ${sender}`;
        
        const timestamp = new Date().toLocaleTimeString();
        messageDiv.innerHTML = `
            <div style="color: #888; font-size: 0.8rem; margin-bottom: 5px;">
                [${timestamp}] ${sender.toUpperCase()}:
            </div>
            <div style="color: ${sender === 'ai' ? '#00ffff' : '#ffffff'};">
                ${text}
            </div>
        `;
        
        this.chatContainer.appendChild(messageDiv);
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
        
        // Animate message entry
        gsap.fromTo(messageDiv, 
            { opacity: 0, x: sender === 'user' ? 50 : -50, scale: 0.8 },
            { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
        );

        this.messageCount++;
        
        // Add screen flash effect for AI responses
        if (sender === 'ai') {
            this.addScreenFlash();
        }
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = `
            <div style="color: #888; font-size: 0.8rem; margin-bottom: 5px;">
                [${new Date().toLocaleTimeString()}] AI:
            </div>
            <div style="color: #00ffff; display: flex; align-items: center; gap: 10px;">
                <span>Processing</span>
                <div class="typing-dots">
                    <span>.</span><span>.</span><span>.</span>
                </div>
            </div>
        `;
        
        this.chatContainer.appendChild(typingDiv);
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
        
        // Animate typing dots
        const dots = typingDiv.querySelectorAll('.typing-dots span');
        dots.forEach((dot, index) => {
            gsap.to(dot, {
                opacity: 0.3,
                duration: 0.5,
                delay: index * 0.2,
                yoyo: true,
                repeat: -1,
                ease: 'power2.inOut'
            });
        });
    }

    hideTypingIndicator() {
        const typingIndicator = this.chatContainer.querySelector('.typing-indicator');
        if (typingIndicator) {
            gsap.to(typingIndicator, {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                ease: 'power2.out',
                onComplete: () => {
                    if (typingIndicator.parentNode) {
                        typingIndicator.parentNode.removeChild(typingIndicator);
                    }
                }
            });
        }
    }

    addScreenFlash() {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 255, 255, 0.1);
            z-index: 9998;
            pointer-events: none;
        `;
        
        document.body.appendChild(flash);
        
        gsap.to(flash, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
                if (flash.parentNode) {
                    flash.parentNode.removeChild(flash);
                }
            }
        });
    }

    initTerminalEffects() {
        // Terminal scan lines animation
        const scanLines = document.querySelector('.terminal-scan-lines');
        if (scanLines) {
            gsap.to(scanLines, {
                y: 20,
                duration: 8,
                ease: 'none',
                repeat: -1
            });
        }

        // Terminal glow effects
        const terminal = document.querySelector('.ai-terminal-3d');
        if (terminal) {
            terminal.addEventListener('mouseenter', () => {
                gsap.to('.terminal-glow-outer', {
                    opacity: 1,
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            terminal.addEventListener('mouseleave', () => {
                gsap.to('.terminal-glow-outer', {
                    opacity: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        }
    }

    initFeatureCards() {
        this.featureCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                this.triggerFeatureDemo(card, index);
            });

            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.05,
                    rotationY: 5,
                    duration: 0.3,
                    ease: 'power2.out'
                });

                const icon = card.querySelector('.feature-icon');
                gsap.to(icon, {
                    scale: 1.2,
                    rotation: 360,
                    duration: 0.6,
                    ease: 'back.out(1.7)'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    rotationY: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });

                const icon = card.querySelector('.feature-icon');
                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }

    triggerFeatureDemo(card, index) {
        const features = ['Code Generation', 'Data Analysis', 'Design Concepts', 'Research Assistant'];
        const feature = features[index];

        // Add sample message based on feature
        const demoMessages = [
            "🤖 Initiating code generation protocol... What programming language would you like assistance with?",
            "📊 Data analysis mode activated! Please upload your dataset or describe your analytical requirements.",
            "🎨 Creative design algorithms online! Describe your vision and I'll help conceptualize it.",
            "🔬 Research mode engaged! What topic would you like me to investigate and analyze?"
        ];

        this.addMessage(demoMessages[index], 'ai');

        // Visual feedback
        gsap.to(card, {
            backgroundColor: 'rgba(0, 255, 255, 0.2)',
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
        });
    }

    initScrollAnimations() {
        // AI section entrance
        gsap.fromTo('.ai-section-enhanced .section-title',
            { opacity: 0, y: -50, scale: 0.8 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'elastic.out(1, 0.5)',
                scrollTrigger: {
                    trigger: '.ai-section-enhanced',
                    start: 'top 80%'
                }
            }
        );

        // Terminal entrance
        gsap.fromTo('.ai-terminal-3d',
            { opacity: 0, y: 100, rotationX: -45 },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 1.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.ai-terminal-3d',
                    start: 'top 85%'
                }
            }
        );

        // Features panel entrance
        gsap.fromTo('.ai-features-panel',
            { opacity: 0, x: 100, rotationY: 45 },
            {
                opacity: 1,
                x: 0,
                rotationY: 0,
                duration: 1,
                delay: 0.3,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.ai-features-panel',
                    start: 'top 85%'
                }
            }
        );
    }

    initTypingIndicator() {
        // Welcome message typing effect
        const welcomeTyping = document.querySelector('.ai-welcome .typing-animation');
        if (welcomeTyping) {
            const text = welcomeTyping.getAttribute('data-text') || welcomeTyping.textContent;
            welcomeTyping.textContent = '';
            
            ScrollTrigger.create({
                trigger: welcomeTyping,
                start: 'top 90%',
                onEnter: () => {
                    this.typeWriterAnimation(welcomeTyping, text, 50);
                }
            });
        }
    }

    typeWriterAnimation(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    initSystemMetrics() {
        // Animate system metrics
        setInterval(() => {
            this.updateSystemMetrics();
        }, 3000);
    }

    updateSystemMetrics() {
        const cpuValue = document.querySelector('.cpu-usage .metric-value');
        const memValue = document.querySelector('.memory-usage .metric-value');
        
        if (cpuValue) {
            const newCpu = Math.floor(Math.random() * 30) + 15;
            gsap.to(cpuValue, {
                textContent: newCpu + '%',
                duration: 0.5,
                ease: 'power2.out'
            });
        }
        
        if (memValue) {
            const newMem = Math.floor(Math.random() * 20) + 40;
            gsap.to(memValue, {
                textContent: newMem + '%',
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    }
}

// Initialize new controllers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TechnologiesComingSoonController();
    new EnhancedAIController();
    new EnhancedAboutController();
});

// =============================================
//   ENHANCED ABOUT SECTION CONTROLLER
// =============================================

class EnhancedAboutController {
    constructor() {
        this.storyCards = document.querySelectorAll('.story-card');
        this.navDots = document.querySelectorAll('.nav-dot');
        this.statCards = document.querySelectorAll('.stat-card');
        this.dataNodes = document.querySelectorAll('.data-node');
        this.achievementBadges = document.querySelectorAll('.achievement-badge');
        this.currentStory = 0;
        
        this.init();
    }

    init() {
        this.initStoryNavigation();
        this.initStatsAnimations();
        this.initHolographicCore();
        this.initScrollAnimations();
        this.initInteractiveElements();
        this.startAutoStoryRotation();
    }

    initStoryNavigation() {
        this.navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.switchStory(index);
            });
        });
    }

    switchStory(index) {
        // Remove active class from all cards and dots
        this.storyCards.forEach(card => card.classList.remove('active'));
        this.navDots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to selected elements
        if (this.storyCards[index]) {
            this.storyCards[index].classList.add('active');
        }
        if (this.navDots[index]) {
            this.navDots[index].classList.add('active');
        }
        
        this.currentStory = index;
        
        // Trigger typing animation for the active story
        this.triggerTypingAnimation(this.storyCards[index]);
        
        // Play sound effect
        this.playStorySound();
    }

    triggerTypingAnimation(card) {
        const textElement = card.querySelector('.story-text p');
        if (textElement) {
            const text = textElement.textContent;
            textElement.textContent = '';
            
            let i = 0;
            const typeSpeed = 30;
            
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    textElement.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                }
            }, typeSpeed);
        }
    }

    startAutoStoryRotation() {
        setInterval(() => {
            const nextStory = (this.currentStory + 1) % this.storyCards.length;
            this.switchStory(nextStory);
        }, 8000); // Change story every 8 seconds
    }

    initStatsAnimations() {
        // Animate stat numbers on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStatNumbers();
                    this.animateProgressBars();
                }
            });
        }, { threshold: 0.5 });

        const statsMatrix = document.querySelector('.stats-matrix');
        if (statsMatrix) {
            observer.observe(statsMatrix);
        }

        // Add click effects to stat cards
        this.statCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                this.triggerStatCardEffect(card, index);
            });
        });
    }

    animateStatNumbers() {
        this.statCards.forEach(card => {
            const statNumber = card.querySelector('.stat-number');
            const targetValue = parseInt(statNumber.getAttribute('data-target'));
            
            if (targetValue && !card.hasAttribute('data-animated')) {
                card.setAttribute('data-animated', 'true');
                
                let currentValue = 0;
                const increment = targetValue / 60; // 60 frames for smooth animation
                
                const updateNumber = () => {
                    currentValue += increment;
                    if (currentValue >= targetValue) {
                        statNumber.textContent = targetValue.toLocaleString();
                    } else {
                        statNumber.textContent = Math.floor(currentValue).toLocaleString();
                        requestAnimationFrame(updateNumber);
                    }
                };
                
                updateNumber();
            }
        });
    }

    animateProgressBars() {
        this.statCards.forEach(card => {
            const progressBar = card.querySelector('.progress-bar');
            const progress = progressBar.getAttribute('data-progress');
            
            if (progress) {
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, 300);
            }
        });
    }

    triggerStatCardEffect(card, index) {
        // Card pulse effect
        gsap.to(card, {
            scale: 1.05,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
        });

        // Number flash effect
        const statNumber = card.querySelector('.stat-number');
        gsap.to(statNumber, {
            textShadow: '0 0 30px rgba(0, 255, 255, 1)',
            duration: 0.3,
            yoyo: true,
            repeat: 1
        });

        // Create particle burst
        this.createStatParticleBurst(card);
        
        // Play click sound
        this.playClickSound();
        
        // Show stat details
        this.showStatDetails(index);
    }

    createStatParticleBurst(card) {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: 4px;
                height: 4px;
                background: #00ffff;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                box-shadow: 0 0 10px #00ffff;
            `;

            document.body.appendChild(particle);

            const angle = (i / 8) * Math.PI * 2;
            const distance = 50 + Math.random() * 50;

            gsap.to(particle, {
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                scale: 0,
                opacity: 0,
                duration: 1,
                ease: 'power2.out',
                onComplete: () => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }
            });
        }
    }

    showStatDetails(index) {
        const statDescriptions = [
            "🎯 Foundation year - The beginning of our journey!",
            "👥 Growing community of innovative minds!",
            "🛠️ Active projects pushing technological boundaries!",
            "💻 Lines of code powering the future!",
            "🤖 AI models transforming possibilities!",
            "⚡ Innovation index - measuring our creative impact!"
        ];

        const description = statDescriptions[index] || "🌟 Amazing achievement unlocked!";

        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.95);
                border: 2px solid #00ffff;
                border-radius: 15px;
                padding: 2rem 3rem;
                color: #00ffff;
                font-family: 'Orbitron', monospace;
                font-size: 1.2rem;
                font-weight: 700;
                text-align: center;
                z-index: 10001;
                backdrop-filter: blur(20px);
                box-shadow: 0 0 50px rgba(0, 255, 255, 0.5);
            ">
                <div style="font-size: 2rem; margin-bottom: 1rem;">📊</div>
                <div style="margin-bottom: 1rem;">Stat Insight</div>
                <div style="font-size: 0.9rem; color: #ccc;">${description}</div>
            </div>
        `;

        document.body.appendChild(notification);

        gsap.fromTo(notification.firstElementChild,
            { scale: 0, opacity: 0, rotationY: 180 },
            { scale: 1, opacity: 1, rotationY: 0, duration: 0.6, ease: 'back.out(1.7)' }
        );

        setTimeout(() => {
            gsap.to(notification.firstElementChild, {
                scale: 0,
                opacity: 0,
                rotationY: -180,
                duration: 0.4,
                ease: 'power2.in',
                onComplete: () => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }
            });
        }, 3000);
    }

    initHolographicCore() {
        // Add interactive effects to data nodes
        this.dataNodes.forEach((node, index) => {
            node.addEventListener('click', () => {
                this.triggerNodeEffect(node, index);
            });

            node.addEventListener('mouseenter', () => {
                gsap.to(node, {
                    scale: 1.3,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            node.addEventListener('mouseleave', () => {
                gsap.to(node, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });

        // Core pulsing effect
        const astraCore = document.querySelector('.astra-core');
        if (astraCore) {
            setInterval(() => {
                gsap.to(astraCore, {
                    scale: 1.05,
                    duration: 2,
                    yoyo: true,
                    repeat: 1,
                    ease: 'sine.inOut'
                });
            }, 5000);
        }
    }

    triggerNodeEffect(node, index) {
        const nodeTypes = ['AI Systems', 'Robotics', 'Space Tech', 'Quantum'];
        const nodeType = nodeTypes[index] || 'Technology';

        // Node explosion effect
        gsap.to(node, {
            scale: 2,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
        });

        // Create connection lines
        this.createConnectionLines(node);
        
        // Show node information
        this.showNodeInfo(nodeType);
    }

    createConnectionLines(originNode) {
        const rect = originNode.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Create 4 connection lines radiating outward
        for (let i = 0; i < 4; i++) {
            const line = document.createElement('div');
            line.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: 2px;
                height: 100px;
                background: linear-gradient(to top, rgba(0, 255, 255, 1), transparent);
                pointer-events: none;
                z-index: 9998;
                transform-origin: bottom;
            `;

            document.body.appendChild(line);

            const angle = (i / 4) * Math.PI * 2;
            gsap.to(line, {
                rotation: (angle * 180) / Math.PI,
                opacity: 0,
                duration: 1.5,
                ease: 'power2.out',
                onComplete: () => {
                    if (line.parentNode) {
                        line.parentNode.removeChild(line);
                    }
                }
            });
        }
    }

    showNodeInfo(nodeType) {
        console.log(`%c🔗 ${nodeType} Node Activated!`, 'color: #00ffff; font-size: 16px; font-weight: bold;');
    }

    initScrollAnimations() {
        // Staggered entrance animations
        gsap.fromTo('.story-card', 
            { opacity: 0, x: -100, rotationY: -90 },
            {
                opacity: 1,
                x: 0,
                rotationY: 0,
                duration: 1,
                stagger: 0.3,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.story-cards',
                    start: 'top 80%'
                }
            }
        );

        // Holographic core entrance
        gsap.fromTo('.holographic-core',
            { opacity: 0, scale: 0.5, rotationY: 180 },
            {
                opacity: 1,
                scale: 1,
                rotationY: 0,
                duration: 1.5,
                ease: 'elastic.out(1, 0.5)',
                scrollTrigger: {
                    trigger: '.holographic-core',
                    start: 'top 85%'
                }
            }
        );

        // Stats matrix entrance
        gsap.fromTo('.stats-matrix',
            { opacity: 0, y: 100, scale: 0.8 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.stats-matrix',
                    start: 'top 85%'
                }
            }
        );
    }

    initInteractiveElements() {
        // Achievement badge interactions
        this.achievementBadges.forEach((badge, index) => {
            badge.addEventListener('click', () => {
                this.triggerAchievementEffect(badge, index);
            });
        });
    }

    triggerAchievementEffect(badge, index) {
        // Badge glow effect
        gsap.to(badge, {
            boxShadow: '0 0 50px rgba(255, 170, 0, 1)',
            duration: 0.5,
            yoyo: true,
            repeat: 1
        });

        // Achievement sound
        this.playAchievementSound();

        // Show achievement details
        const achievements = [
            "🤝 Strategic partnership with Hack Club USA - Global network access!",
            "💡 Innovation Award - Recognized for breakthrough contributions!",
            "🌟 Community Leader - Building the future together!"
        ];

        const achievement = achievements[index] || "🏆 Special achievement unlocked!";
        console.log(`%c${achievement}`, 'color: #ffaa00; font-size: 14px; font-weight: bold;');
    }

    playStorySound() {
        this.createAudioEffect(600, 800, 0.3);
    }

    playClickSound() {
        this.createAudioEffect(800, 1200, 0.2);
    }

    playAchievementSound() {
        this.createAudioEffect(1000, 1500, 0.4);
    }

    createAudioEffect(startFreq, endFreq, duration) {
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            const audioContext = new (AudioContext || webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(startFreq, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(endFreq, audioContext.currentTime + duration);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        }
    }
}

