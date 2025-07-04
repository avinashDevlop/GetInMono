
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowUpDown, Filter } from "lucide-react";

interface App {
  name: string;
  icon: string;
  url: string;
  category: string;
}

export const SmartDragDock = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAlphabetically, setSortAlphabetically] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const apps: App[] = [
    { name: "Gmail", icon: "📩", url: "https://mail.google.com", category: "messaging" },
    { name: "WhatsApp", icon: "💬", url: "https://web.whatsapp.com", category: "messaging" },
    { name: "Telegram", icon: "✈️", url: "https://web.telegram.org", category: "messaging" },
    { name: "Discord", icon: "🎮", url: "https://discord.com", category: "messaging" },
    { name: "Slack", icon: "💻", url: "https://slack.com", category: "messaging" },
    { name: "Messenger", icon: "💌", url: "https://messenger.com", category: "messaging" },
    { name: "Instagram", icon: "📷", url: "https://instagram.com", category: "social" },
    { name: "Twitter", icon: "🐦", url: "https://twitter.com", category: "social" },
    { name: "LinkedIn", icon: "💼", url: "https://linkedin.com", category: "social" },
    { name: "Facebook", icon: "📘", url: "https://facebook.com", category: "social" },
    { name: "YouTube", icon: "📺", url: "https://youtube.com", category: "media" },
    { name: "TikTok", icon: "📲", url: "https://tiktok.com", category: "media" },
    { name: "Zoom", icon: "🎥", url: "https://zoom.us", category: "work" },
    { name: "Google Meet", icon: "📞", url: "https://meet.google.com", category: "work" },
    { name: "Canva", icon: "🎨", url: "https://canva.com", category: "work" },
    { name: "Notion", icon: "📝", url: "https://notion.so", category: "work" },
    { name: "Spotify", icon: "🎵", url: "https://spotify.com", category: "media" },
    { name: "Netflix", icon: "🎬", url: "https://netflix.com", category: "media" },
  ];

  const categories = ["all", "messaging", "social", "work", "media"];

  const filteredApps = apps
    .filter(app => 
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "all" || app.category === selectedCategory)
    )
    .sort((a, b) => 
      sortAlphabetically ? a.name.localeCompare(b.name) : 0
    );

  const handleAppClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      messaging: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      social: "bg-pink-500/20 text-pink-400 border-pink-500/30",
      work: "bg-green-500/20 text-green-400 border-green-500/30",
      media: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      all: "bg-slate-500/20 text-slate-400 border-slate-500/30"
    };
    return colors[category as keyof typeof colors] || colors.all;
  };

  return (
    <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-600/50 p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Search className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              App Launcher
            </h2>
            <p className="text-sm text-slate-400">Find and launch any app instantly</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSortAlphabetically(!sortAlphabetically)}
          className={`text-white hover:bg-slate-700/50 ${sortAlphabetically ? 'bg-slate-700/50' : ''}`}
        >
          <ArrowUpDown className="h-4 w-4 mr-2" />
          A–Z
        </Button>
      </div>

      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search apps..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-slate-400" />
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`cursor-pointer transition-all hover:scale-105 ${
                selectedCategory === category 
                  ? getCategoryColor(category)
                  : "border-slate-600/50 text-slate-400 hover:bg-slate-700/50"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-2">
        {filteredApps.map((app, idx) => (
          <button
            key={idx}
            onClick={() => handleAppClick(app.url)}
            className="flex flex-col items-center p-4 rounded-xl bg-slate-700/30 hover:bg-slate-600/50 border border-slate-600/30 hover:border-blue-500/50 transition-all duration-200 group"
          >
            <span className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">
              {app.icon}
            </span>
            <span className="text-white text-xs text-center font-medium leading-tight">
              {app.name}
            </span>
            <Badge 
              className={`mt-1 text-[10px] px-1.5 py-0.5 ${getCategoryColor(app.category)}`}
            >
              {app.category}
            </Badge>
          </button>
        ))}
      </div>

      {filteredApps.length === 0 && (
        <div className="flex items-center justify-center h-32">
          <div className="text-center">
            <div className="text-4xl mb-2">🔍</div>
            <p className="text-slate-400 text-sm">No apps found</p>
            <p className="text-slate-500 text-xs">Try adjusting your search or filter</p>
          </div>
        </div>
      )}
    </Card>
  );
};
