
import { useState } from "react";
import { Search, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Remedies = () => {
  const [symptoms, setSymptoms] = useState("");
  const [remedies, setRemedies] = useState<string[]>([]);
  const [aiRemedies, setAiRemedies] = useState<string | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const { toast } = useToast();

  // Simple mapping of symptoms to remedies (in a real app, this would come from a database)
  const remedyDatabase = {
    headache: [
      "Drink plenty of water",
      "Apply a cold or warm compress",
      "Rest in a quiet, dark room",
      "Try ginger tea"
    ],
    stomachache: [
      "Drink peppermint tea",
      "Try ginger ale or ginger tea",
      "Use a heating pad",
      "Practice deep breathing"
    ],
    fever: [
      "Stay hydrated",
      "Rest well",
      "Take a lukewarm bath",
      "Try honey and lemon tea"
    ],
    cold: [
      "Drink hot chicken soup",
      "Try honey and warm lemon water",
      "Get plenty of rest",
      "Use steam inhalation with eucalyptus"
    ],
    cough: [
      "Try honey and warm water",
      "Ginger tea with honey",
      "Steam inhalation",
      "Salt water gargle"
    ],
    sunburn: [
      "Apply aloe vera gel",
      "Take a cool bath with oatmeal",
      "Drink plenty of water",
      "Apply cold compresses",
      "Stay out of the sun until healed"
    ],
    "skin burn": [
      "Cool the burn with cool running water for 10-15 minutes",
      "Apply aloe vera gel",
      "Avoid breaking blisters",
      "Cover with a sterile bandage",
      "Take over-the-counter pain relievers if needed"
    ]
  };

  const handleSearch = () => {
    if (!symptoms.trim()) {
      toast({
        title: "Please enter your symptoms",
        variant: "destructive",
      });
      return;
    }

    // Convert input to lowercase and search for matching remedies
    const searchTerm = symptoms.toLowerCase();
    let foundRemedies: string[] = [];

    // Search through our database for matching symptoms
    for (const [key, values] of Object.entries(remedyDatabase)) {
      if (searchTerm.includes(key)) {
        foundRemedies = [...foundRemedies, ...values];
      }
    }

    if (foundRemedies.length > 0) {
      setRemedies(foundRemedies);
    } else {
      toast({
        title: "No specific remedies found",
        description: "Please try describing your symptoms differently or consult a healthcare professional.",
        variant: "destructive",
      });
    }
  };

  const handleAISearch = async () => {
    if (!symptoms.trim()) {
      toast({
        title: "Please enter your symptoms",
        variant: "destructive",
      });
      return;
    }

    setIsLoadingAI(true);
    
    try {
      // Fallback to demo mode if API not available
      // In a production environment, this would be replaced with the actual API call
      console.log("Simulating AI response for:", symptoms);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a simple fallback response based on the symptom
      let fallbackResponse = "";
      
      if (symptoms.toLowerCase().includes("headache")) {
        fallbackResponse = `# Natural Remedies for Headache\n\n1. **Stay Hydrated**: Dehydration is a common cause of headaches. Drink at least 8 glasses of water daily.\n\n2. **Cold Compress**: Apply a cold pack to your forehead and temples for 15 minutes at a time to reduce inflammation and constrict blood vessels.\n\n3. **Peppermint Oil**: Apply diluted peppermint oil to your temples. The menthol in peppermint oil increases blood flow and provides a cooling sensation.\n\n4. **Lavender Essential Oil**: Inhale lavender essential oil or apply diluted oil to the temples. Studies suggest it can effectively manage migraine pain.\n\n5. **Magnesium-Rich Foods**: Include spinach, pumpkin seeds, and whole grains in your diet as magnesium deficiency is linked to headaches.\n\n*Caution: If headaches are severe, persistent, or accompanied by other symptoms like fever, vision changes, or neck stiffness, seek medical attention immediately.*`;
      } else if (symptoms.toLowerCase().includes("cold") || symptoms.toLowerCase().includes("flu")) {
        fallbackResponse = `# Natural Remedies for Cold/Flu\n\n1. **Honey and Lemon Tea**: Mix honey with warm lemon water to soothe a sore throat and reduce coughing. The vitamin C in lemon may help strengthen your immune system.\n\n2. **Steam Inhalation**: Breathe in steam from a bowl of hot water with a few drops of eucalyptus or peppermint oil to relieve congestion.\n\n3. **Garlic**: Add fresh garlic to your meals or take a supplement. Garlic has antimicrobial and antiviral properties.\n\n4. **Chicken Soup**: Studies show chicken soup can reduce inflammation and relieve cold symptoms.\n\n5. **Rest and Hydration**: Ensure you get plenty of rest and stay well-hydrated to help your body fight the infection.\n\n*Caution: If symptoms persist beyond 10 days, or include high fever, difficulty breathing, or chest pain, consult a healthcare professional.*`;
      } else if (symptoms.toLowerCase().includes("sunburn") || symptoms.toLowerCase().includes("burn")) {
        fallbackResponse = `# Natural Remedies for Sunburn\n\n1. **Aloe Vera Gel**: Apply pure aloe vera gel directly from the plant or a high-quality commercially prepared gel to soothe burned skin.\n\n2. **Cool Bath**: Soak in a cool bath with a cup of oatmeal or baking soda to reduce inflammation and itching.\n\n3. **Cold Compress**: Apply cold, wet compresses to the burned areas for 10-15 minutes several times a day.\n\n4. **Stay Hydrated**: Drink plenty of water to prevent dehydration and help your skin heal.\n\n5. **Cucumber Slices**: Place thin cucumber slices directly on the burned areas for a cooling effect.\n\n*Caution: For severe burns with blisters, seek medical attention. Avoid the sun until the burn heals, and always use sun protection in the future.*`;
      } else if (symptoms.toLowerCase().includes("stomachache") || symptoms.toLowerCase().includes("stomach pain")) {
        fallbackResponse = `# Natural Remedies for Stomach Pain\n\n1. **Ginger Tea**: Steep fresh ginger slices in hot water for 10 minutes and sip slowly. Ginger has anti-inflammatory properties and can reduce nausea.\n\n2. **Peppermint Tea**: Drink peppermint tea to relieve gas, bloating, and intestinal spasms.\n\n3. **Warm Compress**: Apply a warm compress or heating pad to your abdomen to relieve cramping.\n\n4. **Apple Cider Vinegar**: Mix a tablespoon of apple cider vinegar with water and a little honey to aid digestion.\n\n5. **BRAT Diet**: If experiencing diarrhea, stick to Bananas, Rice, Applesauce, and Toast until symptoms improve.\n\n*Caution: If pain is severe, persistent, or accompanied by fever, vomiting blood, or difficulty breathing, seek medical attention immediately.*`;
      } else {
        fallbackResponse = `# Natural Remedies for ${symptoms}\n\n1. **Rest and Recovery**: Ensure you get adequate rest to allow your body to heal naturally.\n\n2. **Stay Hydrated**: Drink plenty of water and herbal teas to support your body's natural healing processes.\n\n3. **Anti-inflammatory Foods**: Incorporate turmeric, ginger, and omega-3 rich foods like fatty fish and flaxseeds to reduce inflammation.\n\n4. **Herbal Support**: Consider gentle herbs like chamomile, lemon balm, or peppermint to support relaxation and healing.\n\n5. **Warm/Cold Compress**: Apply warm or cold compresses depending on the condition – generally, cold for inflammation and warm for muscle tension.\n\n*Caution: These are general suggestions. If symptoms are severe, persistent, or concerning, please consult a healthcare professional for proper diagnosis and treatment.*`;
      }
      
      setAiRemedies(fallbackResponse);
    } catch (error) {
      console.error('Error in AI remedies:', error);
      toast({
        title: "AI Search Failed",
        description: "There was an error getting AI recommendations. Using local database instead.",
        variant: "destructive",
      });
      // Fallback to basic search if AI fails
      handleSearch();
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-primary mb-8">Home Remedies</h1>
      
      <div className="max-w-xl mx-auto">
        <div className="relative mb-8">
          <Input
            type="text"
            placeholder="Describe your symptoms... (e.g., headache, fever, cold)"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full p-4 bg-background/50 backdrop-blur-lg rounded-xl border-white/10"
          />
          <Button
            className="absolute right-2 top-1/2 -translate-y-1/2"
            variant="ghost"
            onClick={handleSearch}
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>

        <Tabs defaultValue="basic" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Search</TabsTrigger>
            <TabsTrigger value="ai">AI Powered</TabsTrigger>
          </TabsList>
          <TabsContent value="basic" className="mt-4">
            <div className="glass-morphism rounded-xl p-6">
              {remedies.length > 0 ? (
                <div className="space-y-4">
                  <h2 className="font-semibold text-lg text-primary mb-4">Suggested Remedies:</h2>
                  <ul className="space-y-2">
                    {remedies.map((remedy, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-foreground"
                      >
                        <span className="text-primary">•</span>
                        {remedy}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-muted-foreground text-center">
                  Enter your symptoms above to get natural remedy suggestions
                </p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="ai" className="mt-4">
            <div className="glass-morphism rounded-xl p-6">
              {!aiRemedies && !isLoadingAI && (
                <div className="text-center space-y-4">
                  <Bot className="w-12 h-12 text-primary mx-auto" />
                  <p className="text-muted-foreground">
                    Get AI-powered remedy suggestions based on your symptoms
                  </p>
                  <Button 
                    onClick={handleAISearch} 
                    className="bg-primary hover:bg-primary/90 mt-2"
                  >
                    <Bot className="w-4 h-4 mr-2" /> 
                    Get AI Recommendations
                  </Button>
                </div>
              )}
              
              {isLoadingAI && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary border-r-2 border-b-2 border-transparent mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Consulting our AI...</p>
                </div>
              )}
              
              {aiRemedies && !isLoadingAI && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-lg text-primary">AI Recommended Remedies:</h2>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setAiRemedies(null)}
                      className="text-xs"
                    >
                      Reset
                    </Button>
                  </div>
                  <div className="text-foreground prose prose-invert max-w-none">
                    {aiRemedies.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="glass-morphism rounded-xl p-6 mt-6">
          <h3 className="font-semibold text-lg text-primary mb-3">Important Note</h3>
          <p className="text-muted-foreground text-sm">
            These remedies are meant for minor ailments only. For serious symptoms, persistent pain, 
            or worsening conditions, please consult a healthcare professional immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Remedies;
