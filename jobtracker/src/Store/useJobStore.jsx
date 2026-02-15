import { create } from "zustand";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig/FirebaseConfig";
import { useAuthStore } from "./useAuthStore";

export const useJobStore = create((set, get) => ({
    jobs: [],

    fetchJobs: async () => {
        const { user } = useAuthStore.getState();
        if (!user) return;

        const snapshot = await getDocs(collection(db, "users", user.uid, "applications"));
        const jobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        set({ jobs });
    },

    addJob: async (jobData) => {
        const { user } = useAuthStore.getState();
        if (!user) return;

        const docRef = await addDoc(collection(db, "users", user.uid, "applications"), jobData);
        set({ jobs: [...get().jobs, { id: docRef.id, ...jobData }] });
    },

    updateJob: async (jobId, updatedData) => {
        const { user } = useAuthStore.getState();
        if (!user) return;

        const jobRef = doc(db, "users", user.uid, "applications", jobId);
        await updateDoc(jobRef, updatedData);
        set({
            jobs: get().jobs.map(job => job.id === jobId ? { ...job, ...updatedData } : job)
        });
    },

    deleteJob: async (jobId) => {
        const { user } = useAuthStore.getState();
        if (!user) return;

        await deleteDoc(doc(db, "users", user.uid, "applications", jobId));
        set({ jobs: get().jobs.filter(job => job.id !== jobId) });
    }
}));
