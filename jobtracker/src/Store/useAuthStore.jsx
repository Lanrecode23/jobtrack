import { create } from "zustand";
import { persist } from "zustand/middleware";
import { signInWithPopup, signOut as fbSignOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "../FirebaseConfig/FirebaseConfig";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,

      // Google Sign-In
      signInWithGoogle: async () => {
        set({ loading: true, error: null });
        try {
          const result = await signInWithPopup(auth, googleProvider);
          const firebaseUser = result.user;

          // Firestore reference
          const userRef = doc(db, "users", firebaseUser.uid);
          const userDoc = await getDoc(userRef);

          if (!userDoc.exists()) {
            const userData = {
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              createdAt: new Date()
            };
            await setDoc(userRef, userData);
          }

          set({
            user: {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL
            }
          });
        } catch (e) {
          set({ error: e.message || "Sign-in failed" });
        } finally {
          set({ loading: false });
        }
      },

      // Logout
      logout: async () => {
        set({ loading: true, error: null });
        try {
          await fbSignOut(auth);
          set({ user: null });
        } catch (e) {
          set({ error: e.message || "Sign-out failed" });
        } finally {
          set({ loading: false });
        }
      },

      // Check if user is logged in
      checkAuthState: () => {
        onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            set({
              user: {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL
              }
            });
          } else {
            set({ user: null });
          }
        });
      }

    }),
    
  )
);
