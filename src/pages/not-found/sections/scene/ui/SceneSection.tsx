import { paths } from '@/shared/config/routes'
import { Button } from '@/shared/ui'
import { notFoundContent } from '../model/content'
import { Backdrop } from './Backdrop'
import { Ufo } from './Ufo'

export const SceneSection = () => (
  <section
    aria-labelledby="nf-title"
    className="relative -mt-16 h-[740px] overflow-hidden bg-white sm:h-[780px] lg:-mt-20 lg:h-[833px]"
  >
    <Backdrop />

    <div className="absolute inset-x-0 bottom-[215px] flex justify-center px-3 sm:bottom-[200px] lg:bottom-[175px]">
      <Ufo className="h-auto w-full max-w-[560px] lg:max-w-[600px]" />
    </div>

    <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-5 pb-10 text-center lg:pb-12">
      <h1 id="nf-title" className="max-w-[540px] text-[18px] leading-[30px] text-white lg:text-[22px]">
        {notFoundContent.message}
      </h1>
      <Button to={paths.home} variant="outline-light" size="md" className="mt-6">
        {notFoundContent.cta}
      </Button>
    </div>
  </section>
)
