import { Button, Stack } from '@mantine/core';
import { AuthenticationImage } from '../components/Login';

export default function HomePage() {
	return (
		<Stack p={16}>
			<Button
				component='a'
				href='/dashboard'
				// href='/components/Login/AuthenticationImage'
				style={{ alignSelf: 'center' }}
			>
				{/**a = anchor, we have to do this to link button to new page */}
				Get Started
			</Button>
			<AuthenticationImage />
		</Stack>
	);
}
