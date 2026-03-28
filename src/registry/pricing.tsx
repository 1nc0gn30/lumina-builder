import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { BlockDefinition } from './types';

export const pricing: BlockDefinition[] = [
  {
    id: 'pricing-comparison',
    name: 'Comparison Pricing',
    category: 'Pricing',
    defaultProps: {
      title: 'Choose the right plan for you',
      subtitle: 'Compare our plans and find the perfect fit for your needs.',
      bgColor: '#fafafa',
      textColor: '#171717',
      accentColor: '#000000'
    },
    propConfig: [
      { name: 'title', label: 'Title', type: 'string' },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' },
      { name: 'accentColor', label: 'Accent Color', type: 'color' }
    ],
    component: (props) => (
      <section className="py-24 lg:py-32" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">{props.title}</h2>
            <p className="text-lg opacity-70">{props.subtitle}</p>
          </div>
          
          <div className="overflow-x-auto pb-8">
            <div className="min-w-[800px] grid grid-cols-4 gap-4">
              {/* Header Row */}
              <div className="p-6 flex flex-col justify-end">
                <h3 className="text-xl font-semibold mb-2">Features</h3>
                <p className="text-sm opacity-60">Compare what's included in each plan.</p>
              </div>
              
              {[
                { name: 'Basic', price: '$9', desc: 'For individuals', btn: 'Start Free Trial' },
                { name: 'Pro', price: '$29', desc: 'For small teams', btn: 'Get Pro', popular: true },
                { name: 'Enterprise', price: '$99', desc: 'For large organizations', btn: 'Contact Sales' }
              ].map((plan, i) => (
                <div key={i} className={`p-6 rounded-2xl flex flex-col ${plan.popular ? 'bg-white shadow-xl border border-gray-100 relative' : 'bg-transparent'}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-bold rounded-full text-white uppercase tracking-wider" style={{ backgroundColor: props.accentColor }}>
                      Most Popular
                    </div>
                  )}
                  <h4 className="text-lg font-medium mb-1">{plan.name}</h4>
                  <p className="text-sm opacity-60 mb-4">{plan.desc}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="opacity-60">/mo</span>
                  </div>
                  <button 
                    className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all mt-auto ${plan.popular ? 'text-white hover:opacity-90 shadow-md' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}
                    style={plan.popular ? { backgroundColor: props.accentColor } : {}}
                  >
                    {plan.btn}
                  </button>
                </div>
              ))}

              {/* Feature Rows */}
              {[
                { name: 'Projects', values: ['Up to 3', 'Unlimited', 'Unlimited'] },
                { name: 'Storage', values: ['5GB', '50GB', '500GB'] },
                { name: 'Custom Domains', values: [false, true, true] },
                { name: 'Analytics', values: ['Basic', 'Advanced', 'Custom'] },
                { name: 'Support', values: ['Email', 'Priority', '24/7 Phone'] },
                { name: 'SLA', values: [false, false, true] },
              ].map((feature, i) => (
                <React.Fragment key={i}>
                  <div className="p-4 border-t border-gray-200/50 flex items-center font-medium text-sm">
                    {feature.name}
                  </div>
                  {feature.values.map((val, j) => (
                    <div key={j} className="p-4 border-t border-gray-200/50 flex items-center justify-center text-sm">
                      {typeof val === 'boolean' ? (
                        val ? <CheckCircle2 className="w-5 h-5" style={{ color: props.accentColor }} /> : <XCircle className="w-5 h-5 opacity-20" />
                      ) : (
                        <span className="opacity-80">{val}</span>
                      )}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
    ),
    code: (props) => `import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function ComparisonPricing() {
  const plans = [
    { name: 'Basic', price: '$9', desc: 'For individuals', btn: 'Start Free Trial' },
    { name: 'Pro', price: '$29', desc: 'For small teams', btn: 'Get Pro', popular: true },
    { name: 'Enterprise', price: '$99', desc: 'For large organizations', btn: 'Contact Sales' }
  ];

  const features = [
    { name: 'Projects', values: ['Up to 3', 'Unlimited', 'Unlimited'] },
    { name: 'Storage', values: ['5GB', '50GB', '500GB'] },
    { name: 'Custom Domains', values: [false, true, true] },
    { name: 'Analytics', values: ['Basic', 'Advanced', 'Custom'] },
    { name: 'Support', values: ['Email', 'Priority', '24/7 Phone'] },
    { name: 'SLA', values: [false, false, true] },
  ];

  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">${props.title}</h2>
          <p className="text-lg opacity-70">${props.subtitle}</p>
        </div>
        
        <div className="overflow-x-auto pb-8">
          <div className="min-w-[800px] grid grid-cols-4 gap-4">
            {/* Header Row */}
            <div className="p-6 flex flex-col justify-end">
              <h3 className="text-xl font-semibold mb-2">Features</h3>
              <p className="text-sm opacity-60">Compare what's included in each plan.</p>
            </div>
            
            {plans.map((plan, i) => (
              <div key={i} className={\`p-6 rounded-2xl flex flex-col \${plan.popular ? 'bg-white shadow-xl border border-gray-100 relative' : 'bg-transparent'}\`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-bold rounded-full text-white uppercase tracking-wider" style={{ backgroundColor: '${props.accentColor}' }}>
                    Most Popular
                  </div>
                )}
                <h4 className="text-lg font-medium mb-1">{plan.name}</h4>
                <p className="text-sm opacity-60 mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="opacity-60">/mo</span>
                </div>
                <button 
                  className={\`w-full py-2.5 rounded-lg text-sm font-semibold transition-all mt-auto \${plan.popular ? 'text-white hover:opacity-90 shadow-md' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}\`}
                  style={plan.popular ? { backgroundColor: '${props.accentColor}' } : {}}
                >
                  {plan.btn}
                </button>
              </div>
            ))}

            {/* Feature Rows */}
            {features.map((feature, i) => (
              <React.Fragment key={i}>
                <div className="p-4 border-t border-gray-200/50 flex items-center font-medium text-sm">
                  {feature.name}
                </div>
                {feature.values.map((val, j) => (
                  <div key={j} className="p-4 border-t border-gray-200/50 flex items-center justify-center text-sm">
                    {typeof val === 'boolean' ? (
                      val ? <CheckCircle2 className="w-5 h-5" style={{ color: '${props.accentColor}' }} /> : <XCircle className="w-5 h-5 opacity-20" />
                    ) : (
                      <span className="opacity-80">{val}</span>
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'pricing-clean',
    name: 'Clean Pricing',
    category: 'Pricing',
    defaultProps: {
      title: 'Simple, transparent pricing',
      subtitle: 'No hidden fees. No surprise charges.',
      bgColor: '#ffffff',
      textColor: '#000000',
      accentColor: '#3b82f6'
    },
    propConfig: [
      { name: 'title', label: 'Title', type: 'string' },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' },
      { name: 'accentColor', label: 'Accent Color', type: 'color' }
    ],
    component: (props) => (
      <section className="py-24" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold tracking-tight mb-4">{props.title}</h2>
            <p className="opacity-60 text-lg">{props.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: 'Starter', price: '$0', desc: 'Perfect for side projects.', features: ['Up to 3 projects', 'Basic analytics', '24-hour support response time'] },
              { name: 'Pro', price: '$29', desc: 'For professional developers.', features: ['Unlimited projects', 'Advanced analytics', '1-hour support response time', 'Custom domains'], popular: true },
              { name: 'Enterprise', price: 'Custom', desc: 'For large scale organizations.', features: ['Dedicated account manager', 'Custom SLAs', 'SSO authentication', 'On-premise deployment'] }
            ].map((plan, i) => (
              <div key={i} className={`rounded-3xl p-8 border ${plan.popular ? 'border-current shadow-xl relative' : 'border-current/10'}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 text-xs font-medium rounded-full text-white" style={{ backgroundColor: props.accentColor }}>
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-medium mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="opacity-60">/mo</span>}
                </div>
                <p className="opacity-60 text-sm mb-8">{plan.desc}</p>
                <button className={`w-full py-3 rounded-full text-sm font-medium mb-8 transition-colors ${plan.popular ? 'text-white hover:opacity-90' : 'bg-current/5 hover:bg-current/10'}`} style={plan.popular ? { backgroundColor: props.accentColor } : {}}>
                  Get started
                </button>
                <div className="space-y-4">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-center text-sm">
                      <CheckCircle2 className="h-5 w-5 mr-3" style={{ color: props.accentColor }} />
                      <span className="opacity-80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    ),
    code: (props) => `import { CheckCircle2 } from 'lucide-react';

export default function CleanPricing() {
  const plans = [
    { name: 'Starter', price: '$0', desc: 'Perfect for side projects.', features: ['Up to 3 projects', 'Basic analytics', '24-hour support response time'] },
    { name: 'Pro', price: '$29', desc: 'For professional developers.', features: ['Unlimited projects', 'Advanced analytics', '1-hour support response time', 'Custom domains'], popular: true },
    { name: 'Enterprise', price: 'Custom', desc: 'For large scale organizations.', features: ['Dedicated account manager', 'Custom SLAs', 'SSO authentication', 'On-premise deployment'] }
  ];

  return (
    <section className="py-24" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold tracking-tight mb-4">${props.title}</h2>
          <p className="opacity-60 text-lg">${props.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div key={i} className={\`rounded-3xl p-8 border \${plan.popular ? 'border-current shadow-xl relative' : 'border-current/10'}\`}>
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 text-xs font-medium rounded-full text-white" style={{ backgroundColor: '${props.accentColor}' }}>
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-medium mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== 'Custom' && <span className="opacity-60">/mo</span>}
              </div>
              <p className="opacity-60 text-sm mb-8">{plan.desc}</p>
              <button className={\`w-full py-3 rounded-full text-sm font-medium mb-8 transition-colors \${plan.popular ? 'text-white hover:opacity-90' : 'bg-current/5 hover:bg-current/10'}\`} style={plan.popular ? { backgroundColor: '${props.accentColor}' } : {}}>
                Get started
              </button>
              <div className="space-y-4">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-center text-sm">
                    <CheckCircle2 className="h-5 w-5 mr-3" style={{ color: '${props.accentColor}' }} />
                    <span className="opacity-80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`
  }
];
