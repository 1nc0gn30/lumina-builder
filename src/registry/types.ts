import React from 'react';

export type ComponentCategory = 'Hero' | 'Features' | 'Pricing' | 'Footer' | 'CTA' | 'FAQ' | 'Team' | 'Stats' | 'Newsletter' | 'Logos' | 'Testimonials' | 'Navbar' | 'AI Features' | 'Payments';

export type PropType = 'string' | 'text' | 'color' | 'number' | 'boolean' | 'image' | 'array' | 'select' | 'password';

export interface PropConfig {
  name: string;
  label: string;
  type: PropType;
  subFields?: PropConfig[]; // For array types
  options?: { label: string; value: string }[]; // For select types
}

export interface BlockDefinition {
  id: string;
  name: string;
  category: ComponentCategory;
  component: React.FC<any>;
  code: (props: any) => string;
  defaultProps: Record<string, any>;
  propConfig: PropConfig[];
}
