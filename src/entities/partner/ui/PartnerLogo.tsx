import type { Partner } from '../model/partners'

export const PartnerLogo = ({ partner }: { partner: Partner }) => (
  <div className="flex h-[130px] items-center justify-center">
    <img
      src={partner.logo}
      alt={partner.name}
      width={partner.width}
      height={partner.height}
      loading="lazy"
      className="max-h-[110px] w-auto max-w-[78%] object-contain opacity-90 grayscale-[0.35] transition-all duration-500 hover:scale-110 hover:opacity-100 hover:grayscale-0 sm:max-w-full"
    />
  </div>
)
