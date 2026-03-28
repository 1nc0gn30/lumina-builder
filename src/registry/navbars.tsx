import React, { useState } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { BlockDefinition } from './types';

export const navbars: BlockDefinition[] = [
  {
    id: 'navbar-simple',
    name: 'Simple Navbar',
    category: 'Navbar',
    defaultProps: {
      logoText: 'Lumina',
      link1: 'Features',
      link2: 'Pricing',
      link3: 'About',
      link4: 'Blog',
      ctaText: 'Get Started',
      bgColor: '#ffffff',
      textColor: '#000000',
      accentColor: '#3b82f6',
      logoFontSize: '24px',
      navHeight: '80px'
    },
    propConfig: [
      { name: 'logoText', label: 'Logo Text', type: 'string' },
      { name: 'link1', label: 'Link 1', type: 'string' },
      { name: 'link2', label: 'Link 2', type: 'string' },
      { name: 'link3', label: 'Link 3', type: 'string' },
      { name: 'link4', label: 'Link 4', type: 'string' },
      { name: 'ctaText', label: 'CTA Text', type: 'string' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' },
      { name: 'accentColor', label: 'Accent Color', type: 'color' },
      { name: 'logoFontSize', label: 'Logo Font Size', type: 'string' },
      { name: 'navHeight', label: 'Navbar Height', type: 'string' }
    ],
    component: (props) => {
      const [isOpen, setIsOpen] = useState(false);
      const links = [props.link1, props.link2, props.link3, props.link4].filter(Boolean);

      return (
        <nav className="relative z-50 w-full border-b border-current/10" style={{ backgroundColor: props.bgColor, color: props.textColor, height: props.navHeight }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full">
            <div className="flex items-center justify-between h-full">
              {/* Logo */}
              <div className="flex-shrink-0 font-bold tracking-tighter" style={{ fontSize: props.logoFontSize }}>
                {props.logoText}
              </div>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center gap-8">
                {links.map((link, i) => (
                  <a key={i} href="#" className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">
                    {link}
                  </a>
                ))}
              </div>

              {/* Desktop CTA */}
              <div className="hidden lg:flex items-center">
                {props.ctaText && (
                  <button 
                    className="px-6 py-2.5 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: props.accentColor }}
                  >
                    {props.ctaText}
                  </button>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden flex items-center">
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 -mr-2 opacity-70 hover:opacity-100 transition-opacity"
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full border-b border-current/10 shadow-xl" style={{ backgroundColor: props.bgColor }}>
              <div className="px-6 py-4 space-y-4 flex flex-col">
                {links.map((link, i) => (
                  <a key={i} href="#" className="text-lg font-medium py-2 flex items-center justify-between opacity-80 hover:opacity-100">
                    {link}
                    <ChevronRight className="h-4 w-4 opacity-50" />
                  </a>
                ))}
                {props.ctaText && (
                  <div className="pt-4 pb-2">
                    <button 
                      className="w-full px-6 py-3 rounded-xl text-base font-medium text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: props.accentColor }}
                    >
                      {props.ctaText}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      );
    },
    code: (props) => `import React, { useState } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';

export default function SimpleNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = ["${props.link1}", "${props.link2}", "${props.link3}", "${props.link4}"].filter(Boolean);

  return (
    <nav className="relative z-50 w-full border-b border-current/10" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}', height: '${props.navHeight}' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex-shrink-0 font-bold tracking-tighter" style={{ fontSize: '${props.logoFontSize}' }}>
            ${props.logoText}
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link, i) => (
              <a key={i} href="#" className="text-sm font-medium opacity-70 hover:opacity-100 transition-opacity">
                {link}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            ${props.ctaText ? `<button 
              className="px-6 py-2.5 rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: '${props.accentColor}' }}
            >
              ${props.ctaText}
            </button>` : ''}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 -mr-2 opacity-70 hover:opacity-100 transition-opacity"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full border-b border-current/10 shadow-xl" style={{ backgroundColor: '${props.bgColor}' }}>
          <div className="px-6 py-4 space-y-4 flex flex-col">
            {links.map((link, i) => (
              <a key={i} href="#" className="text-lg font-medium py-2 flex items-center justify-between opacity-80 hover:opacity-100">
                {link}
                <ChevronRight className="h-4 w-4 opacity-50" />
              </a>
            ))}
            ${props.ctaText ? `<div className="pt-4 pb-2">
              <button 
                className="w-full px-6 py-3 rounded-xl text-base font-medium text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: '${props.accentColor}' }}
              >
                ${props.ctaText}
              </button>
            </div>` : ''}
          </div>
        </div>
      )}
    </nav>
  );
}`
  },
  {
    id: 'navbar-centered',
    name: 'Centered Navbar',
    category: 'Navbar',
    defaultProps: {
      logoText: 'Lumina',
      link1: 'Features',
      link2: 'Pricing',
      link3: 'About',
      bgColor: '#ffffff',
      textColor: '#000000',
      accentColor: '#3b82f6'
    },
    propConfig: [
      { name: 'logoText', label: 'Logo Text', type: 'string' },
      { name: 'link1', label: 'Link 1', type: 'string' },
      { name: 'link2', label: 'Link 2', type: 'string' },
      { name: 'link3', label: 'Link 3', type: 'string' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' },
      { name: 'accentColor', label: 'Accent Color', type: 'color' }
    ],
    component: (props) => (
      <nav className="relative z-50 w-full border-b border-current/10 py-4" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="font-bold text-2xl tracking-tighter">{props.logoText}</div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium opacity-70">
            {[props.link1, props.link2, props.link3].filter(Boolean).map((link, i) => (
              <a key={i} href="#" className="hover:opacity-100">{link}</a>
            ))}
          </div>
          <div className="md:hidden"><Menu className="h-6 w-6" /></div>
          <div className="hidden md:block w-24"></div>
        </div>
      </nav>
    ),
    code: (props) => `import { Menu } from 'lucide-react';

export default function CenteredNavbar() {
  return (
    <nav className="relative z-50 w-full border-b border-current/10 py-4" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="font-bold text-2xl tracking-tighter">${props.logoText}</div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium opacity-70">
          {["${props.link1}", "${props.link2}", "${props.link3}"].filter(Boolean).map((link, i) => (
            <a key={i} href="#" className="hover:opacity-100">{link}</a>
          ))}
        </div>
        <div className="md:hidden"><Menu className="h-6 w-6" /></div>
        <div className="hidden md:block w-24"></div>
      </div>
    </nav>
  );
}`
  },
  {
    id: 'navbar-minimal',
    name: 'Minimal Navbar',
    category: 'Navbar',
    defaultProps: {
      logoText: 'Lumina',
      bgColor: '#ffffff',
      textColor: '#000000'
    },
    propConfig: [
      { name: 'logoText', label: 'Logo Text', type: 'string' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' }
    ],
    component: (props) => (
      <nav className="relative z-50 w-full py-6" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center">
          <div className="font-bold text-xl tracking-tighter">{props.logoText}</div>
        </div>
      </nav>
    ),
    code: (props) => `export default function MinimalNavbar() {
  return (
    <nav className="relative z-50 w-full py-6" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-center">
        <div className="font-bold text-xl tracking-tighter">${props.logoText}</div>
      </div>
    </nav>
  );
}`
  }
];
