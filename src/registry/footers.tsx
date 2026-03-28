import React from 'react';
import { Twitter, Github, Linkedin } from 'lucide-react';
import { BlockDefinition } from './types';

export const footers: BlockDefinition[] = [
  {
    id: 'footer-minimal',
    name: 'Minimal Footer',
    category: 'Footer',
    defaultProps: {
      brandName: 'Lumina',
      copyright: '© 2026 Lumina Inc. All rights reserved.',
      bgColor: '#ffffff',
      textColor: '#000000'
    },
    propConfig: [
      { name: 'brandName', label: 'Brand Name', type: 'string' },
      { name: 'copyright', label: 'Copyright Text', type: 'string' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' }
    ],
    component: (props) => (
      <footer className="py-12 border-t border-current/10" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="h-6 w-6 bg-current rounded-sm"></div>
            <span className="font-semibold">{props.brandName}</span>
          </div>
          <p className="text-sm opacity-60">{props.copyright}</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Twitter className="h-5 w-5 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
            <Github className="h-5 w-5 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
            <Linkedin className="h-5 w-5 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
          </div>
        </div>
      </footer>
    ),
    code: (props) => `import { Twitter, Github, Linkedin } from 'lucide-react';

export default function MinimalFooter() {
  return (
    <footer className="py-12 border-t border-current/10" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <div className="h-6 w-6 bg-current rounded-sm"></div>
          <span className="font-semibold">${props.brandName}</span>
        </div>
        <p className="text-sm opacity-60">${props.copyright}</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Twitter className="h-5 w-5 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
          <Github className="h-5 w-5 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
          <Linkedin className="h-5 w-5 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
        </div>
      </div>
    </footer>
  );
}`
  }
];
