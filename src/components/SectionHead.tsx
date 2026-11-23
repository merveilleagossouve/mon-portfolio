/** Les textes d'un en-tête de section, tels qu'ils sont rangés dans content.ts. */
type Copy = { meta: string; titleA: string; titleB: string; aside?: string }

/** En-tête de section : le petit sur-titre, le grand titre (fin en italique) et, parfois, une phrase à côté. */
export default function SectionHead({ copy }: { copy: Copy }) {
  return (
    <div className="section-head">
      <p className="section-head__meta mono">{copy.meta}</p>
      <h2 className="section-head__title" data-reveal>
        {copy.titleA} <em>{copy.titleB}</em>
      </h2>
      {copy.aside && (
        <div className="section-head__aside">
          <p>{copy.aside}</p>
        </div>
      )}
    </div>
  )
}
