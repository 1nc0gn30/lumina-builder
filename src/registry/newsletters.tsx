import React from 'react';
import { Mail } from 'lucide-react';
import { BlockDefinition } from './types';

export const newsletters: BlockDefinition[] = [
  {
    id: 'newsletter-simple',
    name: 'Simple Newsletter',
    category: 'Newsletter',
    defaultProps: {
      title: 'Subscribe to our newsletter',
      subtitle: 'Get the latest news, articles, and resources, sent to your inbox weekly.',
      cta: 'Subscribe',
      placeholder: 'Enter your email',
      bgColor: '#f9fafb',
      textColor: '#111827',
      accentColor: '#3b82f6'
    },
    propConfig: [
      { name: 'title', label: 'Title', type: 'string' },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'cta', label: 'CTA Text', type: 'string' },
      { name: 'placeholder', label: 'Input Placeholder', type: 'string' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' },
      { name: 'accentColor', label: 'Accent Color', type: 'color' }
    ],
    component: (props) => (
      <section className="py-24" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-current/5 rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 border border-current/10">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight mb-4">{props.title}</h2>
              <p className="opacity-70 text-lg">{props.subtitle}</p>
            </div>
            <div className="lg:w-1/2 w-full max-w-md">
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 opacity-40" />
                  </div>
                  <input
                    type="email"
                    className="block w-full pl-10 pr-3 py-3 border border-current/20 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-2 focus:border-transparent transition-all outline-none"
                    style={{ '--tw-ring-color': props.accentColor } as React.CSSProperties}
                    placeholder={props.placeholder}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="py-3 px-6 rounded-xl text-white font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
                  style={{ backgroundColor: props.accentColor }}
                >
                  {props.cta}
                </button>
              </form>
              <p className="text-xs opacity-50 mt-4 text-center sm:text-left">
                We care about your data. Read our <a href="#" className="underline hover:opacity-100">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    ),
    code: (props) => `import { Mail } from 'lucide-react';

export default function SimpleNewsletter() {
  return (
    <section className="py-24" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-current/5 rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 border border-current/10">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight mb-4">${props.title}</h2>
            <p className="opacity-70 text-lg">${props.subtitle}</p>
          </div>
          <div className="lg:w-1/2 w-full max-w-md">
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 opacity-40" />
                </div>
                <input
                  type="email"
                  className="block w-full pl-10 pr-3 py-3 border border-current/20 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-2 focus:border-transparent transition-all outline-none"
                  style={{ '--tw-ring-color': '${props.accentColor}' } as React.CSSProperties}
                  placeholder="${props.placeholder}"
                  required
                />
              </div>
              <button
                type="submit"
                className="py-3 px-6 rounded-xl text-white font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
                style={{ backgroundColor: '${props.accentColor}' }}
              >
                ${props.cta}
              </button>
            </form>
            <p className="text-xs opacity-50 mt-4 text-center sm:text-left">
              We care about your data. Read our <a href="#" className="underline hover:opacity-100">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}`
  }
];
