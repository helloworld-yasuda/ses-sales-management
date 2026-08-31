"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { mockAuthUser, type AuthUser } from "@/contexts/AuthContext.mock";

export type { AuthUser };

type AuthContextValue = {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(mockAuthUser);

  const value: AuthContextValue = {
    user,
    login: (user) => {
      // TODO: 本番APIの結果でsetUserする
      setUser(user);
    },
    logout: () => {
      // TODO: セッション破棄 API
      setUser(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth は AuthProvider 内で使用してください");
  }
  return context;
};
