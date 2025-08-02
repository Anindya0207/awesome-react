import { Node } from "../models";

export const backendData: Node[] = [
  {
    id: '1',
    name: 'Office Map',
    type: 'file',
  },
  {
    id: '2',
    name: 'New Employee Onboarding',
    type: 'folder',
    children: [
      {
        id: '8',
        name: 'Onboarding Materials',
        type: 'file',
      },
      {
        id: '9',
        name: 'Training',
        type: 'file',
      },
    ],
  },
  {
    id: '3',
    name: 'Office Events',
    type: 'folder',
    children: [
      {
        id: '6',
        name: '2018',
        type: 'folder',
        children: [
          {
            id: '10',
            name: 'Summer Picnic',
            type: 'folder',
            children: [
              {
                id: '101',
                name: 'Summer Picnic',
                type: 'file',
              },
              {
                id: '102',
                name: "Valentine's Day Party",
                type: 'file',
              },
              {
                id: '103',
                name: "New Year's Party",
                type: 'file',
              },
            ],
          },
          {
            id: '11',
            name: "Valentine's Day Party",
            type: 'file',
          },
          {
            id: '12',
            name: "New Year's Party",
            type: 'file',
          },
        ],
      },
      {
        id: '7',
        name: '2017',
        type: 'folder',
        children: [
          {
            id: '13',
            name: 'Company Anniversary Celebration',
            type: 'file',
          },
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'Public Holidays',
    type: 'file',
  },
  {
    id: '5',
    name: 'Vacations and Sick Leaves',
    type: 'file',
  },
];
