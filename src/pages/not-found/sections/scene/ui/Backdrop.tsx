import { cacti, stars } from '../model/content'
import { Cactus } from './Cactus'

const GROUND = 596

/** Пустынный фон: облака, луна, звёзды, плато и кактусы. */
export const Backdrop = () => (
  <svg
    viewBox="0 0 1440 833"
    preserveAspectRatio="xMidYMax slice"
    className="absolute inset-0 size-full"
    aria-hidden="true"
  >
    {/* облака */}
    <g fill="#f1f7fd">
      <circle cx="230" cy="520" r="120" />
      <circle cx="420" cy="470" r="110" />
      <circle cx="640" cy="500" r="100" />
      <circle cx="880" cy="450" r="130" />
      <circle cx="1130" cy="440" r="120" />
      <circle cx="1360" cy="470" r="110" />
      <rect x="0" y="500" width="1440" height="100" />
    </g>

    {/* луна */}
    <g className="animate-float" style={{ transformOrigin: '1085px 368px' }}>
      <circle cx="1085" cy="368" r="82" fill="#e5f3f4" />
      <circle cx="1085" cy="368" r="72" fill="#d6edee" />
    </g>

    {/* звёзды */}
    {stars.map((s) => (
      <path
        key={`${s.x}-${s.y}`}
        d="M0-1 .22-.22 1 0 .22.22 0 1-.22.22-1 0-.22-.22z"
        fill="#bfe3ec"
        transform={`translate(${s.x} ${s.y}) scale(${s.s})`}
        className="animate-twinkle"
        style={{ transformOrigin: `${s.x}px ${s.y}px`, animationDelay: `${s.d}s`, transformBox: 'fill-box' }}
      />
    ))}

    {/* плато */}
    <g fill="#6a99df">
      <path d="M760 596V458H872L905 494H995L1080 405H1440V596Z" />
      <path d="M413 596V480H507C507 520 530 540 560 548V596Z" />
      <path d="M0 596V585C60 590 120 585 170 575C260 556 330 546 413 560V596Z" />
    </g>

    {/* земля */}
    <rect x="0" y={GROUND} width="1440" height="237" fill="#3d5a87" />

    {cacti.map((c) => (
      <Cactus key={c.x} ground={GROUND} {...c} />
    ))}
  </svg>
)
