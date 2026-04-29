export interface Recipe {
    id: number;
    title: string;
    image: string;
    readyInMinutes: number;
    instructions?: string; // Valmistamisjuhend tekstina
    analyzedInstructions?: {
      steps: { number: number; step: string }[];
    }[];
    nutrition?: {
      nutrients: {
        name: string;
        amount: number;
        unit: string;
      }[];
    };
  }