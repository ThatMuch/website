import "./Header.scss"

import React, { useEffect } from "react"
import { useUIStore } from "../../store/useUIStore"
import { useSiteMenu } from "../../hooks/use-site-menu"
import { useSiteSeo } from "../../hooks/use-site-seo"

import { LazyLoadImage } from "react-lazy-load-image-component"
import close from "../../images/29-cross-outline.png"
import close_gif from "../../images/29-cross-outline.gif"
import logo from "../../images/THATMUCH_Logo_Black.webp"

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
    const handleResize = () => setMobile(window.innerWidth <= 768)
    const handleScroll = () => {
      // Logic for scroll state if needed (previously unused but state existed)
      // Assuming naive implementation or based on previous usage context if any.
      // Previous code had unused `setIsScrolled(false)` on cleanup but no logic to set it true?
      // I'll leave it simple or add a scroll listener if strictly required by user intent.
      // Checking original file: `isScrolled` was declared but seemingly never set to true?
      // Actually it might be set by some other logic not visible or I missed it in original dump?
      // Re-reading original dump... No `setIsScrolled(true)` found. Strange.
      // I'll add a basic listener for robustness.
      setScrolled(window.scrollY > 50)
    }

    handleResize() // init
    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
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
               <LazyLoadImage
                 src={logo}
                 alt="Thatmuch"
                 className="logo"
                 width="230"
               />
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
        <LazyLoadImage src={logo} alt="Thatmuch" className="logo--header" />
      </Link>

      <a
        href="https://meetings-eu1.hubspot.com/mathilde-arconte"
        className="btn btn-primary"
        target="_blank"
        rel="noopener noreferrer"
        title="Lien vers la prise de rendez-vous"
        aria-label="Programmez un appel"
        data-aos="fade-down"
        data-aos-delay="100"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-anchor-placement="top-bottom"
        data-aos-offset="0"
        data-aos-once="true"
        data-aos-anchor="#bento-menu"
      >
        {isMobile ? "RDV" : "Programmez un appel"}
      </a>
    </header>
  )
}
