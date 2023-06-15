import type { FeatureKey } from '@unrevealed/react';

declare module '@unrevealed/react' {
  interface Features {
    'unrevealed-event': boolean;
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
  'unrevealed-event': {
    name: "Unrevealed Demo",
    description: "This is for demo purpose, don't enable it in production",
  },
};

export const featureKeys: FeatureKey[] = [
  'unrevealed-event',
];
