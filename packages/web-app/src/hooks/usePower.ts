import useApi from './useApi';

// TODO Shared types
interface PowerResponse {
  pc: 'on' | 'off';
}

const usePower = () => {
  const powerCheck = useApi<PowerResponse>({
    method: 'GET',
    url: '//localhost:9001/power/check'
  });

  return { powerCheck };
};

export default usePower;