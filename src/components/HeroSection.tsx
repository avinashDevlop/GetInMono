import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Mail, MessageSquare, Bell } from "lucide-react";

interface HeroSectionProps {
  onLaunchDashboard: () => void;
}

export const HeroSection = ({ onLaunchDashboard }: HeroSectionProps) => {
  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 sm:px-6">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/90 to-slate-900 z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-0" />

        {/* Subtle Background Elements */}
        <div className="absolute top-[15%] left-[10%] w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] bg-purple-500/10 rounded-full blur-[80px] animate-float-slow z-0" />
        <div className="absolute bottom-[20%] right-[10%] w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-blue-500/10 rounded-full blur-[90px] animate-float-slow-delay z-0" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl w-full px-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 md:mb-8 leading-tight">
            One Inbox.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              All Your Apps.
            </span>
          </h1>

          <div className="text-2xl sm:text-3xl md:text-4xl text-yellow-300/85 font-medium mb-6 md:mb-8">
            No Distractions. No Switching. Just Focus.
          </div>

          <p className="text-xl sm:text-2xl text-slate-300/85 max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed">
            GetInMono brings all your communications together in one clean interface.
            <br />
            Manage WhatsApp, Gmail, Instagram, and more without app switching.
          </p>

          <div className="flex flex-col items-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-6 text-xl font-semibold rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-lg"
              onClick={onLaunchDashboard}
            >
              <Zap className="mr-3 h-6 w-6" />
              Get Started
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <p className="text-slate-400/75 text-lg">Enjoy your break, then come back and focus.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="min-h-screen bg-slate-900 flex flex-col justify-center items-center px-4 sm:px-6 py-16">
        <div className="max-w-5xl w-full px-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-white text-center mb-16 md:mb-20 leading-tight">
            Unified Communication{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Simplified
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-purple-400/30 transition-all duration-300 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Email Integration</h3>
              <p className="text-slate-300/85 text-lg leading-relaxed">
                Connect all email accounts in one unified view.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-blue-400/30 transition-all duration-300 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Messaging Hub</h3>
              <p className="text-slate-300/85 text-lg leading-relaxed">
                All your conversations in one streamlined interface.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-green-400/30 transition-all duration-300 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Bell className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Smart Notifications</h3>
              <p className="text-slate-300/85 text-lg leading-relaxed">
                See only what matters when it matters.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};