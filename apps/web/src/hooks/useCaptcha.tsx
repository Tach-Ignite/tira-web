/* eslint-disable no-unused-vars */

'use client';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

const generateRandomToken = () => Math.random().toString(36).substring(2);

const getGoogleCaptchaToken = async (action: string) => {
  const token = await window?.grecaptcha?.execute(
    process.env.GOOGLE_RECAPTCHA_SITE_KEY,
    { action },
  );
  return token;
};

const getFakeCaptchaToken = async () => generateRandomToken();

const useRecaptcha = () => {
  const getCaptchaToken = (action: string) => {
    switch (process.env.CAPTCHA_PROVIDER) {
      case 'google':
        return getGoogleCaptchaToken(action);
      default:
        return getFakeCaptchaToken();
    }
  };

  return { getCaptchaToken };
};

export default useRecaptcha;
