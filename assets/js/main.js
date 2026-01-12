/**
 * Aer Caribe - Funcionalidades JavaScript
 * Archivo: main.js
 * Descripción: Lógica de programación para la landing page de Aer Caribe
 * Incluye: validación de formularios, micro-interacciones y efectos de scroll
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // 1. VALIDACIÓN DEL FORMULARIO DE CONTACTO
    // ============================================
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Validación en tiempo real para campos requeridos
        const requiredFields = contactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', validateField);
        });
        
        // Validación especial para email
        const emailField = contactForm.querySelector('#email');
        if (emailField) {
            emailField.addEventListener('input', validateEmail);
        }
    }
    
    /**
     * Maneja el envío del formulario de contacto
     * @param {Event} e - Evento de envío del formulario
     */
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Validar todos los campos antes de enviar
        const isValid = validateForm();
        
        if (isValid) {
            // Mostrar estado de envío
            showFormLoading(true);
            
            // Simular envío a servidor (en una implementación real, sería una petición fetch o axios)
            setTimeout(() => {
                // Simular respuesta exitosa del servidor
                showFormMessage('success', '¡Solicitud enviada con éxito! Nos pondremos en contacto contigo en menos de 24 horas.');
                resetForm();
                showFormLoading(false);
            }, 1500);
        } else {
            showFormMessage('error', 'Por favor, corrige los errores en el formulario antes de enviar.');
        }
    }
    
    /**
     * Valida un campo individual del formulario
     */
    function validateField() {
        const field = this;
        const value = field.value.trim();
        const isRequired = field.hasAttribute('required');
        const fieldName = field.getAttribute('name');
        
        // Limpiar estados previos
        field.classList.remove('is-invalid', 'is-valid');
        
        // Validar campo requerido vacío
        if (isRequired && value === '') {
            field.classList.add('is-invalid');
            return false;
        }
        
        // Validaciones específicas por tipo de campo
        let isValid = true;
        
        switch (field.type) {
            case 'email':
                isValid = validateEmailFormat(value);
                break;
            case 'tel':
                isValid = value.length >= 8; // Validación simple de teléfono
                break;
            case 'select-one':
                isValid = value !== '' && value !== null;
                break;
        }
        
        if (isValid) {
            field.classList.add('is-valid');
        } else {
            field.classList.add('is-invalid');
        }
        
        return isValid;
    }
    
    /**
     * Valida el formato de un email
     * @param {string} email - Email a validar
     * @returns {boolean} - True si el formato es válido
     */
    function validateEmailFormat(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    /**
     * Validación en tiempo real para campo de email
     */
    function validateEmail() {
        const email = this.value.trim();
        const isValid = validateEmailFormat(email);
        
        this.classList.remove('is-invalid', 'is-valid');
        
        if (email === '') {
            return; // No mostrar error si está vacío (se manejará en blur)
        }
        
        if (isValid) {
            this.classList.add('is-valid');
        } else {
            this.classList.add('is-invalid');
        }
    }
    
    /**
     * Valida todo el formulario
     * @returns {boolean} - True si el formulario es válido
     */
    function validateForm() {
        const requiredFields = contactForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            const fieldValid = validateField.call(field);
            if (!fieldValid) {
                isValid = false;
            }
        });
        
        // Validar checkbox de términos
        const termsCheckbox = contactForm.querySelector('#terms');
        if (termsCheckbox && !termsCheckbox.checked) {
            termsCheckbox.classList.add('is-invalid');
            isValid = false;
        } else if (termsCheckbox) {
            termsCheckbox.classList.remove('is-invalid');
        }
        
        return isValid;
    }
    
    /**
     * Muestra un mensaje de estado en el formulario
     * @param {string} type - Tipo de mensaje ('success' o 'error')
     * @param {string} message - Mensaje a mostrar
     */
    function showFormMessage(type, message) {
        const messageEl = document.getElementById('formMessage');
        
        if (messageEl) {
            messageEl.textContent = message;
            messageEl.className = `alert alert-${type}`;
            messageEl.classList.remove('d-none');
            
            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                messageEl.classList.add('d-none');
            }, 5000);
        }
    }
    
    /**
     * Muestra/oculta el estado de carga del formulario
     * @param {boolean} isLoading - True para mostrar estado de carga
     */
    function showFormLoading(isLoading) {
        const submitBtn = document.getElementById('submitBtn');
        const submitText = document.getElementById('submitText');
        const submitSpinner = document.getElementById('submitSpinner');
        
        if (submitBtn && submitText && submitSpinner) {
            if (isLoading) {
                submitBtn.disabled = true;
                submitText.textContent = 'Enviando...';
                submitSpinner.classList.remove('d-none');
            } else {
                submitBtn.disabled = false;
                submitText.textContent = 'Enviar solicitud';
                submitSpinner.classList.add('d-none');
            }
        }
    }
    
    /**
     * Restablece el formulario a su estado inicial
     */
    function resetForm() {
        if (contactForm) {
            contactForm.reset();
            
            // Limpiar estados de validación
            const formControls = contactForm.querySelectorAll('.form-control, .form-select, .form-check-input');
            formControls.forEach(control => {
                control.classList.remove('is-invalid', 'is-valid');
            });
        }
    }
    
    // ============================================
    // 2. MENÚ PEGAJOSO Y EFECTOS DE SCROLL
    // ============================================
    
    /**
     * Controla el comportamiento del menú pegajoso
     */
    function initStickyHeader() {
        const header = document.querySelector('header');
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 100) {
            header.classList.add('shadow-lg');
            header.style.padding = '0.5rem 0';
        } else {
            header.classList.remove('shadow-lg');
            header.style.padding = '1rem 0';
        }
    }
    
    // Ejecutar al cargar y al hacer scroll
    window.addEventListener('scroll', initStickyHeader);
    initStickyHeader();
    
    // ============================================
    // 3. BOTÓN "VOLVER ARRIBA"
    // ============================================
    
    /**
     * Inicializa el botón para volver al inicio de la página
     */
    function initBackToTopButton() {
        const backToTopBtn = document.getElementById('backToTop');
        
        if (backToTopBtn) {
            // Mostrar/ocultar botón según posición de scroll
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });
            
            // Scroll suave al hacer clic
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    initBackToTopButton();
    
    // ============================================
    // 4. EFECTO DE REVELADO AL HACER SCROLL
    // ============================================
    
    /**
     * Aplica efecto de revelado a elementos al hacer scroll
     */
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal');
        
        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            const revealPoint = 150;
            
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                
                if (elementTop < windowHeight - revealPoint) {
                    element.classList.add('active');
                }
            });
        };
        
        // Aplicar efecto al cargar y al hacer scroll
        window.addEventListener('scroll', revealOnScroll);
        window.addEventListener('load', revealOnScroll);
        
        // Aplicar clase 'reveal' a elementos que deben tener el efecto
        document.querySelectorAll('.service-card, .advantage-item, .section-title').forEach(el => {
            el.classList.add('reveal');
        });
    }
    
    initScrollReveal();
    
    // ============================================
    // 5. ANIMACIONES DE HOVER PARA BOTONES Y TARJETAS
    // ============================================
    
    /**
     * Añade efectos de hover a botones y elementos interactivos
     */
    function initHoverEffects() {
        // Efecto para botones con clase .btn-cta
        const ctaButtons = document.querySelectorAll('.btn-cta, .btn-primary, .btn-warning');
        
        ctaButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-3px)';
                button.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
                button.style.boxShadow = '';
            });
        });
        
        // Efecto para tarjetas de servicios
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.transition = 'all 0.3s ease';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }
    
    initHoverEffects();
    
    // ============================================
    // 6. NAVEGACIÓN SUAVE PARA ANCLAS INTERNAS
    // ============================================
    
    /**
     * Implementa scroll suave para enlaces internos
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Solo procesar anclas internas (no enlaces a otras páginas)
                if (href.startsWith('#') && href.length > 1) {
                    e.preventDefault();
                    
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 100, // Ajustar para el header fijo
                            behavior: 'smooth'
                        });
                        
                        // Cerrar menú móvil si está abierto
                        const navbarCollapse = document.querySelector('.navbar-collapse.show');
                        if (navbarCollapse) {
                            const navbarToggler = document.querySelector('.navbar-toggler');
                            if (navbarToggler) {
                                navbarToggler.click();
                            }
                        }
                    }
                }
            });
        });
    }
    
    initSmoothScroll();
    
    // ============================================
    // 7. MEJORAS DE ACCESIBILIDAD
    // ============================================
    
    /**
     * Mejora la accesibilidad del sitio
     */
    function improveAccessibility() {
        // Añadir aria-labels a elementos que no tienen texto visible
        const iconButtons = document.querySelectorAll('.btn i:only-child, .social-link i:only-child');
        iconButtons.forEach(button => {
            const parent = button.parentElement;
            if (parent && !parent.getAttribute('aria-label')) {
                // Intentar obtener texto del título o clase del icono
                const iconClass = button.className;
                let label = 'Botón';
                
                if (iconClass.includes('arrow-up')) label = 'Volver arriba';
                else if (iconClass.includes('facebook')) label = 'Facebook';
                else if (iconClass.includes('twitter')) label = 'Twitter';
                else if (iconClass.includes('linkedin')) label = 'LinkedIn';
                else if (iconClass.includes('instagram')) label = 'Instagram';
                
                parent.setAttribute('aria-label', label);
            }
        });
        
        // Asegurar que los enlaces del menú tengan estados ARIA apropiados
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('focus', () => {
                link.setAttribute('aria-current', link.classList.contains('active') ? 'page' : null);
            });
        });
    }
    
    improveAccessibility();
    
    // ============================================
    // 8. INICIALIZACIÓN DE COMPONENTES BOOTSTRAP
    // ============================================
    
    /**
     * Inicializa componentes de Bootstrap que requieren JS
     */
    function initBootstrapComponents() {
        // Tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
        
        // Inicializar popovers si existen
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function(popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl);
        });
    }
    
    // Esperar a que Bootstrap esté completamente cargado
    if (typeof bootstrap !== 'undefined') {
        initBootstrapComponents();
    }
});

// ============================================
// FUNCIONES AUXILIARES GENERALES
// ============================================

/**
 * Formatea un número de teléfono (ejemplo básico)
 * @param {string} phone - Número de teléfono sin formato
 * @returns {string} - Número de teléfono formateado
 */
function formatPhoneNumber(phone) {
    // Eliminar todo excepto dígitos
    const cleaned = ('' + phone).replace(/\D/g, '');
    
    // Formato básico: (XXX) XXX-XXXX
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    
    return phone;
}

/**
 * Detecta si el dispositivo es móvil
 * @returns {boolean} - True si es un dispositivo móvil
 */
function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

/**
 * Agrega clase a body para dispositivos móviles (útil para CSS específico)
 */
function addMobileClass() {
    if (isMobileDevice()) {
        document.body.classList.add('mobile-device');
    }
}

// Ejecutar al cargar
addMobileClass();
