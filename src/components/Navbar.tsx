import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navbar as BootstrapNavbar, Container, Nav, Button } from 'react-bootstrap';

export const Navbar = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    authContext?.logout();
    navigate('/login');
  };

  return (
    
    <BootstrapNavbar 
      expand="lg" 
      className="px-4 py-3 border-bottom border-secondary shadow-sm"
      style={{ backgroundColor: '#1a2a3a' }} 
>
      <Container fluid>
        <BootstrapNavbar.Brand as={Link} to="/" className="fw-bold text-info">
          {'<AntiSocial />'}
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className="mx-2" style={{ color: '#ffffff' }}>Feed</Nav.Link>
            
            {user ? (
              <>
                <Nav.Link as={Link} to="/mi-perfil" className="mx-2" style={{ color: '#ffffff' }}>Mi Perfil</Nav.Link>
                <Button 
                  variant="outline-secondary" 
                  size="sm" 
                  className="ms-2 px-3 btn-logout"
                  onClick={handleCerrarSesion}
>                 Cerrar sesión
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="mx-2" style={{ color: '#ffffff' }}>Iniciar Sesión</Nav.Link>
                <Nav.Link as={Link} to="/registro" className="ms-2 px-3">
                  <Button variant="info" size="sm">Registrarse</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};