import React, { PropsWithChildren, useContext } from 'react';
import { Node } from '../models';

interface Props {
  data: Node[];
}

interface ITreeContext {
  nodes: Node[];
}

export const TreeContext = React.createContext<ITreeContext>({ nodes: [] });

const TreeProvider: React.FC<PropsWithChildren<Props>> = (props) => {
  const { data, children } = props;
  return (
    <TreeContext.Provider value={{ nodes: data }}>
      {children}
    </TreeContext.Provider>
  );
};

export const useTree = () => useContext(TreeContext);

export default TreeProvider;
