/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */

'use client';

import { Textarea } from '@src/atoms';
import { AddSectionCard } from '@src/cards';
import { UseFormReturn } from 'react-hook-form';
import { Card } from '@src/flowbite';

interface DescriptionGridProps {
  setShowField: (showField: boolean) => void;
  showField?: boolean;
  form: UseFormReturn<any>;
  name: string;
  label: string;
  addSectionName: string;
}

function DescriptionGrid(props: DescriptionGridProps) {
  const { setShowField, showField, addSectionName, form, name, label } = props;

  const { control, watch } = form;

  const onAddDescriptionCard = () => {
    setShowField(true);
  };

  const writtenCharacter = watch(name)?.length || 0;

  return showField ? (
    <Card>
      <Textarea
        control={control}
        name={name}
        label={label}
        placeholder="Write text here ..."
        helperText={`${writtenCharacter}/500 Characters`}
        rows={8}
      />
    </Card>
  ) : (
    <AddSectionCard
      sectionName={addSectionName}
      onClick={onAddDescriptionCard}
    />
  );
}

export default DescriptionGrid;
