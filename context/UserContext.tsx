"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axios"; // pastikan ini instance axios kamu

type User = {
  id: string;
  email: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loading: true,
  refreshUser: async () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  // const router = useRouter();

  const refreshUser = async () => {
    try {
      const res = await api.get("/me");
      const data = res.data as { user: User };
      setUser(data.user);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/me");
        const data = res.data as { user: User };
        setUser(data.user);
      } catch {
        setUser(null);
        // router.push("/login"); ❌ Jangan redirect langsung dari sini, nanti annoying pas akses publik
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
