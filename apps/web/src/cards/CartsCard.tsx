import { TrashIcon } from '@src/icons';
import { useRemoveFromCart, useUpdateCartItem } from '@queries';
import { getImageUrl } from '@src/app/common/util/common';
import QuantityButton from '@components/cart/QuantityButton';
import ProductFavorite from '@components/product/ProductFavorite';
import { convertToDollarAmount } from '@src/lib/numbers';
import dynamic from 'next/dynamic';
import { Button } from '@src/atoms';
import { CartCardProps } from './types';
import ProductImage from '../../public/assets/product-image.svg';

const OptimizedImage = dynamic(() => import('next/image'), { ssr: false });

function CartsCard(props: CartCardProps) {
  const { data, isAdmin } = props;
  const {
    quantity = 0,
    productId,
    product: {
      title = '',
      description = '',
      salePrice = 0,
      productImageUrl,
      isFavorite,
    },
  } = data;

  const { mutateAsync: updateCatItem } = useUpdateCartItem({
    successMessage: 'Cart has been updated.',
    failureMessage: true,
  });

  const { mutateAsync: removeFromCart } = useRemoveFromCart({
    successMessage: 'Product has been removed.',
    failureMessage: true,
  });

  const onAddClick = async () => {
    await updateCatItem({ productId, quantity: quantity + 1 });
  };

  const onRemoveClick = async () => {
    await updateCatItem({ productId, quantity: quantity - 1 });
  };

  const onDeleteClick = async () => {
    if (data.product.productId) {
      await removeFromCart({
        productId,
      });
    }
  };

  const imageUrl = getImageUrl(productImageUrl?.[0]);
  const totalPrice = salePrice * quantity;
  return (
    <div className="relative grid grid-cols-6 gap-2 items-start border-t border-gray-200 dark:border-gray-600 pt-4 pb-2 min-h-40">
      <div className="col-span-1">
        <div className="w-full max-w-[156px]">
          <OptimizedImage
            src={imageUrl || ProductImage}
            alt={title || 'product'}
            width="0"
            height="0"
          />
        </div>
      </div>
      <div className="col-span-2">
        <div>{title}</div>
        <div className="!font-normal line-clamp-3 mt-3">{description}</div>
      </div>
      <div className="col-span-1">{convertToDollarAmount(salePrice)}</div>
      <div className="col-span-1 min-w-36">
        <QuantityButton
          quantity={quantity}
          addClick={onAddClick}
          removeClick={onRemoveClick}
          isAdmin={isAdmin}
        />
      </div>
      <div className="col-span-1">{convertToDollarAmount(totalPrice)}</div>
      {!isAdmin ? (
        <div className="flex absolute gap-2 right-2 bottom-2">
          <Button
            onClick={onDeleteClick}
            color="indigo"
            size="sm"
            theme={{
              size: { sm: 'px-3 py-2 font-medium text-xs leading-[18px]' },
              color: {
                indigo:
                  'border bg-inherit border-indigo-300 dark:border-yellow-400 dark:text-yellow-400 ',
              },
            }}
          >
            <TrashIcon size={20} className="mr-2" />
            <div className="mt-0.5">Remove</div>
          </Button>
          <ProductFavorite
            productId={productId}
            isFavorite={isFavorite}
            page="cart"
          />
        </div>
      ) : null}
    </div>
  );
}
export default CartsCard;
