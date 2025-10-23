import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { APP_LOGO } from "@/const";
import { AlertCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Check if user is already authenticated and redirect to home
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const isAuth = localStorage.getItem("authenticated") === "true";
    if (isAuth && userStr) {
      window.location.href = "/home";
    }
  }, []);

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: async (data) => {
      toast.success("Login successful!");
      // Set user data in localStorage for immediate authentication
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("authenticated", "true");
      // Dispatch custom event to update navbar immediately
      window.dispatchEvent(new CustomEvent('authStateChanged'));
      // Redirect to home page
      window.location.href = "/home";
    },
    onError: (error) => {
      setError(error.message || "Login failed");
      setLoading(false);
    },
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-2 hover:border-primary/20 transition-all duration-500 relative z-10">
        <CardHeader className="space-y-6 text-center pb-8">
          <div className="flex justify-center animate-in fade-in slide-in-from-top duration-700">
            <img src={APP_LOGO} alt="BCX" className="h-16 transition-all duration-300 hover:scale-110" />
          </div>
          <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-100">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Welcome to BCX API Marketplace
            </CardTitle>
            <CardDescription className="mt-3 text-lg">
              Sign in to access your API dashboard and manage your subscriptions
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <Alert variant="destructive" className="animate-in fade-in slide-in-from-top duration-300">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-3 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="santhosh@bcx.co.za"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="h-12 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-3 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="h-12 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg animate-in fade-in slide-in-from-bottom duration-700 delay-400" 
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground mt-6 animate-in fade-in slide-in-from-bottom duration-700 delay-500">
              <p className="bg-gray-50 p-3 rounded-lg border">
                <strong>Demo Credentials:</strong><br />
                Email: santhosh@bcx.co.za<br />
                Password: bcx123
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

