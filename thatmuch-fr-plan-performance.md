# Plan d'action Performance — thatmuch.fr
*Basé sur les rapports PageSpeed Insights réels du 23/07/2026, 14:22 (Lighthouse 13.6.0)*

## Scores actuels

| | Mobile (Moto G Power, 4G lente) | Desktop |
|---|---|---|
| **Performances** | 🔴 **63** | 🟠 **76** |
| Accessibilité | 🟢 95 | 🟢 95 |
| Bonnes pratiques | 🟢 96 | 🟢 96 |
| SEO | 🟢 100 | 🟢 100 |
| Navigation agentique | 2/2 | 2/2 |

| Métrique | Mobile | Desktop | Seuil "Good" |
|---|---|---|---|
| FCP | 1,2 s | 0,3 s | ≤ 1,8 s |
| **LCP** | 🔴 **6,5 s** | 🟢 1,9 s | ≤ 2,5 s |
| **TBT** | 🔴 **460 ms** | 🟠 280 ms | ≤ 200 ms |
| CLS | 🟢 0 | 🟠 0,092 | ≤ 0,1 |
| Speed Index | 4,4 s | 1,5 s | — |
| Poids total de la page | 🔴 **3512 Kio (3,4 Mo)** | — | — |

**Le vrai problème, c'est le mobile.** Le LCP à 6,5s est largement au-dessus du seuil (2,5s) — c'est lui qui plombe le score de 63. Le desktop est globalement correct (LCP et Speed Index bons), le TBT reste à surveiller des deux côtés.

---

## Diagnostic — ce qui explique concrètement ces chiffres

Le rapport confirme et précise plusieurs points de mon inspection initiale, avec des chiffres exacts cette fois :

| Constat (du rapport PSI) | Économie estimée | Mobile / Desktop |
|---|---|---|
| Aucune mise en cache longue durée sur les assets statiques hashés (JS, polices) | **245-246 Kio** | Les deux |
| JavaScript inutilisé | **311 Kio** (mobile) / **511 Kio** (desktop) | Les deux |
| Images portfolio non optimisées (PNG, dimensions non adaptées à l'affichage) | **46 Kio** (mobile) / **293 Kio** (desktop) | Les deux |
| CSS inutilisé | 65 Kio | Mobile |
| JS "ancien" (polyfills inutiles pour navigateurs modernes) | 23 Kio | Les deux |
| Images sans `width`/`height` explicites | — (impacte le CLS) | Mobile |
| Chaîne de requêtes critique bloquante : `thatmuch.fr` → script analytics → `gtag.js`+`Cookiebot` → script tiers non identifié | **1287 ms** de latence cumulée | Desktop (confirmé), probablement pire sur mobile |
| Reflows forcés causés par des scripts tiers (Cookiebot, gtag, un chunk Gatsby) | jusqu'à 14 ms par appel | Desktop |
| Préconnexion manquante vers `content.hotjar.io` | — | Les deux |

### Point clé confirmé : la cache table du rapport desktop révèle la stack tierce complète
Le tableau "Utiliser des durées de mise en cache efficaces" liste précisément ce qui tourne sur le site : **GTM, gtag.js/GA4, Matomo (auto-hébergé), Hotjar, un pixel TikTok, et Cookiebot** (bandeau de consentement) — en plus des fichiers Gatsby eux-mêmes (`framework`, `app`, `webpack-runtime`, `component---src-pages-index-js`, deux polices custom `SpaceMono` et une police nommée `HeadlineB`).

C'est **5 outils de tracking/analytics simultanés**. C'est probablement la plus grosse source de JS inutilisé et de blocage du thread principal (TBT 460ms mobile), et ça vaut la peine d'être challengé avec l'équipe marketing indépendamment de toute optimisation technique.

### Point clé : l'élément LCP semble être le titre du hero, pas une image
Sur desktop, l'aperçu de l'audit "Détection de la requête LCP" montre comme élément LCP le texte *"Faites décoller vos projets digitaux..."* dans la section hero — pas une image. **À confirmer** (l'aperçu Lighthouse peut être ambigu), mais si c'est le cas, l'écart de 1,6s entre FCP (0,3s) et LCP (1,9s) sur desktop s'explique probablement par le **chargement des polices custom** (`SpaceMono`, `HeadlineB`) plutôt que par une image — ce qui redirige une partie de la priorité vers l'optimisation des polices plutôt que des images pour le LCP spécifiquement (les images restent un sujet, mais surtout pour le poids de page et le CLS).

---

## Volet 1 — Quick Wins (réordonnés par gain réel constaté)

### 1. Configurer un cache long terme sur les assets statiques hashés 🟢 confirmé
- **Métrique impactée** : Cache efficace (245-246 Kio), Speed Index sur navigations répétées, score "Bonnes pratiques" de mise en cache
- **Impact estimé** : élevé pour un effort quasi nul — c'est une pure erreur de configuration, pas de code à changer
- **Difficulté** : **très faible**
- **Constat** : tous les fichiers Gatsby hashés (`/static/framework-*.js`, `/static/app-*.js`, `/static/webpack-runtime-*.js`, les fichiers de police `SpaceMono`/`HeadlineB`) ont un TTL de cache **"None"** dans le rapport. Un fichier avec un hash dans son nom (donc immuable par construction) devrait avoir un `Cache-Control: max-age=31536000, immutable`.
- **Étapes** :
  1. Identifier l'hébergeur (Netlify, Gatsby Cloud, Vercel, autre) et vérifier s'il applique déjà des headers de cache par défaut sur `/static/*` — visiblement non ou mal configuré ici.
  2. Ajouter explicitement les headers, par exemple pour Netlify (`netlify.toml` ou fichier `_headers` dans `static/`) :
     ```
     /static/*
       Cache-Control: public, max-age=31536000, immutable
     /page-data/*
       Cache-Control: public, max-age=0, must-revalidate
     ```
  3. Ne **pas** appliquer un cache long sur `/page-data/*` et `app-data.json` (ce sont les données de contenu, potentiellement amenées à changer entre deux builds).
  4. Vérifier après déploiement avec `curl -I https://thatmuch.fr/static/<fichier>.js` que le header `cache-control` est bien présent.

### 2. Consolider les scripts d'analytics/tracking tiers 🟢 confirmé
- **Métrique impactée** : TBT (460ms mobile), JS inutilisé (311-511 Kio), chaîne de requêtes critique (1287ms)
- **Impact estimé** : élevé — c'est probablement le plus gros contributeur au TBT
- **Difficulté** : faible techniquement, **organisationnelle** en pratique (décision produit/marketing)
- **Constat** : GTM + gtag.js/GA4 + Matomo + Hotjar + pixel TikTok + Cookiebot tournent en même temps.
- **Étapes** :
  1. Avec l'équipe marketing, vérifier si Matomo et GA4 sont réellement tous les deux nécessaires en parallèle (doublon fréquent après une migration d'outil non terminée).
  2. Si GTM est en place, faire passer **tous** les tags (gtag, Hotjar, TikTok pixel, Matomo) par GTM plutôt que par des balises codées en dur — ça permet de contrôler les déclencheurs (attendre l'interaction utilisateur ou le `load`, au lieu d'un chargement synchrone dès le `DOMContentLoaded`).
  3. Charger GTM lui-même via `gatsby-plugin-partytown` (cf. plan précédent) pour sortir un maximum de ce travail du thread principal.
  4. Différer Cookiebot spécifiquement : le bandeau de consentement doit s'afficher vite visuellement, mais le SDK complet peut se charger après le premier paint — vérifier la doc Cookiebot pour son mode "async"/différé.

### 3. Précharger les polices critiques + vérifier `font-display` 🟡 à confirmer précisément mais fortement indiqué
- **Métrique impactée** : LCP (si l'élément LCP est bien le titre hero, cf. diagnostic ci-dessus)
- **Impact estimé** : potentiellement élevé sur desktop (1,6s d'écart FCP→LCP), critique sur mobile
- **Difficulté** : faible
- **Étapes** :
  1. Identifier les deux fichiers `.woff2` (`SpaceMono`, `HeadlineB`) utilisés au-dessus de la ligne de flottaison.
  2. Les précharger dans `gatsby-ssr.js` :
     ```js
     exports.onRenderBody = ({ setHeadComponents }) => {
       setHeadComponents([
         <link
           rel="preload"
           href="/static/HeadlineB-<hash>.woff2"
           as="font"
           type="font/woff2"
           crossOrigin="anonymous"
           key="preload-headline"
         />,
       ])
     }
     ```
  3. Vérifier que le CSS `@font-face` déclare `font-display: swap` (ou `optional` si un léger saut visuel de police est acceptable) pour ne jamais bloquer le rendu du texte plus de ~100ms.
  4. Une fois le Quick Win #1 en place, ces fichiers de police bénéficieront aussi du cache long terme.

### 4. Faire passer les images portfolio dans le pipeline `gatsby-plugin-image` 🟢 confirmé (46-293 Kio)
- **Métrique impactée** : poids de page, LCP si une image est concernée, CLS
- **Impact estimé** : élevé, surtout desktop (293 Kio de gain identifié)
- **Difficulté** : faible à moyenne
- Détail technique inchangé par rapport au plan précédent (schema customization WPGraphQL → `localFile` → `gatsbyImageData` avec `formats: [AUTO, WEBP, AVIF]`). Le rapport confirme que ce sont bien des PNG bruts (`d.png`, `Frame-2298*.png`) affichés à des dimensions plus petites que leur taille native — donc en plus du format, corriger le **redimensionnement** (le composant `GatsbyImage` gère les deux en une fois via `width`/`height` cohérents avec l'affichage réel).

### 5. Ajouter les attributs `width`/`height` manquants 🟢 confirmé par l'audit
- **Métrique impactée** : CLS (desktop à 0,092, proche du seuil de 0,1)
- **Impact estimé** : moyen — le CLS est encore "bon" mais sans marge
- **Difficulté** : très faible
- Se résout automatiquement pour les images portfolio une fois le Quick Win #4 fait (`gatsby-plugin-image` force `width`/`height`). Vérifier en plus les images insérées en HTML riche depuis WordPress (contenu d'article de blog).

### 6. Preconnect vers les origines tierces, notamment `content.hotjar.io` 🟢 confirmé
- **Métrique impactée** : chaîne de requêtes critique
- **Impact estimé** : faible à moyen, gain rapide et sans risque
- **Difficulté** : très faible
- Le rapport recommande explicitement `https://content.hotjar.io` comme candidat au preconnect. À ajouter avec les autres origines tierces identifiées (GTM, gtag, Cookiebot, Matomo) dans `gatsby-ssr.js` (voir plan précédent pour le code).

### 7. Réduire le JS "ancien"/polyfills inutiles 🟢 confirmé (23 Kio)
- **Métrique impactée** : JS inutilisé, TBT
- **Impact estimé** : faible en octets mais facile
- **Difficulté** : faible
- Le rapport identifie un plugin WordPress chargeant ses propres polyfills (`Array.prototype.flat`, `Object.assign`, `Object.entries`) et le pixel TikTok qui embarque des transformations Babel inutiles pour les navigateurs modernes.
- **Étapes** :
  1. Vérifier/mettre à jour la config `browserslist` du projet Gatsby pour cibler explicitly les navigateurs modernes (`> 0.5%, last 2 versions, not dead`), pour que le build Gatsby lui-même ne transpile pas inutilement.
  2. Pour le plugin WordPress concerné (visible dans les querystrings type `?ver=6.6.0`) : vérifier s'il existe une version plus récente qui ne charge plus ces polyfills, ou si le plugin peut être désactivé/remplacé.
  3. Pour le pixel TikTok : script tiers non modifiable directement, mais son chargement peut être différé via GTM (cf. Quick Win #2) pour limiter son impact sur le thread principal même si le poids reste identique.

### 8. Corriger la hiérarchie des titres et le contraste (accessibilité, gratuit) 🟢 confirmé
- **Métrique impactée** : score Accessibilité (95 → potentiellement 100)
- **Impact estimé** : cosmétique pour le score, réel pour l'usage
- **Difficulté** : très faible
- Deux points précis relevés par le rapport : des couleurs de texte/fond insuffisamment contrastées quelque part sur la page, et des niveaux de titres (`h1`-`h6`) qui ne se suivent pas dans l'ordre (probablement un saut de `h1` à `h3` sans `h2`, ou une section utilisant un niveau de titre incohérent avec la hiérarchie visuelle).

---

## Volet 2 — Chantiers long terme

### 1. Corriger la source des images portfolio à la racine du modèle de contenu 🟢
*(inchangé par rapport au plan précédent — voir détail technique WPGraphQL/schema customization)*
- **Métrique impactée** : LCP, poids de page, fiabilité
- **Impact estimé** : élevé, effet durable
- **Difficulté** : moyenne

### 2. Réduire et fractionner le bundle JS applicatif 🟡
- **Métrique impactée** : TBT, JS inutilisé (511 Kio desktop — c'est le plus gros chiffre du rapport)
- **Impact estimé** : élevé
- **Difficulté** : moyenne
- Auditer avec `gatsby-plugin-webpack-bundle-analyser-v2` ce qui compose réellement les 511 Kio de JS inutilisé au-delà des scripts tiers déjà identifiés — souvent une partie vient de composants applicatifs (accordéon FAQ, carousel témoignages) chargés globalement au lieu d'être scindés par route/section.

### 3. Gouvernance des scripts tiers (processus, pas juste du code) 🟢
- **Métrique impactée** : TBT, poids de page, dérive dans le temps
- **Impact estimé** : élevé et durable si mis en place, car empêche la ré-accumulation d'outils de tracking
- **Difficulté** : élevée (organisationnelle)
- Concrètement lié au Quick Win #2 : documenter une règle simple ("tout nouveau tag passe par GTM, jamais codé en dur dans le thème") et faire un audit trimestriel du conteneur GTM avec l'équipe marketing.

### 4. Réduire la chaîne de requêtes critique bloquante 🟢 confirmé
- **Métrique impactée** : LCP, FCP
- **Impact estimé** : élevé (1287ms de latence cumulée identifiée)
- **Difficulté** : moyenne
- La chaîne `thatmuch.fr → script analytics → gtag.js+Cookiebot → script tiers` doit être sortie du chemin critique de rendu. Ça recoupe les Quick Wins #2 et #3, mais structurellement il s'agit de revoir **où et comment** ces scripts sont injectés dans le `<head>` (actuellement probablement en synchrone, potentiellement même avant le CSS critique).

### 5. Lighthouse CI / budgets de performance 🟡
*(inchangé — voir plan précédent)*
- **Impact estimé** : indirect mais structurant, empêche une régression comme celle des images portfolio ou l'ajout d'un 6e outil de tracking

### 6. Bonus hors CWV — en-têtes de sécurité 🟡
- Le rapport "Bonnes pratiques" (96/100) relève l'absence de CSP efficace contre XSS, de HSTS, d'isolation COOP, de protection anti-clickjacking (XFO/CSP), et de Trusted Types. Hors périmètre strict Core Web Vitals, mais ce sont des ajouts de configuration serveur/CDN à coût quasi nul, à traiter en même temps que le Quick Win #1 (même fichier `_headers`/`netlify.toml`).

---

## Répartition mobile / desktop / commun (mise à jour avec les vrais chiffres)

| Levier | Mobile | Desktop |
|---|---|---|
| Cache long terme sur assets statiques | Commun (245-246 Kio les deux) | Commun |
| Consolidation scripts analytics/tracking | Impact très fort (TBT 460ms) | Impact fort (TBT 280ms) |
| Préchargement polices | Critique (LCP 6,5s à corriger en priorité) | Modéré (LCP déjà bon à 1,9s) |
| Optimisation images portfolio | Impact modéré (46 Kio) | Impact fort (293 Kio) |
| Réduction chaîne de requêtes critique | Probablement pire qu'en desktop (1287ms mesurés) | Confirmé (1287ms) |
| Attributs width/height | Confirmé manquant | CLS à 0,092, marge faible |

---

## Prochaine étape

Priorité d'implémentation suggérée compte tenu des gains/effort : **#1 (cache) → #2 (consolidation tracking) → #6 (preconnect Hotjar) → #3 (polices) → #4/#5 (images + dimensions)**. Les quatre premiers sont à très faible effort et attaquent directement le TBT et le LCP mobile, qui sont les deux métriques qui plombent le score de 63.
