import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider.jsx';
import { MovieProvider } from './context/MovieProvider.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <MovieProvider>
                <App />
            </MovieProvider>
        </AuthProvider>
    </BrowserRouter>
)
