'use client';
import { Stack } from '@mantine/core';
import { AuthenticationImage } from '../components/Login';
import { HeaderTabs } from './HeaderTabs/HeaderTabs';

export default function HomePage() {
	return (
		<Stack>
			{/* <HeaderTabs /> */}
			<AuthenticationImage />
		</Stack>
	);
}
