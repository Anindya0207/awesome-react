import React, { useCallback, useRef } from 'react';
import { Flex1, FlexColumn } from '../../Flex';
import { Button, Text } from '../../BaseElements';
import TextInput from './TextInput';

interface ImperativeProps {
  isValid: () => boolean;
  getValue: () => string;
}
const TextInputWrapper: React.FC<{}> = (props) => {
  const textInputRef = useRef<HTMLInputElement & ImperativeProps>(null);
  const onSubmit = useCallback(() => {
    const isValid = textInputRef?.current?.isValid();
    const value = textInputRef?.current?.getValue();
    if (!isValid) {
      alert('Enter Proper value');
      return;
    }
    alert(value);
  }, []);
  return (
    <Flex1>
      <FlexColumn>
        <TextInput id="name" ref={textInputRef} />
        <FlexColumn py={2} alignItems="flex-end">
          <Button m={0} my={3} onClick={onSubmit}>
            Submit
          </Button>
        </FlexColumn>
      </FlexColumn>
    </Flex1>
  );
};

export default TextInputWrapper;
