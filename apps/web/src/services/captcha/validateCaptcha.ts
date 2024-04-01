'use server';

const validateGoolgeRecaptchaToken = async (
  token: string,
): Promise<{ success: boolean }> => {
  const res = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_RECAPTCHA_SECRET_KEY}&response=${token}`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      method: 'POST',
    },
  );
  return res.json();
};

const validateFakeCaptchaToken = async (token: string) => ({
  success: !!token,
});

export const validateCaptcha = async (
  token: string,
): Promise<{ success: boolean }> => {
  if (process.env.CAPTCHA_PROVIDER === 'google') {
    return validateGoolgeRecaptchaToken(token);
  }
  return validateFakeCaptchaToken(token);
};
