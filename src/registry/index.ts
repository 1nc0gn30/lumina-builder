import { BlockDefinition } from './types';
import { heroes } from './heroes';
import { features } from './features';
import { pricing } from './pricing';
import { footers } from './footers';
import { stats } from './stats';
import { faqs } from './faqs';
import { team } from './team';
import { newsletters } from './newsletters';
import { testimonials } from './testimonials';
import { navbars } from './navbars';
import { ai } from './ai';
import { stripe } from './stripe';
import { growth } from './growth';

export const blocks: BlockDefinition[] = [
  ...navbars,
  ...heroes,
  ...features,
  ...pricing,
  ...footers,
  ...stats,
  ...faqs,
  ...team,
  ...newsletters,
  ...testimonials,
  ...ai,
  ...stripe,
  ...growth
];

export * from './types';
