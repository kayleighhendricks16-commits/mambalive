// ==================== MOBILE MENU ====================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const body = document.body;
const whatsappFloat = document.querySelector('.whatsapp-float');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
        hamburger.classList.toggle('active');
        if (mobileMenu.classList.contains('active')) {
            if (whatsappFloat) whatsappFloat.style.display = 'none';
        } else {
            if (whatsappFloat) whatsappFloat.style.display = 'flex';
        }
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
            hamburger.classList.remove('active');
            if (whatsappFloat) whatsappFloat.style.display = 'flex';
        });
    });

    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target) && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
            hamburger.classList.remove('active');
            if (whatsappFloat) whatsappFloat.style.display = 'flex';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
            hamburger.classList.remove('active');
            if (whatsappFloat) whatsappFloat.style.display = 'flex';
        }
    });
}

document.getElementById('currentYear').textContent = new Date().getFullYear();

// Trigger premium page-load animations
window.addEventListener('load', () => {
    document.body.classList.add('page-ready');
});

// ==================== HERO SLIDER ====================
const heroSlides = document.querySelectorAll('.slide');
const heroPrevBtn = document.querySelector('.hero-prev');
const heroNextBtn = document.querySelector('.hero-next');
const heroDots = document.querySelectorAll('.hero-dot');

if (heroSlides.length) {
    let heroCurrentSlide = 0, heroInterval = null;
    const HERO_DELAY = 5000;
    function showHeroSlide(index) {
        heroSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            slide.style.opacity = i === index ? '1' : '0';
            slide.style.zIndex = i === index ? '2' : '0';
        });
        heroDots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        heroCurrentSlide = index;
    }
    function nextHeroSlide() { showHeroSlide((heroCurrentSlide + 1) % heroSlides.length); }
    function prevHeroSlide() { showHeroSlide((heroCurrentSlide - 1 + heroSlides.length) % heroSlides.length); }
    function startHeroSlider() { if (heroInterval) clearInterval(heroInterval); heroInterval = setInterval(nextHeroSlide, HERO_DELAY); }
    function stopHeroSlider() { if (heroInterval) { clearInterval(heroInterval); heroInterval = null; } }
    if (heroNextBtn) heroNextBtn.addEventListener('click', (e) => { e.preventDefault(); stopHeroSlider(); nextHeroSlide(); startHeroSlider(); });
    if (heroPrevBtn) heroPrevBtn.addEventListener('click', (e) => { e.preventDefault(); stopHeroSlider(); prevHeroSlide(); startHeroSlider(); });
    heroDots.forEach((dot, i) => dot.addEventListener('click', () => { stopHeroSlider(); showHeroSlide(i); startHeroSlider(); }));
    showHeroSlide(0);
    startHeroSlider();
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) { heroSlider.addEventListener('mouseenter', stopHeroSlider); heroSlider.addEventListener('mouseleave', startHeroSlider); }
}

// ==================== TESTIMONIALS SLIDER ====================
const testimonialsTrack = document.querySelector('.testimonials-track');
const testimonialItems = document.querySelectorAll('.testimonial-item');
const testimonialPrevBtn = document.querySelector('.slider-prev');
const testimonialNextBtn = document.querySelector('.slider-next');

if (testimonialsTrack && testimonialItems.length) {
    let testimonialCurrentIndex = 0;
    const total = testimonialItems.length;
    function updateTestimonialSlider() {
        const perView = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
        const maxIndex = Math.max(0, total - perView);
        testimonialCurrentIndex = Math.min(testimonialCurrentIndex, maxIndex);
        testimonialsTrack.style.transform = `translateX(-${testimonialCurrentIndex * (100 / perView)}%)`;
    }
    if (testimonialNextBtn) testimonialNextBtn.addEventListener('click', () => {
        const perView = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
        const maxIndex = Math.max(0, total - perView);
        if (testimonialCurrentIndex < maxIndex) { testimonialCurrentIndex++; updateTestimonialSlider(); }
    });
    if (testimonialPrevBtn) testimonialPrevBtn.addEventListener('click', () => {
        if (testimonialCurrentIndex > 0) { testimonialCurrentIndex--; updateTestimonialSlider(); }
    });
    window.addEventListener('resize', updateTestimonialSlider);
    updateTestimonialSlider();
}

// ==================== FAQ TOGGLE ====================
document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
        const parent = q.parentElement;
        const isActive = parent.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
        if (!isActive) parent.classList.add('active');
    });
});

// ==================== AI SECURITY ASSISTANT CHATBOT ====================
(function() {
    // Multilingual content
    const translations = {
        en: {
            welcome: "Hello! I'm your Mamba Security AI Assistant. I can help you find the right security solution for your home or business. What language would you prefer?",
            selectProperty: "Great! Let's assess your security needs. What type of property do you need to secure?",
            homeQuestions: [
                "How many entry points does your home have? (doors/gates)",
                "Do you have existing security systems?",
                "What's your biggest security concern?"
            ],
            businessQuestions: [
                "What type of business do you run?",
                "How many employees do you have?",
                "Do you handle cash or high-value items?"
            ],
            riskHigh: "High Risk",
            riskMedium: "Medium Risk",
            riskLow: "Low Risk",
            riskDescHigh: "Based on your answers, we recommend our comprehensive armed response + CCTV + alarm package.",
            riskDescMedium: "We recommend armed response with optional monitoring for your peace of mind.",
            riskDescLow: "Basic monitoring and periodic patrols may suit your needs.",
            bookAssessment: "Book Free Assessment",
            startOver: "Start Over",
            typing: "Typing...",
            online: "Online",
            quickReplies: {
                property: ["Home / Residential", "Business / Commercial", "Industrial", "School/Estate"],
                entries: ["1-2", "3-4", "5+"],
                existing: ["None", "Basic alarms", "CCTV only", "Full system"],
                concern: ["Break-ins", "Theft", "Vandalism", "Personal safety"],
                businessType: ["Retail shop", "Office", "Warehouse", "Restaurant/Bar"],
                employees: ["1-5", "6-20", "21-50", "50+"],
                cash: ["Yes, daily", "Occasionally", "No, card only"]
            }
        },
        zu: {
            welcome: "Sawubona! Ngimi uMamba Security AI Assistant. Angikusiza ukuthola isixazululo esifanele sakuvikela kwakho noma ibhizinisi lakho. Uyiphi indlela ongathanda ukukhuluma ngayo?",
            selectProperty: "Kuhle! Ake sihlolisise izidingo zakho zokuphepha. Yiphi inhlobo yempahla ofuna ukuyivikela?",
            homeQuestions: [
                "Iminyango emingaki endlini yakho? (emnyango/amasango)",
                "Unohlelo lokuphepha olukhona?",
                "Yini okwesaba kakhulu ngokuphepha?"
            ],
            businessQuestions: [
                "Yiliphi ibhizinisi osebenza ngalo?",
                "Unabaqashwa abangaki?",
                "Ukubala imali noma izinto ezixabiso?"
            ],
            riskHigh: "Ingozi Ephakeme",
            riskMedium: "Ingozi Ophakathi",
            riskLow: "Ingozi Ephansi",
            riskDescHigh: "Kulesisimo, sikusize ngenqubo yokuphendula ngebhamu + i-CCTV + uhlelo lomsindo.",
            riskDescMedium: "Sikusize ngenqubo yokuphendula ngebhamu kanye nokuqapha.",
            riskDescLow: "Ukuqapha okuyisisekelo kungase kukwanele.",
            bookAssessment: "Bhuka Ukuhlolisisa",
            startOver: "Qala Futhi",
            typing: "Uyachitha...",
            online: "Ukusebenza",
            quickReplies: {
                property: ["Ikhaya / Impahla", "Ibhizinisi / Ohlakeni", "Imboni", "Isikole/Istate"],
                entries: ["1-2", "3-4", "5+"],
                existing: ["Akukho", "Umsindo osivamile", "I-CCTV kuphela", "Uhlelo luphelele"],
                concern: ["Ukungena ngokungemthetho", "Isela", "Ukona", "Ukuphepha komuntu"],
                businessType: ["Isitolo", "Ihhovisi", "Isitolodi", "Isidlo/Isitolo seziphuzo"],
                employees: ["1-5", "6-20", "21-50", "50+"],
                cash: ["Yebo, nsuku zonke", "Ngesinye isikhathi", "Cha, ikhadi kuphela"]
            }
        },
        af: {
            welcome: "Hallo! Ek is jou Mamba Security AI Assistant. Ek kan jou help om die regte sekuriteitsoplossing vir jou huis of besigheid te vind. Watter taal verkies jy?",
            selectProperty: "Geweldig! Kom ons evalueer jou sekuriteitsbehoeftes. Watter tipe eiendom moet jy beveilig?",
            homeQuestions: [
                "Hoeveel ingangspunte het jou huis? (deure/hekke)",
                "Het jy bestaande sekuriteitstelsels?",
                "Wat is jou grootste sekuriteitskommer?"
            ],
            businessQuestions: [
                "Watter tipe besigheid bedryf jy?",
                "Hoeveel werknemers het jy?",
                "Hanteer jy kontant of hoë-waarde items?"
            ],
            riskHigh: "Hoë Risiko",
            riskMedium: "Medium Risiko",
            riskLow: "Lae Risiko",
            riskDescHigh: "Gebaseer op jou antwoorde, beveel ons ons omvattende gewapende reaksie + CCTV + alarmpakket aan.",
            riskDescMedium: "Ons beveel gewapende reaksie met opsionele monitering aan.",
            riskDescLow: "Basiese monitering en periodieke patrollies mag aan jou behoeftes voldoen.",
            bookAssessment: "Bespreek Gratis Assessering",
            startOver: "Begin Oor",
            typing: "Tik...",
            online: "Aanlyn",
            quickReplies: {
                property: ["Huis / Residensieel", "Besigheid / Kommersieel", "Industrieel", "Skool/Estate"],
                entries: ["1-2", "3-4", "5+"],
                existing: ["Geen", "Basiese alarms", "CCTV alleenlik", "Volledige stelsel"],
                concern: ["Inbraak", "Diefstal", "Vandalisme", "Persoonlike veiligheid"],
                businessType: ["Kleinhandel winkel", "Kantoor", "Pakhuis", "Restaurant/Kroeg"],
                employees: ["1-5", "6-20", "21-50", "50+"],
                cash: ["Ja, daagliks", "Af en toe", "Nee, net kaart"]
            }
        }
    };

    // Chatbot state
    let currentLang = 'en';
    let chatStep = 0;
    let riskScore = 0;
    let userAnswers = {};
    let chatbotShown = false;

    // DOM elements
    const chatbotOverlay = document.getElementById('chatbotOverlay');
    const chatbotModal = document.getElementById('chatbotModal');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotLaunch = document.getElementById('chatbotLaunch');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotForm = document.getElementById('chatbotForm');
    const chatbotInput = document.getElementById('chatbotInput');
    const typingIndicator = document.getElementById('typingIndicator');
    const riskScorePanel = document.getElementById('riskScorePanel');
    const riskBar = document.getElementById('riskBar');
    const riskBadge = document.getElementById('riskBadge');
    const riskDescription = document.getElementById('riskDescription');
    const bookAssessmentBtn = document.getElementById('bookAssessmentBtn');
    const restartChatBtn = document.getElementById('restartChatBtn');
    const langBtns = document.querySelectorAll('.lang-btn');
    const chatbotNotification = document.getElementById('chatbotNotification');
    const chatbotStatus = document.getElementById('chatbotStatus');

    // Show/hide chatbot
    function showChatbot() {
        if (!chatbotOverlay || chatbotShown) return;
        chatbotOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        chatbotShown = true;
        sessionStorage.setItem('chatbotShown', 'true');
        chatbotNotification.style.display = 'none';
    }

    function hideChatbot() {
        if (chatbotOverlay) {
            chatbotOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Add message to chat
    function addMessage(text, isUser = false, quickReplies = null) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = `<i class="fas ${isUser ? 'fa-user' : 'fa-robot'}"></i>`;
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const p = document.createElement('p');
        p.textContent = text;
        content.appendChild(p);
        
        if (quickReplies) {
            const qrContainer = document.createElement('div');
            qrContainer.className = 'quick-replies';
            quickReplies.forEach(reply => {
                const btn = document.createElement('button');
                btn.className = 'quick-reply';
                btn.textContent = reply;
                btn.onclick = () => handleQuickReply(reply);
                qrContainer.appendChild(btn);
            });
            content.appendChild(qrContainer);
        }
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Show typing indicator
    function showTyping() {
        typingIndicator.style.display = 'flex';
        chatbotStatus.textContent = translations[currentLang].typing;
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function hideTyping() {
        typingIndicator.style.display = 'none';
        chatbotStatus.textContent = translations[currentLang].online;
    }

    // Bot response with delay
    function botResponse(text, quickReplies = null, delay = 1000) {
        showTyping();
        setTimeout(() => {
            hideTyping();
            addMessage(text, false, quickReplies);
        }, delay);
    }

    // Handle quick reply click
    function handleQuickReply(reply) {
        addMessage(reply, true);
        processAnswer(reply);
    }

    // Process user answer and determine next step
    function processAnswer(answer) {
        const t = translations[currentLang];
        
        switch(chatStep) {
            case 0: // Language selection handled separately
                break;
            case 1: // Property type
                userAnswers.propertyType = answer;
                if (answer.includes('Home') || answer.includes('Ikhaya') || answer.includes('Huis')) {
                    chatStep = 2;
                    setTimeout(() => botResponse(t.homeQuestions[0], t.quickReplies.entries), 500);
                } else {
                    chatStep = 5;
                    setTimeout(() => botResponse(t.businessQuestions[0], t.quickReplies.businessType), 500);
                }
                break;
            case 2: // Home entries
                userAnswers.entries = answer;
                riskScore += answer.includes('5') ? 15 : answer.includes('3-4') ? 10 : 5;
                chatStep = 3;
                setTimeout(() => botResponse(t.homeQuestions[1], t.quickReplies.existing), 500);
                break;
            case 3: // Existing security
                userAnswers.existing = answer;
                riskScore += answer.includes('None') || answer.includes('Akukho') || answer.includes('Geen') ? 20 : 
                             answer.includes('Basic') || answer.includes('osivamile') || answer.includes('Basiese') ? 10 : 0;
                chatStep = 4;
                setTimeout(() => botResponse(t.homeQuestions[2], t.quickReplies.concern), 500);
                break;
            case 4: // Security concern
                userAnswers.concern = answer;
                riskScore += answer.includes('Break') || answer.includes('Theft') || answer.includes('Inbraak') || answer.includes('Isela') ? 15 : 10;
                calculateRisk();
                break;
            case 5: // Business type
                userAnswers.businessType = answer;
                riskScore += answer.includes('Retail') || answer.includes('sitolo') || answer.includes('Kleinhandel') ? 15 :
                             answer.includes('Restaurant') || answer.includes('Isidlo') ? 20 : 10;
                chatStep = 6;
                setTimeout(() => botResponse(t.businessQuestions[1], t.quickReplies.employees), 500);
                break;
            case 6: // Employees
                userAnswers.employees = answer;
                riskScore += answer.includes('50') ? 15 : answer.includes('21-50') ? 10 : 5;
                chatStep = 7;
                setTimeout(() => botResponse(t.businessQuestions[2], t.quickReplies.cash), 500);
                break;
            case 7: // Cash handling
                userAnswers.cash = answer;
                riskScore += answer.includes('daily') || answer.includes('nsuku') || answer.includes('daagliks') ? 20 :
                             answer.includes('Occasionally') || answer.includes('sinye') || answer.includes('Af en toe') ? 10 : 5;
                calculateRisk();
                break;
        }
    }

    // Calculate and display risk score
    function calculateRisk() {
        const t = translations[currentLang];
        const maxScore = userAnswers.propertyType?.includes('Home') || userAnswers.propertyType?.includes('Ikhaya') || userAnswers.propertyType?.includes('Huis') ? 60 : 65;
        const percentage = Math.min(100, Math.round((riskScore / maxScore) * 100));
        
        let riskLevel, riskClass, recommendation;
        if (percentage >= 60) {
            riskLevel = t.riskHigh;
            riskClass = 'high';
            recommendation = t.riskDescHigh;
        } else if (percentage >= 35) {
            riskLevel = t.riskMedium;
            riskClass = 'medium';
            recommendation = t.riskDescMedium;
        } else {
            riskLevel = t.riskLow;
            riskClass = 'low';
            recommendation = t.riskDescLow;
        }
        
        setTimeout(() => {
            riskScorePanel.style.display = 'block';
            riskBadge.textContent = riskLevel;
            riskBadge.className = `risk-badge ${riskClass}`;
            riskBar.style.width = `${percentage}%`;
            riskBar.className = `risk-bar ${riskClass}`;
            riskDescription.textContent = recommendation;
            bookAssessmentBtn.style.display = 'flex';
            
            const summaryText = currentLang === 'en' ? 
                `Based on your responses, your security risk score is ${percentage}%. ${recommendation}` :
                currentLang === 'zu' ?
                `Kulesisimo, inqubomgomo yakho yokuphepha yi-${percentage}%. ${recommendation}` :
                `Gebaseer op jou antwoorde, is jou sekuriteitsrisiko-telling ${percentage}%. ${recommendation}`;
            addMessage(summaryText);
        }, 1000);
    }

    // Set language
    function setLanguage(lang) {
        currentLang = lang;
        const t = translations[lang];
        
        // Update UI
        langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        // Update button texts
        document.getElementById('bookBtnText').textContent = t.bookAssessment;
        document.getElementById('restartBtnText').textContent = t.startOver;
        chatbotInput.placeholder = lang === 'en' ? 'Type your message...' : 
                                     lang === 'zu' ? 'Thayipha umyalezo wakho...' : 
                                     'Tik jou boodskap...';
    }

    // Initialize chat
    function initChat() {
        chatbotMessages.innerHTML = '';
        chatStep = 0;
        riskScore = 0;
        userAnswers = {};
        riskScorePanel.style.display = 'none';
        bookAssessmentBtn.style.display = 'none';
        
        const t = translations[currentLang];
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'message bot-message';
        welcomeDiv.innerHTML = `
            <div class="message-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content">
                <p>${t.welcome}</p>
                <div class="quick-replies" id="welcomeReplies">
                    <button class="quick-reply" data-lang="en">English</button>
                    <button class="quick-reply" data-lang="zu">isiZulu</button>
                    <button class="quick-reply" data-lang="af">Afrikaans</button>
                </div>
            </div>
        `;
        chatbotMessages.appendChild(welcomeDiv);
        
        // Attach language selection handlers
const cookieSaveSettings = document.getElementById('cookieSaveSettings');
const cookieAcceptAllSettings = document.querySelector('.cookie-accept-all-settings');
const cookieConsentOverlay = document.getElementById('cookieConsentOverlay');
const cookieSettingsModal = document.getElementById('cookieSettingsModal');
setTimeout(() => { if (!localStorage.getItem('cookiesAccepted') && cookieConsentOverlay) cookieConsentOverlay.classList.add('active'); }, 2000);

if (cookieAcceptAll) cookieAcceptAll.addEventListener('click', () => { localStorage.setItem('cookiesAccepted', 'all'); localStorage.setItem('analyticsCookies', 'true'); localStorage.setItem('marketingCookies', 'true'); if (cookieConsentOverlay) cookieConsentOverlay.classList.remove('active'); });
if (cookieCustomize) cookieCustomize.addEventListener('click', () => { if (cookieSettingsModal) cookieSettingsModal.classList.add('active'); });
if (cookieDecline) cookieDecline.addEventListener('click', () => { localStorage.setItem('cookiesAccepted', 'none'); if (cookieConsentOverlay) cookieConsentOverlay.classList.remove('active'); });
if (cookieSettingsClose) cookieSettingsClose.addEventListener('click', () => { if (cookieSettingsModal) cookieSettingsModal.classList.remove('active'); });
if (cookieSaveSettings) cookieSaveSettings.addEventListener('click', () => {
    const analytics = document.getElementById('analyticsCookies')?.checked ?? true;
    const marketing = document.getElementById('marketingCookies')?.checked ?? true;
    localStorage.setItem('cookiesAccepted', 'custom');
    localStorage.setItem('analyticsCookies', analytics);
    localStorage.setItem('marketingCookies', marketing);
    if (cookieSettingsModal) cookieSettingsModal.classList.remove('active');
    if (cookieConsentOverlay) cookieConsentOverlay.classList.remove('active');
});
if (cookieAcceptAllSettings) cookieAcceptAllSettings.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'all');
    localStorage.setItem('analyticsCookies', 'true');
    localStorage.setItem('marketingCookies', 'true');
    if (cookieSettingsModal) cookieSettingsModal.classList.remove('active');
    if (cookieConsentOverlay) cookieConsentOverlay.classList.remove('active');
});

// ==================== SCROLL ANIMATIONS ====================
const floatElements = document.querySelectorAll('.float-up');
if (floatElements.length) {
    // Add stagger delays per section for a more polished reveal sequence
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const items = section.querySelectorAll('.float-up');
        items.forEach((item, index) => {
            item.style.setProperty('--reveal-delay', `${Math.min(index * 90, 540)}ms`);
        });
    });

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });

        floatElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        const checkFloatUp = () => {
            floatElements.forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                    el.classList.add('visible');
                }
            });
        };
        window.addEventListener('scroll', checkFloatUp);
        window.addEventListener('load', checkFloatUp);
    }
}

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#home') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
            window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - headerHeight, behavior: 'smooth' });
        }
    });
});

// ==================== IMAGE LAZY LOADING ====================
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.src = entry.target.dataset.src || entry.target.src; observer.unobserve(entry.target); } });
    });
    lazyImages.forEach(img => observer.observe(img));
}

// ==================== SERVICE CARDS HOVER ====================
if (window.innerWidth > 768) {
    document.querySelectorAll('.detailed-service-card').forEach(card => {
        card.addEventListener('mouseenter', () => { card.style.transform = 'translateY(-10px)'; card.style.boxShadow = '0 20px 40px rgba(161, 203, 56, 0.2)'; });
        card.addEventListener('mouseleave', () => { card.style.transform = 'translateY(-5px)'; card.style.boxShadow = '0 10px 25px rgba(161, 203, 56, 0.2)'; });
    });
}

// ==================== LEADERBOARD SYSTEM (JSONBin + Formizee) ====================

// Configuration
const JSONBIN_BIN_ID = '69c2e944c3097a1dd5577e7c';
const JSONBIN_MASTER_KEY = '$2a$10$CnF8SgRpw0auXpU.ClZEXeu5paSFjD95FZ1m0MhOOE5hRUJuxxX4e';
const JSONBIN_GET_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`;
const JSONBIN_PUT_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;
const FORMIZEE_ENDPOINT = 'https://api.formizee.com/v1/f/enp_3NtcVMMF45eL2BnQVQkV1FYs7Dbz';

// Helper: escape HTML to prevent XSS
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Generate a unique player ID from name and phone
function getPlayerId(name, phone) {
    return `${name.trim().toLowerCase()}_${phone.trim()}`;
}

// Fetch leaderboard from JSONBin
async function fetchLeaderboard() {
    try {
        const response = await fetch(JSONBIN_GET_URL, {
            headers: { 'X-Master-Key': JSONBIN_MASTER_KEY }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        let leaderboard = [];
        if (data.record) {
            if (Array.isArray(data.record)) leaderboard = data.record;
            else if (Array.isArray(data.record.leaderboard)) leaderboard = data.record.leaderboard;
        } else if (Array.isArray(data.leaderboard)) {
            leaderboard = data.leaderboard;
        } else if (Array.isArray(data)) {
            leaderboard = data;
        }
        return leaderboard;
    } catch (error) {
        console.error('fetchLeaderboard error:', error);
        return [];
    }
}

// Save leaderboard to JSONBin
async function saveLeaderboard(leaderboard) {
    try {
        const response = await fetch(JSONBIN_PUT_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_MASTER_KEY
            },
            body: JSON.stringify({ leaderboard })
        });
        if (!response.ok) throw new Error(`PUT failed: ${response.status}`);
        console.log('Leaderboard saved to JSONBin');
        return true;
    } catch (error) {
        console.error('saveLeaderboard error:', error);
        return false;
    }
}

// Backup to Formizee (only for new players)
async function sendToFormizee(name, phone, score) {
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('score', score);
        formData.append('timestamp', new Date().toISOString());

        const response = await fetch(FORMIZEE_ENDPOINT, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });
        if (response.ok) console.log('Backup sent to Formizee');
        else console.warn('Formizee backup failed:', response.status);
    } catch (error) {
        console.error('sendToFormizee error:', error);
    }
}

// Update or insert player score
async function updateScore(name, phone, score) {
    if (!name || !phone || score === undefined) return false;
    let leaderboard = await fetchLeaderboard();
    const playerId = getPlayerId(name, phone);
    const existingIndex = leaderboard.findIndex(p => p.playerId === playerId);
    let updated = false;
    let isNewPlayer = false;

    if (existingIndex !== -1) {
        if (leaderboard[existingIndex].score < score) {
            leaderboard[existingIndex].score = score;
            leaderboard[existingIndex].timestamp = new Date().toISOString();
            updated = true;
        } else return false;
    } else {
        leaderboard.push({ playerId, name, phone, score, timestamp: new Date().toISOString() });
        updated = true;
        isNewPlayer = true;
    }

    if (!updated) return false;
    leaderboard.sort((a,b)=>b.score-a.score);
    if (leaderboard.length>10) leaderboard = leaderboard.slice(0,10);
    const saved = await saveLeaderboard(leaderboard);
    if (!saved) return false;
    if (isNewPlayer) await sendToFormizee(name, phone, score);
    return true;
}

// Render leaderboard
async function fetchAndRenderLeaderboard(containerId='leaderboardList') {
    const container = document.getElementById(containerId);
    if (!container) return;
    try {
        const leaderboard = await fetchLeaderboard();
        if (!leaderboard.length) {
            container.innerHTML = '<div class="leaderboard-empty">No scores yet. Be the first!</div>';
            return;
        }
        leaderboard.sort((a,b)=>b.score-a.score);
        const top10 = leaderboard.slice(0,10);
        let html = '';
        top10.forEach((entry,idx)=>{
            html += `
                <div class="leaderboard-item">
                    <span class="rank">${idx+1}</span>
                    <span class="name">${escapeHtml(entry.name)}</span>
                    <span class="score">${entry.score}</span>
                </div>
            `;
        });
        container.innerHTML = html;
    } catch (error) {
        container.innerHTML = '<div class="leaderboard-error">Unable to load leaderboard. Try again later.</div>';
    }
}
fetchAndRenderLeaderboard();
setInterval(fetchAndRenderLeaderboard,5000);

// ==================== SNAKE GAME ====================
const canvas = document.getElementById('snakeCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    const scoreSpan = document.getElementById('score');
    const timerSpan = document.getElementById('timer');
    const levelSpan = document.getElementById('level');
    const overlayDiv = document.getElementById('canvasOverlay');
    const overlayContent = document.getElementById('overlayContent');
    const savedStartButtonDiv = document.getElementById('savedStartButton');
    const savedStartBtn = document.getElementById('savedStartGameBtn');

    const GRID_SIZE = 20;
    const CELL_SIZE = canvas.width/GRID_SIZE;
    const TARGET_SCORE = 10000;
    const BASE_SPEED = 200;
    const SPEED_DECREMENT = 15;
    const TIME_PER_CATCH = 5;
    const START_TIME = 60;

    let snake=[{x:10,y:10},{x:9,y:10},{x:8,y:10}];
    let direction={x:1,y:0};
    let nextDirection={x:1,y:0};
    let food={x:15,y:10};
    let score=0,level=1,timeLeft=START_TIME;
    let gameActive=false,gameLoopInterval=null,timerInterval=null,gameOverFlag=false;

    let touchStartX=0,touchStartY=0;
    const MIN_SWIPE_DISTANCE=30;

    // Robber image (absolute path)
    const robberImg = new Image();
    robberImg.src = '/robber.png';
    let robberLoaded=false;
    robberImg.onload=()=>{robberLoaded=true;};

    // Player details
    let savedName='',savedPhone='';
    const savedPlayer = localStorage.getItem('mambaPlayer');
    if(savedPlayer){
        try{
            const parsed=JSON.parse(savedPlayer);
            savedName=parsed.name||'';
            savedPhone=parsed.phone||'';
        }catch(e){}
    }

    // ================= UI Helpers =================
    function showInputForm(){
        overlayContent.innerHTML=`
            <h3><i class="fas fa-trophy"></i> Enter Your Details</h3>
            <div class="overlay-input-group">
                <label for="playerName"><i class="fas fa-user"></i> Full Name:</label>
                <input type="text" id="playerName" placeholder="Enter your full name" maxlength="50" required>
            </div>
            <div class="overlay-input-group">
                <label for="playerPhone"><i class="fas fa-phone-alt"></i> Phone Number:</label>
                <input type="tel" id="playerPhone" placeholder="e.g. 083 123 4567" maxlength="20" required>
            </div>
            <p class="contact-note">* We'll contact the winner using this number. Must be valid to qualify.</p>
            <button id="startGameBtn" class="btn btn-primary canvas-btn">Start The Chase</button>
        `;
        const startBtn = document.getElementById('startGameBtn');
        if(startBtn) startBtn.addEventListener('click',startWithNewDetails);
        overlayDiv.classList.remove('hidden');
        savedStartButtonDiv.style.display='none';
    }

    function showPlayAgainButton(){
        overlayContent.innerHTML=`
            <h3><i class="fas fa-gamepad"></i> Game Over!</h3>
            <p>Your score: ${score}</p>
            <button id="playAgainBtn" class="btn btn-primary canvas-btn">Play Again</button>
        `;
        const playAgainBtn=document.getElementById('playAgainBtn');
        if(playAgainBtn) playAgainBtn.addEventListener('click',()=>resetGame());
        overlayDiv.classList.remove('hidden');
        savedStartButtonDiv.style.display='none';
    }

    function showStartButton(){
        overlayDiv.classList.add('hidden');
        savedStartButtonDiv.style.display='block';
    }

    function generateFood(){
        for(let i=0;i<1000;i++){
            const x=Math.floor(Math.random()*GRID_SIZE);
            const y=Math.floor(Math.random()*GRID_SIZE);
            if(!snake.some(seg=>seg.x===x&&seg.y===y)) return {x,y};
        }
        return null;
    }

    function updateStats(){
        if(scoreSpan) scoreSpan.textContent=score;
        if(levelSpan) levelSpan.textContent=level;
        if(timerSpan) timerSpan.textContent=timeLeft+'s';
    }

    function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.strokeStyle='#222'; ctx.lineWidth=0.5;
        for(let i=0;i<=GRID_SIZE;i++){
            ctx.beginPath();
            ctx.moveTo(i*CELL_SIZE,0); ctx.lineTo(i*CELL_SIZE,canvas.height); ctx.stroke();
            ctx.moveTo(0,i*CELL_SIZE); ctx.lineTo(canvas.width,i*CELL_SIZE); ctx.stroke();
        }

        snake.forEach((seg,i)=>{
            if(i===0){
                ctx.fillStyle='#ccff66'; ctx.shadowColor='#99ff00'; ctx.shadowBlur=15;
                ctx.fillRect(seg.x*CELL_SIZE,seg.y*CELL_SIZE,CELL_SIZE-1,CELL_SIZE-1);
                ctx.shadowBlur=0;
                ctx.fillStyle='white';
                const headX=seg.x*CELL_SIZE,headY=seg.y*CELL_SIZE;
                let eye1X,eye1Y,eye2X,eye2Y;
                if(direction.x===1){eye1X=headX+CELL_SIZE-8;eye1Y=headY+6;eye2X=headX+CELL_SIZE-8;eye2Y=headY+CELL_SIZE-12;}
                else if(direction.x===-1){eye1X=headX+5;eye1Y=headY+6;eye2X=headX+5;eye2Y=headY+CELL_SIZE-12;}
                else if(direction.y===-1){eye1X=headX+6;eye1Y=headY+5;eye2X=headX+CELL_SIZE-12;eye2Y=headY+5;}
                else{eye1X=headX+6;eye1Y=headY+CELL_SIZE-8;eye2X=headX+CELL_SIZE-12;eye2Y=headY+CELL_SIZE-8;}
                ctx.beginPath(); ctx.arc(eye1X,eye1Y,3,0,2*Math.PI); ctx.fill();
                ctx.beginPath(); ctx.arc(eye2X,eye2Y,3,0,2*Math.PI); ctx.fill();
                ctx.fillStyle='black';
                ctx.beginPath(); ctx.arc(eye1X+1,eye1Y-1,1.5,0,2*Math.PI); ctx.fill();
                ctx.beginPath(); ctx.arc(eye2X+1,eye2Y-1,1.5,0,2*Math.PI); ctx.fill();
            }else{
                ctx.fillStyle='#99ff00'; ctx.shadowColor='#99ff00'; ctx.shadowBlur=10;
                ctx.fillRect(seg.x*CELL_SIZE,seg.y*CELL_SIZE,CELL_SIZE-1,CELL_SIZE-1);
                if(i===snake.length-1){ctx.fillStyle='#66cc00';ctx.fillRect(seg.x*CELL_SIZE+2,seg.y*CELL_SIZE+2,CELL_SIZE-5,CELL_SIZE-5);}
            }
        });
        ctx.shadowBlur=0;

        if(food){
            const cellCenterX=food.x*CELL_SIZE+CELL_SIZE/2;
            const cellCenterY=food.y*CELL_SIZE+CELL_SIZE/2;
            const size=CELL_SIZE*1.5;
            const drawX=cellCenterX-size/2;
            const drawY=cellCenterY-size/2;
            if(robberLoaded) ctx.drawImage(robberImg,drawX,drawY,size,size);
            else { ctx.fillStyle='#ff3b30'; ctx.shadowColor='#ff3b30'; ctx.shadowBlur=15; ctx.fillRect(drawX,drawY,size,size); ctx.shadowBlur=0; }
        }
    }

    function gameOver(win=false){
        if(gameOverFlag) return;
        gameOverFlag=true; gameActive=false;
        clearInterval(gameLoopInterval); clearInterval(timerInterval);

        if(score>0 && savedName && savedPhone){
            updateScore(savedName,savedPhone,score).then(()=>{fetchAndRenderLeaderboard();}).catch(err=>console.error(err));
        }

        if(savedName && savedPhone) showPlayAgainButton();
        else showInputForm();
    }

    function updateGame(){
        if(!gameActive) return;
        const newDir={...nextDirection};
        const isOpposite=(direction.x===-newDir.x && direction.y===-newDir.y);
        if(!isOpposite) direction=newDir;
        const head=snake[0];
        const newHead={x:head.x+direction.x,y:head.y+direction.y};

        if(newHead.x<0||newHead.x>=GRID_SIZE||newHead.y<0||newHead.y>=GRID_SIZE){gameOver(false);return;}
        if(snake.some(seg=>seg.x===newHead.x&&seg.y===newHead.y)){gameOver(false);return;}

        snake.unshift(newHead);
        if(newHead.x===food.x&&newHead.y===food.y){
            score++; timeLeft+=TIME_PER_CATCH; updateStats();
            if(score%5===0){level++; updateStats(); if(gameLoopInterval){clearInterval(gameLoopInterval); const speed=Math.max(50,BASE_SPEED-(level-1)*SPEED_DECREMENT); gameLoopInterval=setInterval(updateGame,speed);}}
            if(score>=TARGET_SCORE){gameOver(true);return;}
            const newFood=generateFood();
            if(newFood) food=newFood; else gameOver(true);
        }else snake.pop();
        draw();
    }

    function resetGame(){
        if(gameLoopInterval) clearInterval(gameLoopInterval);
        if(timerInterval) clearInterval(timerInterval);
        gameOverFlag=false;
        snake=[{x:10,y:10},{x:9,y:10},{x:8,y:10}];
        direction={x:1,y:0}; nextDirection={x:1,y:0};
        score=0; level=1; timeLeft=START_TIME;
        food=generateFood()||{x:15,y:10};
        gameActive=true;
        updateStats(); draw();
        overlayDiv.classList.add('hidden'); savedStartButtonDiv.style.display='none';
        gameLoopInterval=setInterval(updateGame,BASE_SPEED);
        timerInterval=setInterval(()=>{if(!gameActive) return; timeLeft--; updateStats(); if(timeLeft<=0){timeLeft=0; updateStats(); gameOver(false);}},1000);
    }

    function startWithNewDetails(){
        const name=document.getElementById('playerName').value.trim();
        const phone=document.getElementById('playerPhone').value.trim();
        if(!name){alert("Please enter your full name.");return;}
        if(!phone){alert("Please enter your phone number.");return;}
        const phoneRegex=/^[\d\s\+\-\(\)]{10,20}$/;
        if(!phoneRegex.test(phone)){alert("Please enter a valid phone number.");return;}
        localStorage.setItem('mambaPlayer',JSON.stringify({name,phone}));
        savedName=name; savedPhone=phone; resetGame();
    }

    function startWithSavedDetails(){if(savedName && savedPhone) resetGame();}
    function changePlayer(){localStorage.removeItem('mambaPlayer'); savedName=''; savedPhone=''; if(gameLoopInterval) clearInterval(gameLoopInterval); if(timerInterval) clearInterval(timerInterval); gameActive=false; gameOverFlag=false; showInputForm();}

    if(savedName && savedPhone){showStartButton(); savedStartBtn.addEventListener('click',startWithSavedDetails);} else showInputForm();
    const changePlayerBtn=document.getElementById('changePlayerBtn');
    if(changePlayerBtn) changePlayerBtn.addEventListener('click',changePlayer);

    // Keyboard controls
    window.addEventListener('keydown',(e)=>{if(!gameActive) return; const key=e.key; if(key.startsWith('Arrow')||['w','W','a','A','s','S','d','D'].includes(key)) e.preventDefault(); switch(key){case 'ArrowUp': case 'w': case 'W': if(direction.y===0) nextDirection={x:0,y:-1}; break; case 'ArrowDown': case 's': case 'S': if(direction.y===0) nextDirection={x:0,y:1}; break; case 'ArrowLeft': case 'a': case 'A': if(direction.x===0) nextDirection={x:-1,y:0}; break; case 'ArrowRight': case 'd': case 'D': if(direction.x===0) nextDirection={x:1,y:0}; break;}});

    // Touch controls
    canvas.addEventListener('touchstart',e=>{const t=e.touches[0];touchStartX=t.clientX;touchStartY=t.clientY;});
    canvas.addEventListener('touchend',e=>{const t=e.changedTouches[0]; const dx=t.clientX-touchStartX; const dy=t.clientY-touchStartY; if(Math.abs(dx)<MIN_SWIPE_DISTANCE && Math.abs(dy)<MIN_SWIPE_DISTANCE) return; if(Math.abs(dx)>Math.abs(dy)){if(dx>0 && direction.x===0) nextDirection={x:1,y:0}; else if(dx<0 && direction.x===0) nextDirection={x:-1,y:0};}else{if(dy>0 && direction.y===0) nextDirection={x:0,y:1}; else if(dy<0 && direction.y===0) nextDirection={x:0,y:-1};}});
}