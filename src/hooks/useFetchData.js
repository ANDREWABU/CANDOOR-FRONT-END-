import { useCallback } from 'react';
import { useQuery } from 'react-query';
import axios from '../Config/Axios';


function useFetchData({queryKey = [], url = '', axiosOptions, enabled = Boolean(url), options = {}}) {
  const getCompleteProfileData = useCallback(async () => {
    const response = await axios.get(url, axiosOptions);
    return response;
  }, [axiosOptions, url]);

  return useQuery(queryKey, getCompleteProfileData, {
    refetchOnWindowFocus: false,
    enabled: enabled,
    ...options
  });
}

export default useFetchData;