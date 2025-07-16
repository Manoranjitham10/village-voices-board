import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Megaphone, Users, TrendingUp } from "lucide-react";
import { NoticeCard } from "@/components/NoticeCard";
import { FilterBar } from "@/components/FilterBar";
import { noticeService } from "@/services/noticeService";
import { Notice } from "@/types/notice";

const Index = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [isLoading, setIsLoading] = useState(true);

  const regions = noticeService.getRegions();

  useEffect(() => {
    // Simulate loading delay for better UX
    const loadNotices = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      const filteredNotices = noticeService.getAllNotices(selectedRegion);
      setNotices(filteredNotices);
      setIsLoading(false);
    };

    loadNotices();
  }, [selectedRegion]);

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Megaphone className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Bazaar Noticeboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with fellow artisans • Share needs & offers • Build community
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-lg p-4 border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{notices.length}</p>
                <p className="text-sm text-muted-foreground">Active Notices</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg p-4 border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{regions.length - 1}</p>
                <p className="text-sm text-muted-foreground">Regions Active</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg p-4 border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Megaphone className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">24/7</p>
                <p className="text-sm text-muted-foreground">Always Open</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          <FilterBar
            selectedRegion={selectedRegion}
            onRegionChange={handleRegionChange}
            regions={regions}
          />
          <Link to="/post">
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Post Notice
            </Button>
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card rounded-lg p-6 border animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 rounded-full bg-muted" />
                  <div className="h-4 w-24 bg-muted rounded" />
                  <div className="h-6 w-16 bg-muted rounded ml-auto" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-3/4 bg-muted rounded" />
                  <div className="h-4 w-1/2 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Notices Grid */}
        {!isLoading && (
          <>
            {notices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notices.map((notice) => (
                  <NoticeCard key={notice.id} notice={notice} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="h-24 w-24 rounded-full bg-muted/30 flex items-center justify-center mx-auto mb-4">
                  <Megaphone className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No notices found
                </h3>
                <p className="text-muted-foreground mb-6">
                  {selectedRegion === "All Regions" 
                    ? "Be the first to post a notice to the bazaar!"
                    : `No notices found for ${selectedRegion}. Try selecting a different region.`
                  }
                </p>
                <Link to="/post">
                  <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Post the First Notice
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            Built with ❤️ for rural artisans • Connecting communities through craft
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
