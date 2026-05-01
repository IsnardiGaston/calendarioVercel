'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { Masterclass } from '@/lib/strapi'

const ICON_COLORS = [
  'rgb(31, 143, 143)',   // Teal
  'rgb(217, 119, 87)',   // Orange
  'rgb(201, 162, 39)',   // Gold
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

function FlyerCard({ flyer, colorIndex }: { flyer: Masterclass; colorIndex: number }) {
  const topicColor = ICON_COLORS[colorIndex % 3]
  const iconType = ICON_TYPES[colorIndex % 3]
  const iconSvg = ICON_COMPONENTS[iconType]

  return (
    <div
      style={{
        width: '100%',
        height: '600px',
        background: 'rgb(241, 234, 220)',
        color: 'rgb(14, 27, 27)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Inter, system-ui, sans-serif',
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: '44px',
        padding: '36px 48px 28px',
        boxSizing: 'border-box',
      }}
    >
      {/* Left Content */}
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, height: '100%' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              border: '1.5px solid rgb(14, 27, 27)',
              borderRadius: '999px',
              padding: '6px 13px 6px 7px',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.02em',
            }}
          >
            <span
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: 'rgb(14, 27, 27)',
                color: 'rgb(241, 234, 220)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: 800,
              }}
            >
              {flyer.initials}
            </span>
            <span>{flyer.presenter}</span>
          </div>
          <div
            style={{
              fontFamily: 'Archivo, sans-serif',
              fontWeight: 800,
              fontSize: '15px',
              letterSpacing: '0.08em',
              opacity: 0.55,
            }}
          >
            {flyer.date}
          </div>
        </div>

        {/* MasterClass Label */}
        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              background: 'rgb(14, 27, 27)',
              color: 'rgb(241, 234, 220)',
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: '22px',
              letterSpacing: '0.04em',
              padding: '11px 22px',
              borderRadius: '999px',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
          >
            MasterClass
          </div>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: topicColor,
            }}
          ></div>
        </div>

        {/* Topic Title */}
        <div style={{ marginTop: '14px' }}>
          <div
            style={{
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: '89px',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              color: topicColor,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              display: 'inline-block',
            }}
          >
            {flyer.topic}
          </div>
        </div>

        {/* Main Title */}
        <h1
          style={{
            margin: '14px 0px 0px',
            fontFamily: 'Archivo, sans-serif',
            fontWeight: 800,
            fontSize: '28px',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: 'rgb(14, 27, 27)',
            maxWidth: '760px',
          }}
        >
          {flyer.title}
        </h1>

        {/* Description */}
        <p
          style={{
            marginTop: '18px',
            marginBottom: 0,
            fontFamily: 'Inter, sans-serif',
            fontSize: '19px',
            lineHeight: 1.42,
            color: 'rgb(14, 27, 27)',
            opacity: 0.86,
            maxWidth: '760px',
            fontWeight: 400,
          }}
        >
          {flyer.description}
        </p>

        {/* Spacer */}
        <div style={{ flex: '1 1 0%' }}></div>

        {/* Footer */}
        <div
          style={{
            borderTop: '1px solid rgb(14, 27, 27)',
            paddingTop: '11px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          <span>WORKING&CO</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: topicColor,
              }}
            ></span>
            {flyer.category}
          </span>
          <span>2026</span>
        </div>
      </div>

      {/* Right Image */}
      <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '24px',
            overflow: 'hidden',
            position: 'relative',
            background: topicColor,
          }}
        >
          {flyer.imageUrl && (
            <Image
              src={flyer.imageUrl}
              alt={flyer.presenter}
              fill
              sizes="100%"
              style={{
                objectFit: 'cover',
              }}
            />
          )}
        </div>
        <div
          style={{
            position: 'absolute',
            left: '-16px',
            bottom: '-16px',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgb(14, 27, 27)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            boxSizing: 'border-box',
            border: '3px solid rgb(241, 234, 220)',
          }}
        >
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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState<number | null>(null)
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left')

  if (!masterclasses || masterclasses.length === 0) {
    return null
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setNextIndex((currentIndex + 1) % masterclasses.length)
      setSlideDirection('left')
    }, 8000)

    return () => clearInterval(interval)
  }, [currentIndex, masterclasses.length])

  useEffect(() => {
    if (nextIndex !== null) {
      const timer = setTimeout(() => {
        setCurrentIndex(nextIndex)
        setNextIndex(null)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [nextIndex])

  const handleDotClick = (index: number) => {
    if (index > currentIndex) {
      setSlideDirection('left')
    } else if (index < currentIndex) {
      setSlideDirection('right')
    }
    setNextIndex(index)
  }

  const currentFlyer = masterclasses[currentIndex]
  const displayFlyer = nextIndex !== null ? masterclasses[nextIndex] : currentFlyer
  const displayIndex = nextIndex !== null ? nextIndex : currentIndex

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes slideInFromLeft {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInFromRight {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutToLeft {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(-100%);
            opacity: 0;
          }
        }

        @keyframes slideOutToRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .flyer-enter {
          animation: ${slideDirection === 'left' ? 'slideInFromLeft' : 'slideInFromRight'} 0.5s ease-in-out forwards;
        }

        .flyer-exit {
          animation: ${slideDirection === 'left' ? 'slideOutToLeft' : 'slideOutToRight'} 0.5s ease-in-out forwards;
        }
      `}</style>

      {/* Current Flyer (exiting) */}
      {nextIndex !== null && (
        <div className="flyer-exit" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}>
          <FlyerCard flyer={currentFlyer} colorIndex={currentIndex} />
        </div>
      )}

      {/* Display Flyer (entering or static) */}
      <div className={nextIndex !== null ? 'flyer-enter' : ''} style={{ position: 'relative', width: '100%', zIndex: 2 }}>
        <FlyerCard flyer={displayFlyer} colorIndex={displayIndex} />
      </div>

      {/* Dots Navigation */}
      {masterclasses.length > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            zIndex: 100,
          }}
        >
          {masterclasses.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                background: idx === currentIndex ? 'rgb(241, 234, 220)' : 'rgba(241, 234, 220, 0.4)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = idx === currentIndex ? 'rgb(241, 234, 220)' : 'rgba(241, 234, 220, 0.6)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = idx === currentIndex ? 'rgb(241, 234, 220)' : 'rgba(241, 234, 220, 0.4)'
              }}
              aria-label={`Ir al masterclass ${idx + 1}`}
              aria-current={idx === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      )}
    </section>
  )
}
