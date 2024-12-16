import React, { lazy } from 'react';

const DraggableGrid = lazy(() => import('./components/DraggableGrid'));
const DraggableGridExample: React.FC<{}> = () => {
  return (
    <DraggableGrid
      cellWidth={100}
      cellHeight={30}
      containerWidth={500}
      containerHeight={500}
    />
  );
};

export default DraggableGridExample;
