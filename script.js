/**
 * SCRIPT PRINCIPAL DO PETVERSO
 * 
 * Contém todas as interações e funcionalidades do site:
 * - Menu mobile responsivo
 * - Scroll suave
 * - Animações
 * - Validação de formulário
 * - Efeitos interativos
 */

document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // VARIÁVEIS GLOBAIS
    // =============================================
    const menuToggle = document.getElementById('mobile-menu'); // Botão hamburguer do menu mobile
    const navList = document.querySelector('.nav-list'); // Lista de links do menu
    const navLinks = document.querySelectorAll('.nav-list a'); // Todos os links dentro do menu
    const contactForm = document.querySelector('.contact-form form'); // Formulário de contato
    const currentYearElement = document.getElementById('current-year'); // Elemento onde o ano atual será mostrado
    
    // =============================================
    // FUNÇÕES PRINCIPAIS
    // =============================================

    /**
     * Alterna o menu mobile entre aberto/fechado
     * com animação do ícone hamburguer
     */
    function toggleMenu() {
        // Alterna classes ativas para mostrar ou esconder o menu
        menuToggle.classList.toggle('active');
        navList.classList.toggle('active');
        
        // Animação do ícone hamburguer: transforma as barras em um X
        const spans = menuToggle.querySelectorAll('span');
        if (menuToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    }

    /**
     * Fecha o menu mobile quando um link é clicado
     */
    function closeMenuOnLinkClick() {
        if (navList.classList.contains('active')) {
            toggleMenu(); // Fecha o menu chamando a função toggleMenu
        }
    }

    /**
     * Scroll suave para âncoras internas
     * @param {Event} e - Evento de clique
     */
    function smoothScroll(e) {
        e.preventDefault(); // Evita o comportamento padrão do link
        
        const targetId = this.getAttribute('href'); // Pega o destino do link (ex: "#section1")
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight; // Altura da navbar fixa
            const targetPosition = targetElement.offsetTop - navbarHeight; // Posição de destino ajustada para navbar
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth' // Scroll animado suave
            });
        }
    }

    /**
     * Anima elementos quando entram na viewport
     */
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .pet-card, .section-header');
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.8; // Quando o elemento estiver 80% dentro da tela
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < triggerPoint) {
                element.classList.add('animate'); // Adiciona classe que ativa animação CSS
            }
        });
    }

    /**
     * Valida e envia o formulário de contato
     * @param {Event} e - Evento de submit
     */
    function handleFormSubmit(e) {
        e.preventDefault(); // Evita envio padrão do formulário
        
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const formData = new FormData(form);
        
        // Validação básica: verifica campos obrigatórios
        let isValid = true;
        form.querySelectorAll('[required]').forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#ff6b6b'; // Borda vermelha para campo vazio
                isValid = false;
            } else {
                field.style.borderColor = ''; // Remove borda de erro se preenchido
            }
        });
        
        if (!isValid) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Simulação de envio do formulário
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simula delay de envio (ex: chamada AJAX)
        setTimeout(() => {
            submitBtn.textContent = '✓ Mensagem Enviada!';
            
            // Reseta o formulário e botão após 2 segundos
            setTimeout(() => {
                form.reset();
                submitBtn.textContent = 'Enviar Mensagem';
                submitBtn.disabled = false;
            }, 2000);
        }, 1500);
    }

    // =============================================
    // CONFIGURAÇÕES INICIAIS
    // =============================================
    
    // Inicializa animações invisíveis e deslocadas para os elementos ao carregar a página
    document.querySelectorAll('.service-card, .pet-card, .section-header').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
    });
    
    // Atualiza o ano atual no footer
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // =============================================
    // EVENT LISTENERS
    // =============================================
    
    // Abre/fecha menu mobile no clique do botão hamburguer
    menuToggle.addEventListener('click', toggleMenu);
    
    // Fecha o menu ao clicar em um link do menu
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenuOnLinkClick);
    });
    
    // Scroll suave para todos os links com href interno
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });
    
    // Adiciona animação quando rolar a página
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executa uma vez na inicialização para animar elementos já visíveis
    
    // Configura validação e envio do formulário de contato
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Remove borda de erro ao digitar no campo
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = '';
                }
            });
        });
    }
    
    // Efeito hover nos cards de pets (elevar e aumentar badge)
    document.querySelectorAll('.pet-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.querySelector('.btn-small.disabled')) {
                this.style.transform = 'translateY(-10px)';
                const badge = this.querySelector('.pet-badge');
                if (badge) badge.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            const badge = this.querySelector('.pet-badge');
            if (badge) badge.style.transform = '';
        });
    });
});

// =============================================
// ANIMAÇÕES CSS ADICIONAIS
// =============================================
const style = document.createElement('style');
style.textContent = `
    .service-card.animate,
    .pet-card.animate,
    .section-header.animate {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .pet-card .pet-badge {
        transition: transform 0.3s ease;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .btn-primary:hover {
        animation: pulse 1.5s infinite;
    }
`;
document.head.appendChild(style);
