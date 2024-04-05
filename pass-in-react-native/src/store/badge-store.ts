import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AttendeeBadgeStore extends AttendeeBadge {
  image?: string;
}

interface IAttendeeBadgeStore {
  data: AttendeeBadgeStore | null;
  save: (data: AttendeeBadgeStore) => void;
  remove: () => void;
  updateAvatar: (uri: string) => void;
}

export const useAttendeeBadgeStore = create(
  persist<IAttendeeBadgeStore>(
    (set) => ({
      data: null,
      save: (data: AttendeeBadgeStore) => {
        set({ data });
      },
      remove: () => {
        set({ data: null });
      },
      updateAvatar: (uri: string) => {
        set(({ data }) => ({
          data: {
            ...data!,
            image: uri,
          },
        }));
      },
    }),
    {
      name: "pass-in:attendee-badge",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
