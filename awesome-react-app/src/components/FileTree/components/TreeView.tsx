import React, { useCallback, useState, useEffect } from 'react';
import { Flex1, FlexColumn, FlexRow } from '../../../Flex';
import { Node } from '../models';
import useTree, { TreeProvider } from '../TreeProvider';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Text } from '../../../BaseElements';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

const TreeNode: React.FC<{ node: Node; parent: Node | null }> = ({
  node,
  parent,
}) => {
  const [isOpen, toggle] = useState<boolean>(false);
  const { state, dispatch } = useTree();
  const { selected } = state;
  useEffect(() => {
    if (selected?.id == node.id) {
      toggle(true);
    }
  }, [node.children?.length]);
  const selectNode = useCallback(() => {
    dispatch({
      type: 'SELECT_NODE',
      payload: { id: node.id, parentId: parent?.id, type: node.type },
    });
  }, [node]);
  const handleDelete = useCallback(() => {
    dispatch({
      type: 'DELETE_NODE',
      payload: { id: node.id },
    });
  }, [node]);
  return (
    <FlexColumn>
      <FlexRow>
        <FlexRow
          justifyContent="center"
          alignItems="center"
          mb="5px"
          style={{ cursor: 'pointer' }}
        >
          <FlexRow
            justifyContent="center"
            alignItems="center"
            padding="4px"
            borderRadius="6px"
            {...(selected?.id == node.id && { background: '#e1e2e2' })}
            onClick={() => {
              if (node.type == 'folder') {
                toggle(!isOpen);
              }
              selectNode();
            }}
          >
            {node.type == 'file' ? (
              <InsertDriveFileOutlinedIcon
                style={{ fontSize: 15, marginLeft: 5, marginTop: 2 }}
              />
            ) : isOpen ? (
              <KeyboardArrowDownIcon />
            ) : (
              <KeyboardArrowRightIcon />
            )}
            <Text mt="5px" mx="5px" fontSize={16} fontWeight={600}>
              {node.label}
            </Text>
          </FlexRow>
          <DeleteOutlineIcon
            style={{ fontSize: 18, marginTop: 2, color: 'red' }}
            onClick={handleDelete}
          />
        </FlexRow>
      </FlexRow>
      {node.type == 'folder' && isOpen && !!node.children?.length && (
        <FlexColumn ml={40}>
          {node.children.map((n) => (
            <TreeNode key={n.id} node={n} parent={node} />
          ))}
        </FlexColumn>
      )}
    </FlexColumn>
  );
};
const Root: React.FC<{}> = () => {
  const { state, dispatch } = useTree();
  const { nodes } = state;
  const handleAddNode = (type: 'file' | 'folder') => {
    dispatch({
      type: 'ADD_NODE',
      payload: {
        newNode: {
          id: Date.now().toString(),
          label: type == 'folder' ? 'New Folder' : 'New File',
          children: type == 'folder' ? [] : undefined,
          type,
        },
      },
    });
  };
  return (
    <Flex1
      flexDirection="column"
      width={500}
      boxShadow="0 0 5px #999"
      borderRadius={5}
      p="10px"
    >
      <FlexRow alignSelf="flex-end">
        <CreateNewFolderOutlinedIcon
          onClick={() => handleAddNode('folder')}
          style={{ marginTop: 2, cursor: 'pointer', marginRight: 5 }}
        />
        <NoteAddOutlinedIcon
          onClick={() => handleAddNode('file')}
          style={{ cursor: 'pointer' }}
        />
      </FlexRow>
      {nodes.map((node) => (
        <TreeNode key={node.id} node={node} parent={null} />
      ))}
    </Flex1>
  );
};
const App: React.FC<{}> = () => {
  return (
    <TreeProvider>
      <Root />
    </TreeProvider>
  );
};

export default App;
