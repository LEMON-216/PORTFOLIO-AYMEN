
# PROJET FIL ROUGE - PORTFOLIO

Portfolio personnel de **Aymen Chaabane**, chef de projet digital & développeur web — réalisé dans le cadre de la formation Chef de Projet Digital (1ère année) FIM CCI Ouest Normandie, campus 2 - Saint-Lô.

**En ligne :** [aymen-chaabane.netlify.app](https://aymen-chaabane.netlify.app/)

---

## Stack technique

- **HTML5 / CSS3 / JavaScript** (sans framework)
- **Polices** : Arelv (titres), Satoshi (corps), Playfair Display + Inter (CVs)
- **Multilingue** : FR / EN / AR / JA (sélecteur dynamique)
- **Animations** : starfield Canvas, scroll reveal, curseur personnalisé
- **Logos tech** : [DevIcon](https://devicon.dev/) v2.16.0 via CDN
- **Analytics** : Google Analytics (gtag.js)
- **RGPD** : bannière de consentement cookies
- **Hébergement** : Netlify (déploiement continu via GitHub)

---

## Structure des fichiers

PORTFOLIO/
├── index.html                              → Page d'accueil
├── projets.html                            → Liste des projets
├── a-propos.html                           → Présentation & accès aux 3 CVs
├── contact.html                            → Formulaire de contact
├── 404.html                                → Page d'erreur personnalisée
│
├── CV_Aymen_Chaabane_Graphique.html        → CV graphique interactif (1 page)
├── CV_Aymen_Chaabane_Digital.html          → CV digital interactif (1 page)
├── CV_Aymen_Chaabane_Artistique.html       → CV académique interactif (3 pages)
│
├── netlify.toml                            → Configuration Netlify
└── public/
    ├── css/style.css
    ├── js/
    │   ├── translations.js                 → Traductions FR/EN/AR/JA
    │   ├── lang.js                         → Gestionnaire de langue
    │   ├── script.js                       → Animations & interactions
    │   └── cookies.js                      → Bannière RGPD
    ├── favicon/                            → Icônes du site
    ├── logo/                               → Logo principal
    ├── flags/                              → Drapeaux des langues
    ├── font/                               → Polices Arelv et Satoshi
    ├── docs/                               → Anciens CVs PDF (archive)
    └── photo/                              → Images des projets + photo de profil
        ├── aymen.jpg                       → Photo de profil (CV Digital)
        └── projet/
            ├── hotot/
            ├── portfolio/
            ├── recherche/
            └── secret/

---

## Les 3 CVs interactifs

Approche hybride : chaque CV est une **page HTML interactive** avec un bouton **« ⬇ Télécharger en PDF »** intégré qui déclenche `window.print()`. Le visiteur peut consulter en ligne ou télécharger.

| CV | Format | Public cible | Particularité |
| ... |... | ... | ... |
| **CV Graphique** | 1 page A3 paysage | Visiteurs / créatifs | Anneaux concentriques SVG · timeline circulaire |
| **CV Digital** | 1 page A4 | Recruteurs digital / RH | Header bleu marine + photo · 14 logos tech officiels |
| **CV Artistique** | 3 pages A4 | Milieu universitaire | Sidebar grise · publications, thèse, références |

**Charte graphique unifiée** sur les 3 CVs :
- Palette terre : terracotta (#8B3A2A), gold (#C4903A), sage (#7A9E7E), cream (#F2EDE4)
- Typographies : Playfair Display (titres serif) + Inter (corps sans-serif)
- Anneaux décoratifs entrelacés en pied de page

---

## Déploiement

Le site est entièrement statique, hébergé sur **Netlify** avec déploiement continu :

```bash
git add .
git commit -m "le message"
git push
```

Chaque `push` sur la branche principale déclenche automatiquement un nouveau build Netlify (~30 s à 2 min pour le déploiement).

---

## Licence

Projet pédagogique réalisé dans le cadre de la formation **Chef de Projet Digital · Développeur Web** au Centre FIM CCI Ouest Normandie, campus 2 - Saint-Lô (année 2025 - 2026).

© 2026 Aymen Chaabane — tous droits réservés.
