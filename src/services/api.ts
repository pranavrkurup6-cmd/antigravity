const API_URL = 'http://localhost:5000/api';

interface ApiError {
    message: string;
    success: boolean;
}

interface AuthResponse {
    success: boolean;
    token: string;
    user: any;
    message?: string;
}

export const api = {
    async login(email: string, password: string, role: string = 'user'): Promise<AuthResponse> {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, role }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            return data;
        } catch (error: any) {
            console.error('Login error:', error);
            throw error;
        }
    },

    async register(userData: any): Promise<AuthResponse> {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            return data;
        } catch (error: any) {
            console.error('Registration error:', error);
            throw error;
        }
    },

    async getProfile(token: string): Promise<any> {
        try {
            const response = await fetch(`${API_URL}/users/profile`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch profile');
            }

            return data;
        } catch (error) {
            console.error('Profile fetch error:', error);
            throw error;
        }
    },

    async getUsers(token: string): Promise<any> {
        try {
            const response = await fetch(`${API_URL}/admin/users`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to fetch users');
            return data;
        } catch (error) {
            console.error('Get users error:', error);
            throw error;
        }
    },

    async deleteUser(id: string, type: 'user' | 'provider', token: string): Promise<any> {
        try {
            // The backend expects query param userType
            const response = await fetch(`${API_URL}/admin/users/${id}?userType=${type}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to delete user');
            return data;
        } catch (error) {
            console.error('Delete user error:', error);
            throw error;
        }
    },

    async getProviderDashboard(token: string): Promise<any> {
        try {
            const response = await fetch(`${API_URL}/providers/dashboard`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to fetch provider dashboard');
            return data;
        } catch (error) {
            console.error('Get provider dashboard error:', error);
            throw error;
        }
    }
};
