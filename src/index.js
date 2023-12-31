import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyAYrz-ABcuoa6qrPECikclWpghXTQlMNro",
    authDomain: "tbovoyagehack.firebaseapp.com",
    projectId: "tbovoyagehack",
    storageBucket: "tbovoyagehack.appspot.com",
    messagingSenderId: "573490069263",
    appId: "1:573490069263:web:a2ffd019cd0668010e087a",
    measurementId: "G-F7C8ELM824"
  };

const app = initializeApp(firebaseConfig);
  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);


export const auth = getAuth(app);
export default app;