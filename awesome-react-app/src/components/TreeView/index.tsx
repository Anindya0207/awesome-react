import React, { useState, useEffect, useTransition } from 'react';
import { fetchData } from './api';
import { Node } from './models';
import Spinner from '../common/Spinner';
import TreeProvider from './providers';
import TreeView from './components/TreeView';

const Root: React.FC<{}> = (props) => {
  const [isPending, startTransition] = useTransition();
  const [initialData, setInitialData] = useState<Node[]>([]);
  useEffect(() => {
    startTransition(async () => {
      const response = await fetchData();
      setInitialData(response);
    });
    return () => {};
  }, []);
  if (isPending) return <Spinner />;
  return (
    <TreeProvider data={initialData}>
      <TreeView />
    </TreeProvider>
  );
};

export default Root;
