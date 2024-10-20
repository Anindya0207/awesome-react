import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Flex1, FlexColumn, FlexRow } from '../../Flex';
import { Box, Text } from '../../BaseElements';
import './Select.css';

export interface SelectProps {
  id: string;
  options: any[];
  valueAccessor: string;
  labelAccessor: string;
  onFocus?: (ev: any) => void;
  onChange?: (option: any | any[]) => void;
  multiple?: boolean;
  containerStyles?: React.CSSProperties;
}
const Select: React.FC<SelectProps> = (props) => {
  const {
    id,
    options,
    labelAccessor,
    valueAccessor,
    containerStyles,
    multiple,
    onFocus,
    onChange,
  } = props;
  const sortedOptions = useMemo(
    () => options.sort((a, b) => a[labelAccessor] - b[labelAccessor]),
    [options],
  );
  const [filteredOptions, setFilteredOptions] = useState<any>(sortedOptions);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const allowedClickSites = [
      `select-option-container`,
      `select-control`,
      `select-input`,
      `select-option`,
    ];
    document.addEventListener(
      'click',
      (ev) => {
        console.log(ev.target as any);
        const isValidClick = allowedClickSites.find(
          (s) => (ev.target as any)?.id.indexOf(s) > -1,
        );
        if (!isValidClick) {
          setShowOptions(false);
        }
      },
      true,
    );
  });
  const handleFocus = (ev: any) => {
    ev.preventDefault();
    setShowOptions(true);
    onFocus && onFocus(ev);
  };
  const handleOptionSelect = (option: any) => {
    if (multiple) {
      setSelectedOption((prev: any) => [...(prev || []), option]);
      onChange && onChange([...(selectedOption || []), option]);
      setFilteredOptions(() =>
        sortedOptions.filter(
          (p: any) =>
            ![...(selectedOption || []), option].find(
              (k) => k[valueAccessor] == p[valueAccessor],
            ),
        ),
      );
    } else {
      setSelectedOption(option);
      onChange && onChange(option);
      setFilteredOptions(() =>
        sortedOptions.filter(
          (p: any) => p[valueAccessor] !== option[valueAccessor],
        ),
      );
      setShowOptions(false);
    }
  };
  const handleOptionDelete = (option: any) => {
    setSelectedOption((prev: any) =>
      [...(prev || [])].filter(
        (p) => p[valueAccessor] != option[valueAccessor],
      ),
    );
    setFilteredOptions((prev: any) => [option, ...(prev || [])]);
    setShowOptions(true);
  };
  return (
    <Flex1
      id={`select-control-${id}`}
      flexDirection="column"
      style={containerStyles || {}}
    >
      <FlexColumn
        minHeight={40}
        border="1px solid #000"
        borderRadius="4px"
        position="relative"
      >
        {selectedOption && !multiple && (
          <Text height={40} padding="8px">
            {selectedOption[labelAccessor]}
          </Text>
        )}
        {!!multiple && (
          <FlexRow padding="0 6px" flexWrap="wrap">
            {(selectedOption || []).map((option: any) => (
              <FlexRow key={`selected-option-${option[valueAccessor]}`}>
                <FlexRow
                  margin="4px 2px"
                  padding="2px 8px"
                  background="#ddd"
                  alignItems="center"
                  mr={0}
                  justifyContent="center"
                >
                  <Text>{option[labelAccessor]}</Text>
                </FlexRow>
                <FlexRow
                  margin="4px 2px"
                  ml={0}
                  padding="2px 8px"
                  background="#ffc5c5"
                  alignItems="center"
                  justifyContent="center"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleOptionDelete(option)}
                >
                  <Text>×</Text>
                </FlexRow>
              </FlexRow>
            ))}
            <input
              ref={inputRef}
              id={`select-input-${id}`}
              type="text"
              name={id}
              autoComplete="false"
              style={{
                border: 'none',
                padding: '0 8px',
                height: 38,
                outline: 'none',
                width: '10px',
                background: 'transparent',
              }}
              onFocus={handleFocus}
            />
          </FlexRow>
        )}
        {!multiple && (
          <input
            ref={inputRef}
            id={`select-input-${id}`}
            type="text"
            name={id}
            autoComplete="false"
            style={{
              border: 'none',
              padding: '0 8px',
              height: 38,
              outline: 'none',
              position: 'absolute',
              width: '100%',
              background: 'transparent',
            }}
            onFocus={handleFocus}
          />
        )}
      </FlexColumn>
      {showOptions && (
        <FlexColumn
          id={`select-option-container`}
          border="1px solid #000"
          borderRadius={4}
          mt={2}
        >
          {filteredOptions.map((option: any) => (
            <FlexColumn
              id={`select-option-${option[valueAccessor]}`}
              padding={'4px 8px'}
              className={`select-option`}
              key={`option-${option[valueAccessor]}`}
              onClick={() => handleOptionSelect(option)}
            >
              <Text id={`select-option-text-${option[valueAccessor]}`}>
                {option[labelAccessor]}
              </Text>
            </FlexColumn>
          ))}
        </FlexColumn>
      )}
    </Flex1>
  );
};

export default Select;
