import React, { useActionState, useOptimistic } from 'react';
import { Flex1 } from '../../Flex';
import { Button, Form, Input, Label, Section, Select } from '../../BaseElements';

interface Props {
  onSubmit: (initialState: any, formData: any) => any;
}

const MyForm: React.FC<Props> = ({ onSubmit }) => {
  const [response, wrappedAction, isSubmitting] = useActionState(
    onSubmit,
    {} as any,
  );
  const [optimisticStatus, setOptimistic] = useOptimistic(response);
  return (
    <Flex1 flexDirection="column">
      {optimisticStatus.status && <Label>{optimisticStatus.message}</Label>}
      <Form
        display="flex"
        flexDirection="column"
        flex={1}
        width="300px"
        padding={3}
        boxShadow="0 0 3px #999"
        mb={4}
        action={(args) => {
          setOptimistic({
            status: 'success',
            message: 'Yay, optimistically done',
          });
          wrappedAction(args);
        }}
      >
        <Section my={2} display="flex" flex={1} flexDirection="column">
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" name="name" />
        </Section>
        <Section my={2} display="flex" flex={1} flexDirection="column">
          <Label>Gender</Label>
          <Section display="flex">
            <Section display="flex" alignItems="center">
              <Input type="radio" id="male" name="gender" value="male"></Input>
              <Label htmlFor="male" mt="3px" mr={3} ml={2}>
                Male
              </Label>
            </Section>
            <Section display="flex" alignItems="center">
              <Input
                type="radio"
                id="female"
                name="gender"
                value="female"
              ></Input>
              <Label htmlFor="female" mt="3px" mr={3} ml={2}>
                Female
              </Label>
            </Section>
            <Section display="flex" alignItems="center">
              <Input
                type="radio"
                id="other"
                name="gender"
                value="other"
              ></Input>
              <Label htmlFor="other" mt="3px" mr={3} ml={2}>
                Other
              </Label>
            </Section>
          </Section>
        </Section>
        <Section my={2} display="flex" flex={1} flexDirection="column">
          <Label htmlFor="country">Country</Label>
          <Select id="country" name="country">
            <optgroup label="Asia">
              <option value="india">India</option>
              <option value="pakistan">Pakistan</option>
              <option value="china">China</option>
            </optgroup>
            <optgroup label="Europe">
              <option value="russia">Russia</option>
              <option value="france">France</option>
              <option value="uskraine">Ukraine</option>
            </optgroup>
          </Select>
        </Section>
        <Section my={2} display="flex" flex={1} flexDirection="column">
          <Label htmlFor="age">Age</Label>
          <Input type="range" id="age" min="18" max="65" name="age" />
        </Section>
        <Section my={2} display="flex" flex={1} flexDirection="column">
          <Label>Role</Label>
          <Section display="flex" flexDirection="row" alignItems="center">
            <Input type="checkbox" id="frontend" name="role" value="frontend" />
            <Label htmlFor="frontend" mt="3px" mx={3}>
              Frontend
            </Label>
            <Input type="checkbox" id="backend" name="role" value="backend" />
            <Label htmlFor="backend" mt="3px" mx={3}>
              Backend
            </Label>
          </Section>
        </Section>
        <Section
          my={2}
          display="flex"
          flex={1}
          flexDirection="column"
          alignItems="flex-end"
        >
          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
          {isSubmitting && <Label>Submitting.. please wait</Label>}
        </Section>
      </Form>
    </Flex1>
  );
};

export default MyForm;
