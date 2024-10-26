'use client';
import {
  Container,
  Group,
  Menu,
  Burger,
  Button,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconHanger } from '@tabler/icons-react';
import classes from './HeaderTabs.module.css';

export function HeaderTabs() {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <Group justify="space-between" style={{ width: '100%' }}>
          <IconHanger size={28} />

          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            withinPortal
          >
          </Menu>
        </Group>
      </Container>
    </div>
  );
}