"use client";
import { Paper, Text } from '@mantine/core';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
}

export default function ChatBubble({ message, isUser }: ChatBubbleProps) {
  return (
    <Paper
      shadow="xs"
      p="xs"
      style={{
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        backgroundColor: isUser ? '#e0f7fa' : '#f1f1f1',
        borderRadius: 8,
        maxWidth: '80%',
      }}
    >
      <Text>{message}</Text>
    </Paper>
  );
}