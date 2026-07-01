import { useState, useEffect} from "react";
import { Form, Button, Alert, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { Tag } from "../types/interfaces";

export function PublicacionPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const cerrarSesion = () => {
    logout();
    navigate("/login");
  };

  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([""]);
  const [tagsDisponibles, setTagsDisponibles] = useState<Tag[]>([]);
  const [tagsSeleccionados, setTagsSeleccionados] = useState<number[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const API_URL = "http://localhost:3001";

  useEffect(() => {
    async function traerTags() {
      const respuesta = await fetch(`${API_URL}/tags`);
      const data = await respuesta.json();
      setTagsDisponibles(data);
    }
    traerTags();
  }, []);

  
  function manejarCambioUrls(index: number, value: string) {
    setImageUrls((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  }

  
  function manejarAgregarUrl() {
    setImageUrls((prev) => [...prev, ""]);
  }

 
  function manejarEliminarUrl(index: number) {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  }

  function manejarTags(tagId: number) {
    setTagsSeleccionados((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  }

  async function manejarSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCargando(true);
    setError("");

    try {
      const postRespuesta = await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          userId: user?.id,
          tagIds: tagsSeleccionados,
        }),
      });

      if (!postRespuesta.ok) throw new Error("Error al crear la publicación");

      const postCreado = await postRespuesta.json();

      const urlsValidas = imageUrls.filter((url) => url.trim() !== "");
      for (const url of urlsValidas) {
        await fetch(`${API_URL}/postimages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url,
            postId: postCreado.id,
          }),
        });
      }

      navigate("/profile");

    } catch (err) {
      setError("Ocurrió un error al publicar. Intentá de nuevo.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <Container>
      <Card className="mx-auto" style={{ maxWidth: "600px" }}>
        <Card.Body>
          <Card.Title className="mb-3 text-center">Crear Nueva Publicación</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={manejarSubmit}>

            <Form.Group className="mb-3">
              <Form.Label>Descripción *</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Escribí tu publicación"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URLs de imágenes</Form.Label>
              {imageUrls.map((url, index) => (
                <div key={index} className="d-flex gap-2 mb-2">
                  <Form.Control
                    type="url"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    value={url}
                    onChange={(e) => manejarCambioUrls(index, e.target.value)}
                  />
                  {imageUrls.length > 1 && (
                    <Button
                      type="button"
                      variant="outline-danger"
                      onClick={() => manejarEliminarUrl(index)}
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline-secondary"
                size="sm"
                onClick={manejarAgregarUrl}
              >
                + Agregar otra imagen
              </Button>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <div className="d-flex flex-wrap gap-2">
                {tagsDisponibles.map((tag: Tag) => (
                  <Button
                    key={tag.id}
                    type="button"
                    variant={tagsSeleccionados.includes(tag.id) ? "primary" : "outline-primary"}
                    size="sm"
                    onClick={() => manejarTags(tag.id)}
                  >
                    {tag.name}
                  </Button>
                ))}
              </div>
            </Form.Group>

            <Button type="submit" className="w-100" disabled={cargando}>
              {cargando ? "Publicando..." : "Publicar"}
            </Button>
            <Button
              type="button"
              variant="link"
              className="w-100 mt-2"
              onClick={() => navigate("/profile")}
            >
              Cancelar
            </Button>

          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}