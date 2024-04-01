import { CartsCard } from '@src/cards';
import { CartWrapperProps } from '../types';

function CartsWrapper(props: CartWrapperProps) {
  const { data, refetchFn, titleClassName = '', isAdmin = false } = props;

  const borderClass = !isAdmin
    ? 'border border-gray-300 dark:border-gray-700'
    : '';

  return (
    <div
      className={`bg-white dark:bg-gray-800 py-6 rounded-lg px-4 font-semibold dark:text-gray-50 col-span-2 ${borderClass}`}
    >
      {!isAdmin ? (
        <div className={`py-2 font-medium ${titleClassName}`}>
          Shopping Cart
        </div>
      ) : null}
      <div className="grid grid-cols-6 gap-4 items-start border-t border-gray-200 dark:border-gray-600 py-2">
        <div className="col-span-1" />
        <div className="col-span-2">Item</div>
        <div className="col-span-1">Item Price</div>
        <div className="col-span-1 min-w-36">Quantity</div>
        <div className="col-span-1">Total Price</div>
      </div>
      {data?.map((value) => (
        <CartsCard
          key={value.id}
          data={value}
          refetchFn={refetchFn}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
}

export default CartsWrapper;
