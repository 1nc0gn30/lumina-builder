import React from 'react';
import { ArrowRight, Play, ChevronRight } from 'lucide-react';
import { BlockDefinition } from './types';

export const heroes: BlockDefinition[] = [
  {
    id: 'hero-split',
    name: 'Split Hero',
    category: 'Hero',
    defaultProps: {
      title: 'Design that speaks for itself.',
      subtitle: 'Create stunning, high-performance websites with our intuitive builder. No coding required.',
      ctaPrimary: 'Get Started',
      ctaSecondary: 'View Showcase',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
      bgColor: '#000000',
      textColor: '#ffffff',
      accentColor: '#FF6321'
    },
    propConfig: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'ctaPrimary', label: 'Primary CTA', type: 'string' },
      { name: 'ctaSecondary', label: 'Secondary CTA', type: 'string' },
      { name: 'image', label: 'Image URL', type: 'image' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' },
      { name: 'accentColor', label: 'Accent Color', type: 'color' }
    ],
    component: (props) => (
      <section className="relative min-h-[80vh] flex items-center" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
        <div className="absolute inset-0 w-full h-full lg:w-1/2">
          <img src={props.image} alt="Hero background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:hidden" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 flex justify-end">
          <div className="w-full lg:w-1/2 lg:pl-16 py-20 lg:py-32">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              {props.title}
            </h1>
            <p className="text-lg lg:text-xl opacity-80 mb-10 max-w-lg leading-relaxed">
              {props.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {props.ctaPrimary && (
                <button 
                  className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold transition-transform hover:scale-105"
                  style={{ backgroundColor: props.accentColor, color: '#fff' }}
                >
                  {props.ctaPrimary}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </button>
              )}
              {props.ctaSecondary && (
                <button 
                  className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold border transition-colors hover:bg-white/10"
                  style={{ borderColor: 'currentColor' }}
                >
                  {props.ctaSecondary}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    ),
    code: (props) => `import { ChevronRight } from 'lucide-react';

export default function SplitHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <div className="absolute inset-0 w-full h-full lg:w-1/2">
        <img src="${props.image}" alt="Hero background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:hidden" />
      </div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 flex justify-end">
        <div className="w-full lg:w-1/2 lg:pl-16 py-20 lg:py-32">
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            ${props.title}
          </h1>
          <p className="text-lg lg:text-xl opacity-80 mb-10 max-w-lg leading-relaxed">
            ${props.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            ${props.ctaPrimary ? `<button 
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold transition-transform hover:scale-105"
              style={{ backgroundColor: '${props.accentColor}', color: '#fff' }}
            >
              ${props.ctaPrimary}
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>` : ''}
            ${props.ctaSecondary ? `<button 
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold border transition-colors hover:bg-white/10"
              style={{ borderColor: 'currentColor' }}
            >
              ${props.ctaSecondary}
            </button>` : ''}
          </div>
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'hero-saas',
    name: 'SaaS Hero',
    category: 'Hero',
    defaultProps: {
      badgeText: 'v2.0 is now live',
      title: 'Build faster.\nScale further.',
      subtitle: 'The ultimate platform for modern teams to collaborate, design, and ship products at lightning speed.',
      cta1: 'Start building free',
      cta2: 'Book a demo',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
      bgColor: '#f5f5f4',
      textColor: '#0a0a0a',
      accentColor: '#2563eb',
      badgeColor: '#2563eb'
    },
    propConfig: [
      { name: 'badgeText', label: 'Badge Text', type: 'string' },
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'cta1', label: 'Primary CTA', type: 'string' },
      { name: 'cta2', label: 'Secondary CTA', type: 'string' },
      { name: 'image', label: 'Image URL', type: 'image' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' },
      { name: 'accentColor', label: 'Accent Color', type: 'color' },
      { name: 'badgeColor', label: 'Badge Color', type: 'color' }
    ],
    component: (props) => (
      <section className="relative overflow-hidden py-24 lg:py-32" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full blur-[120px] opacity-20" style={{ backgroundColor: props.accentColor }}></div>
          <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-20" style={{ backgroundColor: props.badgeColor }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl">
              {props.badgeText && (
                <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-8 shadow-sm backdrop-blur-sm transition-all hover:scale-105" style={{ borderColor: `${props.badgeColor}40`, backgroundColor: `${props.badgeColor}10`, color: props.badgeColor }}>
                  <span className="flex h-2 w-2 rounded-full mr-2 animate-pulse" style={{ backgroundColor: props.badgeColor }}></span>
                  {props.badgeText}
                </div>
              )}
              <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.95] mb-8 whitespace-pre-line">
                {props.title}
              </h1>
              <p className="text-lg lg:text-xl opacity-70 mb-10 max-w-lg leading-relaxed">
                {props.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {props.cta1 && (
                  <button className="inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-xl" style={{ backgroundColor: props.accentColor, color: '#ffffff' }}>
                    {props.cta1}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                )}
                {props.cta2 && (
                  <button className="inline-flex items-center justify-center rounded-full border px-8 py-4 text-sm font-semibold transition-all hover:bg-black/5 dark:hover:bg-white/5" style={{ borderColor: 'currentColor' }}>
                    {props.cta2}
                  </button>
                )}
              </div>
            </div>
            <div className="relative lg:ml-auto w-full max-w-lg lg:max-w-none">
              <div className="aspect-[4/3] rounded-3xl border bg-white/50 dark:bg-black/50 p-2 shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-all duration-700 backdrop-blur-sm" style={{ borderColor: `${props.accentColor}30` }}>
                <div className="absolute inset-0 bg-gradient-to-tr opacity-20 rounded-3xl -z-10" style={{ backgroundImage: `linear-gradient(to top right, ${props.accentColor}, ${props.badgeColor})` }}></div>
                <img src={props.image} alt="App interface" className="rounded-2xl w-full h-full object-cover shadow-inner" />
              </div>
            </div>
          </div>
        </div>
      </section>
    ),
    code: (props) => `import { ArrowRight } from 'lucide-react';

export default function SaasHero() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full blur-[120px] opacity-20" style={{ backgroundColor: '${props.accentColor}' }}></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-20" style={{ backgroundColor: '${props.badgeColor}' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            ${props.badgeText ? `<div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-8 shadow-sm backdrop-blur-sm transition-all hover:scale-105" style={{ borderColor: '${props.badgeColor}40', backgroundColor: '${props.badgeColor}10', color: '${props.badgeColor}' }}>
              <span className="flex h-2 w-2 rounded-full mr-2 animate-pulse" style={{ backgroundColor: '${props.badgeColor}' }}></span>
              ${props.badgeText}
            </div>` : ''}
            <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.95] mb-8 whitespace-pre-line">
              {\`${props.title}\`}
            </h1>
            <p className="text-lg lg:text-xl opacity-70 mb-10 max-w-lg leading-relaxed">
              ${props.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              ${props.cta1 ? `<button className="inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-xl" style={{ backgroundColor: '${props.accentColor}', color: '#ffffff' }}>
                ${props.cta1}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>` : ''}
              ${props.cta2 ? `<button className="inline-flex items-center justify-center rounded-full border px-8 py-4 text-sm font-semibold transition-all hover:bg-black/5 dark:hover:bg-white/5" style={{ borderColor: 'currentColor' }}>
                ${props.cta2}
              </button>` : ''}
            </div>
          </div>
          <div className="relative lg:ml-auto w-full max-w-lg lg:max-w-none">
            <div className="aspect-[4/3] rounded-3xl border bg-white/50 dark:bg-black/50 p-2 shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-all duration-700 backdrop-blur-sm" style={{ borderColor: '${props.accentColor}30' }}>
              <div className="absolute inset-0 bg-gradient-to-tr opacity-20 rounded-3xl -z-10" style={{ backgroundImage: \`linear-gradient(to top right, ${props.accentColor}, ${props.badgeColor})\` }}></div>
              <img src="${props.image}" alt="App interface" className="rounded-2xl w-full h-full object-cover shadow-inner" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'hero-dark-luxury',
    name: 'Dark Luxury Hero',
    category: 'Hero',
    defaultProps: {
      badge: 'Exclusive Access',
      title: 'Redefining the standard of excellence.',
      cta: 'Request Invitation',
      bgColor: '#000000',
      textColor: '#ffffff'
    },
    propConfig: [
      { name: 'badge', label: 'Badge', type: 'string' },
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'cta', label: 'CTA Text', type: 'string' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' }
    ],
    component: (props) => (
      <section className="py-32 lg:py-48 flex flex-col items-center justify-center text-center px-6 relative overflow-hidden" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#3a1510_0%,transparent_60%)] opacity-50 blur-3xl"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          {props.badge && <p className="text-[11px] uppercase tracking-[0.2em] font-medium opacity-60 mb-8">{props.badge}</p>}
          <h1 className="text-5xl lg:text-8xl font-light tracking-tight leading-[0.9] mb-10 font-serif">
            {props.title}
          </h1>
          {props.cta && (
            <button className="rounded-full border border-current/30 px-10 py-4 text-sm font-medium hover:bg-current hover:text-black transition-all duration-300">
              {props.cta}
            </button>
          )}
        </div>
      </section>
    ),
    code: (props) => `export default function DarkLuxuryHero() {
  return (
    <section className="py-32 lg:py-48 flex flex-col items-center justify-center text-center px-6 relative overflow-hidden" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#3a1510_0%,transparent_60%)] opacity-50 blur-3xl"></div>
      <div className="relative z-10 max-w-4xl mx-auto">
        ${props.badge ? `<p className="text-[11px] uppercase tracking-[0.2em] font-medium opacity-60 mb-8">${props.badge}</p>` : ''}
        <h1 className="text-5xl lg:text-8xl font-light tracking-tight leading-[0.9] mb-10 font-serif">
          ${props.title}
        </h1>
        ${props.cta ? `<button className="rounded-full border border-current/30 px-10 py-4 text-sm font-medium hover:bg-current hover:text-black transition-all duration-300">
          ${props.cta}
        </button>` : ''}
      </div>
    </section>
  );
}`
  },
  {
    id: 'hero-minimal',
    name: 'Minimal Hero',
    category: 'Hero',
    defaultProps: {
      title: 'Less is more.',
      subtitle: 'A minimal approach to design that focuses on what truly matters. No distractions, just pure functionality.',
      cta: 'Explore',
      bgColor: '#ffffff',
      textColor: '#111111'
    },
    propConfig: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'cta', label: 'CTA Text', type: 'string' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' }
    ],
    component: (props) => (
      <section className="py-32 lg:py-40 px-6 flex flex-col items-center justify-center text-center" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 max-w-3xl">{props.title}</h1>
        <p className="text-xl opacity-60 max-w-2xl mb-10">{props.subtitle}</p>
        {props.cta && (
          <button className="px-8 py-3 rounded-full bg-current text-white font-medium hover:opacity-90 transition-opacity" style={{ color: props.bgColor }}>
            {props.cta}
          </button>
        )}
      </section>
    ),
    code: (props) => `export default function MinimalHero() {
  return (
    <section className="py-32 lg:py-40 px-6 flex flex-col items-center justify-center text-center" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 max-w-3xl">${props.title}</h1>
      <p className="text-xl opacity-60 max-w-2xl mb-10">${props.subtitle}</p>
      ${props.cta ? `<button className="px-8 py-3 rounded-full bg-current text-white font-medium hover:opacity-90 transition-opacity" style={{ color: '${props.bgColor}' }}>
        ${props.cta}
      </button>` : ''}
    </section>
  );
}`
  },
  {
    id: 'hero-app-promo',
    name: 'App Promo Hero',
    category: 'Hero',
    defaultProps: {
      title: 'Your life, organized.',
      subtitle: 'Download the app today and start managing your tasks, goals, and habits in one beautiful place.',
      cta1: 'Download for iOS',
      cta2: 'Download for Android',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
      bgColor: '#eef2ff',
      textColor: '#1e1b4b'
    },
    propConfig: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'cta1', label: 'Primary CTA', type: 'string' },
      { name: 'cta2', label: 'Secondary CTA', type: 'string' },
      { name: 'image', label: 'App Image URL', type: 'image' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' }
    ],
    component: (props) => (
      <section className="py-24 overflow-hidden" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">{props.title}</h1>
              <p className="text-xl opacity-70 mb-10 max-w-xl mx-auto lg:mx-0">{props.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {props.cta1 && (
                  <button className="px-8 py-4 rounded-xl bg-current font-semibold shadow-lg hover:shadow-xl transition-all" style={{ color: props.bgColor }}>
                    {props.cta1}
                  </button>
                )}
                {props.cta2 && (
                  <button className="px-8 py-4 rounded-xl border-2 border-current/20 font-semibold hover:bg-current/5 transition-all">
                    {props.cta2}
                  </button>
                )}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative bg-white border-[8px] border-gray-900 rounded-[3rem] h-[600px] overflow-hidden shadow-2xl mx-auto max-w-[300px]">
                <img src={props.image} alt="App screenshot" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
    ),
    code: (props) => `export default function AppPromoHero() {
  return (
    <section className="py-24 overflow-hidden" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">${props.title}</h1>
            <p className="text-xl opacity-70 mb-10 max-w-xl mx-auto lg:mx-0">${props.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              ${props.cta1 ? `<button className="px-8 py-4 rounded-xl bg-current font-semibold shadow-lg hover:shadow-xl transition-all" style={{ color: '${props.bgColor}' }}>
                ${props.cta1}
              </button>` : ''}
              ${props.cta2 ? `<button className="px-8 py-4 rounded-xl border-2 border-current/20 font-semibold hover:bg-current/5 transition-all">
                ${props.cta2}
              </button>` : ''}
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative bg-white border-[8px] border-gray-900 rounded-[3rem] h-[600px] overflow-hidden shadow-2xl mx-auto max-w-[300px]">
              <img src="${props.image}" alt="App screenshot" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}`
  }
];
