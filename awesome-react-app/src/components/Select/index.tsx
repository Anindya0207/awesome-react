import React from 'react';
import Select from './Select';
import { FlexColumn } from '../../Flex';

const SelectExample: React.FC<{}> = () => {
  const countries = [
    { label: 'India', value: 'IN' },
    { label: 'Australia', value: 'AUS' },
    { label: 'Bangladesh', value: 'BAN' },
    { label: 'England', value: 'ENG' },
    { label: 'Pakistan', value: 'PAK' },
    { label: 'Afganisthan', value: 'AFG' },
    { label: 'United States', value: 'US' },
    { label: 'United Kingdom', value: 'UK' },
    { label: 'Dubai', value: 'DUB' },
    { label: 'Russia', value: 'RUS' },
  ];
  return (
    <FlexColumn>
      <label htmlFor="country">Select Country </label>
      <Select
        multiple
        id="country"
        options={countries}
        valueAccessor="value"
        labelAccessor="label"
        containerStyles={{ maxWidth: '600px' }}
        onChange={(arg) => console.log(arg)}
      />
    </FlexColumn>
  );
};

export default SelectExample;
