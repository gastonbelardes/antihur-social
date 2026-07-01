import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { Post } from '../types/interfaces';

export function PostCard({ post }: { post: Post }) {
    
    const fecha = new Date(post.createdAt).toLocaleDateString('es-AR', {
        day: 'numeric', month: 'short', year: 'numeric'
    });

    return (
        <Card className="mb-4 shadow-sm bg-dark text-light border-secondary">
            
            {/* Imagen del post o imagen aleatoria de relleno */}
            <Card.Img 
                variant="top" 
                src={post.image ? post.image : `https://picsum.photos/seed/${post.id}/600/300`} 
                alt="Imagen del post" 
                style={{ maxHeight: '300px', objectFit: 'cover' }} 
            />
            
            <Card.Body>
                
                <Card.Subtitle className="mb-3 text-info d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        {/* Avatar dinámico "Thumbs" */}
                        <img 
                            src={`https://api.dicebear.com/10.x/thumbs/svg?seed=${post.User?.nickName}`} 
                            alt="Avatar" 
                            width="35" 
                            height="35" 
                            className="rounded-circle me-2 bg-secondary p-1" 
                        />
                        <span className="fw-bold">@{post.User?.nickName || "Usuario desconocido"}</span>
                    </div>
                    <span className="text-muted" style={{fontSize: '0.85em'}}>{fecha}</span>
                </Card.Subtitle>

                <Card.Text className="fs-5">
                    {post.description}
                </Card.Text>

                <div className="mb-3">
                    {post.Tags && post.Tags.length > 0 ? (
                        post.Tags.map((tag) => (
                            <Badge bg="secondary" className="me-2" key={tag.id}>
                                #{tag.name}
                            </Badge>
                        ))
                    ) : (
                        <small className="text-muted">Sin etiquetas</small>
                    )}
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top border-secondary">
                    <small className="text-muted">
                        💬 {post.Comments ? post.Comments.length : 0} comentarios
                    </small>
                    
                    <Link to={`/post/${post.id}`}>
                        <Button variant="outline-info" size="sm">
                            Ver más
                        </Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
}