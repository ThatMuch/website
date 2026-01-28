import React from 'react'
import { useUIStore } from '../../store/useUIStore'
import clsx from 'clsx'

export default function MenuToggle() {
  const isScrolled = useUIStore(state => state.isScrolled)
  const toggleMenu = useUIStore(state => state.toggleMenu)

  return (
    <button
      id="bento-menu"
      className="ml-auto menu__button"
      onClick={() => toggleMenu(true)}
      aria-label="Menu"
      title="Ouvrir le menu"
    >
      <div className="bento">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
      {!isScrolled && <span className="menu__txt">Menu</span>}
    </button>
  )
}
