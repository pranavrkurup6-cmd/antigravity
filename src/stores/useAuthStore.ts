import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'Admin' | 'User' | 'ServiceProvider';

export interface Location {
    lat: number;
    lng: number;
    address: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    location?: Location;
    // Provider specific fields
    specialty?: string;
    rating?: number;
    completedJobs?: number;
    hourlyRate?: number;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
    updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            login: (user) => set({ user, isAuthenticated: true }),
            logout: () => set({ user: null, isAuthenticated: false }),
            updateUser: (updates: Partial<User>) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...updates } : null,
                })),
        }),
        {
            name: 'auth-storage',
        }
    )
);
