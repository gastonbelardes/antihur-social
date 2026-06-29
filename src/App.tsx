import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegistroPage } from './pages/RegistroPage';
import { DetallePostPage } from './pages/DetallePostPage';
import { Navbar } from './components/Navbar';
import { ProfilePage } from './pages/ProfilePage';
import { PublicacionPage } from './pages/PublicacionPage';


function App() {
  return (
    <AuthProvider>
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

          {/*Ruta para ir al perfil*/}
          <Route path='/profile' element={<ProfilePage/>} />

          {/*Ruta para crear publicacion*/}
          <Route path='/publicacion' element={<PublicacionPage/>}/>
          
          {/* Por si escriben cualquier otra URL, que vuelva al home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
