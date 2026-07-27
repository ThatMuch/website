/**
 * Types des blocs THATMUCH exposés par WPGraphQL.
 *
 * Miroir exact des types PHP déclarés dans le plugin thatmuch-blocks
 * (inc/graphql.php). Les noms de champs sont en snake_case côté WordPress :
 * on les garde tels quels pour éviter une couche de mapping.
 */

/** Les quatre pôles de la marque — pilotent la couleur des cartes et des tags. */
export type Scope = "com" | "design" | "dev" | "project"

export interface BlockImage {
  id: number
  url: string
  alt: string
  width: number
  height: number
}

/* ── Bloc « Le constat » ─────────────────────────────────────────────── */

export interface ProblemeCarte {
  scope: Scope
  tag_label: string
  titre: string
  texte: string
}

export interface BlocProbleme {
  kicker?: string
  titre: string
  intro?: string
  cartes: ProblemeCarte[]
}

/* ── Bloc « Faites le test » ─────────────────────────────────────────── */

export interface CTABlock {
  kicker?: string
  titre: string
  texte?: string
  bouton_label?: string
  bouton_url?: string
  illustration?: BlockImage | null
}


/* ── Bloc « Notre définition » ───────────────────────────────────────── */

export interface PromesseCarte {
  icone?: BlockImage | null
  titre: string
  texte: string
}

export interface BlocPromesse {
  kicker?: string
  titre: string
  /** HTML issu du champ wysiwyg — à assainir avant injection. */
  contenu?: string
  cartes: PromesseCarte[]
}

/* ── Enveloppe ───────────────────────────────────────────────────────── */

export interface ThatmuchBlock {
  name: string
  order: number
  probleme?: BlocProbleme | null
  faites_le_test?: CTABlock | null
  promesse?: BlocPromesse | null
}
