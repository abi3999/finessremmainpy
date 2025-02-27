
import { useState } from "react";
import { Calendar, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

interface WorkoutPlan {
  name: string;
  schedule: { [key: string]: string };
}

const Workout = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [completedDays, setCompletedDays] = useState<string[]>([]);
  const { toast } = useToast();
  
  const predefinedPlans: WorkoutPlan[] = [
    {
      name: "PPL Split",
      schedule: {
        Monday: "Push (Chest, Shoulders, Triceps)",
        Tuesday: "Pull (Back, Biceps)",
        Wednesday: "Legs (Quads, Hamstrings, Calves)",
        Thursday: "Push (Chest, Shoulders, Triceps)",
        Friday: "Pull (Back, Biceps)",
        Saturday: "Legs (Quads, Hamstrings, Calves)",
        Sunday: "Rest Day"
      }
    },
    {
      name: "Classic Split",
      schedule: {
        Monday: "Chest & Triceps",
        Tuesday: "Back & Biceps",
        Wednesday: "Legs & Core",
        Thursday: "Rest & Recovery",
        Friday: "Shoulders & Arms",
        Saturday: "Compound Exercises",
        Sunday: "Rest Day"
      }
    }
  ];

  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan>(predefinedPlans[0]);

  const handleCheckDay = (day: string) => {
    setCompletedDays((prev) => {
      const newCompletedDays = prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day];

      if (!prev.includes(day)) {
        toast({
          title: "Workout Completed! 💪",
          description: `Great job completing your ${day}'s workout!`,
        });
      }

      return newCompletedDays;
    });
  };

  return (
    <div className="container px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-primary mb-8">Workout Schedule</h1>
      
      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Workout Plan
          </label>
          <select
            className="w-full p-2 rounded-lg border border-gray-200 bg-white/70 backdrop-blur-lg"
            value={selectedPlan.name}
            onChange={(e) => {
              const plan = predefinedPlans.find(p => p.name === e.target.value);
              if (plan) {
                setSelectedPlan(plan);
                setCompletedDays([]); // Reset completed days when changing plan
              }
            }}
          >
            {predefinedPlans.map((plan) => (
              <option key={plan.name} value={plan.name}>
                {plan.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4">
          {days.map((day) => (
            <div
              key={day}
              className={`bg-white/70 backdrop-blur-lg rounded-xl p-4 shadow-lg flex justify-between items-center transition-colors ${
                completedDays.includes(day) ? "bg-primary/10" : ""
              }`}
            >
              <div className="flex items-center gap-4 flex-1">
                <Checkbox
                  checked={completedDays.includes(day)}
                  onCheckedChange={() => handleCheckDay(day)}
                  id={`checkbox-${day}`}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{day}</h3>
                  <p className={`text-sm ${day === "Sunday" ? "text-accent" : "text-gray-600"}`}>
                    {selectedPlan.schedule[day]}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Calendar className="w-5 h-5" />
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-primary/10 rounded-lg">
          <h3 className="font-semibold text-primary mb-2">Plan Details</h3>
          <p className="text-sm text-gray-600">
            {selectedPlan.name === "PPL Split" 
              ? "Push Pull Legs (PPL) is a training split that divides workouts by movement patterns, training each major muscle group twice per week."
              : "The Classic Split allows for focused training on specific muscle groups with adequate rest periods, ideal for both beginners and intermediate lifters."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Workout;
