import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Deal } from '../types/deals';

interface DealStore {
  deals: Deal[];
  addDeal: (deal: Omit<Deal, 'id' | 'lastUpdated' | 'activities'>) => void;
  updateDeal: (id: string, updates: Partial<Deal>) => void;
  deleteDeal: (id: string) => void;
  moveDeal: (id: string, stage: string) => void;
  clearDeals: () => void;
}

export const useDealStore = create<DealStore>()(
  persist(
    (set) => ({
      deals: [],
      addDeal: (dealData) => set((state) => ({
        deals: [
          ...state.deals,
          {
            ...dealData,
            id: Date.now().toString(), // Unix timestamp as ID
            lastUpdated: new Date().toISOString(),
            activities: [],
          },
        ],
      })),
      updateDeal: (id, updates) => set((state) => ({
        deals: state.deals.map((deal) =>
          deal.id === id
            ? { ...deal, ...updates, lastUpdated: new Date().toISOString() }
            : deal
        ),
      })),
      deleteDeal: (id) => set((state) => ({
        deals: state.deals.filter((deal) => deal.id !== id),
      })),
      moveDeal: (id, stage) => set((state) => ({
        deals: state.deals.map((deal) =>
          deal.id === id
            ? { ...deal, stage, lastUpdated: new Date().toISOString() }
            : deal
        ),
      })),
      clearDeals: () => set({ deals: [] }),
    }),
    {
      name: 'deals-storage',
    }
  )
);