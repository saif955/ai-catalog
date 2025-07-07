import { Suspense } from "react";
import AgentsCatalogClient from "./agents-catalog-client";
import CardSkeleton from "@/components/ui/CardSkeleton";

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
        </div>

        {/* Client-side component with Redux */}
        <Suspense fallback={<CardSkeleton />}>
          <AgentsCatalogClient />
        </Suspense>
      </div>
    </div>
  );
}
