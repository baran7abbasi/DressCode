import { Button, Stack } from '@mantine/core';

export default function Dashboard() {
	return (
		<Stack p={16}>
			welcome to your closet
			<Button
				component='a'
				href='/fit-generator'
				style={{ alignSelf: 'center' }}
			>
				Generate a Fit
			</Button>

			<Button component='a' href='/closet' style={{ alignSelf: 'center' }}>
				View your Closet
			</Button>

			<Button component='a' href='/ask-closet' style={{ alignSelf: 'center' }}>
				Ask your closet!
			</Button>

			<Button component='a' href='/' style={{ alignSelf: 'center' }}>
				Go Back to Login
			</Button>
		</Stack>
	);
}
