import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X, RotateCcw } from "lucide-react";
import React from "react";

interface SidebarFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  allStatuses: string[];
  selectedStatuses: string[];
  handleStatusChange: (status: string, checked: boolean) => void;
  allCategories: string[];
  selectedCategories: string[];
  handleCategoryChange: (category: string, checked: boolean) => void;
  allPricingModels: string[];
  selectedPricingModel: string;
  setSelectedPricingModel: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  hasActiveFilters: boolean;
  clearAllFilters: () => void;
  statusColors: { [key: string]: string };
}

export default function SidebarFilters({
  searchQuery,
  setSearchQuery,
  allStatuses,
  selectedStatuses,
  handleStatusChange,
  allCategories,
  selectedCategories,
  handleCategoryChange,
  allPricingModels,
  selectedPricingModel,
  setSelectedPricingModel,
  sortBy,
  setSortBy,
  hasActiveFilters,
  clearAllFilters,
  statusColors,
}: SidebarFiltersProps) {
  return (
    <aside className="md:w-80 w-full md:sticky md:top-8 flex-shrink-0">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6 mb-4">
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
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1 h-6 w-6 p-0"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
        {/* Filters */}
        <div className="space-y-6">
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
              onValueChange={setSelectedPricingModel}
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
              <Label className="text-sm font-medium mb-3 block">Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
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
                onClick={clearAllFilters}
                className="w-full"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear All Filters
              </Button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
