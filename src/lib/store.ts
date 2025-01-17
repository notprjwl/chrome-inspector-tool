import { create } from 'zustand';

interface InspectorStore {
  isInspecting: boolean;
  toggleInspecting: () => void;
  selectedElement: HTMLElement | null;
  setSelectedElement: (element: HTMLElement | null) => void;
  hoveredElement: HTMLElement | null;
  setHoveredElement: (element: HTMLElement | null) => void;
}

export const useInspectorStore = create<InspectorStore>((set) => ({
  isInspecting: false,
  toggleInspecting: () => set((state) => ({ isInspecting: !state.isInspecting })),
  selectedElement: null,
  setSelectedElement: (element) => set({ selectedElement: element }),
  hoveredElement: null,
  setHoveredElement: (element) => set({ hoveredElement: element }),
}));