import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { ArrowRight, Search, Filter } from "lucide-react";
import { APP_LOGO } from "@/const";
import SharedNavbar from "@/components/SharedNavbar";

export default function ApiList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedArea, setSelectedArea] = useState<string>("all");

  const { data: apis, isLoading: loadingApis } = trpc.apis.list.useQuery();
  const { data: categories, isLoading: loadingCategories } = trpc.categories.list.useQuery();

  // Get unique areas from APIs (excluding null/undefined)
  const availableAreas = Array.from(
    new Set(apis?.map(api => api.area).filter((area): area is string => !!area) || [])
  ).sort();

  const filteredApis = apis?.filter((api) => {
    const matchesSearch = api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         api.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || api.categoryId === selectedCategory;
    const matchesStatus = selectedStatus === "all" || api.status === selectedStatus;
    const matchesArea = selectedArea === "all" || api.area === selectedArea;
    return matchesSearch && matchesCategory && matchesStatus && matchesArea;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Shared Navbar */}
      <SharedNavbar />

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="container">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Browse APIs</h1>
            <p className="text-muted-foreground">
              Discover and integrate powerful APIs for your applications
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg border p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <h2 className="font-semibold">Filter APIs</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search APIs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              {/* <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}
              {/* <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="beta">Beta</SelectItem>
                  <SelectItem value="deprecated">Deprecated</SelectItem>
                </SelectContent>
              </Select> */}
              <Select value={selectedArea} onValueChange={setSelectedArea}>
                <SelectTrigger>
                  <SelectValue placeholder="All Areas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Areas</SelectItem>
                  {availableAreas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              {loadingApis ? (
                "Loading..."
              ) : (
                <>Showing {filteredApis?.length || 0} of {apis?.length || 0} APIs</>
              )}
            </p>
          </div>

          {/* API Grid */}
          {loadingApis ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-20 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredApis && filteredApis.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApis.map((api) => (
                <Link key={api.id} href={`/apis/${api.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <CardTitle className="text-lg font-semibold line-clamp-2 flex-1 min-w-0 break-words pr-2" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                          {api.name}
                        </CardTitle>
                        <div className="flex flex-col gap-1.5 flex-shrink-0">
                          {/* <Badge variant={api.status === "active" ? "default" : "secondary"} className="whitespace-nowrap text-xs">
                            {api.status}
                          </Badge> */}
                          {api.area && (
                            <Badge variant="default" className="whitespace-nowrap text-xs">
                              {api.area}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardDescription className="line-clamp-2 text-sm text-muted-foreground break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                        {api.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Version:</span>
                          <span className="font-medium">{api.version}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Method:</span>
                          <Badge variant="outline">{api.method}</Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Rate Limit:</span>
                          <span className="text-xs">{api.rateLimit}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full gap-2" variant="outline">
                        View Details <ArrowRight className="w-4 h-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No APIs found matching your criteria</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedStatus("all");
                  setSelectedArea("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

