import type { ComponentType, SVGProps } from 'react'
import { FacebookIcon, GoogleIcon, LinkedinIcon, TwitterIcon } from '@/shared/ui'

export interface ShareTarget {
  id: string
  label: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  href: (url: string, title: string) => string
}

const enc = encodeURIComponent

export const shareTargets: ShareTarget[] = [
  { id: 'twitter', label: 'Twitter', Icon: TwitterIcon, href: (u, t) => `https://twitter.com/intent/tweet?url=${enc(u)}&text=${enc(t)}` },
  { id: 'linkedin', label: 'LinkedIn', Icon: LinkedinIcon, href: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${enc(u)}` },
  { id: 'gmail', label: 'Gmail', Icon: GoogleIcon, href: (u, t) => `https://mail.google.com/mail/?view=cm&su=${enc(t)}&body=${enc(u)}` },
  { id: 'facebook', label: 'Facebook', Icon: FacebookIcon, href: (u) => `https://www.facebook.com/sharer/sharer.php?u=${enc(u)}` },
]
