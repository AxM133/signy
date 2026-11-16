import { logoHlib, logoNix, logoNovaposhta, logoUkroboronprom } from '@/shared/assets/images'

export interface Partner {
  id: string
  name: string
  logo: string
  width: number
  height: number
}

export const partners: Partner[] = [
  { id: 'ukroboronprom', name: 'Укроборонпром', logo: logoUkroboronprom, width: 188, height: 114 },
  { id: 'novaposhta', name: 'Нова пошта', logo: logoNovaposhta, width: 219, height: 86 },
  { id: 'nix', name: 'N-iX', logo: logoNix, width: 169, height: 69 },
  { id: 'hlib', name: 'Просто добрий хліб', logo: logoHlib, width: 139, height: 130 },
]
