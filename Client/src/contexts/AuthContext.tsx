import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, mockUser } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (role: 'customer' | 'admin') => void;
  logout: () => void;
  updateRole: (role: 'customer' | 'admin') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: 'customer' | 'admin') => {
    const loggedInUser = {
      ...mockUser,
      role,
      name: role === 'admin' ? 'Admin User' : mockUser.name,
    };
    setUser(loggedInUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateRole = (role: 'customer' | 'admin') => {
    if (user) {
      setUser({ ...user, role });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        updateRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
