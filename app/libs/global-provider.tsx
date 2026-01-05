import { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../utils/supabase";

type Role = "buyer" | "vendor" | null;

type GlobalContextType = {
    session: Session | null;
    isLoggedIn: boolean;
    loading: boolean;
    role: Role;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState<Role>(null);

    useEffect(() => {
        let mounted = true;

        const loadSession = async () => {
            try {
                const { data } = await supabase.auth.getSession();
                if (mounted) {
                    setSession(data.session ?? null);
                    setRole(data.session?.user?.user_metadata?.role ?? null);
                }
            } catch (error) {
                console.error("Error loading session:", error);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        loadSession();

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                setRole(session?.user?.user_metadata?.role ?? null);
            }
        );

        return () => {
            mounted = false;
            listener.subscription.unsubscribe();
        };
    }, []);

    const value: GlobalContextType = {
        session,
        isLoggedIn: !!session,
        loading,
        role,
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
