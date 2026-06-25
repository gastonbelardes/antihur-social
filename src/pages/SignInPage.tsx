import { useState } from "react";
import { Form, Button, Alert, Container, Card} from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export function SignInPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function manejarSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Error al registrar el usuario");
        return;
      }

      navigate("/login");

    } catch (err) {
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  }
  return (
    <Container>
      <Card className="mx-auto" style={{ maxWidth: "420px" }}>
        <Card.Body>
          <Card.Title className="mb-3 text-center">Crear cuenta</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={manejarSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresá tu nombre de usuario"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresá tu email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>
            <Button type="submit" className="w-100" disabled={loading}>
              {loading ? "Registrando..." : "Registrarse"}
            </Button>
            <Button
              type="button"
              variant="link"
              className="w-100 mt-2"
              onClick={() => navigate("/login")}
            >
              Ya tengo cuenta
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}