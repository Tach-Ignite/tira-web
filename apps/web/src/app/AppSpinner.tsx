'use client';

import LayoutSpinner from '@components/appSpinner/LayoutSpinner';
import { ApiKeysEnum } from '@queries/apiKeys';
import { useIsFetching } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const queriesToOmit = [
  ApiKeysEnum.GetAllUnreadNotificationCount,
  ApiKeysEnum.GetCartItems,
];

function AppSpinner({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  const isFetching = useIsFetching({
    // eslint-disable-next-line consistent-return
    predicate: (query) => {
      if (!queriesToOmit.includes(query?.queryKey?.[0] as ApiKeysEnum)) {
        const firstKey = query.queryKey[0];
        const isGetRequest =
          typeof firstKey === 'string' &&
          firstKey.trim().toLowerCase().startsWith('get');
        return (
          isGetRequest &&
          (query?.state?.status === 'pending' ||
            query?.state?.fetchStatus === 'idle')
        );
      }
      return false;
    },
    fetchStatus: 'fetching',
  });

  useEffect(() => {
    if (isFetching === 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [isFetching]);

  return isLoading || isFetching ? <LayoutSpinner /> : children;
}

export default AppSpinner;
