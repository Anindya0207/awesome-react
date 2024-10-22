import React, { useState } from 'react';
import { Flex1, FlexColumn, FlexRow } from '../../Flex';
import { Box, Button, Text } from '../../BaseElements';

interface Item {
  id: number;
  title: string;
}
const INITIAL_ITEMS: Item[] = [
  { id: 1, title: 'Item 1' },
  { id: 2, title: 'Item 2' },
  { id: 3, title: 'Item 3' },
  { id: 4, title: 'Item 4' },
  { id: 5, title: 'Item 5' },
  { id: 6, title: 'Item 6' },
  { id: 7, title: 'Item 7' },
];
const TransferList: React.FC<{}> = () => {
  const [box1Items, setBox1Items] = useState<Item[]>(INITIAL_ITEMS);
  const [box2Items, setBox2Items] = useState<Item[]>([]);
  const [draggingItem, setDraggingItem] = useState<Item | null>(null);
  const handleDragStart = (item: Item) => {
    setDraggingItem(item);
  };
  const allowDrop = (ev: any) => ev.preventDefault();
  const handleDropToBox1 = () => {
    if (draggingItem) {
      setBox1Items((prev) => [draggingItem, ...prev]);
      setBox2Items((prev) => prev.filter((p) => p.id != draggingItem.id));
      setDraggingItem(null);
    }
  };
  const handleDropToBox2 = () => {
    if (draggingItem) {
      setBox2Items((prev) => [...prev, draggingItem]);
      setBox1Items((prev) => prev.filter((p) => p.id != draggingItem.id));
      setDraggingItem(null);
    }
  };
  return (
    <Flex1 flexDirection="column" justifyContent="center" alignItems="center">
      <FlexRow>
        <FlexColumn
          width={200}
          p="16px"
          border="1px solid #000"
          borderRadius="8px"
          onDrop={handleDropToBox1}
          onDragOver={allowDrop}
        >
          {box1Items.map((item) => (
            <FlexRow
              key={`left-${item.id}`}
              flex={1}
              justifyContent="space-between"
              alignItems="flex-start"
              maxHeight={20}
              my={1}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setBox2Items((prev) => [...prev, item]);
                setBox1Items((prev) => prev.filter((p) => p.id != item.id));
              }}
              draggable
              onDragStart={() => handleDragStart(item)}
            >
              <Text>{item.title}</Text>
              <Text> → </Text>
            </FlexRow>
          ))}
        </FlexColumn>
        <FlexColumn
          width={200}
          ml={4}
          p="16px"
          border="1px solid #000"
          borderRadius="8px"
          onDrop={handleDropToBox2}
          onDragOver={allowDrop}
        >
          {box2Items.map((item) => (
            <FlexRow
              key={`left-${item.id}`}
              flex={1}
              justifyContent="space-between"
              alignItems="flex-start"
              my={1}
              maxHeight={20}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setBox1Items((prev) => [item, ...prev]);
                setBox2Items((prev) => prev.filter((p) => p.id != item.id));
              }}
              draggable
              onDragStart={() => handleDragStart(item)}
            >
              <Text> ← </Text>
              <Text>{item.title}</Text>
            </FlexRow>
          ))}
        </FlexColumn>
      </FlexRow>
    </Flex1>
  );
};

export default TransferList;
