import React from 'react';
import 'modern-normalize/modern-normalize.css';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Setup from './setup';

const App = React.lazy(() => import('./app'));

Setup.construct()
  .then(() => {
    const container = document.getElementById('root');
    const app = (
      <React.Suspense fallback="">
        <App />
      </React.Suspense>
    );
    const root = createRoot(container);
    root.render(app);
  });


reportWebVitals();
