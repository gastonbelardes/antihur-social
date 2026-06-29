import { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
    
    const [datos, setDatos] = useState({
        nickName: "",
        password: ""
    });

    
    const [errores, setErrores] = useState<Record<string, string>>({});
    const [errorLogin, setErrorLogin] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    
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
            nuevosErrores.nickName = "El usuario es obligatorio";
        }

        if (!datos.password.trim()) {
            nuevosErrores.password = "La contraseña es obligatoria";
        }

        return nuevosErrores;
    };

    
    const manejarSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const erroresEncontrados = validar();

    if (Object.keys(erroresEncontrados).length > 0) {
        setErrores(erroresEncontrados);
        return;
    }

    setErrores({});
    
    
    if (datos.password === "123456") {
        
        
        const loginExitoso = await login(datos.nickName);
        
        if (loginExitoso) {
            
            navigate("/"); 
        } else {
            setErrorLogin("El usuario no existe. ¡Registrate primero!");
        }
    } else {
        setErrorLogin("Credenciales incorrectas");
    }
};
    return (
        <Container className="mt-5" style={{ maxWidth: "500px" }}>
            <h2 className="mb-4">Iniciar Sesión</h2>

            {errorLogin && (
                <Alert variant="danger">
                    {errorLogin}
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
                    />
                    <small className="text-danger fw-bold">
                        {errores.nickName}
                    </small>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={datos.password}
                        onChange={manejarCambio}
                        placeholder="Ingresá 123456"
                    />
                    <small className="text-danger fw-bold">
                        {errores.password}
                    </small>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Entrar
                </Button>
            </Form>
        </Container>
    );
}