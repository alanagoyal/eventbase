import type { FeatureKey } from '@unrevealed/react';

declare module '@unrevealed/react' {
  interface Features {
  
  }

  interface UserTraits {
    email: string | null;
    full_name: string | null;
    company_name: string | null;
    dietary_restrictions: string | null;
  }

  interface TeamTraits {
  
  }
}

export interface Feature {
  name: string;
  description: string;
}

export const features: Record<FeatureKey, Feature> = {

};

export const featureKeys: FeatureKey[] = [

];
