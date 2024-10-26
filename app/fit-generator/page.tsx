import { Button, Stack } from '@mantine/core';
import { ContainedInputs } from './ContainedInputs/ContainedInputs';
import { HeaderMegaMenu } from '../HeaderMegaMenu/HeaderMegaMenu';

export default function FitGenerator() {
	return (
		<Stack p={16}>
			<HeaderMegaMenu/>
			<ContainedInputs/>
		</Stack>
	);
}
