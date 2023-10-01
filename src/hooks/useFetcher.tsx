import { useStores } from '@/stores';
import { UPDATE_STORE_DATA } from '@/utils/apiPaths';
import { fetcher } from '@/utils/fetcher';
import useSWRNative from '@nandorojo/swr-react-native';

export const API_BASE_URL = 'https://cms.mygogo.app/api';

const useFetcher = (endPoint: string | null, external?: boolean, save?: boolean) => {
  const { user } = useStores();
  const { data, meta, error }: any = useSWRNative(
    external ? endPoint : endPoint === null ? endPoint : `${API_BASE_URL}/${endPoint}`,
    fetcher,
    {
      dedupingInterval: 1000,
      // refreshInterval: 10000,
      ...(save && {
        onSuccess(res: any) {
          if (endPoint === UPDATE_STORE_DATA && res?.data) {
            user.setSellerAllBusinesses(res.data);
          }
        },
      }),
    },
  );
  // console.log(`🚀 ${endPoint}`);
  return {
    data: data?.data?.data || data?.data || data,
    meta: data?.data?.meta || data?.meta || meta,
    loading: endPoint === null ? false : !error && !(data?.data?.data || data?.data || data),
    isError: error,
  };
};

export default useFetcher;
