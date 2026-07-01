import { Container, Spinner, Alert, Row, Col, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { PostCard } from "../components/PostCard";
import { useNavigate } from "react-router-dom";
import type { Post } from "../types/interfaces";

export function ProfilePage() {
    const { user, logout } = useAuth();

    const [posts, setPosts] = useState<Post[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const API_URL = "http://localhost:3001";
    
    
    const cerrarSesion = () => {
        logout();
        navigate("/login");
    };

    useEffect(() => {
        const traerPublicaciones = async () => {
            try {
               
                const respuesta = await fetch(`${API_URL}/posts?userId=${user?.id}`);
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
    }, [user?.id]); 
        
    return (
        <Container className="mt-5" >
            <h1>Bienvenido, <span style={{color:"#1d9fd6"}}>{user?.nickName}</span> </h1>
            <h3 className="mt-3">Mis publicaciones</h3>

            {cargando && (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="info" />
                    <p className="text-light mt-2" >
                        Cargando tus publicaciones...
                    </p>
                </div>
            )}

            {error && (
                <Alert variant="danger">
                    {error}
                </Alert>
            )}

            {!cargando && !error && posts.length === 0 && (
                <Alert variant="secondary" className="border border-secondary bg-dark text-light text-center">
                ¡Todavía no realizaste publicaciones!
                </Alert>
            )}
            
            <Row>
                {posts.map((post: Post) => (
                    <Col md={6} lg={4} key={post.id}>
                        <PostCard post={post} />
                    </Col>
                ))}
            </Row>
            
            <div className="mt-4 mb-5">
                <Button variant="primary" onClick={() => navigate("/publicacion")}>
                    Nueva publicación
                </Button>
                <Button
                    variant="danger"
                    className="btn-logout"
                    onClick={cerrarSesion}
                >
                    Cerrar sesión
                </Button>
            </div>
        </Container>
    );
}
