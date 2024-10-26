'use client';
import { Button, Stack } from '@mantine/core';
import { HeaderMegaMenu } from '../HeaderMegaMenu/HeaderMegaMenu';

export default function AskCloset() {
	return (
		<Stack p={16} style={{ backgroundColor: '#000', minHeight: '100vh', color: 'white' }}>
			<HeaderMegaMenu/>
			ask your closet anything!
		</Stack>
	);
}
