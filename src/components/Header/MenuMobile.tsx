import React from 'react'
import { FiChevronLeft } from 'react-icons/fi'

import { MenuItem } from './MenuContent'

interface MenuMobileProps {
  activeItem: MenuItem | null
  onBack: () => void
}

export default function MenuMobile({ activeItem, onBack }: MenuMobileProps) {


  if (!activeItem) return null

  return (
    <div className="menu__items__desc__back">
      <button
        type="button"
        onClick={onBack}
        className="menu__back-btn"
        aria-label="Retour au menu principal"
        title="Retour au menu principal"
      >
        <FiChevronLeft size={42} />
      </button>
      <p className="mb-0">{activeItem.label}</p>
    </div>
  )
}
