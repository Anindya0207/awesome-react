import React, { useCallback, useMemo, useState } from 'react';
import { FlexColumn } from '../../Flex';
import { debounce } from '../../utils';
import { Box, Text } from '../../BaseElements';
import './AutoComplete.css';

interface AutoCompleteProps {
  onChange: (val: string) => Promise<any>;
  data: string[];
  isLoading: boolean;
}
const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const [val, setVal] = useState<string>('');
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const { data, onChange } = props;

  const onChangeText = useCallback(
    (event: any) => {
      const _val = event.target.value;
      setVal(_val);
      if (_val && _val.trim()) {
        onChange(val);
        setShowOptions(true);
      } else {
        setShowOptions(false);
      }
    },
    [onChange, data],
  );
  const debouncedOnChange = useMemo(
    () => debounce(onChangeText, 500),
    [onChange],
  );
  return (
    <FlexColumn position="relative">
      <input type="text" id="autocomplete" onChange={debouncedOnChange} />
      {showOptions && !!data.length && (
        <FlexColumn className="popoverWrapper">
          {data.map((d) => (
            <Box maxWidth={'100%'}>
              <Box className="textLine">{d}</Box>
            </Box>
          ))}
        </FlexColumn>
      )}
    </FlexColumn>
  );
};

export default AutoComplete;
