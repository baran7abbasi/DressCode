'use client'
import { Button, Stack } from '@mantine/core';
import NlxChatWidget from '../../components/ChatBox/Chat-Bubble/page';

export default function AskCloset() {
  return (
    <Stack p={16}>
      <h1>Ask Your Closet Anything!</h1>
	  <NlxChatWidget /> {/* Add your NLX chat widget */}
      <Button component='a' href='/dashboard' style={{ alignSelf: 'center' }}>
        Back to Home
      </Button>
    </Stack>
  );
}
