// ⭐⭐⭐⭐ GESTION DU CONSENTEMENT RGPD — PORTFOLIO AYMEN ⭐⭐⭐⭐ //

document.addEventListener('DOMContentLoaded', () => {

    // ID GOOGLE ANALYTICS //
    const GA_ID = 'G-KXGTEDMLLJ';

    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const refuseBtn = document.getElementById('cookie-refuse');
    const settingsBtn = document.getElementById('cookie-settings');

    // Vérifie si l'utilisateur a déjà fait un choix
    const consent = localStorage.getItem('cookie_consent');

    // ⭐⭐ AFFICHAGE INITIAL DE LA BANNIÈRE ⭐⭐ //
    if (!consent) {
        // Aucun choix encore : on affiche la bannière
        showBanner();
    } else if (consent === 'accepted') {
        // Choix précédent : accepté → on charge Analytics
        loadAnalytics();
        showSettingsButton();
    } else {
        // Choix précédent : refusé → on affiche juste le bouton de retour
        showSettingsButton();
    }

    // ⭐⭐ ACTIONS UTILISATEUR ⭐⭐ //
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookie_consent', 'accepted');
            hideBanner();
            loadAnalytics();
            showSettingsButton();
        });
    }

    if (refuseBtn) {
        refuseBtn.addEventListener('click', () => {
            localStorage.setItem('cookie_consent', 'refused');
            hideBanner();
            showSettingsButton();
        });
    }

    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            // Permet de revenir sur son choix
            settingsBtn.hidden = true;
            showBanner();
        });
    }

    // ⭐⭐ FONCTIONS UTILITAIRES ⭐⭐ //
    function showBanner() {
        if (!banner) return;
        banner.hidden = false;
        // Léger délai pour que l'animation CSS se déclenche
        setTimeout(() => banner.classList.add('visible'), 100);
    }

    function hideBanner() {
        if (!banner) return;
        banner.classList.remove('visible');
        // Cache complètement après l'animation
        setTimeout(() => { banner.hidden = true; }, 500);
    }

    function showSettingsButton() {
        if (settingsBtn) settingsBtn.hidden = false;
    }

    // ⭐⭐ CHARGEMENT GOOGLE ANALYTICS = si consentement explicite ⭐⭐ //
    function loadAnalytics() {
        if (!GA_ID || GA_ID === 'G-XXXXXXXXXX') {
            console.warn('Google Analytics : ID non configuré');
            return;
        }

        // Charge le script gtag dynamiquement
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        document.head.appendChild(script);

        // Initialise gtag
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { dataLayer.push(arguments); };
        gtag('js', new Date());
        gtag('config', GA_ID, {
            anonymize_ip: true  // Anonymisation IP (RGPD)
        });
    }
});