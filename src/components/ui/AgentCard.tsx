import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import React from "react";

export interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  status: string;
  pricingModel: string;
  // Add other fields as needed
}

interface AgentCardProps {
  agent: Agent;
  categoryIcons: { [key: string]: React.ComponentType<{ className?: string }> };
  statusColors: { [key: string]: string };
  pricingColors: { [key: string]: string };
  onViewDetails?: (agent: Agent) => void;
}

export default function AgentCard({
  agent,
  categoryIcons,
  statusColors,
  pricingColors,
  onViewDetails,
}: AgentCardProps) {
  const IconComponent = categoryIcons[agent.category] || Bot;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-200 overflow-hidden max-w-full">
        <CardHeader>
          <div className="flex items-start justify-between min-w-0 max-w-full">
            <div className="flex items-center space-x-3 min-w-0 max-w-full">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg flex-shrink-0">
                <IconComponent className="h-6 w-6 text-slate-600 dark:text-slate-400" />
              </div>
              <div className="min-w-0 max-w-full">
                <div className="text-lg font-semibold truncate max-w-full">
                  {agent.name}
                </div>
                <div className="flex flex-wrap gap-2 mt-2 max-w-full min-w-0">
                  <Badge
                    variant="secondary"
                    className="truncate max-w-full overflow-hidden"
                  >
                    {agent.category}
                  </Badge>
                  <Badge
                    className={`${
                      statusColors[agent.status]
                    } text-xs truncate max-w-full overflow-hidden`}
                  >
                    {agent.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="max-w-full overflow-hidden">
          <CardDescription className="mb-4 whitespace-normal break-words text-ellipsis overflow-hidden max-h-20 max-w-full">
            {agent.description}
          </CardDescription>
          <div className="space-y-3 max-w-full">
            <div className="flex items-center justify-between max-w-full min-w-0">
              <span className="text-sm text-slate-600 dark:text-slate-400 truncate max-w-[7rem] overflow-hidden">
                Pricing:
              </span>
              <Badge
                className={`${
                  pricingColors[agent.pricingModel]
                } truncate max-w-[7rem] overflow-hidden`}
              >
                {agent.pricingModel}
              </Badge>
            </div>
            <div className="flex items-center justify-between max-w-full min-w-0">
              <span className="text-sm text-slate-600 dark:text-slate-400 truncate max-w-[7rem] overflow-hidden">
                Agent ID:
              </span>
              <span className="text-sm font-mono text-slate-500 dark:text-slate-400 truncate max-w-[7rem] overflow-hidden">
                {agent.id}
              </span>
            </div>
            <Button
              className="w-full mt-4"
              onClick={() => onViewDetails?.(agent)}
            >
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
