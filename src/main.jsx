import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './fanta.css'
import './index.css'

//Registrate service worker
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
    .then((registration) => {
        console.log('Service Worker registered successfully:', registration);
    })
    .catch((error) => {
        console.error('Error at register Service Worker:', error);
    })
}

createRoot(document.getElementById('root')).render(
    <App />
)
