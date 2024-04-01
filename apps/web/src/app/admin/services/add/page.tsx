'use client';

import { ServiceForm } from '@components/admin/services';
import { useToast } from '@context/ToastContext';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

function AddServicePage() {
  const serviceForm = useForm<any>({
    mode: 'onChange',
  });

  const router = useRouter();
  const { showSuccessToast } = useToast();

  const { reset } = serviceForm;

  const onSuccessCreateService = (res: any) => {
    reset({});
    showSuccessToast({ message: 'Service Has Been Created!' });
    router.push(`/admin/services/edit/${res?.serviceId}`);
  };

  const onDiscard = () => {
    reset({});
  };

  return (
    <ServiceForm
      form={serviceForm}
      onSuccessCallback={onSuccessCreateService}
      onDiscard={onDiscard}
    />
  );
}

export default AddServicePage;
