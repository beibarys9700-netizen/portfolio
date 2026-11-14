"use client";
import { site } from "@/lib/content";
import { useT } from "./Providers";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { TextAnimate } from "@/components/ui/text-animate";
import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/ui/scroll-based-velocity";
import Disintegrate from "./Disintegrate";
import InteractiveBg from "./InteractiveBg";

// Картинка героя: путь и пропорции (ширина / высота)
const HERO_IMAGE = "/lego.png";
const HERO_RATIO = 744 / 948;

export default function Hero() {
  const { t } = useT();
  return (
    <section id="top" className="relative h-screen min-h-[640px] bg-sage overflow-hidden text-white">
      <InteractiveBg />
      {/* Персонаж: 3D-карточка (наклон за курсором) + рассыпание на кусочки при наведении */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center pointer-events-none">
        <CardContainer containerClassName="py-0 pointer-events-auto">
          <CardBody className="h-auto w-auto">
            <CardItem translateZ={60}>
              <Disintegrate src={HERO_IMAGE} ratio={HERO_RATIO} className="h-[52vh] sm:h-[62vh] md:h-[76vh] max-h-[820px]" />
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>

      {/* огромное имя, скорость зависит от скролла */}
      <div className="absolute left-0 bottom-[2vh] z-20 w-full pointer-events-none">
        <ScrollVelocityContainer className="font-medium tracking-[-0.04em] leading-none text-[34vw] md:text-[26vw]">
          <ScrollVelocityRow baseVelocity={6} direction={1}>{`${site.name} — `}</ScrollVelocityRow>
        </ScrollVelocityContainer>
      </div>

      {/* плашка локации */}
      <div className="absolute left-0 bottom-[22vh] md:top-[48%] md:bottom-auto z-30 flex items-center gap-2.5 md:gap-5 bg-ink text-paper rounded-r-full pl-4 md:pl-10 pr-3 md:pr-5 py-2 md:py-5 text-xs md:text-base leading-tight max-w-[190px] md:max-w-[300px] shadow-lg">
        <span>{t.location}</span>
        <span className="shrink-0 w-8 h-8 md:w-16 md:h-16 rounded-full bg-sage flex items-center justify-center">
          <svg className="spin-slow w-4 h-4 md:w-[34px] md:h-[34px]" viewBox="0 0 28 28" fill="none" stroke="rgb(22,21,26)" strokeWidth="1.5">
            <circle cx="14" cy="14" r="12" /><path d="M2 14h24M14 2c-6 6-6 18 0 24M14 2c6 6 6 18 0 24" />
          </svg>
        </span>
      </div>

      {/* роль: на мобилке аккуратно внизу слева/справа над бегущим именем */}
      <div className="absolute z-[60] pointer-events-none right-5 md:right-[10%] bottom-[22vh] md:top-[28%] md:bottom-auto text-right md:text-left">
        <div className="hidden md:block mb-8 text-3xl">↘</div>
        <div className="text-xs sm:text-sm md:text-5xl font-medium tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
          <div className="inline-block md:block mb-1 md:mb-0"><TextAnimate>{t.role[0]}</TextAnimate></div>{" "}
          <div className="inline-block md:block"><TextAnimate startDelay={0.6}>{t.role[1]}</TextAnimate></div>
        </div>
      </div>
    </section>
  );
}
