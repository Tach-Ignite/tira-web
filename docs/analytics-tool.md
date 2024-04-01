# Google Analytics Documentation for Next.js

## Introduction

Google Analytics is a powerful tool provided by Google for tracking and analyzing website or app traffic. This documentation will guide you through the process of integrating Google Analytics with a Next.js application.

## Table of Contents

1. [Creating a Google Analytics Account](#creating-a-google-analytics-account)
2. [Setting Up Tracking Code in Next.js](#setting-up-tracking-code-in-nextjs)
3. [Custom Events in Next.js with Google Analytics](#Custom-Events-in-Next.js-with-Google-Analytics)
4. [Conclusion](#Conclusion)

## Creating a Google Analytics Account

To use Google Analytics with your Next.js application, you need to create a Google Analytics account. Follow these steps:

1. Go to the [Google Analytics website](https://analytics.google.com/).
2. Sign in with your Google account credentials or create a new account if you don't have one.
3. Once logged in, click on "Start for free" or "Sign up" to create a new Google Analytics account.
4. Follow the setup wizard, providing necessary information such as account name, website or app name, URL, industry category, and time zone.
5. Agree to the terms and conditions, and click on "Create."

After completing these steps, you will receive a tracking ID and tracking code snippet that you need to integrate into your Next.js application.

## Setting Up Tracking Code in Next.js

Next.js provides a simple way to integrate external scripts such as the Google Analytics tracking code into your application. Follow these steps:

1. Copy the tracking code snippet provided by Google Analytics during the account setup process.
2. Create a .env file where we will put our `Tracking_Code` value, as we do not want to show our ID to public in our project file.
3. Create a file named `GoogleAnalytics.tsx` in your root (project directory).
4. In the `GoogleAnalytics.tsx` file, add the following code.

```typescript
import Script from 'next/script';

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
      />

      <Script id='' strategy='lazyOnload'>
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              });
          `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;

```

After that, render this component in layout file.

You need to render this component is the file that will be used/rendered everytime. I’ll add this in layout.tsx file. Open layout.tsx file and import the component:

```typescript
import GoogleAnalytics from './GoogleAnalytics';
```

Then use this component above body tag:

```typescript

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <GoogleAnalytics />
      <body className={inter.className}>{children}</body>
    </html>
  );
}

```

## Custom Events in Next.js with Google Analytics

## What are Custom Events?

Custom events in Google Analytics allow you to track specific user interactions or actions on your Next.js application that are not tracked by default. These can include button clicks, form submissions, page scrolls, or any other user interactions that are important to your business goals.

`Implementing Custom Events in Next.js`

Let’s create a button with onClick handler, and add even function on button click:

```typescript

{
  const event = ({ action, category, label, value }: any) => {
      (window as any).gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    };

    const addToCart = () => {
      event({
        action: 'add_to_cart',
        category: 'ecommerce',
        label: 'Item added to cart',
        value: 'Tesla',
      });
    };

  return (
    <button onClick={addToCart}>Add to cart</button>
  )
}

```

Now, when this button is clicked, google analytics tracks the action and also shows how many times this button is clicked.

## Conclusion

Integrating Google Analytics into your Next.js application allows you to gain valuable insights into user behavior and optimize your application for better performance. By creating a Google Analytics account and implementing custom events, you can track specific user interactions and make data-driven decisions to improve the user experience.
