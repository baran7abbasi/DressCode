import { Button, Stack } from '@mantine/core';
import { NavbarSimpleColored } from '../../components/Closet-Navbar/NavbarSimpleColored';

export default function Closet() {
	return (
		<Stack p={16}>
			welcome to your closet! tops- bottoms jackets/sweaters shoes accessories
			add to your closet-
			<NavbarSimpleColored />
			<Button component='a' href='/dashboard' style={{ alignSelf: 'center' }}>
				Back to Home
			</Button>
		</Stack>
	);
}
