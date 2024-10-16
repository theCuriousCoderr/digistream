import { create } from "zustand";

type DocumentType = {
    matric: string;
    level: string;
    schoolFeesReceipt: string;
    deptDuesReceipt: string;
    facultyDuesReceipt: string;
    transcript: string;
    labFeesReceipt: string;
    courseForm: string;
    status: "pending" | "accepted" | "rejected";
    date: string;
    comment: string;
  };

type ViewDocumentModalStoreType = {
  document: DocumentType | "";
  updateDocument: (newDocument: DocumentType) => void;
};

const useViewDocumentsModalStore = create<ViewDocumentModalStoreType>((set) => ({
  document: "",
  updateDocument: (newDocument: DocumentType) => set(() => ({ document: newDocument }))
}));

export default useViewDocumentsModalStore;
