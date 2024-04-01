/* eslint-disable jsx-a11y/no-static-element-interactions */

import { CirclePlusIcon } from '@src/icons';
import { Card } from '@src/flowbite';

interface AddSectionCardProps {
  sectionName: string;
  onClick: () => void;
}

function AddSectionCard(props: AddSectionCardProps) {
  const { sectionName, onClick } = props;

  return (
    <Card>
      <div
        className="flex gap-3 items-center text-indigo-600 dark:text-yellow-400 font-medium text-sm cursor-pointer"
        onClick={onClick}
      >
        <CirclePlusIcon />
        <div>Add {sectionName} Section</div>
      </div>
    </Card>
  );
}

export default AddSectionCard;
