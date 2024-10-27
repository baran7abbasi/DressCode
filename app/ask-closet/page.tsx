import { HeaderMegaMenu } from '../HeaderMegaMenu/HeaderMegaMenu';
import { Button, Stack } from '@mantine/core';
import ChatPage from '../../components/ChatBox/ChatPage/page';

export default function AskCloset() {
  return (
    <Stack style={{ backgroundColor: '#000', minHeight: '100vh', color: 'white' }}>
		<HeaderMegaMenu/>
		<ChatPage/>
    </Stack>
  );
}
