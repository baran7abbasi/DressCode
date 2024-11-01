'use client';
import { useRef, useState } from 'react';
import { Text, Group, Button, rem, useMantineTheme } from '@mantine/core';
import { Dropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
import classes from './DropzoneButton.module.css';

// Accept onUpload as a prop
export function DropzoneButton({ onUpload }) {
	const theme = useMantineTheme();
	const openRef = useRef<() => void>(null);

	return (
		<div className={classes.wrapper}>
			<Dropzone
				openRef={openRef}
				className={classes.dropzone}
				radius='md'
				accept={[MIME_TYPES.png, MIME_TYPES.jpeg]} // Accept only image files
				maxSize={30 * 1024 ** 2} // 30 MB limit
				onDrop={(files) => {
					onUpload(files); // Call the onUpload prop with the dropped files
					openRef.current?.();
				}}
			>
				<div>
					<Group justify='center'>
						<Dropzone.Accept>
							<IconDownload
								style={{
									width: rem(50),
									height: rem(50),
									color: 'var(--mantine-color-pink-6)',
								}}
								stroke={1.5}
							/>
						</Dropzone.Accept>
						<Dropzone.Reject>
							<IconX
								style={{ width: rem(50), height: rem(50) }}
								color={theme.colors.red[6]}
								stroke={1.5}
							/>
						</Dropzone.Reject>
						<Dropzone.Idle>
							<IconCloudUpload
								style={{ width: rem(50), height: rem(50) }}
								stroke={1.5}
							/>
						</Dropzone.Idle>
					</Group>

					<Text ta='center' fw={700} fz='lg' mt='xl'>
						<Dropzone.Accept>Drop images here</Dropzone.Accept>
						<Dropzone.Reject>Only image files are accepted</Dropzone.Reject>
						<Dropzone.Idle>Upload images</Dropzone.Idle>
					</Text>
					<Text ta='center' fz='sm' mt='xs' c='dimmed'>
						Drag&apos;n&apos;drop images here to upload. Only image files under
						30MB are allowed.
					</Text>
				</div>
			</Dropzone>

			<Button
				className={classes.control}
				size='md'
				radius='xl'
				onClick={() => {
					openRef.current?.();
				}}
			>
				Select files
			</Button>
		</div>
	);
}
