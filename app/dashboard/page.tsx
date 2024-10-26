import { Button, Stack } from '@mantine/core';
import { FeaturesTitle } from '../FeaturesTitle/FeaturesTitle';
import { HeaderMegaMenu } from '../HeaderMegaMenu/HeaderMegaMenu';

export default function Dashboard() {
	return (
		<Stack p={16}>
			<HeaderMegaMenu/>
			<FeaturesTitle />
		</Stack>
	);
}
