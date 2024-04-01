# CAPTCHA Integration in Reference Architecture(RA)

In RA, CAPTCHA is implemented as a common module that can be plugged into different CAPTCHA providers like Google reCAPTCHA, AWS WAF, and others.

## Current Implementation

RA uses [reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3) to prevent spam and abuse. This is a non-intrusive CAPTCHA that does not require any user interaction. We use a `<script>` tag to handle the integration of CAPTCHA.

## Usage

There are three main concepts for utilising this capability:

### 1. Injecting the CAPTCHA Script

In layout.tsx, add the following script tag to inject the necessary JavaScript functions for generating tokens from the frontend:

```typescript
...
     <Script
        type="text/javascript"
        src={process.env.CAPTCHA_SCRIPT_URL}
        defer
      />
...
```

### 2. Custom Hook: useCaptcha

RA includes a custom hook called useCaptcha located in @hooks/useCaptcha.tsx. This hook provides a function getCaptchaToken to obtain the token from the CAPTCHA provider.

```
import { useCaptcha } from '@hooks/useCaptcha';

....
const { getCaptchaToken } = useCaptcha();


const postData = async (formData) => {
  const captchaToken = await getCaptchaToken("formSubmit");
  post("create/data", {...fromData, captchaToken);
}

...
```

### 3. Sending the Token for Validation

Send the token received from the CAPTCHA provider to the server along with the payload for validation:

```typescript
import { validateCaptcha } from '@services/captcha/validateCaptcha';
...

export const createData = async (
  data: DataType & { captchaToken: string },
) => {
  const { captchaToken } = data;
  if (!captchaToken) {
    return {
      error: {
        message: 'Captcha validation failed',
      },
    };
  }
  const validateResponse = await validateCaptcha(captchaToken);
  if (!validateResponse.success) {
    return {
      error: {
        message: 'Captcha validation failed',
      },
    };
  }
  return post('create/data', {
    ...data,
  });
};
...

```

In the validateCaptcha function, you should include the logic to verify the client-generated token with the given CAPTCHA provider.

### Environment Variables

The following environment variables must be set for the CAPTCHA integration to work:

- `CAPTCHA_PROVIDER`: Key to select which CAPTCHA provider to use. Currently, we support `google` and `fake`(local testing provider).
- `CAPTCHA_SCRIPT_URL`: Key to inject the JS file from the CAPTCHA provider in the head.
- `GOOGLE_RECAPTCHA_SITE_KEY`: Key used on the front-end to generate the reCAPTCHA token from the Google reCAPTCHA provider.
- `GOOGLE_RECAPTCHA_SECRET_KEY`: Key used on the back-end to validate the reCAPTCHA token from the Google reCAPTCHA provider.

These keys can be obtained from the [Google Recaptcha Admin Console](https://www.google.com/recaptcha/admin/create).
