import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '@/lib/api';

type RawUser = {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  role: string;
  district?: string;
  isActive?: boolean;
  [k: string]: any;
};

interface User {
  id: string;                 // normalized
  name: string;
  email: string;
  role: string;
  district?: string;
  isActive: boolean;
  [k: string]: any;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const normalizeUser = (u: RawUser): User => {
  if (!u) throw new Error('Malformed user');
  return {
    id: (u.id || u._id)!,
    name: u.name,
    email: u.email,
    role: u.role,
    district: u.district,
    isActive: u.isActive ?? true,
    ...u, // keep extra fields like village, skills, contactPrefs if present
  };
};

// Helper to unwrap either {data:{...}} or flat {...}
const unwrap = <T,>(res: any): T => {
  // axios puts payload in res.data
  const d = res?.data;
  // support {data:{...}} (nest) and flat {...}
  return (d?.data ?? d) as T;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          // Ensure your authAPI attaches Authorization: Bearer <token>
          const res = await authAPI.getMe();
          const payload = unwrap<any>(res);
          // Accept any of: {user}, {data:user}, or the user object itself
          const rawUser: RawUser =
              payload?.user ?? payload?.data ?? payload;
          const norm = normalizeUser(rawUser);
          setUser(norm);
          setToken(storedToken);
        } catch (err) {
          console.error('Auth check failed:', err);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const persist = (newToken: string, rawUser: RawUser) => {
    const norm = normalizeUser(rawUser);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(norm));
    setToken(newToken);
    setUser(norm);
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await authAPI.login({ email, password });
      const data = unwrap<any>(res); // supports {success, token, user} OR {data:{...}}
      if (data?.success === false) throw new Error(data?.message || 'Login failed');

      const newToken: string = data?.token ?? data?.data?.token;
      const rawUser: RawUser  = data?.user  ?? data?.data?.user;

      if (!newToken || !rawUser) throw new Error('Malformed response from server');
      persist(newToken, rawUser);
    } catch (error: any) {
      // Surface server message if present
      const msg =
          error?.response?.data?.message ||
          error?.message ||
          'Login failed';
      throw new Error(msg);
    }
  };

  const register = async (payload: any) => {
    try {
      const res = await authAPI.register(payload);
      const data = unwrap<any>(res);
      if (data?.success === false) throw new Error(data?.message || 'Registration failed');

      const newToken: string = data?.token ?? data?.data?.token;
      const rawUser: RawUser  = data?.user  ?? data?.data?.user;

      if (!newToken || !rawUser) throw new Error('Malformed response from server');
      persist(newToken, rawUser);
    } catch (error: any) {
      const msg =
          error?.response?.data?.message ||
          error?.message ||
          'Registration failed';
      throw new Error(msg);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
      <AuthContext.Provider
          value={{
            user,
            token,
            loading,
            login,
            register,
            logout,
            isAuthenticated: !!token && !!user,
          }}
      >
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
