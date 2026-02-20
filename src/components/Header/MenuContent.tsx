import React, { useState } from 'react'
import { FiChevronRight, FiArrowRight, FiChevronLeft } from 'react-icons/fi'
import { LuSquareArrowOutUpRight } from 'react-icons/lu'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'gatsby'
import { useUIStore } from '../../store/useUIStore'
import comet from '../../images/Comet.svg'
import clsx from 'clsx'
import MenuMobile from './MenuMobile'

export interface MenuItem {
  id: string
  label: string
  url: string
  path?: string
  target?: string
  description?: string
  parentId?: string | null
  childItems?: {
    nodes: MenuItem[]
  }
}
const COMET_DELAYS = [100, 200, 300]

interface MenuContentProps {
  menuItems: MenuItem[]
}

export default function MenuContent({ menuItems }: MenuContentProps) {
  // Local state for mobile navigation view (description shown or not)
  // We keep this local because it's transient UI state for the drill-down interacton
  const [isDescShown, setIsDescShown] = useState(false)

  const isMobile = useUIStore(state => state.isMobile)
  const activeMenuIndex = useUIStore(state => state.activeMenuIndex)
  const setActiveMenuIndex = useUIStore(state => state.setActiveMenuIndex)
  const toggleMenu = useUIStore(state => state.toggleMenu)

  const activeItem = activeMenuIndex !== null ? menuItems[activeMenuIndex] : null

  const handleItemClick = (index: number, hasChildren: boolean) => {
    setActiveMenuIndex(index)
    if (isMobile && hasChildren) {
      setIsDescShown(true)
    }
  }

  const handleBack = () => {
    setIsDescShown(false)
    setActiveMenuIndex(null)
  }

  return (
    <div className="row">
      <div className="col-12 col-sm-4">
        <ul className="menu__items">
          {menuItems.map((item, index) => {
            const hasChildren = (item?.childItems?.nodes?.length ?? 0) > 0
            const isActive = activeMenuIndex === index

            return (
              <li
                key={item.id}
                onClick={() => handleItemClick(index, hasChildren)}
                className={clsx(isActive && 'active')}
              >
                {hasChildren ? (
                  <div className="menu__item" role="button" tabIndex={0}>
                    {item.label}
                    <FiChevronRight size={42} aria-hidden="true" />
                  </div>
                ) : item.path && item.path.startsWith('/') ? (
                  <Link
                    className="menu__item"
                    to={item.path}
                    target={item.target}
                    onClick={() => toggleMenu(false)}
                    title={`Lien vers ${item.label}`}
                    aria-label={item.label}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    className="menu__item"
                    href={item.url}
                    target={item.target}
                    onClick={() => toggleMenu(false)}
                    title={`Lien vers ${item.label}`}
                    aria-label={item.label}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      <div className={clsx('menu__items__desc col-sm-8', isMobile && isDescShown && 'is-open')}>
        {isMobile && (
          <MenuMobile activeItem={activeItem} onBack={handleBack} />
        )}

        {activeItem && (
          <>
            {activeItem.description && (
              <p className="menu__item__desc">{activeItem.description}</p>
            )}

            {(activeItem?.childItems?.nodes?.length ?? 0) > 0 && (
              <ul className="menu__items__sub">
                {activeItem?.childItems?.nodes?.map((child: MenuItem) => (
                  <li key={child.url}>
                    {child.path && child.path.startsWith('/') ? (
                      <Link
                        to={child.path}
                        target={child.target}
                        onClick={() => toggleMenu(false)}
                        title={`Lien vers ${child.label}`}
                        aria-label={child.label}
                      >
                        {child.label}
                        {child.target === '_blank' ? (
                          <LuSquareArrowOutUpRight size={42} aria-hidden="true" />
                        ) : (
                          <FiArrowRight size={42} aria-hidden="true" />
                        )}
                      </Link>
                    ) : (
                      <a
                        href={child.url}
                        target={child.target}
                        rel="noopener noreferrer"
                        onClick={() => toggleMenu(false)}
                        title={`Lien vers ${child.label}`}
                        aria-label={child.label}
                      >
                        {child.label}
                        {child.target === '_blank' ? (
                          <LuSquareArrowOutUpRight size={42} aria-hidden="true" />
                        ) : (
                          <FiArrowRight size={42} aria-hidden="true" />
                        )}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        <div className="comets">
           {COMET_DELAYS.map((delay) => (
             <LazyLoadImage
               key={delay}
               data-aos="fade-down-left"
               data-aos-delay={delay}
               src={comet}
               alt="Comet Thatmuch"
             />
           ))}
        </div>
      </div>
    </div>
  )
}
