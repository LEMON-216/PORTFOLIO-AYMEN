// ⭐⭐⭐⭐ SCRIPT INTERACTIF PRINCIPAL ⭐⭐⭐⭐ //

document.addEventListener('DOMContentLoaded', () => {

    // ⭐⭐ 1. CURSEUR PERSONNALISÉ ⭐⭐ //
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    // Position cible (souris réelle) //
    let mouseX = 0, mouseY = 0;

    /* Position courante du follower (interpolée: insertion dynamique de valeurs dans une chaîne) */
    let posX = 0, posY = 0;

    // Suit la souris en temps réel + met à jour le point central instantanément //
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (cursor) {
            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;
        }
    });

    //Animation du follower par interpolation //
    function animateCursor() {
        const ease = 0.15;
        posX += (mouseX - posX) * ease;
        posY += (mouseY - posY) * ease;
        if (follower) {
            follower.style.left = `${posX}px`;
            follower.style.top = `${posY}px`;
        }
        requestAnimationFrame(animateCursor); //Boucle perpetuelle synchronisée avec le rendu
    }
    animateCursor();

    // Agrandit le follower quand la souris survole un élément interactif (classe cursor-active) //
    const interactiveSelectors = 'a, button, .project-card, .social-icon, input, textarea, .burger-menu, .close-overlay, .lang-btn';
    document.querySelectorAll(interactiveSelectors).forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
    });


    // ⭐⭐ 2. MENU BURGER (sur mobile) ⭐⭐ //
    const burger = document.getElementById('burger');
    const navList = document.getElementById('nav-list');

    if (burger && navList) {

        // Bascule l'état ouvert/fermé du menu //
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            navList.classList.toggle('active');
        });

        // Referme le menu automatiquement après navigation vers un lien //
        navList.querySelectorAll('a').forEach(item => {
            item.addEventListener('click', () => {
                burger.classList.remove('active');
                navList.classList.remove('active');
            });
        });
    }


    // ⭐⭐ 3. STARFIELD — CHAMP D'ÉTOILES (page d'accueil uniquement) ⭐⭐ //
    const canvas = document.getElementById('space');

    if (canvas) {
        const ctx = canvas.getContext('2d');

        let w, h;          // Dimensions du canvas — mises à jour au resize
        const stars = [];  // Tableau de toutes les étoiles
        const starsCount = 800; // Nombre total d'étoiles
        const speed = 0.5;      // Vitesse d'avance sur l'axe Z

        // Redimensionne le canvas à la taille de la fenêtre //
        const resize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize(); // Initialisation au chargement

        // Crée les étoiles avec des positions 3D aléatoires //
        for (let i = 0; i < starsCount; i++) {
            stars.push({
                x: Math.random() * w - w / 2, // Centré sur 0 (origine = milieu du canvas)
                y: Math.random() * h - h / 2,
                z: Math.random() * w           // Profondeur initiale aléatoire
            });
        }

        function animateStars() {
            // Stoppe si le canvas a été retiré du DOM //
            if (!document.getElementById('space')) return;

            // Fond semi-transparent = crée l'effet de traînée sur les étoiles //
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.fillRect(0, 0, w, h);

            ctx.fillStyle = '#ffffff'; // Couleur des étoiles

            stars.forEach(star => {
                // Rapproche l'étoile en réduisant sa profondeur //
                star.z -= speed;

                // Réinitialise l'étoile au fond quand elle dépasse le plan caméra //
                if (star.z <= 0) {
                    star.z = w;
                    star.x = Math.random() * w - w / 2;
                    star.y = Math.random() * h - h / 2;
                }

                const sx = (star.x / star.z) * w + w / 2;
                const sy = (star.y / star.z) * h + h / 2;

                // La taille augmente à mesure que l'étoile se rapproche //
                const size = Math.max(0, (1 - star.z / w) * 2.5);

                if (sx > 0 && sx < w && sy > 0 && sy < h) {
                    ctx.beginPath();
                    ctx.arc(sx, sy, size, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            requestAnimationFrame(animateStars); // Planifie la prochaine frame
        }

        animateStars(); // Démarre l'animation
    }


    // ⭐⭐ 4. SCROLL REVEAL ⭐⭐ //
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Déclenche la transition CSS
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.project-card, .page-title, .about-content').forEach(el => {
        scrollObserver.observe(el);
    });


    // ⭐⭐ 5. OVERLAY PROJETS (plein écran) ⭐⭐ //
    const overlay       = document.getElementById('project-overlay');
    const overlayImg    = document.getElementById('overlay-img');
    const overlayTitle  = document.getElementById('overlay-title');
    const overlayDesc   = document.getElementById('overlay-desc');
    const closeBtn      = document.querySelector('.close-overlay');

    // Ferme l'overlay et restaure le scroll de la page //
    function closeOverlay() {
        if (!overlay) return;
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Réactive le scroll vertical
    }

    if (overlay) {

        document.querySelectorAll('.project-card:not(.project-card--artistic)').forEach(card => {
            card.addEventListener('click', () => {
                const img   = card.querySelector('.placeholder-img');
                const title = card.querySelector('h2')?.innerText || '';
                const desc  = card.querySelector('p')?.innerText  || '';

                // Extrait l'URL depuis la valeur CSS "url('...')" //
                const bgImage = img?.style.backgroundImage || '';
                const imgUrl  = bgImage.replace(/url\(["']?|["']?\)/g, '');

                if (overlayImg)   overlayImg.src        = imgUrl;
                if (overlayTitle) overlayTitle.innerText = title;
                if (overlayDesc)  overlayDesc.innerText  = desc;

                overlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Bloque le scroll pendant l'overlay //
            });
        });

        const artisticWrapperOverlay = document.querySelector('.artistic-wrapper');
        if (artisticWrapperOverlay) {
            artisticWrapperOverlay.addEventListener('click', (e) => {

                if (
                    e.target.closest('.artistic-arrow') ||
                    e.target.closest('.artistic-dots')
                ) return;

                const activeSlide = artisticWrapperOverlay.querySelector('.artistic-slide.active');
                const bgImage     = activeSlide?.style.backgroundImage || '';
                const imgUrl      = bgImage.replace(/url\(["']?|["']?\)/g, '');

                // Remonte jusqu'à la carte parente pour récupérer titre et description //
                const card  = artisticWrapperOverlay.closest('.project-card--artistic');
                const title = card?.querySelector('h2')?.innerText || '';
                const desc  = card?.querySelector('p')?.innerText  || '';

                if (overlayImg)   overlayImg.src        = imgUrl;
                if (overlayTitle) overlayTitle.innerText = title;
                if (overlayDesc)  overlayDesc.innerText  = desc;

                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }

        // Fermeture via le bouton × //
        if (closeBtn) {
            closeBtn.addEventListener('click', closeOverlay);
        }

        // Fermeture en cliquant sur l'arrière-plan sombre //
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeOverlay();
        });

        // Fermeture au clavier (touche Échap) //
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeOverlay();
        });
    }


    // ⭐⭐ 6. FORMULAIRE DE CONTACT ⭐⭐ //
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Empêche le rechargement de page

            const submitBtn  = contactForm.querySelector('.submit-btn');
            const lang       = localStorage.getItem('portfolio_lang') || 'fr';
            const t          = translations[lang] || translations['fr'];

            // État 1 : envoi en cours //
            submitBtn.innerText  = t.contact_sending;
            submitBtn.disabled   = true; // Prévient les double-soumissions

            setTimeout(() => {

                // État 2 : envoi réussi //
                submitBtn.innerText        = t.contact_sent;
                submitBtn.style.borderColor = '#00ff00';
                submitBtn.style.color       = '#00ff00';
                contactForm.reset(); // Vide tous les champs

                // État 3 : retour à l'état initial après 3 secondes //
                setTimeout(() => {
                    submitBtn.innerText        = t.contact_send;
                    submitBtn.style.borderColor = '#fff';
                    submitBtn.style.color       = '#fff';
                    submitBtn.disabled          = false;
                }, 3000);

            }, 1500);
        });
    }


    // ⭐⭐ 7. GALERIE ARTISTIQUE - CAROUSEL (Projet 4) ⭐⭐ //
    const artisticWrapper = document.querySelector('.artistic-wrapper');

    if (artisticWrapper) {
        const slides       = artisticWrapper.querySelectorAll('.artistic-slide');
        const dotsContainer = document.getElementById('artistic-dots');
        const prevBtn      = document.getElementById('artistic-prev');
        const nextBtn      = document.getElementById('artistic-next');

        // Si un élément essentiel est absent, on ne lance pas le carousel //
        if (!dotsContainer || !prevBtn || !nextBtn || slides.length === 0) {
            console.warn('Carousel artistique : éléments manquants dans le DOM.');
            return;
        }

        let current   = 0;
        let autoTimer = null;

        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('artistic-dot');
            dot.setAttribute('aria-label', `Afficher la photo ${i + 1}`); 
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goTo(i);
                resetAuto();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.artistic-dot');

        function goTo(index) {
            slides[current].classList.remove('active');
            dots[current].classList.remove('active');

            current = (index + slides.length) % slides.length; // Boucle

            slides[current].classList.add('active'); // Affiche la nouvelle slide
            dots[current].classList.add('active');   // Active le nouveau point
        }

        // Navigation manuelle par flèches //
        prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
        nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

        // Lance le défilement automatique (intervalle de 4 secondes) //
        function startAuto() {
            autoTimer = setInterval(() => goTo(current + 1), 4000);
        }

        function resetAuto() {
            clearInterval(autoTimer);
            startAuto();
        }

        startAuto(); // Démarre l'avance automatique

        // Met à jour les variables CSS --x et --y pour positionner le gradient suivant la souris //
        artisticWrapper.addEventListener('mousemove', (e) => {
            document.documentElement.style.setProperty('--x', e.clientX);
            document.documentElement.style.setProperty('--y', e.clientY);
        });

        // Swipe tactile //
        let touchStartX = 0;
        artisticWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true }); // améliorer les performances de scroll

        artisticWrapper.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? goTo(current + 1) : goTo(current - 1);
                resetAuto();
            }
        });

        // Active l'effet curseur agrandi au survol de la galerie //
        artisticWrapper.addEventListener('mouseenter', () =>
            document.body.classList.add('cursor-active'));
        artisticWrapper.addEventListener('mouseleave', () =>
            document.body.classList.remove('cursor-active'));
    }

});
// ⭐⭐ Fin de DOMContentLoaded ⭐⭐ //
