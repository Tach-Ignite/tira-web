/* eslint-disable no-nested-ternary */
/* eslint-disable react/require-default-props */

// import { useThemeMode } from '@src/flowbite';
// import LightSignUpCompletedImage from '../../../../public/images/assets/light-signup-completed.png';
// import DarkSignUpCompletedImage from '../../../../public/images/assets/dark-signup-completed.png';

interface InviteEmailVerificationProps {
  inviteType: string;
  role: string;
  orgName: string;
  teamName: string;
}

function EmailVerification({
  inviteType,
  role,
  orgName,
  teamName,
}: InviteEmailVerificationProps) {
  // const { mode } = useThemeMode();

  // const image = useMemo(() => {
  //   const localStorageMode = localStorage?.getItem('flowbite-theme-mode') || '';
  //   const themeMode = mode || localStorageMode;
  //   return themeMode === 'dark'
  //     ? DarkSignUpCompletedImage
  //     : LightSignUpCompletedImage;
  // }, [mode]);

  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="font-semibold text-[48px] leading-[58px] dark:bg-text-gradient text-center dark:bg-clip-text dark:text-transparent text-black">
        Congratulations!
      </div>
      <div className="dark:text-black w-[100%] mb-5 text-indigo20 font-medium text-[20px] leading-[24px] text-center">
        <div>
          {`You have been added to ${inviteType || '-'} ${inviteType === 'Organization' ? orgName : teamName} as ${inviteType} ${role?.split('-')?.[1] || '-'}`}
        </div>
      </div>
      {/* <Image
        src={image}
        alt="Profile_completed"
        width={image.width}
        height={image.height}
      /> */}
    </div>
  );
}

export default EmailVerification;
