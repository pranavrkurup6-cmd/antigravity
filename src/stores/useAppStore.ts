import { create } from 'zustand';
import { mockUsers, mockRoles, mockLogs } from '../data/mockData';

interface AppState {
    users: typeof mockUsers;
    roles: typeof mockRoles;
    logs: typeof mockLogs;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    addUser: (user: any) => void;
    updateUser: (id: string, data: any) => void;
    deleteUser: (id: string) => void;
    setUsers: (users: any[]) => void;
    addLog: (log: any) => void;
}

export const useAppStore = create<AppState>((set) => ({
    users: mockUsers,
    roles: mockRoles,
    logs: mockLogs,
    theme: 'light',
    toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', newTheme);
        return { theme: newTheme };
    }),
    addUser: (user) => set((state) => ({ users: [...state.users, { ...user, id: Math.random().toString(36).substr(2, 9) }] })),
    updateUser: (id, data) => set((state) => ({
        users: state.users.map((u) => (u.id === id ? { ...u, ...data } : u)),
    })),
    deleteUser: (id) => set((state) => ({ users: state.users.filter((u) => u.id !== id) })),
    setUsers: (users) => set({ users }),
    addLog: (log) => set((state) => ({ logs: [log, ...state.logs] })),
}));
