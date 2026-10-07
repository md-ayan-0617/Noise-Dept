import { create } from 'zustand';
import type { CursorStateType } from '../types';

interface StudioState {
  // Cursor
  cursorText: string;
  cursorState: CursorStateType;
  previewImage: string | null;
  setCursor: (state: CursorStateType, text?: string) => void;
  resetCursor: () => void;
  setPreviewImage: (url: string | null) => void;

  // Global Grid
  gridVisible: boolean;
  toggleGrid: () => void;
  setGridVisible: (visible: boolean) => void;

  // Menu
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  toggleMenu: () => void;

  // Preloader
  preloaded: boolean;
  setPreloaded: (done: boolean) => void;

  // Easter Egg (ASCII mode)
  asciiActive: boolean;
  setAsciiActive: (active: boolean) => void;

  // Current Theme Accent
  currentAccent: string;
  setCurrentAccent: (accent: string) => void;
}

export const useStudioStore = create<StudioState>((set) => ({
  cursorText: '',
  cursorState: 'default',
  previewImage: null,
  setCursor: (state, text = '') => set({ cursorState: state, cursorText: text }),
  resetCursor: () => set({ cursorState: 'default', cursorText: '', previewImage: null }),
  setPreviewImage: (url) => set({ previewImage: url }),

  gridVisible: false,
  toggleGrid: () => set((state) => ({ gridVisible: !state.gridVisible })),
  setGridVisible: (visible) => set({ gridVisible: visible }),

  menuOpen: false,
  setMenuOpen: (open) => set({ menuOpen: open }),
  toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),

  preloaded: false,
  setPreloaded: (done) => set({ preloaded: done }),

  asciiActive: false,
  setAsciiActive: (active) => set({ asciiActive: active }),

  currentAccent: '#EC3D31',
  setCurrentAccent: (accent) => set({ currentAccent: accent }),
}));
