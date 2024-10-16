import { create } from "zustand";

type StudentDashboardTabsStoreType = {
  tab: string;
  updateTab: (newTab: string) => void;
};

const useStudentDashboardTabsStore = create<StudentDashboardTabsStoreType>((set) => ({
  tab: "Registrations",
  updateTab: (newTab: string) => set(() => ({ tab: newTab }))
}));

export default useStudentDashboardTabsStore;
