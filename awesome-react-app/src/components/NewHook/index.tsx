import React, { useTransition, useEffect } from 'react';
import { Flex1, FlexColumn, FlexRow } from '../../Flex';
import MyForm from '../common/MyForm';
import Spinner from '../common/Spinner';
import { Text } from '../../BaseElements';

// These will go to a new file. Just keeping here for ease of reading
const delay = () => new Promise((res) => setTimeout(res, 1000));

const onethirdChance = () => Math.floor(Math.random() * 2) + 1;

const NewHookExample: React.FC<{}> = () => {
  const [pendingInitialFetch, fetchInitialData] = useTransition();

  const init = () => {
    // can use useTransition wherever we are making a async call to get the state. (which is not a form action most likely)
    fetchInitialData(async (): Promise<any> => {
      try {
        await delay();
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts',
        );
        const res = await response.json();
        // setData(res);
      } catch (err) {
        return err;
      }
    });
  };
  useEffect(() => {
    init();
  }, []);

  const onSubmit = async (_: any, formData: any) => {
    await delay();
    try {
      const payload = {
        name: formData.get('name'),
        gender: formData.get('gender'),
        country: formData.get('contry'),
        role: formData.getAll('role'),
      };
      if (onethirdChance() == 2) throw new Error('');
      return { status: 'success', message: 'Saved successfully' };
    } catch {
      return { status: 'failure', message: 'Could not save your data' };
    }
  };

  return (
    <Flex1 flexDirection="column">
      {pendingInitialFetch && (
        <FlexRow alignItems="center">
          <Text mr={3}>Please wait.. fetching initial data..</Text>
          <Spinner />
        </FlexRow>
      )}
      {!pendingInitialFetch && <MyForm onSubmit={onSubmit} />}
    </Flex1>
  );
};

export default NewHookExample;
