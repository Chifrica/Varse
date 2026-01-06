import { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../utils/supabase";

type Role = "buyer" | "vendor" | null;

type GlobalContextType = {
    session: Session | null;
    isLoggedIn: boolean;
    loading: boolean;
    role: Role;
    error: string | null;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState<Role>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        const loadSession = async () => {
            try {
                if (!supabase) {
                    throw new Error("Supabase client not initialized");
                }

                const { data, error: sessionError } = await supabase.auth.getSession();
                
                if (sessionError) {
                    throw sessionError;
                }

                if (mounted) {
                    setSession(data?.session ?? null);
                    setRole(data?.session?.user?.user_metadata?.role ?? null);
                    setError(null);
                }
            } catch (error) {
                console.error("Error loading session:", error);
                if (mounted) {
                    setError(error instanceof Error ? error.message : "Failed to load session");
                    setSession(null);
                    setRole(null);
                }
            } finally {
                if (mounted) setLoading(false);
            }
        };

        loadSession();

        try {
            const { data: listener } = supabase.auth.onAuthStateChange(
                (_event: any, session: Session | null) => {
                    if (mounted) {
                        setSession(session);
                        setRole(session?.user?.user_metadata?.role ?? null);
                    }
                }
            );

            return () => {
                mounted = false;
                listener?.subscription?.unsubscribe();
            };
        } catch (error) {
            console.error("Error setting up auth listener:", error);
            if (mounted) {
                setError("Failed to set up authentication");
            }
        }
    }, []);

    const value: GlobalContextType = {
        session,
        isLoggedIn: !!session,
        loading,
        role,
        error,
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContext() {
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }

    return context;
}