
import { Card } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Target, Users, Clock, Brain } from "lucide-react";

export const AboutSection = () => {
  const problems = [
    {
      icon: AlertTriangle,
      title: "App Switching Chaos",
      description: "People waste hours daily jumping between 10+ different messaging and social apps"
    },
    {
      icon: Brain,
      title: "Cognitive Overload",
      description: "Managing multiple interfaces creates mental fatigue and reduces productivity"
    },
    {
      icon: Clock,
      title: "Time Waste",
      description: "Lost focus and context switching leads to decreased efficiency and stress"
    }
  ];

  const solutions = [
    {
      icon: Target,
      title: "Unified Dashboard",
      description: "All your communication platforms accessible from one clean, organized interface"
    },
    {
      icon: CheckCircle,
      title: "Reduced Distractions",
      description: "Focus mode eliminates social media clutter when you need to concentrate"
    },
    {
      icon: Users,
      title: "Enhanced Productivity",
      description: "Built-in focus tools like Pomodoro timer, notes, and to-do lists keep you on track"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Why GetInMono?
          </h2>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto">
            We understand the modern digital communication problem and built the perfect solution
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Problems */}
          <div>
            <h3 className="text-3xl font-bold text-red-400 mb-8 flex items-center">
              <AlertTriangle className="h-8 w-8 mr-3" />
              The Problem
            </h3>
            <div className="space-y-6">
              {problems.map((problem, index) => {
                const IconComponent = problem.icon;
                return (
                  <Card key={index} className="bg-red-500/5 backdrop-blur-lg border-red-500/20 p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-red-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg mb-2">{problem.title}</h4>
                        <p className="text-slate-300">{problem.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-3xl font-bold text-green-400 mb-8 flex items-center">
              <CheckCircle className="h-8 w-8 mr-3" />
              Our Solution
            </h3>
            <div className="space-y-6">
              {solutions.map((solution, index) => {
                const IconComponent = solution.icon;
                return (
                  <Card key={index} className="bg-green-500/5 backdrop-blur-lg border-green-500/20 p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg mb-2">{solution.title}</h4>
                        <p className="text-slate-300">{solution.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">15+</div>
              <div className="text-slate-300">Apps Integrated</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">Zero</div>
              <div className="text-slate-300">Default Clutter</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">100%</div>
              <div className="text-slate-300">Focus-First</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">∞</div>
              <div className="text-slate-300">Productivity Boost</div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
