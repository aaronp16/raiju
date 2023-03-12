import { useState } from 'react';

import axios from 'axios';
import { FAILED, INIT, LOADING, SUCCESS } from '../constants/api';


export interface ApiCallProps {
  payload?: object;
  urlParams?: {
    [key: string]: string;
  };
  queryParams?: {
    [key: string]: string;
  };
}

export interface UseApiProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS';
  url: string;
  headers?: {
    [key: string]: string;
  };
  formData?: boolean;
  onError?: (error: unknown) => void;
}

/**
 * This hook is very generic and in most cases, we have some per
 * project (marketing site, admin frontend...) logic, such as how to
 * handle errors.
 *
 * You will typically want to use the wrapper hook found in each
 * project which includes error handling. An example of this is the
 * admin frontend useAdminApi.
 *
 * For this project, you'll want to use that hook instead which extends
 * this hook. Inside useAdminApi the error handling is done to create the
 * admin style toast messages on error and handle 403s etc.
 *
 * With some projects we do not have a wrapper hook and one should be created
 * if applicable.
 */
const useApi = <T>({ method, url, headers = {}, formData = false, onError }: UseApiProps) => {
  const [status, setStatus] = useState(INIT);
  const [responseData, setResponseData] = useState<T | null>(null);

  const { CancelToken } = axios;
  const cancelTokenSource = CancelToken.source();

  const call = async (data: ApiCallProps = {}) => {
    const { payload, urlParams, queryParams } = data;

    setStatus(LOADING);
    setResponseData(null);

    let urlWithParams = url;

    if (urlParams && Object.keys(urlParams).length > 0) {
      Object.entries(urlParams).forEach(([key, value]) => {
        urlWithParams = urlWithParams.replace(`:${key}`, value);
      });
    }

    if (queryParams && Object.keys(queryParams).length > 0) {
      urlWithParams = `${urlWithParams}?${new URLSearchParams(queryParams).toString()}`;
    }

    const requestData = formData ? new FormData() : payload;

    if (requestData instanceof FormData && payload) {
      Object.entries(payload).forEach(([key, value]) => {
        if (typeof value === 'object') {
          value.forEach((subValue: string) => {
            requestData.append(`${key}[]`, subValue);
          });
        } else {
          requestData.append(key, value);
        }
      });
    }

    try {
      const result = await axios({
        method,
        url: urlWithParams,
        data: requestData,
        headers,
        withCredentials: true,
        cancelToken: cancelTokenSource.token,
      });
      console.log(result);

      setStatus(SUCCESS);
      setResponseData(result.data);
    } catch (error) {
      console.log(error);
      setStatus(FAILED);

      if (onError) {
        onError(error);
      }
    }
  };

  const cancel = () => {
    cancelTokenSource.cancel();
  };

  return {
    call,
    status,
    responseData,
    isLoading: status === LOADING,
    isSuccess: status === SUCCESS,
    isFailed: status === FAILED,
    cancel,
  };
};

export default useApi;
