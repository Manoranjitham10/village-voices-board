export interface Notice {
  id: string;
  name: string;
  message: string;
  region: string;
  createdAt: Date;
}

export type Region = 
  | "All Regions"
  | "Tamil Nadu"
  | "Karnataka" 
  | "Kerala"
  | "Andhra Pradesh"
  | "Telangana"
  | "Maharashtra";