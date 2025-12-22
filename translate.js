/**
 * Translation System for Think Blue Go Green Drink Clean
 * Smooth language switching with one function per feature
 */

// Current language state
let currentLanguage = 'en';

// Language configuration with flags
const languageConfig = {
    en: { code: 'EN', flag: 'images/Flag_of_Europe.svg.png', name: 'English' },
    tr: { code: 'TR', flag: 'images/turkey flag.png', name: 'Türkçe' },
    is: { code: 'IS', flag: 'images/Iceland flag.png', name: 'Íslenska' },
    es: { code: 'ES', flag: 'images/spain flag.png', name: 'Español' },
    hu: { code: 'HU', flag: 'images/Hungary flag.png', name: 'Magyar' },
    ca: { code: 'CA', flag: 'images/spain flag.png', name: 'Català' }
};

/**
 * Initialize translation system
 */
function initTranslation() {
    loadSavedLanguage();
    updateLanguageSelector();
    translatePage();
}

/**
 * Load saved language from localStorage
 */
function loadSavedLanguage() {
    const saved = localStorage.getItem('websiteLanguage');
    if (saved && translations[saved]) {
        currentLanguage = saved;
        document.documentElement.lang = currentLanguage;
    }
}

/**
 * Update language selector display
 */
function updateLanguageSelector() {
    // Desktop selector
    const flagImg = document.getElementById('currentLangFlag');
    const langCode = document.getElementById('currentLangCode');
    
    // Mobile selector
    const flagImgMobile = document.getElementById('currentLangFlagMobile');
    const langCodeMobile = document.getElementById('currentLangCodeMobile');
    
    if (flagImg && langCode) {
        const config = languageConfig[currentLanguage];
        flagImg.src = config.flag;
        flagImg.alt = config.name;
        langCode.textContent = config.code;
    }
    
    if (flagImgMobile && langCodeMobile) {
        const config = languageConfig[currentLanguage];
        flagImgMobile.src = config.flag;
        flagImgMobile.alt = config.name;
        langCodeMobile.textContent = config.code;
    }
    
    // Update active state in language menu
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        const lang = option.getAttribute('data-lang');
        if (lang === currentLanguage) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

/**
 * Translate all elements with data-translate attribute
 */
function translatePage() {
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getTranslation(key);
        
        if (translation) {
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translation;
            } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
}

/**
 * Get translation for a key
 */
function getTranslation(key) {
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
        return translations[currentLanguage][key];
    }
    return translations['en'][key] || key;
}

/**
 * Change language
 */
function changeLanguage(lang) {
    if (!translations[lang]) return;
    
    currentLanguage = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('websiteLanguage', lang);
    
    updateLanguageSelector();
    translatePage();
    closeLanguageMenu();
}

/**
 * Toggle language menu
 */
function toggleLanguageMenu() {
    const menu = document.getElementById('langMenu');
    const menuMobile = document.getElementById('langMenuMobile');
    if (menu) {
        menu.classList.toggle('active');
    }
    if (menuMobile) {
        menuMobile.classList.toggle('active');
    }
}

/**
 * Close language menu
 */
function closeLanguageMenu() {
    const menu = document.getElementById('langMenu');
    const menuMobile = document.getElementById('langMenuMobile');
    if (menu) {
        menu.classList.remove('active');
    }
    if (menuMobile) {
        menuMobile.classList.remove('active');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initTranslation();
    
    // Desktop language toggle button
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const menu = document.getElementById('langMenu');
            if (menu) {
                menu.classList.toggle('active');
            }
        });
    }
    
    // Mobile language toggle button
    const langToggleMobile = document.getElementById('langToggleMobile');
    if (langToggleMobile) {
        langToggleMobile.addEventListener('click', function(e) {
            e.stopPropagation();
            const menu = document.getElementById('langMenuMobile');
            if (menu) {
                menu.classList.toggle('active');
            }
        });
    }
    
    // Language options - handle both desktop and mobile
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        const langSelectors = document.querySelectorAll('.lang-selector');
        let clickedInside = false;
        langSelectors.forEach(selector => {
            if (selector.contains(e.target)) {
                clickedInside = true;
            }
        });
        if (!clickedInside) {
            closeLanguageMenu();
        }
    });
    
    // Close menu on escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLanguageMenu();
        }
    });
});

