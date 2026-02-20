# Audit Technique & SEO - Site THATMUCH

Voici l'audit technique structuré de votre codebase Gatsby. Le constat est clair : **l'architecture headless est en place, mais plusieurs fondamentaux techniques et SEO sont critiques.**

## 🚨 Priorité 1 : Impact Critique (A corriger immédiatement)

### 1. Faille de Sécurité Critique : Clé API Brevo exposée
**Problème :** Le fichier `src/hooks/use-brev.tsx` utilise `process.env.GATSBY_BREVO_API_KEY`. Tout ce qui commence par `GATSBY_` est inclus dans le bundle JavaScript client. N'importe qui peut récupérer votre clé API et spammer votre compte ou voler des données.
**Action :**
*   **Ne jamais** appeler l'API Brevo depuis le client (React).
*   Créez une **Gatsby Function** (`src/api/contact.ts`) ou une Netlify Function qui agit comme proxy.
*   Renommez la variable d'environnement en `BREVO_API_KEY` (sans `GATSBY_`) pour qu'elle reste côté serveur.

```typescript
// Exemple src/api/contact.ts
export default async function handler(req, res) {
  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: { "api-key": process.env.BREVO_API_KEY, ... },
    body: JSON.stringify(req.body)
  });
  res.status(200).json(await response.json());
}
```

### 2. Sémantique HTML Invalide : Balises `<main>` imbriquées
**Problème :** `Layout.tsx` enveloppe déjà le contenu dans une balise `<main>`. Pourtant, `Page/index.tsx` et `Post/index.tsx` réintroduisent une balise `<main>` à l'intérieur.
**Conséquence :** Structure HTML invalide, pénalité d'accessibilité et confusion pour les robots d'indexation.
**Action :** Supprimez la balise `<main>` dans vos templates (`Page`, `Post`, etc.) et utilisez une `div` ou `article` si nécessaire.

### 3. Performance & LCP : `gatsby-plugin-image` inactif
**Problème :** Bien que le plugin soit installé, le site utilise massivement `LazyLoadImage` (bibliothèque tierce) ou des balises `<img>` standards.
**Conséquence :**
*   Pas de génération de sources AVIF/WebP (images lourdes).
*   Pas de placeholder "blur-up" (CLS impact).
*   Pas de `srcset` responsive automatique.
**Action :** Remplacez les images statiques (ex: Logo, Hero) par `<StaticImage />` et les images dynamiques par `<GatsbyImage />`.

### 4. SEO Technique : Canonical & JSON-LD manquants
**Problème :** Le composant `Seo/index.tsx` ne génère pas de balise `<link rel="canonical" />` ni de données structurées (Schema.org).
**Conséquence :** Risque de *duplicate content* et absence de Rich Snippets (Breadcrumbs, Article, Organization) dans les résultats de recherche.
**Action :**
Ajoutez dans `Seo/index.tsx` :
```tsx
<link rel="canonical" href={seo.url} />
<script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": type === 'article' ? 'Article' : 'WebSite',
    "url": seo.url,
    "name": seo.title,
    // ... autres propriétés
  })}
</script>
```

### 5. Performance CSS : PurgeCSS inactif
**Problème :** `gatsby-plugin-purgecss` est installé (`package.json`) mais absent de la liste `plugins` dans `gatsby-config.js`.
**Conséquence :** Vous chargez tout le CSS de Bootstrap (~150kb+) sur chaque page, même si vous n'en utilisez que 10%.
**Action :** Ajoutez le plugin dans `gatsby-config.js` après `gatsby-plugin-sass`.

---

## ⚠️ Priorité 2 : Impact Moyen (Quick Wins)

### 6. LCP & UX : Logo en Lazy Load
**Problème :** Dans `Header.tsx`, le logo utilise `LazyLoadImage`.
**Conséquence :** Le logo (souvent élément LCP sur mobile) est chargé *après* le JS et le scroll, retardant l'affichage perçu.
**Action :** Utilisez une simple balise `<img>` avec `loading="eager"` ou mieux, `<StaticImage loading="eager" />`.

### 7. Hydratation React : Risque sur `sanitize.ts`
**Problème :** La fonction `sanitizeHtml` retourne le HTML brut côté serveur (`window === undefined`) mais le nettoie côté client.
**Conséquence :** Mismatch d'hydratation (le DOM serveur diffère du DOM client), forçant React à tout re-rendre au chargement (TBT élevé).
**Action :** Utilisez `isomorphic-dompurify` qui fonctionne sur Node et Browser de manière identique.

### 8. Optimisation des Fontes (Duplication)
**Problème :** `_fonts.scss` définit "Neue Machina" et "NeueMachina" (avec et sans espace) pointant vers les mêmes fichiers.
**Conséquence :** Le navigateur peut télécharger les fichiers de police deux fois si les deux noms sont utilisés dans le CSS.
**Action :** Unifiez les noms de famille de police.

---

## ℹ️ Priorité 3 : Impact Faible (Bonnes pratiques)

### 9. Stratégie de Titre SEO
**Problème :** Les titres de page n'ont pas de modèle (template). Exemple : "Contact" au lieu de "Contact | THATMUCH".
**Action :** Configurez un template par défaut dans `Seo/index.tsx` : `titleTemplate="%s | THATMUCH"`.

### 10. Conflit d'Animation
**Problème :** Utilisation conjointe de `AOS` (JavaScript) et d'animations CSS natives (`animation-timeline: view()`).
**Conseil :** Privilégiez l'approche CSS (plus performante, pas de thread JS bloquant) et supprimez AOS si possible pour alléger le bundle.

### 11. Manifest par défaut
**Problème :** `gatsby-config.js` contient toujours "gatsby-starter-default".
**Action :** Mettez à jour le `name` et `short_name` avec "THATMUCH".

---

## Conclusion
Le site a une base saine mais souffre de "dette technique silencieuse" (images non optimisées nativement, CSS non purgé, failles de sécurité API). L'application des points 1 à 5 transformera radicalement les performances (Core Web Vitals) et la santé SEO du site.
