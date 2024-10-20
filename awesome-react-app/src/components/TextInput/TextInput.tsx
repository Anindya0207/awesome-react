import React, {
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Box, Text } from '../../BaseElements';
import { FlexColumn, FlexRow } from '../../Flex';

interface TextInpoutProps {
  id: string;
  initialValue?: string;
}

const TextInput = React.forwardRef((props: TextInpoutProps, ref) => {
  const { id, initialValue } = props;
  const [value, setValue] = useState<string>(initialValue || '');
  const [error, setError] = useState<string>('');
  const inputRef = useRef(null);
  const isValidRef = useRef<boolean>(false);

  const validate = useCallback((val: string) => {
    if (!val || /[a-zA-Z0-9]/.test(val)) {
      return { isValid: true, message: '' };
    }
    return { isValid: false, message: 'Enter only digits and characters' };
  }, []);
  useImperativeHandle(ref, () => ({
    isValid: () => isValidRef.current,
    getValue: () => value,
  }));
  const handleInputChange = (event: any) => {
    const value = event.target.value;
    const validation = validate(value);
    if (validation.isValid) {
      isValidRef.current = true;
      setValue(event.target.value);
      setError('');
    } else {
      isValidRef.current = false;
      setError(validation.message);
    }
  };
  return (
    <FlexRow>
      <label htmlFor={id}>Enter some value : </label>
      <FlexColumn ml={3}>
        <input
          name={id}
          id={id}
          value={value}
          data-testid={id}
          ref={inputRef}
          onChange={handleInputChange}
        />
        {error && (
          <Text py={2} color="red" fontSize={10}>
            {error}
          </Text>
        )}
      </FlexColumn>
    </FlexRow>
  );
});

export default TextInput;
