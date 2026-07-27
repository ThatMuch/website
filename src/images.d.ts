/**
 * Déclarations d'ambiance pour les imports d'assets statiques.
 *
 * Webpack (via Gatsby) résout ces imports en URL, et Jest les redirige vers
 * __mocks__/fileMock.js — mais TypeScript, lui, n'en sait rien et remonte un
 * TS2307 sur chaque import. Ces déclarations comblent ce seul manque.
 *
 * Les .svg de ce projet sont importés comme URL (`src={icone}`), jamais comme
 * composants SVGR : `string` est donc le bon type. Les composants SVG sont
 * générés séparément en .js via @svgr/cli.
 */

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}
