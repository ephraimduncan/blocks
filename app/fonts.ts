import localFont from 'next/font/local';

export const fontSans = localFont({
  src: '../public/font/font-medium.otf',
  variable: '--font-sans',
  fallback: ['DM Sans', 'system-ui', 'sans-serif'],
});

export const fontMono = localFont({
  src: '../public/font/BerkeleyMonoVariable.woff2',
  variable: '--font-mono',
  display: 'swap',
  fallback: [
    'SF Mono',
    'Monaco',
    'Consolas',
    'Ubuntu Mono',
    'Liberation Mono',
    'Courier New',
    'monospace',
  ],
});
