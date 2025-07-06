import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import AgentsCatalogClient from "./agents-catalog-client";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            AI Agents Catalog
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover and explore intelligent AI agents for your business needs
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
            Powered by Redux for state management
          </p>
        </div>

        {/* Client-side component with Redux */}
        <Suspense
          fallback={
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-4"></div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          }
        >
          <AgentsCatalogClient />
        </Suspense>
      </div>
    </div>
  );
}
