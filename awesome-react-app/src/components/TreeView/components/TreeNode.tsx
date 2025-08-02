import React, { useMemo, useEffect, useCallback, useState } from 'react';
import { Node, TNode } from '../models';
import { Flex, Label, Section } from '../../../BaseElements';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FolderSpecialOutlined from '@mui/icons-material/FolderOutlined';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './style.css';

interface Props {
  node: Node;
  isParentOpen?: boolean;
}
const TreeNode: React.FC<Props> = (props) => {
  const { node, isParentOpen } = props;
  const [isOpen, setIsOpen] = useState<boolean>(!!isParentOpen);
  const { id, name, type } = node;

  useEffect(() => {
    if (!isParentOpen) {
      setIsOpen(false);
    }
  }, [isParentOpen]);

  const hasChildren = type === 'folder' && !!node.children?.length;
  const noOfFiles = useMemo(() => {
    return type === 'folder'
      ? node.children?.filter((ch) => ch.type === 'file').length
      : 0;
  }, [type]);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
  const renderIcon = useCallback(
    (type: TNode, name: string) => {
      switch (type) {
        case 'file':
          return <InsertDriveFileOutlinedIcon />;
        case 'folder': {
          if (!hasChildren) {
            return <FolderSpecialOutlined />;
          }
          return isOpen ? (
            <Section
              tabIndex={0}
              role="region"
              aria-labelledby={`Collapse ${name}`}
              onClick={toggle}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === 'Enter' || e.key == ' ') {
                  toggle();
                }
              }}
            >
              <KeyboardArrowDownIcon />
            </Section>
          ) : (
            <Section
              tabIndex={0}
              role="region"
              aria-labelledby={`Expand ${name}`}
              onClick={toggle}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === 'Enter' || e.key == ' ') {
                  toggle();
                }
              }}
            >
              <KeyboardArrowRightIcon />
            </Section>
          );
        }
        default:
          return null;
      }
    },
    [toggle, noOfFiles],
  );

  const renderLabel = useCallback(
    (type: TNode, name: string) => {
      if (type === 'folder') {
        return (
          <Section display="flex" flexDirection="row">
            <Label>{name} </Label>
            {!!noOfFiles && <Label>({noOfFiles})</Label>}
          </Section>
        );
      }
      if (type === 'file') {
        return <Label>{name}</Label>;
      }
    },
    [noOfFiles],
  );
  return (
    <Flex key={id} flexDirection="column">
      <Section
        tabIndex={0}
        role="region"
        aria-labelledby={name}
        display="flex"
        flexDirection="row"
      >
        {renderIcon(type, name)}
        {renderLabel(type, name)}
      </Section>
      {!!hasChildren && (
        <Section ml={30} className={isOpen ? 'child-visible' : 'child-hidden'}>
          {node.children?.map((ch) => {
            return <TreeNode isParentOpen={isOpen} node={ch} key={ch.id} />;
          })}
        </Section>
      )}
    </Flex>
  );
};

export default TreeNode;
