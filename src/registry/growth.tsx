import React from 'react';
import { ArrowRight, Check, Shield, Sparkles } from 'lucide-react';
import { BlockDefinition } from './types';

export const growth: BlockDefinition[] = [
  {
    id: 'cta-product-launch',
    name: 'Product Launch CTA',
    category: 'CTA',
    defaultProps: {
      badge: 'New release',
      title: 'Ship your next launch in days, not months.',
      subtitle: 'Beautiful blocks, fast iteration, and production-ready code export for modern teams.',
      primaryCta: 'Start Building',
      secondaryCta: 'Book Demo',
      bgColor: '#0b1020',
      textColor: '#f8fafc',
      accentColor: '#38bdf8',
    },
    propConfig: [
      { name: 'badge', label: 'Badge Text', type: 'string' },
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'primaryCta', label: 'Primary CTA', type: 'string' },
      { name: 'secondaryCta', label: 'Secondary CTA', type: 'string' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' },
      { name: 'accentColor', label: 'Accent Color', type: 'color' },
    ],
    component: (props) => (
      <section className="py-20 px-6" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
        <div className="max-w-6xl mx-auto rounded-3xl border p-8 lg:p-12" style={{ borderColor: `${props.accentColor}40` }}>
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs mb-6" style={{ backgroundColor: `${props.accentColor}15`, color: props.accentColor }}>
            <Sparkles className="h-3.5 w-3.5" />
            {props.badge}
          </div>
          <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight max-w-3xl">{props.title}</h2>
          <p className="mt-4 text-base lg:text-lg opacity-80 max-w-2xl">{props.subtitle}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: props.accentColor }}>
              {props.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold border border-current/20 hover:bg-white/5 transition-colors">
              {props.secondaryCta}
            </button>
          </div>
        </div>
      </section>
    ),
    code: (props) => `import { ArrowRight, Sparkles } from 'lucide-react';

export default function ProductLaunchCTA() {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <div className="max-w-6xl mx-auto rounded-3xl border p-8 lg:p-12" style={{ borderColor: '${props.accentColor}40' }}>
        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs mb-6" style={{ backgroundColor: '${props.accentColor}15', color: '${props.accentColor}' }}>
          <Sparkles className="h-3.5 w-3.5" />
          ${props.badge}
        </div>
        <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight max-w-3xl">${props.title}</h2>
        <p className="mt-4 text-base lg:text-lg opacity-80 max-w-2xl">${props.subtitle}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white" style={{ backgroundColor: '${props.accentColor}' }}>
            ${props.primaryCta}
            <ArrowRight className="h-4 w-4" />
          </button>
          <button className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold border border-current/20 hover:bg-white/5 transition-colors">
            ${props.secondaryCta}
          </button>
        </div>
      </div>
    </section>
  );
}`,
  },
  {
    id: 'logos-trust-wall',
    name: 'Trust Logos Wall',
    category: 'Logos',
    defaultProps: {
      title: 'Trusted by high-growth teams',
      subtitle: 'From early-stage startups to enterprise operations.',
      logo1: 'Arc Labs',
      logo2: 'Northstar',
      logo3: 'Quantive',
      logo4: 'Peakflow',
      logo5: 'Nimbus',
      logo6: 'Helio',
      bgColor: '#ffffff',
      textColor: '#0f172a',
    },
    propConfig: [
      { name: 'title', label: 'Title', type: 'string' },
      { name: 'subtitle', label: 'Subtitle', type: 'string' },
      { name: 'logo1', label: 'Logo 1 Text', type: 'string' },
      { name: 'logo2', label: 'Logo 2 Text', type: 'string' },
      { name: 'logo3', label: 'Logo 3 Text', type: 'string' },
      { name: 'logo4', label: 'Logo 4 Text', type: 'string' },
      { name: 'logo5', label: 'Logo 5 Text', type: 'string' },
      { name: 'logo6', label: 'Logo 6 Text', type: 'string' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' },
    ],
    component: (props) => {
      const logos = [props.logo1, props.logo2, props.logo3, props.logo4, props.logo5, props.logo6].filter(Boolean);
      return (
        <section className="py-20 px-6" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight">{props.title}</h3>
              <p className="mt-2 text-sm lg:text-base opacity-70">{props.subtitle}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {logos.map((logo, i) => (
                <div key={i} className="rounded-2xl border border-current/15 py-6 px-4 text-center font-semibold tracking-wide bg-current/[0.03]">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    },
    code: (props) => `export default function TrustLogosWall() {
  const logos = ['${props.logo1}', '${props.logo2}', '${props.logo3}', '${props.logo4}', '${props.logo5}', '${props.logo6}'].filter(Boolean);
  return (
    <section className="py-20 px-6" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight">${props.title}</h3>
          <p className="mt-2 text-sm lg:text-base opacity-70">${props.subtitle}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {logos.map((logo, i) => (
            <div key={i} className="rounded-2xl border border-current/15 py-6 px-4 text-center font-semibold tracking-wide bg-current/[0.03]">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
  },
  {
    id: 'features-steps',
    name: '3-Step Features',
    category: 'Features',
    defaultProps: {
      title: 'From idea to live in 3 steps',
      subtitle: 'A practical flow your team can repeat every week.',
      step1Title: 'Assemble',
      step1Text: 'Pick from a curated block library and set your brand style in minutes.',
      step2Title: 'Customize',
      step2Text: 'Adjust content, visuals, and integrations without touching boilerplate.',
      step3Title: 'Launch',
      step3Text: 'Export clean React code and ship with your existing stack.',
      bgColor: '#f8fafc',
      textColor: '#0f172a',
      accentColor: '#0ea5e9',
    },
    propConfig: [
      { name: 'title', label: 'Title', type: 'string' },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'step1Title', label: 'Step 1 Title', type: 'string' },
      { name: 'step1Text', label: 'Step 1 Text', type: 'text' },
      { name: 'step2Title', label: 'Step 2 Title', type: 'string' },
      { name: 'step2Text', label: 'Step 2 Text', type: 'text' },
      { name: 'step3Title', label: 'Step 3 Title', type: 'string' },
      { name: 'step3Text', label: 'Step 3 Text', type: 'text' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' },
      { name: 'accentColor', label: 'Accent Color', type: 'color' },
    ],
    component: (props) => {
      const steps = [
        { title: props.step1Title, text: props.step1Text },
        { title: props.step2Title, text: props.step2Text },
        { title: props.step3Title, text: props.step3Text },
      ];
      return (
        <section className="py-24 px-6" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight">{props.title}</h2>
              <p className="mt-4 text-base lg:text-lg opacity-70 max-w-2xl mx-auto">{props.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {steps.map((step, i) => (
                <div key={i} className="rounded-3xl p-6 border border-current/15 bg-white/70">
                  <div className="h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold text-white mb-4" style={{ backgroundColor: props.accentColor }}>
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="opacity-75 leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    },
    code: (props) => `export default function ThreeStepFeatures() {
  const steps = [
    { title: '${props.step1Title}', text: '${props.step1Text}' },
    { title: '${props.step2Title}', text: '${props.step2Text}' },
    { title: '${props.step3Title}', text: '${props.step3Text}' }
  ];
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight">${props.title}</h2>
          <p className="mt-4 text-base lg:text-lg opacity-70 max-w-2xl mx-auto">${props.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <div key={i} className="rounded-3xl p-6 border border-current/15 bg-white/70">
              <div className="h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold text-white mb-4" style={{ backgroundColor: '${props.accentColor}' }}>
                {i + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="opacity-75 leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
  },
  {
    id: 'faq-support-quick',
    name: 'Quick Support FAQ',
    category: 'FAQ',
    defaultProps: {
      title: 'Questions before you launch?',
      subtitle: 'Short answers for teams moving fast.',
      q1: 'Can I export production-ready code?',
      a1: 'Yes. Exported code is readable and easy to drop into existing React projects.',
      q2: 'Can non-developers edit content?',
      a2: 'Yes. Most values are editable directly in the properties panel.',
      q3: 'Does auth and billing work?',
      a3: 'You can configure Supabase auth and Stripe billing components with guided setup.',
      q4: 'Can I customize styles deeply?',
      a4: 'Yes. Colors, spacing, and text are editable, and exported code is yours to extend.',
      bgColor: '#ffffff',
      textColor: '#0f172a',
      accentColor: '#14b8a6',
    },
    propConfig: [
      { name: 'title', label: 'Title', type: 'string' },
      { name: 'subtitle', label: 'Subtitle', type: 'string' },
      { name: 'q1', label: 'Question 1', type: 'string' },
      { name: 'a1', label: 'Answer 1', type: 'text' },
      { name: 'q2', label: 'Question 2', type: 'string' },
      { name: 'a2', label: 'Answer 2', type: 'text' },
      { name: 'q3', label: 'Question 3', type: 'string' },
      { name: 'a3', label: 'Answer 3', type: 'text' },
      { name: 'q4', label: 'Question 4', type: 'string' },
      { name: 'a4', label: 'Answer 4', type: 'text' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' },
      { name: 'accentColor', label: 'Accent Color', type: 'color' },
    ],
    component: (props) => {
      const items = [
        { q: props.q1, a: props.a1 },
        { q: props.q2, a: props.a2 },
        { q: props.q3, a: props.a3 },
        { q: props.q4, a: props.a4 },
      ].filter((item) => item.q && item.a);
      return (
        <section className="py-24 px-6" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight">{props.title}</h2>
              <p className="mt-3 opacity-70">{props.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {items.map((item, i) => (
                <div key={i} className="rounded-2xl border border-current/15 p-5 bg-current/[0.03]">
                  <p className="font-semibold mb-2" style={{ color: props.accentColor }}>{item.q}</p>
                  <p className="opacity-80 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    },
    code: (props) => `export default function QuickSupportFAQ() {
  const items = [
    { q: '${props.q1}', a: '${props.a1}' },
    { q: '${props.q2}', a: '${props.a2}' },
    { q: '${props.q3}', a: '${props.a3}' },
    { q: '${props.q4}', a: '${props.a4}' }
  ].filter((item) => item.q && item.a);
  return (
    <section className="py-24 px-6" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight">${props.title}</h2>
          <p className="mt-3 opacity-70">${props.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <div key={i} className="rounded-2xl border border-current/15 p-5 bg-current/[0.03]">
              <p className="font-semibold mb-2" style={{ color: '${props.accentColor}' }}>{item.q}</p>
              <p className="opacity-80 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
  },
  {
    id: 'stats-kpi-highlight',
    name: 'KPI Highlight Strip',
    category: 'Stats',
    defaultProps: {
      title: 'Operational impact you can measure',
      stat1Label: 'Conversion Lift',
      stat1Value: '+42%',
      stat2Label: 'Faster Build Time',
      stat2Value: '3.1x',
      stat3Label: 'Support Tickets',
      stat3Value: '-28%',
      stat4Label: 'Launch Frequency',
      stat4Value: '+67%',
      bgColor: '#0f172a',
      textColor: '#f8fafc',
      accentColor: '#22d3ee',
    },
    propConfig: [
      { name: 'title', label: 'Title', type: 'string' },
      { name: 'stat1Label', label: 'Stat 1 Label', type: 'string' },
      { name: 'stat1Value', label: 'Stat 1 Value', type: 'string' },
      { name: 'stat2Label', label: 'Stat 2 Label', type: 'string' },
      { name: 'stat2Value', label: 'Stat 2 Value', type: 'string' },
      { name: 'stat3Label', label: 'Stat 3 Label', type: 'string' },
      { name: 'stat3Value', label: 'Stat 3 Value', type: 'string' },
      { name: 'stat4Label', label: 'Stat 4 Label', type: 'string' },
      { name: 'stat4Value', label: 'Stat 4 Value', type: 'string' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' },
      { name: 'accentColor', label: 'Accent Color', type: 'color' },
    ],
    component: (props) => {
      const stats = [
        { label: props.stat1Label, value: props.stat1Value },
        { label: props.stat2Label, value: props.stat2Value },
        { label: props.stat3Label, value: props.stat3Value },
        { label: props.stat4Label, value: props.stat4Value },
      ].filter((item) => item.label && item.value);
      return (
        <section className="py-20 px-6" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider mb-6" style={{ color: props.accentColor }}>
              <Shield className="h-3.5 w-3.5" />
              Verified Outcomes
            </div>
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight mb-10">{props.title}</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((item, i) => (
                <div key={i} className="rounded-2xl p-5 border border-white/10 bg-white/[0.03]">
                  <p className="text-3xl font-bold" style={{ color: props.accentColor }}>{item.value}</p>
                  <p className="mt-2 text-sm opacity-75">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    },
    code: (props) => `import { Shield } from 'lucide-react';

export default function KPIHighlightStrip() {
  const stats = [
    { label: '${props.stat1Label}', value: '${props.stat1Value}' },
    { label: '${props.stat2Label}', value: '${props.stat2Value}' },
    { label: '${props.stat3Label}', value: '${props.stat3Value}' },
    { label: '${props.stat4Label}', value: '${props.stat4Value}' }
  ].filter((item) => item.label && item.value);
  return (
    <section className="py-20 px-6" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider mb-6" style={{ color: '${props.accentColor}' }}>
          <Shield className="h-3.5 w-3.5" />
          Verified Outcomes
        </div>
        <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight mb-10">${props.title}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, i) => (
            <div key={i} className="rounded-2xl p-5 border border-white/10 bg-white/[0.03]">
              <p className="text-3xl font-bold" style={{ color: '${props.accentColor}' }}>{item.value}</p>
              <p className="mt-2 text-sm opacity-75">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
  },
];
