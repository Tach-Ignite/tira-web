// /* eslint-disable jsx-a11y/no-static-element-interactions */

// 'use client';

// import { OnboardingMultiSelectCardProps } from './types';

// function OnboardingMultiSelectCard(props: OnboardingMultiSelectCardProps) {
//   const { description, form, name, label, value, className = '' } = props;

//   const { setValue, watch } = form;

//   const selectedValues =
//     watch((name as 'personalizedContent') || 'personalizedServices') || [];

//   const onSelectCard = () => {
//     if (selectedValues?.includes(value)) {
//       setValue(
//         name,
//         selectedValues.filter((item) => item !== value),
//       );
//     } else {
//       setValue(name, [...selectedValues, value]);
//     }
//   };

//   const isSelected = selectedValues?.includes(value);

//   return (
//     <div
//       onClick={onSelectCard}
//       className={`cursor-pointer no-select shadow-l dark:!bg-gray-800 gap-4 md:gap-[16px] min-h-[160px] w-full flex items-start md:!p-4 p-0 rounded-lg  ${isSelected ? 'outline outline-4 outline-primary-800 dark:outline-yellow-400' : ''} ${className}`}
//     >
//       <div className="flex gap-2 justify-center my-auto xs:!px-[16px] px-4">
//         <div>
//           <p className="font-semibold leading-[30px] text-[18px] text-gray-900 dark:text-white">
//             {label}
//           </p>
//           <p className="font-normal pt-2 leading-[24px] text-[16px] dark:text-gray-400 text-gray-500">
//             {description}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OnboardingMultiSelectCard;
