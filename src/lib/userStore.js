import { create } from 'zustand'
import { doc, getDoc } from 'firebase/firestore';
import { db } from "./firebas"

// state management for the user
export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    if(!uid) return set({currentUser: null, isLoading: false});

    try {
      // get the user data
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        set({currentUser: docSnap.data(), isLoading: false})
      } else {
        set({currentUser: null, isLoading: false})
      }
    } catch (error) {
      console.log(error)
      return set({currentUser: null, isLoading: false});
    }
  }
}))