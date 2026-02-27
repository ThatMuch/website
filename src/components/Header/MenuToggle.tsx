import React from 'react'
import { useUIStore } from '../../store/useUIStore'

export default function MenuToggle() {

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
     <span className="menu__txt">Menu</span>
    </button>
  )
}
