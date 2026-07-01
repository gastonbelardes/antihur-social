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
        
          <Route path="/" element={<HomePage />} />
          
        
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroPage />} />
          
        
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
          
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
