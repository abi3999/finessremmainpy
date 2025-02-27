
import { useState } from "react";
import { Calculator, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Calories = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [activityLevel, setActivityLevel] = useState<number>(1.2);
  const [calories, setCalories] = useState<number | null>(null);
  const [dietPlan, setDietPlan] = useState<string | null>(null);
  const [isLoadingDiet, setIsLoadingDiet] = useState(false);
  const { toast } = useToast();

  const calculateBMR = () => {
    if (!weight || !height || !age) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Convert string inputs to numbers
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    // Basic BMR calculation using Mifflin-St Jeor Equation
    let bmr;
    if (gender === "male") {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    // Calculate maintenance calories with activity level
    const maintenanceCalories = Math.round(bmr * activityLevel);
    setCalories(maintenanceCalories);
    setDietPlan(null); // Reset diet plan when recalculating
  };

  const generateDietPlan = async () => {
    if (!calories) {
      toast({
        title: "Please calculate your calories first",
        variant: "destructive",
      });
      return;
    }

    setIsLoadingDiet(true);
    
    try {
      // Fallback to demo mode if API not available
      // In a production environment, this would be replaced with the actual API call
      console.log("Simulating AI diet plan for:", calories, "calories");
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const activityText = getActivityLevelText();
      const caloriesPerMeal = Math.round(calories / 5); // Divide by 5 for 3 meals + 2 snacks
      
      // Generate a simple fallback diet plan
      const fallbackDietPlan = `# Personalized Diet Plan (${calories} calories/day)

## Breakfast (${Math.round(calories * 0.25)} calories)
- 2 scrambled eggs with spinach (180 cal)
- 1 slice whole grain toast with avocado (150 cal)
- 1 medium apple (80 cal)
- Green tea or black coffee (0 cal)

## Morning Snack (${Math.round(calories * 0.1)} calories)
- Greek yogurt with berries (150 cal)
- Small handful of almonds (100 cal)

## Lunch (${Math.round(calories * 0.3)} calories)
- Grilled chicken breast (4oz) (120 cal)
- Quinoa (1/2 cup) (110 cal)
- Mixed vegetables roasted with olive oil (150 cal)
- Side salad with light dressing (100 cal)
- Water with lemon (0 cal)

## Afternoon Snack (${Math.round(calories * 0.1)} calories)
- Protein smoothie with banana and spinach (200 cal)
- Carrot sticks with hummus (100 cal)

## Dinner (${Math.round(calories * 0.25)} calories)
- Baked salmon (4oz) (180 cal)
- Sweet potato (medium) (110 cal)
- Steamed broccoli (50 cal)
- Mixed green salad with olive oil and vinegar (100 cal)
- Herbal tea (0 cal)

## Hydration
- Aim for 8-10 glasses of water throughout the day

## Notes
- This meal plan is designed for a ${gender} with a ${activityText} activity level
- Adjust portion sizes as needed to meet your ${calories} calorie goal
- Focus on whole, nutrient-dense foods
- Distribute protein throughout the day for better muscle maintenance
- Include a variety of colorful vegetables and fruits for vitamins and minerals`;
      
      setDietPlan(fallbackDietPlan);
    } catch (error) {
      console.error('Error generating diet plan:', error);
      toast({
        title: "Diet Plan Generation Failed",
        description: "There was an error getting your personalized diet plan. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingDiet(false);
    }
  };

  const getActivityLevelText = () => {
    switch (activityLevel) {
      case 1.2: return "sedentary";
      case 1.375: return "lightly active";
      case 1.55: return "moderately active";
      case 1.725: return "very active";
      case 1.9: return "extremely active";
      default: return "moderately active";
    }
  };

  return (
    <div className="container px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-primary mb-8">Calorie Calculator</h1>
      
      <div className="max-w-xl mx-auto">
        <div className="glass-morphism rounded-xl p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Weight (kg)</label>
            <Input
              type="number"
              placeholder="Enter weight in kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="bg-background/50 border-white/10"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Height (cm)</label>
            <Input
              type="number"
              placeholder="Enter height in cm"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="bg-background/50 border-white/10"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Age (years)</label>
            <Input
              type="number"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="bg-background/50 border-white/10"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Gender</label>
            <div className="flex gap-4">
              <Button
                variant={gender === "male" ? "default" : "outline"}
                onClick={() => setGender("male")}
                className={gender === "male" ? "bg-primary hover:bg-primary/90" : ""}
              >
                Male
              </Button>
              <Button
                variant={gender === "female" ? "default" : "outline"}
                onClick={() => setGender("female")}
                className={gender === "female" ? "bg-accent hover:bg-accent/90" : ""}
              >
                Female
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Activity Level</label>
            <select
              className="w-full p-2 rounded-md bg-background/50 border border-white/10 text-foreground"
              value={activityLevel}
              onChange={(e) => setActivityLevel(parseFloat(e.target.value))}
            >
              <option value={1.2}>Sedentary (little or no exercise)</option>
              <option value={1.375}>Light (exercise 1-3 times/week)</option>
              <option value={1.55}>Moderate (exercise 3-5 times/week)</option>
              <option value={1.725}>Active (exercise 6-7 times/week)</option>
              <option value={1.9}>Very Active (hard exercise/sports)</option>
            </select>
          </div>
          
          <Button 
            className="w-full bg-primary hover:bg-primary/90"
            onClick={calculateBMR}
          >
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Maintenance Calories
          </Button>

          {calories && (
            <div className="mt-6 p-4 neo-blur rounded-lg">
              <h3 className="text-lg font-semibold text-primary mb-2">Your Daily Maintenance Calories:</h3>
              <p className="text-3xl font-bold text-primary">{calories} kcal</p>
              <p className="text-sm text-muted-foreground mt-2">
                This is the estimated number of calories you need to maintain your current weight.
              </p>
              
              {!dietPlan && !isLoadingDiet && (
                <Button 
                  onClick={generateDietPlan} 
                  className="mt-4 bg-primary hover:bg-primary/90"
                >
                  <Bot className="w-4 h-4 mr-2" />
                  Generate Diet Plan
                </Button>
              )}
              
              {isLoadingDiet && (
                <div className="text-center py-4 mt-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-primary border-r-2 border-b-2 border-transparent mx-auto mb-2"></div>
                  <p className="text-muted-foreground text-sm">Generating your personalized diet plan...</p>
                </div>
              )}
            </div>
          )}

          {dietPlan && !isLoadingDiet && (
            <div className="mt-6 p-4 neo-blur rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-primary">Your Personalized Diet Plan</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setDietPlan(null)}
                  className="text-xs"
                >
                  Reset
                </Button>
              </div>
              <div className="text-foreground prose prose-invert max-w-none">
                {dietPlan.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calories;
