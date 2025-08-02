import React from 'react';
import { useTree } from '../providers';
import { Flex1 } from '../../../Flex';
import TreeNode from './TreeNode';

const TreeView: React.FC<{}> = () => {
  const { nodes } = useTree();
  return (
    <Flex1 flexDirection="column">
      {nodes.map((node) => (
        <TreeNode node={node} key={node.id} />
      ))}
    </Flex1>
  );
};

export default TreeView;
