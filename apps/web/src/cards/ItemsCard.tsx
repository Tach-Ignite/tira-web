'use client';

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
    title,
    type = 'product',
    withFavoriteIcon = true,
    categories = [],
    duration = 0,
  } = props || {};

  const authNavigationHandler = useAuthenticatedNavigation();

  const firstImageName = imageUrl?.[0]?.split('--')?.[0] || '';

  return (
    <Card
      className="w-[322px] relative tab:min-h-[589px] "
      theme={{
        root: {
          base: 'flex rounded-lg bg-white shadow-3xl dark:border-none dark:bg-gray-800',
          children: 'flex h-auto flex-col justify-center',
        },
      }}
    >
      <div className="dark:bg-white dark:rounded-t-lg h-full">
        <Image
          className="w-[322px] my-6 h-[322px] rounded-[50%]"
          src={imageUrl || '/assets/product-image.svg'}
          alt={firstImageName}
          unoptimized
          width="0"
          height="0"
        />
      </div>
      {withFavoriteIcon && type === 'product' ? (
        <ProductFavorite productId={id} isFavorite={isFavorite} />
      ) : null}
      <div className="px-3 pt-5">
        <div>
          <span className="max-w-max text-xs dark:border-[0.5px] dark:border-indigo-400 font-medium px-2 py-1 bg-indigo-100 rounded-md text-indigo-800 dark:text-indigo-400 dark:bg-gray-700">
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
                        red: 'bg-red-100 text-red-800 group-hover:bg-red-200 dark:bg-gray-700 dark:text-red-400 dark:border-[0.5px] dark:border-red-400 dark:group-hover:bg-red-300',
                        blue: 'bg-primary-100 text-primary-800 group-hover:bg-primary-200 dark:bg-gray-700 dark:text-blue-400 dark:border-[0.5px] dark:border-blue-400 dark:group-hover:bg-blue-300',
                        warning:
                          'bg-yellow-100 text-yellow-800 group-hover:bg-yellow-200 dark:bg-gray-700 dark:text-yellow-300 dark:border-[0.5px] dark:border-yellow-300 dark:group-hover:bg-yellow-300',
                        purple:
                          'bg-purple-100 text-purple-800 group-hover:bg-purple-200 dark:bg-gray-700 dark:text-purple-400 dark:border-[0.5px] dark:border-purple-300 dark:group-hover:bg-purple-300',
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
        <div
          className={`flex ${showButton ? 'justify-between' : 'justify-end'} pb-6 items-center`}
        >
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
          ) : null}
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
