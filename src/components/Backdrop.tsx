/**
 * Fond de page : ton image (lignes dorées sur cuir noir), fixe derrière tout le site.
 * Téléphone : /fond.jpg (en hauteur). Ordinateur : /fond-large.jpg (la même, couchée).
 * Pour changer de fond, remplace ces deux fichiers dans le dossier public.
 */
export default function Backdrop() {
  return <div className="backdrop" aria-hidden="true" />
}
