import ForgotPasswordForm from './ForgotPasswordForm';

function ForgotPassword() {
  return (
    <div className="flex flex-col rounded-lg sm:w-[427px] xs:w-[350px] bg-white dark:bg-gray-800 shadow-3xl p-6 sm:p-10 xs:p-8 xs:mx-5">
      <div className="font-semibold dark:text-white m-auto text-3xl leading-10">
        Forgot Password
      </div>
      <ForgotPasswordForm />
    </div>
  );
}

export default ForgotPassword;
