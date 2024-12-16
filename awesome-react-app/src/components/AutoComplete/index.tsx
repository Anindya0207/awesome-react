import React, { useCallback, useState } from 'react';
import { FlexColumn } from '../../Flex';
import AutoComplete from './AutoComplete';

const AutoCompleteExample: React.FC<{}> = () => {
  const [data, setData] = useState<any>([]);
  const [apiStatus, setApiStatus] = useState<string>('INIT');

  const onChange = useCallback(async () => {
    setApiStatus('LOADING');
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const response = await res.json();
      setData(response.map((r: any) => r.title));
      setApiStatus('SUCCESS');
    } catch (err) {
      setData([]);
      setApiStatus('ERROR');
    }
  }, []);

  return (
    <FlexColumn>
      <label htmlFor="country">Select Country </label>
      <AutoComplete
        onChange={onChange}
        isLoading={apiStatus == 'LOADING'}
        data={data}
      />
    </FlexColumn>
  );
};

export default AutoCompleteExample;
