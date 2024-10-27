'user: client';
import { Stack, Grid, Flex } from '@mantine/core'; // Remove Col from imports
import { ContainedInputs } from './ContainedInputs/ContainedInputs';
import { HeaderMegaMenu } from '../HeaderMegaMenu/HeaderMegaMenu';

export default function FitGenerator() {
	return (
		<Stack style={{backgroundColor:'black'}}>
			<HeaderMegaMenu />
			<ContainedInputs />
		</Stack>
	);
}

