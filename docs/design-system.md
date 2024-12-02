# TIRA Design System

TIRA’s Design System is built around a flexible and intuitive design pattern aimed at streamlining theming and enabling easy customization. This system ensures applications built on TIRA can adapt to match their branding while maintaining visual harmony and simplicity. Below are the guiding principles and features of the TIRA design system:

## Colors

There are pre-defined color palettes that are used across system. That are

```javascript
{
  "colors": {
    "primary": {
      "light": "var(--color-primary-light)",
      "DEFAULT": "var(--color-primary)",
      "dark": "var(--color-primary-dark)"
    },
    "secondary": {
      "light": "var(--color-secondary-light)",
      "DEFAULT": "var(--color-secondary)",
      "dark": "var(--color-secondary-dark)"
    },
    "neutral": {
      "light": "var(--color-neutral-light)",
      "DEFAULT": "var(--color-neutral)",
      "800": "var(--color-neutral-800)",
      "dark": "var(--color-neutral-dark)"
    },
    "danger": {
      "light": "var(--color-danger-light)",
      "DEFAULT": "var(--color-danger)",
      "dark": "var(--color-danger-dark)"
    },
    "warning": {
      "light": "var(--color-warning-light)",
      "DEFAULT": "var(--color-warning)",
      "dark": "var(--color-warning-dark)"
    },
    "info": {
      "light": "var(--color-info-light)",
      "DEFAULT": "var(--color-info)",
      "dark": "var(--color-info-dark)"
    },
    "success": {
      "light": "var(--color-success-light)",
      "DEFAULT": "var(--color-success)"
    },
    "indigo": {
      "DEFAULT": "var(--color-indigo)",
      "dark": "var(--color-indigo-dark)"
    },
    "white": {
      "DEFAULT": "var(--color-white)",
      "dark": "var(--color-white-dark)"
    },
    "black": {
      "DEFAULT": "var(--color-black)",
      "dark": "var(--color-black-dark)"
    }
  }
}
```

### CSS variables

```css
:root {
  --foreground-rgb: 255, 255, 255;
  --background-start-rgb: 0, 0, 0;
  --background-end-rgb: 0, 0, 0;

  /* Primary Colors */
  --color-primary-light: #c3ddfd;
  --color-primary: #1a56db;
  --color-primary-dark: #1e429f;

  /* Secondary Colors */
  --color-secondary-light: #edebfe;
  --color-secondary: #6c2bd9;
  --color-secondary-dark: #4a1d96;

  /* Neutral Colors */
  --color-neutral-light: #374151;
  --color-neutral: #111928;
  --color-neutral-800: #1f2a37;
  --color-neutral-dark: #111928;

  /* Danger Colors */
  --color-danger-light: #fde8e8;
  --color-danger: #f05252;
  --color-danger-dark: #9b1c1c;

  /* Warning Colors */
  --color-warning-light: #fdf6b2;
  --color-warning: #faca15;
  --color-warning-dark: #723b13;

  /* Info Colors */
  --color-info-light: #ebf5ff;
  --color-info: #6875f5;
  --color-info-dark: #1a56db;

  /* Success Colors */
  --color-success-light: #d1e7dd;
  --color-success: #0f5132;

  /* Indigo Colors */
  --color-indigo: #5145cd;
  --color-indigo-dark: #e3a008;

  /* White and Black */
  --color-white: #ffffff;
  --color-black: #000000;
}

.dark {
  /* Primary Colors */
  --color-primary-light: #c3ddfd;
  --color-primary: #1a56db;
  --color-primary-dark: #1e429f;

  /* Secondary Colors */
  --color-secondary-light: #edebfe;
  --color-secondary: #6c2bd9;
  --color-secondary-dark: #4a1d96;

  /* Neutral Colors */
  --color-neutral-light: #374151;
  --color-neutral: #111928;
  --color-neutral-800: #1f2a37;
  --color-neutral-dark: #111928;

  /* Danger Colors */
  --color-danger-light: #fde8e8;
  --color-danger: #f05252;
  --color-danger-dark: #9b1c1c;

  /* Warning Colors */
  --color-warning-light: #fdf6b2;
  --color-warning: #faca15;
  --color-warning-dark: #723b13;

  /* Info Colors */
  --color-info-light: #ebf5ff;
  --color-info: #6875f5;
  --color-info-dark: #1a56db;

  /* Success Colors */
  --color-success-light: #d1e7dd;
  --color-success: #0f5132;

  /* Indigo Colors */
  --color-indigo: #5145cd;
  --color-indigo-dark: #e3a008;

  /* White and Black */
  --color-white: #f9fafb;
  --color-black: #ffffff;
}
```

The TIRA color palette can be extended by adding additional colors to the `colors` configuration in your `tailwind.config.ts` file. This allows for more customization to meet specific branding or design requirements.

### **Usage**

- **Primary**: Used for main actions and elements (e.g., buttons, links).
- **Secondary**: For supporting actions or highlights.
- **Neutral**: For background, borders, and typography.
- **Danger**: For errors, warnings, or destructive actions.
- **Warning**: To indicate caution or alert.
- **Info**: For informational messages or highlights.
- **Success**: To show success or confirmation states.
- **Indigo**: A utility color for accents or specific elements.
- **White/Black**: For backgrounds, contrasts, and text.

### **How to Use Colors in Code**

1.  **Backgrounds**
    ```html
    <div class="bg-primary-light">This div has a light primary background.</div>
    ```
2.  **Text**
    ```html
    <p class="text-danger-dark">
      This text uses the dark variant of the danger color.
    </p>
    ```
3.  **Borders**
    ```html
    <input class="border-info focus:border-info-dark" />
    ```
4.  **Hover States**
    ```html
    <button class="bg-success hover:bg-success-light">Hover me!</button>
    ```

### **Dark Mode Support**

TIRA includes support for dark mode. Color will auto change based on the css color variables defined under `.dark`

```html
<div class="bg-neutral-800">
  This text will adapt based on the dark mode setting.
</div>
```
