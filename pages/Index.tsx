
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      title: "Home Remedies",
      description: "Find natural solutions for common health issues",
      path: "/remedies",
    },
    {
      title: "Workout Planner",
      description: "Schedule and track your fitness routine",
      path: "/workout",
    },
    {
      title: "Timer",
      description: "Track your rest periods between sets",
      path: "/timer",
    },
    {
      title: "Music Suggestions",
      description: "Get motivated with the perfect workout playlist",
      path: "/music",
    },
  ];

  return (
    <div className="container px-4 py-8 animate-fade-in">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">FitRemedy</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Your all-in-one fitness companion for workouts, remedies, and wellness
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <Link
            to={feature.path}
            key={index}
            className="group relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
          >
            <div className="relative z-10">
              <h3 className="text-xl font-semibold text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <span className="inline-flex items-center text-accent">
                Explore <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Index;
