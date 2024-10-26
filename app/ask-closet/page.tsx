"use client";
import { Button, Stack } from '@mantine/core';
import ChatBubble from '../../components/ChatBox/Chat-Bubble/page';
import InputField from '../../components/ChatBox/Input-Field/page';
import SendButton from '../../components/ChatBox/Send-Button/page';
import { useState } from 'react';

export default function AskCloset() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput(''); // Clear input after sending
      // Here you might add logic to send the message to your chatbot backend
    }
  };

  return (
    <Stack p={16} spacing="sm">
      <div>Ask your closet anything!</div>

      <Stack spacing="xs" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <ChatBubble key={index} message={message} isUser={index % 2 === 0} />
        ))}
      </Stack>

      <InputField value={input} onChange={setInput} onEnter={handleSendMessage} />

      <SendButton onClick={handleSendMessage} />
	  

      <Button component="a" href="/dashboard" style={{ alignSelf: 'center' }}>
        Back to Home
      </Button>
    </Stack>
  );
}
