import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { APP_LOGO } from "@/const";
import { Activity, Key, TrendingUp, Clock, ArrowRight, ExternalLink, Copy, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import SharedNavbar from "@/components/SharedNavbar";

export default function Dashboard() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [authState, setAuthState] = useState({ isAuthenticated: false, user: null });
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

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
      const newAuthState = getAuthState();
      setAuthState(newAuthState);
      setIsCheckingAuth(false);
    };

    // Small delay to ensure localStorage is available
    const timer = setTimeout(() => {
      updateAuthState();
    }, 100);

    // Listen for storage changes
    window.addEventListener('storage', updateAuthState);
    window.addEventListener('authStateChanged', updateAuthState);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('storage', updateAuthState);
      window.removeEventListener('authStateChanged', updateAuthState);
    };
  }, []);

  // Redirect to login if not authenticated (but only after checking)
  useEffect(() => {
    if (!isCheckingAuth && !authState.isAuthenticated) {
      window.location.href = "/login";
    }
  }, [authState.isAuthenticated, isCheckingAuth]);

  const { data: subscriptions, isLoading: loadingSubscriptions } = trpc.subscriptions.list.useQuery(
    undefined,
    { enabled: authState.isAuthenticated }
  );
  const { data: apis } = trpc.apis.list.useQuery();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    toast.success(`${label} copied to clipboard`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Show loading while checking authentication
  if (isCheckingAuth || !authState.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const subscribedApis = subscriptions?.filter(s => s.status === "active") || [];
  const totalApiCalls = subscribedApis.length * 1247; // Mock data
  const mockApiKey = "bcx_live_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Shared Navbar */}
      <SharedNavbar />

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="container">
          {/* Welcome Section */}
          <div className="mb-8 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 rounded-2xl border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Welcome back, {authState.user?.name || authState.user?.email || "Developer"}! 👋</h1>
                <p className="text-muted-foreground text-lg">
                  Here's an overview of your API usage and subscriptions
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                  <Activity className="w-12 h-12 text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                <Key className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{subscribedApis.length}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  APIs currently subscribed
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">API Calls (30d)</CardTitle>
                <Activity className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{totalApiCalls.toLocaleString()}</div>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">99.8%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Across all APIs
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                <Clock className="h-5 w-5 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">124ms</div>
                <p className="text-xs text-green-600 mt-1">
                  -8ms from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* API Key Section */}
          <Card className="mb-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-xl">Your API Key</CardTitle>
                  <CardDescription className="text-gray-300 mt-1">
                    Use this key to authenticate your API requests
                  </CardDescription>
                </div>
                <Key className="w-8 h-8 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-black/30 rounded-lg p-4 font-mono text-sm flex items-center justify-between backdrop-blur-sm border border-white/10">
                <code className="text-gray-200">{mockApiKey}</code>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20 gap-2"
                  onClick={() => copyToClipboard(mockApiKey, "API Key")}
                >
                  {copiedKey === "API Key" ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copy
                    </>
                  )}
                </Button>
              </div>
              <div className="mt-4 flex items-start gap-2 text-sm text-gray-300">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>Keep your API key secure. Do not share it publicly or commit it to version control.</p>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Subscribed APIs - Takes 2 columns */}
            <Card className="lg:col-span-2 shadow-lg">
              <CardHeader className="border-b bg-gray-50/50">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Your Subscribed APIs</CardTitle>
                    <CardDescription className="mt-1">
                      Manage and monitor your active API subscriptions
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-primary border-primary">
                    {subscribedApis.length} Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {loadingSubscriptions ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-20 bg-gray-200 rounded-lg"></div>
                      </div>
                    ))}
                  </div>
                ) : subscribedApis.length > 0 ? (
                  <div className="space-y-4">
                    {subscribedApis.map((subscription) => {
                      const api = apis?.find(a => a.id === subscription.apiId);
                      if (!api) return null;
                      return (
                        <div key={subscription.id} className="group">
                          <Link href={`/apis/${api.id}`}>
                            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 hover:border-primary/50 transition-all cursor-pointer">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <p className="font-semibold text-lg">{api.name}</p>
                                  <Badge variant="outline" className="text-xs">{api.method}</Badge>
                                  <Badge variant="secondary" className="text-xs">{api.version}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-1">{api.description}</p>
                                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                  <span>Rate Limit: {api.rateLimit}</span>
                                  <span>•</span>
                                  <span>Subscribed: {new Date(subscription.createdAt).toLocaleDateString()}</span>
                                </div>
                              </div>
                              <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <Key className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-lg font-medium mb-2">No active subscriptions</p>
                    <p className="text-muted-foreground mb-6">Start by browsing our API marketplace</p>
                    <Link href="/apis">
                      <Button className="gap-2">
                        Browse APIs <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions Sidebar */}
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader className="border-b bg-gray-50/50">
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common tasks and shortcuts
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-3">
                  <Link href="/apis">
                    <Button variant="outline" className="w-full justify-start gap-2 hover:bg-primary hover:text-white transition-colors">
                      <Activity className="w-4 h-4" />
                      Browse Available APIs
                    </Button>
                  </Link>
                  <Link href="/documentation">
                    <Button variant="outline" className="w-full justify-start gap-2 hover:bg-primary hover:text-white transition-colors">
                      <ExternalLink className="w-4 h-4" />
                      View Documentation
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-primary/20">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="text-lg">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Our support team is available 24/7 to help you with any questions or issues.
                  </p>
                  <Button variant="default" className="w-full gap-2">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

