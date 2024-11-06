import React from 'react';
import TreeView from './TreeView';

const treeData = [
  {
    id: '1',
    label: 'Root Node',
    children: [
      {
        id: '1-1',
        label: 'Child Node 1',
        children: [
          {
            id: '1-1-1',
            label: 'Grandchild Node 1',
          },
          {
            id: '1-1-2',
            label: 'Grandchild Node 2',
          },
        ],
      },
      {
        id: '1-2',
        label: 'Child Node 2',
      },
    ],
  },
  {
    id: '2',
    label: 'Another Root Node',
    children: [
      {
        id: '2-1',
        label: 'Child Node 3',
      },
    ],
  },
];

const TreeViewApp: React.FC = () => {
  return <TreeView data={treeData} />;
};

export default TreeViewApp;
