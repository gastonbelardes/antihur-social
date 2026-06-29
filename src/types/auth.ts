// src/types/auth.ts

// 1. El molde de un Usuario (lo que nos va a devolver la API del profe)
export type User = {
    id: string; 
    nickName: string;
    email: string
};

// 2. El molde de los datos que viajan desde tu formulario de login
export type LoginData = {
    nickName: string;
    password?: string; 
};

// 3. El molde de nuestro Contexto Global (lo que va a estar disponible en toda la app)
export type AuthContextType = {
    user: User | null; // Puede haber un usuario logueado, o puede ser null si es un invitado
    isAuthenticated: boolean; // Un booleano fácil para preguntar si está logueado o no
    login: (nickName: string, password: string) => Promise<boolean>;
    logout: () => void; // La función para cerrar sesión
};