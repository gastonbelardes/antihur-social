import { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

export function RegistroPage() {
    const [datos, setDatos] = useState({
        nickName: "",
        email: "",
        password: "" 
    });

    const [errores, setErrores] = useState<Record<string, string>>({});
    const [errorServer, setErrorServer] = useState("");
    const [registroExitoso, setRegistroExitoso] = useState(false);
    const [sugerencias, setSugerencias] = useState<string[]>([]);

    const navigate = useNavigate();
    const API_URL = "http://localhost:3001"; 

    const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDatos({
            ...datos,
            [name]: value
        });
    };

    const validar = () => {
        const nuevosErrores: Record<string, string> = {};

        if (!datos.nickName.trim()) {
            nuevosErrores.nickName = "El nombre de usuario es obligatorio";
        }
        if (!datos.email.trim()) {
            nuevosErrores.email = "El correo electrónico es obligatorio";
        } else if (!/\S+@\S+\.\S+/.test(datos.email)) {
            nuevosErrores.email = "El formato de email no es válido";
        }
        if (!datos.password.trim()) {
            nuevosErrores.password = "La contraseña es obligatoria";
        }

        return nuevosErrores;
    };

    const manejarSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorServer("");
        
        const erroresEncontrados = validar();
        if (Object.keys(erroresEncontrados).length > 0) {
            setErrores(erroresEncontrados);
            return;
        }

        setErrores({});

        try {
            const respuesta = await fetch(`${API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nickName: datos.nickName,
                    email: datos.email
                })
            });

            const resultado = await respuesta.json();

            if (respuesta.ok) {
                setRegistroExitoso(true);
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                // El mensaje nuevo que pediste
                setErrorServer("Nombre de usuario en uso, prueba con otro.");
                
                // Generamos las 3 sugerencias
                const base = datos.nickName;
                setSugerencias([
                    `${base}${Math.floor(Math.random() * 100)}`,
                    `${base}_${Math.floor(Math.random() * 1000)}`,
                    `${base}2026` 
                ]);
            }
        } catch (error) {
            console.error("Error en el registro:", error);
            setErrorServer("Error al conectar con el servidor. Asegurate de que la API esté prendida.");
        }
    };

    return (
        <Container className="mt-5" style={{ maxWidth: "500px" }}>
            <h2 className="mb-4">Crear Cuenta</h2>

            {/* ALERTA DE ERROR + SUGERENCIAS CLICKEABLES */}
            {errorServer && (
                <Alert variant="danger">
                    <div>{errorServer}</div>
                    
                    {sugerencias.length > 0 && (
                        <div className="mt-2">
                            <strong>Sugerencias: </strong>
                            {sugerencias.map((sug, index) => (
                                <span 
                                    key={index} 
                                    className="badge bg-dark me-2 p-2 mt-1" 
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        setDatos({ ...datos, nickName: sug });
                                        setErrorServer("");
                                        setSugerencias([]);
                                    }}
                                >
                                    {sug}
                                </span>
                            ))}
                        </div>
                    )}
                </Alert>
            )}

            {/* ALERTA DE ÉXITO */}
            {registroExitoso && (
                <Alert variant="success">
                    ¡Usuario creado con éxito! Redirigiéndote al login...
                </Alert>
            )}

            <Form onSubmit={manejarSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Usuario (nickName)</Form.Label>
                    <Form.Control
                        type="text"
                        name="nickName"
                        value={datos.nickName}
                        onChange={manejarCambio}
                        placeholder="Ej: gaston_dev"
                        disabled={registroExitoso}
                    />
                    <small className="text-danger fw-bold">
                        {errores.nickName}
                    </small>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={datos.email}
                        onChange={manejarCambio}
                        placeholder="nombre@ejemplo.com"
                        disabled={registroExitoso}
                    />
                    <small className="text-danger fw-bold">
                        {errores.email}
                    </small>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={datos.password}
                        onChange={manejarCambio}
                        placeholder="Ingresá una contraseña de prueba"
                        disabled={registroExitoso}
                    />
                    <small className="text-danger fw-bold">
                        {errores.password}
                    </small>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mb-3" disabled={registroExitoso}>
                    Registrarse
                </Button>

                <div className="text-center">
                    <small>
                        ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión acá</Link>
                    </small>
                </div>
            </Form>
        </Container>
    );
}