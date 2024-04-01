/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import React, { useEffect, useState } from 'react';
import { Textarea } from '@src/atoms';
import { AddSectionCard } from '@src/cards';
import { EditBookingProps } from './types';

function AddadminNotes(props: EditBookingProps) {
  const { form, onDeleteNotes, bookingDetails } = props;
  const [showNotesField, setShowNotesField] = useState(false);

  const { adminNotes } = bookingDetails || {};

  const { control } = form;

  const onAddNotesField = () => {
    setShowNotesField(true);
  };

  useEffect(() => {
    if (adminNotes) {
      setShowNotesField(true);
    }
  }, [adminNotes]);

  return showNotesField ? (
    <div className="bg-white dark:bg-gray-800 shadow-xl px-6 py-8 rounded-2xl">
      <Textarea
        control={control}
        name="adminNotes"
        label="Notes"
        placeholder="Write text here ..."
        rows={10}
      />
      <div
        onClick={onDeleteNotes}
        className="cursor-pointer mt-10 pl-5 font-medium text-sm leading-[21px] text-red-600 dark:text-red-400"
      >
        Delete
      </div>
    </div>
  ) : (
    <AddSectionCard sectionName="Add Notes" onClick={onAddNotesField} />
  );
}

export default AddadminNotes;
