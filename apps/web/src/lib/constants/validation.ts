export const emailPattern =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gim;

export const passwordComplexityPattern =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?`~]).{8,}$/;

export const namePattern = /^[a-zA-Z'-]+$/;

export const zipCodePattern = /^\d{5}(?:-\d{4})?$/;

export const urlPattern =
  /^(ftp:\/\/|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;

export const positiveNumberPattern = /^[1-9]\d*$/;
