// ==================== MOBILE MENU ====================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const body = document.body;
const whatsappFloat = document.querySelector('.whatsapp-float');
const gameFloat = document.querySelector('.game-float');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
        hamburger.classList.toggle('active');
        if (mobileMenu.classList.contains('active')) {
            if (whatsappFloat) whatsappFloat.style.display = 'none';
            if (gameFloat) gameFloat.style.display = 'none';
        } else {
            if (whatsappFloat) whatsappFloat.style.display = 'flex';
            if (gameFloat) gameFloat.style.display = 'inline-flex';
        }
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
            hamburger.classList.remove('active');
            if (whatsappFloat) whatsappFloat.style.display = 'flex';
            if (gameFloat) gameFloat.style.display = 'inline-flex';
        });
    });

    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target) && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
            hamburger.classList.remove('active');
            if (whatsappFloat) whatsappFloat.style.display = 'flex';
            if (gameFloat) gameFloat.style.display = 'inline-flex';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
            hamburger.classList.remove('active');
            if (whatsappFloat) whatsappFloat.style.display = 'flex';
            if (gameFloat) gameFloat.style.display = 'inline-flex';
        }
    });
}

const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

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
            
            // Lazy load slide background image
            const slideBg = slide.querySelector('.slide-bg');
            if (slideBg && i === index && slideBg.dataset.bg && (!slideBg.style.backgroundImage || slideBg.style.backgroundImage === 'none')) {
                slideBg.style.backgroundImage = `url('${slideBg.dataset.bg}')`;
            }
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
document.addEventListener('DOMContentLoaded', function() {
    console.log('Chatbot script loading...');
    const translations = {
        en: {
            welcome: "Hello! Welcome to Mamba Security. I'm here to connect you with the perfect security solution and a dedicated sales consultant for your area. What language would you prefer?",
            askName: "Great! To get started, may I have your full name please?",
            askPhone: "Thanks! What's the best phone number to reach you on?",
            askEmail: "Perfect! And your email address? (Optional - you can skip)",
            askLocation: "Which area or suburb are you located in? This helps me match you with your local sales consultant.",
            askService: "What security service are you looking for?",
            selectProperty: "What type of property do you need to secure?",
            askUrgency: "How urgent is your security need?",
            summaryTitle: "Perfect! Here's what we have:",
            matchedRep: "Match Found!",
            repIntro: "I've matched you with",
            repArea: "who covers",
            repContact: "Your dedicated sales consultant will contact you within 2 hours during business hours.",
            thankYou: "Thank you for choosing Mamba Security!",
            bookAssessment: "Talk to our sales coordinator",
            startOver: "Start Over",
            typing: "Typing...",
            online: "Online",
            skip: "Skip",
            quickReplies: {
                service: ["Off-site Monitoring", "Armed Response", "CCTV Installation", "Alarm Systems", "Guarding", "Other"],
                property: ["Home / Residential", "Business / Commercial", "Industrial", "School", "Estate"],
                urgency: ["Immediate - Today", "This Week", "Within 2 Weeks", "Just Planning"]
            }
        },
        zu: {
            welcome: "Sawubona! Siyakwamukela kuMamba Security. Ngingikusiza uxhumane nesixazululo sokuphepha esifanele nommeli wokuthengisa osegcemeni lakho. Uyiphi indlela ongathanda ukukhuluma ngayo?",
            askName: "Kuhle! Ukuze siqale, ngicela igama lakho eliphelele.",
            askPhone: "Ngiyabonga! Yini inombolo yocingo engcono ukukufinyelela ngayo?",
            askEmail: "Kuhle! Futhi ikheli le-imeyili yakho? (Ungakwazi ukulikhipha)",
            askLocation: "Usegcemeni liphi noma isigodi? Lokhu kungisiza ngokukufanisa nommeli wakho wasegcemeni.",
            askService: "Yiluphi usizo lokuphepha olufunayo?",
            selectProperty: "Yiphi inhlobo yempahla ofuna ukuyivikela?",
            askUrgency: "Kunesidingo esingakanani sokuphepha kwakho?",
            summaryTitle: "Kuhle! Lokhu okinikwe:",
            matchedRep: "Ukuhambisana Kutholakele!",
            repIntro: "Ngikufanise ngo",
            repArea: "ogcina",
            repContact: "Ummeli wakho wokuthengisa uzokuxhumana nawe kungaphelisane amahora angu-2 ngesikhathi sezimisele.",
            thankYou: "Ngiyabonga ngokukhetha uMamba Security!",
            bookAssessment: "Xhumana no-coordinator wokuthengisa",
            startOver: "Qala Futhi",
            typing: "Uyachitha...",
            online: "Ukusebenza",
            skip: "Likhula",
            quickReplies: {
                service: ["Ukubhekwa kude", "Armed Response", "Ukufakwa kwe-CCTV", "Alarm Systems", "Guarding", "Okunye"],
                property: ["Ikhaya / Impahla", "Ibhizinisi / Ohlakeni", "Imboni", "Isikole", "Istate"],
                urgency: ["Okusheshayo - Namhlanje", "Leli Viki", "Kungaphelisane Ama-Viki Amabili", "Ngihlela Kuphela"]
            }
        },
        af: {
            welcome: "Hallo! Welkom by Mamba Security. Ek is hier om jou te koppel met die perfekte sekuriteitsoplossing en 'n toegewyde verkoopsverteenwoordiger vir jou gebied. Watter taal verkies jy?",
            askName: "Geweldig! Om te begin, mag ek asseblief jou volle naam hê?",
            askPhone: "Dankie! Wat is the beste telefoonnommer om jou te bereik?",
            askEmail: "Perfek! En jou e-posadres? (Opsioneel - jy kan oorslaan)",
            askLocation: "In watter gebied of voorstad is jy geleë? Dit help me om jou met jou plaaslike verkoopsverteenwoordiger te koppel.",
            askService: "Watter sekuriteitsdiens soek jy?",
            selectProperty: "Watter tipe eiendom moet jy beveilig?",
            askUrgency: "Hoe dringend is jou sekuriteitsbehoefte?",
            summaryTitle: "Perfek! Hier is wat ons het:",
            matchedRep: "Pasmaak Gevind!",
            repIntro: "Ek het jou gekoppel mit",
            repArea: "wat dek",
            repContact: "Jou toegewyde verkoopsverteenwoordiger sal binne 2 ure gedurende besigheidsure mit jou kontak maak.",
            thankYou: "Dankie dat jy Mamba Security gekies het!",
            bookAssessment: "Praat met 'n sales koördinator",
            startOver: "Begin Oor",
            typing: "Tik...",
            online: "Aanlyn",
            skip: "Slaan Oor",
            quickReplies: {
                service: ["Afstandmonitering", "Gewapende Respons", "CCTV Installasie", "Alarmstelsels", "Bewaking", "Ander"],
                property: ["Huis / Residensieel", "Besigheid / Kommersieel", "Industrieel", "Skool", "Estate"],
                urgency: ["Onmiddellik - Vandag", "Hierdie Week", "Binne 2 Weke", "Net Beplanning"]
            }
        },
    };

    
    let currentLang = 'en';
    let chatStep = 0;
    let userAnswers = {};
    let chatbotShown = false;

    const chatbotOverlay = document.getElementById('chatbotOverlay');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotForm = document.getElementById('chatbotForm');
    const chatbotInput = document.getElementById('chatbotInput');
    const typingIndicator = document.getElementById('typingIndicator');
    const riskScorePanel = document.getElementById('riskScorePanel');
    const bookAssessmentBtn = document.getElementById('bookAssessmentBtn');
    const restartChatBtn = document.getElementById('restartChatBtn');
    const langBtns = document.querySelectorAll('.lang-btn');

    function showChatbot() {
        if (!chatbotOverlay || chatbotShown) return;
        chatbotOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        chatbotShown = true;
        sessionStorage.setItem('chatbotShown', 'true');
        // Notification element removed
    }

    function hideChatbot() {
        if (chatbotOverlay) {
            chatbotOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

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

    function showTyping() {
        typingIndicator.style.display = 'flex';
        // Status element removed
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function hideTyping() {
        typingIndicator.style.display = 'none';
        // Status element removed
    }

    function botResponse(text, quickReplies = null, delay = 1000) {
        showTyping();
        setTimeout(() => {
            hideTyping();
            addMessage(text, false, quickReplies);
        }, delay);
    }

    function handleQuickReply(reply) {
        addMessage(reply, true);
        processAnswer(reply);
    }

    function processAnswer(answer) {
        const t = translations[currentLang];
        switch(chatStep) {
            case 1:
                userAnswers.name = answer;
                chatStep = 2;
                setTimeout(() => botResponse(t.askPhone), 500);
                break;
            case 2:
                userAnswers.phone = answer;
                chatStep = 3;
                setTimeout(() => botResponse(t.askEmail, [t.skip]), 500);
                break;
            case 3:
                if (answer !== t.skip) userAnswers.email = answer;
                chatStep = 4;
                setTimeout(() => botResponse(t.askLocation), 500);
                break;
            case 4:
                userAnswers.location = answer;
                chatStep = 5;
                setTimeout(() => botResponse(t.askService, t.quickReplies.service), 500);
                break;
            case 5:
                userAnswers.serviceRequested = answer;
                chatStep = 6;
                setTimeout(() => botResponse(t.selectProperty, t.quickReplies.property), 500);
                break;
            case 6:
                userAnswers.propertyType = answer;
                chatStep = 7;
                setTimeout(() => botResponse(t.askUrgency, t.quickReplies.urgency), 500);
                break;
            case 7:
                userAnswers.urgency = answer;
                showSummary();
                break;
        }
    }

    function showSummary() {
        const t = translations[currentLang];
        
        setTimeout(() => {
            riskScorePanel.style.display = 'none';
            bookAssessmentBtn.style.display = 'flex';
            const summaryText = `${t.summaryTitle}\n\n` +
                ` Name: ${userAnswers.name}\n` +
                ` Location: ${userAnswers.location}\n` +
                ` Service: ${userAnswers.serviceRequested}\n` +
                ` Property: ${userAnswers.propertyType}.\n\n` +
                ` A sales coordinator will be in contact soon to assist.`;
            addMessage(summaryText);
            storeLeadData();
        }, 1000);
    }

    async function storeLeadData() {
        const englishTranslation = {
            service: {
                "Ukubhekwa kude": "Off-site Monitoring", "Afstandmonitering": "Off-site Monitoring",
                "Armed Response": "Armed Response", "Gewapende Respons": "Armed Response",
                "Ukufakwa kwe-CCTV": "CCTV Installation", "CCTV Installasie": "CCTV Installation",
                "Alarm Systems": "Alarm Systems", "Alarmstelsels": "Alarm Systems",
                "Guarding": "Guarding", "Bewaking": "Guarding", "Okunye": "Other", "Ander": "Other"
            },
            property: {
                "Ikhaya / Impahla": "Home / Residential", "Huis / Residensieel": "Home / Residential",
                "Ibhizinisi / Ohlakeni": "Business / Commercial", "Besigheid / Kommersieel": "Business / Commercial",
                "Imboni": "Industrial", "Industrieel": "Industrial",
                "Isikole": "School", "Istate": "Estate", "Skool": "School", "Estate": "Estate"
            },
            urgency: {
                "Okusheshayo - Namhlanje": "Immediate - Today", "Onmiddellik - Vandag": "Immediate - Today",
                "Leli Viki": "This Week", "Hierdie Week": "This Week",
                "Kungaphelisane Ama-Viki Amabili": "Within 2 Weeks", "Binne 2 Weke": "Within 2 Weeks",
                "Ngihlela Kuphela": "Just Planning", "Net Beplanning": "Just Planning"
            }
        };

        const translatedService = englishTranslation.service[userAnswers.serviceRequested] || userAnswers.serviceRequested;
        const translatedProperty = englishTranslation.property[userAnswers.propertyType] || userAnswers.propertyType;
        const translatedUrgency = englishTranslation.urgency[userAnswers.urgency] || userAnswers.urgency;

        try {
            const formData = new FormData();
            formData.append('name', userAnswers.name);
            formData.append('phone', userAnswers.phone);
            formData.append('email', userAnswers.email || 'Not provided');
            formData.append('location', userAnswers.location);
            formData.append('service_requested', translatedService);
            formData.append('property_type', translatedProperty);
            formData.append('urgency', translatedUrgency);
            formData.append('language_used', currentLang === 'en' ? 'English' : currentLang === 'zu' ? 'isiZulu' : 'Afrikaans');
            formData.append('timestamp', new Date().toISOString());

            // Debug: Log form data entries
            console.log('FormData entries:');
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            try {
            console.log('Sending to Formizee...');
            
            // Add timeout to prevent hanging
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
            
            const response = await fetch('https://api.formizee.com/v1/f/enp_4G9vqbcbx5YbWediE7zUTDCECAKJ', {
                    method: 'POST',
                    body: formData,
                    signal: controller.signal
                });
                
            clearTimeout(timeoutId);
                
                console.log('Formizee response status:', response.status);
                console.log('Formizee response ok:', response.ok);
                console.log('Formizee response type:', response.type);
                console.log('Formizee response url:', response.url);
                
                const responseText = await response.text();
                console.log('Formizee response body:', responseText);
                
                if (response.ok) {
                    console.log('✅ Lead successfully sent to Formizee dashboard');
                } else {
                    console.error('❌ Formizee submission failed:');
                    console.error('  Status:', response.status);
                    console.error('  Status Text:', response.statusText);
                    console.error('  Response:', responseText);
                }
            } catch (fetchError) {
                console.error('❌ Fetch error occurred:', fetchError);
                console.error('  Error name:', fetchError.name);
                console.error('  Error message:', fetchError.message);
                throw fetchError;
            }
        } catch (err) {
            console.error('Failed to send lead:', err);
        }
    }
    
    window.viewLeads = function() {
        const leads = JSON.parse(localStorage.getItem('mambaLeads') || '[]');
        console.table(leads);
        return leads;
    };

    function setLanguage(lang) {
        currentLang = lang;
        const t = translations[lang];
        langBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
        document.getElementById('bookBtnText').textContent = t.bookAssessment;
        document.getElementById('restartBtnText').textContent = t.startOver;
        chatbotInput.placeholder = lang === 'en' ? 'Type your message...' : lang === 'zu' ? 'Thayipha umyalezo wakho...' : 'Tik jou boodskap...';
    }

    function initChat() {
        chatbotMessages.innerHTML = '';
        chatStep = 0;
        userAnswers = {};
        riskScorePanel.style.display = 'none';
        bookAssessmentBtn.style.display = 'none';
        const t = translations[currentLang];
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'message bot-message';
        welcomeDiv.innerHTML = `<div class="message-avatar"><i class="fas fa-robot"></i></div><div class="message-content"><p>${t.welcome}</p><div class="quick-replies"><button class="quick-reply" data-lang="en">English</button><button class="quick-reply" data-lang="zu">isiZulu</button><button class="quick-reply" data-lang="af">Afrikaans</button></div></div>`;
        chatbotMessages.appendChild(welcomeDiv);
        welcomeDiv.querySelectorAll('.quick-reply').forEach(btn => {
            btn.onclick = () => {
                setLanguage(btn.dataset.lang);
                addMessage(btn.textContent, true);
                chatStep = 1;
                setTimeout(() => botResponse(translations[currentLang].askName), 500);
            };
        });
    }

    if (chatbotClose) {
        chatbotClose.onclick = function() {
            hideChatbot();
            return false;
        };
    }
    
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && chatbotOverlay && chatbotOverlay.classList.contains('active')) hideChatbot(); });
    if (chatbotOverlay) chatbotOverlay.addEventListener('click', (e) => { if (e.target === chatbotOverlay) hideChatbot(); });
    if (chatbotForm) chatbotForm.addEventListener('submit', (e) => { e.preventDefault(); const text = chatbotInput.value.trim(); if (text) { addMessage(text, true); chatbotInput.value = ''; processAnswer(text); } });
    if (restartChatBtn) restartChatBtn.addEventListener('click', initChat);
    if (bookAssessmentBtn) bookAssessmentBtn.addEventListener('click', () => {
        const companyPhone = "+27 83 300 2975".replace(/\s/g, '').replace('+', '');
        const msg = `Hi Mamba Security, I completed your AI assessment. I'm interested in ${userAnswers.serviceRequested} for my ${userAnswers.propertyType} in ${userAnswers.location}. Please contact me at ${userAnswers.phone}.`;
        window.open(`https://wa.me/${companyPhone}?text=${encodeURIComponent(msg)}`, '_blank');
    });

    // Show chatbot twice (first and second visit), hide on third+
    setTimeout(() => { 
        let chatbotCount = parseInt(sessionStorage.getItem('chatbotCount') || '0');
        if (chatbotCount < 2) {
            showChatbot(); 
            initChat(); 
            sessionStorage.setItem('chatbotCount', (chatbotCount + 1).toString());
        }
    }, 7500);
});

// Cookie consent - GitHub Pages compatible version with global functions
// Global functions for inline onclick handlers
window.cookieAcceptAll = function() {
    console.log('Accept All clicked via global function');
    localStorage.setItem('cookiesAccepted', 'all'); 
    localStorage.setItem('analyticsCookies', 'true'); 
    localStorage.setItem('marketingCookies', 'true'); 
    const overlay = document.getElementById('cookieConsentOverlay');
    if (overlay) overlay.classList.remove('active'); 
};

window.cookieCustomize = function() {
    console.log('Customize clicked via global function');
    const modal = document.getElementById('cookieSettingsModal');
    if (modal) modal.classList.add('active'); 
};

window.cookieDecline = function() {
    console.log('Decline clicked via global function');
    localStorage.setItem('cookiesAccepted', 'none'); 
    const overlay = document.getElementById('cookieConsentOverlay');
    if (overlay) overlay.classList.remove('active'); 
};

window.cookieCloseSettings = function() {
    console.log('Settings close clicked via global function');
    const modal = document.getElementById('cookieSettingsModal');
    if (modal) modal.classList.remove('active'); 
};

window.cookieSaveSettings = function() {
    console.log('Save Settings clicked via global function');
    const analytics = document.getElementById('analyticsCookies')?.checked ?? true;
    const marketing = document.getElementById('marketingCookies')?.checked ?? true;
    localStorage.setItem('cookiesAccepted', 'custom');
    localStorage.setItem('analyticsCookies', analytics);
    localStorage.setItem('marketingCookies', marketing);
    const settingsModal = document.getElementById('cookieSettingsModal');
    const overlay = document.getElementById('cookieConsentOverlay');
    if (settingsModal) settingsModal.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
};

window.cookieAcceptAllSettings = function() {
    console.log('Accept All Settings clicked via global function');
    localStorage.setItem('cookiesAccepted', 'all');
    localStorage.setItem('analyticsCookies', 'true');
    localStorage.setItem('marketingCookies', 'true');
    const settingsModal = document.getElementById('cookieSettingsModal');
    const overlay = document.getElementById('cookieConsentOverlay');
    if (settingsModal) settingsModal.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
};

// Initialize cookie consent popup
function initCookieConsent() {
    console.log('Initializing cookie consent popup...');
    
    // Show cookie consent popup
    setTimeout(() => { 
        if (!localStorage.getItem('cookiesAccepted')) {
            const overlay = document.getElementById('cookieConsentOverlay');
            if (overlay) {
                overlay.classList.add('active');
                console.log('Cookie consent popup shown');
            }
        }
    }, 2000);
}

// Initialize on DOM ready and also as a fallback
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieConsent);
} else {
    initCookieConsent();
}

// Additional fallback for GitHub Pages
window.addEventListener('load', function() {
    setTimeout(initCookieConsent, 500);
});

// ==================== SNAKE GAME ====================
console.log('Initializing snake game...');
console.log('User agent:', navigator.userAgent);
console.log('Touch support:', 'ontouchstart' in window);
console.log('Screen size:', window.innerWidth, 'x', window.innerHeight);

try {
    const canvas = document.getElementById('snakeCanvas');
    console.log('Canvas found:', !!canvas);
    console.log('Canvas element:', canvas);
    
    if (canvas) {
        console.log('Canvas dimensions:', canvas.width, 'x', canvas.height);
        console.log('Canvas style:', canvas.style.cssText);
        
        // Force canvas to be visible and interactive
        canvas.style.display = 'block';
        canvas.style.touchAction = 'none';
        canvas.style.userSelect = 'none';
        
        // Mobile canvas sizing fix
        function resizeCanvas() {
            const isMobile = window.innerWidth <= 768;
            const maxSize = isMobile ? Math.min(window.innerWidth - 40, 400) : 400;
            canvas.width = maxSize;
            canvas.height = maxSize;
            canvas.style.width = maxSize + 'px';
            canvas.style.height = maxSize + 'px';
            console.log('Canvas resized for mobile:', isMobile, maxSize);
        }
        
        // Initial resize and add resize listener
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const ctx = canvas.getContext('2d');
        console.log('Canvas context:', !!ctx);
        const scoreSpan = document.getElementById('score');
        const timerSpan = document.getElementById('timer');
        const levelSpan = document.getElementById('level');
        const overlayDiv = document.getElementById('canvasOverlay');
        const overlayContent = document.getElementById('overlayContent');
        const savedStartButtonDiv = document.getElementById('savedStartButton');
        const savedStartBtn = document.getElementById('savedStartGameBtn');

        console.log('Game elements found:', {
            ctx: !!ctx,
            scoreSpan: !!scoreSpan,
            timerSpan: !!timerSpan,
            levelSpan: !!levelSpan,
            overlayDiv: !!overlayDiv,
            overlayContent: !!overlayContent,
            savedStartButtonDiv: !!savedStartButtonDiv,
            savedStartBtn: !!savedStartBtn
        });

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
    robberImg.src = 'robber.png';
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
        ctx.fillStyle='#000';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.strokeStyle='#444'; ctx.lineWidth=1;
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

        // Restore body scroll when game ends
        document.body.style.overflow = '';
        document.body.classList.remove('menu-open');

        if(score>0 && savedName && savedPhone){
            updateScore(savedName,savedPhone,score).catch(err=>console.error(err));
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
        
        // Ensure overlay is properly hidden and game elements are visible
        if(overlayDiv) overlayDiv.classList.add('hidden');
        if(savedStartButtonDiv) savedStartButtonDiv.style.display='none';
        
        // Start game loops with a small delay to ensure proper initialization
        setTimeout(() => {
            if(gameActive) {
                gameLoopInterval=setInterval(updateGame,BASE_SPEED);
                timerInterval=setInterval(()=>{if(!gameActive) return; timeLeft--; updateStats(); if(timeLeft<=0){timeLeft=0; updateStats(); gameOver(false);}},1000);
            }
        }, 100);
    }

    function startWithNewDetails(){
        const name=document.getElementById('playerName').value.trim();
        const phone=document.getElementById('playerPhone').value.trim();
        if(!name){alert("Please enter your full name.");return;}
        if(!phone){alert("Please enter your phone number.");return;}
        const phoneRegex=/^[\d\s\+\-\(\)]{10,20}$/;
        if(!phoneRegex.test(phone)){alert("Please enter a valid phone number.");return;}
        localStorage.setItem('mambaPlayer',JSON.stringify({name,phone}));
        savedName=name; savedPhone=phone;
        
        // Send to Formizee only when player first signs up (not every game)
        sendToFormizee(name, phone, 0).catch(err => console.log('Formizee signup failed:', err));
        
        resetGame();
    }

    function startWithSavedDetails(){if(savedName && savedPhone) resetGame();}
    function changePlayer(){localStorage.removeItem('mambaPlayer'); savedName=''; savedPhone=''; if(gameLoopInterval) clearInterval(gameLoopInterval); if(timerInterval) clearInterval(timerInterval); gameActive=false; gameOverFlag=false; 
        // Restore body scroll when changing player
        document.body.style.overflow = '';
        document.body.classList.remove('menu-open');
        showInputForm();}

    if(savedName && savedPhone){showStartButton(); savedStartBtn.addEventListener('click',startWithSavedDetails);} else showInputForm();
    const changePlayerBtn=document.getElementById('changePlayerBtn');
    if(changePlayerBtn) changePlayerBtn.addEventListener('click',changePlayer);

    // Keyboard controls
    window.addEventListener('keydown',(e)=>{if(!gameActive) return; const key=e.key; if(key.startsWith('Arrow')||['w','W','a','A','s','S','d','D'].includes(key)) e.preventDefault(); switch(key){case 'ArrowUp': case 'w': case 'W': if(direction.y===0) nextDirection={x:0,y:-1}; break; case 'ArrowDown': case 's': case 'S': if(direction.y===0) nextDirection={x:0,y:1}; break; case 'ArrowLeft': case 'a': case 'A': if(direction.x===0) nextDirection={x:-1,y:0}; break; case 'ArrowRight': case 'd': case 'D': if(direction.x===0) nextDirection={x:1,y:0}; break;}});

    // Touch controls - simple working version from backup
    canvas.addEventListener('touchstart',e=>{const t=e.touches[0];touchStartX=t.clientX;touchStartY=t.clientY;});
    canvas.addEventListener('touchend',e=>{const t=e.changedTouches[0]; const dx=t.clientX-touchStartX; const dy=t.clientY-touchStartY; if(Math.abs(dx)<MIN_SWIPE_DISTANCE && Math.abs(dy)<MIN_SWIPE_DISTANCE) return; if(Math.abs(dx)>Math.abs(dy)){if(dx>0 && direction.x===0) nextDirection={x:1,y:0}; else if(dx<0 && direction.x===0) nextDirection={x:-1,y:0};}else{if(dy>0 && direction.y===0) nextDirection={x:0,y:1}; else if(dy<0 && direction.y===0) nextDirection={x:0,y:-1};}});
    }
} catch (error) {
    console.error('Snake game initialization error:', error);
}

// ==================== PLAY OUR GAME BUTTON (Simple scroll only) ====================
(function() {
    const playOurGameBtn = document.getElementById('playOurGameBtn');
    
    if(!playOurGameBtn) return;
    
    function handlePlayGame(e) {
        e.preventDefault();
        
        // Simple scroll to game section - let the game handle itself
        const gameSection = document.getElementById('snake-game');
        if(gameSection) {
            gameSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Support both click and touch for mobile
    playOurGameBtn.addEventListener('click', handlePlayGame);
    playOurGameBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        handlePlayGame(e);
    }, { passive: false });
})();

// ==================== LEADERBOARD SYSTEM (npoint.io + Formizee) ====================

// Configuration - npoint.io (FREE alternative to JSONBin)
// Bin URL: https://www.npoint.io/docs/b711e3e67b89f710c885
const NPOINT_BIN_ID = 'b711e3e67b89f710c885';
const NPOINT_GET_URL = `https://api.npoint.io/${NPOINT_BIN_ID}`;
const NPOINT_PUT_URL = `https://api.npoint.io/${NPOINT_BIN_ID}`;
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

// Fetch leaderboard from npoint.io (FREE)
async function fetchLeaderboard() {
    try {
        console.log('Fetching from npoint.io:', NPOINT_GET_URL);
        
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const response = await fetch(NPOINT_GET_URL, { 
            signal: controller.signal,
            headers: { 'Accept': 'application/json' }
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        console.log('Raw response from npoint.io:', JSON.stringify(data, null, 2));

        let leaderboard = [];
        if (Array.isArray(data)) {
            // Check if it's an array containing a leaderboard object
            if (data.length > 0 && data[0].leaderboard && Array.isArray(data[0].leaderboard)) {
                leaderboard = data[0].leaderboard;
                console.log('Data is array with leaderboard object, using nested leaderboard');
            } else {
                leaderboard = data;
                console.log('Data is a direct array, using directly');
            }
        } else if (data.leaderboard && Array.isArray(data.leaderboard)) {
            leaderboard = data.leaderboard;
            console.log('Data has leaderboard property, using that');
        } else if (data.record && Array.isArray(data.record)) {
            leaderboard = data.record;
            console.log('Data has record property, using that');
        } else {
            console.log('Data structure unknown:', typeof data, data);
        }
        
        console.log('Extracted leaderboard:', leaderboard);
        console.log('Leaderboard length:', leaderboard.length);
        
        // Deduplicate: keep only highest score per player
        const playerMap = new Map();
        leaderboard.forEach(entry => {
            const id = entry.playerId || getPlayerId(entry.name, entry.phone);
            const entryScore = Number(entry.score);
            const currentBest = playerMap.has(id) ? Number(playerMap.get(id).score) : 0;
            if (!playerMap.has(id) || currentBest < entryScore) {
                playerMap.set(id, { ...entry, playerId: id, score: entryScore });
            }
        });
        
        return Array.from(playerMap.values());
    } catch (error) {
        console.error('fetchLeaderboard error:', error);
        return [];
    }
}

// Save leaderboard to npoint.io (FREE) with localStorage backup
async function saveLeaderboard(leaderboard) {
    try {
        // Always save to localStorage as backup
        localStorage.setItem('mambaLeaderboard', JSON.stringify(leaderboard));
        console.log('Leaderboard saved to localStorage backup');
        
        // npoint.io expects data in format: [{"leaderboard": [...]}]
        const formattedData = [{ leaderboard: leaderboard }];
        console.log('Saving formatted data to npoint.io:', formattedData);
        
        const response = await fetch(NPOINT_PUT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formattedData)
        });
        if (!response.ok) throw new Error(`POST failed: ${response.status}`);
        console.log('Leaderboard saved to npoint.io');
        return true;
    } catch (error) {
        console.error('saveLeaderboard error:', error);
        // Still return true since localStorage backup worked
        return true;
    }
}

// Backup to Formizee (only called once when player signs up)
async function sendToFormizee(name, phone, score) {
    console.log('=== FORMIZEE DEBUG START ===');
    console.log('sendToFormizee called for:', { name, phone, score });
    
    try {
        // Send to Formizee
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
        
        if (response.ok) {
            console.log('Backup sent to Formizee for:', name);
        } else {
            console.warn('Formizee backup failed:', response.status);
        }
    } catch (error) {
        console.error('sendToFormizee error:', error);
    }
    
    console.log('=== FORMIZEE DEBUG END ===');
}

// Update or insert player score (localStorage only) with debugging
async function updateScore(name, phone, score) {
    console.log('=== UPDATE SCORE DEBUG START ===');
    console.log('updateScore called:', { name, phone, score });
    
    if (!name || !phone || score === undefined) {
        console.log('Invalid params, returning false');
        return false;
    }
    if (name === null) {
        console.log('Name is null, returning false');
        return false;
    }
    
    // First, try to fetch current leaderboard from npoint.io to prevent data loss
    let leaderboard = [];
    try {
        const npointData = await fetchLeaderboard();
        if (npointData && Array.isArray(npointData) && npointData.length > 0) {
            leaderboard = npointData;
            console.log('Using npoint.io data as base:', leaderboard);
        }
    } catch (e) {
        console.log('Error fetching from npoint.io:', e);
    }
    
    // Then merge with localStorage data (localStorage takes precedence for recent changes)
    try {
        const localData = localStorage.getItem('mambaLeaderboard');
        console.log('Raw localStorage data:', localData);
        if (localData) {
            const localLeaderboard = JSON.parse(localData);
            console.log('Parsed localStorage leaderboard:', localLeaderboard);
            
            // Merge: use npoint data as base, add/overwrite with localStorage entries
            const merged = [...leaderboard];
            localLeaderboard.forEach(localEntry => {
                const existingIndex = merged.findIndex(e => e.playerId === localEntry.playerId);
                if (existingIndex !== -1) {
                    merged[existingIndex] = localEntry; // Use localStorage version (more recent)
                } else {
                    merged.push(localEntry); // Add new entry from localStorage
                }
            });
            leaderboard = merged;
            console.log('Merged leaderboard:', leaderboard);
        }
    } catch (e) {
        console.log('Error reading localStorage:', e);
    }
    
    // If still empty, start fresh
    if (!leaderboard || leaderboard.length === 0) {
        console.log('No data from npoint.io or localStorage, creating new array');
        leaderboard = [];
    }
    
    console.log('Current leaderboard length:', leaderboard.length);
    const playerId = getPlayerId(name, phone);
    console.log('Player ID:', playerId);
    const existingIndex = leaderboard.findIndex(p => p.playerId === playerId);
    let updated = false;
    let isNewPlayer = false;

    // Convert scores to numbers for proper comparison
    const newScore = Number(score);
    console.log('New score to add:', newScore);

    // Check if this is a real player (not hardcoded)
    const isHardcodedPlayer = playerId.includes('hardcoded') || playerId.includes('sample');
    console.log('Is hardcoded player:', isHardcodedPlayer);
    
    if (existingIndex !== -1) {
        const existingScore = Number(leaderboard[existingIndex].score);
        console.log(`Existing score: ${existingScore}, New score: ${newScore}`);
        if (existingScore < newScore) {
            leaderboard[existingIndex].score = newScore;
            leaderboard[existingIndex].timestamp = new Date().toISOString();
            updated = true;
            console.log(`Updated score for ${name} to ${newScore}`);
        } else {
            console.log(`New score ${newScore} not higher than existing ${existingScore}`);
            return false;
        }
    } else {
        const newEntry = { playerId, name, phone, score: newScore, timestamp: new Date().toISOString() };
        console.log('Adding new entry:', newEntry);
        leaderboard.push(newEntry);
        updated = true;
        isNewPlayer = true;
        console.log(`New player ${name} added with score ${newScore}`);
    }

    // Only update if this is a real player (not hardcoded)
    if (!isHardcodedPlayer) {
        if (!updated) {
            console.log('No update made, returning false');
            return false;
        }
        
        leaderboard.sort((a,b)=>b.score-a.score);
        if (leaderboard.length>10) leaderboard = leaderboard.slice(0,10);
        
        console.log('Final leaderboard before save:', leaderboard);
        
        // Save to localStorage with verification
        try {
            localStorage.setItem('mambaLeaderboard', JSON.stringify(leaderboard));
            console.log('Saved to localStorage successfully');
            
            // Verify it was saved
            const verifyData = localStorage.getItem('mambaLeaderboard');
            console.log('Verification - data in localStorage:', verifyData);
        } catch (e) {
            console.error('Failed to save to localStorage:', e);
            return false;
        }
        
        // Update immediately
        renderLeaderboard(leaderboard);
        
        // Save to npoint.io (async - don't wait)
        saveLeaderboard(leaderboard).then(() => {
            console.log('Saved to npoint.io successfully');
        }).catch(err => {
            console.log('npoint.io save failed (localStorage backup active):', err);
        });
        
        console.log('=== UPDATE SCORE DEBUG END ===');
        return true;
    } else {
        console.log('Skipping update for hardcoded player:', name);
        return false;
    }
}

// Render leaderboard with provided data
function renderLeaderboard(leaderboard, containerId='leaderboardList') {
    console.log('=== RENDER DEBUG START ===');
    console.log('Rendering leaderboard:', leaderboard);
    console.log('Container ID:', containerId);
    
    const container = document.getElementById(containerId);
    console.log('Container found:', !!container);
    console.log('Container element:', container);
    
    if (!container) {
        console.error('Leaderboard container not found:', containerId);
        return;
    }
    
    try {
        if (!leaderboard || !leaderboard.length) {
            console.log('No leaderboard data to render');
            container.innerHTML = '<div class="leaderboard-empty">No scores yet. Be the first!</div>';
            console.log('Set empty message');
            return;
        }
        
        console.log('Leaderboard length:', leaderboard.length);
        const sorted = [...leaderboard].sort((a,b)=>Number(b.score)-Number(a.score));
        const top10 = sorted.slice(0,10);
        console.log('Rendering top 10:', top10);
        let html = '';
        
        top10.forEach((entry,idx)=>{
            console.log(`Processing entry ${idx}:`, entry);
            const safeName = entry.name ? escapeHtml(entry.name) : 'Unknown';
            html += `
                <div class="leaderboard-item">
                    <span class="rank">${idx+1}</span>
                    <span class="name">${safeName}</span>
                    <span class="score">${entry.score}</span>
                </div>
            `;
        });
        
        console.log('Final HTML to set:', html);
        container.innerHTML = html;
        console.log('Leaderboard rendered successfully');
        console.log('Container innerHTML after render:', container.innerHTML);
    } catch (error) {
        console.error('renderLeaderboard error:', error);
        container.innerHTML = '<div class="leaderboard-error">Unable to load leaderboard. Try again later.</div>';
    }
    console.log('=== RENDER DEBUG END ===');
}

// Fetch and render leaderboard (npoint.io API + localStorage fallback)
async function fetchAndRenderLeaderboard(containerId='leaderboardList') {
    console.log('=== LEADERBOARD DEBUG START ===');
    
    // Try npoint.io first
    let leaderboard = await fetchLeaderboard();
    console.log('Step 1 - Fetched from npoint.io:', leaderboard);
    
    // Fallback to localStorage if npoint.io fails or returns empty
    if (!leaderboard || leaderboard.length === 0) {
        console.log('Step 2 - npoint.io empty, checking localStorage');
        try {
            const localData = localStorage.getItem('mambaLeaderboard');
            if (localData) {
                leaderboard = JSON.parse(localData);
                console.log('Step 3 - Loaded from localStorage:', leaderboard);
            }
        } catch (e) {
            console.log('localStorage error:', e);
        }
    }
    
    // If still no data, use empty leaderboard
    if (!leaderboard || leaderboard.length === 0) {
        console.log('Step 4 - No data found, using empty leaderboard');
        leaderboard = [];
    }
    
    console.log('Step 5 - Final leaderboard to render:', leaderboard);
    console.log('Step 6 - Container ID:', containerId);
    
    renderLeaderboard(leaderboard, containerId);
    console.log('=== LEADERBOARD DEBUG END ===');
}
// Only fetch leaderboard once when page loads
fetchAndRenderLeaderboard();

// Manual test function - call from console to test leaderboard (localStorage only)
window.testLeaderboard = async function() {
    console.log('=== MANUAL LEADERBOARD TEST ===');
    const testEntry = {
        playerId: 'manual_test',
        name: 'Manual Test',
        phone: '5551234567',
        score: 2500,
        timestamp: new Date().toISOString()
    };
    
    // Save directly to localStorage
    try {
        let leaderboard = JSON.parse(localStorage.getItem('mambaLeaderboard') || '[]');
        leaderboard.push(testEntry);
        localStorage.setItem('mambaLeaderboard', JSON.stringify(leaderboard));
        console.log('Test saved to localStorage');
        
        // Render directly
        renderLeaderboard(leaderboard);
        console.log('=== MANUAL TEST END ===');
    } catch (e) {
        console.error('Manual test failed:', e);
    }
};

console.log('Leaderboard test function available. Use testLeaderboard() in console');

// Test the leaderboard fetch directly
window.testFetch = async function() {
    console.log('=== TESTING FETCH ===');
    try {
        const data = await fetchLeaderboard();
        console.log('Fetch test result:', data);
        console.log('Data length:', data ? data.length : 'null');
        console.log('First entry:', data && data.length > 0 ? data[0] : 'none');
    } catch (error) {
        console.error('Fetch test failed:', error);
    }
};

// Test score update logic for higher scores
window.testScoreUpdate = async function() {
    console.log('=== TESTING SCORE UPDATE LOGIC ===');
    
    const testPlayer = {
        name: 'Test Player',
        phone: '5551234567'
    };
    
    try {
        // First, add an initial score
        console.log('1. Adding initial score of 100...');
        const result1 = await updateScore(testPlayer.name, testPlayer.phone, 100);
        console.log('Initial score result:', result1);
        
        // Wait a moment
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Try adding a lower score (should not update)
        console.log('2. Trying lower score of 50 (should not update)...');
        const result2 = await updateScore(testPlayer.name, testPlayer.phone, 50);
        console.log('Lower score result:', result2);
        
        // Wait a moment
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Try adding a higher score (should update)
        console.log('3. Trying higher score of 200 (should update)...');
        const result3 = await updateScore(testPlayer.name, testPlayer.phone, 200);
        console.log('Higher score result:', result3);
        
        // Check final leaderboard
        console.log('4. Checking final leaderboard...');
        await fetchAndRenderLeaderboard();
        
        console.log('=== SCORE UPDATE TEST COMPLETE ===');
    } catch (error) {
        console.error('Score update test failed:', error);
    }
};

// Migration function to pull existing data from original npoint.io
window.migrateLeaderboard = async function() {
    console.log('=== MIGRATING LEADERBOARD DATA ===');
        // Original npoint.io bin ID
        const ORIGINAL_BIN_ID = 'b711e3e67b89f710c885';
        const ORIGINAL_GET_URL = `https://api.npoint.io/${ORIGINAL_BIN_ID}`;
        
        try {
            console.log('Fetching from npoint.io:', ORIGINAL_BIN_ID);
            const response = await fetch(ORIGINAL_GET_URL);
        
        if (!response.ok) {
            console.log('Failed to fetch from original bin:', response.status);
            return false;
        }
        
        const data = await response.json();
        console.log('Original bin data:', data);
        
        let existingLeaderboard = [];
        if (data.record) {
            if (Array.isArray(data.record)) existingLeaderboard = data.record;
            else if (Array.isArray(data.record.leaderboard)) existingLeaderboard = data.record.leaderboard;
        } else if (Array.isArray(data.leaderboard)) {
            existingLeaderboard = data.leaderboard;
        } else if (Array.isArray(data)) {
            existingLeaderboard = data;
        }
        
        console.log('Extracted existing leaderboard:', existingLeaderboard);
        
        if (existingLeaderboard.length > 0) {
            // Deduplicate and ensure valid playerId
            const validEntries = existingLeaderboard.filter(entry => entry.name && entry.phone);
            console.log('Valid entries:', validEntries.length);
            
            // Ensure all entries have playerId
            validEntries.forEach(entry => {
                if (!entry.playerId) {
                    entry.playerId = getPlayerId(entry.name, entry.phone);
                }
            });
            
            // Merge with any existing localStorage data
            let mergedData = [];
            try {
                const localData = localStorage.getItem('mambaLeaderboard');
                if (localData) {
                    const localLeaderboard = JSON.parse(localData);
                    if (Array.isArray(localLeaderboard)) {
                        mergedData = [...localLeaderboard];
                    }
                }
            } catch (e) {
                console.log('No existing localStorage data to merge');
            }
            
            // Add valid entries from JSONBin
            validEntries.forEach(entry => {
                const existingIndex = mergedData.findIndex(p => p.playerId === entry.playerId);
                if (existingIndex !== -1) {
                    // Update if new score is higher
                    if (Number(entry.score) > Number(mergedData[existingIndex].score)) {
                        mergedData[existingIndex].score = entry.score;
                        mergedData[existingIndex].timestamp = entry.timestamp || new Date().toISOString();
                    }
                } else {
                    mergedData.push(entry);
                }
            });
            
            // Sort and limit
            mergedData.sort((a, b) => Number(b.score) - Number(a.score));
            if (mergedData.length > 10) mergedData = mergedData.slice(0, 10);
            
            // Save to localStorage
            localStorage.setItem('mambaLeaderboard', JSON.stringify(mergedData));
            console.log('Migrated', validEntries.length, 'entries to localStorage');
            console.log('Total leaderboard entries:', mergedData.length);
            
            // Re-render
            renderLeaderboard(mergedData);
            console.log('Leaderboard updated with migrated data');
            return true;
        } else {
            console.log('No existing data found in original bin');
            return false;
        }
        
    } catch (error) {
        console.error('Migration failed:', error);
        return false;
    }
};

console.log('Migration function available. Use migrateLeaderboard() in console to import existing data');

// Manual import function for JSONBin data (use when API is blocked)
window.importLeaderboardData = function(jsonData) {
    console.log('=== MANUAL IMPORT START ===');
    try {
        let data;
        if (typeof jsonData === 'string') {
            data = JSON.parse(jsonData);
        } else {
            data = jsonData;
        }
        
        let leaderboard = [];
        if (Array.isArray(data)) {
            leaderboard = data;
        } else if (data.record && Array.isArray(data.record)) {
            leaderboard = data.record;
        } else if (data.record && data.record.leaderboard) {
            leaderboard = data.record.leaderboard;
        } else if (data.leaderboard) {
            leaderboard = data.leaderboard;
        }
        
        console.log('Imported', leaderboard.length, 'entries');
        
        if (leaderboard.length > 0) {
            // Ensure all entries have playerId
            leaderboard.forEach(entry => {
                if (!entry.playerId && entry.name && entry.phone) {
                    entry.playerId = getPlayerId(entry.name, entry.phone);
                }
            });
            
            // Merge with existing local data
            let existingData = [];
            try {
                const localData = localStorage.getItem('mambaLeaderboard');
                if (localData) {
                    existingData = JSON.parse(localData);
                }
            } catch (e) {
                console.log('No existing data');
            }
            
            // Add imported entries
            leaderboard.forEach(entry => {
                if (entry.playerId) {
                    const existingIndex = existingData.findIndex(p => p.playerId === entry.playerId);
                    if (existingIndex === -1) {
                        existingData.push(entry);
                    } else if (Number(entry.score) > Number(existingData[existingIndex].score)) {
                        existingData[existingIndex].score = entry.score;
                    }
                }
            });
            
            // Sort and save
            existingData.sort((a, b) => Number(b.score) - Number(a.score));
            if (existingData.length > 10) existingData = existingData.slice(0, 10);
            
            localStorage.setItem('mambaLeaderboard', JSON.stringify(existingData));
            renderLeaderboard(existingData);
            console.log('=== MANUAL IMPORT COMPLETE ===');
            return true;
        }
    } catch (e) {
        console.error('Import failed:', e);
        return false;
    }
};

// Complete leaderboard system fix
window.fixLeaderboard = async function() {
    console.log('=== COMPLETE LEADERBOARD FIX ===');
    
    // Clear any existing problematic data
    localStorage.removeItem('mambaLeaderboard');
    console.log('Cleared existing localStorage');
    
    // Fetch from npoint.io
    const leaderboard = await fetchLeaderboard();
    console.log('Fetched from npoint.io:', leaderboard);
    
    if (leaderboard && leaderboard.length > 0) {
        localStorage.setItem('mambaLeaderboard', JSON.stringify(leaderboard));
        renderLeaderboard(leaderboard);
        console.log('Leaderboard loaded from npoint.io');
    } else {
        console.log('No data in npoint.io, leaderboard will be empty');
        renderLeaderboard([]);
    }
    
    // Removed forced page reload to prevent infinite refresh loop
    
    return true;
};

// Auto-fix on page load - simplified to prevent conflicts
window.addEventListener('load', async () => {
    console.log('Page loaded, initializing leaderboard...');
    // Only initialize if we have the leaderboard container
    const container = document.getElementById('leaderboardList');
    if (container) {
        fetchAndRenderLeaderboard();
    }
});

// ==================== SCROLL ANIMATIONS ====================
const floatElements = document.querySelectorAll('.float-up');
if (floatElements.length && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); } });
    }, { threshold: 0.14 });
    floatElements.forEach(el => revealObserver.observe(el));
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
