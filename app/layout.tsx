import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '../theme';

export const metadata = {
	title: 'DressCode',
	description: 'Your online Closet Companion!',
};

export default function RootLayout({ children }: { children: any }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<ColorSchemeScript />
				<link rel='shortcut icon' href='/favicon.svg' />
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no'
				/>
			</head>
			<body style={{ height: '100vh' }}>
				<MantineProvider theme={theme}>{children}</MantineProvider>
			</body>
		</html>
	);
}
