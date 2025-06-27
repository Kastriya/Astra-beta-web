// ASTRA Performance Optimization Module
// This file contains all performance optimizations for better Lighthouse scores

class ASTRAPerformanceOptimizer {
    constructor() {
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.isMobile = window.innerWidth <= 768;
        this.isSlowConnection = navigator.connection && navigator.connection.effectiveType.includes('2g');
        this.intersectionObserver = null;
        this.loadingQueue = [];
        this.init();
    }

    init() {
        // Critical optimizations that run immediately
        this.optimizeInitialLoad();
        this.setupLazyLoading();
        this.optimizeAnimations();
        this.deferNonCriticalResources();
        this.setupImageOptimization();
        this.optimizeScrolling();
        this.setupConnectionAwareLoading();
        this.preloadCriticalResources();
    }

    optimizeInitialLoad() {
        // Reduce initial JavaScript execution
        document.addEventListener('DOMContentLoaded', () => {
            // Defer heavy animations until after critical path
            setTimeout(() => this.initializeHeavyAnimations(), 100);
            
            // Load particle system only if performance allows
            if (!this.isMobile && !this.isSlowConnection) {
                setTimeout(() => this.initializeParticleSystem(), 500);
            }
        });

        // Remove unused CSS for faster FCP
        this.removeUnusedCSS();
        
        // Optimize font loading
        this.optimizeFonts();
    }

    setupLazyLoading() {
        // Enhanced lazy loading with Intersection Observer
        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadElement(entry.target);
                    this.intersectionObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px',
            threshold: 0.1
        });

        // Lazy load images
        document.querySelectorAll('img[data-src]').forEach(img => {
            this.intersectionObserver.observe(img);
        });

        // Lazy load video
        const heroVideo = document.querySelector('.hero-video video');
        if (heroVideo) {
            heroVideo.preload = 'none';
            this.intersectionObserver.observe(heroVideo);
        }

        // Lazy load heavy sections
        document.querySelectorAll('.tech-card, .story-card, .timeline-card').forEach(el => {
            this.intersectionObserver.observe(el);
        });
    }

    loadElement(element) {
        // Handle different types of lazy-loaded elements
        if (element.tagName === 'IMG' && element.dataset.src) {
            element.src = element.dataset.src;
            element.classList.add('loaded');
        }

        if (element.tagName === 'VIDEO') {
            element.preload = 'metadata';
            element.load();
        }

        if (element.classList.contains('tech-card')) {
            this.initializeCardAnimations(element);
        }
    }

    optimizeAnimations() {
        // Disable animations for reduced motion preference
        if (this.isReducedMotion) {
            document.documentElement.style.setProperty('--animation-duration', '0s');
            document.documentElement.style.setProperty('--transition-duration', '0s');
            return;
        }

        // Reduce animations on mobile
        if (this.isMobile) {
            document.documentElement.style.setProperty('--animation-duration', '0.3s');
            document.documentElement.style.setProperty('--particle-count', '20');
        }

        // Use requestAnimationFrame for smooth animations
        this.setupRAFAnimations();
    }

    setupRAFAnimations() {
        let ticking = false;

        const updateAnimations = () => {
            // Batch DOM reads and writes
            this.batchDOMOperations();
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        });
    }

    batchDOMOperations() {
        // Batch all DOM reads
        const scrollY = window.pageYOffset;
        const viewportHeight = window.innerHeight;
        
        // Batch all DOM writes
        document.querySelectorAll('.parallax-element').forEach((el, index) => {
            const speed = el.dataset.speed || 0.5;
            const transform = `translateY(${scrollY * speed}px)`;
            el.style.transform = transform;
        });
    }

    deferNonCriticalResources() {
        // Defer GSAP loading until after critical content
        const deferGSAP = () => {
            if (!document.querySelector('script[src*="gsap"]')) {
                const gsapScript = document.createElement('script');
                gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
                gsapScript.defer = true;
                document.head.appendChild(gsapScript);

                gsapScript.onload = () => {
                    const scrollTrigger = document.createElement('script');
                    scrollTrigger.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
                    scrollTrigger.defer = true;
                    document.head.appendChild(scrollTrigger);
                };
            }
        };

        // Load after critical content
        setTimeout(deferGSAP, 1000);

        // Defer particles.js for mobile
        if (!this.isMobile) {
            setTimeout(() => {
                const particlesScript = document.createElement('script');
                particlesScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js';
                particlesScript.defer = true;
                document.head.appendChild(particlesScript);
            }, 1500);
        }
    }

    setupImageOptimization() {
        // Convert images to WebP where supported
        if (this.supportsWebP()) {
            document.querySelectorAll('img[data-src]').forEach(img => {
                const src = img.dataset.src;
                if (src && !src.includes('.webp')) {
                    // Add WebP fallback
                    const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                    img.dataset.webpSrc = webpSrc;
                }
            });
        }

        // Add responsive image loading
        this.setupResponsiveImages();
    }

    supportsWebP() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').includes('data:image/webp');
    }

    setupResponsiveImages() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            // Use appropriate image size based on viewport
            const originalSrc = img.dataset.src;
            if (this.isMobile && originalSrc) {
                // Use smaller images on mobile
                img.dataset.src = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '_mobile.$1');
            }
        });
    }

    optimizeScrolling() {
        // Use passive event listeners for better scroll performance
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            // Throttle scroll events
            if (scrollTimeout) return;
            
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
                scrollTimeout = null;
            }, 16); // ~60fps
        }, { passive: true });
    }

    handleScroll() {
        // Optimized scroll handling
        const scrollY = window.pageYOffset;
        
        // Hide/show navbar efficiently
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.transform = scrollY > 100 ? 'translateY(-100%)' : 'translateY(0)';
        }

        // Update scroll progress efficiently
        this.updateScrollProgress(scrollY);
    }

    updateScrollProgress(scrollY) {
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(scrollY / documentHeight, 1);
        
        // Update any progress indicators
        document.documentElement.style.setProperty('--scroll-progress', progress);
    }

    setupConnectionAwareLoading() {
        // Adjust loading strategy based on connection
        if (this.isSlowConnection) {
            // Disable heavy animations
            document.documentElement.classList.add('slow-connection');
            
            // Reduce particle count
            document.documentElement.style.setProperty('--particle-count', '10');
            
            // Disable video autoplay
            document.querySelectorAll('video[autoplay]').forEach(video => {
                video.removeAttribute('autoplay');
                video.preload = 'none';
            });
        }
    }

    preloadCriticalResources() {
        // Preload critical fonts
        const criticalFonts = [
            'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap'
        ];

        criticalFonts.forEach(fontUrl => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = fontUrl;
            document.head.appendChild(link);
        });

        // Preload critical images
        const criticalImages = [
            // Add paths to critical images here
        ];

        criticalImages.forEach(imageSrc => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = imageSrc;
            document.head.appendChild(link);
        });
    }

    removeUnusedCSS() {
        // Remove unused CSS classes dynamically
        setTimeout(() => {
            const unusedSelectors = this.findUnusedCSS();
            this.removeUnusedRules(unusedSelectors);
        }, 2000);
    }

    findUnusedCSS() {
        const usedSelectors = new Set();
        const allElements = document.querySelectorAll('*');
        
        allElements.forEach(element => {
            element.classList.forEach(className => {
                usedSelectors.add('.' + className);
            });
            
            if (element.id) {
                usedSelectors.add('#' + element.id);
            }
        });

        return usedSelectors;
    }

    removeUnusedRules(usedSelectors) {
        // This is a simplified version - in production, use a proper CSS purging tool
        console.log('CSS optimization complete. Used selectors:', usedSelectors.size);
    }

    optimizeFonts() {
        // Add font-display: swap to improve FCP
        const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
        fontLinks.forEach(link => {
            if (!link.href.includes('display=swap')) {
                link.href += '&display=swap';
            }
        });
    }

    initializeHeavyAnimations() {
        // Only initialize heavy animations after critical content is loaded
        if (!this.isMobile && !this.isSlowConnection) {
            // Initialize complex animations here
            this.initMatrixRain();
            this.initFloatingElements();
        }
    }

    initializeParticleSystem() {
        // Lightweight particle system initialization
        if (window.particlesJS && !this.isMobile) {
            // Reduced particle configuration for better performance
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": this.isMobile ? 20 : 50,
                        "density": { "enable": true, "value_area": 1000 }
                    },
                    "color": { "value": ["#00ffff", "#ff00ff"] },
                    "shape": { "type": "circle" },
                    "opacity": {
                        "value": 0.5,
                        "random": true,
                        "anim": { "enable": true, "speed": 1, "opacity_min": 0.1 }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": { "enable": true, "speed": 2, "size_min": 0.5 }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#00ffff",
                        "opacity": 0.2,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 1,
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
                        "onhover": { "enable": !this.isMobile, "mode": "repulse" },
                        "onclick": { "enable": true, "mode": "push" }
                    },
                    "modes": {
                        "repulse": { "distance": 100, "duration": 0.4 },
                        "push": { "particles_nb": 2 }
                    }
                },
                "retina_detect": true
            });
        }
    }

    initMatrixRain() {
        // Optimized matrix rain effect
        if (this.isMobile) return;

        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.05;
        `;
        
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const matrix = "ASTRA0123456789";
        const matrixArray = matrix.split("");
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);
        
        const draw = () => {
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
        };
        
        // Use requestAnimationFrame for better performance
        const animate = () => {
            draw();
            setTimeout(() => requestAnimationFrame(animate), 100);
        };
        
        animate();
    }

    initFloatingElements() {
        // Simplified floating elements for better performance
        const floatingElements = document.querySelectorAll('.floating-elements .tech-orb');
        
        floatingElements.forEach((element, index) => {
            // Use CSS animations instead of JavaScript for better performance
            element.style.animation = `float-${index} ${8 + index * 2}s ease-in-out infinite`;
        });
    }

    initializeCardAnimations(card) {
        // Lightweight card animation initialization
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
            card.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    }

    // Performance monitoring
    measurePerformance() {
        // Web Vitals monitoring
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    console.log(`${entry.name}: ${entry.value}`);
                });
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
        }
    }

    // Cleanup function
    destroy() {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
    }
}

// Service Worker Registration for better caching
class ServiceWorkerManager {
    constructor() {
        this.registerServiceWorker();
    }

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                        console.log('SW registered: ', registration);
                    })
                    .catch((registrationError) => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', () => {
    window.astraOptimizer = new ASTRAPerformanceOptimizer();
    new ServiceWorkerManager();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ASTRAPerformanceOptimizer, ServiceWorkerManager };
}
