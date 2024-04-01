import { addQueryParam, debounce, removeQueryParam } from '@src/lib/functions';
import { SearchIcon } from '@src/icons';
import { TextInput } from '@src/flowbite';
import { SearchInputProps } from './types';

function SearchInput(props: SearchInputProps) {
  const {
    pageSize,
    placeHolder = 'Search',
    searchValue = '',
    withIcon,
  } = props;

  const onSearchChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event?.target || {};
      if (value) {
        addQueryParam('search', value);
        addQueryParam('page', '1');
        pageSize && addQueryParam('page_size', `${pageSize}`);
      } else {
        removeQueryParam('search');
        addQueryParam('page', '1');
        pageSize && addQueryParam('page_size', `${pageSize}`);
      }
    },
  );

  return (
    <TextInput
      name="search"
      icon={withIcon ? SearchIcon : undefined}
      placeholder={placeHolder}
      defaultValue={searchValue}
      theme={{
        field: {
          input: {
            base: 'block w-full border disabled:cursor-not-allowed disabled:opacity-50 h-[38px]',
            colors: {
              gray: 'border-gray-300 dark:border-gray-600 bg-gray-50 text-gray-500 dark:text-gray-400 dark:bg-gray-700 placeholder:mt-2 focus:border-gray-300 dark:focus:border-600',
            },
          },
        },
      }}
      onChange={onSearchChange}
    />
  );
}

export default SearchInput;
