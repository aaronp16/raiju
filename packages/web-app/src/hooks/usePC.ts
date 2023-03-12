import useApi from '../hooks/useApi';

interface PcResponse {
  power: 'on' | 'off';
}

const usePC = () => {
  const wakePC = useApi<PcResponse>({
    method: 'GET',
    url: '//localhost:9001/pc/wake'
  });

  const sleepPC = useApi<PcResponse>({
    method: 'GET',
    url: '//localhost:9001/pc/sleep'
  });

  const checkPC = useApi<PcResponse>({
    method: 'GET',
    url: '//localhost:9001/pc/check'
  });

  return { wakePC, sleepPC, checkPC };
};

export default usePC;