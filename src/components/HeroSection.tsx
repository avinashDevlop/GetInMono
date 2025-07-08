import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Mail, MessageSquare, Bell } from "lucide-react";

interface HeroSectionProps {
  onLaunchDashboard: () => void;
}

export const HeroSection = ({ onLaunchDashboard }: HeroSectionProps) => {
  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section - Mobile Optimized */}
      <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-12 sm:pt-0 pb-12">
        {/* Gradient Backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/90 to-slate-900 z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-0" />

        {/* Floating Blobs - More prominent on mobile */}
        <div className="absolute top-[5%] left-[5%] w-48 h-48 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 bg-purple-500/20 rounded-full blur-3xl animate-float-slow z-0" />
        <div className="absolute bottom-[10%] right-[5%] w-48 h-48 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-blue-500/20 rounded-full blur-[90px] animate-float-slow-delay z-0" />

        {/* Main Content - Mobile First */}
        <div className="relative z-10 w-full px-4 max-w-4xl">
          <h1 className="text-5xl xs:text-6xl sm:text-6xl md:text-7xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight">
            <span className="block">One Inbox.</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              All Your Apps.
            </span>
          </h1>

          <div className="text-2xl sm:text-3xl md:text-3xl text-yellow-300 font-medium mb-6 sm:mb-8">
            No Distractions.<br className="sm:hidden" /> Just Focus.
          </div>

          <p className="text-lg sm:text-xl md:text-lg text-slate-300 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            GetInMono unifies all communications in one clean interface.
            <br className="hidden sm:block" />
            Manage WhatsApp, Gmail, and more without switching apps.
          </p>

          <div className="flex flex-col items-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg sm:text-xl font-semibold rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-purple-500/20 w-full sm:w-auto"
              onClick={onLaunchDashboard}
            >
              <Zap className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
            <p className="text-slate-400 text-sm sm:text-base">
              Enjoy your break, then focus.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section - Mobile Optimized */}
      <section className="min-h-[90vh] sm:min-h-screen bg-slate-900 flex flex-col justify-center items-center px-4 sm:px-6 py-12 sm:py-20 lg:py-24">
        <div className="w-full max-w-6xl px-4">
          <h2 className="text-4xl sm:text-5xl md:text-5xl font-bold text-white text-center mb-12 sm:mb-20 leading-tight">
            Unified <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Communication
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
            {/* Feature Card 1 */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-purple-400/30 transition-all duration-300 text-center h-full">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <h3 className="text-2xl sm:text-2xl font-semibold text-white mb-4">Email Integration</h3>
              <p className="text-slate-300 text-lg sm:text-base leading-relaxed">
                All email accounts in one unified view.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-400/30 transition-all duration-300 text-center h-full">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <h3 className="text-2xl sm:text-2xl font-semibold text-white mb-4">Messaging Hub</h3>
              <p className="text-slate-300 text-lg sm:text-base leading-relaxed">
                All conversations in one interface.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-green-400/30 transition-all duration-300 text-center h-full">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Bell className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <h3 className="text-2xl sm:text-2xl font-semibold text-white mb-4">Smart Notifications</h3>
              <p className="text-slate-300 text-lg sm:text-base leading-relaxed">
                See only what matters.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};