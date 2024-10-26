import { Select, TextInput, Button, Text, Code, Group } from '@mantine/core';
import classes from './ContainedInput.module.css';

export function ContainedInputs() {
  return (
    <div className={classes.container}>
      <div className={classes.inputGroup}>
        <Group className={classes.header} justify='space-between'>
              <Text
                component='span'
                variant='gradient'
                gradient={{ from: 'pink', to: 'white' }}
                inherit
                style={{ fontWeight: 1000, fontSize: '2rem' }}
              >
                Outfit Generator
              </Text>

              <Code fw={700} className={classes.version}>
                v0.1.7
              </Code>
            </Group>
        <TextInput label="Occasion" placeholder="Fancy Dinner, College Class, etc." classNames={classes} />

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
        
        <div>
          <Button
            component="a"
            href=""
            style={{
              alignSelf: 'center',
              backgroundColor: 'var(--mantine-color-pink-5)', // Corrected style syntax
              margin:'20px 0 20px 0px'
            }}
            >
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
}
