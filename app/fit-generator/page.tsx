import { Button, Stack } from '@mantine/core';

export default function FitGenerator() {
	return (
		<Stack p={16}>
			Start your fit generation! Ocassion: Weather: tops: bottom:
			<Button component='a' href='/dashboard' style={{ alignSelf: 'center' }}>
				Back to Home
			</Button>
			
		</Stack>
	);
}
