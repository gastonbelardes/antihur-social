import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegistroPage } from './pages/RegistroPage';
import { DetallePostPage } from './pages/DetallePostPage';
import { Navbar } from './components/Navbar';
import { ProfilePage } from './pages/ProfilePage';
import { PublicacionPage } from './pages/PublicacionPage';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Ruta principal: Feed de posts */}
          <Route path="/" element={<HomePage />} />
          
          {/* Rutas de autenticación */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroPage />} />
          
          {/* Ruta dinámica para el detalle de un post */}
          <Route path="/post/:id" element={<DetallePostPage />} />

          <Route path="/mi-perfil" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
          />

          <Route path="/publicacion" element={
            <ProtectedRoute>
              <PublicacionPage />
            </ProtectedRoute>
          }
          />
          
          {/* Por si escriben cualquier otra URL, que vuelva al home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
