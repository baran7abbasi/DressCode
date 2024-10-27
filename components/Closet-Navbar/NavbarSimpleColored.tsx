'use client';
import { useState } from 'react';
import { Group, Code, Text } from '@mantine/core';
import {
	IconShirtFilled,
	IconHanger,
	IconShoe,
	IconJacket,
	IconSunglassesFilled,
	IconPhotoPlus,
	IconHanger2Filled,
} from '@tabler/icons-react';
import classes from './NavbarSimpleColored.module.css';

import About from './about/page';
import Tops from './tops/page';
import Bottoms from './bottoms/page';
import Shoes from './shoes/page';
import Jackets from './jacketssweaters/page';
import Accessories from './accessories/page';
import AddNew from './add-new/page';

type PageLabel =
	| 'About'
	| 'Tops'
	| 'Bottoms'
	| 'Shoes'
	| 'Jackets/Sweaters'
	| 'Accessories'
	| 'Add New Clothes';

const data: { label: PageLabel; icon: React.FC; link: string }[] = [
	{ link: '/about', label: 'About', icon: IconHanger },
	{ link: '/tops', label: 'Tops', icon: IconShirtFilled },
	{ link: '/bottoms', label: 'Bottoms', icon: IconHanger2Filled },
	{ link: '/shoes', label: 'Shoes', icon: IconShoe },
	{ link: '/jackets', label: 'Jackets/Sweaters', icon: IconJacket },
	{ link: '/accessories', label: 'Accessories', icon: IconSunglassesFilled },
	{ link: '/add-new', label: 'Add New Clothes', icon: IconPhotoPlus },
];

const pageContent: Record<PageLabel, JSX.Element> = {
	About: <About />,
	Tops: <Tops />,
	Bottoms: <Bottoms />,
	Shoes: <Shoes />,
	'Jackets/Sweaters': <Jackets />,
	Accessories: <Accessories />,
	'Add New Clothes': <AddNew />,
};

export function NavbarSimpleColored() {
	const [active, setActive] = useState<PageLabel>('About');

	const links = data.map((item) => (
		<a
			className={classes.link}
			data-active={item.label === active || undefined}
			href={item.link}
			key={item.label}
			onClick={(event) => {
				event.preventDefault();
				setActive(item.label);
			}}
		>
			{/* <item.icon className={classes.linkIcon} stroke={1.5} /> */}
			{/* <item.icon style={{ width: '24px', height: '24px' }} /> */}
			<div className={classes.linkIcon}>
				<item.icon />
			</div>
			<span>{item.label}</span>
		</a>
	));

	return (
		<div style={{ display: 'flex', height: '100%', width: '100vw' }}>
			<nav className={classes.navbar}>
				<div className={classes.navbarMain}>
					<Group className={classes.header} justify='space-between'>
						<Text
							component='span'
							variant='gradient'
							gradient={{ from: 'pink', to: 'white' }}
							inherit
							style={{ fontWeight: 1000, fontSize: '2rem' }}
						>
							Your Closet
						</Text>

						<Code fw={700} className={classes.version}>
							v0.1.7
						</Code>
					</Group>
					{links}
				</div>
			</nav>
			<div style={{ padding: '20px', flexGrow: 1, height: '100vh' }}>
				{pageContent[active]}
			</div>
		</div>
	);
}
