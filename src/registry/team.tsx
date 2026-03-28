import React from 'react';
import { Twitter, Linkedin } from 'lucide-react';
import { BlockDefinition } from './types';

export const team: BlockDefinition[] = [
  {
    id: 'team-grid',
    name: 'Grid Team',
    category: 'Team',
    defaultProps: {
      title: 'Meet our team',
      subtitle: 'The people behind the product.',
      bgColor: '#ffffff',
      textColor: '#000000',
      accentColor: '#3b82f6',
      member1Name: 'Sarah Jenkins',
      member1Role: 'CEO & Founder',
      member1Image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      member2Name: 'Michael Chen',
      member2Role: 'CTO',
      member2Image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      member3Name: 'Emily Rodriguez',
      member3Role: 'Head of Design',
      member3Image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
      member4Name: 'David Kim',
      member4Role: 'Lead Engineer',
      member4Image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
    },
    propConfig: [
      { name: 'title', label: 'Title', type: 'string' },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' },
      { name: 'accentColor', label: 'Accent Color', type: 'color' },
      { name: 'member1Name', label: 'Member 1 Name', type: 'string' },
      { name: 'member1Role', label: 'Member 1 Role', type: 'string' },
      { name: 'member1Image', label: 'Member 1 Image', type: 'image' },
      { name: 'member2Name', label: 'Member 2 Name', type: 'string' },
      { name: 'member2Role', label: 'Member 2 Role', type: 'string' },
      { name: 'member2Image', label: 'Member 2 Image', type: 'image' },
      { name: 'member3Name', label: 'Member 3 Name', type: 'string' },
      { name: 'member3Role', label: 'Member 3 Role', type: 'string' },
      { name: 'member3Image', label: 'Member 3 Image', type: 'image' },
      { name: 'member4Name', label: 'Member 4 Name', type: 'string' },
      { name: 'member4Role', label: 'Member 4 Role', type: 'string' },
      { name: 'member4Image', label: 'Member 4 Image', type: 'image' }
    ],
    component: (props) => {
      const members = [
        { name: props.member1Name, role: props.member1Role, image: props.member1Image },
        { name: props.member2Name, role: props.member2Role, image: props.member2Image },
        { name: props.member3Name, role: props.member3Role, image: props.member3Image },
        { name: props.member4Name, role: props.member4Role, image: props.member4Image }
      ].filter(m => m.name && m.image);

      return (
        <section className="py-24" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-semibold tracking-tight mb-4">{props.title}</h2>
              <p className="opacity-60 text-lg">{props.subtitle}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {members.map((member, i) => (
                <div key={i} className="group">
                  <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/5]">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 gap-4">
                      <button className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                        <Twitter className="h-4 w-4" />
                      </button>
                      <button className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                        <Linkedin className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium">{member.name}</h3>
                  <p className="text-sm font-medium" style={{ color: props.accentColor }}>{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    },
    code: (props) => `import { Twitter, Linkedin } from 'lucide-react';

export default function GridTeam() {
  const members = [
    { name: "${props.member1Name}", role: "${props.member1Role}", image: "${props.member1Image}" },
    { name: "${props.member2Name}", role: "${props.member2Role}", image: "${props.member2Image}" },
    { name: "${props.member3Name}", role: "${props.member3Role}", image: "${props.member3Image}" },
    { name: "${props.member4Name}", role: "${props.member4Role}", image: "${props.member4Image}" }
  ].filter(m => m.name && m.image);

  return (
    <section className="py-24" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold tracking-tight mb-4">${props.title}</h2>
          <p className="opacity-60 text-lg">${props.subtitle}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, i) => (
            <div key={i} className="group">
              <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/5]">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 gap-4">
                  <button className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                    <Twitter className="h-4 w-4" />
                  </button>
                  <button className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-medium">{member.name}</h3>
              <p className="text-sm font-medium" style={{ color: '${props.accentColor}' }}>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`
  }
];
