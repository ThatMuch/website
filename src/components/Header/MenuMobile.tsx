import React from 'react'
import { FiChevronLeft } from 'react-icons/fi'

interface MenuMobileProps {
  activeItem: any
  onBack: () => void
}

export default function MenuMobile({ activeItem, onBack }: MenuMobileProps) {


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
