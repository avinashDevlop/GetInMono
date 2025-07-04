import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden bg-gradient-to-br from-purple-900 to-indigo-900">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      {/* Content container with flex column layout */}
      <div className="relative flex h-full flex-col">
        {/* Main content that grows to fill space */}
        <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
          <div className="max-w-4xl">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:mb-8 lg:text-7xl">
              One Inbox.
              <br />
              <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                All Your Apps.
              </span>
            </h1>
            
            <p className="mb-8 text-xl font-medium text-blue-200 sm:text-2xl lg:mb-12">
              <span className="font-bold text-white">No Distractions. No Switching. Just Focus.</span>
            </p>
            
            <p className="mx-auto max-w-2xl text-lg text-blue-100 sm:text-xl">
              GetInMono is your control center — manage WhatsApp, Gmail, Instagram, and more from our dashboard. Say goodbye to app chaos and hello to focused productivity.
            </p>
          </div>
        </div>

        {/* Bottom section with CTA */}
        <div className="w-full pb-12 sm:pb-16">
          <div className="mx-auto max-w-md px-4">
            <div className="mb-8 text-center text-blue-200">
              enjoy break and come back to focus
            </div>
            
            <Button
              onClick={onGetStarted}
              size="lg"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-6 text-lg font-semibold text-white shadow-lg transition-all hover:from-purple-700 hover:to-blue-700 hover:shadow-purple-500/30 sm:py-7 sm:text-xl"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};