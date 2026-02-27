import { create } from 'zustand'

interface UIState {
	isMobile: boolean
	isMenuOpen: boolean

	activeMenuIndex: number | null

	// Actions
	setMobile: (isMobile: boolean) => void
	toggleMenu: (isOpen?: boolean) => void

	setActiveMenuIndex: (index: number | null) => void

	// Helper to handle body scroll lock
	_updateBodyScroll: (isOpen: boolean) => void
}

export const useUIStore = create<UIState>((set, get) => ({
	isMobile: false,
	isMenuOpen: false,

	activeMenuIndex: null,

	setMobile: (isMobile) => set({ isMobile }),

	toggleMenu: (isOpen) => {
		const newState = isOpen ?? !get().isMenuOpen
		get()._updateBodyScroll(newState)
		set({ isMenuOpen: newState })
	},

	setActiveMenuIndex: (index) => set({ activeMenuIndex: index }),

	_updateBodyScroll: (isOpen) => {
		if (typeof document !== 'undefined') {
			document.body.style.overflow = isOpen ? 'hidden' : 'auto'
		}
	}
}))
