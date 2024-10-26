"use client";
import { Button, Stack } from '@mantine/core';
import { ContainedInputs } from './ContainedInputs/ContainedInputs';

export default function FitGenerator() {
	return (
		<Stack p={16}>
			Start your fit generation! Ocassion: Weather: tops: bottom:
			<Button component='a' href='/dashboard' style={{ alignSelf: 'center' }}>
				Back to Home
			</Button>
			<ContainedInputs/>
			<Button component='a' href='' style={{ alignSelf: 'center' }}>
				Generate
			</Button>
		</Stack>
	);
}
