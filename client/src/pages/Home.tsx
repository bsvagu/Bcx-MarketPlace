import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { APP_LOGO, APP_TITLE } from "@/const";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { 
  ArrowRight, Search, Shield, Zap, TrendingUp, Code, Cloud, Brain, 
  CreditCard, MessageSquare, Lock, CheckCircle, Users, Activity, 
  Globe, Rocket, FileCode, Terminal, BookOpen, Star, Building2,
  Layers, BarChart3, Smartphone, Database
} from "lucide-react";
import SharedNavbar from "@/components/SharedNavbar";

const categoryIcons: Record<string, any> = {
  brain: Brain,
  chart: TrendingUp,
  message: MessageSquare,
  "credit-card": CreditCard,
  shield: Lock,
  cloud: Cloud,
};

export default function Home() {
  const { isAuthenticated, user, logout } = useAuth();
  const { data: featuredApis, isLoading: loadingApis } = trpc.apis.featured.useQuery();
  const { data: categories, isLoading: loadingCategories } = trpc.categories.list.useQuery();
  const [scrollY, setScrollY] = useState(0);

  // Get authentication state from localStorage directly
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

  const authState = getAuthState();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authState.isAuthenticated) {
      window.location.href = "/login";
    }
  }, [authState.isAuthenticated]);

  // Show loading or nothing while redirecting
  if (!authState.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Shared Navbar */}
      <SharedNavbar />

      {/* Hero Section with Animated Background */}
      <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 animate-in fade-in slide-in-from-top duration-700" variant="secondary">
              Powered by Azure API Gateway
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black animate-in fade-in slide-in-from-bottom duration-700 delay-100">
              Enterprise APIs for
              <span className="text-primary"> Digital Innovation</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-200">
              Access world-class APIs for AI, payments, communications, and more. Built for scale, secured by design, trusted by enterprises across Africa.
            </p>
            <div className="flex items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
              <Link href="/apis">
                <Button size="lg" className="gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                  Explore APIs <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/documentation">
                <Button size="lg" variant="outline" className="gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                  <Code className="w-4 h-4 group-hover:rotate-12 transition-transform" /> View Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section with Counter Animation */}
      <section className="py-16 bg-white border-y">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "12+", label: "APIs Available", delay: "0ms" },
              { value: "99.9%", label: "Uptime SLA", delay: "100ms" },
              { value: "10k+", label: "API Calls/Hour", delay: "200ms" },
              { value: "24/7", label: "Support", delay: "300ms" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center animate-in fade-in slide-in-from-bottom duration-700 hover:scale-110 transition-transform cursor-default"
                style={{ animationDelay: stat.delay }}
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 transition-all duration-300 hover:text-primary/80">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features with Hover Effects */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Low-latency APIs with 99.9% uptime SLA and global edge network for optimal performance.", color: "text-yellow-500" },
              { icon: Shield, title: "Enterprise Security", desc: "OAuth 2.0, API keys, rate limiting, and comprehensive audit logs for complete security.", color: "text-blue-500" },
              { icon: TrendingUp, title: "Scalable Infrastructure", desc: "Auto-scaling architecture that grows with your business, from startup to enterprise.", color: "text-green-500" }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="text-center group animate-in fade-in slide-in-from-bottom duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg">
                  <feature.icon className={`w-8 h-8 text-primary transition-all duration-300 group-hover:scale-110 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-primary">{feature.title}</h3>
                <p className="text-muted-foreground">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works with Animated Flow */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-top duration-700">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started with BCX APIs in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { num: 1, title: "Browse & Subscribe", desc: "Explore our API catalog and subscribe to the APIs that fit your needs. Instant access with your API key.", delay: "0ms" },
              { num: 2, title: "Integrate", desc: "Use our SDKs, code examples, and comprehensive documentation to integrate APIs into your application.", delay: "200ms" },
              { num: 3, title: "Scale & Grow", desc: "Monitor usage, manage keys, and scale seamlessly as your business grows with our enterprise-grade infrastructure.", delay: "400ms" }
            ].map((step, index) => (
              <div 
                key={index} 
                className="relative group animate-in fade-in slide-in-from-bottom duration-700"
                style={{ animationDelay: step.delay }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-xl">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-primary">{step.title}</h3>
                  <p className="text-muted-foreground">
                    {step.desc}
                  </p>
                </div>
                {/* Animated Connector line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent">
                    <div className="absolute top-0 left-0 w-0 h-full bg-primary animate-pulse" style={{ animation: 'flowRight 2s ease-in-out infinite', animationDelay: `${index * 0.5}s` }}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured APIs with Stagger Animation */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="flex items-center justify-between mb-8 animate-in fade-in slide-in-from-top duration-700">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured APIs</h2>
              <p className="text-muted-foreground">Most popular APIs trusted by thousands of developers</p>
            </div>
            <Link href="/apis">
              <Button variant="outline" className="gap-2 transition-all duration-300 hover:scale-105 group">
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {loadingApis ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredApis?.slice(0, 6).map((api, index) => (
                <Card 
                  key={api.id} 
                  className="hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary hover:scale-105 animate-in fade-in slide-in-from-bottom"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg transition-colors duration-300 hover:text-primary">{api.name}</CardTitle>
                      <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 animate-pulse">
                        {api.status}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">{api.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground mb-1">Method:</div>
                        <Badge variant="outline" className="transition-all duration-300 hover:scale-110">{api.method}</Badge>
                      </div>
                      <div>
                        <div className="text-muted-foreground mb-1">Rate Limit:</div>
                        <div className="font-medium text-sm">{api.rateLimit}</div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/apis/${api.id}`}>
                      <Button className="w-full gap-2 transition-all duration-300 hover:scale-105 group">
                        View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Use Cases / Industries with Parallax Effect */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-top duration-700">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Every Industry</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Power your applications across diverse sectors with our enterprise-grade APIs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Building2, title: "Financial Services", desc: "Payment processing, billing management, and account operations for fintech applications.", delay: "0ms" },
              { icon: Smartphone, title: "Telecommunications", desc: "Customer management, messaging services, and real-time communication solutions.", delay: "100ms" },
              { icon: Database, title: "Enterprise Software", desc: "Order management, product catalogs, and party role management for B2B platforms.", delay: "200ms" },
              { icon: Activity, title: "Support & Operations", desc: "Trouble ticketing, usage tracking, and operational monitoring for service providers.", delay: "300ms" }
            ].map((industry, index) => (
              <Card 
                key={index} 
                className="border-2 hover:border-primary transition-all duration-500 hover:scale-105 hover:shadow-xl group animate-in fade-in slide-in-from-bottom"
                style={{ animationDelay: industry.delay }}
              >
                <CardHeader>
                  <industry.icon className="w-10 h-10 text-primary mb-3 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" />
                  <CardTitle className="text-lg transition-colors duration-300 group-hover:text-primary">{industry.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {industry.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Examples with Code Animation */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-top duration-700">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Integration</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start building in minutes with our simple, well-documented APIs
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 hover:border-primary transition-all duration-500 hover:shadow-2xl animate-in fade-in slide-in-from-bottom duration-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-primary animate-pulse" />
                    Example: Customer Management API
                  </CardTitle>
                  <Badge variant="secondary" className="transition-all duration-300 hover:scale-110">cURL</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="bg-black text-green-400 p-4 rounded-lg overflow-x-auto text-sm transition-all duration-300 hover:shadow-lg">
{`curl -X GET "https://apim-iit-bcx-l2c-stg.azure-api.net/customer/v4/customers" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
                </pre>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:shadow-md">
                  <div className="text-sm font-medium mb-2">Response:</div>
                  <pre className="text-xs text-muted-foreground overflow-x-auto">
{`{
  "customers": [
    {
      "id": "CUST001",
      "name": "Acme Corporation",
      "status": "active",
      "createdAt": "2025-01-15T10:30:00Z"
    }
  ]
}`}
                  </pre>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/documentation">
                  <Button variant="outline" className="gap-2 transition-all duration-300 hover:scale-105 group">
                    <BookOpen className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    View Full Documentation
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Browse by Category with Hover Effects */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center animate-in fade-in slide-in-from-top duration-700">Browse by Category</h2>
          {loadingCategories ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories?.map((category, index) => {
                const IconComponent = categoryIcons[category.icon || 'cloud'] || Cloud;
                return (
                  <Card 
                    key={category.id} 
                    className="hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 hover:border-primary hover:scale-105 group animate-in fade-in slide-in-from-bottom"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg">
                          <IconComponent className="w-6 h-6 text-primary transition-all duration-300 group-hover:scale-110" />
                        </div>
                        <div>
                          <CardTitle className="text-lg transition-colors duration-300 group-hover:text-primary">{category.name}</CardTitle>
                        </div>
                      </div>
                      <CardDescription className="mt-2">{category.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Trust & Security with Icon Animations */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-top duration-700">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise-Grade Security</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built with security and compliance at the core
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Lock, title: "OAuth 2.0 & API Keys", desc: "Industry-standard authentication with secure token management and key rotation.", delay: "0ms" },
              { icon: Shield, title: "Data Encryption", desc: "End-to-end encryption for data in transit and at rest with TLS 1.3 support.", delay: "200ms" },
              { icon: CheckCircle, title: "Compliance Ready", desc: "SOC 2, ISO 27001 compliant infrastructure with comprehensive audit trails.", delay: "400ms" }
            ].map((security, index) => (
              <div 
                key={index} 
                className="text-center group animate-in fade-in slide-in-from-bottom duration-700"
                style={{ animationDelay: security.delay }}
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-xl">
                  <security.icon className="w-8 h-8 text-primary transition-all duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-lg font-semibold mb-2 transition-colors duration-300 group-hover:text-primary">{security.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {security.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Gradient Animation */}
      <section className="py-20 bg-gradient-to-r from-black via-gray-900 to-black text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-4xl font-bold mb-4">Ready to Build Something Amazing?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of developers building the future with BCX APIs. Get started in minutes with our comprehensive documentation and SDKs.
            </p>
            <Link href="/apis">
              <Button size="lg" variant="secondary" className="gap-2 transition-all duration-300 hover:scale-110 hover:shadow-2xl group">
                Browse APIs <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="animate-in fade-in slide-in-from-left duration-700">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-white">BC</span>
                <span className="text-2xl font-bold text-primary">X</span>
              </div>
              <p className="text-sm">
                Enterprise-grade APIs for digital transformation across Africa.
              </p>
            </div>
            <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-100">
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/apis" className="hover:text-primary transition-colors duration-300">Browse APIs</Link></li>
                <li><Link href="/documentation" className="hover:text-primary transition-colors duration-300">Documentation</Link></li>
              </ul>
            </div>
            <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-200">
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors duration-300">About BCX</a></li>
                <li><a href="#" className="hover:text-primary transition-colors duration-300">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors duration-300">Support</a></li>
              </ul>
            </div>
            <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-300">
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors duration-300">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors duration-300">SLA</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-sm text-center animate-in fade-in duration-700 delay-400">
            © 2025 BCX. All rights reserved. Powered by Azure API Gateway.
          </div>
        </div>
      </footer>

      {/* Custom CSS for additional animations */}
      <style>{`
        @keyframes flowRight {
          0% { width: 0%; }
          50% { width: 100%; }
          100% { width: 0%; }
        }
      `}</style>
    </div>
  );
}

