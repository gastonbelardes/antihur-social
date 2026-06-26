import { Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

export function ProfilePage(){
    const {user} = useAuth()
    return(
        <Container  className="mt-5" style={{ maxWidth: "600px" }}>
            <h1>Bienvenido, {user?.nickName} </h1>
        </Container>
    )
}