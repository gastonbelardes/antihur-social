import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
// import { useAuth } from '../context/AuthContext'; // Descomentar después

export function MiNavbar() {
    // const { user, isAuthenticated, logout } = useAuth(); // Descomentar después

    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="dark" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    🌐 Anti-Social Net
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Feed</Nav.Link>
                    </Nav>

                    <Nav>
                        {/* Renderizado condicional simulado. Luego usaremos isAuthenticated */}
                        {true ? (
                            <>
                                <Nav.Link as={Link} to="/perfil" className="fw-bold text-info">
                                    Mi Perfil
                                </Nav.Link>
                                <Nav.Link onClick={() => console.log("Cerrar sesión")}>
                                    Cerrar Sesión
                                </Nav.Link>
                            </>
                        ) : (
                            <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}