// ⭐⭐⭐⭐ GESTIONNAIRE DE LANGUES ⭐⭐⭐⭐ //

const DEFAULT_LANG = 'fr';

// Récupère la langue sauvegardée ou utilise le français par défaut
let currentLang = localStorage.getItem('portfolio_lang') || DEFAULT_LANG;

// ⭐⭐ FONCTION PRINCIPALE : Applique une langue ⭐⭐ //
function applyLang(lang) {
    const t = translations[lang];
    if (!t) return;

    currentLang = lang;

    // Sauvegarde dans localStorage (persiste entre toutes les pages)
    localStorage.setItem('portfolio_lang', lang);

    // Traduit tous les éléments portant data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] === undefined) return;

        // Gestion spéciale des placeholders (inputs / textarea)
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.setAttribute('placeholder', t[key]);
        } else {
            el.textContent = t[key];
        }
    });

    // Gestion du sens d'écriture RTL pour l'arabe
    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
    } else {
        document.documentElement.removeAttribute('dir');
        document.documentElement.setAttribute('lang', lang);
    }

    // Met à jour le drapeau actif dans le sélecteur
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}

// ⭐⭐ INITIALISATION (au chargement de chaque page) ⭐⭐ //
document.addEventListener('DOMContentLoaded', () => {

    // Applique immédiatement la langue sauvegardée
    applyLang(currentLang);

    // Écoute les clics sur les boutons de langue (drapeaux)
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            applyLang(lang);
        });
    });
});