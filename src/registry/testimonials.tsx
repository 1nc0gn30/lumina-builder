import React from 'react';
import { Star } from 'lucide-react';
import { BlockDefinition } from './types';

export const testimonials: BlockDefinition[] = [
  {
    id: 'testimonials-grid',
    name: 'Grid Testimonials',
    category: 'Testimonials',
    defaultProps: {
      title: 'Loved by thousands',
      subtitle: 'Don\'t just take our word for it. Here\'s what our customers have to say.',
      bgColor: '#ffffff',
      textColor: '#000000',
      accentColor: '#f59e0b',
      t1Name: 'Sarah Jenkins',
      t1Role: 'CEO, TechFlow',
      t1Text: 'This product has completely transformed how our team works. We\'re shipping features 3x faster than before. The intuitive interface and powerful features are a game-changer.',
      t1Image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      t2Name: 'Michael Chen',
      t2Role: 'CTO, StartupX',
      t2Text: 'The best developer experience I\'ve ever had. The documentation is flawless, and the APIs are incredibly well-designed. We integrated it in less than a day.',
      t2Image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      t3Name: 'Emily Rodriguez',
      t3Role: 'Head of Design, CreativeCo',
      t3Text: 'Finally, a tool that understands the needs of designers and developers equally. The component library is stunning, and the customization options are endless.',
      t3Image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80'
    },
    propConfig: [
      { name: 'title', label: 'Title', type: 'string' },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' },
      { name: 'accentColor', label: 'Star Color', type: 'color' },
      { name: 't1Name', label: 'Testimonial 1 Name', type: 'string' },
      { name: 't1Role', label: 'Testimonial 1 Role', type: 'string' },
      { name: 't1Text', label: 'Testimonial 1 Text', type: 'text' },
      { name: 't1Image', label: 'Testimonial 1 Image', type: 'image' },
      { name: 't2Name', label: 'Testimonial 2 Name', type: 'string' },
      { name: 't2Role', label: 'Testimonial 2 Role', type: 'string' },
      { name: 't2Text', label: 'Testimonial 2 Text', type: 'text' },
      { name: 't2Image', label: 'Testimonial 2 Image', type: 'image' },
      { name: 't3Name', label: 'Testimonial 3 Name', type: 'string' },
      { name: 't3Role', label: 'Testimonial 3 Role', type: 'string' },
      { name: 't3Text', label: 'Testimonial 3 Text', type: 'text' },
      { name: 't3Image', label: 'Testimonial 3 Image', type: 'image' }
    ],
    component: (props) => {
      const items = [
        { name: props.t1Name, role: props.t1Role, text: props.t1Text, image: props.t1Image },
        { name: props.t2Name, role: props.t2Role, text: props.t2Text, image: props.t2Image },
        { name: props.t3Name, role: props.t3Role, text: props.t3Text, image: props.t3Image }
      ].filter(t => t.name && t.text);

      return (
        <section className="py-24" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-semibold tracking-tight mb-4">{props.title}</h2>
              <p className="opacity-60 text-lg max-w-2xl mx-auto">{props.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {items.map((testimonial, i) => (
                <div key={i} className="bg-current/5 rounded-3xl p-8 border border-current/10 flex flex-col">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-5 w-5 fill-current" style={{ color: props.accentColor }} />
                    ))}
                  </div>
                  <p className="text-lg leading-relaxed mb-8 flex-1">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <img src={testimonial.image} alt={testimonial.name} className="h-12 w-12 rounded-full object-cover" />
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm opacity-60">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    },
    code: (props) => `import { Star } from 'lucide-react';

export default function GridTestimonials() {
  const testimonials = [
    { name: "${props.t1Name}", role: "${props.t1Role}", text: "${props.t1Text}", image: "${props.t1Image}" },
    { name: "${props.t2Name}", role: "${props.t2Role}", text: "${props.t2Text}", image: "${props.t2Image}" },
    { name: "${props.t3Name}", role: "${props.t3Role}", text: "${props.t3Text}", image: "${props.t3Image}" }
  ].filter(t => t.name && t.text);

  return (
    <section className="py-24" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold tracking-tight mb-4">${props.title}</h2>
          <p className="opacity-60 text-lg max-w-2xl mx-auto">${props.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="bg-current/5 rounded-3xl p-8 border border-current/10 flex flex-col">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-5 w-5 fill-current" style={{ color: '${props.accentColor}' }} />
                ))}
              </div>
              <p className="text-lg leading-relaxed mb-8 flex-1">"{testimonial.text}"</p>
              <div className="flex items-center gap-4">
                <img src={testimonial.image} alt={testimonial.name} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm opacity-60">{testimonial.role}</p>
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
