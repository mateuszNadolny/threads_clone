import { create } from 'zustand';

type UserProfileStore = {
  zustandBiogram: string;
  setZustandBiogram: (biogram: string) => void;
  zustandLink: string;
  setZustandLink: (link: string) => void;
};

export const useUserProfileStore = create<UserProfileStore>((set) => ({
  zustandBiogram: '',
  setZustandBiogram: (biogram: string) => set(() => ({ zustandBiogram: biogram })),
  zustandLink: '',
  setZustandLink: (link: string) => set(() => ({ zustandLink: link }))
}));
