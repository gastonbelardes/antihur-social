import { Container, Spinner, Alert,Row,Col, Button} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import {useState, useEffect} from "react"
import { PostCard } from "../components/PostCard";
import { useNavigate } from "react-router-dom";

export function ProfilePage(){
    const { user, logout } = useAuth();
    const [posts, setPosts] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate()
    
    const API_URL = "http://localhost:3001";
    
        useEffect(() => {
            const cerrarSesion = () => {
                logout();
                navigate("/login");
            };
            const traerPublicaciones = async () => {
                try {
                    const respuesta = await fetch(`${API_URL}/posts?nickName={user?.nickName}`);
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
        
    return(
        <Container  className="mt-5">
            <h1>Bienvenido, {user?.nickName} </h1>
            <h3>Mis publicaciones</h3>

            {cargando && (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="info" />
                    <p className="text-light mt-2">Cargando tus publicaciones...</p>
                </div>
            )}
            {error && (
                <Alert variant="danger">{error}</Alert>
            )}

            {!cargando && !error && posts.length === 0 && (
                <Alert variant="info">¡Todavía no realizaste publicaciones!</Alert>
            )}
            <Row>
                {posts.map((post: any) => (
                    <Col md={6} lg={4} key={post.id}>
                        {/* Le pasamos los datos de cada post a nuestra tarjetita */}
                        <PostCard post={post} />
                    </Col>
                ))}
            </Row>
            <Button onClick={()=> navigate("/publicacion")}>
                <p>Nueva publicación</p>
            </Button>
            <Button
                variant="danger"
                className="ms-2"
                onClick={cerrarSesion}
            >
                Cerrar sesión
            </Button>
        </Container>
    )
}
