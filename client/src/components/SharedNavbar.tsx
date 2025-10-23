import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { APP_LOGO } from "@/const";
import { LogOut } from "lucide-react";
import { useState, useEffect } from "react";

export default function SharedNavbar() {
  const [authState, setAuthState] = useState({ isAuthenticated: false, user: null });

  // Get authentication state from localStorage
  const getAuthState = () => {
    if (typeof window === "undefined") return { isAuthenticated: false, user: null };
    const userStr = localStorage.getItem("user");
    const isAuth = localStorage.getItem("authenticated") === "true";
    if (isAuth && userStr) {
      try {
        const user = JSON.parse(userStr);
        return { isAuthenticated: true, user };
      } catch {
        return { isAuthenticated: false, user: null };
      }
    }
    return { isAuthenticated: false, user: null };
  };

  // Update auth state on component mount and storage changes
  useEffect(() => {
    const updateAuthState = () => {
      setAuthState(getAuthState());
    };

    // Initial check
    updateAuthState();

    // Listen for storage changes
    window.addEventListener('storage', updateAuthState);
    
    // Also listen for custom events (for same-tab updates)
    window.addEventListener('authStateChanged', updateAuthState);

    return () => {
      window.removeEventListener('storage', updateAuthState);
      window.removeEventListener('authStateChanged', updateAuthState);
    };
  }, []);

  return (
    <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <Link href="/home" className="flex items-center gap-3 animate-in fade-in slide-in-from-left duration-500 cursor-pointer hover:opacity-80 transition-opacity">
            <img src={APP_LOGO} alt="BCX" className="h-8" />
            <span className="text-sm text-muted-foreground border-l pl-3">API Marketplace</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/home" className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105">
              Home
            </Link>
            <Link href="/apis" className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105">
              Browse APIs
            </Link>
            <Link href="/documentation" className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105">
              Documentation
            </Link>
          </nav>
          <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right duration-500">
            {authState.isAuthenticated ? (
              <>
                <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Welcome, {authState.user?.name || authState.user?.email}</span>
                </div>
                <Link href="/dashboard">
                  <Button variant="outline" size="sm" className="transition-all duration-300 hover:scale-105">Dashboard</Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="sm" className="transition-all duration-300 hover:scale-105">My APIs</Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("authenticated");
                    // Dispatch custom event to update navbar immediately
                    window.dispatchEvent(new CustomEvent('authStateChanged'));
                    window.location.href = "/login";
                  }}
                  className="transition-all duration-300 hover:scale-105 hover:text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm" className="transition-all duration-300 hover:scale-105">Sign In</Button>
                </Link>
                <Link href="/login">
                  <Button size="sm" className="transition-all duration-300 hover:scale-105">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
