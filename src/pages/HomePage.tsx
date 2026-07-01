import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { PostCard } from '../components/PostCard';
import type { Post } from '../types/interfaces';

export function HomePage() {
    const [posts, setPosts] = useState<Post[]>([]);
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
            
         <div 
            className="banner-custom p-5 rounded-3 mb-5 text-center shadow" 
            style={{ 
            backgroundColor: '#1a2a3a', 
            color: '#ffffff', 
            border: '1px solid #3498db'
  }}
>
            
            <h1 className="fw-bold mb-3">
             {'<AntiSocial />'} 
            </h1>
    
            <p className="lead">
             La única red social donde ser antisocial es el requisito principal.
            </p>
    
            
            <hr style={{ borderColor: '#3498db', opacity: 0.5 }} />
    
            <p className="fst-italic" style={{ color: '#b0c4de' }}>
            "Explorá lo que otros (no) están haciendo. Mantené tu distancia, dejá un comentario rápido y seguí con tu vida."
            </p>
            </div>

            <h3 className="mb-4 text-info fw-bold">Feed de Publicaciones</h3>

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
                <Alert variant="secondary" className="border border-secondary bg-dark text-light text-center">
                    ¡Todavía no realizaste publicaciones!
                </Alert>
            )}

            {/* GRILLA DE POSTS */}
            <Row>
                {posts.map((post: Post) => (
                    <Col md={6} lg={4} key={post.id}>
                        
                        <PostCard post={post} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}