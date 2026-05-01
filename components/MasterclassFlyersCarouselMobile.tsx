'use client'

import { useState, useEffect } from 'react'
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

function FlyerCardMobile({ flyer, colorIndex }: { flyer: Masterclass; colorIndex: number }) {
  const topicColor = ICON_COLORS[colorIndex % 3]
  const iconType = ICON_TYPES[colorIndex % 3]
  const iconSvg = ICON_COMPONENTS[iconType]

  return (
    <div
      style={{
        width: '100%',
        minHeight: '280px',
        background: 'rgb(241, 234, 220)',
        color: 'rgb(14, 27, 27)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Inter, system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 16px',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', gap: '8px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            border: '1.5px solid rgb(14, 27, 27)',
            borderRadius: '999px',
            padding: '3px 8px 3px 4px',
            fontSize: '9px',
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}
        >
          <span
            style={{
              width: '15px',
              height: '15px',
              borderRadius: '50%',
              background: 'rgb(14, 27, 27)',
              color: 'rgb(241, 234, 220)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '6px',
              fontWeight: 800,
            }}
          >
            {flyer.initials}
          </span>
          <span style={{ fontSize: '8px' }}>{flyer.presenter}</span>
        </div>
        <div
          style={{
            fontFamily: 'Archivo, sans-serif',
            fontWeight: 800,
            fontSize: '10px',
            letterSpacing: '0.08em',
            opacity: 0.55,
            whiteSpace: 'nowrap',
          }}
        >
          {flyer.date}
        </div>
      </div>

      {/* MasterClass Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
        <div
          style={{
            background: 'rgb(14, 27, 27)',
            color: 'rgb(241, 234, 220)',
            fontFamily: '"Archivo Black", sans-serif',
            fontSize: '11px',
            letterSpacing: '0.04em',
            padding: '4px 10px',
            borderRadius: '999px',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}
        >
          MasterClass
        </div>
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: topicColor,
          }}
        ></div>
      </div>

      {/* Topic Title */}
      <div style={{ marginBottom: '4px' }}>
        <div
          style={{
            fontFamily: '"Archivo Black", sans-serif',
            fontSize: '22px',
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            color: topicColor,
            textTransform: 'uppercase',
            wordWrap: 'break-word',
          }}
        >
          {flyer.topic}
        </div>
      </div>

      {/* Main Title */}
      <h2
        style={{
          margin: '4px 0 0',
          fontFamily: 'Archivo, sans-serif',
          fontWeight: 700,
          fontSize: '13px',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: 'rgb(14, 27, 27)',
        }}
      >
        {flyer.title}
      </h2>

      {/* Description */}
      <p
        style={{
          marginTop: '6px',
          marginBottom: 0,
          fontFamily: 'Inter, sans-serif',
          fontSize: '11px',
          lineHeight: 1.3,
          color: 'rgb(14, 27, 27)',
          opacity: 0.86,
          fontWeight: 400,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          flexGrow: 1,
        }}
      >
        {flyer.description}
      </p>

      {/* Footer */}
      <div
        style={{
          borderTop: '1px solid rgb(14, 27, 27)',
          paddingTop: '6px',
          marginTop: '6px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '7px',
          fontWeight: 500,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        <span>WORKING&CO</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <span
            style={{
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              background: topicColor,
            }}
          ></span>
          <span style={{ fontSize: '6px' }}>{flyer.category}</span>
        </span>
        <span>2026</span>
      </div>

    </div>
  )
}

interface Props {
  masterclasses?: Masterclass[]
}

export function MasterclassFlyersCarouselMobile({ masterclasses = [] }: Props) {
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

        .flyer-enter-mobile {
          animation: ${slideDirection === 'left' ? 'slideInFromLeft' : 'slideInFromRight'} 0.5s ease-in-out forwards;
        }

        .flyer-exit-mobile {
          animation: ${slideDirection === 'left' ? 'slideOutToLeft' : 'slideOutToRight'} 0.5s ease-in-out forwards;
        }
      `}</style>

      {/* Current Flyer (exiting) */}
      {nextIndex !== null && (
        <div className="flyer-exit-mobile" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}>
          <FlyerCardMobile flyer={currentFlyer} colorIndex={currentIndex} />
        </div>
      )}

      {/* Display Flyer (entering or static) */}
      <div className={nextIndex !== null ? 'flyer-enter-mobile' : ''} style={{ position: 'relative', width: '100%', zIndex: 2 }}>
        <FlyerCardMobile flyer={displayFlyer} colorIndex={displayIndex} />
      </div>

      {/* Dots Navigation */}
      {masterclasses.length > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            padding: '16px 0',
          }}
        >
          {masterclasses.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              style={{
                width: '8px',
                height: '8px',
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
