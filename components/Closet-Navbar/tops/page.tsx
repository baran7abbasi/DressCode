import {
	Button,
	Stack,
	Image,
	Text,
	Badge,
	Group,
	Paper,
	Title,
	Card,
} from '@mantine/core';

interface CardProps {
	image: string;
	name: string;
}
const data = [
	{
		image:
			'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png',
		name: 'Norway',
	},
	{
		image:
			'https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
		name: 'Cash',
	},
	{
		image:
			'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png',
		name: 'desert',
	},
	{
		image:
			'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png',
		name: 'forset',
	},
	{
		image:
			'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png',
		name: 'lake',
	},
];

function ClothingCard({ image, name }: CardProps) {
	return (
		<Card shadow='sm' padding='xl' component='a' target='_blank'>
			<Card.Section>
				<Image src={image} h={160} />
			</Card.Section>

			<Text fw={500} size='lg' mt='md'>
				{name}
			</Text>
		</Card>
	);
}

export default function Tops() {
	// eslint-disable-next-line react/jsx-key
	const slides = data.map((item) => <ClothingCard {...item} />);
	return (
		<Group>
			{slides}
		</Group>
	);
}
