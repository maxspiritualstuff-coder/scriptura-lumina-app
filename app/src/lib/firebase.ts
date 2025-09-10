'use client';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, indexedDBLocalPersistence, browserLocalPersistence } from 'firebase/auth';

const firebaseConfig = {
  "projectId": "scriptura-lumina",
  "appId": "1:641985552294:web:14a25587354cc74099f967",
  "storageBucket": "scriptura-lumina.firebasestorage.app",
  "apiKey": "AIzaSyBxmF0WFWkE_XvkNX_6T0SRYg-kszTvdHw",
  "authDomain": "scriptura-lumina.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "641985552294"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


export { app, auth, googleProvider };
