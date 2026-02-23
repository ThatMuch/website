import "./Header.scss"

import React, { useEffect } from "react"
import { useUIStore } from "../../store/useUIStore"
import { useSiteMenu } from "../../hooks/use-site-menu"
import { useSiteSeo } from "../../hooks/use-site-seo"

import { LazyLoadImage } from "react-lazy-load-image-component"
import close from "../../images/29-cross-outline.png"
import close_gif from "../../images/29-cross-outline.gif"
import { StaticImage } from "gatsby-plugin-image"
import MenuToggle from "./MenuToggle"
import MenuContent from "./MenuContent"
import { Link } from "gatsby"

export default function Header() {
  // Global Store State
  const isMobile = useUIStore(state => state.isMobile)
  const isMenuOpen = useUIStore(state => state.isMenuOpen)
  // isScrolled handled only in effect, no re-render needed
  const setMobile = useUIStore(state => state.setMobile)
  const toggleMenu = useUIStore(state => state.toggleMenu)
  const setScrolled = useUIStore(state => state.setScrolled)

  // Initialization & Resize Logic
  useEffect(() => {
    let resizeTicking = false
    let scrollTicking = false
    let resizeRafId = 0
    let scrollRafId = 0
    let lastIsMobile = window.innerWidth <= 768
    let lastIsScrolled = window.scrollY > 50

    const handleResize = () => {
      if (!resizeTicking) {
        resizeRafId = window.requestAnimationFrame(() => {
          const isNowMobile = window.innerWidth <= 768
          // Optimization: Check against last known state to avoid redundant updates
          if (lastIsMobile !== isNowMobile) {
            setMobile(isNowMobile)
            lastIsMobile = isNowMobile
          }
          resizeTicking = false
        })
        resizeTicking = true
      }
    }

    const handleScroll = () => {
      if (!scrollTicking) {
        scrollRafId = window.requestAnimationFrame(() => {
          const isNowScrolled = window.scrollY > 50
          // Optimization: Check against last known state to avoid redundant updates
          if (lastIsScrolled !== isNowScrolled) {
            setScrolled(isNowScrolled)
            lastIsScrolled = isNowScrolled
          }
          scrollTicking = false
        })
        scrollTicking = true
      }
    }

    // Initial check
    setMobile(lastIsMobile)
    setScrolled(lastIsScrolled)

    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
      window.cancelAnimationFrame(resizeRafId)
      window.cancelAnimationFrame(scrollRafId)
    }
  }, [setMobile, setScrolled])

  // Lock scroll when menu is open on mobile
  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen, isMobile])

  const menuItems = useSiteMenu("GATSBY_HEADER_MENU").filter(
    (item: { parentId: string | null }) => item.parentId === null
  )

  const { siteUrl } = useSiteSeo()

  return (
    <header className="header">
      <div className="menu">
        <MenuToggle />

        {isMenuOpen && (
           <div className="menu__wrapper">
             <button
               id="btn_close"
               className="btn_close"
               onClick={() => toggleMenu(false)}
               aria-label="Fermer le menu"
               title="Fermer le menu"
             >
               <LazyLoadImage
                 className="close"
                 src={close}
                 alt="Close Thatmuch"
               />
               <LazyLoadImage
                 className="close_hover"
                 src={close_gif}
                 alt="Close Thatmuch"
               />
             </button>
             <Link
               to="/"
               title="Lien vers l'accueil de Thatmuch"
               aria-label="Logo Thatmuch"
            >
              <StaticImage loading="eager" src="../../images/THATMUCH_Logo_Black.webp" alt="Thatmuch" className="logo" width={230} />

             </Link>

             {/* Main Content Component */}
             <MenuContent menuItems={menuItems} />
           </div>
        )}
      </div>

      <Link
        to="/"
        className="landing-header__logo"
        aria-label="Accueil"
        title="Accueil du site THATMUCH"
      >
        <StaticImage loading="eager" src="../../images/THATMUCH_Logo_Black.webp" alt="Thatmuch" className="logo--header" width={230} />
      </Link>

      <Link
        to="https://meetings-eu1.hubspot.com/mathilde-arconte"
        className="btn btn-primary"
        target="_blank"
        rel="noopener noreferrer"
        title="Lien vers la prise de rendez-vous"
        aria-label="Programmez un appel"
      >
        {isMobile ? "RDV" : "Programmez un appel"}
      </Link>
    </header>
  )
}
