// Cookie consent functions
function showCookieBanner() {
    console.log('Showing cookie banner...');
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.classList.add('show');
    }
}

function hideCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.classList.remove('show');
    }
}

function showCookieSettings() {
    const settings = document.createElement('div');
    settings.id = 'cookie-settings';
    settings.innerHTML = `
        <div class="cookie-settings-content">
            <h3>Nastavenia cookies</h3>
            <div class="cookie-option">
                <input type="checkbox" id="necessary" checked disabled>
                <label for="necessary">Nevyhnutné cookies</label>
                <p>Potrebné pre fungovanie webovej stránky</p>
            </div>
            <div class="cookie-option">
                <input type="checkbox" id="analytics">
                <label for="analytics">Analytické cookies</label>
                <p>Pomáhajú nám zlepšovať webovú stránku</p>
            </div>
            <div class="cookie-option">
                <input type="checkbox" id="marketing">
                <label for="marketing">Marketingové cookies</label>
                <p>Používané na personalizáciu reklám</p>
            </div>
            <div class="cookie-settings-buttons">
                <button onclick="saveCookieSettings()" class="cookie-btn save">Uložiť nastavenia</button>
                <button onclick="closeCookieSettings()" class="cookie-btn close">Zatvoriť</button>
            </div>
        </div>
    `;
    document.body.appendChild(settings);
}

function closeCookieSettings() {
    const settings = document.getElementById('cookie-settings');
    if (settings) {
        settings.remove();
    }
}

function saveCookieSettings() {
    const analytics = document.getElementById('analytics').checked;
    const marketing = document.getElementById('marketing').checked;
    
    setCookie('cookie_preferences', JSON.stringify({
        analytics: analytics,
        marketing: marketing,
        timestamp: new Date().getTime()
    }), 365);
    
    closeCookieSettings();
    hideCookieBanner();
}

function acceptCookies() {
    setCookie('cookie_consent', 'true', 365);
    setCookie('cookie_preferences', JSON.stringify({
        analytics: true,
        marketing: true,
        timestamp: new Date().getTime()
    }), 365);
    hideCookieBanner();
}

function rejectCookies() {
    setCookie('cookie_consent', 'false', 365);
    setCookie('cookie_preferences', JSON.stringify({
        analytics: false,
        marketing: false,
        timestamp: new Date().getTime()
    }), 365);
    hideCookieBanner();
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
    // Backup to localStorage
    localStorage.setItem(name, value);
}

function getCookie(name) {
    // Try cookies first
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
            const value = c.substring(nameEQ.length, c.length);
            console.log('Cookie found:', name, 'with value:', value);
            return value;
        }
    }
    
    // If not found in cookies, try localStorage
    const localStorageValue = localStorage.getItem(name);
    console.log('Cookie not found in cookies, localStorage value:', localStorageValue);
    return localStorageValue;
}

function initCookieConsent() {
    console.log('Initializing cookie consent...');
    const consent = getCookie('cookie_consent');
    console.log('Cookie consent value:', consent);
    
    // Show banner if consent is null, undefined, or false
    if (consent === null || consent === undefined || consent === 'false') {
        console.log('No consent found or consent is false, showing banner');
        showCookieBanner();
    } else if (consent === 'true') {
        console.log('Consent already given');
        hideCookieBanner();
    }
}

// Check on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing cookie consent');
    initCookieConsent();
});

// Check on page show (for back/forward navigation)
window.addEventListener('pageshow', function(event) {
    console.log('Page shown, checking cookie consent');
    initCookieConsent();
});

// Check on hash change (for single page navigation)
window.addEventListener('hashchange', function() {
    console.log('Hash changed, checking cookie consent');
    initCookieConsent();
});

// Also check after a short delay
setTimeout(function() {
    console.log('Delayed check of cookie consent');
    initCookieConsent();
}, 1000); 