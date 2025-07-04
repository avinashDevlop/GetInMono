
import { UniversalInbox } from "./UniversalInbox";
import { SmartDragDock } from "./SmartDragDock";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings, User, Bell } from "lucide-react";

interface FocusedDashboardProps {
  onBack: () => void;
}

export const FocusedDashboard = ({ onBack }: FocusedDashboardProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      {/* Clean Header */}
      <header className="bg-black/30 backdrop-blur-lg border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack} 
              className="text-white hover:bg-white/10 font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-black text-white">GetInMono</h1>
              <p className="text-sm text-slate-400">One Inbox. All Your Apps. Zero Distractions.</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-2 gap-8 min-h-[calc(100vh-120px)]">
          {/* Universal Inbox - Left */}
          <div className="flex flex-col">
            <UniversalInbox />
          </div>

          {/* Smart Drag Dock - Right */}
          <div className="flex flex-col space-y-6">
            <SmartDragDock />
            
            {/* Info Panel */}
            <div className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">
              <h3 className="text-white font-bold mb-3 flex items-center">
                <span className="text-2xl mr-3">🎯</span>
                Focus-First Design
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                No apps load by default. Click any app above to launch it in a new tab. 
                Your Universal Inbox shows all recent activity in one place—stay focused, stay organized.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
