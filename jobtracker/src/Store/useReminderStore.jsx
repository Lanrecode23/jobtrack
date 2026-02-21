import { create } from "zustand";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig/FirebaseConfig";
import { useAuthStore } from "./useAuthStore";

export const useReminderStore = create((set, get) => ({
    Reminders: [],

    fetchReminders: async () => {
        const { user } = useAuthStore.getState();
        if (!user) return;

        const snapshot = await getDocs(collection(db, "users", user.uid, "reminders"));
        const reminders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        set({ Reminders: reminders });
    },

    addReminder: async (reminderData) => {
        const { user } = useAuthStore.getState();
        if (!user) return;

        const docRef = await addDoc(collection(db, "users", user.uid, "reminders"), reminderData);
        set({ Reminders: [...get().Reminders, { id: docRef.id, ...reminderData }] });
    },

    updateReminder: async (reminderId, updatedData) => {
        const { user } = useAuthStore.getState();
        if (!user) return;

        const reminderRef = doc(db, "users", user.uid, "reminders", reminderId);
        await updateDoc(reminderRef, updatedData);
        set({
            Reminders: get().Reminders.map(reminder => reminder.id === reminderId ? { ...reminder, ...updatedData } : reminder)
        });
    },

    deleteReminder: async (reminderId) => {
        const { user } = useAuthStore.getState();
        if (!user) return;

        await deleteDoc(doc(db, "users", user.uid, "reminders", reminderId));
        set({ Reminders: get().Reminders.filter(reminder => reminder.id !== reminderId) });
    }
}));
