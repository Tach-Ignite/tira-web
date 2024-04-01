import { useRouter } from 'next/navigation';
import TachLogo from '../../../../public/assets/tach-logo.png';

function BookingConfirmed() {
  const router = useRouter();

  return (
    <div className="max-w-[890px] mx-auto w-full flex flex-col justify-center p-2 mt-16">
      <div className="flex flex-col justify-center leading-[150%]">
        <div className="flex justify-center items-center px-16 py-20 w-full bg-gray-50 rounded-lg max-md:px-5 max-md:max-w-full">
          <div className="flex flex-col my-5 max-w-full w-[614px]">
            <div className="flex flex-col text-black max-md:max-w-full">
              <div className="flex flex-col max-md:max-w-full">
                <div className="self-center text-2xl font-medium">
                  Service Booking Confirmed!
                </div>
                <div className="my-6 text-center text-base max-md:max-w-full">
                  You will receive an email confirmation and details of your
                  service booking shortly.
                </div>
              </div>
              <div className="h-[200px] m-auto w-[400px] rounded-[50%] bg-black flex items-center justify-center">
                <img src={TachLogo?.src} alt="shopping-cart" className="" />
              </div>
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                router.push('/marketplace');
              }}
              className="cursor-pointer justify-center self-center px-5 py-3 mt-12 text-base font-medium text-white bg-indigo-600 rounded-lg max-md:mt-12"
            >
              Explore Services
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmed;
