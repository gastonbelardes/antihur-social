import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navbar as BootstrapNavbar, Container, Nav } from 'react-bootstrap';

export const Navbar = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    authContext?.logout();
    navigate('/login');
  };

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="px-4">
      <Container fluid>
        <BootstrapNavbar.Brand as={Link} to="/">
          🌐 Anti-Social Net
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Feed</Nav.Link>
            {user ? (
              <>
                <Nav.Link as={Link} to="/profile">Mi Perfil</Nav.Link>
                <Nav.Link onClick={handleCerrarSesion}>Cerrar Sesión</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
                <Nav.Link as={Link} to="/registro">Registrarse</Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};