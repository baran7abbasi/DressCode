'use client';
import { Button, Stack, Timeline, Text, Divider } from '@mantine/core';
import { IconLogin2, IconUpload, IconSpiral, IconZoomQuestion } from '@tabler/icons-react';

export default function About() {
  return (
    <Stack style={{ marginLeft:"50px" }}>
      <Text fw={800} size="36px" mt={9} color="white">User Guide</Text>
	  <Divider color="white" style={{ width: '60%'}} /> {/* Adjusted width and centered */}
      <Timeline active={1} bulletSize={48} lineWidth={2} color="pink.6">
        <Timeline.Item bullet={<IconLogin2 size={24} />} title={<Text color="white" mt={15}>Register an Account</Text>}>
		<Text c="dimmed" size="sm" mt={10} color="white">Sign up for DressCode using your email and a password.</Text>
        </Timeline.Item>
	

        <Timeline.Item bullet={<IconUpload size={24} />} title={<Text color="white" mt={25}>Upload Clothes to Your Closet</Text>}>
		<Text c="dimmed" size="sm" mt={10} color="white">Upload images of your clothing items with labels.</Text>
        </Timeline.Item>

        <Timeline.Item title={<Text color="white" mt={25}>Generate a New Outfit with AI</Text>} bullet={<IconSpiral size={24} />} lineVariant="dashed">
          <Text c="dimmed" size="sm" mt={10} color="white">
            Select any piece(s) of clothing and let AI do the rest.
          </Text>
        </Timeline.Item>

        <Timeline.Item title={<Text color="white" mt={25}>Ask Your Closet</Text>} bullet={<IconZoomQuestion size={24} />}>
		<Text c="dimmed" size="sm" mt={10} color="white">
            Ask your closet about itself.
          </Text>
        </Timeline.Item>
      </Timeline>
    </Stack>
  );
}
