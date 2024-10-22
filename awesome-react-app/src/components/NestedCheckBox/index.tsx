import React, { useMemo, useState } from 'react';
import { Flex1, FlexColumn, FlexRow } from '../../Flex';
import './index.css';

interface Props {}

interface CheckedState {
  [k: string]: {
    id: string;
    name: string;
    checked: boolean;
    children: CheckedState;
  };
}
const NestedCheckBox: React.FC<Props> = (props) => {
  const data = useMemo(() => {
    return [
      {
        id: 1,
        name: 'Group 1',
        children: [
          {
            id: 1,
            name: 'Name 1',
          },
          {
            id: 2,
            name: 'Name 2',
          },
          ,
          {
            id: 3,
            name: 'Name 3',
          },
          {
            id: 4,
            name: 'Name 4',
          },
        ],
      },
      {
        id: 2,
        name: 'Group 2',
        children: [
          {
            id: 5,
            name: 'Name 5',
          },
          {
            id: 6,
            name: 'Name 6',
          },
          ,
          {
            id: 7,
            name: 'Name 7',
          },
          {
            id: 8,
            name: 'Name 8',
          },
        ],
      },
    ];
  }, []);
  const normalisedData: any = useMemo(() => {
    return data.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.id]: {
          ...curr,
          checked: false,
          children: curr.children.reduce(
            (ac, ch: any) => ({ ...ac, [ch.id]: { ...ch, checked: false } }),
            {},
          ),
        },
      }),
      {},
    );
  }, [data]);
  const [checked, setChecked] = useState<CheckedState>(
    normalisedData as CheckedState,
  );
  return (
    <Flex1 flexDirection="column">
      {data.map((group) => (
        <FlexColumn my={2} key={`group-${group.id}`}>
          <FlexRow alignItems="center">
            <input
              type="checkbox"
              id={`group-${group.id}`}
              {...(!!checked[group.id].checked ? { checked: true } : {})}
              onClick={() => {
                setChecked((prev) => {
                  const updatedChildren = Object.keys(
                    prev[group.id].children,
                  ).reduce(
                    (acc: CheckedState, curr) => ({
                      ...acc,
                      [curr]: {
                        ...prev[group.id].children[curr],
                        checked: !prev[group.id].checked,
                      },
                    }),
                    {},
                  );
                  return {
                    ...prev,
                    [group.id]: {
                      ...prev[group.id],
                      checked: !prev[group.id].checked,
                      children: updatedChildren,
                    },
                  };
                });
              }}
            />
            <label htmlFor={`group-${group.id}`}>{group.name}</label>
          </FlexRow>
          <FlexColumn pl={20}>
            {group.children.map((child: any) => (
              <FlexRow alignItems="center" key={`child-${child?.id}`}>
                <input
                  type="checkbox"
                  id={`child-${child?.id}`}
                  {...(!!checked[group.id].checked ||
                  !!checked[group.id].children[child.id].checked
                    ? { checked: true }
                    : {})}
                  onClick={() => {
                    setChecked((prev) => {
                      const updatedCh =
                        !prev[group.id].children[child.id].checked;
                      const allSame = Object.keys(prev[group.id].children)
                        .filter((ch) => ch != child.id)
                        .every(
                          (ch) =>
                            prev[group.id].children[ch].checked === updatedCh,
                        );
                      return {
                        ...prev,
                        [group.id]: {
                          ...prev[group.id],
                          checked: allSame && !!updatedCh,
                          children: {
                            ...prev[group.id].children,
                            [child.id]: {
                              ...prev[group.id].children[child.id],
                              checked: updatedCh,
                            },
                          },
                        },
                      };
                    });
                  }}
                />
                <label htmlFor={`child-${child?.id}`}>{child?.name}</label>
              </FlexRow>
            ))}
          </FlexColumn>
        </FlexColumn>
      ))}
    </Flex1>
  );
};

export default NestedCheckBox;
