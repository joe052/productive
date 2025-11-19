import React from 'react';
import { Zap, Target, BarChart3, Users, Bell, RefreshCw } from 'lucide-react';

const featuresData = [
  {
    title: "Lightning Fast",
    description: "Create, organize, and complete tasks in seconds with our intuitive interface and keyboard shortcuts.",
    icon: <Zap className="h-6 w-6 text-white" />,
    color: "bg-emerald-500"
  },
  {
    title: "Smart Prioritization",
    description: "Automatically organize tasks by priority and deadline to focus on what matters most.",
    icon: <Target className="h-6 w-6 text-white" />,
    color: "bg-emerald-500"
  },
  {
    title: "Progress Tracking",
    description: "Visualize your productivity with detailed analytics and completion insights.",
    icon: <BarChart3 className="h-6 w-6 text-white" />,
    color: "bg-emerald-500"
  },
  {
    title: "Team Collaboration",
    description: "Share tasks, assign responsibilities, and work together seamlessly with your team.",
    icon: <Users className="h-6 w-6 text-white" />,
    color: "bg-emerald-500"
  },
  {
    title: "Smart Reminders",
    description: "Never miss a deadline with intelligent notifications across all your devices.",
    icon: <Bell className="h-6 w-6 text-white" />,
    color: "bg-emerald-500"
  },
  {
    title: "Sync Everywhere",
    description: "Access your tasks from any device with real-time synchronization across platforms.",
    icon: <RefreshCw className="h-6 w-6 text-white" />,
    color: "bg-emerald-500"
  }
];

const Features = () => {
  return (
    <section className="w-full py-12 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
            Everything You Need to Stay Productive
          </h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Powerful features designed to help you work better and smarter, not harder.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <div key={index} className="flex flex-col text-left space-y-2 p-6">
              <div className={`p-3 text-center rounded-lg w-fit ${feature.color} mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;