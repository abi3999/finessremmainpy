
import { Heart, Dumbbell, Calculator, Timer, Music } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { icon: Calculator, label: "Calories", path: "/calories" },
    { icon: Dumbbell, label: "Workout", path: "/workout" },
    { icon: Heart, label: "Remedies", path: "/remedies" },
    { icon: Timer, label: "Timer", path: "/timer" },
    { icon: Music, label: "Music", path: "/music" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border px-4 py-2 animate-slide-up">
      <div className="max-w-screen-xl mx-auto">
        <ul className="flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center p-2 rounded-lg transition-all duration-200",
                    isActive
                      ? "text-primary scale-110"
                      : "text-muted-foreground hover:text-primary hover:scale-105"
                  )}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs mt-1">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
