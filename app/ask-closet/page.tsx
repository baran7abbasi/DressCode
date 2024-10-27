'use client'
import { Button, Stack } from '@mantine/core';
import ChatPage from '../../components/ChatBox/ChatPage/page';

import { HeaderMegaMenu } from '../HeaderMegaMenu/HeaderMegaMenu';

export default function AskCloset() {
	return (
		<Stack p={16}>
			<HeaderMegaMenu/>
			ask your closet anything!
      <ChatPage/>
		<Button component='a' href='/dashboard' style={{ alignSelf: 'center' }}>
			Back to Home
		</Button>
		</Stack>
	);