import { Node } from "../models";

export const treeData: Node[] = [
  {
    id: '1',
    label: 'Root Node',
    type: 'folder',
    children: [
      {
        id: '1-1',
        label: 'Child Node 1',
        type: 'folder',
        children: [
          {
            id: '1-1-1',
            label: 'Grandchild Node 1',
            type: 'file',
          },
          {
            id: '1-1-2',
            label: 'Grandchild Node 2',
            type: 'file',
          },
        ],
      },
      {
        id: '1-2',
        label: 'Child Node 2',
        type: 'file',
      },
    ],
  },
  {
    id: '2',
    label: 'Another Root Node',
    type: 'folder',
    children: [
      {
        id: '2-1',
        label: 'Child Node 3',
        type: 'file',
      },
    ],
  },
  {
    id: '3',
    label: 'Child Node 3',
    type: 'file',
  },
];
