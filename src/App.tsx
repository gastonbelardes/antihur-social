import { Routes, Route } from 'react-router-dom';
import { MiNavbar } from './components/Navbar';
import { LoginPage } from './pages/LoginPage';
// import { HomePage } from './pages/HomePage';
// import { PerfilPage } from './pages/PerfilPage';
// import { DetallePost } from './pages/DetallePost';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div>
            <MiNavbar />
            
            <Routes>
                {/* Rutas Públicas */}
                <Route path="/login" element={<LoginPage />} />
                
                {/* Por ahora las dejamos comentadas hasta que crees los archivos */}
                {/* <Route path="/" element={<HomePage />} /> */}
                {/* <Route path="/post/:id" element={<DetallePost />} /> */}
                
                {/* Rutas Privadas (Luego las protegeremos) */}
                {/* <Route path="/perfil" element={<PerfilPage />} /> */}
            </Routes>
        </div>
    );
}

export default App;
