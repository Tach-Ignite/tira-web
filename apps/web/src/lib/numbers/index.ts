/* eslint-disable no-plusplus */
export const convertToDollarAmount = (
  amount: Number,
  withDecimal: boolean = false,
) => {
  const modifiedAmount = withDecimal
    ? amount.toFixed(2)
    : amount.toLocaleString();
  const dollarAmount = modifiedAmount.replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return `$${dollarAmount}`;
};

export function formatNumberToKFormat(number: number) {
  if (number < 1000) {
    return number.toString();
  }
  if (number < 1000000) {
    return `${Math.round(number / 1000)}k`;
  }
  return `${Math.round(number / 1000000)}M`;
}

export const formatPhoneNumber = (input: string) => {
  // Remove all non-numeric characters
  const replacedNumber = input.replace(/\D/g, '');

  // Format the phone number into US format
  const formattedPhoneNumber = replacedNumber.replace(
    /(\d{3})(\d{3})(\d{4})/,
    '($1) $2-$3',
  );
  return formattedPhoneNumber;
};

export const formatCreditCardNumber = (input: string) => {
  // Remove non-digit characters
  const formattedValue = input.replace(/\D/g, '');
  // Format credit card number with spaces every 4 digits
  const formattedNumber = formattedValue.replace(/(\d{4})/g, '$1 ').trim();
  return formattedNumber;
};

export const convertNumberToCommaFormat = (number: Number) => {
  const formattedNumber = `${number}`.replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return formattedNumber;
};
