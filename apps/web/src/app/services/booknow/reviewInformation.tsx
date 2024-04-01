import { Card } from '@src/flowbite';
import { convertToDollarAmount } from '@src/lib/numbers';
import { BookTimeProps } from '../types';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date);
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { timeStyle: 'short' }).format(date);
}

function ReviewInformation(props: BookTimeProps) {
  const { bookingResponse, serviceDetails } = props;

  const { price = 0, duration = 0 } = serviceDetails || {};

  const {
    address,
    bookingDate,
    bookingNotes,
    city,
    contactAddress,
    contactCity,
    contactEmail,
    contactFirstName,
    contactLastName,
    contactPhone,
    contactState,
    contactZipCode,
    email,
    firstName,
    lastName,
    phone,
    startTime,
    state,
    zipCode,
  } = bookingResponse;

  return (
    <Card className="max-w-[890px] mx-auto w-full flex flex-col justify-center p-2 mt-16">
      <div className="text-black font-bold text-2xl leading-[36px] dark:text-white">
        Book appointment for Painting services
      </div>
      <div className="font-normal text-2xl leading-[36px] text-green-500 dark:text-green-400 mt-1 mb-10">
        {convertToDollarAmount(Number(price), true)} per {duration.toString()}{' '}
        {duration > 1 ? 'Minutes' : 'Minute'}
      </div>

      <div className="space-y-8">
        <div>
          <div className="text-black font-bold text-xl leading-[36px] dark:text-white mb-4">
            Booking Information
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-gray-700">Date of service</div>
              <div className="mt-1 text-black">{formatDate(bookingDate)}</div>
            </div>
            <div>
              <div className="text-gray-700">Time of service</div>
              <div className="mt-1 text-black">{formatTime(startTime)}</div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-black font-bold text-xl leading-[36px] dark:text-white mb-4">
            Personal Information
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-gray-700">Name</div>
              <div className="mt-1 text-black">{firstName}</div>
            </div>
            <div>
              <div className="text-gray-700">Last name</div>
              <div className="mt-1 text-black">{lastName}</div>
            </div>
            <div>
              <div className="text-gray-700">Email</div>
              <div className="mt-1 text-black">{email}</div>
            </div>
            <div>
              <div className="text-gray-700">Phone Number</div>
              <div className="mt-1 text-black">{phone}</div>
            </div>
            <div>
              <div className="text-gray-700">Address</div>
              <div className="mt-1 text-black">{address}</div>
            </div>
            <div>
              <div className="text-gray-700">City</div>
              <div className="mt-1 text-black">{city}</div>
            </div>
            <div>
              <div className="text-gray-700">State</div>
              <div className="mt-1 text-black">{state}</div>
            </div>
            <div>
              <div className="text-gray-700">ZIP Code</div>
              <div className="mt-1 text-black">{zipCode}</div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-black font-bold text-xl leading-[36px] dark:text-white mb-4">
            Contact Information
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-gray-700">Name</div>
              <div className="mt-1 text-black">{contactFirstName}</div>
            </div>
            <div>
              <div className="text-gray-700">Last name</div>
              <div className="mt-1 text-black">{contactLastName}</div>
            </div>
            <div>
              <div className="text-gray-700">Email</div>
              <div className="mt-1 text-black">{contactEmail}</div>
            </div>
            <div>
              <div className="text-gray-700">Phone Number</div>
              <div className="mt-1 text-black">{contactPhone}</div>
            </div>
            <div>
              <div className="text-gray-700">Address</div>
              <div className="mt-1 text-black">{contactAddress}</div>
            </div>
            <div>
              <div className="text-gray-700">City</div>
              <div className="mt-1 text-black">{contactCity}</div>
            </div>
            <div>
              <div className="text-gray-700">State</div>
              <div className="mt-1 text-black">{contactState}</div>
            </div>
            <div>
              <div className="text-gray-700">ZIP Code</div>
              <div className="mt-1 text-black">{contactZipCode}</div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-black font-bold text-xl leading-[36px] dark:text-white mb-4">
            Additional Information
          </div>
          <div className="text-gray-700">Notes/ Special request</div>
          <div className="mt-1 text-black">{bookingNotes}</div>
        </div>
      </div>
    </Card>
  );
}

export default ReviewInformation;
