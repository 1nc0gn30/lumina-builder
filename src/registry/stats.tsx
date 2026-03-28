import React from 'react';
import { BarChart, Users, MessageCircle } from 'lucide-react';
import { BlockDefinition } from './types';

export const stats: BlockDefinition[] = [
  {
    id: 'stats-dark',
    name: 'Dark Stats',
    category: 'Stats',
    defaultProps: {
      title: 'Trusted by innovative teams worldwide',
      bgColor: '#0a0a0a',
      textColor: '#ffffff',
      accentColor: '#3b82f6',
      stat1Value: '99.99%',
      stat1Label: 'Uptime SLA',
      stat2Value: '50M+',
      stat2Label: 'API Requests/day',
      stat3Value: '10k+',
      stat3Label: 'Active Users'
    },
    propConfig: [
      { name: 'title', label: 'Title', type: 'string' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' },
      { name: 'accentColor', label: 'Accent Color', type: 'color' },
      { name: 'stat1Value', label: 'Stat 1 Value', type: 'string' },
      { name: 'stat1Label', label: 'Stat 1 Label', type: 'string' },
      { name: 'stat2Value', label: 'Stat 2 Value', type: 'string' },
      { name: 'stat2Label', label: 'Stat 2 Label', type: 'string' },
      { name: 'stat3Value', label: 'Stat 3 Value', type: 'string' },
      { name: 'stat3Label', label: 'Stat 3 Label', type: 'string' }
    ],
    component: (props) => (
      <section className="py-24" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-medium tracking-tight">{props.title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-current/10">
            <div className="flex flex-col items-center py-8 md:py-0">
              <div className="h-12 w-12 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: `${props.accentColor}20`, color: props.accentColor }}>
                <BarChart className="h-6 w-6" />
              </div>
              <div className="text-5xl font-bold tracking-tight mb-2">{props.stat1Value}</div>
              <div className="opacity-60 font-medium">{props.stat1Label}</div>
            </div>
            <div className="flex flex-col items-center py-8 md:py-0">
              <div className="h-12 w-12 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: `${props.accentColor}20`, color: props.accentColor }}>
                <MessageCircle className="h-6 w-6" />
              </div>
              <div className="text-5xl font-bold tracking-tight mb-2">{props.stat2Value}</div>
              <div className="opacity-60 font-medium">{props.stat2Label}</div>
            </div>
            <div className="flex flex-col items-center py-8 md:py-0">
              <div className="h-12 w-12 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: `${props.accentColor}20`, color: props.accentColor }}>
                <Users className="h-6 w-6" />
              </div>
              <div className="text-5xl font-bold tracking-tight mb-2">{props.stat3Value}</div>
              <div className="opacity-60 font-medium">{props.stat3Label}</div>
            </div>
          </div>
        </div>
      </section>
    ),
    code: (props) => `import { BarChart, Users, MessageCircle } from 'lucide-react';

export default function DarkStats() {
  return (
    <section className="py-24" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-medium tracking-tight">${props.title}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-current/10">
          <div className="flex flex-col items-center py-8 md:py-0">
            <div className="h-12 w-12 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '${props.accentColor}20', color: '${props.accentColor}' }}>
              <BarChart className="h-6 w-6" />
            </div>
            <div className="text-5xl font-bold tracking-tight mb-2">${props.stat1Value}</div>
            <div className="opacity-60 font-medium">${props.stat1Label}</div>
          </div>
          <div className="flex flex-col items-center py-8 md:py-0">
            <div className="h-12 w-12 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '${props.accentColor}20', color: '${props.accentColor}' }}>
              <MessageCircle className="h-6 w-6" />
            </div>
            <div className="text-5xl font-bold tracking-tight mb-2">${props.stat2Value}</div>
            <div className="opacity-60 font-medium">${props.stat2Label}</div>
          </div>
          <div className="flex flex-col items-center py-8 md:py-0">
            <div className="h-12 w-12 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '${props.accentColor}20', color: '${props.accentColor}' }}>
              <Users className="h-6 w-6" />
            </div>
            <div className="text-5xl font-bold tracking-tight mb-2">${props.stat3Value}</div>
            <div className="opacity-60 font-medium">${props.stat3Label}</div>
          </div>
        </div>
      </div>
    </section>
  );
}`
  }
];
