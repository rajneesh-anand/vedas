import { TestinomialQueryOptionsType, Testinomial } from '@framework/types';
import axios from 'axios';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';
import http from '@framework/utils/http';

export const fetchTestinomials = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const {
    data: { data },
  } = await http.get(API_ENDPOINTS.TESTINOMIAL);

  return { testinomials: { data: data as Testinomial[] } };
};
export const useTestinomialQuery = (options: TestinomialQueryOptionsType) => {
  return useQuery<{ testinomials: { data: Testinomial[] } }, Error>(
    [API_ENDPOINTS.TESTINOMIAL, options],
    fetchTestinomials
  );
};
