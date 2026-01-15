"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    user: { email: string; name: string } | null;
    login: (email: string, name: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<{ email: string; name: string } | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (typeof window !== "undefined") {
            // Проверяем localStorage при загрузке
            const savedAuth = localStorage.getItem("isAuthenticated");
            const savedUser = localStorage.getItem("user");
            
            if (savedAuth === "true" && savedUser) {
                try {
                    const userData = JSON.parse(savedUser);
                    setIsAuthenticated(true);
                    setUser(userData);
                } catch (error) {
                    // Если данные повреждены, очищаем
                    localStorage.removeItem("isAuthenticated");
                    localStorage.removeItem("user");
                }
            }
        }
    }, []);

    const login = (email: string, name: string) => {
        const userData = { email, name };
        setIsAuthenticated(true);
        setUser(userData);
        
        if (typeof window !== "undefined") {
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("user", JSON.stringify(userData));
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        
        if (typeof window !== "undefined") {
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("user");
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
