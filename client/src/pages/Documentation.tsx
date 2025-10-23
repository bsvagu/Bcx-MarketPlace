import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { APP_LOGO } from "@/const";
import {
  BookOpen,
  Code,
  Key,
  Shield,
  Zap,
  CheckCircle2,
  ArrowRight,
  Terminal,
  FileCode,
  Globe,
  Lock,
  Activity,
} from "lucide-react";
import SharedNavbar from "@/components/SharedNavbar";

export default function Documentation() {
  const [activeSection, setActiveSection] = useState("getting-started");

  const sections = [
    { id: "getting-started", label: "Getting Started", icon: Zap },
    { id: "authentication", label: "Authentication", icon: Key },
    { id: "making-requests", label: "Making Requests", icon: Terminal },
    { id: "response-format", label: "Response Format", icon: FileCode },
    { id: "rate-limiting", label: "Rate Limiting", icon: Activity },
    { id: "security", label: "Security", icon: Shield },
    { id: "sdks", label: "SDKs & Libraries", icon: Code },
    { id: "support", label: "Support", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <SharedNavbar />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-50 text-[#E63946] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            API Documentation
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Developer <span className="text-[#E63946]">Documentation</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to integrate BCX APIs into your applications. Get started in minutes with our comprehensive guides and examples.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-2 hover:border-[#E63946] transition-all cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-[#E63946]" />
              </div>
              <CardTitle>Quick Start</CardTitle>
              <CardDescription>Get up and running in 5 minutes</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="text-[#E63946] p-0 h-auto font-medium">
                Start Building <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-[#E63946] transition-all cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-[#E63946]" />
              </div>
              <CardTitle>API Reference</CardTitle>
              <CardDescription>Complete API endpoint documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/apis">
                <Button variant="ghost" className="text-[#E63946] p-0 h-auto font-medium">
                  Browse APIs <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-[#E63946] transition-all cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                <Terminal className="w-6 h-6 text-[#E63946]" />
              </div>
              <CardTitle>Code Examples</CardTitle>
              <CardDescription>Ready-to-use code snippets</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="text-[#E63946] p-0 h-auto font-medium">
                View Examples <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Documentation Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Contents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                        activeSection === section.id
                          ? "bg-[#E63946] text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-8">
            {/* Getting Started */}
            {activeSection === "getting-started" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-[#E63946]" />
                      </div>
                      <CardTitle className="text-2xl">Getting Started</CardTitle>
                    </div>
                    <CardDescription>Learn how to integrate BCX APIs into your application</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Prerequisites</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>A BCX API account (sign up for free)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Basic knowledge of REST APIs and HTTP requests</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Your preferred programming language (we support all major languages)</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Quick Start Steps</h3>
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-[#E63946] text-white rounded-full flex items-center justify-center font-bold">
                            1
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Subscribe to an API</h4>
                            <p className="text-gray-600 text-sm">
                              Browse our API marketplace and subscribe to the APIs you need. You'll receive your API key instantly.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-[#E63946] text-white rounded-full flex items-center justify-center font-bold">
                            2
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Get Your API Key</h4>
                            <p className="text-gray-600 text-sm">
                              After subscribing, you'll find your API key in the "Dashboard" dashboard. Keep this key secure.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-[#E63946] text-white rounded-full flex items-center justify-center font-bold">
                            3
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Make Your First Request</h4>
                            <p className="text-gray-600 text-sm">
                              Use your API key to authenticate and start making requests to the API endpoints.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900 text-white p-6 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-gray-400">Example Request</span>
                        <Badge variant="secondary" className="bg-gray-800">cURL</Badge>
                      </div>
                      <pre className="text-sm overflow-x-auto">
                        <code>{`curl -X GET "https://apim-iit-bcx-l2c-stg.azure-api.net/customer/v4/customers" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Authentication */}
            {activeSection === "authentication" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                        <Key className="w-5 h-5 text-[#E63946]" />
                      </div>
                      <CardTitle className="text-2xl">Authentication</CardTitle>
                    </div>
                    <CardDescription>Secure your API requests with proper authentication</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">OAuth 2.0 Authentication</h3>
                      <p className="text-gray-600 mb-4">
                        BCX APIs use OAuth 2.0 for authentication. All requests must include a valid Bearer token in the Authorization header.
                      </p>
                      <div className="bg-gray-900 text-white p-6 rounded-lg">
                        <pre className="text-sm overflow-x-auto">
                          <code>{`Authorization: Bearer YOUR_API_KEY`}</code>
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Subscription Keys</h3>
                      <p className="text-gray-600 mb-4">
                        Some APIs also require a subscription key as a query parameter:
                      </p>
                      <div className="bg-gray-900 text-white p-6 rounded-lg">
                        <pre className="text-sm overflow-x-auto">
                          <code>{`https://apim-iit-bcx-l2c-stg.azure-api.net/api/v4/resource?subscription-key=YOUR_SUBSCRIPTION_KEY`}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex gap-3">
                        <Lock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-yellow-900 mb-1">Security Best Practices</h4>
                          <ul className="text-sm text-yellow-800 space-y-1">
                            <li>• Never expose your API keys in client-side code</li>
                            <li>• Rotate your keys regularly</li>
                            <li>• Use environment variables to store credentials</li>
                            <li>• Monitor your API usage for unusual activity</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Making Requests */}
            {activeSection === "making-requests" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                        <Terminal className="w-5 h-5 text-[#E63946]" />
                      </div>
                      <CardTitle className="text-2xl">Making Requests</CardTitle>
                    </div>
                    <CardDescription>Learn how to structure your API requests</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Base URL</h3>
                      <p className="text-gray-600 mb-4">All API requests should be made to:</p>
                      <div className="bg-gray-900 text-white p-4 rounded-lg">
                        <code className="text-sm">https://apim-iit-bcx-l2c-stg.azure-api.net</code>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">HTTP Methods</h3>
                      <div className="grid gap-3">
                        <div className="flex items-start gap-3 p-4 border rounded-lg">
                          <Badge className="bg-green-600">GET</Badge>
                          <div>
                            <p className="font-medium">Retrieve Resources</p>
                            <p className="text-sm text-gray-600">Used to fetch data from the API</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 border rounded-lg">
                          <Badge className="bg-blue-600">POST</Badge>
                          <div>
                            <p className="font-medium">Create Resources</p>
                            <p className="text-sm text-gray-600">Used to create new resources</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 border rounded-lg">
                          <Badge className="bg-orange-600">PATCH</Badge>
                          <div>
                            <p className="font-medium">Update Resources</p>
                            <p className="text-sm text-gray-600">Used to partially update existing resources</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 border rounded-lg">
                          <Badge className="bg-red-600">DELETE</Badge>
                          <div>
                            <p className="font-medium">Delete Resources</p>
                            <p className="text-sm text-gray-600">Used to remove resources</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Request Headers</h3>
                      <div className="bg-gray-900 text-white p-6 rounded-lg">
                        <pre className="text-sm overflow-x-auto">
                          <code>{`Content-Type: application/json
Authorization: Bearer YOUR_API_KEY
Accept: application/json`}</code>
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Example POST Request</h3>
                      <div className="bg-gray-900 text-white p-6 rounded-lg">
                        <pre className="text-sm overflow-x-auto">
                          <code>{`curl -X POST "https://apim-iit-bcx-l2c-stg.azure-api.net/accountManagement/v4/billingAccount" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "id": "310000000114",
    "name": "Home Account",
    "accountType": "Portfolio 1",
    "accountSubType": "Regular"
  }'`}</code>
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Response Format */}
            {activeSection === "response-format" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                        <FileCode className="w-5 h-5 text-[#E63946]" />
                      </div>
                      <CardTitle className="text-2xl">Response Format</CardTitle>
                    </div>
                    <CardDescription>Understanding API responses and status codes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">HTTP Status Codes</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-4 border rounded-lg bg-green-50 border-green-200">
                          <Badge className="bg-green-600">200</Badge>
                          <div>
                            <p className="font-medium">OK</p>
                            <p className="text-sm text-gray-600">Request succeeded</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 border rounded-lg bg-green-50 border-green-200">
                          <Badge className="bg-green-600">201</Badge>
                          <div>
                            <p className="font-medium">Created</p>
                            <p className="text-sm text-gray-600">Resource created successfully</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 border rounded-lg bg-red-50 border-red-200">
                          <Badge className="bg-red-600">400</Badge>
                          <div>
                            <p className="font-medium">Bad Request</p>
                            <p className="text-sm text-gray-600">Invalid request parameters</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 border rounded-lg bg-red-50 border-red-200">
                          <Badge className="bg-red-600">401</Badge>
                          <div>
                            <p className="font-medium">Unauthorized</p>
                            <p className="text-sm text-gray-600">Authentication required or failed</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 border rounded-lg bg-red-50 border-red-200">
                          <Badge className="bg-red-600">429</Badge>
                          <div>
                            <p className="font-medium">Too Many Requests</p>
                            <p className="text-sm text-gray-600">Rate limit exceeded</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 border rounded-lg bg-red-50 border-red-200">
                          <Badge className="bg-red-600">500</Badge>
                          <div>
                            <p className="font-medium">Internal Server Error</p>
                            <p className="text-sm text-gray-600">Server-side error occurred</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Success Response Example</h3>
                      <div className="bg-gray-900 text-white p-6 rounded-lg">
                        <pre className="text-sm overflow-x-auto">
                          <code>{`{
  "status": "success",
  "data": {
    "id": "310000000114",
    "name": "Home Account",
    "accountType": "Portfolio 1",
    "createdAt": "2025-10-17T02:36:00Z"
  },
  "message": "Resource created successfully"
}`}</code>
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Error Response Example</h3>
                      <div className="bg-gray-900 text-white p-6 rounded-lg">
                        <pre className="text-sm overflow-x-auto">
                          <code>{`{
  "status": "error",
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "The 'accountType' field is required",
    "details": {
      "field": "accountType",
      "reason": "missing_required_field"
    }
  }
}`}</code>
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Rate Limiting */}
            {activeSection === "rate-limiting" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                        <Activity className="w-5 h-5 text-[#E63946]" />
                      </div>
                      <CardTitle className="text-2xl">Rate Limiting</CardTitle>
                    </div>
                    <CardDescription>Understanding API usage limits and quotas</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Rate Limits</h3>
                      <p className="text-gray-600 mb-4">
                        Each API has specific rate limits to ensure fair usage and system stability. Rate limits vary by API and subscription tier.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Standard APIs</h4>
                          <p className="text-2xl font-bold text-[#E63946]">10,000</p>
                          <p className="text-sm text-gray-600">requests per hour</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">High-Volume APIs</h4>
                          <p className="text-2xl font-bold text-[#E63946]">5,000</p>
                          <p className="text-sm text-gray-600">requests per hour</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Rate Limit Headers</h3>
                      <p className="text-gray-600 mb-4">
                        Every API response includes headers that help you track your usage:
                      </p>
                      <div className="bg-gray-900 text-white p-6 rounded-lg">
                        <pre className="text-sm overflow-x-auto">
                          <code>{`X-RateLimit-Limit: 10000
X-RateLimit-Remaining: 9847
X-RateLimit-Reset: 1697529600`}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex gap-3">
                        <Activity className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-900 mb-1">Best Practices</h4>
                          <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Implement exponential backoff for retries</li>
                            <li>• Cache responses when appropriate</li>
                            <li>• Monitor rate limit headers in responses</li>
                            <li>• Contact support for higher limits if needed</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Security */}
            {activeSection === "security" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-[#E63946]" />
                      </div>
                      <CardTitle className="text-2xl">Security</CardTitle>
                    </div>
                    <CardDescription>Keeping your integrations secure</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Security Features</h3>
                      <div className="space-y-4">
                        <div className="flex gap-4 p-4 border rounded-lg">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Lock className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">TLS 1.3 Encryption</h4>
                            <p className="text-sm text-gray-600">
                              All API communications are encrypted using industry-standard TLS 1.3 protocol.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4 p-4 border rounded-lg">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Key className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">OAuth 2.0 Authentication</h4>
                            <p className="text-sm text-gray-600">
                              Secure authentication using OAuth 2.0 with Bearer tokens.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4 p-4 border rounded-lg">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Activity className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Audit Logging</h4>
                            <p className="text-sm text-gray-600">
                              Complete request and response tracking for compliance and debugging.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Security Checklist</h3>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Store API keys securely using environment variables</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Never commit credentials to version control</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Rotate API keys regularly (every 90 days recommended)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Use HTTPS for all API requests</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Implement proper error handling to avoid leaking sensitive data</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">Monitor API usage for unusual patterns</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* SDKs */}
            {activeSection === "sdks" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                        <Code className="w-5 h-5 text-[#E63946]" />
                      </div>
                      <CardTitle className="text-2xl">SDKs & Libraries</CardTitle>
                    </div>
                    <CardDescription>Official SDKs for popular programming languages</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="border-2">
                        <CardHeader>
                          <CardTitle className="text-lg">Node.js / JavaScript</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-gray-900 text-white p-4 rounded-lg mb-3">
                            <code className="text-sm">npm install @bcx/api-client</code>
                          </div>
                          <Button variant="outline" className="w-full">View Documentation</Button>
                        </CardContent>
                      </Card>

                      <Card className="border-2">
                        <CardHeader>
                          <CardTitle className="text-lg">Python</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-gray-900 text-white p-4 rounded-lg mb-3">
                            <code className="text-sm">pip install bcx-api-client</code>
                          </div>
                          <Button variant="outline" className="w-full">View Documentation</Button>
                        </CardContent>
                      </Card>

                      <Card className="border-2">
                        <CardHeader>
                          <CardTitle className="text-lg">Java</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-gray-900 text-white p-4 rounded-lg mb-3 overflow-x-auto">
                            <code className="text-sm">com.bcx:api-client:1.0.0</code>
                          </div>
                          <Button variant="outline" className="w-full">View Documentation</Button>
                        </CardContent>
                      </Card>

                      <Card className="border-2">
                        <CardHeader>
                          <CardTitle className="text-lg">C# / .NET</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-gray-900 text-white p-4 rounded-lg mb-3">
                            <code className="text-sm">Install-Package BCX.ApiClient</code>
                          </div>
                          <Button variant="outline" className="w-full">View Documentation</Button>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Example: Node.js SDK</h3>
                      <div className="bg-gray-900 text-white p-6 rounded-lg">
                        <pre className="text-sm overflow-x-auto">
                          <code>{`const BCX = require('@bcx/api-client');

const client = new BCX({
  apiKey: process.env.BCX_API_KEY
});

// Get customer list
const customers = await client.customer.list({
  limit: 10,
  offset: 0
});

console.log(customers);`}</code>
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Support */}
            {activeSection === "support" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-[#E63946]" />
                      </div>
                      <CardTitle className="text-2xl">Support</CardTitle>
                    </div>
                    <CardDescription>Get help when you need it</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="border-2">
                        <CardHeader>
                          <CardTitle className="text-lg">Technical Support</CardTitle>
                          <CardDescription>Get help with integration issues</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button className="w-full bg-[#E63946] hover:bg-[#D62839]">
                            Contact Support
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="border-2">
                        <CardHeader>
                          <CardTitle className="text-lg">Community Forum</CardTitle>
                          <CardDescription>Connect with other developers</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button variant="outline" className="w-full">
                            Visit Forum
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Additional Resources</h3>
                      <div className="space-y-3">
                        <a href="#" className="flex items-center justify-between p-4 border rounded-lg hover:border-[#E63946] transition-colors">
                          <div className="flex items-center gap-3">
                            <BookOpen className="w-5 h-5 text-[#E63946]" />
                            <span className="font-medium">API Status Page</span>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400" />
                        </a>
                        <a href="#" className="flex items-center justify-between p-4 border rounded-lg hover:border-[#E63946] transition-colors">
                          <div className="flex items-center gap-3">
                            <Code className="w-5 h-5 text-[#E63946]" />
                            <span className="font-medium">Code Examples Repository</span>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400" />
                        </a>
                        <a href="#" className="flex items-center justify-between p-4 border rounded-lg hover:border-[#E63946] transition-colors">
                          <div className="flex items-center gap-3">
                            <Terminal className="w-5 h-5 text-[#E63946]" />
                            <span className="font-medium">Changelog</span>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400" />
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 text-2xl font-bold mb-4">
                <span>BC</span>
                <span className="text-[#E63946]">X</span>
              </div>
              <p className="text-gray-400 text-sm">
                Enterprise-grade APIs for digital transformation across Africa.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/apis" className="hover:text-white transition-colors">Browse APIs</Link></li>
                <li><Link href="/documentation" className="hover:text-white transition-colors">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About BCX</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">SLA</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            © 2025 BCX. All rights reserved. Powered by Azure API Gateway.
          </div>
        </div>
      </footer>
    </div>
  );
}

