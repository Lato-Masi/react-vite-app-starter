
import fs from 'fs';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './src/App';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const routesToPrerender = ['/', '/welcome'];

const distPath = path.resolve(__dirname, 'dist');

if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath);
}

const queryClient = new QueryClient();

routesToPrerender.forEach(route => {
  const appHtml = renderToString(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <StaticRouter location={route}>
          <App />
        </StaticRouter>
      </QueryClientProvider>
    </Provider>
  );

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + React + TS</title>
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <!--app-script-->
      </body>
    </html>
  `;

  const folderPath = path.join(distPath, route);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  fs.writeFileSync(path.join(folderPath, 'index.html'), html);
});

console.log('Prerendering complete.');
