import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Star, StarOff, ChevronLeft, ChevronRight, Grid3X3, Crown, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface App {
  name: string;
  icon: string;
  url: string;
  category: string;
}

export const RightDragSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showAddFavorite, setShowAddFavorite] = useState(false);
  const { toast } = useToast();
  const sidebarRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen && 
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('.sidebar-toggle-button')
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const filteredApps = searchTerm
    ? apps.filter(app => app.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  const favoriteApps = apps.filter(app => favorites.includes(app.name));

  useEffect(() => {
    if (searchTerm && filteredApps.length === 1) {
      const timer = setTimeout(() => {
        handleAppClick(filteredApps[0].url);
        setSearchTerm("");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [searchTerm, filteredApps]);

  useEffect(() => {
    if (favorites.length === 0 && !searchTerm) {
      const timer = setTimeout(() => {
        setShowAddFavorite(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setShowAddFavorite(false);
    }
  }, [favorites, searchTerm]);

  const handleAppClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && filteredApps.length > 0) {
      handleAppClick(filteredApps[0].url);
      setSearchTerm("");
    }
  };

  const toggleFavorite = (appName: string, showToast = true) => {
    if (favorites.includes(appName)) {
      setFavorites(favorites.filter(name => name !== appName));
      if (showToast) {
        toast({
          title: "Removed from favorites",
          description: `${appName} has been removed from your favorites.`,
        });
      }
    } else if (favorites.length < 3) {
      setFavorites([...favorites, appName]);
      if (showToast) {
        toast({
          title: "Added to favorites",
          description: `${appName} has been added to your favorites.`,
        });
      }
    } else {
      setShowPremiumModal(true);
      if (showToast) {
        toast({
          title: "Favorites limit reached",
          description: "Upgrade to premium for unlimited favorites.",
          variant: "destructive",
        });
      }
    }
  };

  const handleFavoriteClick = (appName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (favorites.includes(appName)) {
      toggleFavorite(appName);
    } else if (favorites.length >= 3) {
      setShowPremiumModal(true);
      toast({
        title: "Favorites limit reached",
        description: "Upgrade to premium for unlimited favorites.",
        variant: "destructive",
      });
    } else {
      toggleFavorite(appName);
    }
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <div
        className={`fixed top-[calc(50%+40px)] transform -translate-y-1/2 z-50 transition-all duration-300 sidebar-toggle-button ${
          isOpen ? 'right-[320px] md:right-[420px]' : 'right-0'
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            relative
            bg-gradient-to-r from-blue-600 to-purple-600 
            hover:from-blue-500 hover:to-purple-500
            active:from-blue-700 active:to-purple-700
            border-2 border-blue-400/30
            rounded-full
            w-12 h-12
            shadow-lg
            text-white 
            transition-all duration-300
            hover:shadow-xl hover:scale-110
            active:scale-95
            group
            overflow-hidden
          `}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10 flex items-center justify-center">
            {isOpen ? (
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            ) : (
              <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
            )}
          </div>
          <div className={`
            absolute right-full top-1/2 transform -translate-y-1/2
            mr-3 px-3 py-1.5
            bg-slate-800 text-xs font-medium
            rounded-md whitespace-nowrap
            shadow-md
            opacity-0 group-hover:opacity-100
            transition-all duration-200
            ${isOpen ? 'translate-x-1' : '-translate-x-1'}
          `}>
            {isOpen ? "Close launcher" : "Quick access!"}
            <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-white/10 animate-ping opacity-0 group-hover:opacity-100 pointer-events-none"></div>
        </button>
      </div>

      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed top-[80px] right-0 w-[320px] md:w-[420px] bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-l-2xl transition-transform duration-300 z-40 shadow-xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          height: 'calc(min(90vh, 100vh - 100px))',
          maxHeight: '800px',
          minHeight: '400px'
        }}
      >
        <Card className="bg-transparent border-none p-4 md:p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <Grid3X3 className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  App Launcher
                </h2>
                <p className="text-xs md:text-sm text-slate-400">Quick access to your favorite apps</p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-400">
              {favorites.length}/3 Favorites
            </Badge>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4 md:mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 md:h-4 md:w-4 text-slate-400" />
            <Input
              placeholder="Search apps... (Press Enter to open)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              className="pl-8 md:pl-10 text-sm md:text-base bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20"
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-h-0 flex flex-col">
            {/* Favorites Section */}
            {!searchTerm && (
              <div className="mb-2 md:mb-3">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <h3 className="text-xs md:text-sm font-semibold text-slate-300 flex items-center">
                    <Star className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-yellow-400 fill-yellow-400/20" />
                    Your Favorites
                  </h3>
                  <span className="text-xs text-slate-500">{favorites.length}/3</span>
                </div>
                
                {favoriteApps.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2 md:gap-3">
                    {favoriteApps.map((app) => (
                      <button
                        key={app.name}
                        onClick={() => handleAppClick(app.url)}
                        className="flex flex-col items-center p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-200 group relative"
                      >
                        <span className="text-xl md:text-2xl mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-200">
                          {app.icon}
                        </span>
                        <span className="text-white text-xs text-center font-medium truncate w-full">
                          {app.name}
                        </span>
                        <button
                          onClick={(e) => handleFavoriteClick(app.name, e)}
                          className="absolute -top-1 -right-1 p-0.5 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors"
                        >
                          <Star className="h-2.5 w-2.5 text-white fill-white" />
                        </button>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-slate-800/30 border border-dashed border-slate-600/50">
                    {showAddFavorite ? (
                      <>
                        <div className="text-4xl mb-3">⭐</div>
                        <p className="text-slate-300 text-sm text-center mb-2">
                          Get started by adding your favorite apps
                        </p>
                        <p className="text-slate-500 text-xs text-center mb-4">
                          Search for an app and click the star to add it here
                        </p>
                        <div className="flex flex-col space-y-2 w-full">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs border-blue-500/30 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                            onClick={() => setSearchTerm("Gmail")}
                          >
                            <Plus className="h-3 w-3 mr-1" /> Add Gmail
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs border-purple-500/30 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                            onClick={() => setSearchTerm("Notion")}
                          >
                            <Plus className="h-3 w-3 mr-1" /> Add Notion
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-4xl mb-3">🌟</div>
                        <p className="text-slate-400 text-sm text-center">
                          Your favorite apps will appear here
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Search Results */}
            <div className="flex-1 min-h-[200px] overflow-y-auto">
              {searchTerm && (
                <>
                  <h3 className="text-xs md:text-sm font-semibold text-slate-300 mb-2 md:mb-3">
                    {filteredApps.length > 0 ? `Found ${filteredApps.length} apps` : 'No results found'}
                  </h3>
                  {filteredApps.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40">
                      <div className="text-4xl mb-3">🔍</div>
                      <p className="text-slate-400 text-sm text-center mb-1">No apps found for "{searchTerm}"</p>
                      <p className="text-slate-500 text-xs text-center">Try searching for "Gmail", "Notion", etc.</p>
                    </div>
                  ) : (
                    <div className="space-y-1 md:space-y-2">
                      {filteredApps.map((app) => (
                        <div key={app.name} className="relative">
                          <button
                            onClick={() => handleAppClick(app.url)}
                            className="flex items-center w-full p-2 md:p-3 rounded-lg md:rounded-xl bg-slate-700/30 hover:bg-slate-600/50 border border-slate-600/30 hover:border-blue-500/50 transition-all duration-200 group"
                          >
                            <span className="text-xl md:text-2xl mr-2 md:mr-4 group-hover:scale-110 transition-transform duration-200">
                              {app.icon}
                            </span>
                            <div className="flex-1 text-left overflow-hidden">
                              <span className="text-white text-xs md:text-sm font-medium block truncate">
                                {app.name}
                              </span>
                              <Badge
                                variant="outline"
                                className="text-xxs md:text-xs mt-0.5 md:mt-1 border-slate-500/30 text-slate-400"
                              >
                                {app.category}
                              </Badge>
                            </div>
                          </button>

                          <button
                            onClick={(e) => handleFavoriteClick(app.name, e)}
                            className={`absolute top-1.5 right-1.5 p-1 rounded-full transition-all ${
                              favorites.includes(app.name)
                                ? "bg-yellow-500 text-white hover:bg-yellow-600"
                                : "bg-slate-600/50 text-slate-400 hover:bg-slate-500/50 hover:text-white"
                            }`}
                          >
                            {favorites.includes(app.name) ? (
                              <Star className="h-3 w-3 fill-current" />
                            ) : (
                              <StarOff className="h-3 w-3" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Premium Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center">
                <Crown className="h-5 w-5 text-yellow-400 mr-2" />
                Upgrade to Premium
              </h3>
              <button
                onClick={() => setShowPremiumModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-slate-300 mb-6">
              You've reached the free limit of 3 favorites. Upgrade to unlock unlimited favorites and more!
            </p>
            <div className="space-y-4">
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <h4 className="font-medium text-white mb-2">Premium Features</h4>
                <ul className="text-sm text-slate-300 space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span> Unlimited favorites
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span> Custom app categories
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span> Priority support
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span> Advanced search
                  </li>
                </ul>
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg"
                onClick={() => {
                  setShowPremiumModal(false);
                  toast({
                    title: "Premium Activated",
                    description: "Enjoy unlimited favorites and premium features!",
                  });
                }}
              >
                Upgrade Now - $4.99/month
              </Button>
              <Button
                variant="outline"
                className="w-full border-slate-600 text-slate-300 hover:text-white"
                onClick={() => setShowPremiumModal(false)}
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};