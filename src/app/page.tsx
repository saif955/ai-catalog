import AgentsCatalogClient from "./agents-catalog-client";
import fs from "fs/promises";
import path from "path";

async function fetchAgentsOnServer() {
  const filePath = path.join(process.cwd(), "mock-agents.json");
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export default async function Home() {
  const agents = await fetchAgentsOnServer();

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
        <AgentsCatalogClient initialAgents={agents} />
      </div>
    </div>
  );
}
