"use client";

import { useEffect } from "react";
import {
  Search,
  Bot,
  Zap,
  BarChart3,
  Code,
  Users,
  Share2,
  DollarSign,
  Scale,
  MessageCircle,
  X,
  RotateCcw,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchAgents,
  setSearchQuery,
  setSelectedPricingModel,
  setSortBy,
  clearAllFilters,
  addStatusFilter,
  removeStatusFilter,
  addCategoryFilter,
  removeCategoryFilter,
} from "@/lib/slices/agentsSlice";

export default function AgentsCatalogClient() {
  const dispatch = useAppDispatch();
  const {
    agents,
    filteredAgents,
    loading,
    error,
    searchQuery,
    selectedStatuses,
    selectedCategories,
    selectedPricingModel,
    sortBy,
    allStatuses,
    allCategories,
    allPricingModels,
  } = useAppSelector((state) => state.agents);

  // Fetch agents on component mount
  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch]);

  // Icon mapping for different categories
  const categoryIcons: {
    [key: string]: React.ComponentType<{ className?: string }>;
  } = {
    "Customer Service": MessageCircle,
    Marketing: Share2,
    Operations: Zap,
    "Data Analysis": BarChart3,
    Development: Code,
    "Human Resources": Users,
    Finance: DollarSign,
    Legal: Scale,
  };

  // Status color mapping
  const statusColors: { [key: string]: string } = {
    Active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Beta: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    Archived: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  };

  // Pricing model color mapping
  const pricingColors: { [key: string]: string } = {
    Subscription:
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    "Per-Use":
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    "Free Tier":
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  };

  // Check if any filters are applied
  const hasActiveFilters =
    searchQuery !== "" ||
    selectedStatuses.length > 0 ||
    selectedCategories.length > 0 ||
    selectedPricingModel !== "all";

  // Handle status checkbox changes
  const handleStatusChange = (status: string, checked: boolean) => {
    if (checked) {
      dispatch(addStatusFilter(status));
    } else {
      dispatch(removeStatusFilter(status));
    }
  };

  // Handle category checkbox changes
  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      dispatch(addCategoryFilter(category));
    } else {
      dispatch(removeCategoryFilter(category));
    }
  };

  // Show loading state
  if (loading) {
    return (
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="animate-pulse">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show error state
  if (error) {
    return (
      <Card className="mb-8">
        <CardContent className="pt-6 text-center">
          <div className="text-red-600 dark:text-red-400 mb-4">
            <h3 className="text-lg font-semibold mb-2">Error loading agents</h3>
            <p>{error}</p>
          </div>
          <Button onClick={() => dispatch(fetchAgents())}>Try Again</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Search and Filters */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          {/* Search Bar */}
          <div className="mb-6">
            <Label htmlFor="search" className="text-sm font-medium mb-2 block">
              Search Agents
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="search"
                placeholder="Search by name or description..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="pl-10"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1 h-6 w-6 p-0"
                  onClick={() => dispatch(setSearchQuery(""))}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>

          {/* Filters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Status Filter */}
            <div>
              <Label className="text-sm font-medium mb-3 block">
                Status ({selectedStatuses.length} selected)
              </Label>
              <div className="space-y-2">
                {allStatuses.map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={`status-${status}`}
                      checked={selectedStatuses.includes(status)}
                      onCheckedChange={(checked) =>
                        handleStatusChange(status, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`status-${status}`}
                      className="text-sm cursor-pointer flex items-center gap-2"
                    >
                      <Badge className={`${statusColors[status]} text-xs`}>
                        {status}
                      </Badge>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <Label className="text-sm font-medium mb-3 block">
                Category ({selectedCategories.length} selected)
              </Label>
              <div className="space-y-2">
                {allCategories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(category, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`category-${category}`}
                      className="text-sm cursor-pointer"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Model Filter */}
            <div>
              <Label className="text-sm font-medium mb-3 block">
                Pricing Model
              </Label>
              <Select
                value={selectedPricingModel}
                onValueChange={(value) =>
                  dispatch(setSelectedPricingModel(value))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All pricing models" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All pricing models</SelectItem>
                  {allPricingModels.map((pricingModel) => (
                    <SelectItem key={pricingModel} value={pricingModel}>
                      {pricingModel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort and Clear */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Sort By
                </Label>
                <Select
                  value={sortBy}
                  onValueChange={(value) => dispatch(setSortBy(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="category">Category</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                    <SelectItem value="pricingModel">Pricing Model</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {hasActiveFilters && (
                <Button
                  variant="outline"
                  onClick={() => dispatch(clearAllFilters())}
                  className="w-full"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear All Filters
                </Button>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Active filters:
                </span>
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    Search: &quot;{searchQuery}&quot;
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => dispatch(setSearchQuery(""))}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                {selectedStatuses.map((status) => (
                  <Badge key={status} variant="secondary" className="gap-1">
                    Status: {status}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => handleStatusChange(status, false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                {selectedCategories.map((category) => (
                  <Badge key={category} variant="secondary" className="gap-1">
                    Category: {category}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => handleCategoryChange(category, false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                {selectedPricingModel !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    Pricing: {selectedPricingModel}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => dispatch(setSelectedPricingModel("all"))}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-slate-600 dark:text-slate-400">
          Showing {filteredAgents.length} of {agents.length} AI agents
          {hasActiveFilters && " (filtered)"}
        </p>
      </div>

      {/* AI Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => {
          const IconComponent = categoryIcons[agent.category] || Bot;
          return (
            <Card
              key={agent.id}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <IconComponent className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary">{agent.category}</Badge>
                        <Badge className={statusColors[agent.status]}>
                          {agent.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {agent.description}
                </CardDescription>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Pricing:
                    </span>
                    <Badge className={pricingColors[agent.pricingModel]}>
                      {agent.pricingModel}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Agent ID:
                    </span>
                    <span className="text-sm font-mono text-slate-500 dark:text-slate-400">
                      {agent.id}
                    </span>
                  </div>

                  <Button className="w-full mt-4">View Details</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredAgents.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No AI agents found</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Try adjusting your search or filters to find what you&apos;re
              looking for.
            </p>
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={() => dispatch(clearAllFilters())}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear All Filters
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}
