"use client";

import React from "react";
import {
  Search,
  Zap,
  BarChart3,
  Code,
  Users,
  Share2,
  DollarSign,
  Scale,
  MessageCircle,
  RotateCcw,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setSearchQuery,
  setSelectedPricingModel,
  setSortBy,
  clearAllFilters,
  addStatusFilter,
  removeStatusFilter,
  addCategoryFilter,
  removeCategoryFilter,
} from "@/lib/slices/agentsSlice";
import AgentCard, { Agent } from "@/components/ui/AgentCard";
import SidebarFilters from "@/components/ui/SidebarFilters";

export default function AgentsCatalogClient({
  initialAgents,
}: {
  initialAgents: Agent[];
}) {
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

  // Initialize agents in Redux store if not already set
  React.useEffect(() => {
    if (initialAgents && initialAgents.length > 0 && agents.length === 0) {
      dispatch({ type: "agents/setAgents", payload: initialAgents });
    }
  }, [initialAgents, agents.length, dispatch]);

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
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <SidebarFilters
        searchQuery={searchQuery}
        setSearchQuery={(value) => dispatch(setSearchQuery(value))}
        allStatuses={allStatuses}
        selectedStatuses={selectedStatuses}
        handleStatusChange={handleStatusChange}
        allCategories={allCategories}
        selectedCategories={selectedCategories}
        handleCategoryChange={handleCategoryChange}
        allPricingModels={allPricingModels}
        selectedPricingModel={selectedPricingModel}
        setSelectedPricingModel={(value) =>
          dispatch(setSelectedPricingModel(value))
        }
        sortBy={sortBy}
        setSortBy={(value) => dispatch(setSortBy(value))}
        hasActiveFilters={hasActiveFilters}
        clearAllFilters={() => dispatch(clearAllFilters())}
        statusColors={statusColors}
      />
      <main className="flex-1">
        <div className="mb-6">
          <p className="text-slate-600 dark:text-slate-400">
            Showing {filteredAgents.length} of {agents.length} AI agents
            {hasActiveFilters && " (filtered)"}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              categoryIcons={categoryIcons}
              statusColors={statusColors}
              pricingColors={pricingColors}
              onViewDetails={() => {}}
            />
          ))}
        </div>
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
      </main>
    </div>
  );
}
