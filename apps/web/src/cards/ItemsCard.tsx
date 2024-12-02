'use client';

import { useState } from 'react';
import { Badge, Card } from '@src/flowbite';
import { CartPlusIcon } from '@src/icons';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Button } from '@src/atoms';
import { convertToDollarAmount } from '@src/lib/numbers';
import { useAuthenticatedNavigation } from '@hooks';
import { Category, ItemsCardProps } from './types';

const ProductFavorite = dynamic(
  () => import('@components/product/ProductFavorite'),
  { ssr: false },
);

const ColoredPlaceholderSVG = (fillColor: string) => `<svg
      width="133mm"
      height="133mm"
      viewBox="0 0 133 133"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
    >
      <circle
        style="fill:${fillColor};fill-opacity:1;stroke:#FFFFFF;stroke-width:0.08757708;stroke-linejoin:bevel;stroke-dasharray:none;paint-order:markers fill stroke"
        id="path1642"
        cx="66.570381"
        cy="66.623238"
        r="66.363625"
      />
      <path
        id="path115"
        style="fill:${fillColor};fill-opacity:0;stroke:#FFFFFF;stroke-width:0.773346;stroke-dasharray:none;stroke-opacity:1"
        d="m 128.12315,56.924965 -32.320906,14.231155 0.05029,0.01602 a 13.667095,13.761726 0 0 0 -4.096121,2.832702 13.667095,13.761726 0 0 0 0,19.46195 13.667095,13.761726 0 0 0 19.328117,0 13.667095,13.761726 0 0 0 2.72312,-3.917956 l 0.007,0.02557 z m -27.43275,16.1385 a 10.960554,11.036445 0 0 1 8.15989,3.22469 10.960554,11.036445 0 0 1 0,15.607661 10.960554,11.036445 0 0 1 -15.500344,0 10.960554,11.036445 0 0 1 4e-6,-15.607657 10.960554,11.036445 0 0 1 7.34045,-3.224694 z"
      />
      <path
        style="display:inline;fill:${fillColor};fill-opacity:0;stroke:#FFFFFF;stroke-width:0.773346;stroke-dasharray:none;stroke-opacity:1"
        d="M 52.948906,97.609179 C 43.07498,49.572975 101.01923,26.722162 128.19899,53.86267 c 0,0 -26.91321,-25.855194 -45.71745,-15.938218 -10.196371,5.377314 -30.87241,-0.320733 -30.87241,-0.320733 0,0 6.728962,5.758446 5.896777,10.315498 -0.568779,3.115053 -5.887477,8.809119 -10.755802,2.558051 -6.242294,-8.015106 -21.599041,-5.82259 -21.599041,-5.82259 11.960519,5.931667 11.289817,10.881389 0.164366,6.953176 5.121964,10.107439 9.251275,9.698069 11.205101,10.832002 2.421204,1.405138 1.421779,5.257261 -1.173774,6.496097 C 32.630668,70.232276 24.676602,65.591641 25.618054,62.15976 26.357734,59.380751 15.68324,55.960847 5.9561122,57.756361 17.220711,59.287749 28.182352,75.547726 14.178289,72.651608 8.763066,71.355864 4.0901834,77.84574 4.0901834,77.84574 c 0,0 31.0183646,1.550885 19.6778426,10.028222 0,0 10.629742,5.09689 15.460889,1.833778 6.174056,-4.170058 13.719991,7.901439 13.719991,7.901439 z"
        id="path1141-1"
      />
      <circle
        style="fill:#FFFFFF;fill-opacity:1;stroke-width:0;stroke-linejoin:bevel;paint-order:markers fill stroke"
        id="path2362"
        cx="101.05"
        cy="83.8"
        r="11"
      />
    </svg>`;

const getSvgURL = (svgString: string) =>
  `data:image/svg+xml;base64,${btoa(svgString)}`;

function ItemsCard(props: ItemsCardProps) {
  const {
    id,
    buttonText = 'Add to cart',
    description,
    imageUrl,
    isFavorite,
    label,
    onButtonClick,
    price,
    showButton,
    title = '',
    type = 'product',
    withFavoriteIcon = true,
    categories = [],
    duration = 0,
  } = props || {};

  const authNavigationHandler = useAuthenticatedNavigation();

  const svg = ColoredPlaceholderSVG(title);

  const [imageSrc, setImageSrc] = useState(imageUrl || getSvgURL(svg));

  const firstImageName = imageUrl?.[0]?.split('--')?.[0] || '';

  const handleImageError = () => {
    if (title?.startsWith('#')) {
      const svg = ColoredPlaceholderSVG(title);
      setImageSrc(getSvgURL(svg));
    } else {
      setImageSrc('/assets/products-services-placeholder.svg');
    }
  };

  return (
    <Card
      className="w-[322px] relative !h-[640px] tab:!h-[600px] mb-2"
      theme={{
        root: {
          base: 'flex !h-full rounded-lg bg-white shadow-3xl dark:border-none dark:bg-gray-800',
          children: 'flex !h-full flex-col justify-between',
        },
      }}
    >
      <div className="dark:bg-white dark:rounded-t-lg !h-[360px]">
        <Image
          className="w-[322px] my-6 h-[322px] rounded-[50%]"
          src={imageSrc}
          alt={firstImageName}
          unoptimized
          width="0"
          height="0"
          onError={handleImageError}
        />
      </div>
      {withFavoriteIcon && type === 'product' ? (
        <ProductFavorite productId={id} isFavorite={isFavorite} />
      ) : null}
      <div className="px-3 pt-2">
        <div>
          <span className="max-w-max text-xs dark:border-[0.5px] dark:border-indigo-300 font-medium px-2 py-1 bg-primary-100 rounded-md text-indigo-700 dark:text-indigo-300 dark:bg-gray-700">
            {label}
          </span>
          <div className="text-gray-900 my-2 font-bold text-sm leading-[17.5px] dark:text-gray-50">
            {title}
          </div>
          <div className="font-normal h-auto multiline-ellipsis text-sm mt-1 mb-4 text-gray-500 dark:text-gray-200">
            {description}
          </div>
          <div className="flex flex-wrap gap-1 mb-3">
            {categories.length > 0 &&
              categories.map((element: Category) => (
                <Badge
                  size="sm"
                  color="green"
                  className="min-w-max capitalize "
                  theme={{
                    icon: { off: 'rounded-md px-2.5 py-0.5' },
                    root: {
                      color: {
                        red: 'bg-red-100 text-red-800 group-hover:bg-red-100 dark:bg-gray-700 dark:text-red-400 dark:border-[0.5px] dark:border-red-400 dark:group-hover:bg-red-400',
                        blue: 'bg-primary-100 text-primary-800 group-hover:bg-primary-200 dark:bg-gray-700 dark:text-blue-400 dark:border-[0.5px] dark:border-blue-400 dark:group-hover:bg-blue-300',
                        warning:
                          'bg-yellow-100 text-yellow-800 group-hover:bg-yellow-200 dark:bg-gray-700 dark:text-yellow-300 dark:border-[0.5px] dark:border-yellow-300 dark:group-hover:bg-yellow-300',
                        purple:
                          'bg-purple-100 text-purple-700 group-hover:bg-purple-200 dark:bg-gray-700 dark:text-purple-400 dark:border-[0.5px] dark:border-purple-300 dark:group-hover:bg-purple-300',
                      },
                      base: 'flex h-fit items-center gap-1 font-medium max-w-fit',
                    },
                  }}
                >
                  {element.name}
                </Badge>
              ))}
          </div>
        </div>
        <div className="flex justify-between pb-6 items-center mb-2">
          {showButton ? (
            <Button
              onClick={authNavigationHandler(onButtonClick)}
              color="indigo"
              size="sm"
              theme={{
                size: { sm: 'px-3 py-2 font-medium text-xs leading-[18px]' },
                color: {
                  indigo:
                    'bg-indigo-600 dark:bg-yellow-400 text-white dark:text-black',
                },
              }}
            >
              <CartPlusIcon size={20} className="mr-2" />
              <div className="mt-0.5">{buttonText}</div>
            </Button>
          ) : (
            <Badge
              size="sm"
              color="gray"
              className="min-w-max capitalize "
              theme={{
                icon: { off: 'rounded-md px-2.5 py-0.5' },
                root: {
                  base: 'flex h-fit items-center gap-1 font-medium max-w-fit',
                },
              }}
            >
              Out of Stock
            </Badge>
          )}
          <div className="text-green-500 dark:text-green-400 font-normal text-sm leading-[17.5px]">
            {convertToDollarAmount(Number(price), true)}{' '}
            {duration > 0 && `/ ${duration} Minutes`}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ItemsCard;
