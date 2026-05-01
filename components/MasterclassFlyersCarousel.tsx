'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { Masterclass } from '@/lib/strapi'
import { useCarousel, SWIPE_THRESHOLD_PX, SLIDE_DURATION_MS } from '@/hooks/useCarousel'

const ICON_COLORS = [
  'rgb(31, 143, 143)',
  'rgb(217, 119, 87)',
  'rgb(201, 162, 39)',
]

const ICON_TYPES = ['circles', 'smiles', 'clock'] as const

const ICON_COMPONENTS = {
  circles: (
    <svg width="100%" height="100%" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="44" fill="none" stroke="#F1EADC" strokeWidth="6"></circle>
      <circle cx="50" cy="50" r="28" fill="none" stroke="#F1EADC" strokeWidth="6"></circle>
      <circle cx="50" cy="50" r="10" fill="#F1EADC"></circle>
    </svg>
  ),
  smiles: (
    <svg width="100%" height="100%" viewBox="0 0 100 100">
      <path d="M 14 70 A 18 18 0 0 1 50 70" fill="none" stroke="#F1EADC" strokeWidth="7" strokeLinecap="round"></path>
      <path d="M 38 56 A 22 22 0 0 1 82 56" fill="none" stroke="#F1EADC" strokeWidth="7" strokeLinecap="round"></path>
      <circle cx="14" cy="70" r="5" fill="#F1EADC"></circle>
      <circle cx="50" cy="70" r="5" fill="#F1EADC"></circle>
      <circle cx="38" cy="56" r="5" fill="#F1EADC"></circle>
      <circle cx="82" cy="56" r="5" fill="#F1EADC"></circle>
    </svg>
  ),
  clock: (
    <svg width="100%" height="100%" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="38" fill="none" stroke="#F1EADC" strokeWidth="6" strokeDasharray="180 40" transform="rotate(-90 50 50)" strokeLinecap="round"></circle>
      <line x1="50" y1="50" x2="50" y2="22" stroke="#F1EADC" strokeWidth="6" strokeLinecap="round"></line>
      <line x1="50" y1="50" x2="72" y2="50" stroke="#F1EADC" strokeWidth="6" strokeLinecap="round"></line>
      <circle cx="50" cy="50" r="6" fill="#F1EADC"></circle>
    </svg>
  ),
}

function FlyerCard({ flyer, colorIndex, isMobile }: { flyer: Masterclass; colorIndex: number; isMobile: boolean }) {
  const topicColor = ICON_COLORS[colorIndex % 3]
  const iconType = ICON_TYPES[colorIndex % 3]
  const iconSvg = ICON_COMPONENTS[iconType]

  if (isMobile) {
    return (
      <div className="w-full min-h-72 bg-arena text-black p-4 flex flex-col gap-2">
        <div className="flex justify-between items-center gap-2">
          <div className="inline-flex items-center gap-1.5 border border-black rounded-full px-2 py-1">
            <span className="w-4 h-4 rounded-full bg-black text-arena text-xs font-bold flex items-center justify-center">{flyer.initials}</span>
            <span className="text-xs font-semibold">{flyer.presenter}</span>
          </div>
          <div className="font-black text-xs opacity-55 whitespace-nowrap">{flyer.date}</div>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="bg-black text-arena font-black text-xs px-2.5 py-1 rounded-full uppercase">MasterClass</div>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: topicColor }}></div>
        </div>

        <h2 className="font-black text-lg leading-tight uppercase" style={{ color: topicColor }}>{flyer.topic}</h2>

        <h3 className="font-bold text-sm leading-tight">{flyer.title}</h3>

        <p className="text-xs leading-relaxed opacity-86 line-clamp-2 flex-grow">{flyer.description}</p>

        <div className="border-t border-black pt-1.5 text-xs font-semibold uppercase flex justify-between">
          <span>WORKING&CO</span>
          <span className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full" style={{ background: topicColor }}></span>
            <span className="text-xs">{flyer.category}</span>
          </span>
          <span>2026</span>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-[500px] lg:min-h-[600px] xl:min-h-[700px] bg-arena text-black grid grid-cols-[1fr_280px] lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_400px] gap-8 lg:gap-12 xl:gap-16 p-6 lg:p-10 xl:p-12">
      <div className="flex flex-col justify-between min-w-0">
        <div className="flex justify-between items-center">
          <div className="inline-flex items-center gap-2 border border-black rounded-full px-3 py-1.5">
            <span className="w-5 h-5 rounded-full bg-black text-arena text-xs font-black flex items-center justify-center">{flyer.initials}</span>
            <span className="text-sm font-semibold">{flyer.presenter}</span>
          </div>
          <div className="font-black text-sm lg:text-base opacity-55">{flyer.date}</div>
        </div>

        <div className="mt-4 flex items-center gap-2 lg:gap-3">
          <div className="bg-black text-arena font-black text-base lg:text-lg px-4 lg:px-5 py-2.5 lg:py-3 rounded-full uppercase">MasterClass</div>
          <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full" style={{ background: topicColor }}></div>
        </div>

        <h2 className="font-black text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-none mt-3 uppercase overflow-hidden" style={{ color: topicColor }}>{flyer.topic}</h2>

        <h3 className="font-black text-xl lg:text-2xl xl:text-3xl leading-tight mt-3">{flyer.title}</h3>

        <p className="text-base lg:text-lg xl:text-xl leading-relaxed opacity-80 mt-4">{flyer.description}</p>

        <div className="border-t border-black pt-2.5 text-xs font-semibold uppercase flex justify-between mt-auto">
          <span>WORKING&CO</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: topicColor }}></span>
            {flyer.category}
          </span>
          <span>2026</span>
        </div>
      </div>

      <div className="flex items-center justify-center h-full relative">
        <div className="w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden relative" style={{ background: topicColor }}>
          {flyer.imageUrl && (
            <Image
              src={flyer.imageUrl}
              alt={flyer.presenter}
              fill
              sizes="(max-width: 1024px) 280px, (max-width: 1280px) 320px, 400px"
              style={{ objectFit: 'cover' }}
              priority={false}
            />
          )}
        </div>
        <div className="absolute -left-3 -bottom-3 lg:-left-4 lg:-bottom-4 w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-black flex items-center justify-center p-4 lg:p-5 border-2 border-arena">
          {iconSvg}
        </div>
      </div>
    </div>
  )
}

interface Props {
  masterclasses?: Masterclass[]
}

export function MasterclassFlyersCarousel({ masterclasses = [] }: Props) {
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [touchStartX, setTouchStartX] = useState(0)

  const carousel = useCarousel(masterclasses.length)

  useEffect(() => {
    setIsClient(true)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleTouchStart = (e: Event) => {
      const touch = e as TouchEvent
      setTouchStartX(touch.changedTouches[0].screenX)
    }

    const handleTouchEnd = (e: Event) => {
      const touch = e as TouchEvent
      const touchEndX = touch.changedTouches[0].screenX
      if (touchStartX - touchEndX > SWIPE_THRESHOLD_PX) {
        carousel.setIsPaused(true)
        carousel.handleDotClick((carousel.currentIndex + 1) % masterclasses.length)
        setTimeout(() => carousel.setIsPaused(false), SLIDE_DURATION_MS)
      } else if (touchEndX - touchStartX > SWIPE_THRESHOLD_PX) {
        carousel.setIsPaused(true)
        carousel.handleDotClick((carousel.currentIndex - 1 + masterclasses.length) % masterclasses.length)
        setTimeout(() => carousel.setIsPaused(false), SLIDE_DURATION_MS)
      }
    }

    const section = document.querySelector('section[data-carousel]')
    section?.addEventListener('touchstart', handleTouchStart as EventListener, false)
    section?.addEventListener('touchend', handleTouchEnd as EventListener, false)

    return () => {
      section?.removeEventListener('touchstart', handleTouchStart as EventListener)
      section?.removeEventListener('touchend', handleTouchEnd as EventListener)
    }
  }, [touchStartX, carousel, masterclasses.length])

  if (!isClient || masterclasses.length === 0) {
    return (
      <section className="w-full py-8 px-4 text-center">
        <p className="text-gray-500">Próximamente — masterclasses en preparación</p>
      </section>
    )
  }

  const currentFlyer = masterclasses[carousel.currentIndex]
  const displayFlyer = carousel.nextIndex !== null ? masterclasses[carousel.nextIndex] : currentFlyer
  const displayIndex = carousel.nextIndex !== null ? carousel.nextIndex : carousel.currentIndex

  return (
    <section
      data-carousel
      className="w-full overflow-hidden relative"
      onMouseEnter={carousel.handleMouseEnter}
      onMouseLeave={carousel.handleMouseLeave}
    >
      <style>{`
        @keyframes slideInFromLeft {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInFromRight {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutToLeft {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(-100%); opacity: 0; }
        }
        @keyframes slideOutToRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
        .flyer-enter {
          animation: ${carousel.slideDirection === 'left' ? 'slideInFromLeft' : 'slideInFromRight'} 0.5s ease-in-out forwards;
        }
        .flyer-exit {
          animation: ${carousel.slideDirection === 'left' ? 'slideOutToLeft' : 'slideOutToRight'} 0.5s ease-in-out forwards;
        }
      `}</style>

      {carousel.nextIndex !== null && (
        <div className="flyer-exit absolute w-full h-full z-10">
          <FlyerCard flyer={currentFlyer} colorIndex={carousel.currentIndex} isMobile={isMobile} />
        </div>
      )}

      <div className={carousel.nextIndex !== null ? 'flyer-enter' : ''}>
        <FlyerCard flyer={displayFlyer} colorIndex={displayIndex} isMobile={isMobile} />
      </div>

      {/* Preload next image */}
      {masterclasses.length > 1 && (
        <link rel="preload" as="image" href={masterclasses[(carousel.currentIndex + 1) % masterclasses.length].imageUrl} />
      )}

      {/* Navigation */}
      {masterclasses.length > 1 && (
        <div className={`flex items-center justify-center gap-4 z-20 relative ${isMobile ? 'flex-col py-4' : 'absolute bottom-5 left-1/2 -translate-x-1/2'}`}>
          <span className="text-xs font-semibold text-arena opacity-70 uppercase tracking-wider" role="status" aria-live="polite">
            {carousel.currentIndex + 1} / {masterclasses.length}
          </span>
          <div className={`flex ${isMobile ? 'gap-2.5' : 'gap-3'}`}>
            {masterclasses.map((_, idx) => (
              <button
                key={idx}
                onClick={() => carousel.handleDotClick(idx)}
                className={`rounded-full border-none cursor-pointer transition-all focus-visible:ring-2 focus-visible:ring-arena focus-visible:ring-offset-2 ${isMobile ? 'w-2.5 h-2.5 p-1' : 'w-3 h-3'}`}
                style={{
                  background: idx === carousel.currentIndex ? 'rgb(241, 234, 220)' : 'rgba(241, 234, 220, 0.4)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = idx === carousel.currentIndex ? 'rgb(241, 234, 220)' : 'rgba(241, 234, 220, 0.6)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = idx === carousel.currentIndex ? 'rgb(241, 234, 220)' : 'rgba(241, 234, 220, 0.4)'
                }}
                aria-label={`Ir al masterclass ${idx + 1}`}
                aria-current={idx === carousel.currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
