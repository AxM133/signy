import { appScreenshot } from '@/shared/assets/images'

/** Скриншот интерфейса в «окне браузера» с лёгким наклоном при наведении. */
export const Screenshot = () => (
  <div className="group [perspective:1200px]">
    <div className="overflow-hidden rounded-lg bg-white shadow-[0_30px_60px_-24px_rgba(16,100,229,0.45)] ring-1 ring-night/5 transition-transform duration-700 ease-out group-hover:[transform:rotateY(-4deg)_rotateX(2deg)_scale(1.02)]">
      <div className="flex h-6 items-center gap-1.5 bg-slate-100 px-3" aria-hidden="true">
        <span className="size-2 rounded-full bg-red-300" />
        <span className="size-2 rounded-full bg-amber-300" />
        <span className="size-2 rounded-full bg-green-300" />
      </div>
      <img src={appScreenshot} alt="Интерфейс сервиса Signy: список контрагентов" width={596} height={338} loading="lazy" className="block h-auto w-full" />
    </div>
  </div>
)
