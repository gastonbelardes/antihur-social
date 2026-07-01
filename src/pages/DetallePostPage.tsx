import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Spinner, Alert, Badge, Button, Form } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import type { Post } from '../types/interfaces';

export function DetallePostPage() { 
    const { id } = useParams(); 
    const authContext = useContext(AuthContext) as any;
    const user = authContext?.user;
    
    const [post, setPost] = useState<Post | null>(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    
    const [nuevoComentario, setNuevoComentario] = useState("");
    const [enviando, setEnviando] = useState(false);

    const API_URL = "http://localhost:3001";

    useEffect(() => {
        const traerTodo = async () => {
            try {
                const [respuestaPost, respuestaComentarios] = await Promise.all([
                    fetch(`${API_URL}/posts/${id}`),
                    fetch(`${API_URL}/comments/post/${id}`) 
                ]);

                if (!respuestaPost.ok || !respuestaComentarios.ok) {
                    throw new Error("No se pudo cargar la información completa");
                }

                const dataPost = await respuestaPost.json();
                const dataComentarios = await respuestaComentarios.json();
                
                setPost({
                    ...dataPost,
                    Comments: dataComentarios
                });
            } catch (err) {
                console.error(err);
                setError("Error al cargar la publicación y sus comentarios.");
            } finally {
                setCargando(false);
            }
        };

        traerTodo();
    }, [id]);

    const manejarSubmitComentario = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!nuevoComentario.trim()) return;

        setEnviando(true);

        try {
            const paqueteDeDatos = {
                content: nuevoComentario,
                postId: Number(id), 
                userId: user?.id || 1 
            };

            const respuesta = await fetch(`${API_URL}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(paqueteDeDatos)
            });

            if (respuesta.ok) {
                const comentarioCreado = await respuesta.json();
                
                
                if (post) {
                    setPost({
                        ...post,
                        Comments: [...(post.Comments || []), comentarioCreado]
                    });
                }
                
                setNuevoComentario("");
            } else {
                const errorData = await respuesta.json();
                alert(`Error del servidor: ${errorData.error || "Algo falló"}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error al conectar con el servidor.");
        } finally {
            setEnviando(false);
        }
    };

    if (cargando) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" variant="info" />
                <p className="text-light mt-2">Cargando publicación...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
                <Link to="/"><Button variant="outline-light">Volver al Feed</Button></Link>
            </Container>
        );
    }

    if (!post) return null;

    const fecha = new Date(post.createdAt).toLocaleDateString('es-AR', {
        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    return (
        <Container className="mt-5 mb-5" style={{ maxWidth: "800px" }}>
            <Link to="/">
                <Button className="mb-3" style={{backgroundColor:"#1a2a3a"}}>
                    ⬅ Volver al Feed
                </Button>
            </Link>

            <Card className="shadow bg-dark text-light border-secondary">
                {post.PostImages && post.PostImages.length > 0 && (
                    <Card.Img variant="top" src={post.PostImages[0].url} alt="Imagen" style={{ maxHeight: '400px', objectFit: 'cover' }} />
                )}
                
                <Card.Body className="p-4">
                    <Card.Subtitle className="mb-4 text-info d-flex justify-content-between align-items-center border-bottom border-secondary pb-3">
                        <span className="fs-5 fw-bold">@{post.User?.nickName || "Usuario desconocido"}</span>
                        <span className="text-muted">{fecha}</span>
                    </Card.Subtitle>

                    <Card.Text className="fs-4 mb-4">
                        {post.description}
                    </Card.Text>

                    <div className="mb-4 border-bottom border-secondary pb-4">
                        {post.Tags && post.Tags.length > 0 ? (
                            post.Tags.map((tag) => (
                                <Badge bg="secondary" className="me-2 p-2 fs-6" key={tag.id}>
                                    #{tag.name}
                                </Badge>
                            ))
                        ) : (
                            <small className="text-muted">Sin etiquetas</small>
                        )}
                    </div>

                    <h5 className="text-info mb-3">💬 Comentarios</h5>
                    <div className="comentarios-container mb-4">
                        {post.Comments && post.Comments.length > 0 ? (
                            post.Comments.map((comentario, index) => (
                                <div key={comentario.id || index} className="bg-secondary p-3 rounded mb-2 text-white">
                                    <strong className="text-dark">@{comentario.User?.nickName || "Anónimo"}: </strong>
                                    <span>{comentario.content}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted fst-italic">
                                Todavía no hay comentarios. ¡Sé el primero!
                            </p>
                        )}
                    </div>

                    {user ? (
                        <Form onSubmit={manejarSubmitComentario}>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    placeholder="Escribí un comentario..."
                                    value={nuevoComentario}
                                    onChange={(e) => setNuevoComentario(e.target.value)}
                                    disabled={enviando}
                                    required
                                />
                            </Form.Group>
                            <Button 
                                variant="info" 
                                type="submit" 
                                size="sm" 
                                disabled={enviando || !nuevoComentario.trim()}
                            >
                                {enviando ? "Enviando..." : "Comentar"}
                            </Button>
                        </Form>
                    ) : (
                        <Alert variant="secondary" className="text-center p-2">
                            <small>Tenés que <Link to="/login" className="fw-bold text-dark">iniciar sesión</Link> para comentar.</small>
                        </Alert>
                    )}

                </Card.Body>
            </Card>
        </Container>
    );
}