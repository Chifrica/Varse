import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXO-SUcGXQZtn-CTI3AKlktr8ja1I6q7A",
  authDomain: "varse-202b9.firebaseapp.com",
  projectId: "varse-202b9",
  storageBucket: "varse-202b9.appspot.com",
  messagingSenderId: "853543512665",
  appId: "1:853543512665:web:a199a7c8b89ac6a0429f48",
  measurementId: "G-XPHQJRXM1Q",
};

const app = initializeApp(firebaseConfig);

// ✅ Enable offline cache safely
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});

const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, db, storage };

