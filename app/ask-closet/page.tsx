
import { Button, Stack } from '@mantine/core';

export default function AskCloset() {
	return (
		<Stack p={16}>
			ask your closet anything!
			<Button component='a' href='/dashboard' style={{ alignSelf: 'center' }}>
				Back to Home
			</Button>
		</Stack>
	);
}
