import React, { PropsWithChildren, useEffect, useState } from 'react';
import { FlexRow } from '../../Flex';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Text } from '../../BaseElements';

interface Props {
  totalPages: number;
  selectedPage?: number;
  onPageChange?: (pageNumber: number) => void;
  boundary?: number;
  siblings?: number;
}

const Block: React.FC<
  PropsWithChildren<{ style?: any; selected?: boolean; onClick?: () => void }>
> = ({ children, selected, ...rest }) => {
  return (
    <FlexRow
      height="40px"
      width="40px"
      borderRadius="5px"
      boxShadow="0 0 3px #999"
      justifyContent="center"
      alignItems="center"
      mr={3}
      {...rest}
      style={{ cursor: 'pointer', ...rest.style }}
      {...(selected && {
        background: '#0070f3',
        color: '#fff',
        boxShadow: '0 0 3px #0070f3',
      })}
    >
      {children}
    </FlexRow>
  );
};
const Pagination: React.FC<Props> = (props) => {
  const {
    totalPages = 0,
    selectedPage = 1,
    onPageChange,
    boundary = 2,
    siblings = 2,
  } = props;
  const [blocks, setBlocks] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(selectedPage);
  useEffect(() => {
    const totalInVicitiy = 2 * siblings + 2 * boundary + 3;
    let array = Array.from({ length: totalInVicitiy }).fill(null);
    let i = 0;

    // samne se
    while (i < boundary) {
      array[i] = { value: i + 1 };
      i++;
    }

    // piche se
    let j = 0;
    i = totalInVicitiy - 1;
    while (i >= totalInVicitiy - boundary) {
      array[i] = { value: totalPages - j };
      j++;
      i--;
    }

    //firse samne se
    if (currentPage - siblings - 1 <= boundary + 1) {
      i = 0;
      while (i < totalInVicitiy - boundary - 1) {
        array[i] = { value: i + 1 };
        i++;
      }
    }

    // firse piche se
    else if (currentPage + siblings + 1 >= totalPages - boundary) {
      i = totalInVicitiy - 1;
      let j = 0;
      while (i >= boundary + 1) {
        array[i] = { value: totalPages - j };
        i--;
        j++;
      }
    }
    // biche se
    else {
      i = boundary;
      array[i++] = { value: '<<', goto: 'prev' };
      let j = 0;
      while (j < 2 * siblings + 1) {
        array[i] = { value: currentPage - siblings + j };
        i++;
        j++;
      }
    }

    // antim
    array[i] = { value: '>>', goto: 'next' };

    console.log(array);
    setBlocks(array);
  }, [siblings, boundary, currentPage]);
  if (totalPages === 0) return null;
  return (
    <FlexRow flex={1} width="600px" justifyContent="flex-start">
      <Block
        style={currentPage <= 1 ? { opacity: 0.5, pointerEvents: 'none' } : {}}
        onClick={() => {
          if (currentPage <= 1) return;
          setCurrentPage(currentPage - 1);
          onPageChange && onPageChange(currentPage - 1);
        }}
      >
        <KeyboardArrowLeftIcon />
      </Block>
      <>
        {blocks.map((block, i) => (
          <Block
            key={`block-${i}`}
            selected={block.value === currentPage}
            onClick={() => {
              if (block.goto === undefined) {
                setCurrentPage(block.value);
                onPageChange && onPageChange(block);
              } else {
                if (block.goto === 'prev') {
                  setCurrentPage((prev) => {
                    const newPage = prev - boundary - siblings - 2;
                    onPageChange && onPageChange(newPage);
                    return newPage;
                  });
                } else if (block.goto === 'next') {
                  setCurrentPage((prev) => {
                    const newPage = prev + boundary + siblings + 2;
                    onPageChange && onPageChange(newPage);
                    return newPage;
                  });
                }
              }
            }}
          >
            <>
              {block.goto === 'prev' && <KeyboardDoubleArrowLeftIcon />}
              {block.goto === 'next' && <KeyboardDoubleArrowRightIcon />}
              {block.goto === undefined && <Text> {block.value}</Text>}
            </>
          </Block>
        ))}
      </>
      <Block
        style={
          currentPage >= totalPages
            ? { opacity: 0.5, pointerEvents: 'none' }
            : {}
        }
        onClick={() => {
          if (currentPage >= totalPages) return;
          setCurrentPage(currentPage + 1);
          onPageChange && onPageChange(currentPage + 1);
        }}
      >
        <KeyboardArrowRightIcon />
      </Block>
    </FlexRow>
  );
};

export default Pagination;
