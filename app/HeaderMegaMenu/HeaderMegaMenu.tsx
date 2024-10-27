'use client';
'use client';
import {
	HoverCard,
	Group,
	Button,
	UnstyledButton,
	Text,
	Anchor,
	Divider,
	Center,
	Box,
	Burger,
	Drawer,
	Menu,
	ScrollArea,
	rem,
	useMantineTheme,
} from '@mantine/core';
import cx from 'clsx';
import { IconHanger } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import classes from './HeaderMegaMenu.module.css';
import { getUserName } from '../../utility/authUtility';

export function HeaderMegaMenu() {
	const [user, setUserN] = useState<string | null>(null);

	useEffect(() => {
		const name = getUserName();
		if (name) setUserN(name);
	}, []);

	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
		useDisclosure(false);
	const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
	const theme = useMantineTheme();
	const [userMenuOpened, setUserMenuOpened] = useState(false);

	return (
		<Box>
			<header className={classes.header}>
				<Group justify='space-between' h='100%'>
					<Anchor href='/dashboard' className={classes.link}>
						<IconHanger size={30} />
					</Anchor>

					<Group h='100%' gap={0} visibleFrom='sm'>
						<a href='/fit-generator' className={classes.link}>
							Generate
						</a>
						<a href='/closet' className={classes.link}>
							Closet
						</a>
						<a href='/ask-closet' className={classes.link}>
							Ask
						</a>
						<HoverCard
							width={600}
							position='bottom'
							radius='md'
							shadow='md'
							withinPortal
						>
							<HoverCard.Dropdown style={{ overflow: 'hidden' }}>
								<Group justify='space-between' px='md'>
									<Text fw={500}>Features</Text>
									<Anchor href='#' fz='xs'>
										View all
									</Anchor>
								</Group>

								<Divider my='sm' />

								<div className={classes.dropdownFooter}>
									<Group justify='space-between'>
										<div>
											<Text fw={500} fz='sm'>
												Get started
											</Text>
											<Text size='xs' c='dimmed'>
												Their food sources have decreased, and their numbers
											</Text>
										</div>
										<Button variant='default'>Get started</Button>
									</Group>
								</div>
							</HoverCard.Dropdown>
						</HoverCard>
					</Group>

					<Burger
						opened={drawerOpened}
						onClick={toggleDrawer}
						hiddenFrom='sm'
					/>

					<Menu
						width={260}
						position='bottom-end'
						transitionProps={{ transition: 'pop-top-right' }}
						onClose={() => setUserMenuOpened(false)}
						onOpen={() => setUserMenuOpened(true)}
						withinPortal
					>
						<Menu.Target >
							<UnstyledButton style={{ height:"100%" }}
								className={cx(classes.user, {
									[classes.userActive]: userMenuOpened,
								})}
							>
								<Group gap={0} visibleFrom='sm' style={{ height:"100%" }}>
									{user ? (
										<Text>
											{user}
										</Text>
									) : null}
									<a href='/' className={classes.link}>
										Log Out
									</a>
								</Group>
							</UnstyledButton>
						</Menu.Target>
					</Menu>
				</Group>
			</header>

			<Drawer
				opened={drawerOpened}
				onClose={closeDrawer}
				size='100%'
				padding='md'
				title='Navigation'
				hiddenFrom='sm'
				zIndex={1000000}
			>
				<ScrollArea h={`calc(100vh - ${rem(80)})`} mx='-md'>
					<Divider my='sm' />

					<a href='/generate' className={classes.link}>
						Generate
					</a>
					<a href='/closet' className={classes.link}>
						Closet
					</a>
					<a href='/ask' className={classes.link}>
						Ask
					</a>

					<UnstyledButton className={classes.link} onClick={toggleLinks}>
						<Center inline>
							<Box component='span' mr={5}>
								Features
							</Box>
							<IconChevronDown
								style={{ width: rem(16), height: rem(16) }}
								color={theme.colors.blue[6]}
							/>
						</Center>
					</UnstyledButton>

					<Divider my='sm' />
				</ScrollArea>
			</Drawer>
		</Box>
	);
}

