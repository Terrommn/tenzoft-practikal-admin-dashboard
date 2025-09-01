import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// UI State Store - Example foundation for UI-related state
interface UIState {
  // Sidebar state
  isSidebarOpen: boolean;

  // Theme state
  theme: 'light' | 'dark' | 'auto';

  // Loading states
  isLoading: boolean;
  loadingMessage: string | null;

  // Modal/Dialog states
  activeModal: string | null;
  modalData: any;

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  setTheme: (theme: 'light' | 'dark' | 'auto') => void;

  setLoading: (loading: boolean, message?: string | null) => void;

  openModal: (modalName: string, data?: any) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      // Initial state
      isSidebarOpen: true,
      theme: 'auto',
      isLoading: false,
      loadingMessage: null,
      activeModal: null,
      modalData: null,

      // Actions
      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen }), false, 'toggleSidebar'),

      setSidebarOpen: (open: boolean) =>
        set({ isSidebarOpen: open }, false, 'setSidebarOpen'),

      setTheme: (theme: 'light' | 'dark' | 'auto') =>
        set({ theme }, false, 'setTheme'),

      setLoading: (loading: boolean, message: string | null = null) =>
        set({ isLoading: loading, loadingMessage: message }, false, 'setLoading'),

      openModal: (modalName: string, data: any = null) =>
        set({ activeModal: modalName, modalData: data }, false, 'openModal'),

      closeModal: () =>
        set({ activeModal: null, modalData: null }, false, 'closeModal'),
    }),
    {
      name: 'UI Store',
    }
  )
);
