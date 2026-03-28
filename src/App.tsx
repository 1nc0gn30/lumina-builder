import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { blocks as REGISTRY, BlockDefinition } from './registry/index';
import { cn } from './lib/utils';
import appStylesHref from './index.css?url';
import { 
  Layout, Smartphone, Monitor, Tablet, Code, Plus, 
  Trash2, ArrowUp, ArrowDown, Copy, Check, X, Settings, Menu,
  ChevronDown, Dices, Shield, ShieldCheck, LogOut, Pencil, Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function IFramePreview({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: (e: React.MouseEvent) => void }) {
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (contentRef?.contentWindow?.document) {
      const doc = contentRef.contentWindow.document;

      // Ensure Tailwind/app CSS is always present in the iframe.
      if (!doc.querySelector('link[data-lumina-app-styles="true"]')) {
        const appStylesLink = doc.createElement('link');
        appStylesLink.rel = 'stylesheet';
        appStylesLink.href = appStylesHref;
        appStylesLink.setAttribute('data-lumina-app-styles', 'true');
        doc.head.appendChild(appStylesLink);
      }
      
      // Copy styles
      const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
      styles.forEach(style => {
        doc.head.appendChild(style.cloneNode(true));
      });
      
      doc.body.className = "bg-white text-black m-0 p-0 min-h-screen custom-scrollbar-dark overflow-x-hidden";
      setMountNode(doc.body);
    }
  }, [contentRef]);

  return (
    <iframe 
      ref={setContentRef} 
      className={className}
      title="Preview"
      style={{ border: 'none' }}
      onLoad={() => {
        if (contentRef?.contentWindow?.document) {
          setMountNode(contentRef.contentWindow.document.body);
        }
      }}
    >
      {mountNode && createPortal(
        <div onClick={onClick} className="min-h-screen flex flex-col">
          {children}
        </div>, 
        mountNode
      )}
    </iframe>
  );
}

interface CanvasBlock {
  id: string;
  instanceId: string;
  props: Record<string, any>;
}

interface Page {
  id: string;
  name: string;
  blocks: CanvasBlock[];
  requiresAuth?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  seoImage?: string;
  seoSlug?: string;
  seoNoIndex?: boolean;
}

const PREVIEW_AUTH_SESSION_KEY = 'lumina-preview-auth-session';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const getDefaultSeoForName = (name: string) => ({
  seoTitle: `${name} | Lumina`,
  seoDescription: `Explore ${name} built with Lumina.`,
  seoKeywords: name.toLowerCase(),
  seoImage: '',
  seoSlug: slugify(name) || 'page',
  seoNoIndex: false
});

const hasValidPreviewSession = () => {
  const raw = localStorage.getItem(PREVIEW_AUTH_SESSION_KEY);
  if (!raw) return false;
  try {
    const parsed = JSON.parse(raw) as { token?: string; expiresAt?: number };
    if (!parsed.token || !parsed.expiresAt || parsed.expiresAt <= Date.now()) {
      localStorage.removeItem(PREVIEW_AUTH_SESSION_KEY);
      return false;
    }
    return true;
  } catch {
    localStorage.removeItem(PREVIEW_AUTH_SESSION_KEY);
    return false;
  }
};

export default function App() {
  const [pages, setPages] = useState<Page[]>(() => {
    const saved = localStorage.getItem('lumina-pages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Page[];
        return parsed.map(page => {
          const defaults = getDefaultSeoForName(page.name || 'Page');
          return {
            ...page,
            requiresAuth: !!page.requiresAuth,
            seoTitle: page.seoTitle || defaults.seoTitle,
            seoDescription: page.seoDescription || defaults.seoDescription,
            seoKeywords: page.seoKeywords || defaults.seoKeywords,
            seoImage: page.seoImage || defaults.seoImage,
            seoSlug: page.seoSlug || defaults.seoSlug,
            seoNoIndex: !!page.seoNoIndex
          };
        });
      } catch (e) {
        console.error('Failed to parse saved pages', e);
      }
    }
    return [{ id: 'home', name: 'Home', blocks: [], requiresAuth: false, ...getDefaultSeoForName('Home') }];
  });
  const [currentPageId, setCurrentPageId] = useState<string>(pages[0]?.id || 'home');
  
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPagesMenuOpen, setIsPagesMenuOpen] = useState(false);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [editingPageName, setEditingPageName] = useState('');
  const [isAuthConfigOpen, setIsAuthConfigOpen] = useState(false);
  const [isSeoConfigOpen, setIsSeoConfigOpen] = useState(false);
  const [supabaseUrl, setSupabaseUrl] = useState(() => localStorage.getItem('lumina-supabase-url') || '');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(() => localStorage.getItem('lumina-supabase-anon-key') || '');
  const [isPreviewAuthenticated, setIsPreviewAuthenticated] = useState(() => hasValidPreviewSession());

  useEffect(() => {
    localStorage.setItem('lumina-pages', JSON.stringify(pages));
  }, [pages]);

  useEffect(() => {
    localStorage.setItem('lumina-supabase-url', supabaseUrl);
  }, [supabaseUrl]);

  useEffect(() => {
    localStorage.setItem('lumina-supabase-anon-key', supabaseAnonKey);
  }, [supabaseAnonKey]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIsPreviewAuthenticated(hasValidPreviewSession());
    }, 30000);
    return () => window.clearInterval(interval);
  }, []);

  const currentPage = pages.find(p => p.id === currentPageId) || pages[0];
  const blocks = currentPage.blocks;

  const updateCurrentPageBlocks = (newBlocks: CanvasBlock[]) => {
    setPages(pages.map(p => p.id === currentPageId ? { ...p, blocks: newBlocks } : p));
  };

  const addBlock = (block: BlockDefinition) => {
    const instanceId = Math.random().toString(36).substr(2, 9);
    updateCurrentPageBlocks([...blocks, { id: block.id, instanceId, props: { ...block.defaultProps } }]);
    setSelectedBlockId(instanceId);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const removeBlock = (instanceId: string) => {
    updateCurrentPageBlocks(blocks.filter(b => b.instanceId !== instanceId));
    if (selectedBlockId === instanceId) setSelectedBlockId(null);
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      const newBlocks = [...blocks];
      [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
      updateCurrentPageBlocks(newBlocks);
    } else if (direction === 'down' && index < blocks.length - 1) {
      const newBlocks = [...blocks];
      [newBlocks[index + 1], newBlocks[index]] = [newBlocks[index], newBlocks[index + 1]];
      updateCurrentPageBlocks(newBlocks);
    }
  };

  const updateBlockProp = (instanceId: string, propName: string, value: any) => {
    updateCurrentPageBlocks(blocks.map(b => b.instanceId === instanceId ? { ...b, props: { ...b.props, [propName]: value } } : b));
  };

  const addPage = () => {
    const newPageId = Math.random().toString(36).substr(2, 9);
    const newPageName = `Page ${pages.length + 1}`;
    const newPage = { id: newPageId, name: newPageName, blocks: [], requiresAuth: false, ...getDefaultSeoForName(newPageName) };
    setPages([...pages, newPage]);
    setCurrentPageId(newPageId);
    setIsPagesMenuOpen(false);
  };

  const togglePageAuth = (id: string) => {
    setPages(pages.map(page => page.id === id ? { ...page, requiresAuth: !page.requiresAuth } : page));
  };

  const setPreviewAuthSession = (authenticated: boolean) => {
    if (authenticated) {
      localStorage.setItem(PREVIEW_AUTH_SESSION_KEY, JSON.stringify({
        token: Math.random().toString(36).slice(2),
        expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000)
      }));
    } else {
      localStorage.removeItem(PREVIEW_AUTH_SESSION_KEY);
    }
    setIsPreviewAuthenticated(authenticated);
  };

  const removePage = (id: string) => {
    if (pages.length === 1) return;
    const newPages = pages.filter(p => p.id !== id);
    setPages(newPages);
    if (currentPageId === id) {
      setCurrentPageId(newPages[0].id);
    }
  };

  const startEditingPage = (page: Page) => {
    setEditingPageId(page.id);
    setEditingPageName(page.name);
  };

  const savePageName = () => {
    if (editingPageId && editingPageName.trim()) {
      const nextName = editingPageName.trim();
      setPages(pages.map(page => {
        if (page.id !== editingPageId) return page;
        const oldDefaultTitle = `${page.name} | Lumina`;
        const nextDefaultTitle = `${nextName} | Lumina`;
        const oldDefaultSlug = slugify(page.name) || 'page';
        const nextDefaultSlug = slugify(nextName) || 'page';
        return {
          ...page,
          name: nextName,
          seoTitle: !page.seoTitle || page.seoTitle === oldDefaultTitle ? nextDefaultTitle : page.seoTitle,
          seoSlug: !page.seoSlug || page.seoSlug === oldDefaultSlug ? nextDefaultSlug : page.seoSlug
        };
      }));
    }
    setEditingPageId(null);
  };

  const updateCurrentPageSeo = (patch: Partial<Page>) => {
    setPages(pages.map(page => page.id === currentPageId ? { ...page, ...patch } : page));
  };

  const handlePageNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      savePageName();
    } else if (e.key === 'Escape') {
      setEditingPageId(null);
    }
  };

  const rollDice = () => {
    const numPages = Math.floor(Math.random() * 4) + 1; // 1 to 4 pages
    const newPages: Page[] = [];
    
    for (let i = 0; i < numPages; i++) {
      const pageBlocks: CanvasBlock[] = [];
      
      // Randomly pick 3-6 components for each page
      const numBlocks = Math.floor(Math.random() * 4) + 3;
      
      // Always try to add a navbar first
      const navbars = REGISTRY.filter(b => b.category === 'Navbar');
      if (navbars.length > 0) {
        const randomNav = navbars[Math.floor(Math.random() * navbars.length)];
        pageBlocks.push({
          id: randomNav.id,
          instanceId: Math.random().toString(36).substr(2, 9),
          props: { ...randomNav.defaultProps }
        });
      }

      // Add random other blocks
      for (let j = 0; j < numBlocks - 1; j++) {
        const nonNavbars = REGISTRY.filter(b => b.category !== 'Navbar');
        const randomBlock = nonNavbars[Math.floor(Math.random() * nonNavbars.length)];
        pageBlocks.push({
          id: randomBlock.id,
          instanceId: Math.random().toString(36).substr(2, 9),
          props: { ...randomBlock.defaultProps }
        });
      }

      newPages.push({
        id: Math.random().toString(36).substr(2, 9),
        name: i === 0 ? 'Home' : `Page ${i + 1}`,
        blocks: pageBlocks,
        requiresAuth: false,
        ...getDefaultSeoForName(i === 0 ? 'Home' : `Page ${i + 1}`)
      });
    }
    
    setPages(newPages);
    setCurrentPageId(newPages[0].id);
    setSelectedBlockId(null);
  };

  const generateCode = () => {
    const iconSet = new Set<string>();
    const extraImports = new Set<string>();
    const escapeCodeString = (value: string) => value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    if (currentPage.requiresAuth) {
      extraImports.add(`import { createClient } from '@supabase/supabase-js';`);
    }
    const seoTitle = escapeCodeString((currentPage.seoTitle || `${currentPage.name} | Lumina`).trim());
    const seoDescription = escapeCodeString((currentPage.seoDescription || '').trim());
    const seoKeywords = escapeCodeString((currentPage.seoKeywords || '').trim());
    const seoImage = escapeCodeString((currentPage.seoImage || '').trim());
    const seoSlug = escapeCodeString((currentPage.seoSlug || slugify(currentPage.name) || 'page').trim());
    const seoRobots = currentPage.seoNoIndex ? 'noindex, nofollow' : 'index, follow';
    
    const componentsCode = blocks.map(b => {
      const blockDef = REGISTRY.find(r => r.id === b.id);
      if (!blockDef) return '';
      
      const componentName = `${blockDef.name.replace(/\s+/g, '')}_${b.instanceId}`;
      let code = blockDef.code(b.props);

      const importMatches = code.match(/import\s+[\s\S]*?from\s+['"].*?['"];?/g) || [];
      importMatches.forEach(importLine => {
        if (/from\s+['"]react['"]/.test(importLine)) {
          return;
        }
        if (/from\s+['"]lucide-react['"]/.test(importLine)) {
          const iconMatches = importLine.match(/\{([^}]+)\}/);
          if (iconMatches) {
            iconMatches[1].split(',').map(i => i.trim()).filter(Boolean).forEach(i => iconSet.add(i));
          }
          return;
        }
        extraImports.add(importLine.trim());
      });

      // Strip imports from component code
      code = code.replace(/import\s+[\s\S]*?from\s+['"].*?['"];?/g, '');
      
      // Replace export default function [Name] with function [componentName]
      // This handles SaasHero vs SaaSHero and other naming mismatches
      code = code.replace(/export\s+default\s+function\s+([a-zA-Z0-9_]+)/, `function ${componentName}`);
      
      return code.trim();
    }).join('\n\n');

    const lucideImport = iconSet.size ? `import { ${Array.from(iconSet).sort().join(', ')} } from 'lucide-react';\n` : '';
    const externalImports = extraImports.size ? `${Array.from(extraImports).sort().join('\n')}\n` : '';
    const imports = `import React, { useState, useRef, useEffect } from 'react';\n${lucideImport}${externalImports}\n`;
    const seoHelpers = `\nconst ensureMetaTag = (selector: string, attribute: 'name' | 'property', key: string, content: string) => {\n  if (!content) return;\n  let tag = document.querySelector(selector) as HTMLMetaElement | null;\n  if (!tag) {\n    tag = document.createElement('meta');\n    tag.setAttribute(attribute, key);\n    document.head.appendChild(tag);\n  }\n  tag.setAttribute('content', content);\n};\n\nconst applySeoMeta = () => {\n  document.title = '${seoTitle}';\n  ensureMetaTag('meta[name=\"description\"]', 'name', 'description', '${seoDescription}');\n  ensureMetaTag('meta[name=\"keywords\"]', 'name', 'keywords', '${seoKeywords}');\n  ensureMetaTag('meta[name=\"robots\"]', 'name', 'robots', '${seoRobots}');\n  ensureMetaTag('meta[property=\"og:title\"]', 'property', 'og:title', '${seoTitle}');\n  ensureMetaTag('meta[property=\"og:description\"]', 'property', 'og:description', '${seoDescription}');\n  ensureMetaTag('meta[property=\"og:image\"]', 'property', 'og:image', '${seoImage}');\n\n  const canonicalHref = '/${seoSlug}';\n  let canonical = document.querySelector('link[rel=\"canonical\"]') as HTMLLinkElement | null;\n  if (!canonical) {\n    canonical = document.createElement('link');\n    canonical.setAttribute('rel', 'canonical');\n    document.head.appendChild(canonical);\n  }\n  canonical.href = canonicalHref;\n};\n`;

    const pageBody = `<div className="min-h-screen bg-white">\n${blocks.map(b => {
      const blockDef = REGISTRY.find(r => r.id === b.id);
      return blockDef ? `      <${blockDef.name.replace(/\s+/g, '')}_${b.instanceId} />` : '';
    }).join('\n')}\n    </div>`;
    
    const pageComponent = currentPage.requiresAuth
      ? `\n\n${seoHelpers}\nconst supabase = createClient('${supabaseUrl || 'https://YOUR_PROJECT.supabase.co'}', '${supabaseAnonKey || 'YOUR_SUPABASE_ANON_KEY'}');\n\nfunction AuthScreen() {\n  const [mode, setMode] = useState<'signin' | 'signup'>('signin');\n  const [email, setEmail] = useState('');\n  const [password, setPassword] = useState('');\n  const [loading, setLoading] = useState(false);\n  const [error, setError] = useState('');\n\n  const submit = async (e: React.FormEvent) => {\n    e.preventDefault();\n    setLoading(true);\n    setError('');\n\n    try {\n      if (mode === 'signin') {\n        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });\n        if (signInError) setError(signInError.message);\n      } else {\n        const { error: signUpError } = await supabase.auth.signUp({ email, password });\n        if (signUpError) setError(signUpError.message);\n      }\n    } finally {\n      setLoading(false);\n    }\n  };\n\n  return (\n    <div className=\"min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6\">\n      <div className=\"w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-8\">\n        <h1 className=\"text-2xl font-semibold mb-2\">{mode === 'signin' ? 'Sign in' : 'Create account'}</h1>\n        <p className=\"text-sm text-white/60 mb-6\">This page is protected with Supabase Auth.</p>\n        <form onSubmit={submit} className=\"space-y-4\">\n          <input value={email} onChange={(e) => setEmail(e.target.value)} type=\"email\" placeholder=\"Email\" className=\"w-full rounded-lg border border-white/15 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-blue-500\" required />\n          <input value={password} onChange={(e) => setPassword(e.target.value)} type=\"password\" placeholder=\"Password\" className=\"w-full rounded-lg border border-white/15 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-blue-500\" required />\n          {error ? <p className=\"text-xs text-red-400\">{error}</p> : null}\n          <button type=\"submit\" disabled={loading} className=\"w-full rounded-lg bg-white text-black py-2 text-sm font-medium hover:bg-zinc-200 disabled:opacity-50\">{loading ? 'Please wait...' : mode === 'signin' ? 'Sign in' : 'Sign up'}</button>\n        </form>\n        <button onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')} className=\"w-full mt-4 text-sm text-blue-300 hover:text-blue-200\">\n          {mode === 'signin' ? 'Need an account? Sign up' : 'Already have an account? Sign in'}\n        </button>\n      </div>\n    </div>\n  );\n}\n\nexport default function GeneratedPage() {\n  const [ready, setReady] = useState(false);\n  const [authed, setAuthed] = useState(false);\n\n  useEffect(() => {\n    applySeoMeta();\n    let mounted = true;\n\n    const init = async () => {\n      const { data } = await supabase.auth.getSession();\n      if (!mounted) return;\n      setAuthed(!!data.session);\n      setReady(true);\n    };\n\n    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {\n      setAuthed(!!session);\n      setReady(true);\n    });\n\n    init();\n\n    return () => {\n      mounted = false;\n      listener.subscription.unsubscribe();\n    };\n  }, []);\n\n  if (!ready) {\n    return <div className=\"min-h-screen flex items-center justify-center text-zinc-500\">Checking session...</div>;\n  }\n\n  if (!authed) {\n    return <AuthScreen />;\n  }\n\n  return (\n    ${pageBody}\n  );\n}`
      : `\n\n${seoHelpers}\nexport default function GeneratedPage() {\n  useEffect(() => {\n    applySeoMeta();\n  }, []);\n\n  return (\n    ${pageBody}\n  );\n}`;
    
    return imports + componentsCode + pageComponent;
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Group registry by category
  const categories: Record<string, BlockDefinition[]> = {};
  REGISTRY.forEach(block => {
    if (!categories[block.category]) categories[block.category] = [];
    categories[block.category].push(block);
  });

  const selectedBlock = blocks.find(b => b.instanceId === selectedBlockId);
  const supabaseKeyLooksSecret = /service_role|sb_secret|secret/i.test(supabaseAnonKey);

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden font-sans">
      
      {/* SIDEBAR OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-72 bg-[#141414] border-r border-white/10 flex flex-col h-full transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-white rounded-md flex items-center justify-center text-black">
              <Layout className="h-5 w-5" />
            </div>
            <h1 className="font-semibold text-lg tracking-tight">Lumina</h1>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white/50 hover:text-white p-1">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto min-h-0 p-4 space-y-8 custom-scrollbar">
          {Object.entries(categories).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 px-2">{category}</h2>
              <div className="space-y-2">
                {items.map(block => (
                  <button
                    key={block.id}
                    onClick={() => addBlock(block)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group text-left border border-transparent hover:border-white/10"
                  >
                    <span className="text-sm font-medium text-white/80 group-hover:text-white">{block.name}</span>
                    <Plus className="h-4 w-4 text-white/30 group-hover:text-white/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col h-full relative min-w-0">
        
        {/* TOPBAR */}
        <div className="h-16 border-b border-white/10 flex items-center justify-between px-4 lg:px-6 bg-[#0a0a0a]/80 backdrop-blur-md z-20 shrink-0">
          <div className="flex items-center gap-2 lg:gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-white/70 hover:text-white lg:hidden rounded-md hover:bg-white/5"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center bg-[#1a1a1a] rounded-lg p-1 border border-white/5">
              <button 
                onClick={() => setViewMode('desktop')}
                className={cn(
                  "p-2 rounded-md flex items-center gap-2 text-sm font-medium transition-all",
                  viewMode === 'desktop' ? "bg-[#2a2a2a] text-white shadow-sm" : "text-white/50 hover:text-white hover:bg-white/5"
                )}
              >
                <Monitor className="h-4 w-4" />
                <span className="hidden sm:inline">Desktop</span>
              </button>
              <button 
                onClick={() => setViewMode('tablet')}
                className={cn(
                  "p-2 rounded-md flex items-center gap-2 text-sm font-medium transition-all",
                  viewMode === 'tablet' ? "bg-[#2a2a2a] text-white shadow-sm" : "text-white/50 hover:text-white hover:bg-white/5"
                )}
              >
                <Tablet className="h-4 w-4" />
                <span className="hidden sm:inline">Tablet</span>
              </button>
              <button 
                onClick={() => setViewMode('mobile')}
                className={cn(
                  "p-2 rounded-md flex items-center gap-2 text-sm font-medium transition-all",
                  viewMode === 'mobile' ? "bg-[#2a2a2a] text-white shadow-sm" : "text-white/50 hover:text-white hover:bg-white/5"
                )}
              >
                <Smartphone className="h-4 w-4" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="relative">
              <button
                onClick={() => setIsPagesMenuOpen(!isPagesMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-lg text-sm font-medium transition-colors border border-white/5 text-white/80 hover:text-white"
              >
                <Layout size={16} className="text-white/50" />
                <span className="hidden sm:inline">{currentPage.name}</span>
                <ChevronDown size={14} className="text-white/40" />
              </button>

              {isPagesMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-[#1a1a1a] rounded-xl shadow-xl border border-white/10 py-2 z-50">
                  <div className="px-3 pb-2 mb-2 border-b border-white/5 flex justify-between items-center">
                    <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Pages</span>
                    <button onClick={addPage} className="text-blue-400 hover:text-blue-300 p-1 rounded hover:bg-blue-500/10 transition-colors" title="Add Page">
                      <Plus size={14} />
                    </button>
                  </div>
                  {pages.map(page => (
                    <div key={page.id} className="flex items-center justify-between px-2 py-1 mx-1 rounded-md hover:bg-white/5 group gap-1">
                      {editingPageId === page.id ? (
                        <input
                          autoFocus
                          value={editingPageName}
                          onChange={(e) => setEditingPageName(e.target.value)}
                          onBlur={savePageName}
                          onKeyDown={handlePageNameKeyDown}
                          className="flex-1 px-2 py-1 text-sm rounded-md bg-[#2a2a2a] text-white border border-blue-500 outline-none"
                        />
                      ) : (
                        <button
                          onClick={() => {
                            setCurrentPageId(page.id);
                            setIsPagesMenuOpen(false);
                          }}
                          className={cn(
                            "flex-1 text-left px-2 py-1.5 text-sm rounded-md transition-colors truncate",
                            currentPageId === page.id ? "text-blue-400 font-medium bg-blue-500/10" : "text-white/70"
                          )}
                        >
                          {page.name}
                        </button>
                      )}
                      {editingPageId !== page.id ? (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditingPage(page);
                            }}
                            className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded opacity-0 group-hover:opacity-100 transition-all"
                            title="Rename page"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentPageId(page.id);
                              setIsSeoConfigOpen(true);
                            }}
                            className="p-1.5 text-white/40 hover:text-blue-300 hover:bg-blue-500/10 rounded opacity-0 group-hover:opacity-100 transition-all"
                            title="SEO settings"
                          >
                            <Search size={14} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              togglePageAuth(page.id);
                            }}
                            className={cn(
                              "p-1.5 rounded transition-colors opacity-0 group-hover:opacity-100",
                              page.requiresAuth ? "opacity-100 text-emerald-400 hover:bg-emerald-500/10" : "text-white/40 hover:text-emerald-300 hover:bg-emerald-500/10"
                            )}
                            title={page.requiresAuth ? 'Auth enabled for this page' : 'Enable auth for this page'}
                          >
                            {page.requiresAuth ? <ShieldCheck size={14} /> : <Shield size={14} />}
                          </button>
                          {pages.length > 1 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removePage(page.id);
                              }}
                              className="p-1.5 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsAuthConfigOpen(true)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors border",
                currentPage.requiresAuth
                  ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20"
                  : "bg-[#1a1a1a] text-white/70 border-white/5 hover:bg-[#2a2a2a] hover:text-white"
              )}
              title="Configure Supabase auth keys"
            >
              {currentPage.requiresAuth ? <ShieldCheck size={16} /> : <Shield size={16} />}
              <span className="hidden sm:inline">Auth Config</span>
            </button>

            <button
              onClick={() => setIsSeoConfigOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors border bg-[#1a1a1a] text-white/70 border-white/5 hover:bg-[#2a2a2a] hover:text-white"
              title="Configure SEO metadata for this page"
            >
              <Search size={16} />
              <span className="hidden sm:inline">SEO</span>
            </button>

            <div className="h-6 w-px bg-white/10 hidden sm:block"></div>

            <button
              onClick={rollDice}
              className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500/20 to-indigo-600/20 hover:from-purple-500/30 hover:to-indigo-600/30 text-purple-300 rounded-lg transition-all border border-purple-500/20 font-medium text-sm"
              title="I'm feeling lucky! Generate random pages."
            >
              <Dices size={16} />
              <span className="hidden sm:inline">Lucky Dip</span>
            </button>

            <div className="h-6 w-px bg-white/10 hidden sm:block"></div>

            {currentPage.requiresAuth && isPreviewAuthenticated && (
              <button
                onClick={() => setPreviewAuthSession(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25"
                title="Sign out preview auth session"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Sign Out Preview</span>
              </button>
            )}

            <button 
              onClick={() => updateCurrentPageBlocks([])}
              disabled={blocks.length === 0}
              className="p-2 text-white/50 hover:text-red-400 transition-colors disabled:opacity-30 disabled:hover:text-white/50"
              title="Clear canvas"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setShowCode(true)}
              disabled={blocks.length === 0}
              className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Code className="h-4 w-4" />
              <span className="hidden sm:inline">Export Code</span>
              <span className="sm:hidden">Export</span>
            </button>
          </div>
        </div>

        {/* CANVAS AREA */}
        <div 
          className="flex-1 overflow-y-auto min-h-0 p-4 lg:p-8 flex justify-center items-start bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:20px_20px] custom-scrollbar"
          onClick={() => setSelectedBlockId(null)}
        >
          <IFramePreview 
            className={cn(
              "transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-top h-fit",
              viewMode === 'mobile' 
                ? "w-[375px] h-[812px] bg-white rounded-[3rem] shadow-2xl border-[12px] border-[#1a1a1a] overflow-y-auto overflow-x-hidden relative custom-scrollbar-dark" 
                : viewMode === 'tablet'
                ? "w-[768px] h-[1024px] bg-white rounded-[3rem] shadow-2xl border-[12px] border-[#1a1a1a] overflow-y-auto overflow-x-hidden relative custom-scrollbar-dark"
                : "w-full max-w-[1400px] bg-white rounded-xl shadow-2xl overflow-hidden min-h-[800px]"
            )}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedBlockId(null);
            }}
          >
            {currentPage.requiresAuth && !isPreviewAuthenticated ? (
              <div className="h-full w-full flex items-center justify-center bg-zinc-950 text-white min-h-[800px] p-6">
                <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-8">
                  <div className="inline-flex items-center gap-2 text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-5">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Protected Page
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Sign in required</h3>
                  <p className="text-sm text-white/60 mb-6">
                    This page is marked as auth-only. In exported code, Supabase session checks control access.
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={() => setPreviewAuthSession(true)}
                      className="w-full rounded-lg bg-white text-black py-2.5 text-sm font-medium hover:bg-zinc-200"
                    >
                      Sign in (Preview)
                    </button>
                    <button
                      onClick={() => setPreviewAuthSession(true)}
                      className="w-full rounded-lg border border-white/15 bg-transparent py-2.5 text-sm font-medium hover:bg-white/5"
                    >
                      Sign up (Preview)
                    </button>
                  </div>
                  <p className="text-xs text-white/40 mt-5">
                    Preview session stays valid for 7 days unless you sign out.
                  </p>
                </div>
              </div>
            ) : blocks.length === 0 ? (
              <div className="h-full w-full flex flex-col items-center justify-center text-gray-400 p-12 text-center min-h-[800px]">
                <Layout className="h-16 w-16 mb-6 text-gray-200" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Your canvas is empty</h3>
                <p className="max-w-sm">Select components from the sidebar to start building your high-end website.</p>
              </div>
            ) : (
              <div className="flex flex-col w-full bg-white text-black">
                <AnimatePresence>
                  {blocks.map((block, index) => {
                    const blockDef = REGISTRY.find(r => r.id === block.id);
                    if (!blockDef) return null;
                    
                    return (
                      <motion.div 
                        key={block.instanceId}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="group relative w-full cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBlockId(block.instanceId);
                        }}
                      >
                        {/* Hover Controls */}
                        <div className="absolute top-4 right-4 z-[60] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-black/90 text-white p-1 rounded-lg shadow-xl backdrop-blur-sm scale-95 group-hover:scale-100">
                          <button 
                            onClick={(e) => { e.stopPropagation(); moveBlock(index, 'up'); }}
                            disabled={index === 0}
                            className="p-2 hover:bg-white/20 rounded-md disabled:opacity-30 transition-colors"
                          >
                            <ArrowUp className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); moveBlock(index, 'down'); }}
                            disabled={index === blocks.length - 1}
                            className="p-2 hover:bg-white/20 rounded-md disabled:opacity-30 transition-colors"
                          >
                            <ArrowDown className="h-4 w-4" />
                          </button>
                          <div className="w-px h-4 bg-white/20 mx-1"></div>
                          <button 
                            onClick={(e) => { e.stopPropagation(); removeBlock(block.instanceId); }}
                            className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-md transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        {/* Component Render */}
                        <div className={cn(
                          "transition-all duration-200",
                          selectedBlockId === block.instanceId ? "ring-4 ring-blue-500 ring-inset" : ""
                        )}>
                          <blockDef.component {...block.props} />
                        </div>
                        
                        {/* Overlay for selection effect */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/50 pointer-events-none transition-colors z-40"></div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </IFramePreview>
        </div>
      </div>

      {/* RIGHT SIDEBAR - PROPERTIES */}
      <AnimatePresence>
        {selectedBlock && (() => {
          const selectedBlockDef = REGISTRY.find(r => r.id === selectedBlock.id);
          if (!selectedBlockDef) return null;

          return (
            <>
              {/* Mobile Overlay for Properties Drawer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                onClick={() => setSelectedBlockId(null)}
              />
              
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 right-0 w-80 lg:relative lg:w-80 lg:translate-x-0 bg-[#141414] border-l border-white/10 flex flex-col h-full z-50 shrink-0 shadow-2xl lg:shadow-none"
              >
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-white/70" />
                    <h2 className="font-semibold text-sm">Properties</h2>
                  </div>
                  <button onClick={() => setSelectedBlockId(null)} className="text-white/50 hover:text-white p-1 rounded-md hover:bg-white/10">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                  <div className="mb-6 pb-4 border-b border-white/10">
                    <h3 className="text-lg font-medium text-white">{selectedBlockDef.name}</h3>
                    <p className="text-xs text-white/50 mt-1">Edit the properties below to customize this component.</p>
                  </div>

                  {selectedBlockDef.category === 'Payments' ? (
                    <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 space-y-2">
                      <p className="text-sm text-blue-100 font-medium">Stripe Setup Guide</p>
                      <p className="text-xs text-blue-100/90">
                        1. Use `pk_...` publishable key and Stripe `priceId`.
                      </p>
                      <p className="text-xs text-blue-100/90">
                        2. If `Attach User ID` is on, send `userId` and `userIdParamName` to your checkout API.
                      </p>
                      <p className="text-xs text-blue-100/90">
                        3. In `checkout.session.completed` webhook, read `metadata.user_id` to grant access.
                      </p>
                      {String(selectedBlock.props.publishableKey || '').startsWith('sk_') ? (
                        <p className="text-xs text-red-300">
                          Security warning: this looks like a Stripe secret key (`sk_...`). Use publishable key (`pk_...`) only.
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                
                {selectedBlockDef.propConfig.map(config => (
                  <div key={config.name} className="space-y-2">
                    <label className="text-xs font-medium text-white/70">{config.label}</label>
                    {config.type === 'string' || config.type === 'image' || config.type === 'color' || config.type === 'password' ? (
                      <div className="flex items-center gap-2">
                        {config.type === 'color' && (
                          <input 
                            type="color"
                            value={selectedBlock.props[config.name] || '#ffffff'}
                            onChange={(e) => updateBlockProp(selectedBlock.instanceId, config.name, e.target.value)}
                            className="w-8 h-8 rounded cursor-pointer bg-transparent border-0 p-0"
                          />
                        )}
                        <input 
                          type={config.type === 'password' ? 'password' : 'text'}
                          value={selectedBlock.props[config.name] || ''}
                          onChange={(e) => updateBlockProp(selectedBlock.instanceId, config.name, e.target.value)}
                          className="flex-1 bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white"
                          placeholder={config.label}
                        />
                      </div>
                    ) : config.type === 'text' ? (
                      <textarea 
                        value={selectedBlock.props[config.name] || ''}
                        onChange={(e) => updateBlockProp(selectedBlock.instanceId, config.name, e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 min-h-[100px] text-white resize-y"
                        placeholder={config.label}
                      />
                    ) : config.type === 'boolean' ? (
                      <label className="inline-flex items-center gap-2 text-sm text-white/80">
                        <input
                          type="checkbox"
                          checked={!!selectedBlock.props[config.name]}
                          onChange={(e) => updateBlockProp(selectedBlock.instanceId, config.name, e.target.checked)}
                          className="h-4 w-4 rounded border-white/20 bg-white/5"
                        />
                        Enable
                      </label>
                    ) : config.type === 'select' ? (
                      <select
                        value={selectedBlock.props[config.name] || ''}
                        onChange={(e) => updateBlockProp(selectedBlock.instanceId, config.name, e.target.value)}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white"
                      >
                        <option value="" disabled>Select {config.label}</option>
                        {config.options?.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    ) : null}
                  </div>
                ))}
                </div>
              </motion.div>
            </>
          );
        })()}
      </AnimatePresence>

      {/* SEO CONFIG MODAL */}
      <AnimatePresence>
        {isSeoConfigOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSeoConfigOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#141414] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#1a1a1a]">
                <div className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-blue-300" />
                  <h3 className="font-medium">Page SEO Settings</h3>
                </div>
                <button
                  onClick={() => setIsSeoConfigOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6 space-y-5">
                <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 text-sm text-blue-100">
                  SEO is saved per page and included in exported code. Defaults are prefilled so non-technical users can publish quickly.
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-white/70">Page Name</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentPage.name}
                      onChange={(e) => {
                        const nextName = e.target.value;
                        setPages(pages.map(page => page.id === currentPageId ? { ...page, name: nextName } : page));
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 text-white"
                    />
                    <button
                      onClick={() => startEditingPage(currentPage)}
                      className="px-3 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                      title="Quick rename"
                    >
                      <Pencil className="h-4 w-4 text-white/70" />
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-white/70">SEO Title</label>
                  <input
                    type="text"
                    value={currentPage.seoTitle || ''}
                    onChange={(e) => updateCurrentPageSeo({ seoTitle: e.target.value })}
                    placeholder="Home | Lumina"
                    className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-white/70">SEO Description</label>
                  <textarea
                    value={currentPage.seoDescription || ''}
                    onChange={(e) => updateCurrentPageSeo({ seoDescription: e.target.value })}
                    placeholder="Describe this page for search engines."
                    className="w-full min-h-[84px] bg-white/5 border border-white/10 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 text-white resize-y"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-white/70">Keywords</label>
                    <input
                      type="text"
                      value={currentPage.seoKeywords || ''}
                      onChange={(e) => updateCurrentPageSeo({ seoKeywords: e.target.value })}
                      placeholder="landing, product, saas"
                      className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-white/70">Slug</label>
                    <input
                      type="text"
                      value={currentPage.seoSlug || ''}
                      onChange={(e) => updateCurrentPageSeo({ seoSlug: slugify(e.target.value) })}
                      placeholder="home"
                      className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-white/70">Open Graph Image URL</label>
                  <input
                    type="text"
                    value={currentPage.seoImage || ''}
                    onChange={(e) => updateCurrentPageSeo({ seoImage: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 text-white"
                  />
                </div>
                <label className="flex items-center gap-3 text-sm text-white/80">
                  <input
                    type="checkbox"
                    checked={!!currentPage.seoNoIndex}
                    onChange={(e) => updateCurrentPageSeo({ seoNoIndex: e.target.checked })}
                    className="h-4 w-4 rounded border-white/20 bg-white/5"
                  />
                  Hide this page from search engines (`noindex`)
                </label>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* AUTH CONFIG MODAL */}
      <AnimatePresence>
        {isAuthConfigOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAuthConfigOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#141414] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#1a1a1a]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-300" />
                  <h3 className="font-medium">Supabase Auth Config</h3>
                </div>
                <button
                  onClick={() => setIsAuthConfigOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6 space-y-5">
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-100">
                  Enable auth per page from the Pages menu shield icon. Exported code will gate protected pages by Supabase session.
                </div>
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-amber-100">
                  Security note: only use Supabase `anon` public key here. Never paste `service_role` or secret keys.
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-white/70">Supabase URL</label>
                  <input
                    type="text"
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                    placeholder="https://your-project.supabase.co"
                    className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-white/70">Supabase Anon Key</label>
                  <input
                    type="password"
                    value={supabaseAnonKey}
                    onChange={(e) => setSupabaseAnonKey(e.target.value)}
                    placeholder="eyJhbGciOi..."
                    className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 text-white"
                  />
                  {supabaseKeyLooksSecret ? (
                    <p className="text-xs text-red-300">
                      This key looks like a secret/admin key. Replace with a public `anon` key to avoid security risk.
                    </p>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CODE EXPORT MODAL */}
      <AnimatePresence>
        {showCode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCode(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-[#141414] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#1a1a1a]">
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-white/70" />
                  <h3 className="font-medium">React + Tailwind Code</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={copyCode}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
                  >
                    {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                    {copied ? 'Copied!' : 'Copy Code'}
                  </button>
                  <button 
                    onClick={() => setShowCode(false)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-auto min-h-0 p-6 bg-[#0a0a0a]">
                <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                  <code>{generateCode()}</code>
                </pre>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
