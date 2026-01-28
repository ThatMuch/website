import React, { useState } from 'react'
import { FiChevronLeft } from 'react-icons/fi'
import { useUIStore } from '../../store/useUIStore'
import clsx from 'clsx'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import comet from '../../images/Comet.svg'

interface MenuMobileProps {
  activeItem: any
  onBack: () => void
}

export default function MenuMobile({ activeItem, onBack }: MenuMobileProps) {
  // No store needed here if props handle it.
  // const activeMenuIndex = useUIStore(state => state.activeMenuIndex)

  if (!activeItem) return null

  return (
    <div className="menu__items__desc__back">
      <FiChevronLeft
        size={42}
        onClick={onBack}
        aria-label="Retour au menu principal"
        title="Retour au menu principal"
        style={{ cursor: 'pointer' }}
      />
      <p className="mb-0">{activeItem.label}</p>
    </div>
  )
}
