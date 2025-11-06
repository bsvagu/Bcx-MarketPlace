import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { Link, useParams } from "wouter";
import { ArrowLeft, Copy, Check, Shield, Zap, Clock, Code, BookOpen, Key, Send, Play } from "lucide-react";
import { APP_LOGO } from "@/const";
import { toast } from "sonner";
import SharedNavbar from "@/components/SharedNavbar";

export default function ApiDetails() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [copiedEndpoint, setCopiedEndpoint] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [testDialogOpen, setTestDialogOpen] = useState(false);
  const [requestType, setRequestType] = useState("access");
  const [requestDetails, setRequestDetails] = useState("");
  const [testMethod, setTestMethod] = useState("GET");
  const [testEndpoint, setTestEndpoint] = useState("");
  const [testResponse, setTestResponse] = useState("");
  const [testLoading, setTestLoading] = useState(false);

  const utils = trpc.useUtils();

  const { data: api, isLoading } = trpc.apis.getById.useQuery({ id: id! });
  const { data: category } = trpc.categories.getById.useQuery(
    { id: api?.categoryId || "" },
    { enabled: !!api?.categoryId }
  );
  const { data: subscriptionData } = trpc.subscriptions.checkSubscription.useQuery(
    { apiId: id! },
    { enabled: isAuthenticated && !!id }
  );

  // Helpers for Technical Details UI
  const parseList = (value?: string) =>
    (value || "")
      .split(/[;,\n]/g)
      .map((v) => v.trim())
      .filter((v) => v.length > 0);

  const subscribeMutation = trpc.subscriptions.subscribe.useMutation({
    onSuccess: (data) => {
      toast.success("Successfully subscribed to API!");
      utils.subscriptions.checkSubscription.invalidate();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to subscribe to API");
    },
  });

  const handleSubscribe = () => {
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }
    subscribeMutation.mutate({ apiId: id! });
  };

  const handleSubmitRequest = () => {
    if (!requestDetails.trim()) {
      toast.error("Please provide request details");
      return;
    }
    
    // In a real implementation, this would call a backend API to create a request
    toast.success(`${requestType === "access" ? "Access" : requestType === "enhancement" ? "Enhancement" : "Support"} request submitted successfully!`);
    setRequestDialogOpen(false);
    setRequestDetails("");
    setRequestType("access");
  };

  const handleTestAPI = async () => {
    if (!testEndpoint.trim()) {
      toast.error("Please provide an endpoint to test");
      return;
    }

    setTestLoading(true);
    
    // Simulate API test call
    setTimeout(() => {
      const mockResponse = {
        status: 200,
        statusText: "OK",
        data: {
          message: "Test successful",
          timestamp: new Date().toISOString(),
          endpoint: testEndpoint,
          method: testMethod
        }
      };
      
      setTestResponse(JSON.stringify(mockResponse, null, 2));
      setTestLoading(false);
      toast.success("API test completed successfully!");
    }, 1500);
  };

  const copyToClipboard = (text: string, type: "endpoint" | "key") => {
    navigator.clipboard.writeText(text);
    if (type === "endpoint") {
      setCopiedEndpoint(true);
      setTimeout(() => setCopiedEndpoint(false), 2000);
    } else {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
    toast.success("Copied to clipboard!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!api) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">API Not Found</h1>
        <Link href="/apis">
          <Button>Browse APIs</Button>
        </Link>
      </div>
    );
  }

  const isSubscribed = subscriptionData?.subscribed || false;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <SharedNavbar />

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="container">
          {/* Back Button */}
          <Link href="/apis">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to APIs
            </Button>
          </Link>

          {/* API Header */}
          <div className="bg-white rounded-lg border p-8 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{api.name}</h1>
                  <Badge variant={api.status === "active" ? "default" : "secondary"}>
                    {api.status}
                  </Badge>
                  {api.featured && <Badge variant="outline">Featured</Badge>}
                </div>
                <p className="text-muted-foreground mb-4">{api.description}</p>
                {category && (
                  <Badge variant="secondary">{category.name}</Badge>
                )}
              </div>
              <div className="text-right flex flex-col gap-2">
                {isSubscribed ? (
                  <>
                    <Badge className="bg-green-500">Subscribed</Badge>
                    <Link href="/dashboard">
                      <Button variant="outline" size="sm">Manage Subscription</Button>
                    </Link>
                  </>
                ) : (
                  <Button onClick={handleSubscribe} disabled={subscribeMutation.isPending}>
                    {subscribeMutation.isPending ? "Subscribing..." : "Subscribe to API"}
                  </Button>
                )}
                
                {/* Submit Request Dialog */}
                <Dialog open={requestDialogOpen} onOpenChange={setRequestDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Send className="w-4 h-4" /> Submit Request
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>Submit a Request</DialogTitle>
                      <DialogDescription>
                        Request API access, enhancements, or support. Your request will be reviewed by our team.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="request-type">Request Type</Label>
                        <Select value={requestType} onValueChange={setRequestType}>
                          <SelectTrigger id="request-type">
                            <SelectValue placeholder="Select request type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="access">API Access Request</SelectItem>
                            <SelectItem value="enhancement">Enhancement Request</SelectItem>
                            <SelectItem value="support">Support Request</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="request-details">Request Details</Label>
                        <Textarea
                          id="request-details"
                          placeholder="Describe your request in detail..."
                          value={requestDetails}
                          onChange={(e) => setRequestDetails(e.target.value)}
                          rows={5}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setRequestDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmitRequest}>
                        Submit Request
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Test API Dialog */}
                <Dialog open={testDialogOpen} onOpenChange={setTestDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Play className="w-4 h-4" /> Test API
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                      <DialogTitle>Test API</DialogTitle>
                      <DialogDescription>
                        Test the API endpoint to see how it works. This will make a real API call.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="test-method">HTTP Method</Label>
                        <Select value={testMethod} onValueChange={setTestMethod}>
                          <SelectTrigger id="test-method">
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="GET">GET</SelectItem>
                            <SelectItem value="POST">POST</SelectItem>
                            <SelectItem value="PUT">PUT</SelectItem>
                            <SelectItem value="DELETE">DELETE</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="test-endpoint">Endpoint</Label>
                        <input
                          id="test-endpoint"
                          type="text"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder={api.endpoint || "/api/endpoint"}
                          value={testEndpoint}
                          onChange={(e) => setTestEndpoint(e.target.value)}
                        />
                      </div>
                      {testResponse && (
                        <div className="grid gap-2">
                          <Label>Response</Label>
                          <pre className="bg-gray-100 p-4 rounded-md text-xs overflow-auto max-h-64">
                            {testResponse}
                          </pre>
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => {
                        setTestDialogOpen(false);
                        setTestResponse("");
                        setTestEndpoint("");
                      }}>
                        Close
                      </Button>
                      <Button onClick={handleTestAPI} disabled={testLoading}>
                        {testLoading ? "Testing..." : "Run Test"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* API Metadata */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t">
              <div className="flex items-center gap-3">
                <Code className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Method</p>
                  <p className="font-semibold">{api.method}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Rate Limit</p>
                  <p className="font-semibold">{api.rateLimit}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Version</p>
                  <p className="font-semibold">{api.version}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="documentation">Documentation</TabsTrigger>
              <TabsTrigger value="endpoint">Endpoint</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About This API</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{api.description}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Use Cases</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Enterprise application integration</li>
                      <li>Mobile and web application development</li>
                      <li>Data synchronization and migration</li>
                      <li>Real-time monitoring and analytics</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Technical Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {api.businessUnit && (
                      <div>
                        <p className="text-sm text-muted-foreground">Business Unit</p>
                        <p className="font-semibold break-words">{api.businessUnit}</p>
                      </div>
                    )}
                    {api.serviceName && (
                      <div>
                        <p className="text-sm text-muted-foreground">Service Name</p>
                        <p className="font-semibold break-words">{api.serviceName}</p>
                      </div>
                    )}
                    {api.clientsImpacted && parseList(api.clientsImpacted).length > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Clients Impacted</p>
                        <div className="flex flex-wrap gap-2">
                          {parseList(api.clientsImpacted).map((item, idx) => (
                            <Badge key={`clients-${idx}`} variant="secondary" className="whitespace-normal break-words">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {api.backends && parseList(api.backends).length > 0 && (
                      <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground mb-2">Backends</p>
                        <div className="flex flex-wrap gap-2">
                          {parseList(api.backends).map((item, idx) => (
                            <Badge key={`backend-${idx}`} variant="outline" className="whitespace-normal break-words">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {api.complexity && (
                      <div>
                        <p className="text-sm text-muted-foreground">Complexity</p>
                        <p className="font-semibold break-words">{api.complexity}</p>
                      </div>
                    )}
                    {api.serviceType && (
                      <div>
                        <p className="text-sm text-muted-foreground">Service Type</p>
                        <p className="font-semibold break-words">{api.serviceType}</p>
                      </div>
                    )}
                    {api.integrationType && (
                      <div>
                        <p className="text-sm text-muted-foreground">Integration Type</p>
                        <p className="font-semibold break-words">{api.integrationType}</p>
                      </div>
                    )}
                    {api.serviceDescription && (
                      <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground">Service Description</p>
                        <p className="font-semibold break-words">{api.serviceDescription}</p>
                      </div>
                    )}
                    {api.swaggerUrl && (
                      <div>
                        <p className="text-sm text-muted-foreground">Swagger URL</p>
                        <a href={api.swaggerUrl} target="_blank" rel="noreferrer" className="font-semibold text-primary break-words hover:underline">
                          {api.swaggerUrl}
                        </a>
                      </div>
                    )}
                    {api.apiVersion && (
                      <div>
                        <p className="text-sm text-muted-foreground">API Version</p>
                        <p className="font-semibold break-words">{api.apiVersion}</p>
                      </div>
                    )}
                    {api.authRequired !== null && api.authRequired !== undefined && (
                      <div>
                        <p className="text-sm text-muted-foreground">Auth Required</p>
                        <p className="font-semibold">{api.authRequired ? "Yes" : "No"}</p>
                      </div>
                    )}
                    {api.responseFormat && (
                      <div>
                        <p className="text-sm text-muted-foreground">Response Format</p>
                        <p className="font-semibold break-words">{api.responseFormat}</p>
                      </div>
                    )}
                    {api.timeout && (
                      <div>
                        <p className="text-sm text-muted-foreground">Timeout</p>
                        <p className="font-semibold break-words">{api.timeout}</p>
                      </div>
                    )}
                    {api.parameters && (
                      <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground">Parameters</p>
                        <pre className="bg-gray-100 p-3 rounded-md text-xs overflow-auto max-h-64">
                            {(() => {
                              try {
                                const parsed = typeof api.parameters === 'string' ? JSON.parse(api.parameters) : api.parameters;
                                return JSON.stringify(parsed, null, 2);
                              } catch {
                                return String(api.parameters);
                              }
                            })()}
                        </pre>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security & Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-semibold">OAuth 2.0 Authentication</p>
                        <p className="text-sm text-muted-foreground">Industry-standard authentication protocol</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-semibold">Data Encryption</p>
                        <p className="text-sm text-muted-foreground">TLS 1.3 encryption for all data in transit</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-semibold">Compliance</p>
                        <p className="text-sm text-muted-foreground">SOC 2, ISO 27001 certified infrastructure</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documentation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Documentation</CardTitle>
                  <CardDescription>Complete reference for using this API</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Getting Started</h3>
                    <p className="text-muted-foreground mb-4">
                      To use this API, you'll need to authenticate using your API key. Include the key in the Authorization header of your requests.
                    </p>
                    <div className="bg-gray-100 p-4 rounded-md">
                      <code className="text-sm">
                        Authorization: Bearer YOUR_API_KEY
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Request Format</h3>
                    <p className="text-muted-foreground mb-4">
                      All requests should be made to the base URL with appropriate endpoints. Request bodies should be in JSON format.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Response Format</h3>
                    <p className="text-muted-foreground mb-4">
                      All responses are returned in JSON format with appropriate HTTP status codes.
                    </p>
                  </div>

                  <Alert>
                    <BookOpen className="h-4 w-4" />
                    <AlertDescription>
                      For complete API documentation, code examples, and SDKs, visit our{" "}
                      <Link href="/documentation" className="text-primary hover:underline">
                        Developer Documentation
                      </Link>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="endpoint" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Endpoint</CardTitle>
                  <CardDescription>Base URL and endpoint information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Endpoint URL</Label>
                    <div className="flex gap-2">
                      <code className="flex-1 bg-gray-100 p-3 rounded-md text-sm">
                        {api.endpoint}
                      </code>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(api.endpoint || "", "endpoint")}
                      >
                        {copiedEndpoint ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  {isSubscribed && (
                    <div>
                      <Label className="mb-2 block">Your API Key</Label>
                      {(() => { const apiKey = (subscriptionData as any)?.subscription?.apiKey as string | undefined; return (
                      <div className="flex gap-2">
                        <code className="flex-1 bg-gray-100 p-3 rounded-md text-sm">
                          {apiKey || "Loading..."}
                        </code>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(apiKey || "", "key")}
                        >
                          {copiedKey ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                      ); })()}
                      <p className="text-sm text-muted-foreground mt-2">
                        Keep your API key secure. Do not share it publicly.
                      </p>
                    </div>
                  )}

                  {!isSubscribed && (
                    <Alert>
                      <Key className="h-4 w-4" />
                      <AlertDescription>
                        Subscribe to this API to get your unique API key and start making requests.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}