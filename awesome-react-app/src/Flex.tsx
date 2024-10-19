import styled from 'styled-components';
import { Box } from './BaseElements';
import { flexbox, FlexboxProps } from 'styled-system';
export const FlexBase = styled(Box)<FlexboxProps>`
  ${flexbox}
`;
export const Flex = styled(FlexBase)`
  display: flex;
`;
export const FlexColumn = styled(Flex)`
  flex-direction: column;
`;
export const FlexRow = styled(Flex)`
  flex-direction: row;
`;
export const FlexRowReverse = styled(Flex)`
  flex-direction: row-reverse;
`;
export const Flex1 = styled(Flex)`
  flex: 1;
`;
export const Flex2 = styled(Flex)`
  flex: 2;
`;
export const Flex3 = styled(Flex)`
  flex: 3;
`;
export const Flex4 = styled(Flex)`
  flex: 4;
`;
export const Flex5 = styled(Flex)`
  flex: 5;
`;
export const FlexEnd = styled(Flex)`
  justify-content: flex-end;
`;
export const FlexStart = styled(Flex)`
  justify-content: flex-start;
`;
export const Flex1Start = styled(Flex1)`
  justify-content: flex-start;
`;
export const Flex1Column = styled(Flex1)`
  flex-direction: column;
`;
export const FlexSpaceBetween = styled(Flex)`
  justify-content: space-between;
`;

export const FlexPrimaryMiddle = styled(Flex)`
  justify-content: center;
`;
export const FlexRowPrimaryMiddle = styled(FlexRow)`
  justify-content: center;
`;
export const FlexSecondaryMiddle = styled(Flex)`
  align-items: center;
`;
export const FlexSecondaryEnd = styled(Flex)`
  align-items: flex-end;
`;
export const FlexRowSecondaryMiddle = styled(FlexRow)`
  align-items: center;
`;
export const FlexPlaceMiddle = styled(Flex)`
  justify-content: center;
  align-items: center;
`;
export const FlexCenter = styled(Flex)`
  justify-content: center;
  align-items: center;
`;
export const FlexSpaceBetweenCenter = styled(FlexSpaceBetween)`
  align-items: center;
`;
export const FlexColumnSecondaryEnd = styled(FlexColumn)`
  align-items: flex-end;
`;
