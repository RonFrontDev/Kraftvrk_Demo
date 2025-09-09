import React, { createContext, useState, useContext, useMemo, useCallback, useEffect } from 'react';
import type { User, WodLog, PersonalRecord } from '../types';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string) => Promise<void>;
  updateWodLog: (date: string, log: WodLog) => Promise<void>;
  updatePr: (exerciseId: string, pr: PersonalRecord) => Promise<void>;
  deletePr: (exerciseId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// In a real app, this would be a secure backend API call.
// For this demo, we'll manage a list of users in localStorage.
const getUsersFromStorage = (): User[] => {
  try {
    const users = localStorage.getItem('kraftvrk_users');
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
};

const saveUsersToStorage = (users: User[]) => {
  localStorage.setItem('kraftvrk_users', JSON.stringify(users));
};

const getCurrentUserFromSession = (users: User[]): User | null => {
    try {
        const userEmail = sessionStorage.getItem('kraftvrk_currentUser');
        if (!userEmail) return null;
        return users.find(u => u.email === userEmail) || null;
    } catch {
        return null;
    }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  const [users, setUsers] = useState<User[]>(getUsersFromStorage);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // On initial load, check for a session
    const userFromSession = getCurrentUserFromSession(users);
    if(userFromSession) {
        setCurrentUser(userFromSession);
    }
  }, [users]);


  const login = useCallback(async (email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => { // Simulate network delay
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          setCurrentUser(user);
          sessionStorage.setItem('kraftvrk_currentUser', user.email);
          resolve();
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  }, [users]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    sessionStorage.removeItem('kraftvrk_currentUser');
  }, []);

  const signup = useCallback(async (email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
          reject(new Error('User with this email already exists'));
        } else {
          const newUser: User = { email, password, wods: {}, prs: {} };
          const updatedUsers = [...users, newUser];
          setUsers(updatedUsers);
          saveUsersToStorage(updatedUsers);
          setCurrentUser(newUser);
          sessionStorage.setItem('kraftvrk_currentUser', newUser.email);
          resolve();
        }
      }, 500);
    });
  }, [users]);

  const updateUserInStateAndStorage = (updatedUser: User) => {
      setCurrentUser(updatedUser);
      const updatedUsers = users.map(u => u.email === updatedUser.email ? updatedUser : u);
      setUsers(updatedUsers);
      saveUsersToStorage(updatedUsers);
  };

  const updateWodLog = async (date: string, log: WodLog) => {
    if (!currentUser) return;
    const updatedUser: User = {
      ...currentUser,
      wods: { ...currentUser.wods, [date]: log },
    };
    updateUserInStateAndStorage(updatedUser);
  };

  const updatePr = async (exerciseId: string, pr: PersonalRecord) => {
    if (!currentUser) return;
    const updatedUser: User = {
      ...currentUser,
      prs: { ...currentUser.prs, [exerciseId]: pr },
    };
    updateUserInStateAndStorage(updatedUser);
  };
  
  const deletePr = async (exerciseId: string) => {
      if (!currentUser) return;
      const newPrs = { ...currentUser.prs };
      delete newPrs[exerciseId];
      const updatedUser: User = {
          ...currentUser,
          prs: newPrs,
      };
      updateUserInStateAndStorage(updatedUser);
  }

  const value = useMemo(() => ({
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    logout,
    signup,
    updateWodLog,
    updatePr,
    deletePr,
  }), [currentUser, login, logout, signup, updateWodLog, updatePr, deletePr]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
