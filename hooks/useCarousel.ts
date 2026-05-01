import { useState, useEffect } from 'react'

export const AUTO_ADVANCE_MS = 8000
export const SLIDE_DURATION_MS = 500
export const SWIPE_THRESHOLD_PX = 50

interface UseCarouselReturn {
  currentIndex: number
  nextIndex: number | null
  slideDirection: 'left' | 'right'
  isPaused: boolean
  handleDotClick: (index: number) => void
  handleMouseEnter: () => void
  handleMouseLeave: () => void
  setIsPaused: (paused: boolean) => void
}

export function useCarousel(itemsLength: number): UseCarouselReturn {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState<number | null>(null)
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left')
  const [isPaused, setIsPaused] = useState(false)

  // Auto-advance timer
  useEffect(() => {
    if (itemsLength <= 1 || isPaused) return

    const interval = setInterval(() => {
      setNextIndex((currentIndex + 1) % itemsLength)
      setSlideDirection('left')
    }, AUTO_ADVANCE_MS)

    return () => clearInterval(interval)
  }, [currentIndex, itemsLength, isPaused])

  // Slide transition
  useEffect(() => {
    if (nextIndex !== null) {
      const timer = setTimeout(() => {
        setCurrentIndex(nextIndex)
        setNextIndex(null)
      }, SLIDE_DURATION_MS)
      return () => clearTimeout(timer)
    }
  }, [nextIndex])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setNextIndex((currentIndex + 1) % itemsLength)
        setSlideDirection('left')
      } else if (e.key === 'ArrowLeft') {
        setNextIndex((currentIndex - 1 + itemsLength) % itemsLength)
        setSlideDirection('right')
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentIndex, itemsLength])

  const handleDotClick = (index: number) => {
    if (index > currentIndex) {
      setSlideDirection('left')
    } else if (index < currentIndex) {
      setSlideDirection('right')
    }
    setNextIndex(index)
  }

  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  return {
    currentIndex,
    nextIndex,
    slideDirection,
    isPaused,
    handleDotClick,
    handleMouseEnter,
    handleMouseLeave,
    setIsPaused,
  }
}
