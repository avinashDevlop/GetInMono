import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Target, Shield, Mail, MessageSquare, Bell } from "lucide-react";

interface HeroSectionProps {
  onLaunchDashboard: () => void;
}

export const HeroSection = ({ onLaunchDashboard }: HeroSectionProps) => {
  return (
    <div className="relative">
      {/* Hero Section - First 100vh */}
      <section className="relative  h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800" />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          {/* Main Heading */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight">
              One Inbox.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                All Your Apps.
              </span>
            </h1>
            
            <div className="text-xl sm:text-2xl md:text-3xl text-yellow-300 font-bold mb-6 sm:mb-8">
              No Distractions. No Switching. Just Focus.
            </div>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-300 mx-auto leading-relaxed mb-8 sm:mb-12 max-w-md sm:max-w-2xl">
              GetInMono is your control center — manage WhatsApp, Gmail, Instagram, and more from one clean dashboard.
              Say goodbye to app chaos and hello to focused productivity.
            </p>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 sm:px-12 py-5 sm:py-6 text-base sm:text-lg font-bold transform hover:scale-105 transition-all duration-200"
              onClick={onLaunchDashboard}
            >
              <Zap className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
              Get Started
              <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            
            <p className="text-slate-400 text-xs sm:text-sm">enjoy break and come back to focus</p>
          </div>
        </div>
      </section>

      {/* Cards Section - Next 100vh */}
      <section className="min-h-screen flex items-center justify-center bg-slate-900 px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto w-full px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-12 sm:mb-16">
            Unified Communication <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Simplified</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-purple-400/30 transition-all duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 text-center">Email Integration</h3>
              <p className="text-slate-300 text-sm sm:text-base text-center">
                Connect all your email accounts in one place. Never miss an important message again.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-400/30 transition-all duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 text-center">Messaging Apps</h3>
              <p className="text-slate-300 text-sm sm:text-base text-center">
                WhatsApp, Messenger, Telegram - all your chats in one unified inbox.
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-green-400/30 transition-all duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 text-center">Notifications</h3>
              <p className="text-slate-300 text-sm sm:text-base text-center">
                Customizable alerts so you only see what matters. Mute the noise, focus on what's important.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};