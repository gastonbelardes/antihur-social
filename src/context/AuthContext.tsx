import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { AuthContextType, User } from "../types/auth";


// 1. Creamos el "canal" vacío
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Acá ponés la URL donde esté corriendo la API del profe (generalmente es el puerto 3000 o 3001)
const API_URL = "http://localhost:3001"; 

export function AuthProvider({ children }: { children: ReactNode }) {
    
    // 2. ¿Te suena esto? ¡Es tu misma lógica del changuito pero para el usuario!
    const [user, setUser] = useState<User | null>(() => {
        const guardado = localStorage.getItem("usuarioLogueado");
        return guardado ? JSON.parse(guardado) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem("usuarioLogueado", JSON.stringify(user));
        } else {
            localStorage.removeItem("usuarioLogueado");
        }
    }, [user]);

    // 3. La función maestra de Login
    const login = async (nickName: string): Promise<boolean> => {
        try {
            // Le pegamos a la API para traer todos los usuarios
            const respuesta = await fetch(`${API_URL}/users`);
            const usuarios: User[] = await respuesta.json();

            // Buscamos si existe alguno con el nickName que escribió en el formulario
            const usuarioEncontrado = usuarios.find(u => u.nickName === nickName);

            if (usuarioEncontrado) {
                setUser(usuarioEncontrado); // ¡Lo encontramos! Lo guardamos en el estado
                return true;
            } else {
                return false; // No existe ese usuario
            }
        } catch (error) {
            console.error("Error al conectar con la API:", error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: user !== null, // Si hay un user, esto da true
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

// 4. Hook personalizado (como el que vimos en las capturas de la clase)
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
}