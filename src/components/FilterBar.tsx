import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";
import { Region } from "@/types/notice";

interface FilterBarProps {
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  regions: Region[];
}

export const FilterBar = ({ selectedRegion, onRegionChange, regions }: FilterBarProps) => {
  return (
    <div className="flex items-center gap-3 mb-6 p-4 bg-card rounded-lg shadow-sm border">
      <MapPin className="h-5 w-5 text-primary" />
      <span className="text-sm font-medium text-foreground">Filter by region:</span>
      <Select value={selectedRegion} onValueChange={onRegionChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select region" />
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
  );
};