// Enhanced Gaming Experience Functions for Bonus Hunt Redesign

function setupEnhancedAnimations() {
    // Enhanced view transitions
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.classList.contains('game-view') && target.classList.contains('active')) {
                    animateViewEntry(target);
                }
            }
        });
    });

    document.querySelectorAll('.game-view').forEach(view => {
        observer.observe(view, { attributes: true });
    });
}

function animateViewEntry(view) {
    view.style.opacity = '0';
    view.style.transform = 'translateY(20px) scale(0.95)';
    
    setTimeout(() => {
        view.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        view.style.opacity = '1';
        view.style.transform = 'translateY(0) scale(1)';
    }, 50);
}

function setupGamingEffects() {
    // Enhanced button ripple effects
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn')) {
            createRippleEffect(e.target, e);
        }
    });

    // Enhanced input focus effects
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
}

function createRippleEffect(button, e) {
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.background = 'rgba(0, 255, 255, 0.5)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'rippleEffect 0.6s ease-out';
    
    const rect = button.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

function enhanceStepTransition(fromViewId, toViewId) {
    const fromView = document.getElementById(fromViewId);
    const toView = document.getElementById(toViewId);
    
    if (!fromView || !toView) return;
    
    // Animate out current view
    fromView.style.transition = 'all 0.3s ease-out';
    fromView.style.opacity = '0';
    fromView.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
        fromView.classList.remove('active');
        toView.classList.add('active');
        
        // Prepare new view
        toView.style.opacity = '0';
        toView.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            toView.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            toView.style.opacity = '1';
            toView.style.transform = 'translateX(0)';
        }, 50);
    }, 300);
}

function addGlowEffect(element, color = 'cyan') {
    element.style.transition = 'all 0.3s ease';
    element.style.borderColor = `var(--bonus-${color})`;
    element.style.boxShadow = `0 0 20px rgba(0, 255, 255, 0.3)`;
    
    setTimeout(() => {
        element.style.borderColor = 'var(--bonus-border)';
        element.style.boxShadow = '';
    }, 2000);
}

function enhanceFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const inputs = form.querySelectorAll('input[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    addGlowEffect(input, 'danger');
                    input.classList.add('error-shake');
                    
                    setTimeout(() => {
                        input.classList.remove('error-shake');
                    }, 500);
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showToast('Veuillez remplir tous les champs requis', 'error');
            }
        });
    });
}

// Enhanced step indicator animations
function animateStepIndicator(stepNumber) {
    const steps = document.querySelectorAll('.neon-stepper .step');
    
    steps.forEach((step, index) => {
        if (index < stepNumber) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (index === stepNumber - 1) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', () => {
    // Enhanced form validation
    enhanceFormValidation();
});

// Export enhanced functions
window.BonusHuntEnhanced = {
    animateViewEntry,
    createRippleEffect,
    enhanceStepTransition,
    addGlowEffect
};