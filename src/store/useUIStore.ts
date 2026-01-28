import { create } from 'zustand'

interface UIState {
	isMobile: boolean
	isMenuOpen: boolean
	isScrolled: boolean
	activeMenuIndex: number | null

	// Actions
	setMobile: (isMobile: boolean) => void
	toggleMenu: (isOpen?: boolean) => void
	setScrolled: (isScrolled: boolean) => void
	setActiveMenuIndex: (index: number | null) => void

	// Helper to handle body scroll lock
	_updateBodyScroll: (isOpen: boolean) => void
}

export const useUIStore = create<UIState>((set, get) => ({
	isMobile: false,
	isMenuOpen: false,
	isScrolled: false,
	activeMenuIndex: null,

	setMobile: (isMobile) => set({ isMobile }),

	toggleMenu: (isOpen) => {
		const newState = isOpen ?? !get().isMenuOpen
		get()._updateBodyScroll(newState)
		set({ isMenuOpen: newState })
	},

	setScrolled: (isScrolled) => set({ isScrolled }),

	setActiveMenuIndex: (index) => set({ activeMenuIndex: index }),

	_updateBodyScroll: (isOpen) => {
		if (typeof document !== 'undefined') {
			document.body.style.overflow = isOpen ? 'hidden' : 'auto'
		}
	}
}))
