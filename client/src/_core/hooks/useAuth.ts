import { trpc } from "@/lib/trpc";
import { TRPCClientError } from "@trpc/client";
import { useCallback, useEffect, useMemo, useState } from "react";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false, redirectPath = "/login" } =
    options ?? {};
  const utils = trpc.useUtils();
  const [forceUpdate, setForceUpdate] = useState(0);

  const meQuery = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
    enabled: false, // Disable server query, use localStorage only
  });

  // Check localStorage for simple authentication
  const getLocalUser = () => {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("user");
    const isAuth = localStorage.getItem("authenticated") === "true";
    if (isAuth && userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  };

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      utils.auth.me.setData(undefined, null);
      // Clear localStorage
      localStorage.removeItem("manus-runtime-user-info");
      localStorage.removeItem("user");
      localStorage.removeItem("authenticated");
    },
  });

  const logout = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error: unknown) {
      if (
        error instanceof TRPCClientError &&
        error.data?.code === "UNAUTHORIZED"
      ) {
        return;
      }
      throw error;
    } finally {
      // Clear localStorage immediately
      localStorage.removeItem("user");
      localStorage.removeItem("authenticated");
      localStorage.removeItem("manus-runtime-user-info");
      utils.auth.me.setData(undefined, null);
      await utils.auth.me.invalidate();
    }
  }, [logoutMutation, utils]);

  // Listen for storage changes to update authentication state
  useEffect(() => {
    const handleStorageChange = () => {
      setForceUpdate(prev => prev + 1);
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const state = useMemo(() => {
    const localUser = getLocalUser();
    
    // Use only local user for authentication
    const user = localUser;
    
    localStorage.setItem(
      "manus-runtime-user-info",
      JSON.stringify(user)
    );
    
    return {
      user,
      loading: false, // No server loading needed
      error: null,
      isAuthenticated: Boolean(user),
    };
  }, [forceUpdate]);

  useEffect(() => {
    if (!redirectOnUnauthenticated) return;
    if (logoutMutation.isPending) return;
    if (state.user) return;
    if (typeof window === "undefined") return;
    if (window.location.pathname === redirectPath) return;

    window.location.href = redirectPath
  }, [
    redirectOnUnauthenticated,
    redirectPath,
    logoutMutation.isPending,
    state.user,
  ]);

  return {
    ...state,
    refresh: () => {
      // Force re-check of localStorage
      const localUser = getLocalUser();
      // Trigger a re-render by updating the state
      window.dispatchEvent(new Event('storage'));
    },
    logout,
  };
}
