interface CactusProps {
  x: number
  h: number
  w: number
  arm: 'left' | 'right' | 'none'
  /** Линия земли */
  ground: number
}

const FILL = '#3a5a8c'

export const Cactus = ({ x, h, w, arm, ground }: CactusProps) => {
  const top = ground - h
  const body = (
    <g fill={FILL}>
      <rect x={x - w / 2} y={top} width={w} height={h + 8} rx={w / 2} />
      {arm !== 'none' && (
        <>
          <rect x={arm === 'right' ? x : x - w * 1.6} y={top + h * 0.45} width={w * 1.6} height={w * 0.7} rx={w * 0.35} />
          <rect
            x={arm === 'right' ? x + w * 1.6 - w * 0.7 : x - w * 1.6}
            y={top + h * 0.25}
            width={w * 0.7}
            height={h * 0.3}
            rx={w * 0.35}
          />
        </>
      )}
    </g>
  )
  return (
    <g>
      {body}
      {/* тень на земле */}
      <g opacity="0.35" transform={`translate(${x} ${ground}) scale(1 -0.9) skewX(-22) translate(${-x} ${-ground})`}>
        {body}
      </g>
    </g>
  )
}
