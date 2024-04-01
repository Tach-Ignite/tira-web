# Favicons

Our favicons are designed for maximum compatibility across platforms, including desktop, iOS, and Android.

## Files

Place the following files in the `app` folder of your project:

- [favicon.ico](../apps/web/src/app/favicon.ico) - 48px by 48px
- [icon.svg](../apps/web/src/app/icon.svg)
- [apple-icon.png](../apps/web/src/app/apple-icon.png) - 192px by 192px
- [manifest.ts](../apps/web/src/app/manifest.ts) - contains site and icon information for PWA compatibility

Place the following files in the `public` folder of your project:

- [android-chrome-192x192.png](../apps/web/public/android-chrome-192x192.png) - 192px by 192px
- [android-chrome-512x512.png](../apps/web/public/android-chrome-512x512.png) - 512px by 512px

## manifest.ts Example

```ts
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TachIgnite',
    description: 'TIRA WEB App',
    short_name: 'TIRA',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#33edf5',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
```

This will generate the following link elements in the rendered html document:

```html
<html>
  <head>
    ...
    <link rel="manifest" href="/manifest.webmanifest" />
    <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="48x48" />
    <link
      rel="icon"
      href="/icon.svg?f4ac04897a3b2294"
      type="image/svg+xml"
      sizes="any"
    />
    <link
      rel="apple-touch-icon"
      href="/apple-icon.png?ebbb82dc3cc1b5eb"
      type="image/png"
      sizes="180x180"
    />
    ...
  </head>
</html>
```

For further details, you can refer to the [Next.js manifest documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest) and [Next.js favicons documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons).
