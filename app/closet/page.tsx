import { Button, Stack } from '@mantine/core';
import { NavbarSimpleColored } from '../../components/Closet-Navbar/NavbarSimpleColored';
import { HeaderMegaMenu } from '../HeaderMegaMenu/HeaderMegaMenu';
import NlXChatWidget from '../../components/ChatBox/ChatBubble/page';

export default function Closet() {
	return (
		<Stack
			style={{ backgroundColor: '#000', minHeight: '100vh', color: 'white' }}
		>
			<HeaderMegaMenu />
			<NavbarSimpleColored />
			{<NlXChatWidget />}
		</Stack>
	);
}
