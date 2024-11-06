import React, { useState } from 'react';
import { FlexColumn } from '../../Flex';

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}
const TreeView: React.FC<{ data: TreeNode[] }> = (props) => {
  const { data } = props;
  return (
    <FlexColumn>
      {data.map((d) => (
        <TreeNodeView node={d} />
      ))}
    </FlexColumn>
  );
};

const TreeNodeView: React.FC<{ node: TreeNode }> = (props) => {
  const { node } = props;
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const handleToggle = () => {
    setExpanded(val => !val)
  }
  return (
    <FlexColumn ml="20px" key={node.id}>
      <div onClick={handleToggle}>
        {node.children ? (
          <>
            {isExpanded ? '📂' : '📁'} {node.label}
          </>
        ) : (
          <span>📄 {node.label}</span>
        )}
      </div>
      {isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeNodeView key={child.id} node={child} />
          ))}
        </div>
      )}
    </FlexColumn>
  );
};

export default TreeView;
