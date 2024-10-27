import { Button, Stack } from '@mantine/core';
import { NavbarSimpleColored } from '../../components/Closet-Navbar/NavbarSimpleColored';
import { HeaderMegaMenu } from '../HeaderMegaMenu/HeaderMegaMenu';

export default function Closet() {
	return (
		<Stack p={16}>
			<HeaderMegaMenu/>
			<NavbarSimpleColored />
		</Stack>
	);
}

