import { Select, TextInput } from '@mantine/core';
import classes from './ContainedInput.module.css';

export function ContainedInputs() {
  return (
    <>
      <TextInput label="Ocassion" placeholder="Fancy Dinner, College Class, etc." classNames={classes} />

      <Select
        mt="md"
        comboboxProps={{ withinPortal: true }}
        data={['Winter', 'Spring', 'Summer', 'Fall']}
        placeholder="Pick one"
        label="Season"
        classNames={classes}
      />

      <TextInput label="Tops" placeholder="Blue top" classNames={classes} />

      <TextInput label="Bottoms" placeholder="White pants" classNames={classes} />

      <TextInput label="Shoes" placeholder="White sneakers" classNames={classes} />
    </>
  );
}
