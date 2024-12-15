import React, {
  useOptimistic,
  useTransition,
  useEffect,
  useState,
} from 'react';
import { Flex1, FlexColumn } from '../../Flex';
import { Button } from '../../BaseElements';

const delay = () => new Promise((res) => setTimeout(res, 1000));

const onethirdChance = () => Math.floor(Math.random() * 2) + 1;

const NewHookExample: React.FC<{}> = () => {
  const [data, setData] = useState<any>([]);
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState<number | null>(null);
  const [optimisticSelected, setOptimisticSelected] = useOptimistic(
    selected,
    (_, newSelected: number | null) => {
      console.log('here', newSelected);
      return newSelected;
    },
  );
  const callApi = async () => {
    await delay();
    if (onethirdChance() == 2) {
      throw new Error('does not matter');
    } else {
      return 'Done';
    }
  };
  const init = () => {
    startTransition(async (): Promise<any> => {
      try {
        await delay();
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts',
        );
        const res = await response.json();
        setData(res);
      } catch (err) {
        return err;
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleClick = (i: number) => {
    startTransition(async () => {
      setOptimisticSelected(i);
      try {
        await callApi();
        setSelected(i);
      } catch (err) {
        setOptimisticSelected(selected);
      }
    });
  };
  return (
    <Flex1 flexDirection="column">
      {isPending && <FlexColumn>please wait..</FlexColumn>}
      {!!data.length && (
        <Flex1 flexDirection="column">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>User ID</th>
                <th>Title</th>
                <th>body</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row: any, index: number) => (
                <tr
                  key={row.id}
                  style={
                    optimisticSelected == index ? { background: '#999' } : {}
                  }
                >
                  <td>{index + 1}</td>
                  <td>{row.userId}</td>
                  <td>{row.title}</td>
                  <td>{row.body}</td>
                  <td>
                    <Button onClick={() => handleClick(index)}>Select</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Flex1>
      )}
    </Flex1>
  );
};

export default NewHookExample;
