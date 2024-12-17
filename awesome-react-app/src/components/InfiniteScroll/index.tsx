import React, { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from '../common/InfiniteScroll';

const InfiniteScrollExample: React.FC<{}> = () => {
  const [tabledata, setTabledata] = useState<any>([]);
  useEffect(() => {
    fetchNext();
  }, []);
  const fetchNext = useCallback(async () => {
    try {
      const data = await fetch('https://jsonplaceholder.typicode.com/posts');
      const response = await data.json();
      const take10 = response.slice(0, 10);
      setTabledata((prev: any) => [...(prev || []), ...(take10 || [])]);
    } catch {
      // do nothing
    }
  }, []);

  return (
    <InfiniteScroll
      threshold={0.75}
      hasNext={() => {
        return true;
      }}
      next={fetchNext}
    >
      <table>
        <thead>
          <th>ID</th>
          <th>User ID</th>
          <th>Title</th>
          <th>Body</th>
        </thead>
        <tbody>
          {tabledata.map((tdata: any, index: number) => (
            <tr key={`${tdata.id}-${index}`}>
              <td>{tdata.id}</td>
              <td>{tdata.userId}</td>
              <td>{tdata.title}</td>
              <td>{tdata.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </InfiniteScroll>
  );
};

export default InfiniteScrollExample;
