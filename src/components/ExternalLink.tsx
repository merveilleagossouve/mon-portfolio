import type { AnchorHTMLAttributes } from 'react'

/** Un lien vers un autre site : il s'ouvre dans un nouvel onglet, sans donner accès à la page d'origine. */
export default function ExternalLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a target="_blank" rel="noopener noreferrer" {...props} />
}
