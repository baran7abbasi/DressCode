'use client'
import { Button, Stack } from '@mantine/core';
import { AuthenticationImage } from '../components/Login';
import { HeaderTabs } from './HeaderTabs/HeaderTabs';

export default function HomePage() {
	return (
		<Stack p={16}>
			<HeaderTabs/>
			<AuthenticationImage />
		</Stack>
	);
}
