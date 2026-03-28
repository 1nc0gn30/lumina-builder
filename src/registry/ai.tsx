import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Image as ImageIcon, Loader2, MessageSquare, X, Bot, Video, Mic, Volume2, Play, Square } from 'lucide-react';
import { BlockDefinition } from './types';

const aiProviderOptions = [
  { label: 'Google Gemini', value: 'gemini' },
  { label: 'OpenAI', value: 'openai' },
  { label: 'Anthropic Claude', value: 'claude' }
];

export const ai: BlockDefinition[] = [
  {
    id: 'ai-chat-widget',
    name: 'AI Chat Widget',
    category: 'AI Features',
    defaultProps: {
      title: 'Chat with AI',
      greeting: 'Hi there! How can I help you today?',
      botName: 'AI Assistant',
      accentColor: '#3b82f6',
      bgColor: '#ffffff',
      textColor: '#000000',
      aiProvider: 'gemini',
      apiKey: ''
    },
    propConfig: [
      { name: 'title', label: 'Widget Title', type: 'string' },
      { name: 'greeting', label: 'Greeting Message', type: 'string' },
      { name: 'botName', label: 'Bot Name', type: 'string' },
      { name: 'accentColor', label: 'Accent Color', type: 'color' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' },
      { name: 'aiProvider', label: 'AI Provider', type: 'select', options: aiProviderOptions },
      { name: 'apiKey', label: 'API Key', type: 'password' }
    ],
    component: (props) => {
      const [isOpen, setIsOpen] = useState(false);
      const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
        { role: 'ai', text: props.greeting }
      ]);
      const [input, setInput] = useState('');
      const [isTyping, setIsTyping] = useState(false);
      const messagesEndRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, [messages, isOpen]);

      const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        
        const userMsg = input.trim();
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: 'ai', 
            text: `I'm a demo AI using ${props.aiProvider}. In production, I would use your API key to respond to: "${userMsg}"` 
          }]);
          setIsTyping(false);
        }, 1500);
      };

      return (
        <div className="fixed bottom-6 right-6 z-50 font-sans" style={{ color: props.textColor }}>
          {/* Chat Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
            style={{ backgroundColor: props.accentColor, color: '#ffffff' }}
          >
            <MessageSquare className="w-6 h-6" />
          </button>

          {/* Chat Window */}
          <div 
            className={`absolute bottom-0 right-0 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
            style={{ backgroundColor: props.bgColor, border: `1px solid ${props.accentColor}20` }}
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between text-white" style={{ backgroundColor: props.accentColor }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{props.title}</h3>
                  <p className="text-xs opacity-80">{props.botName}</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundColor: `${props.bgColor}FA` }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'rounded-br-sm text-white' : 'rounded-bl-sm border'}`}
                    style={msg.role === 'user' ? { backgroundColor: props.accentColor } : { borderColor: `${props.accentColor}20`, backgroundColor: `${props.accentColor}05` }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-4 rounded-2xl rounded-bl-sm border flex items-center gap-1" style={{ borderColor: `${props.accentColor}20`, backgroundColor: `${props.accentColor}05` }}>
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: props.accentColor, animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: props.accentColor, animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: props.accentColor, animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t" style={{ borderColor: `${props.accentColor}20` }}>
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full py-3 pl-4 pr-12 rounded-xl border outline-none text-sm transition-colors"
                  style={{ borderColor: `${props.accentColor}30`, backgroundColor: 'transparent', color: props.textColor }}
                  onFocus={(e) => e.target.style.borderColor = props.accentColor}
                  onBlur={(e) => e.target.style.borderColor = `${props.accentColor}30`}
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-2 rounded-lg transition-colors disabled:opacity-50"
                  style={{ color: props.accentColor }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    },
    code: (props) => `import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, X, Bot } from 'lucide-react';

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: '${props.greeting}' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      // NOTE: To use this in production, you must use your API key
      // const apiKey = '${props.apiKey}' || process.env.API_KEY;
      // const provider = '${props.aiProvider}';
      
      // Simulated response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'ai', 
          text: \`I'm a demo AI using ${props.aiProvider}. In production, I would use your API key to respond to: "\${userMsg}"\` 
        }]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.error("AI Error:", error);
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" style={{ color: '${props.textColor}' }}>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={\`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 \${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}\`}
        style={{ backgroundColor: '${props.accentColor}', color: '#ffffff' }}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div 
        className={\`absolute bottom-0 right-0 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all origin-bottom-right \${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}\`}
        style={{ backgroundColor: '${props.bgColor}', border: \`1px solid ${props.accentColor}20\` }}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between text-white" style={{ backgroundColor: '${props.accentColor}' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">${props.title}</h3>
              <p className="text-xs opacity-80">${props.botName}</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundColor: \`${props.bgColor}FA\` }}>
          {messages.map((msg, i) => (
            <div key={i} className={\`flex \${msg.role === 'user' ? 'justify-end' : 'justify-start'}\`}>
              <div 
                className={\`max-w-[80%] p-3 rounded-2xl text-sm \${msg.role === 'user' ? 'rounded-br-sm text-white' : 'rounded-bl-sm border'}\`}
                style={msg.role === 'user' ? { backgroundColor: '${props.accentColor}' } : { borderColor: \`${props.accentColor}20\`, backgroundColor: \`${props.accentColor}05\` }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-4 rounded-2xl rounded-bl-sm border flex items-center gap-1" style={{ borderColor: \`${props.accentColor}20\`, backgroundColor: \`${props.accentColor}05\` }}>
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '${props.accentColor}', animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '${props.accentColor}', animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '${props.accentColor}', animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t" style={{ borderColor: \`${props.accentColor}20\` }}>
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full py-3 pl-4 pr-12 rounded-xl border outline-none text-sm transition-colors"
              style={{ borderColor: \`${props.accentColor}30\`, backgroundColor: 'transparent', color: '${props.textColor}' }}
              onFocus={(e) => e.target.style.borderColor = '${props.accentColor}'}
              onBlur={(e) => e.target.style.borderColor = \`${props.accentColor}30\`}
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 p-2 rounded-lg transition-colors disabled:opacity-50"
              style={{ color: '${props.accentColor}' }}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}`
  },
  {
    id: 'ai-smart-search',
    name: 'AI Smart Search',
    category: 'AI Features',
    defaultProps: {
      title: 'Ask our AI Assistant',
      placeholder: 'What are you looking for?',
      bgColor: '#ffffff',
      textColor: '#000000',
      accentColor: '#3b82f6',
      aiProvider: 'gemini',
      apiKey: ''
    },
    propConfig: [
      { name: 'title', label: 'Title', type: 'string' },
      { name: 'placeholder', label: 'Placeholder', type: 'string' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' },
      { name: 'accentColor', label: 'Accent Color', type: 'color' },
      { name: 'aiProvider', label: 'AI Provider', type: 'select', options: aiProviderOptions },
      { name: 'apiKey', label: 'API Key', type: 'password' }
    ],
    component: (props) => {
      const [query, setQuery] = useState('');
      const [isSearching, setIsSearching] = useState(false);
      const [result, setResult] = useState('');

      const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        setIsSearching(true);
        // Simulate AI search
        setTimeout(() => {
          setResult(`This is an AI-generated response to "${query}". In a real environment, this would connect to ${props.aiProvider} using your API key to provide intelligent answers.`);
          setIsSearching(false);
        }, 1500);
      };

      return (
        <section className="py-16" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-3 rounded-full mb-4" style={{ backgroundColor: `${props.accentColor}15`, color: props.accentColor }}>
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">{props.title}</h2>
              <p className="text-lg opacity-70">Powered by {props.aiProvider.charAt(0).toUpperCase() + props.aiProvider.slice(1)} AI</p>
            </div>
            
            <form onSubmit={handleSearch} className="relative flex items-center mb-8">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={props.placeholder}
                className="w-full py-4 pl-6 pr-16 rounded-2xl border-2 outline-none transition-colors text-lg shadow-sm"
                style={{ borderColor: `${props.accentColor}30`, backgroundColor: props.bgColor, color: props.textColor }}
                onFocus={(e) => e.target.style.borderColor = props.accentColor}
                onBlur={(e) => e.target.style.borderColor = `${props.accentColor}30`}
              />
              <button 
                type="submit"
                disabled={isSearching || !query.trim()}
                className="absolute right-2 p-3 rounded-xl text-white transition-opacity disabled:opacity-50 flex items-center justify-center"
                style={{ backgroundColor: props.accentColor }}
              >
                {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </form>

            {result && (
              <div className="p-6 rounded-2xl border leading-relaxed animate-in fade-in slide-in-from-bottom-4" style={{ borderColor: `${props.accentColor}20`, backgroundColor: `${props.accentColor}05` }}>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 mt-1 shrink-0" style={{ color: props.accentColor }} />
                  <p>{result}</p>
                </div>
              </div>
            )}
          </div>
        </section>
      );
    },
    code: (props) => `import React, { useState } from 'react';
import { Sparkles, Send, Loader2 } from 'lucide-react';

export default function AISmartSearch() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    try {
      // NOTE: To use this in production, you must use your API key
      // const apiKey = '${props.apiKey}' || process.env.API_KEY;
      // const provider = '${props.aiProvider}';
      
      // Simulated response
      setTimeout(() => {
        setResult(\`This is an AI-generated response to "\${query}". In a real environment, this would connect to ${props.aiProvider} using your API key to provide intelligent answers.\`);
        setIsSearching(false);
      }, 1500);
    } catch (error) {
      console.error("AI Error:", error);
      setIsSearching(false);
    }
  };

  return (
    <section className="py-16" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-full mb-4" style={{ backgroundColor: '${props.accentColor}15', color: '${props.accentColor}' }}>
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-4">${props.title}</h2>
          <p className="text-lg opacity-70">Powered by ${props.aiProvider.charAt(0).toUpperCase() + props.aiProvider.slice(1)} AI</p>
        </div>
        
        <form onSubmit={handleSearch} className="relative flex items-center mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="${props.placeholder}"
            className="w-full py-4 pl-6 pr-16 rounded-2xl border-2 outline-none transition-colors text-lg shadow-sm"
            style={{ borderColor: '${props.accentColor}30', backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}
            onFocus={(e) => e.target.style.borderColor = '${props.accentColor}'}
            onBlur={(e) => e.target.style.borderColor = '${props.accentColor}30'}
          />
          <button 
            type="submit"
            disabled={isSearching || !query.trim()}
            className="absolute right-2 p-3 rounded-xl text-white transition-opacity disabled:opacity-50 flex items-center justify-center"
            style={{ backgroundColor: '${props.accentColor}' }}
          >
            {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </form>

        {result && (
          <div className="p-6 rounded-2xl border leading-relaxed animate-in fade-in slide-in-from-bottom-4" style={{ borderColor: '${props.accentColor}20', backgroundColor: '${props.accentColor}05' }}>
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 mt-1 shrink-0" style={{ color: '${props.accentColor}' }} />
              <p>{result}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}`
  },
  {
    id: 'ai-image-generator',
    name: 'AI Image Generator',
    category: 'AI Features',
    defaultProps: {
      title: 'Generate Images with AI',
      subtitle: 'Describe what you want to see, and our AI will create it in seconds.',
      bgColor: '#0a0a0a',
      textColor: '#ffffff',
      accentColor: '#8b5cf6',
      aiProvider: 'gemini',
      apiKey: ''
    },
    propConfig: [
      { name: 'title', label: 'Title', type: 'string' },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' },
      { name: 'accentColor', label: 'Accent Color', type: 'color' },
      { name: 'aiProvider', label: 'AI Provider', type: 'select', options: aiProviderOptions },
      { name: 'apiKey', label: 'API Key', type: 'password' }
    ],
    component: (props) => {
      const [prompt, setPrompt] = useState('');
      const [isGenerating, setIsGenerating] = useState(false);
      const [image, setImage] = useState<string | null>(null);

      const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;
        setIsGenerating(true);
        // Simulate image generation
        setTimeout(() => {
          setImage(`https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80&seed=${encodeURIComponent(prompt)}`);
          setIsGenerating(false);
        }, 2500);
      };

      return (
        <section className="py-24" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">{props.title}</h2>
                <p className="text-lg opacity-70 mb-8">{props.subtitle}</p>
                
                <form onSubmit={handleGenerate} className="space-y-4">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="A futuristic city with flying cars at sunset, cyberpunk style..."
                    className="w-full p-4 rounded-2xl border bg-white/5 outline-none transition-colors resize-none h-32"
                    style={{ borderColor: `${props.accentColor}30`, color: props.textColor }}
                    onFocus={(e) => e.target.style.borderColor = props.accentColor}
                    onBlur={(e) => e.target.style.borderColor = `${props.accentColor}30`}
                  />
                  <button 
                    type="submit"
                    disabled={isGenerating || !prompt.trim()}
                    className="w-full py-4 rounded-xl font-semibold text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    style={{ backgroundColor: props.accentColor }}
                  >
                    {isGenerating ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</>
                    ) : (
                      <><ImageIcon className="w-5 h-5" /> Generate Image</>
                    )}
                  </button>
                </form>
              </div>
              
              <div className="relative aspect-square rounded-3xl overflow-hidden border bg-white/5 flex items-center justify-center" style={{ borderColor: `${props.accentColor}20` }}>
                {image ? (
                  <img src={image} alt="Generated" className="w-full h-full object-cover animate-in fade-in duration-700" />
                ) : isGenerating ? (
                  <div className="flex flex-col items-center gap-4 text-center p-6">
                    <Loader2 className="w-10 h-10 animate-spin" style={{ color: props.accentColor }} />
                    <p className="opacity-70">Creating your masterpiece with {props.aiProvider}...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 opacity-30">
                    <ImageIcon className="w-16 h-16" />
                    <p>Your generated image will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      );
    },
    code: (props) => `import React, { useState } from 'react';
import { Image as ImageIcon, Loader2 } from 'lucide-react';

export default function AIImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    try {
      // NOTE: To use this in production, you must use your API key
      // const apiKey = '${props.apiKey}' || process.env.API_KEY;
      // const provider = '${props.aiProvider}';
      
      // Simulated response
      setTimeout(() => {
        setImage(\`https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80&seed=\${encodeURIComponent(prompt)}\`);
        setIsGenerating(false);
      }, 2500);
    } catch (error) {
      console.error("AI Error:", error);
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-24" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">${props.title}</h2>
            <p className="text-lg opacity-70 mb-8">${props.subtitle}</p>
            
            <form onSubmit={handleGenerate} className="space-y-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A futuristic city with flying cars at sunset, cyberpunk style..."
                className="w-full p-4 rounded-2xl border bg-white/5 outline-none transition-colors resize-none h-32"
                style={{ borderColor: '${props.accentColor}30', color: '${props.textColor}' }}
                onFocus={(e) => e.target.style.borderColor = '${props.accentColor}'}
                onBlur={(e) => e.target.style.borderColor = '${props.accentColor}30'}
              />
              <button 
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className="w-full py-4 rounded-xl font-semibold text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ backgroundColor: '${props.accentColor}' }}
              >
                {isGenerating ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</>
                ) : (
                  <><ImageIcon className="w-5 h-5" /> Generate Image</>
                )}
              </button>
            </form>
          </div>
          
          <div className="relative aspect-square rounded-3xl overflow-hidden border bg-white/5 flex items-center justify-center" style={{ borderColor: '${props.accentColor}20' }}>
            {image ? (
              <img src={image} alt="Generated" className="w-full h-full object-cover animate-in fade-in duration-700" />
            ) : isGenerating ? (
              <div className="flex flex-col items-center gap-4 text-center p-6">
                <Loader2 className="w-10 h-10 animate-spin" style={{ color: '${props.accentColor}' }} />
                <p className="opacity-70">Creating your masterpiece with ${props.aiProvider}...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 opacity-30">
                <ImageIcon className="w-16 h-16" />
                <p>Your generated image will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'ai-video-generator',
    name: 'AI Video Generator',
    category: 'AI Features',
    defaultProps: {
      title: 'Text to Video AI',
      subtitle: 'Bring your ideas to life with cinematic AI video generation.',
      bgColor: '#111827',
      textColor: '#ffffff',
      accentColor: '#ec4899',
      aiProvider: 'gemini',
      apiKey: ''
    },
    propConfig: [
      { name: 'title', label: 'Title', type: 'string' },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' },
      { name: 'accentColor', label: 'Accent Color', type: 'color' },
      { name: 'aiProvider', label: 'AI Provider', type: 'select', options: aiProviderOptions },
      { name: 'apiKey', label: 'API Key', type: 'password' }
    ],
    component: (props) => {
      const [prompt, setPrompt] = useState('');
      const [isGenerating, setIsGenerating] = useState(false);
      const [videoUrl, setVideoUrl] = useState<string | null>(null);

      const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;
        setIsGenerating(true);
        // Simulate video generation
        setTimeout(() => {
          setVideoUrl(`https://www.w3schools.com/html/mov_bbb.mp4`);
          setIsGenerating(false);
        }, 3500);
      };

      return (
        <section className="py-24" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">{props.title}</h2>
            <p className="text-lg opacity-70 mb-12 max-w-2xl mx-auto">{props.subtitle}</p>
            
            <div className="relative aspect-video rounded-3xl overflow-hidden border bg-black/50 flex items-center justify-center mb-8 shadow-2xl" style={{ borderColor: `${props.accentColor}30` }}>
              {videoUrl ? (
                <video src={videoUrl} autoPlay loop muted controls className="w-full h-full object-cover animate-in fade-in duration-700" />
              ) : isGenerating ? (
                <div className="flex flex-col items-center gap-4 text-center p-6">
                  <Loader2 className="w-12 h-12 animate-spin" style={{ color: props.accentColor }} />
                  <p className="opacity-70 text-lg">Rendering video frames with {props.aiProvider}...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 opacity-40">
                  <Video className="w-20 h-20" />
                  <p className="text-lg">Your generated video will appear here</p>
                </div>
              )}
            </div>

            <form onSubmit={handleGenerate} className="relative max-w-3xl mx-auto">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A cinematic shot of a spaceship entering warp drive..."
                className="w-full py-5 pl-6 pr-40 rounded-full border-2 outline-none transition-colors text-lg shadow-lg bg-white/5"
                style={{ borderColor: `${props.accentColor}40`, color: props.textColor }}
                onFocus={(e) => e.target.style.borderColor = props.accentColor}
                onBlur={(e) => e.target.style.borderColor = `${props.accentColor}40`}
              />
              <button 
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className="absolute right-2 top-2 bottom-2 px-6 rounded-full font-semibold text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ backgroundColor: props.accentColor }}
              >
                {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                Generate
              </button>
            </form>
          </div>
        </section>
      );
    },
    code: (props) => `import React, { useState } from 'react';
import { Video, Loader2, Sparkles } from 'lucide-react';

export default function AIVideoGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    try {
      // NOTE: To use this in production, you must use your API key
      // const apiKey = '${props.apiKey}' || process.env.API_KEY;
      // const provider = '${props.aiProvider}';
      
      // Simulated response
      setTimeout(() => {
        setVideoUrl('https://www.w3schools.com/html/mov_bbb.mp4');
        setIsGenerating(false);
      }, 3500);
    } catch (error) {
      console.error("AI Error:", error);
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-24" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">${props.title}</h2>
        <p className="text-lg opacity-70 mb-12 max-w-2xl mx-auto">${props.subtitle}</p>
        
        <div className="relative aspect-video rounded-3xl overflow-hidden border bg-black/50 flex items-center justify-center mb-8 shadow-2xl" style={{ borderColor: '${props.accentColor}30' }}>
          {videoUrl ? (
            <video src={videoUrl} autoPlay loop muted controls className="w-full h-full object-cover animate-in fade-in duration-700" />
          ) : isGenerating ? (
            <div className="flex flex-col items-center gap-4 text-center p-6">
              <Loader2 className="w-12 h-12 animate-spin" style={{ color: '${props.accentColor}' }} />
              <p className="opacity-70 text-lg">Rendering video frames with ${props.aiProvider}...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 opacity-40">
              <Video className="w-20 h-20" />
              <p className="text-lg">Your generated video will appear here</p>
            </div>
          )}
        </div>

        <form onSubmit={handleGenerate} className="relative max-w-3xl mx-auto">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A cinematic shot of a spaceship entering warp drive..."
            className="w-full py-5 pl-6 pr-40 rounded-full border-2 outline-none transition-colors text-lg shadow-lg bg-white/5"
            style={{ borderColor: '${props.accentColor}40', color: '${props.textColor}' }}
            onFocus={(e) => e.target.style.borderColor = '${props.accentColor}'}
            onBlur={(e) => e.target.style.borderColor = '${props.accentColor}40'}
          />
          <button 
            type="submit"
            disabled={isGenerating || !prompt.trim()}
            className="absolute right-2 top-2 bottom-2 px-6 rounded-full font-semibold text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            style={{ backgroundColor: '${props.accentColor}' }}
          >
            {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            Generate
          </button>
        </form>
      </div>
    </section>
  );
}`
  },
  {
    id: 'ai-text-to-voice',
    name: 'AI Text to Voice',
    category: 'AI Features',
    defaultProps: {
      title: 'Text to Speech AI',
      subtitle: 'Convert any text into lifelike spoken audio.',
      bgColor: '#f8fafc',
      textColor: '#0f172a',
      accentColor: '#10b981',
      aiProvider: 'gemini',
      apiKey: ''
    },
    propConfig: [
      { name: 'title', label: 'Title', type: 'string' },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' },
      { name: 'accentColor', label: 'Accent Color', type: 'color' },
      { name: 'aiProvider', label: 'AI Provider', type: 'select', options: aiProviderOptions },
      { name: 'apiKey', label: 'API Key', type: 'password' }
    ],
    component: (props) => {
      const [text, setText] = useState('Hello! I am an AI voice assistant. Type anything here and I will read it out loud for you.');
      const [isGenerating, setIsGenerating] = useState(false);
      const [isPlaying, setIsPlaying] = useState(false);

      const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;
        setIsGenerating(true);
        // Simulate TTS generation
        setTimeout(() => {
          setIsGenerating(false);
          setIsPlaying(true);
          setTimeout(() => setIsPlaying(false), 3000); // Simulate audio playing
        }, 1500);
      };

      return (
        <section className="py-20" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 w-full">
                <div className="inline-flex items-center justify-center p-3 rounded-2xl mb-6" style={{ backgroundColor: `${props.accentColor}15`, color: props.accentColor }}>
                  <Volume2 className="w-8 h-8" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">{props.title}</h2>
                <p className="text-lg opacity-70 mb-8">{props.subtitle}</p>
                
                <form onSubmit={handleGenerate} className="space-y-4">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full p-5 rounded-2xl border-2 outline-none transition-colors resize-none h-40 text-lg"
                    style={{ borderColor: `${props.accentColor}30`, backgroundColor: 'transparent', color: props.textColor }}
                    onFocus={(e) => e.target.style.borderColor = props.accentColor}
                    onBlur={(e) => e.target.style.borderColor = `${props.accentColor}30`}
                  />
                  <button 
                    type="submit"
                    disabled={isGenerating || isPlaying || !text.trim()}
                    className="w-full py-4 rounded-xl font-semibold text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    style={{ backgroundColor: props.accentColor }}
                  >
                    {isGenerating ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Generating Audio...</>
                    ) : isPlaying ? (
                      <><Volume2 className="w-5 h-5 animate-pulse" /> Playing Audio...</>
                    ) : (
                      <><Play className="w-5 h-5 fill-current" /> Generate & Play</>
                    )}
                  </button>
                </form>
              </div>
              
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative w-48 h-48 rounded-full flex items-center justify-center border-4" style={{ borderColor: `${props.accentColor}20` }}>
                  {isPlaying && (
                    <>
                      <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: props.accentColor }}></div>
                      <div className="absolute inset-4 rounded-full animate-ping opacity-40" style={{ backgroundColor: props.accentColor, animationDelay: '150ms' }}></div>
                    </>
                  )}
                  <div className="w-24 h-24 rounded-full flex items-center justify-center z-10" style={{ backgroundColor: props.accentColor }}>
                    <Volume2 className={`w-10 h-10 text-white ${isPlaying ? 'animate-pulse' : ''}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    },
    code: (props) => `import React, { useState } from 'react';
import { Volume2, Play, Loader2 } from 'lucide-react';

export default function AITextToVoice() {
  const [text, setText] = useState('Hello! I am an AI voice assistant. Type anything here and I will read it out loud for you.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    setIsGenerating(true);
    
    try {
      // NOTE: To use this in production, you must use your API key
      // const apiKey = '${props.apiKey}' || process.env.API_KEY;
      // const provider = '${props.aiProvider}';
      
      // Simulated response
      setTimeout(() => {
        setIsGenerating(false);
        setIsPlaying(true);
        setTimeout(() => setIsPlaying(false), 3000); // Simulate audio playing
      }, 1500);
    } catch (error) {
      console.error("AI Error:", error);
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-20" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 w-full">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl mb-6" style={{ backgroundColor: '${props.accentColor}15', color: '${props.accentColor}' }}>
              <Volume2 className="w-8 h-8" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">${props.title}</h2>
            <p className="text-lg opacity-70 mb-8">${props.subtitle}</p>
            
            <form onSubmit={handleGenerate} className="space-y-4">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-5 rounded-2xl border-2 outline-none transition-colors resize-none h-40 text-lg"
                style={{ borderColor: '${props.accentColor}30', backgroundColor: 'transparent', color: '${props.textColor}' }}
                onFocus={(e) => e.target.style.borderColor = '${props.accentColor}'}
                onBlur={(e) => e.target.style.borderColor = '${props.accentColor}30'}
              />
              <button 
                type="submit"
                disabled={isGenerating || isPlaying || !text.trim()}
                className="w-full py-4 rounded-xl font-semibold text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ backgroundColor: '${props.accentColor}' }}
              >
                {isGenerating ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Generating Audio...</>
                ) : isPlaying ? (
                  <><Volume2 className="w-5 h-5 animate-pulse" /> Playing Audio...</>
                ) : (
                  <><Play className="w-5 h-5 fill-current" /> Generate & Play</>
                )}
              </button>
            </form>
          </div>
          
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative w-48 h-48 rounded-full flex items-center justify-center border-4" style={{ borderColor: '${props.accentColor}20' }}>
              {isPlaying && (
                <>
                  <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: '${props.accentColor}' }}></div>
                  <div className="absolute inset-4 rounded-full animate-ping opacity-40" style={{ backgroundColor: '${props.accentColor}', animationDelay: '150ms' }}></div>
                </>
              )}
              <div className="w-24 h-24 rounded-full flex items-center justify-center z-10" style={{ backgroundColor: '${props.accentColor}' }}>
                <Volume2 className={\`w-10 h-10 text-white \${isPlaying ? 'animate-pulse' : ''}\`} />
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
    id: 'ai-voice-to-text',
    name: 'AI Voice to Text',
    category: 'AI Features',
    defaultProps: {
      title: 'Speech Recognition',
      subtitle: 'Transcribe your voice into text instantly with high accuracy.',
      bgColor: '#ffffff',
      textColor: '#000000',
      accentColor: '#f43f5e',
      aiProvider: 'openai',
      apiKey: ''
    },
    propConfig: [
      { name: 'title', label: 'Title', type: 'string' },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' },
      { name: 'accentColor', label: 'Accent Color', type: 'color' },
      { name: 'aiProvider', label: 'AI Provider', type: 'select', options: aiProviderOptions },
      { name: 'apiKey', label: 'API Key', type: 'password' }
    ],
    component: (props) => {
      const [isRecording, setIsRecording] = useState(false);
      const [transcript, setTranscript] = useState('');

      const toggleRecording = () => {
        if (isRecording) {
          setIsRecording(false);
        } else {
          setIsRecording(true);
          setTranscript('');
          // Simulate transcription
          let currentText = '';
          const demoText = `This is a simulated transcription using ${props.aiProvider}. In a real application, this would connect to the microphone and stream audio to the AI provider using your API key.`;
          const words = demoText.split(' ');
          let i = 0;
          
          const interval = setInterval(() => {
            if (i < words.length) {
              currentText += words[i] + ' ';
              setTranscript(currentText);
              i++;
            } else {
              clearInterval(interval);
              setIsRecording(false);
            }
          }, 200);
        }
      };

      return (
        <section className="py-24" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold tracking-tight mb-4">{props.title}</h2>
            <p className="text-lg opacity-70 mb-12">{props.subtitle}</p>
            
            <button
              onClick={toggleRecording}
              className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-12 transition-all shadow-xl ${isRecording ? 'animate-pulse scale-110' : 'hover:scale-105'}`}
              style={{ backgroundColor: props.accentColor }}
            >
              {isRecording ? (
                <Square className="w-8 h-8 text-white fill-current" />
              ) : (
                <Mic className="w-10 h-10 text-white" />
              )}
            </button>

            <div className="w-full min-h-[200px] p-8 rounded-3xl border-2 text-left transition-colors" style={{ borderColor: isRecording ? props.accentColor : `${props.accentColor}20`, backgroundColor: `${props.accentColor}05` }}>
              {transcript ? (
                <p className="text-xl leading-relaxed">{transcript}</p>
              ) : (
                <p className="text-xl leading-relaxed opacity-40 italic text-center mt-12">
                  {isRecording ? 'Listening...' : 'Click the microphone to start speaking'}
                </p>
              )}
            </div>
          </div>
        </section>
      );
    },
    code: (props) => `import React, { useState } from 'react';
import { Mic, Square } from 'lucide-react';

export default function AIVoiceToText() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setTranscript('');
      
      // NOTE: To use this in production, you must use your API key
      // const apiKey = '${props.apiKey}' || process.env.API_KEY;
      // const provider = '${props.aiProvider}';
      
      // Simulate transcription
      let currentText = '';
      const demoText = \`This is a simulated transcription using ${props.aiProvider}. In a real application, this would connect to the microphone and stream audio to the AI provider using your API key.\`;
      const words = demoText.split(' ');
      let i = 0;
      
      const interval = setInterval(() => {
        if (i < words.length) {
          currentText += words[i] + ' ';
          setTranscript(currentText);
          i++;
        } else {
          clearInterval(interval);
          setIsRecording(false);
        }
      }, 200);
    }
  };

  return (
    <section className="py-24" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold tracking-tight mb-4">${props.title}</h2>
        <p className="text-lg opacity-70 mb-12">${props.subtitle}</p>
        
        <button
          onClick={toggleRecording}
          className={\`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-12 transition-all shadow-xl \${isRecording ? 'animate-pulse scale-110' : 'hover:scale-105'}\`}
          style={{ backgroundColor: '${props.accentColor}' }}
        >
          {isRecording ? (
            <Square className="w-8 h-8 text-white fill-current" />
          ) : (
            <Mic className="w-10 h-10 text-white" />
          )}
        </button>

        <div className="w-full min-h-[200px] p-8 rounded-3xl border-2 text-left transition-colors" style={{ borderColor: isRecording ? '${props.accentColor}' : '${props.accentColor}20', backgroundColor: '${props.accentColor}05' }}>
          {transcript ? (
            <p className="text-xl leading-relaxed">{transcript}</p>
          ) : (
            <p className="text-xl leading-relaxed opacity-40 italic text-center mt-12">
              {isRecording ? 'Listening...' : 'Click the microphone to start speaking'}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}`
  }
];
