import { CtaAccent } from './Shapes'
import { Button, CmsImage, Headline } from './ui'

type Cta = {
  eyebrow?: string | null
  title?: string | null
  text?: string | null
  buttonLabel?: string | null
  buttonLink?: string | null
  image?: unknown
}

export const CtaBanner = ({ cta }: { cta?: Cta | null }) => {
  if (!cta?.title) return null
  return (
    <section className="cta">
      <div className="cta__image">
        <CmsImage media={cta.image} sizes="(max-width: 1023px) 100vw, 25vw" />
      </div>
      <div className="cta__band">
        <CtaAccent />
        <div className="cta__inner">
          <div className="cta__head">
            {cta.eyebrow && <p className="eyebrow eyebrow--light">{cta.eyebrow}</p>}
            <h2>
              <Headline text={cta.title} />
            </h2>
          </div>
          {cta.text && <p className="cta__text">{cta.text}</p>}
          {cta.buttonLabel && (
            <Button href={cta.buttonLink || '/contact'} variant="white" className="cta__btn">
              {cta.buttonLabel}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
