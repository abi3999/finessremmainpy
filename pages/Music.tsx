
import { useState } from "react";
import { Music2, Play, Pause, ExternalLink, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Music = () => {
  const [activePlaylist, setActivePlaylist] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const playlists = [
    { 
      title: "High Energy Cardio", 
      duration: "45 min",
      spotifyId: "37i9dQZF1DX76Wlfdnj7AP",
      description: "Energetic beats to power through your cardio sessions"
    },
    { 
      title: "Power Lifting", 
      duration: "60 min",
      spotifyId: "37i9dQZF1DWUVpAXiEPK8P",
      description: "Heavy beats for heavy lifts and maximum gains"
    },
    { 
      title: "Zen Yoga Flow", 
      duration: "30 min",
      spotifyId: "37i9dQZF1DX9uKNf5jGX6m",
      description: "Calm, meditative tracks for yoga and mindfulness"
    },
    { 
      title: "HIIT Workout", 
      duration: "25 min",
      spotifyId: "37i9dQZF1DWSJHnPb1f0X3",
      description: "Interval-friendly tracks with varying tempos"
    },
  ];

  const handlePlayClick = (index: number) => {
    if (activePlaylist === index) {
      setIsPlaying(!isPlaying);
    } else {
      setActivePlaylist(index);
      setIsPlaying(true);
    }
  };

  const openSpotify = (spotifyId: string) => {
    window.open(`https://open.spotify.com/playlist/${spotifyId}`, '_blank');
  };

  return (
    <div className="container px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-primary mb-4">Workout Music</h1>
      <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-center">
        Power your workouts with curated Spotify playlists designed for different exercise types
      </p>
      
      <Tabs defaultValue="playlists" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="playlists">Curated Playlists</TabsTrigger>
          <TabsTrigger value="webapp">Spotify Web App</TabsTrigger>
        </TabsList>
        
        <TabsContent value="playlists">
          <div className="grid gap-4 max-w-xl mx-auto">
            {playlists.map((playlist, index) => (
              <div
                key={index}
                className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg transition-all duration-300 ${
                  activePlaylist === index ? "border-2 border-primary scale-[1.02]" : "border border-white/5"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                      activePlaylist === index ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                    }`}
                  >
                    <Music2 className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{playlist.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center">
                      {playlist.duration}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{playlist.description}</p>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className={`rounded-full ${
                        activePlaylist === index && isPlaying ? "bg-primary text-primary-foreground" : ""
                      }`}
                      onClick={() => handlePlayClick(index)}
                    >
                      {activePlaylist === index && isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      onClick={() => openSpotify(playlist.spotifyId)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {activePlaylist === index && (
                  <div className="mt-4">
                    <iframe
                      src={`https://open.spotify.com/embed/playlist/${playlist.spotifyId}?utm_source=generator&theme=0`}
                      width="100%"
                      height="152"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="rounded-lg"
                    ></iframe>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 max-w-xl mx-auto">
            <Button 
              className="w-full bg-[#1DB954] hover:bg-[#1DB954]/90 text-white" 
              onClick={() => window.open('https://open.spotify.com/genre/workout-page', '_blank')}
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Discover More Workout Playlists
            </Button>
            
            <p className="text-xs text-muted-foreground text-center mt-4">
              Playlists powered by Spotify. All music rights belong to their respective owners.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="webapp" className="w-full mx-auto">
          <div className="glass-morphism rounded-xl p-4 mb-4">
            <p className="text-sm text-muted-foreground mb-4">
              Use the full Spotify web app below to access all your favorite workout music. You may need to log in to your Spotify account.
            </p>
            
            <div className="h-[600px] w-full rounded-lg overflow-hidden border border-white/10 relative">
              <iframe 
                src="https://open.spotify.com/embed?uri=spotify:playlist:37i9dQZF1DX76Wlfdnj7AP"
                style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}}
                frameBorder="0" 
                allowTransparency={true}
                allow="encrypted-media; autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              ></iframe>
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={() => window.open('https://open.spotify.com', '_blank')}
                className="bg-[#1DB954] hover:bg-[#1DB954]/90 text-white"
              >
                Open Full Spotify Web Player
              </Button>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-muted-foreground text-center">
            <p>Spotify content is provided directly by Spotify. All rights reserved to Spotify AB.</p>
            <p className="mt-1">Some features of Spotify may require a premium account.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Music;
