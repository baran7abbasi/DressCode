import { Button, Stack } from '@mantine/core';
import { FeaturesTitle } from './FeaturesTitle/FeaturesTitle';
import { HeaderMegaMenu } from '../HeaderMegaMenu/HeaderMegaMenu';
import NlXChatWidget from '../../components/ChatBox/ChatBubble/page';

export default function Dashboard() {
	return (
		<Stack
			style={{ backgroundColor: '#000', minHeight: '100vh', color: 'white' }}
		>
			<HeaderMegaMenu />
			{<FeaturesTitle />}
			{<NlXChatWidget />}
		</Stack>
	);
}
