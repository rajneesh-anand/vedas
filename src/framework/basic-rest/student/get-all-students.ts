import { StudentsQueryOptionsType, Student } from '@framework/types';
import axios from 'axios';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchStudents = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const {
    data: { data },
  } = await axios.get(`${process.env.API_URL}/enrollment`);
  return { students: { data: data as Student[] } };
};
export const useStudentsQuery = (options: StudentsQueryOptionsType) => {
  return useQuery<{ students: { data: Student[] } }, Error>(
    [API_ENDPOINTS.STUDENT, options],
    fetchStudents
  );
};
