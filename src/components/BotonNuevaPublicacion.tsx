import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export function BotonNuevaPublicacion() {
  return (
    <Link to="/publicacion">
      <Button
        variant="info"
        className="rounded-pill shadow"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1050,
          padding: '10px 20px',
          fontWeight: 'bold',
        }}
      >
        + Nueva publicación
      </Button>
    </Link>
  );
}