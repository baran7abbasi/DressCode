"use client";
import { TextInput } from '@mantine/core';

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  onEnter: () => void;
}

export default function InputField({ value, onChange, onEnter }: InputFieldProps) {
  return (
    <TextInput
      placeholder="Type your message"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      onKeyDown={(e) => e.key === 'Enter' && onEnter()}
    />
  );
}