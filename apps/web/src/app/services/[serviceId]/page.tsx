'use client';

import DetailedImageView from '@components/common/DetailedImageView';
import ItemDetails from '@components/common/ItemDetails/ItemDetails';
import { useGetUniqueService } from '@queries/useServicesQuery';
import AppSpinner from '@components/appSpinner/AppSpinner';
import { useParams } from 'next/navigation';
import { CalendarDark } from '@src/icons';
import { Button } from '@src/atoms';

function Page() {
  const { serviceId } = useParams() || {};
  const { data, isLoading } = useGetUniqueService(serviceId as string);

  const {
    serviceName,
    imageUrls,
    description,
    additionalDetails,
    companyName,
    price,
    duration,
    categories,
  } = data || {};

  return (
    <div className="flex justify-center">
      {isLoading ? (
        <div className="relative">
          <AppSpinner show />
        </div>
      ) : null}
      {data ? (
        <div className="flex gap-32 w-full max-[1000px]:flex-col max-w-[1300px] self-center">
          <DetailedImageView imageUrls={imageUrls || []} />
          <ItemDetails
            description={description || ''}
            details={additionalDetails || ''}
            detailsTitle="Additional Details"
            label={companyName || ''}
            price={price || 0}
            duration={duration}
            title={serviceName || ''}
            categories={categories}
          >
            <Button fullSized className="mb-2">
              <CalendarDark size={20} className="mr-3" />
              <div className="mt-0.5">Book Now</div>
            </Button>
            {/* <Button fullSized outline className="mb-14">
              <HeartSolidIcon size={20} className="mr-3 text-gray-800" />
              <div className="mt-0.5">Save</div>
            </Button> */}
          </ItemDetails>
        </div>
      ) : null}
    </div>
  );
}

export default Page;
