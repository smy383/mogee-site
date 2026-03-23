import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBa674RVwmBwn_AzR2o6H_LYlfoJybEqSA",
  authDomain: "useai-community.firebaseapp.com",
  projectId: "useai-community",
  storageBucket: "useai-community.firebasestorage.app",
  messagingSenderId: "443277948864",
  appId: "1:443277948864:web:85e41055cf313601f8fa25",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
