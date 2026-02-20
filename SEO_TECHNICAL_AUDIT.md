# Audit Technique SEO : Architecture Headless THATMUCH

**Date :** 24 Octobre 2023
**Auditeur :** Jules (Expert Architecture Headless & SEO Technique)
**Périmètre :** Structure du code source (Gatsby v5 / React)

---

## 1. Synthèse Exécutive

L'architecture du site repose sur une stack solide et performante (Gatsby v5 + WordPress Headless), ce qui est un excellent point de départ pour le SEO technique. Cependant, l'implémentation actuelle souffre de **défauts structurels critiques** qui annulent une grande partie des bénéfices de cette architecture SPA/SSG.

Le point le plus urgent concerne la navigation interne qui force le rechargement complet des pages, impactant sévèrement les Core Web Vitals (LCP/CLS) et l'expérience utilisateur. De plus, la structure sémantique HTML présente des redondances (balises `<main>` imbriquées) qui nuisent à l'accessibilité et à la compréhension par les robots.

---

## 2. Navigation & Hydratation (Impact : CRITIQUE)

### Le Problème : Rupture du modèle SPA
L'analyse du code (`src/components/Header/Header.tsx` et `src/components/Footer/Footer.tsx`) révèle l'utilisation systématique de balises `<a>` pour les liens internes au lieu du composant `<Link>` de Gatsby.

**Conséquence :** À chaque clic, le navigateur décharge entièrement l'application React et recharge la page depuis le serveur. Cela provoque :
1.  Une perte de l'état global (Zustand).
2.  Un clignotement blanc entre les pages.
3.  Un nouveau calcul complet du LCP (Largest Contentful Paint) à chaque navigation.
4.  Une augmentation inutile de la consommation de bande passante.

### Recommandation (Correction Immédiate)
Remplacer toutes les balises `<a>` pointant vers des routes internes par `<Link to="...">`.

**Exemple (`Header.tsx`) :**
```tsx
import { Link } from "gatsby";

// AVANT (Mauvais)
<a href="/" className="landing-header__logo" ...>...</a>

// APRÈS (Correct)
<Link to="/" className="landing-header__logo" ...>...</Link>
```

---

## 3. Structure Sémantique HTML5 (Impact : FORT)

### Le Problème : Balises `<main>` Imbriquées
Le composant `Layout` (`src/components/Layout/Layout.tsx`) définit déjà une balise `<main>`. Or, les templates de page (`src/templates/Page/index.tsx`, `src/templates/Post/index.tsx`) réintroduisent une seconde balise `<main>` à l'intérieur.

**Résultat dans le DOM :**
```html
<main class="Layout">
  <main>
    <h1>Titre de la page</h1>
    ...
  </main>
</main>
```
Ceci est sémantiquement invalide. Il ne doit y avoir qu'une seule zone `<main>` visible par page.

### Recommandation
Supprimer la balise `<main>` dans les templates (`Page`, `Post`, `FrontPage`) et utiliser une `<div>` ou un `Fragment` (`<>...</>`) si un wrapper est nécessaire pour le styling, ou laisser le `Layout` gérer le conteneur principal.

---

## 4. Performance & Core Web Vitals (Impact : MOYEN/FORT)

### Images LCP & Lazy Loading
Le logo du header est chargé avec `LazyLoadImage` (`src/components/Header/Header.tsx`).
**Problème :** Le logo est toujours au-dessus de la ligne de flottaison. Le lazy loading retarde son affichage, augmentant artificiellement le LCP.
**Action :** Utiliser une balise `<img>` standard avec `loading="eager"` ou `StaticImage` de Gatsby avec `loading="eager"`.

### Dépendances Lourdes
Le projet utilise `bootstrap` (CSS complet importé) et `node-sass` (déprécié).
**Action :**
1.  Migrer vers `dart-sass` (`npm uninstall node-sass && npm install sass`). `node-sass` pose des problèmes de compatibilité avec les versions récentes de Node.js.
2.  Vérifier si tout Bootstrap est nécessaire. Si seules les grilles sont utilisées, importer uniquement `bootstrap/scss/bootstrap-grid`.

---

## 5. Métadonnées & SEO (Impact : MOYEN)

### Canonical URLs Manquantes
Le composant SEO (`src/components/Seo/index.tsx`) ne génère pas de balise `<link rel="canonical" />`. C'est crucial pour éviter le contenu dupliqué (ex: `/contact` vs `/contact/`).

### Données Structurées (Schema.org) Inexistantes
Aucun JSON-LD n'est injecté. Pour une agence digitale, il est impératif d'avoir au minimum un schéma `Organization` sur la page d'accueil et `BreadcrumbList` sur les pages profondes.

### Legacy `react-helmet`
Le projet utilise `gatsby-plugin-react-helmet`. Depuis Gatsby v5, la recommandation officielle est d'utiliser l'API [Gatsby Head](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/). Cela réduit la taille du bundle JavaScript initial.

---

## 6. Plan d'Action Priorisé

### P0 : Quick Wins (À faire immédiatement)
1.  **Refonte des Liens :** Remplacer `<a>` par `<Link>` dans `Header`, `Footer`, et `HeroSection` (si lien interne).
2.  **Canonical :** Ajouter la logique canonical dans `src/components/Seo/index.tsx`.
3.  **Nettoyage Sémantique :** Supprimer les `<main>` imbriqués dans les templates.

### P1 : Optimisation Structurelle
1.  **Schema.org :** Ajouter un script JSON-LD dans le composant SEO pour `Organization` et `WebSite`.
2.  **Performance LCP :** Désactiver le lazy loading sur le logo et l'image Hero.

### P2 : Dette Technique
1.  **Migration Sass :** Remplacer `node-sass` par `sass`.
2.  **Migration Head API :** Remplacer `react-helmet` par l'export `Head` de Gatsby v5.

---

## Annexe : Code Snippet pour `Seo.tsx` Amélioré

Voici une version corrigée du composant SEO incluant Canonical et Schema.org de base :

```tsx
import React from "react";
import { Helmet } from "react-helmet";
import { useSiteSeo } from "../../hooks/use-site-seo";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  pathname?: string;
  article?: boolean;
}

const Seo: React.FC<SEOProps> = ({
  title,
  description,
  image,
  pathname,
  article = false,
}) => {
  const site = useSiteSeo();
  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
  } = site;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname || ``}`,
  };

  const schemaOrgJSONLD = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url: siteUrl,
      name: defaultTitle,
      alternateName: "THATMUCH Agency",
    },
    {
      "@context": "http://schema.org",
      "@type": "Organization",
      url: siteUrl,
      logo: `${siteUrl}${defaultImage}`,
      name: "THATMUCH",
      sameAs: [
        "https://www.linkedin.com/company/thatmuch/",
        "https://www.instagram.com/thatmuch/"
      ]
    }
  ];

  return (
    <Helmet title={seo.title} titleTemplate={!title ? "%s" : `%s | THATMUCH`}>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <link rel="canonical" href={seo.url} />

      {/* OpenGraph tags */}
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      {twitterUsername && <meta name="twitter:creator" content={twitterUsername} />}
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  );
};

export default Seo;
```
