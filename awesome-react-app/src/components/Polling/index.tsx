import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Flex1, FlexColumn } from '../../Flex';

interface Props {
  baseUrl: string;
  frequency: number;
}

const Polling: React.FC<Props> = (props) => {
  const { baseUrl, frequency = 3000 } = props;
  const [value, setValue] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(baseUrl);
  const abortControllerRef = useRef<AbortController | null>(null);
  let interval = useRef<any>(0);

  useEffect(() => {
    setUpPolling();
    return () => {
      interval.current && clearInterval(interval.current);
      abortControllerRef.current && abortControllerRef.current.abort();
    };
  }, []);

  const setUpPolling = useCallback(() => {
    interval.current = setInterval(() => {
      poll();
    }, frequency);
  }, []);

  useEffect(() => {
    if (url != baseUrl) {
      setUrl(baseUrl);
      interval.current && clearInterval(interval.current);
      abortControllerRef.current && abortControllerRef.current.abort();
      setUpPolling();
    }
  }, [baseUrl]);

  const poll = useCallback(async () => {
    try {
      setLoading(true);
      abortControllerRef.current = new AbortController();
      const response = await fetch(url, {
        signal: abortControllerRef.current?.signal,
      });
      const res = await response.json();
      setValue(res);
      setLoading(false);
    } catch {
      setLoading(false);
      // do nothing
    }
  }, []);
  return (
    <Flex1 flexDirection="column">
      <FlexColumn>
        <table style={{width: '100vw', padding: '30px' }}>
          <thead>
            <th>ID</th>
            <th>User ID</th>
            <th>Title</th>
            <th>Body</th>
          </thead>
          <tbody>
            {(value || []).map((val: any) => {
              const { id, userId, title, body } = val;
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{userId}</td>
                  <td>{title}</td>
                  <td>{body}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </FlexColumn>
    </Flex1>
  );
};
export default Polling;
