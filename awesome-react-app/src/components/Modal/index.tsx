import React, { useState } from 'react';
import { Flex1, FlexColumn } from '../../Flex';
import withModal, { WithModalInjectedProps } from './Modal';
import { Button } from '../../BaseElements';

interface OwnProps {
  show: boolean;
}
const ModalContent: React.FC<{}> = () => {
  return (
    <Flex1 flexDirection="column">
      <FlexColumn mb={10}>This is the Modal header</FlexColumn>
      <FlexColumn flex={1} fontSize={20}>
        This is the Modal Body
      </FlexColumn>
      <FlexColumn alignSelf="flex-end">
        <Button>Submit</Button>
      </FlexColumn>
    </Flex1>
  );
};

const ModalExample: React.FC<WithModalInjectedProps & OwnProps> = (props) => {
  const { showModal, hideModal } = props;
  return (
    <Flex1 flexDirection="column">
      <Button
        onClick={() => {
          showModal(<ModalContent />, {
            showCloseIcon: true,
            easyClose: true,
          });
        }}
      >
        Show Modal
      </Button>
      <Button onClick={() => hideModal()}>Hide Modal</Button>
    </Flex1>
  );
};

export default withModal<OwnProps>({})(ModalExample);
