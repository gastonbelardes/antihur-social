import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { AuthContextType, User } from "../types/auth";

// Definimos el contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = "http://localhost:3001";

export function AuthProvider({ children }: { children: ReactNode }) {

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

    const login = async (
        nickName: string,
        password: string
    ): Promise<boolean> => {
        try {
            const respuesta = await fetch(`${API_URL}/users`);
            const usuarios: User[] = await respuesta.json();

            const usuarioEncontrado = usuarios.find(
                u => u.nickName === nickName
            );

            if (!usuarioEncontrado) {
                return false;
            }

            if (password !== "123456") {
                return false;
            }

            setUser(usuarioEncontrado);
            return true;

        } catch (error) {
            console.error("Error al conectar con la API:", error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: user !== null,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }

    return context;
}