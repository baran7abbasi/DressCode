import { HeaderMegaMenu } from '../HeaderMegaMenu/HeaderMegaMenu';
import { Button, Stack } from '@mantine/core';
import ChatPage from '../../components/ChatBox/ChatPage/page';

export default function AskCloset() {
  return (
    <Stack p={16}>
		<HeaderMegaMenu/>
		<ChatPage/>
		<Button component='a' href='/dashboard' style={{ alignSelf: 'center' }}>
			Back to Home
		</Button>
    </Stack>
  );
}
