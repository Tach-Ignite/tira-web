import { LabelInput, Select, Textarea, Radio } from '@src/atoms';
import { states } from '@src/lib/date';
import { Card } from '@src/flowbite';
import { convertToDollarAmount } from '@src/lib/numbers';
import { BookTimeProps } from '../types';

function PersonalInformationForm(props: BookTimeProps) {
  const { form, serviceDetails } = props;

  const { price = 0, duration = 0 } = serviceDetails || {};

  const { control, watch, setValue } = form;

  const { isSameAsPersonal } = watch();

  const handleSameAsPersonalChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const isChecked = event.target.checked;

    setValue('isSameAsPersonal', isChecked);

    const { firstName, lastName, email, phone, address, city, state, zipCode } =
      watch();

    setValue('contactFirstName', firstName);
    setValue('contactLastName', lastName);
    setValue('contactEmail', email);
    setValue('contactPhone', phone);
    setValue('contactAddress', address);
    setValue('contactCity', city);
    setValue('contactState', state);
    setValue('contactZipCode', zipCode);
  };

  return (
    <Card className="max-w-[890px] mx-auto w-full flex flex-col justify-center p-2 mt-16">
      <div className="text-black font-bold text-2xl leading-[36px] dark:text-white">
        Book appointment for Painting services
      </div>
      <div className="font-normal text-2xl leading-[36px] text-green-500 dark:text-green-400 mt-1 mb-10">
        {convertToDollarAmount(Number(price), true)} per {duration.toString()}
        {duration > 1 ? ' Minutes' : ' Minute'}
      </div>

      <form className="space-y-8">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <LabelInput
              name="firstName"
              label="First Name"
              placeholder="Your First Name"
              control={control}
              isRequired
            />
          </div>

          <div className="flex flex-col">
            <LabelInput
              name="lastName"
              label="Last Name"
              placeholder="Your Last Name"
              control={control}
              isRequired
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <LabelInput
              name="email"
              label="Email"
              type="email"
              placeholder="youremail@xxxx.com"
              isRequired
              control={control}
            />
          </div>

          <div className="flex flex-col">
            <LabelInput
              name="phone"
              label="Phone Number"
              type="tel"
              placeholder="Your phone number"
              control={control}
              maxLength={14}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <LabelInput
            name="address"
            label="Address"
            placeholder="Your full address"
            control={control}
            isRequired
          />
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col">
            <LabelInput
              name="city"
              label="City"
              placeholder="Input text"
              control={control}
              isRequired
            />
          </div>

          <div className="flex flex-col">
            <Select
              control={control}
              label="State"
              options={states}
              name="state"
              optionTitle="Select State"
            />
          </div>

          <div className="flex flex-col">
            <LabelInput
              name="zipCode"
              label="Zip Code"
              placeholder="Input text"
              control={control}
              isRequired
              maxLength={6}
            />
          </div>
        </div>
        <div className="text-black font-bold text-xl leading-[36px] dark:text-white mt-8">
          Contact Information
        </div>
        <div className="flex items-center mb-4">
          <Radio
            label="Same as personal information"
            name="isSameAsPersonal"
            control={control}
            onChange={handleSameAsPersonalChange}
            value={isSameAsPersonal}
            isChecked={isSameAsPersonal}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <LabelInput
              name="contactFirstName"
              label="First Name"
              placeholder="Your First Name"
              control={control}
              isRequired
            />
          </div>

          <div className="flex flex-col">
            <LabelInput
              name="contactLastName"
              label="Last Name"
              placeholder="Your Last Name"
              control={control}
              isRequired
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <LabelInput
              name="contactEmail"
              label="Email"
              type="email"
              placeholder="youremail@xxxx.com"
              isRequired
              control={control}
            />
          </div>

          <div className="flex flex-col">
            <LabelInput
              name="contactPhone"
              label="Phone Number"
              type="tel"
              placeholder="Your phone number"
              control={control}
              maxLength={14}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <LabelInput
            name="contactAddress"
            label="Address"
            placeholder="Your Full Address"
            control={control}
            isRequired
          />
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col">
            <LabelInput
              name="contactCity"
              label="City"
              placeholder="Input text"
              control={control}
              isRequired
            />
          </div>

          <div className="flex flex-col">
            <Select
              control={control}
              label="State"
              options={states}
              name="contactState"
              optionTitle="Select State"
            />
          </div>
          <div className="flex flex-col">
            <LabelInput
              name="contactZipCode"
              label="Zip Code"
              placeholder="Input text"
              control={control}
              isRequired
              maxLength={6}
            />
          </div>
        </div>
        <div className="text-black font-bold text-xl leading-[36px] dark:text-white mt-8">
          Additional Information
        </div>
        <div className="flex flex-col">
          <Textarea
            control={control}
            name="bookingNotes"
            label="Notes/ Special request"
            placeholder="Write text here ..."
            rows={8}
          />
        </div>
      </form>
    </Card>
  );
}

export default PersonalInformationForm;
