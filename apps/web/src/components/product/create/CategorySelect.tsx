'use client';

import { Badge, Label, FlowBiteSelect } from '@src/flowbite';
import { useEffect, useMemo } from 'react';
import { CrossIcon } from '@src/icons';
import { useGetAllCategories } from '@queries';
import { CategoryType } from '@services';
import { addQueryParam, removeQueryParam } from '@src/lib/functions';
import { CategorySelectProps } from './types';

function CategorySelect(props: CategorySelectProps) {
  const { form, isCustomer } = props;

  const {
    data: { data: { data: categories = [] as CategoryType[] } = {} } = {},
  } = useGetAllCategories({});

  const categoryOptions = useMemo(
    () =>
      categories?.map(({ categoryId, name }) => ({
        value: categoryId,
        label: name,
      })),
    [categories],
  );

  const { watch, setValue } = form;

  const {
    categoryIds: selectedCategoryIds = [],
    categoryNames: selectedCategoryNames = [],
  } = watch() || {};

  const filteredTagOptions = useMemo(
    () =>
      categoryOptions?.filter(
        (option) => !selectedCategoryIds?.includes(option?.value),
      ),
    [categoryOptions, selectedCategoryIds],
  );

  const onCancelTags = (tags: String, label: string) => {
    const filteredTag = selectedCategoryIds?.filter(
      (tag: string) => tag !== tags,
    );
    setValue('categoryIds', filteredTag, { shouldDirty: true });
    if (isCustomer) {
      const filteredNames = selectedCategoryNames?.filter(
        (tag: string) => tag !== label,
      );
      setValue('categoryNames', filteredNames, { shouldDirty: true });
    }
  };

  const onSelectTags = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: selectedCategoryId } = event?.target || {};
    setValue('categoryIds', [...selectedCategoryIds, selectedCategoryId], {
      shouldDirty: true,
    });

    if (isCustomer) {
      const selectedCategoryName = categoryOptions?.find(
        ({ value }) => value === selectedCategoryId,
      )?.label;
      setValue(
        'categoryNames',
        [...selectedCategoryNames, selectedCategoryName],
        {
          shouldDirty: true,
        },
      );
    }
  };

  useEffect(() => {
    if (isCustomer && selectedCategoryIds) {
      const categoryQueryString = selectedCategoryNames?.join(',');
      addQueryParam('categories', categoryQueryString);
      if (!selectedCategoryNames?.length) {
        removeQueryParam('categories');
      }
    }
  }, [isCustomer, selectedCategoryIds, selectedCategoryNames]);

  const selectedCategories = useMemo(
    () =>
      categoryOptions?.filter(({ value }) =>
        selectedCategoryIds?.includes(value),
      ),
    [categoryOptions, selectedCategoryIds],
  );

  return (
    <div>
      {selectedCategories?.length ? (
        <div className="flex gap-2 flex-wrap">
          {selectedCategories?.map(({ value, label }) => {
            const onCancelTag = () => onCancelTags(value, label);
            return (
              <Badge
                color="green"
                size="sm"
                key={value}
                className="font-medium"
              >
                <span className="flex gap-2 items-center">
                  {label}
                  <CrossIcon className="cursor-pointer" onClick={onCancelTag} />
                </span>
              </Badge>
            );
          })}
        </div>
      ) : null}
      <div className="flex flex-col gap-1 mt-4">
        {isCustomer ? null : <Label>Add Tags</Label>}
        <FlowBiteSelect onChange={onSelectTags}>
          <option value="" className="p-2">
            {isCustomer ? 'Filter Categories' : 'Select Tags'}
          </option>
          {filteredTagOptions?.map(({ label, value }) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </FlowBiteSelect>
      </div>
    </div>
  );
}

export default CategorySelect;
