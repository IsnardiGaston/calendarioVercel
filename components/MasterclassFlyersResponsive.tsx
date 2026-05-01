'use client'

import { useEffect, useState } from 'react'
import type { Masterclass } from '@/lib/strapi'
import { MasterclassFlyersCarousel } from './MasterclassFlyersCarousel'
import { MasterclassFlyersCarouselMobile } from './MasterclassFlyersCarouselMobile'

interface Props {
  masterclasses?: Masterclass[]
}

export function MasterclassFlyersResponsive({ masterclasses = [] }: Props) {
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!isClient) {
    return null
  }

  if (!masterclasses || masterclasses.length === 0) {
    return null
  }

  return isMobile ? (
    <MasterclassFlyersCarouselMobile masterclasses={masterclasses} />
  ) : (
    <MasterclassFlyersCarousel masterclasses={masterclasses} />
  )
}
