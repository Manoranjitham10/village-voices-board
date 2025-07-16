import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Send, User, MessageSquare, MapPin } from "lucide-react";
import { noticeService } from "@/services/noticeService";
import { useToast } from "@/hooks/use-toast";

const Post = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    region: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const regions = noticeService.getRegions().filter(region => region !== "All Regions");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.message || !formData.region) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before posting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      noticeService.addNotice({
        name: formData.name.trim(),
        message: formData.message.trim(),
        region: formData.region
      });

      toast({
        title: "Notice Posted!",
        description: "Your notice has been posted to the bazaar board.",
      });

      // Reset form
      setFormData({ name: "", message: "", region: "" });
      
      // Navigate back to home after a short delay
      setTimeout(() => {
        navigate("/");
      }, 1000);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post notice. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/5">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigate("/")}
            className="shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Post to Bazaar
            </h1>
            <p className="text-muted-foreground">Share your needs, offers, or announcements</p>
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-muted/20">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-2 text-xl">
              <MessageSquare className="h-5 w-5 text-primary" />
              Create Notice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                  <User className="h-4 w-4 text-primary" />
                  Your Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="h-12"
                />
              </div>

              {/* Region Field */}
              <div className="space-y-2">
                <Label htmlFor="region" className="flex items-center gap-2 text-sm font-medium">
                  <MapPin className="h-4 w-4 text-primary" />
                  Region
                </Label>
                <Select 
                  value={formData.region} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, region: value }))}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <Label htmlFor="message" className="flex items-center gap-2 text-sm font-medium">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Describe your need, offer, or announcement. Be specific about what you're looking for or offering..."
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="min-h-32 resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  {formData.message.length}/500 characters
                </p>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent mr-2" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Post to Bazaar
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Tips */}
        <div className="mt-8 p-4 bg-accent/10 rounded-lg border border-accent/20">
          <h3 className="font-semibold text-accent-foreground mb-2">💡 Tips for better notices:</h3>
          <ul className="text-sm text-accent-foreground/80 space-y-1">
            <li>• Be specific about quantities, timelines, and requirements</li>
            <li>• Include contact preferences in your message</li>
            <li>• Mention if you're flexible on pricing or terms</li>
            <li>• Use clear, simple language that everyone can understand</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Post;