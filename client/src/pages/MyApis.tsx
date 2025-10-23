import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { ArrowLeft, Key, ExternalLink } from "lucide-react";
// Removed getLoginUrl import


export default function MyApis() {
  const { isAuthenticated, loading } = useAuth();
  const { data: subscriptions, isLoading: loadingSubscriptions } = trpc.subscriptions.mySubscriptions.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  // Get API details for each subscription
  const apiQueries = subscriptions?.map((sub) =>
    trpc.apis.getById.useQuery({ id: sub.apiId })
  ) || [];

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = "/login";
    }
  }, [isAuthenticated, loading]);

  if (loading || loadingSubscriptions) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-black">BC</span>
                  <span className="text-3xl font-bold text-primary">X</span>
                </div>
                <span className="text-sm text-muted-foreground border-l pl-3">API Marketplace</span>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/home" className="text-sm font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/apis" className="text-sm font-medium hover:text-primary transition-colors">
                Browse APIs
              </Link>
              <Link href="/my-apis" className="text-sm font-medium text-primary">
                My APIs
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="container">
          {/* Back Button */}
          <Link href="/">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Button>
          </Link>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My API Subscriptions</h1>
            <p className="text-muted-foreground">
              Manage your API subscriptions and access credentials
            </p>
          </div>

          {/* Subscriptions List */}
          {subscriptions && subscriptions.length > 0 ? (
            <div className="grid gap-6">
              {subscriptions.map((subscription, index) => {
                const apiQuery = apiQueries[index];
                const api = apiQuery?.data;

                return (
                  <Card key={subscription.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-xl">
                              {api?.name || "Loading..."}
                            </CardTitle>
                            <Badge className="bg-green-500">
                              {subscription.status}
                            </Badge>
                          </div>
                          <CardDescription>
                            {api?.description || "Loading API details..."}
                          </CardDescription>
                        </div>
                        <Link href={`/api/${subscription.apiId}`}>
                          <Button variant="outline" size="sm" className="gap-2">
                            View Details <ExternalLink className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* API Key Section */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Key className="w-4 h-4 text-muted-foreground" />
                            <h3 className="font-semibold text-sm">API Key</h3>
                          </div>
                          <code className="block bg-gray-100 px-4 py-2 rounded text-sm font-mono break-all">
                            {subscription.apiKey}
                          </code>
                          <p className="text-xs text-muted-foreground mt-2">
                            Keep this key secure and never share it publicly
                          </p>
                        </div>

                        {/* Subscription Details */}
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Subscribed On</p>
                            <p className="text-sm font-medium">
                              {subscription.subscribedAt
                                ? new Date(subscription.subscribedAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })
                                : "N/A"}
                            </p>
                          </div>
                          {api && (
                            <>
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Endpoint</p>
                                <code className="text-sm">
                                  {api.method} {api.endpoint}
                                </code>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Rate Limit</p>
                                <p className="text-sm font-medium">{api.rateLimit}</p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Key className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No API Subscriptions Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start by browsing our API marketplace and subscribe to the APIs you need
                </p>
                <Link href="/apis">
                  <Button>Browse APIs</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

