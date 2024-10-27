"use client";

import classes from './ContainedInput.module.css';
import { useState } from 'react';
import {
  Container,
  Button,
  Select, 
  TextInput,
  Paper,
  Text,
  Stack,
  Box,
  LoadingOverlay
} from '@mantine/core';

export function ContainedInputs() {

  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [input5, setInput5] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input1.trim() || !input2.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/chat', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input1: input1,
          input2: input2,
		  input3: input3,
		  input4: input4,
		  input5: input5
        }),
      });

      const data = await response.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error occurred while fetching response');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <TextInput label="Ocassion" 
        value={input1} 
        onChange={(e) => setInput1(e.target.value)}
        placeholder="Fancy Dinner, College Class, etc." 
        classNames={classes} />

      <Select
        mt="md"
        comboboxProps={{ withinPortal: true }}
        data={['Winter', 'Spring', 'Summer', 'Fall']}
        value={input2}
        onChange={(v) => v != null && setInput2(v)}
        placeholder="Pick one"
        label="Season"
        classNames={classes}
      />

      <TextInput 
        label="Tops" 
        value={input3}
        onChange={(e) => setInput3(e.target.value)}
        placeholder="Blue top" 
        classNames={classes} />

      <TextInput 
        label="Bottoms" 
        value={input4}
        onChange={(e) => setInput4(e.target.value)}
        placeholder="White pants" 
        classNames={classes} />

      <TextInput label="Shoes" 
        value={input5} 
        onChange={(e) => setInput5(e.target.value)}
        placeholder="White sneakers" 
        classNames={classes} />

      {/* Response Box */}
      <Paper shadow="sm" p="md" withBorder pos="relative">
      <LoadingOverlay visible={loading} />
      <Text size="sm" mb="xs">Claude's Response:</Text>
      <Box 
        p="sm" 
        style={{ 
          minHeight: '100px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px'
        }}
      >
        <Text>{response || 'Response will appear here...'}</Text>
      </Box>
    </Paper>
    </Container>
  );
}
