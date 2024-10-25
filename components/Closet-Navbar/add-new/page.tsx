import { Button, Stack } from '@mantine/core';
import { DropzoneButton } from '../../Upload';

export default function AddNew() {
	return (
		<Stack p={16}>
			upload new clothes here!
			<DropzoneButton />
		</Stack>
	);
}
