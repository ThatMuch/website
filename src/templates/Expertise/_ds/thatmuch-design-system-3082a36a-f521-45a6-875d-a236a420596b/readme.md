# THATMUCH — Design System

Brand & UI system for **THATMUCH**, a Paris-based web agency specialising in
**front-end development & design**. The brand runs on a single big idea: the web
as **outer space** — you bring a site, THATMUCH puts it *into another galaxy*.
Expect deep-indigo night skies, a four-colour "rainbow" of services, planets,
comets and friendly sci-fi characters (R2-D2, Baby Yoda, WALL·E, the Petit Prince).

> "On propulse votre site dans une autre galaxie."

This folder is a self-contained design system: brand assets, design tokens
(CSS custom properties), webfonts, reusable React components, and a full
recreation of the marketing website. An automated compiler bundles the
components into `_ds_bundle.js` and indexes the tokens — **don't edit the
generated `_ds_*` files**.

---

## Sources (for whoever extends this)

These were the inputs. You may not have access, but they're recorded so a future
editor can go deeper:

- **Figma — "🚀 THATMUCH — Web design"** & **"🌟 Cosmos"** (component library +
  marketing pages, the `Refonte/Home` flow is the canonical homepage).
- **GitHub — production website (source of truth for tokens & atoms):**
  `https://github.com/ThatMuch/website` (Gatsby + SCSS). The colour scales,
  button/tag/heading atoms and fonts here are lifted directly from
  `src/style/_vars.scss`, `_fonts.scss` and `atoms/`.
  - Related org repos worth exploring: `https://github.com/ThatMuch/cosmos`,
    `https://github.com/ThatMuch/medusa` (WordPress theme), `https://github.com/ThatMuch/website`.
- **Uploaded brand assets:** logos, favicon, the "drive cover", planets and
  characters (now in `assets/`), plus the Space Mono & Neue Machina font files.

---

## CONTENT FUNDAMENTALS — how THATMUCH writes

- **Language: French**, professional but warm and a little playful. Vouvoiement
  ("**vous**", "votre site") — the reader is a prospective client, addressed
  directly and respectfully.
- **We = "nous / THATMUCH"**, confident but never boastful. Claims are backed by
  numbers ("+ 50 projets réalisés", "+ 10 ans d'expérience").
- **Space metaphors, used sparingly as seasoning** — "décollage", "mise en
  orbite", "dans une autre galaxie", "prêt pour le décollage ?". One per section,
  not every sentence. The metaphor sits *on top of* concrete, benefit-led copy
  about performance, accessibility and conversion.
- **Tone:** clear, reassuring, expert. Short punchy headlines in display type;
  explanatory body copy in mono. Questions are used to hook ("Votre site est-il
  prêt pour le décollage ?").
- **Casing:** headlines often UPPERCASE for the logo/wordmark; sentence case for
  reading copy. Kickers/eyebrows are UPPERCASE mono with wide tracking.
- **Emoji:** rare, only as a wink in interactive moments (a 🚀 on a success
  state). Never in formal body copy. The brand's "icons" are its planets &
  characters, not emoji.
- **Numbers matter:** the "Chiffres clés" pattern (big tinted stat + one line of
  context) is core. Each figure earns its place; no filler stats.

Examples (verbatim brand voice):
- Eyebrow: `AGENCE WEB · PARIS ✦ FRONT-END & DESIGN`
- CTA: `Évaluez votre site web`, `Lancer l'évaluation`, `Voir nos réalisations`
- Stat: **64%** — "du trafic internet mondial provient du mobile"
- Reassurance: "Répondez à notre questionnaire et obtenez une évaluation
  personnalisée de votre site en moins de 3 minutes."

---

## VISUAL FOUNDATIONS

**Colour.** A deep-indigo **neutral** scale (`--neutral-0` … `--neutral-900`,
ending at `#1e1244`) carries every surface and the night-sky backgrounds. On top
sits the signature **four-service "rainbow"**, each a full 50→900 ramp:
- **dev → cyan** `#0fc7d2 / #3fd2db`
- **project → green** `#9fdf6c`
- **design → yellow** `#fdc500`
- **com → magenta** `#de3d64`

The four pure hues together form `--gradient-rainbow` (hard-stop bands — the
"rainbow road" under the wordmark) and `--gradient-rainbow-smooth`. Status colours
*reuse* these families (info=cyan, success=green, warning=yellow, error=magenta).

**Type.** Two faces only:
- **Neue Machina** (Ultrabold 700) — geometric display face for the logo, all
  headings and big numbers. Set tight (`line-height` ~1.05–1.15), frequently
  UPPERCASE. Light 300 / Regular 400 exist but display work is almost always 700.
- **Space Mono** (400/700) — *everything else*: body, UI, labels, code. Roomy
  body line-height **1.8**. The monospace body is a deliberate signature, giving
  the brand a techy, "mission-control" texture.

**Backgrounds — light-first.** Pages are **light**: `body` is a subtle
white→`--neutral-0` (lilac) vertical gradient with dark text. The cosmos shows up
as **dark rounded "cosmic cards"** dropped into the light flow — the home hero and
the contact CTA are deep-indigo cards (`border-radius: 2.25rem` / `--radius-l`)
with a CSS starfield, white text and floating planet/character PNGs (gentle 6s
`tm-float` loop). The **footer** is the one full-bleed dark zone. So the rhythm is
light section → light section → dark card → light section, not an all-dark page.
Service/expertise cards are tinted with the family's `--surface-*` (light cyan,
yellow, pink, green). Planets are warm accents that pop against both the light
page and the dark cards.

**Layout.** Centred max-width container (~1024–1180px), generous vertical rhythm
(`--space-section` 100px between big sections). Section heads use a mono UPPERCASE
kicker → short rainbow rule → display title.

**Cards.** Two flavours: light (`#fff`, `--radius-m` 8px, 1px neutral border,
soft cool-tinted `--shadow-md`) and **frosted dark** (translucent white 4–6%,
`backdrop-filter: blur`, hairline indigo border) for use on space backgrounds.
Corners are soft (8px); pills/buttons fully rounded (`--radius-l` 100px).

**Buttons.** Pill-shaped, weight 700, with the signature **radial "overlay"
bloom** on hover — a small circle scales up from the bottom to wash the button in
a lighter shade. Service variants colour the fill (cyan/yellow/green/magenta);
primary is indigo. Trailing icons nudge right on hover.

**Motion.** Calm and purposeful. `ease-in-out`, ~0.3s for interactions; scroll-in
text-appear (fade + 3rem rise); slow infinite float for planets; a 2s linear
spin for the occasional rotating accent. Everything respects
`prefers-reduced-motion`. No bounces, no aggressive parallax beyond the giant
ghost "THATMUCH" wordmark in the footer.

**Hover / press.** Links: colour shift to `--text-link` + underline offset.
Buttons: the overlay bloom (not a colour swap). Social icons: fill with cyan and
lift `-3px`. Focus: 3px outline / cyan glow ring on inputs.

**Borders & shadows.** Hairline borders (`--neutral-50` light, white-12–18% on
dark). Shadows are soft and **cool-indigo-tinted**, never neutral grey:
`--shadow-sm/md/lg`. Optional cyan/magenta glows for emphasis.

---

## ICONOGRAPHY

- **UI icons:** the production site uses **Font Awesome 6** (brand icons in the
  footer — Instagram, TikTok, LinkedIn, Spotify, YouTube, Bluesky — and a few
  solid glyphs) plus **react-icons** (`FaStar` for ratings). The website UI kit
  loads **Font Awesome 6.5.2 from CDN** for the social row. ➜ *Substitution note:*
  no icon font was shipped in the upload set, so the system links Font Awesome
  from CDN rather than self-hosting. If you want pixel-exact parity, drop the
  agency's own FA kit / SVGs into `assets/icons/` and swap the CDN link.
- **The real "icon system" is the cosmos illustration set** — planets and
  characters in `assets/planets/` and `assets/characters/`. Use these as the
  decorative/iconographic layer instead of drawing new SVGs. They're PNGs with
  transparency, meant to float over dark backgrounds.
- **The Star** (four-point sparkle) is the one brand glyph rendered as code
  (`<Star/>`) — it appears beside the logo and as scattered accents.
- **Emoji:** essentially not used as iconography (rare wink only).
- Arrows: simple `→` chevrons inside buttons/links, animated on hover.

---

## Index / manifest

**Root**
- `styles.css` — the single entry point consumers link (`@import`s only).
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`,
  `base.css` (element defaults), `components.css` (component classes).
- `assets/` — `logos/`, `brand/` (cover, comets), `planets/`, `characters/`,
  `blog/` (16 article placeholders, 4 per service family), `fonts/` (woff2).
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand).
- `SKILL.md` — Agent-Skills wrapper.

**Components** (`window.THATMUCHDesignSystem_*` once `_ds_bundle.js` is built)
- `components/buttons/` — **Button**
- `components/forms/` — **Input, Textarea, Checkbox, Radio, Switch**
- `components/data-display/` — **Tag, Badge, Card** (+CardBody/CardFooter),
  **Avatar, StatCard**
- `components/feedback/` — **Tooltip**
- `components/brand/` — **Star, Logo, Planet, RainbowDivider**

**UI kit**
- `ui_kits/website/` — light marketing site. `index.html` (home): header +
  slide-in menu, dark cosmic hero card, logo marquee, expertises, portfolio,
  testimonials, contact CTA, footer. Plus two **expertise detail** pages —
  `expertise.html` (Web design / yellow) and `expertise-dev.html`
  (Développement web / cyan): page header, tinted service cards, process steps,
  contact CTA, related articles.

**Using a component in a card / page**
```html
<link rel="stylesheet" href="/styles.css" />
<script src="/_ds_bundle.js"></script>
<script type="text/babel">
  const { Button, Card, Tag } = window.THATMUCHDesignSystem_3082a3;
</script>
```
