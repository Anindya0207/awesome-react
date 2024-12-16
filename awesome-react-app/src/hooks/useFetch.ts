import React, { useCallback, useState } from 'react';

const useFetch = () => {
  const [asyncStatus, setAsyncStatus] = useState<string>('pending');
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const fetchApi = useCallback(
    async (
      url: string,
      method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
      data: any,
      headers = {},
    ) => {
      try {
        setError(null);
        setResponse(null);
        setAsyncStatus('INIT');
        const options: RequestInit = {
          method,
          headers: {
            'Content-Type': 'application/json', // Set default headers
            ...headers,
          },
        };
        if (
          data &&
          (method === 'POST' || method === 'PUT' || method === 'PATCH')
        ) {
          options.body = JSON.stringify(data);
        }
        const response = await fetch(url, options);
        let res;
        const isJson =
          response.ok &&
          response.headers.get('Content-type') == 'application/json';
        if (isJson) {
          res = await response.json();
        } else {
          res = await response.text();
        }
        setResponse(res);
        setAsyncStatus('SUCCESS');
        setError(null);
      } catch (err) {
        setAsyncStatus('FAILED');
        setError(err);
        setResponse(null);
      }
    },
    [],
  );
  return { asyncStatus, response, error, fetchApi };
};

export default useFetch;
