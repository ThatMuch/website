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

/* ── Bloc « La méthode » ─────────────────────────────────────────────── */

export interface Etape {
  titre: string
  texte: string
}

export interface BlocEtapes {
  kicker?: string
  titre: string
  intro?: string
  /** Ordonnées : la numérotation 01, 02… est calculée à l'affichage. */
  etapes: Etape[]
}

/* ── Bloc « Ce que vous gagnez » ─────────────────────────────────────── */

export interface BeneficeCarte {
  scope: Scope
  tag_label: string
  planete?: BlockImage | null
  titre: string
  texte: string
}

export interface BlocBenefices {
  kicker?: string
  titre: string
  cartes: BeneficeCarte[]
}

/* ── Bloc « Pourquoi THATMUCH » ──────────────────────────────────────── */

export interface PourquoiCarte {
  titre: string
  texte: string
}

export interface BlocPourquoi {
  kicker?: string
  titre: string
  intro?: string
  cartes: PourquoiCarte[]
}

/* ── Bloc « Chiffres clés » ──────────────────────────────────────────── */

export interface Stat {
  valeur: string
  libelle: string
  /** Pôle donnant la couleur du chiffre. */
  couleur: Scope
}

export interface BlocStats {
  stats: Stat[]
}

/* ── Enveloppe ───────────────────────────────────────────────────────── */

export interface ThatmuchBlock {
  name: string
  order: number
  probleme?: BlocProbleme | null
  faites_le_test?: CTABlock | null
  promesse?: BlocPromesse | null
  etapes?: BlocEtapes | null
  benefices?: BlocBenefices | null
  pourquoi?: BlocPourquoi | null
  stats?: BlocStats | null
}
