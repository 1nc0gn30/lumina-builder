import React, { useMemo } from 'react';
import { CreditCard, Lock, ShieldCheck } from 'lucide-react';
import { BlockDefinition } from './types';

const userIdSourceOptions = [
  { label: 'Auth Context', value: 'auth_context' },
  { label: 'URL Query Param', value: 'query_param' },
  { label: 'Custom User ID', value: 'custom' },
];

export const stripe: BlockDefinition[] = [
  {
    id: 'stripe-checkout-cta',
    name: 'Stripe Checkout CTA',
    category: 'Payments',
    defaultProps: {
      title: 'Start your premium plan',
      subtitle: 'Secure Stripe checkout with one click.',
      buttonText: 'Continue to Checkout',
      publishableKey: '',
      priceId: '',
      successUrl: 'https://example.com/success',
      cancelUrl: 'https://example.com/cancel',
      attachUserId: false,
      userIdSource: 'auth_context',
      userIdParamName: 'user_id',
      customUserId: '',
      bgColor: '#0a0a0a',
      textColor: '#ffffff',
      accentColor: '#635bff',
    },
    propConfig: [
      { name: 'title', label: 'Title', type: 'string' },
      { name: 'subtitle', label: 'Subtitle', type: 'string' },
      { name: 'buttonText', label: 'Button Text', type: 'string' },
      { name: 'publishableKey', label: 'Stripe Publishable Key', type: 'password' },
      { name: 'priceId', label: 'Stripe Price ID', type: 'password' },
      { name: 'successUrl', label: 'Success URL', type: 'string' },
      { name: 'cancelUrl', label: 'Cancel URL', type: 'string' },
      { name: 'attachUserId', label: 'Attach User ID', type: 'boolean' },
      { name: 'userIdSource', label: 'User ID Source', type: 'select', options: userIdSourceOptions },
      { name: 'userIdParamName', label: 'User ID Param Name', type: 'string' },
      { name: 'customUserId', label: 'Custom User ID', type: 'string' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' },
      { name: 'accentColor', label: 'Accent Color', type: 'color' },
    ],
    component: (props) => {
      return (
        <section className="py-20 px-6" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
          <div className="max-w-4xl mx-auto rounded-3xl border p-8 lg:p-10" style={{ borderColor: `${props.accentColor}40` }}>
            <div className="flex items-center gap-2 text-xs mb-4" style={{ color: props.accentColor }}>
              <Lock className="h-3.5 w-3.5" />
              Stripe Checkout
            </div>
            <h3 className="text-3xl font-semibold tracking-tight mb-3">{props.title}</h3>
            <p className="opacity-75 mb-6">{props.subtitle}</p>
            <button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: props.accentColor, color: '#ffffff' }}
            >
              <CreditCard className="h-4 w-4" />
              {props.buttonText}
            </button>
          </div>
        </section>
      );
    },
    code: (props) => `import { loadStripe } from '@stripe/stripe-js';
import { CreditCard } from 'lucide-react';

const stripePromise = loadStripe('${props.publishableKey}');

const getUserIdFromSupabaseStorage = () => {
  try {
    const authKey = Object.keys(localStorage).find((key) => key.startsWith('sb-') && key.endsWith('-auth-token'));
    if (!authKey) return '';
    const raw = localStorage.getItem(authKey);
    if (!raw) return '';
    const parsed = JSON.parse(raw);
    return parsed?.user?.id || parsed?.currentSession?.user?.id || '';
  } catch {
    return '';
  }
};

const resolveCheckoutUserId = () => {
  if (!${props.attachUserId ? 'true' : 'false'}) return '';

  const source = '${props.userIdSource}';
  const queryParam = '${props.userIdParamName || 'user_id'}';

  if (source === 'custom') {
    return '${props.customUserId || ''}'.trim();
  }

  if (source === 'query_param') {
    return new URLSearchParams(window.location.search).get(queryParam) || '';
  }

  return (
    String((window as any).__LUMINA_AUTH_USER_ID__ || '') ||
    getUserIdFromSupabaseStorage() ||
    new URLSearchParams(window.location.search).get(queryParam) ||
    ''
  );
};

const appendUserIdToUrl = (baseUrl: string, userId: string, paramName: string) => {
  if (!baseUrl || !userId) return baseUrl;
  const url = new URL(baseUrl, window.location.origin);
  url.searchParams.set(paramName, userId);
  return url.toString();
};

export default function StripeCheckoutCTA() {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    if (!stripe) return;

    const userId = resolveCheckoutUserId();
    const userIdParamName = '${props.userIdParamName || 'user_id'}';
    const successUrl = appendUserIdToUrl('${props.successUrl}', userId, userIdParamName);
    const cancelUrl = appendUserIdToUrl('${props.cancelUrl}', userId, userIdParamName);

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceId: '${props.priceId}',
        successUrl,
        cancelUrl,
        userId,
        userIdParamName
      })
    });

    const data = await response.json();
    if (data.sessionId) {
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    }
  };

  return (
    <section className="py-20 px-6" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <div className="max-w-4xl mx-auto rounded-3xl border p-8 lg:p-10" style={{ borderColor: '${props.accentColor}40' }}>
        <div className="flex items-center gap-2 text-xs mb-4" style={{ color: '${props.accentColor}' }}>
          <CreditCard className="h-3.5 w-3.5" />
          Stripe Checkout
        </div>
        <h3 className="text-3xl font-semibold tracking-tight mb-3">${props.title}</h3>
        <p className="opacity-75 mb-8">${props.subtitle}</p>
        <button onClick={handleCheckout} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-transform hover:scale-[1.02]" style={{ backgroundColor: '${props.accentColor}', color: '#ffffff' }}>
          <CreditCard className="h-4 w-4" />
          ${props.buttonText}
        </button>
      </div>
    </section>
  );
}`
  },
  {
    id: 'stripe-pricing-hero',
    name: 'Stripe Pricing Hero',
    category: 'Payments',
    defaultProps: {
      planName: 'Pro',
      price: '$39',
      interval: 'month',
      feature1: 'Unlimited projects',
      feature2: 'Priority support',
      feature3: 'Advanced analytics',
      ctaText: 'Subscribe',
      publishableKey: '',
      priceId: '',
      successUrl: 'https://example.com/success',
      cancelUrl: 'https://example.com/cancel',
      attachUserId: false,
      userIdSource: 'auth_context',
      userIdParamName: 'user_id',
      customUserId: '',
      accentColor: '#635bff',
      bgColor: '#ffffff',
      textColor: '#0a0a0a',
    },
    propConfig: [
      { name: 'planName', label: 'Plan Name', type: 'string' },
      { name: 'price', label: 'Price', type: 'string' },
      { name: 'interval', label: 'Billing Interval', type: 'string' },
      { name: 'feature1', label: 'Feature 1', type: 'string' },
      { name: 'feature2', label: 'Feature 2', type: 'string' },
      { name: 'feature3', label: 'Feature 3', type: 'string' },
      { name: 'ctaText', label: 'CTA Text', type: 'string' },
      { name: 'publishableKey', label: 'Stripe Publishable Key', type: 'password' },
      { name: 'priceId', label: 'Stripe Price ID', type: 'password' },
      { name: 'successUrl', label: 'Success URL', type: 'string' },
      { name: 'cancelUrl', label: 'Cancel URL', type: 'string' },
      { name: 'attachUserId', label: 'Attach User ID', type: 'boolean' },
      { name: 'userIdSource', label: 'User ID Source', type: 'select', options: userIdSourceOptions },
      { name: 'userIdParamName', label: 'User ID Param Name', type: 'string' },
      { name: 'customUserId', label: 'Custom User ID', type: 'string' },
      { name: 'accentColor', label: 'Accent Color', type: 'color' },
      { name: 'bgColor', label: 'Background Color', type: 'color' },
      { name: 'textColor', label: 'Text Color', type: 'color' },
    ],
    component: (props) => {
      const features = useMemo(() => [props.feature1, props.feature2, props.feature3].filter(Boolean), [props.feature1, props.feature2, props.feature3]);
      return (
        <section className="py-20 px-6" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
          <div className="max-w-md mx-auto rounded-3xl border p-8 shadow-xl" style={{ borderColor: `${props.accentColor}35` }}>
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs mb-6" style={{ backgroundColor: `${props.accentColor}15`, color: props.accentColor }}>
              <ShieldCheck className="h-3.5 w-3.5" />
              Stripe secured billing
            </div>
            <h3 className="text-2xl font-semibold mb-2">{props.planName}</h3>
            <p className="text-4xl font-bold mb-6">{props.price}<span className="text-base font-medium opacity-60">/{props.interval}</span></p>
            <ul className="space-y-3 mb-8">
              {features.map((feature: string) => (
                <li key={feature} className="text-sm opacity-80">• {feature}</li>
              ))}
            </ul>
            <button className="w-full rounded-xl py-3 text-sm font-semibold text-white" style={{ backgroundColor: props.accentColor }}>
              {props.ctaText}
            </button>
          </div>
        </section>
      );
    },
    code: (props) => `import { loadStripe } from '@stripe/stripe-js';
import { ShieldCheck } from 'lucide-react';

const stripePromise = loadStripe('${props.publishableKey}');

const getUserIdFromSupabaseStorage = () => {
  try {
    const authKey = Object.keys(localStorage).find((key) => key.startsWith('sb-') && key.endsWith('-auth-token'));
    if (!authKey) return '';
    const raw = localStorage.getItem(authKey);
    if (!raw) return '';
    const parsed = JSON.parse(raw);
    return parsed?.user?.id || parsed?.currentSession?.user?.id || '';
  } catch {
    return '';
  }
};

const resolveCheckoutUserId = () => {
  if (!${props.attachUserId ? 'true' : 'false'}) return '';

  const source = '${props.userIdSource}';
  const queryParam = '${props.userIdParamName || 'user_id'}';

  if (source === 'custom') {
    return '${props.customUserId || ''}'.trim();
  }

  if (source === 'query_param') {
    return new URLSearchParams(window.location.search).get(queryParam) || '';
  }

  return (
    String((window as any).__LUMINA_AUTH_USER_ID__ || '') ||
    getUserIdFromSupabaseStorage() ||
    new URLSearchParams(window.location.search).get(queryParam) ||
    ''
  );
};

const appendUserIdToUrl = (baseUrl: string, userId: string, paramName: string) => {
  if (!baseUrl || !userId) return baseUrl;
  const url = new URL(baseUrl, window.location.origin);
  url.searchParams.set(paramName, userId);
  return url.toString();
};

export default function StripePricingHero() {
  const features = ['${props.feature1}', '${props.feature2}', '${props.feature3}'].filter(Boolean);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    if (!stripe) return;

    const userId = resolveCheckoutUserId();
    const userIdParamName = '${props.userIdParamName || 'user_id'}';
    const successUrl = appendUserIdToUrl('${props.successUrl}', userId, userIdParamName);
    const cancelUrl = appendUserIdToUrl('${props.cancelUrl}', userId, userIdParamName);

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceId: '${props.priceId}',
        successUrl,
        cancelUrl,
        userId,
        userIdParamName
      })
    });

    const { sessionId } = await response.json();
    if (sessionId) await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <section className="py-20 px-6" style={{ backgroundColor: '${props.bgColor}', color: '${props.textColor}' }}>
      <div className="max-w-md mx-auto rounded-3xl border p-8 shadow-xl" style={{ borderColor: '${props.accentColor}35' }}>
        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs mb-6" style={{ backgroundColor: '${props.accentColor}15', color: '${props.accentColor}' }}>
          <ShieldCheck className="h-3.5 w-3.5" />
          Stripe secured billing
        </div>
        <h3 className="text-2xl font-semibold mb-2">${props.planName}</h3>
        <p className="text-4xl font-bold mb-6">${props.price}<span className="text-base font-medium opacity-60">/${props.interval}</span></p>
        <ul className="space-y-3 mb-8">
          {features.map((feature) => (
            <li key={feature} className="text-sm opacity-80">• {feature}</li>
          ))}
        </ul>
        <button onClick={handleCheckout} className="w-full rounded-xl py-3 text-sm font-semibold text-white" style={{ backgroundColor: '${props.accentColor}' }}>
          ${props.ctaText}
        </button>
      </div>
    </section>
  );
}`
  },
];
