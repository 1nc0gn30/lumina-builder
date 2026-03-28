import React from 'react';
import { Zap, Shield, Globe, Layout, Smartphone, Code, Layers, Cpu, Fingerprint, Sparkles, Bot, Network, Workflow } from 'lucide-react';
import { BlockDefinition } from './types';

export const features: BlockDefinition[] = [
  {
    id: 'features-ai-bento',
    name: 'AI Bento Grid',
    category: 'Features',
    defaultProps: {
      title: 'Supercharged by AI',
      subtitle: 'Experience the next generation of intelligent tools designed to automate, optimize, and scale your workflow.',
      bgColor: '#000000',
      textColor: '#ffffff',
      accentColor: '#3b82f6',
      cardBgColor: '#111111'
    },
    propConfig: [
      { name: 'title', label: 'Title', type: 'string' },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' },
      { name: 'accentColor', label: 'Accent Color', type: 'color' },
      { name: 'cardBgColor', label: 'Card Background Color', type: 'color' }
    ],
    component: (props) => (
      <section className="py-24 lg:py-32 overflow-hidden relative" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] opacity-30 blur-[120px] pointer-events-none" style={{ background: `radial-gradient(circle, ${props.accentColor} 0%, transparent 70%)` }} />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border mb-6 backdrop-blur-sm" style={{ borderColor: `${props.accentColor}40`, backgroundColor: `${props.accentColor}10` }}>
              <Sparkles className="w-4 h-4 mr-2" style={{ color: props.accentColor }} />
              <span className="text-sm font-medium" style={{ color: props.accentColor }}>Next-Gen AI Capabilities</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">{props.title}</h2>
            <p className="text-lg lg:text-xl opacity-70">{props.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(240px,auto)]">
            {/* Large Card 1 */}
            <div className="md:col-span-8 rounded-3xl p-8 lg:p-12 border relative overflow-hidden group" style={{ backgroundColor: props.cardBgColor, borderColor: 'rgba(255,255,255,0.1)' }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700" style={{ background: `radial-gradient(circle at top right, ${props.accentColor}, transparent 70%)` }} />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8" style={{ backgroundColor: `${props.accentColor}20` }}>
                  <Bot className="w-7 h-7" style={{ color: props.accentColor }} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-4">Autonomous Agents</h3>
                  <p className="opacity-70 text-lg max-w-md">Deploy intelligent agents that learn your processes and execute complex multi-step tasks without human intervention.</p>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute right-0 bottom-0 w-2/3 h-2/3 opacity-20 translate-x-1/4 translate-y-1/4 group-hover:scale-105 transition-transform duration-700">
                <Network className="w-full h-full" style={{ color: props.accentColor }} />
              </div>
            </div>

            {/* Small Card 1 */}
            <div className="md:col-span-4 rounded-3xl p-8 border relative overflow-hidden group" style={{ backgroundColor: props.cardBgColor, borderColor: 'rgba(255,255,255,0.1)' }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700" style={{ background: `radial-gradient(circle at bottom left, ${props.accentColor}, transparent 70%)` }} />
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: `${props.accentColor}20` }}>
                <Cpu className="w-6 h-6" style={{ color: props.accentColor }} />
              </div>
              <h3 className="text-xl font-bold mb-3">Neural Processing</h3>
              <p className="opacity-70">Lightning-fast inference powered by custom silicon optimized for transformer models.</p>
            </div>

            {/* Small Card 2 */}
            <div className="md:col-span-4 rounded-3xl p-8 border relative overflow-hidden group" style={{ backgroundColor: props.cardBgColor, borderColor: 'rgba(255,255,255,0.1)' }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700" style={{ background: `radial-gradient(circle at top left, ${props.accentColor}, transparent 70%)` }} />
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: `${props.accentColor}20` }}>
                <Workflow className="w-6 h-6" style={{ color: props.accentColor }} />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Workflows</h3>
              <p className="opacity-70">Automatically route tasks and data based on semantic understanding of your content.</p>
            </div>

            {/* Large Card 2 */}
            <div className="md:col-span-8 rounded-3xl p-8 lg:p-12 border relative overflow-hidden group" style={{ backgroundColor: props.accentColor, borderColor: 'rgba(255,255,255,0.1)' }}>
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 flex flex-col h-full justify-between text-white">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-8 backdrop-blur-md">
                  <Fingerprint className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-4">Privacy-Preserving AI</h3>
                  <p className="opacity-90 text-lg max-w-md">Your data never leaves your secure enclave. Train and fine-tune models locally with zero-knowledge proofs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    ),
    code: (props) => `import { Sparkles, Bot, Network, Cpu, Workflow, Fingerprint } from 'lucide-react';

export default function AIBentoFeatures() {
  return (
    <section className="py-24 lg:py-32 overflow-hidden relative" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] opacity-30 blur-[120px] pointer-events-none" style={{ background: \`radial-gradient(circle, ${props.accentColor} 0%, transparent 70%)\` }} />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border mb-6 backdrop-blur-sm" style={{ borderColor: '${props.accentColor}40', backgroundColor: '${props.accentColor}10' }}>
            <Sparkles className="w-4 h-4 mr-2" style={{ color: '${props.accentColor}' }} />
            <span className="text-sm font-medium" style={{ color: '${props.accentColor}' }}>Next-Gen AI Capabilities</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">${props.title}</h2>
          <p className="text-lg lg:text-xl opacity-70">${props.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(240px,auto)]">
          {/* Large Card 1 */}
          <div className="md:col-span-8 rounded-3xl p-8 lg:p-12 border relative overflow-hidden group" style={{ backgroundColor: '${props.cardBgColor}', borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700" style={{ background: \`radial-gradient(circle at top right, ${props.accentColor}, transparent 70%)\` }} />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8" style={{ backgroundColor: '${props.accentColor}20' }}>
                <Bot className="w-7 h-7" style={{ color: '${props.accentColor}' }} />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-4">Autonomous Agents</h3>
                <p className="opacity-70 text-lg max-w-md">Deploy intelligent agents that learn your processes and execute complex multi-step tasks without human intervention.</p>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute right-0 bottom-0 w-2/3 h-2/3 opacity-20 translate-x-1/4 translate-y-1/4 group-hover:scale-105 transition-transform duration-700">
              <Network className="w-full h-full" style={{ color: '${props.accentColor}' }} />
            </div>
          </div>

          {/* Small Card 1 */}
          <div className="md:col-span-4 rounded-3xl p-8 border relative overflow-hidden group" style={{ backgroundColor: '${props.cardBgColor}', borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700" style={{ background: \`radial-gradient(circle at bottom left, ${props.accentColor}, transparent 70%)\` }} />
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: '${props.accentColor}20' }}>
              <Cpu className="w-6 h-6" style={{ color: '${props.accentColor}' }} />
            </div>
            <h3 className="text-xl font-bold mb-3">Neural Processing</h3>
            <p className="opacity-70">Lightning-fast inference powered by custom silicon optimized for transformer models.</p>
          </div>

          {/* Small Card 2 */}
          <div className="md:col-span-4 rounded-3xl p-8 border relative overflow-hidden group" style={{ backgroundColor: '${props.cardBgColor}', borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700" style={{ background: \`radial-gradient(circle at top left, ${props.accentColor}, transparent 70%)\` }} />
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: '${props.accentColor}20' }}>
              <Workflow className="w-6 h-6" style={{ color: '${props.accentColor}' }} />
            </div>
            <h3 className="text-xl font-bold mb-3">Smart Workflows</h3>
            <p className="opacity-70">Automatically route tasks and data based on semantic understanding of your content.</p>
          </div>

          {/* Large Card 2 */}
          <div className="md:col-span-8 rounded-3xl p-8 lg:p-12 border relative overflow-hidden group" style={{ backgroundColor: '${props.accentColor}', borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 flex flex-col h-full justify-between text-white">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-8 backdrop-blur-md">
                <Fingerprint className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-4">Privacy-Preserving AI</h3>
                <p className="opacity-90 text-lg max-w-md">Your data never leaves your secure enclave. Train and fine-tune models locally with zero-knowledge proofs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'features-minimal',
    name: 'Minimal Features',
    category: 'Features',
    defaultProps: {
      title: 'Built for modern teams',
      subtitle: 'Everything you need to manage your projects, without the clutter.',
      bgColor: '#ffffff',
      textColor: '#0a0a0a',
      iconColor: '#3b82f6'
    },
    propConfig: [
      { name: 'title', label: 'Title', type: 'string' },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' },
      { name: 'iconColor', label: 'Icon Color', type: 'color' }
    ],
    component: (props) => (
      <section className="py-24 lg:py-32" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">{props.title}</h2>
            <p className="text-lg lg:text-xl opacity-70">{props.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {[
              { icon: Layers, title: 'Seamless Integration', desc: 'Connect with your favorite tools in seconds.' },
              { icon: Cpu, title: 'Automated Workflows', desc: 'Let our AI handle the repetitive tasks for you.' },
              { icon: Fingerprint, title: 'Advanced Security', desc: 'Enterprise-grade protection for your peace of mind.' }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-6 transition-transform hover:scale-110">
                  <feature.icon className="w-8 h-8" style={{ color: props.iconColor }} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="opacity-70 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    ),
    code: (props) => `import { Layers, Cpu, Fingerprint } from 'lucide-react';

export default function MinimalFeatures() {
  const features = [
    { icon: Layers, title: 'Seamless Integration', desc: 'Connect with your favorite tools in seconds.' },
    { icon: Cpu, title: 'Automated Workflows', desc: 'Let our AI handle the repetitive tasks for you.' },
    { icon: Fingerprint, title: 'Advanced Security', desc: 'Enterprise-grade protection for your peace of mind.' }
  ];

  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">${props.title}</h2>
          <p className="text-lg lg:text-xl opacity-70">${props.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {features.map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-6 transition-transform hover:scale-110">
                <feature.icon className="w-8 h-8" style={{ color: '${props.iconColor}' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="opacity-70 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'features-bento',
    name: 'Bento Features',
    category: 'Features',
    defaultProps: {
      title: 'Everything you need.',
      subtitle: 'Powerful features packed into an intuitive interface.',
      bgColor: '#f9fafb',
      textColor: '#111827',
      cardBgColor: '#ffffff'
    },
    propConfig: [
      { name: 'title', label: 'Title', type: 'string' },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' },
      { name: 'cardBgColor', label: 'Card Background Color', type: 'color' }
    ],
    component: (props) => (
      <section className="py-24" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-4xl font-semibold tracking-tight mb-4">{props.title}</h2>
            <p className="opacity-70 text-lg">{props.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 rounded-3xl p-10 shadow-sm border border-black/5" style={{ backgroundColor: props.cardBgColor }}>
              <Zap className="h-10 w-10 text-amber-500 mb-6" />
              <h3 className="text-2xl font-medium mb-3">Lightning Fast</h3>
              <p className="opacity-70 max-w-md">Optimized for speed. Experience sub-millisecond latency across our global edge network.</p>
            </div>
            <div className="rounded-3xl p-10 shadow-sm border border-black/5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
              <Shield className="h-10 w-10 text-blue-200 mb-6" />
              <h3 className="text-2xl font-medium mb-3">Bank-grade Security</h3>
              <p className="text-blue-100">Your data is encrypted at rest and in transit.</p>
            </div>
            <div className="rounded-3xl p-10 shadow-sm border border-black/5" style={{ backgroundColor: props.cardBgColor }}>
              <Globe className="h-10 w-10 text-emerald-500 mb-6" />
              <h3 className="text-2xl font-medium mb-3">Global Reach</h3>
              <p className="opacity-70">Deploy to 35+ regions with a single click.</p>
            </div>
            <div className="md:col-span-2 rounded-3xl p-10 shadow-sm border border-black/5 flex items-center overflow-hidden relative" style={{ backgroundColor: props.cardBgColor }}>
              <div className="relative z-10 max-w-md">
                <Layout className="h-10 w-10 text-purple-500 mb-6" />
                <h3 className="text-2xl font-medium mb-3">Beautiful Interfaces</h3>
                <p className="opacity-70">Craft stunning user experiences with our comprehensive component library.</p>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-black/5 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>
    ),
    code: (props) => `import { Zap, Shield, Globe, Layout } from 'lucide-react';

export default function BentoFeatures() {
  return (
    <section className="py-24" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl font-semibold tracking-tight mb-4">${props.title}</h2>
          <p className="opacity-70 text-lg">${props.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 rounded-3xl p-10 shadow-sm border border-black/5" style={{ backgroundColor: '${props.cardBgColor}' }}>
            <Zap className="h-10 w-10 text-amber-500 mb-6" />
            <h3 className="text-2xl font-medium mb-3">Lightning Fast</h3>
            <p className="opacity-70 max-w-md">Optimized for speed. Experience sub-millisecond latency across our global edge network.</p>
          </div>
          <div className="rounded-3xl p-10 shadow-sm border border-black/5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
            <Shield className="h-10 w-10 text-blue-200 mb-6" />
            <h3 className="text-2xl font-medium mb-3">Bank-grade Security</h3>
            <p className="text-blue-100">Your data is encrypted at rest and in transit.</p>
          </div>
          <div className="rounded-3xl p-10 shadow-sm border border-black/5" style={{ backgroundColor: '${props.cardBgColor}' }}>
            <Globe className="h-10 w-10 text-emerald-500 mb-6" />
            <h3 className="text-2xl font-medium mb-3">Global Reach</h3>
            <p className="opacity-70">Deploy to 35+ regions with a single click.</p>
          </div>
          <div className="md:col-span-2 rounded-3xl p-10 shadow-sm border border-black/5 flex items-center overflow-hidden relative" style={{ backgroundColor: '${props.cardBgColor}' }}>
            <div className="relative z-10 max-w-md">
              <Layout className="h-10 w-10 text-purple-500 mb-6" />
              <h3 className="text-2xl font-medium mb-3">Beautiful Interfaces</h3>
              <p className="opacity-70">Craft stunning user experiences with our comprehensive component library.</p>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-black/5 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'features-grid',
    name: 'Grid Features',
    category: 'Features',
    defaultProps: {
      title: 'Built for developers',
      subtitle: 'Everything you need to build and scale your application.',
      bgColor: '#ffffff',
      textColor: '#000000'
    },
    propConfig: [
      { name: 'title', label: 'Title', type: 'string' },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' }
    ],
    component: (props) => (
      <section className="py-24" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4">{props.title}</h2>
            <p className="text-xl opacity-60 max-w-2xl mx-auto">{props.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { icon: <Code />, title: 'Developer First', desc: 'Extensive API documentation and SDKs for every major language.' },
              { icon: <Shield />, title: 'Secure by Default', desc: 'Enterprise-grade security built into every layer of the stack.' },
              { icon: <Zap />, title: 'High Performance', desc: 'Global edge network ensures your app is fast everywhere.' },
              { icon: <Globe />, title: 'Global Scale', desc: 'Deploy to 35+ regions with a single click.' },
              { icon: <Layout />, title: 'Beautiful UI', desc: 'Pre-built components to help you move faster.' },
              { icon: <Smartphone />, title: 'Mobile Ready', desc: 'Fully responsive designs that look great on any device.' }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col">
                <div className="h-12 w-12 rounded-xl bg-current/10 flex items-center justify-center mb-6">
                  {React.cloneElement(feature.icon as React.ReactElement, { className: 'h-6 w-6' })}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="opacity-70 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    ),
    code: (props) => `import { Code, Shield, Zap, Globe, Layout, Smartphone } from 'lucide-react';

export default function GridFeatures() {
  const features = [
    { icon: <Code className="h-6 w-6" />, title: 'Developer First', desc: 'Extensive API documentation and SDKs for every major language.' },
    { icon: <Shield className="h-6 w-6" />, title: 'Secure by Default', desc: 'Enterprise-grade security built into every layer of the stack.' },
    { icon: <Zap className="h-6 w-6" />, title: 'High Performance', desc: 'Global edge network ensures your app is fast everywhere.' },
    { icon: <Globe className="h-6 w-6" />, title: 'Global Scale', desc: 'Deploy to 35+ regions with a single click.' },
    { icon: <Layout className="h-6 w-6" />, title: 'Beautiful UI', desc: 'Pre-built components to help you move faster.' },
    { icon: <Smartphone className="h-6 w-6" />, title: 'Mobile Ready', desc: 'Fully responsive designs that look great on any device.' }
  ];

  return (
    <section className="py-24" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4">${props.title}</h2>
          <p className="text-xl opacity-60 max-w-2xl mx-auto">${props.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, i) => (
            <div key={i} className="flex flex-col">
              <div className="h-12 w-12 rounded-xl bg-current/10 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="opacity-70 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`
  }
];
