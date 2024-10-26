'use client';
import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger, Avatar,
  Drawer, Menu,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
} from '@mantine/core';
import cx from 'clsx';
import { IconHanger } from '@tabler/icons-react';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import {
  IconChevronDown,
} from '@tabler/icons-react';
import classes from './HeaderMegaMenu.module.css';

const user = {
    name: 'Jane Spoonfighter',
    email: 'janspoon@fighter.dev',
    image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
  };

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <Box pb={120}>
      <header className={classes.header}>
  <Group justify="space-between" h="100%">
    <Anchor href="/dashboard" className={classes.link}>
      <IconHanger size={30} />
    </Anchor>

    <Group h="100%" gap={0} visibleFrom="sm">
      <a href="/fit-generator" className={classes.link}>Generate</a>
      <a href="/closet" className={classes.link}>Closet</a>
      <a href="/ask-closet" className={classes.link}>Ask</a>
      <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
        <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
          <Group justify="space-between" px="md">
            <Text fw={500}>Features</Text>
            <Anchor href="#" fz="xs">View all</Anchor>
          </Group>

          <Divider my="sm" />

          {/* <SimpleGrid cols={2} spacing={0}>
            {links}
          </SimpleGrid> */}

          <div className={classes.dropdownFooter}>
            <Group justify="space-between">
              <div>
                <Text fw={500} fz="sm">Get started</Text>
                <Text size="xs" c="dimmed">
                  Their food sources have decreased, and their numbers
                </Text>
              </div>
              <Button variant="default">Get started</Button>
            </Group>
          </div>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>

    {/* <Group h="70%" visibleFrom="sm">
      <a href='/' className={classes.link}>Log in</a>
    </Group> */}

    <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
    
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
        >
          <Group gap={7}>
            <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
            <Text fw={500} size="sm" lh={1} mr={3}>
              {user.name}
            </Text>
            <a href='/' className={classes.link}>Log in</a>
          </Group>
        </UnstyledButton>
      </Menu.Target>
    </Menu>
  </Group>
</header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <a href="/generate" className={classes.link}>Generate</a>
          <a href="/closet" className={classes.link}>Closet</a>
          <a href="/ask" className={classes.link}>Ask</a>

          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
              />
            </Center>
          </UnstyledButton>
          {/* <Collapse in={linksOpened}>{links}</Collapse> */}

          <Divider my="sm" />
        </ScrollArea>
      </Drawer>
    </Box>
  );
}