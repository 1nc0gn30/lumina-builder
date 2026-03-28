import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { BlockDefinition } from './types';

export const faqs: BlockDefinition[] = [
  {
    id: 'faq-accordion',
    name: 'Accordion FAQ',
    category: 'FAQ',
    defaultProps: {
      title: 'Frequently asked questions',
      subtitle: 'Everything you need to know about the product and billing.',
      bgColor: '#ffffff',
      textColor: '#0a0a0a',
      accentColor: '#3b82f6',
      q1: 'Is there a free trial available?',
      a1: 'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.',
      q2: 'Can I change my plan later?',
      a2: 'Of course. Our pricing scales with your company. Chat to our friendly team to find a solution that works for you.',
      q3: 'What is your cancellation policy?',
      a3: 'We understand that things change. You can cancel your plan at any time and we’ll refund you the difference already paid.',
      q4: 'Can other info be added to an invoice?',
      a4: 'At the moment, the only way to add additional information to invoices is to add the information to the workspace\'s name.'
    },
    propConfig: [
      { name: 'title', label: 'Title', type: 'string' },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' },
      { name: 'accentColor', label: 'Accent Color', type: 'color' },
      { name: 'q1', label: 'Question 1', type: 'string' },
      { name: 'a1', label: 'Answer 1', type: 'text' },
      { name: 'q2', label: 'Question 2', type: 'string' },
      { name: 'a2', label: 'Answer 2', type: 'text' },
      { name: 'q3', label: 'Question 3', type: 'string' },
      { name: 'a3', label: 'Answer 3', type: 'text' },
      { name: 'q4', label: 'Question 4', type: 'string' },
      { name: 'a4', label: 'Answer 4', type: 'text' }
    ],
    component: (props) => {
      const [openIndex, setOpenIndex] = useState<number | null>(0);
      const items = [
        { q: props.q1, a: props.a1 },
        { q: props.q2, a: props.a2 },
        { q: props.q3, a: props.a3 },
        { q: props.q4, a: props.a4 }
      ].filter(item => item.q && item.a);

      return (
        <section className="py-24" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-semibold tracking-tight mb-4">{props.title}</h2>
              <p className="opacity-60 text-lg">{props.subtitle}</p>
            </div>
            <div className="space-y-4">
              {items.map((faq, i) => (
                <div key={i} className="border border-current/10 rounded-2xl overflow-hidden transition-all duration-200" style={{ backgroundColor: openIndex === i ? `${props.accentColor}05` : 'transparent', borderColor: openIndex === i ? `${props.accentColor}30` : '' }}>
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-medium text-lg">{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`} style={{ color: openIndex === i ? props.accentColor : 'inherit' }} />
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="p-6 pt-0 opacity-70 leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    },
    code: (props) => `import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function AccordionFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    { q: "${props.q1}", a: "${props.a1}" },
    { q: "${props.q2}", a: "${props.a2}" },
    { q: "${props.q3}", a: "${props.a3}" },
    { q: "${props.q4}", a: "${props.a4}" }
  ].filter(item => item.q && item.a);

  return (
    <section className="py-24" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold tracking-tight mb-4">${props.title}</h2>
          <p className="opacity-60 text-lg">${props.subtitle}</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-current/10 rounded-2xl overflow-hidden transition-all duration-200" style={{ backgroundColor: openIndex === i ? '${props.accentColor}05' : 'transparent', borderColor: openIndex === i ? '${props.accentColor}30' : '' }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-medium text-lg">{faq.q}</span>
                <ChevronDown className={\`h-5 w-5 transition-transform duration-200 \${openIndex === i ? 'rotate-180' : ''}\`} style={{ color: openIndex === i ? '${props.accentColor}' : 'inherit' }} />
              </button>
              <div 
                className={\`overflow-hidden transition-all duration-300 ease-in-out \${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}\`}
              >
                <div className="p-6 pt-0 opacity-70 leading-relaxed">
                  {faq.a}
                </div>
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
