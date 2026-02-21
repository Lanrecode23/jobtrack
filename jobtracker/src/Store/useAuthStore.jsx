import { create } from "zustand";
import {
  signInWithPopup,
  signOut as fbSignOut,
  onAuthStateChanged
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, googleProvider, db } from "../FirebaseConfig/FirebaseConfig";

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  error: null,

  // 🔹 Google Sign In
  signInWithGoogle: async () => {
    set({ loading: true, error: null });

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      const userRef = doc(db, "users", firebaseUser.uid);
      const userSnap = await getDoc(userRef);

      // Create user document if it doesn't exist
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          createdAt: serverTimestamp()
        });
      }

      set({
        user: {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL
        }
      });

    } catch (error) {
      set({ error: error.message || "Sign-in failed" });
    } finally {
      set({ loading: false });
    }
  },

  // 🔹 Logout
  logout: async () => {
    set({ loading: true, error: null });

    try {
      await fbSignOut(auth);
      set({ user: null });
    } catch (error) {
      set({ error: error.message || "Sign-out failed" });
    } finally {
      set({ loading: false });
    }
  },

  // 🔹 Listen to Auth State
  checkAuthState: () => {
    return onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        set({
          user: {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL
          },
          loading: false
        });
      } else {
        set({
          user: null,
          loading: false
        });
      }
    });
  }

}));
