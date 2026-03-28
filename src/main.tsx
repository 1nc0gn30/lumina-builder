import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';

const mountApp = () => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
};

const waitForStylesheets = async () => {
  const links = Array.from(
    document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'),
  );

  if (links.length === 0) {
    return;
  }

  await Promise.all(
    links.map(
      (link) =>
        new Promise<void>((resolve) => {
          // If the stylesheet is already parsed, proceed immediately.
          if (link.sheet) {
            resolve();
            return;
          }

          const done = () => {
            link.removeEventListener('load', done);
            link.removeEventListener('error', done);
            resolve();
          };

          link.addEventListener('load', done, {once: true});
          link.addEventListener('error', done, {once: true});
        }),
    ),
  );
};

void waitForStylesheets().finally(mountApp);
