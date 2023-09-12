import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp} from 'firebase/app'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1Ivs9JDCiCyLcvtTt5prG1qkM50nuiCA",
  authDomain: "mscproject-d1a20.firebaseapp.com",
  projectId: "mscproject-d1a20",
  storageBucket: "mscproject-d1a20.appspot.com",
  messagingSenderId: "23936885170",
  appId: "1:23936885170:web:76f66a1dfa0fbc039344ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    
  </React.StrictMode>
);

