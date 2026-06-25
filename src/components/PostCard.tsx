import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// Le avisamos a TypeScript qué props recibe la tarjeta
interface PostProps {
    post: {
        id: number;
        description: string;
        image?: string;
    }
}

export function PostCard({ post }: PostProps) {
    return (
        <Card className="mb-4 shadow-sm">
            {post.image && (
                <Card.Img variant="top" src={post.image} alt="Imagen del post" />
            )}
            
            <Card.Body className="d-flex flex-column">
                <Card.Text className="fs-5">{post.description}</Card.Text>
                
                <Link to={`/post/${post.id}`} className="mt-auto">
                    <Button variant="outline-primary" size="sm">
                        Ver más comentarios
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    );
}