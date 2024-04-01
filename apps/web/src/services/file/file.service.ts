'use server';

import { getHeaders, remove } from '@services/fetch';
import { API_URL } from '@src/app/common/constants/api';

export async function uploadMultiImage(
  data: FormData,
): Promise<{ data?: string[]; error: string; message: string }> {
  const files = data.getAll('files');
  const formData = new FormData();
  // eslint-disable-next-line no-console
  files.forEach((file) => {
    formData.append('files', file);
  });
  const res = await fetch(`${API_URL}/assets/multi-upload`, {
    body: formData,
    method: 'POST',
    headers: { ...getHeaders() },
  });
  return res.json();
}

export const deleteImageUrl = async (fileUrl: string) =>
  remove(`assets/${fileUrl}`);
