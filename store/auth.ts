//store/auth.ts
import { create } from 'zustand';

interface AuthState {
    user: { email: string } | null;
    isAuthenticated: boolean;
    currency: string;
    language: string;
    setCurrency: (currency: string) => void;
    setLanguage: (language: string) => void;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    currency: 'USD',
    language: 'EN',
    setCurrency: (currency: string) => set({ currency }),
    setLanguage: (language: string) => set({ language }),
    // app/store/auth.ts (snippet)
    login: async (email: string, password: string) => {
        const response = await fetch(`http://localhost:3001/users?email=${encodeURIComponent(email)}`);
        if (!response.ok) {
            throw new Error('Login failed');
        }
        const users = await response.json();
        const user = users.find((u: { email: string; password: string }) => u.email === email && u.password === password);
        if (user) {
            set({ user: { email }, isAuthenticated: true });
            // Set cookie
            document.cookie = 'isAuthenticated=true; path=/';
        } else {
            throw new Error('Invalid email or password');
        }
    },
    register: async (email: string, password: string) => {
        const checkResponse = await fetch(`http://localhost:3001/users?email=${encodeURIComponent(email)}`);
        const existingUsers = await checkResponse.json();
        if (existingUsers.length > 0) {
            throw new Error('User already exists');
        }
        const response = await fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
            set({ user: { email }, isAuthenticated: true });
            // Set cookie
            document.cookie = 'isAuthenticated=true; path=/';
        } else {
            throw new Error('Registration failed');
        }
    },
    logout: () => {
        set({ user: null, isAuthenticated: false });
        document.cookie = 'isAuthenticated=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    },
}));