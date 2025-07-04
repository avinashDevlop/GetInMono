
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, Star } from "lucide-react";

interface AppGridProps {
  title: string;
  apps: Array<{
    name: string;
    icon: string;
    url: string;
    color: string;
    description: string;
  }>;
  onAppClick: (app: any) => void;
  pinnedApps: string[];
  onTogglePin: (appName: string) => void;
}

export const AppGrid = ({ title, apps, onAppClick, pinnedApps, onTogglePin }: AppGridProps) => {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
        <span className="text-3xl mr-3">{title === "Messaging Apps" ? "💬" : "🌐"}</span>
        {title}
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {apps.map((app) => (
          <Card 
            key={app.name}
            className="bg-white/5 backdrop-blur-lg border-white/10 p-4 hover:bg-white/10 transition-all duration-200 cursor-pointer group relative"
            onClick={() => onAppClick(app)}
          >
            {/* Pin Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTogglePin(app.name);
              }}
              className={`absolute top-2 right-2 p-1 rounded-full transition-all ${
                pinnedApps.includes(app.name)
                  ? "bg-yellow-500 text-white"
                  : "bg-white/10 text-slate-400 hover:bg-white/20"
              }`}
            >
              <Star className="h-3 w-3" />
            </button>

            <div className="text-center">
              <div 
                className={`text-4xl mb-3 p-3 rounded-xl ${app.color} mx-auto w-fit group-hover:scale-110 transition-transform duration-200`}
              >
                {app.icon}
              </div>
              <h4 className="text-white font-semibold text-sm mb-1">{app.name}</h4>
              <p className="text-slate-400 text-xs mb-3">{app.description}</p>
              
              <Button 
                size="sm" 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Open
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
