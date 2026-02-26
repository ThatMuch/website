import React from 'react'
import { Link } from 'gatsby'
import { FiChevronRight } from 'react-icons/fi'
import clsx from 'clsx'
import { MenuItem } from './types'

interface MenuListItemProps {
  item: MenuItem
  index: number
  isActive: boolean
  hasChildren: boolean
  onItemClick: (index: number, hasChildren: boolean) => void
  toggleMenu: (state: boolean) => void
}

const MenuListItem = React.memo(
  ({ item, index, isActive, hasChildren, onItemClick, toggleMenu }: MenuListItemProps) => {
    return (
      <li
        onClick={() => onItemClick(index, hasChildren)}
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
  }
)

export default MenuListItem
