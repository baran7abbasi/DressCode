"use client";
import { Button } from '@mantine/core';

interface SendButtonProps {
  onClick: () => void;
}

export default function SendButton({ onClick }: SendButtonProps) {
  return (
    <Button onClick={onClick} style={{ alignSelf: 'flex-end' }}>
      Send
    </Button>
  );
}