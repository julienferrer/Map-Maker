
export enum StyleCategory {
  CARTOGRAPHIC = 'Cartographic',
  GAMING = 'Gaming',
  ARTISTIC = 'Artistic',
  FUTURISTIC = 'Futuristic',
  TECHNICAL = 'Technical',
  CULTURAL = 'Cultural',
  PLAYFUL = 'Playful',
  NARRATIVE = 'Narrative'
}

export interface MapStyle {
  id: string;
  name: string;
  category: StyleCategory;
  description: string;
  promptAddon: string;
  icon: string;
}

export interface GeneratedMap {
  imageUrl: string;
  cityName: string;
  style: MapStyle;
  timestamp: number;
  groundingChunks?: any[];
}