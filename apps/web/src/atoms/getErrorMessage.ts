import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

interface GetErrorMessageProps {
  errorInputName?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  label?: string;
  errorMessage?: string;
}

export const getErrorMessage = ({
  errorInputName,
  label,
  errorMessage,
}: GetErrorMessageProps) => {
  const errorType = errorInputName?.type;
  const isRequiredError = errorType === 'required' && errorInputName;
  const isValidateError = errorType === 'validate' && errorInputName;
  const isPatternError = errorType === 'pattern' && errorInputName;
  let message: string | undefined;
  if (isRequiredError) {
    message = `${label} is Required`;
  } else if (isPatternError) {
    message = errorMessage;
  } else if (isValidateError) {
    message = errorInputName?.message as string;
  }

  return message;
};
