import { convertToDollarAmount } from '@src/lib/numbers';
import React from 'react';
import {
  Accordion,
  AccordionPanel,
  AccordionTitle,
  AccordionContent,
  Badge,
} from '@src/flowbite';
import { Category, ItemDetailsProps } from './type';

function ItemDetails({
  description,
  details,
  label,
  price = 0,
  duration = 0,
  detailsTitle,
  title = '',
  children,
  categories = [],
}: ItemDetailsProps) {
  return (
    <div className="w-[50%] mr-10 max-[1000px]:w-[100%]">
      <div className="text-black font-bold text-2xl leading-[36px] dark:text-white">
        {title}
      </div>
      <div className="font-normal text-2xl leading-[36px] text-green-500 dark:text-green-400 mt-1 mb-10">
        {convertToDollarAmount(price)}{' '}
        {duration > 0 && `per ${duration.toString()} Minutes`}
      </div>
      {children}
      <div className="h-[2px] mb-6 bg-gray-200 dark:bg-gray-500" />
      {description ? (
        <div className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-6">
          {description}
        </div>
      ) : null}
      <span className="p-2.5 bg-primary-100 rounded-lg text-indigo-700 dark:text-indigo-300 dark:border-[0.5px] dark:border-indigo-300 dark:bg-gray-700">
        {label}
      </span>

      <div className="flex flex-wrap gap-1 mb-3 mt-5">
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

      {details ? (
        <div className="mt-12">
          <Accordion>
            <AccordionPanel>
              <AccordionTitle>{detailsTitle}</AccordionTitle>
              <AccordionContent>
                <p className="text-base text-gray-500 dark:text-gray-400">
                  {details}
                </p>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </div>
      ) : null}
    </div>
  );
}

export default ItemDetails;
