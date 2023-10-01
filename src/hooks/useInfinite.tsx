import { fetcher } from '@/utils/fetcher';
import { useEffect, useState } from 'react';
import { useLoading } from './useLoading';

const getEndUrl = (url: string) => {
  return url.includes('?') ? `${url}&` : `${url}?`;
};

const useInfinite = (url: string) => {
  const [respData, setRespData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { loading, setLoadingTrue, setLoadingFalse } = useLoading();

  const fetchData = async () => {
    if (currentPage <= totalPages) {
      setLoadingTrue();
      const { data, meta, isError } = await fetcher(
        `${getEndUrl(url)}pagination[page]=${currentPage}&pagination[pageSize]=10`,
      );
      setLoadingFalse();
      if (!isError) {
        setTotalPages(meta?.pagination?.pageCount);
        setRespData([...respData, ...data]);
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const fetchFreshData = async () => {
    setCurrentPage(1);
    setTotalPages(1);
    setLoadingTrue();
    const { data, meta, isError } = await fetcher(`${getEndUrl(url)}pagination[page]=1&pagination[pageSize]=10`);
    setLoadingFalse();
    if (!isError) {
      setTotalPages(meta?.pagination?.pageCount);
      setRespData(data);
      setCurrentPage(2);
    }
  };

  useEffect(() => {
    if (!!url && !respData?.length) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [respData, url]);

  return {
    fetchData,
    fetchFreshData,
    loading,
    data: respData,
  };
};

export default useInfinite;
