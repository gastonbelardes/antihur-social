import { useState, useEffect } from 'react';

import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { PostCard } from '../components/PostCard';
import type { Post, Tag } from '../types/interfaces';
import { BotonNuevaPublicacion } from '../components/BotonNuevaPublicacion';

export function HomePage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const API_URL = "http://localhost:3001";

    useEffect(() => {
        
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

    const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState<string | null>(null);

        
    const todasLasEtiquetas = Array.from(
    new Set(
        posts.flatMap((post: Post) => post.Tags?.map((t: Tag) => t.name) || [])
    )
);


    const postsFiltrados = etiquetaSeleccionada
    ? posts.filter((post: Post) => 
        post.Tags?.some((t: Tag) => t.name === etiquetaSeleccionada)
      )
    : posts;


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
                    "Explorá lo que otros (no) están haciendo. Mantené tu distancia, dejó un comentario rápido y seguí con tu vida."
                </p>
            </div>

            <h3 className="mb-4 text-info fw-bold">Feed de Publicaciones</h3>

            {!cargando && !error && posts.length > 0 && (
                <div className="mb-4 d-flex flex-wrap align-items-center gap-2">
                    <span className="fw-bold text-muted me-2" style={{ fontSize: '0.9rem' }}>Filtrar por:</span>
                    
                    
                    <button
                        className={`btn btn-sm ${!etiquetaSeleccionada ? 'btn-primary' : 'btn-outline-info'}`}
                        onClick={() => setEtiquetaSeleccionada(null)}
                    >
                        Todos
                    </button>

                    
                    {todasLasEtiquetas.map((tag: any) => (
                        <button
                            key={tag}
                            className={`btn btn-sm ${etiquetaSeleccionada === tag ? 'btn-primary' : 'btn-outline-info'}`}
                            onClick={() => setEtiquetaSeleccionada(tag)}
                        >
                            #{tag}
                        </button>
                    ))}
                </div>
            )}

            {cargando && (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="text-muted mt-2">Cargando el feed...</p>
                </div>
            )}
            
            {error && (
                <Alert variant="danger">{error}</Alert>
            )}

            {!cargando && !error && posts.length === 0 && (
                <Alert variant="secondary" className="border border-secondary bg-dark text-light text-center">
                    ¡Todavía no se realizaron publicaciones!
                </Alert>
            )}

            {!cargando && !error && (
                <Row>
                    {postsFiltrados.length === 0 && etiquetaSeleccionada ? (
                        <Col xs={12}>
                            <div className="text-center my-4 text-muted fst-italic">
                                No hay publicaciones con la etiqueta #{etiquetaSeleccionada}
                            </div>
                        </Col>
                    ) : (
                        postsFiltrados.map((post: Post) => (
                            <Col md={6} lg={4} key={post.id} className="mb-4">
                                <PostCard post={post} />
                            </Col>
                        ))
                    )}
                </Row>
            )}
            <BotonNuevaPublicacion></BotonNuevaPublicacion>
        </Container>
    );
}

export default HomePage;