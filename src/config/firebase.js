import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase Credentials for live project: e-invite-vivek-indira
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAe-D-2TFd5eZOK9d32psoTW8v3GxlTLGY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "e-invite-vivek-indira.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "e-invite-vivek-indira",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "e-invite-vivek-indira.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1055552546685",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1055552546685:web:60508b05b1fc25c9da8e14"
};

// Initialize Firebase App instance
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Cloud Firestore database
export const db = getFirestore(app);
export default app;
