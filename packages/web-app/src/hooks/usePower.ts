import { PowerResponseType } from '@raiju/types';
import useApi from './useApi';

const usePower = () => {
  const powerCheck = useApi<PowerResponseType>({
    method: 'GET',
    url: '//localhost:9001/power/check',
  });

  return { powerCheck };
};

export default usePower;
