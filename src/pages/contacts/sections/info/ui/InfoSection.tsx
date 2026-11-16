import { MapPin, Phone } from 'lucide-react'
import { map } from '@/shared/assets/images'
import { toTel } from '@/shared/config/site'
import { Reveal } from '@/shared/ui'
import { contactsInfo } from '../model/contacts'

export const InfoSection = () => (
  <>
    <Reveal y={14}>
      <p className="max-w-[500px] text-[17px] leading-[27px] text-ink">{contactsInfo.intro}</p>
      <ul className="mt-3 flex flex-col gap-2 text-[17px] leading-[26px] text-ink">
        <li className="flex items-start gap-5">
          <Phone className="mt-0.5 size-6 shrink-0 fill-brand text-brand" aria-hidden="true" />
          <div className="flex flex-col">
            {contactsInfo.phones.map((phone) => (
              <a key={phone} href={toTel(phone)} className="py-[3px] transition-colors hover:text-brand">
                {phone}
              </a>
            ))}
          </div>
        </li>
        <li className="flex items-center gap-5">
          <svg viewBox="0 0 24 24" className="size-6 shrink-0" aria-hidden="true">
            <rect x="2" y="5" width="20" height="14" rx="2" fill="#1064e5" />
            <path d="M3.5 7.5 12 13.5l8.500-6" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <a href={`mailto:${contactsInfo.email}`} className="transition-colors hover:text-brand">
            {contactsInfo.email}
          </a>
        </li>
        <li className="flex items-center gap-5">
          <MapPin className="size-6 shrink-0 fill-brand text-white" aria-hidden="true" />
          <span>{contactsInfo.address}</span>
        </li>
      </ul>
    </Reveal>

    <Reveal delay={0.1} x={24} y={0} className="lg:col-start-2 lg:row-start-1">
      <a
        href={contactsInfo.mapLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Открыть адрес на карте"
        className="group relative block overflow-hidden rounded-[4px] shadow-[0_20px_40px_-24px_rgba(6,18,36,0.5)]"
      >
        <img src={map} alt="Карта: проспект Бажана, 14А, Киев" width={605} height={249} className="aspect-[605/249] w-full object-cover transition-transform duration-700 group-hover:scale-105 max-sm:aspect-[4/3]" />
        <span className="absolute inset-x-0 bottom-0 translate-y-full bg-night/80 py-2 text-center text-[12px] tracking-[0.15em] text-white uppercase transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">
          Открыть на карте
        </span>
      </a>
    </Reveal>
  </>
)
