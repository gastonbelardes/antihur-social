import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { PostCard } from '../components/PostCard';

export function HomePage() {
    const [posts, setPosts] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const API_URL = "http://localhost:3001";

    useEffect(() => {
        // Función para ir a buscar los posts al backend
        const traerPublicaciones = async () => {
            try {
                const respuesta = await fetch(`${API_URL}/posts`);
                if (!respuesta.ok) {
                    throw new Error("Error al traer las publicaciones");
                }
                const data = await respuesta.json();
                setPosts(data);
            } catch (err) {
                console.error(err);
                setError("No se pudieron cargar las publicaciones. ¿La API está encendida?");
            } finally {
                setCargando(false);
            }
        };

        traerPublicaciones();
    }, []);

    return (
        <Container className="mt-4">
            {/* SECCIÓN LIBRE: Banner de Bienvenida */}
            <div className="bg-dark text-light p-5 rounded-3 mb-5 border border-secondary text-center shadow">
                <h1 className="text-info fw-bold mb-3">Bienvenido a Anti-Social Net 🌐</h1>
                <p className="lead">
                    La única red social donde ser antisocial es el requisito principal.
                </p>
                <hr className="bg-secondary my-4" />
                <p className="fst-italic text-muted">
                    "Explorá lo que otros (no) están haciendo. Mantené tu distancia, dejá un comentario rápido y seguí con tu vida."
                </p>
            </div>

            <h3 className="mb-4 text-dark">Feed de Publicaciones</h3>

            {/* ESTADOS: Cargando y Error */}
            {cargando && (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="info" />
                    <p className="text-light mt-2">Cargando el feed...</p>
                </div>
            )}
            
            {error && (
                <Alert variant="danger">{error}</Alert>
            )}

            {!cargando && !error && posts.length === 0 && (
                <Alert variant="info">Todavía no hay publicaciones. ¡El vacío es total!</Alert>
            )}

            {/* GRILLA DE POSTS */}
            <Row>
                {posts.map((post: any) => (
                    <Col md={6} lg={4} key={post.id}>
                        {/* Le pasamos los datos de cada post a nuestra tarjetita */}
                        <PostCard post={post} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}