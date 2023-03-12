import { PowerResponseType } from '@raiju/types';
import useApi from '../hooks/useApi';

const usePC = () => {
  const wakePC = useApi<PowerResponseType>({
    method: 'GET',
    url: '//localhost:9001/pc/wake'
  });

  const sleepPC = useApi<PowerResponseType>({
    method: 'GET',
    url: '//localhost:9001/pc/sleep'
  });

  const checkPC = useApi<PowerResponseType>({
    method: 'GET',
    url: '//localhost:9001/pc/check'
  });

  return { wakePC, sleepPC, checkPC };
};

export default usePC;