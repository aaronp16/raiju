import { PowerResponseType } from '@raiju/types';
import useApi from './useApi';

const useTransmission = () => {
  const uploadFiles = useApi<PowerResponseType>({
    method: 'PUT',
    url: '//localhost:9001/transmission/upload',
    formData: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return { uploadFiles };
};

export default useTransmission;
