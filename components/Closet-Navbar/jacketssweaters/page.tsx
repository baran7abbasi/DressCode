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
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserId } from '../../../utility/authUtility'; // Adjust the import path as needed

interface ClothingItem {
	_id: string;
	name: string;
	path: string;
	category: string;
	userId: string;
}

interface CardProps {
	image: string;
	name: string;
}
function ClothingCard({ image, name }: CardProps) {
	console.log('ClothingCard rendering with image path:', image);

	return (
		<Card shadow='sm' padding='xl' component='a' style={{ backgroundColor: 'var(--mantine-color-dark-5)', color: 'white' }}>
			<Card.Section>
				<Image
					// Update the src to use the correct backend URL and path
					src={`http://localhost:5001/uploads/${image.split('/').pop()}`}
					h={160}
					fallbackSrc='https://placehold.co/600x400?text=Image+Not+Found'
					onError={(e) => console.log('Image failed to load:', e)}
					alt={name}
				/>
			</Card.Section>

			<Text fw={500} size='lg' mt='md'>
				{name}
			</Text>
		</Card>
	);
}

export default function JacketsSweaters() {
	const [clothingItems, setClothingItems] = useState<ClothingItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchClothingItems = async () => {
			try {
				const userId = getUserId();
				if (!userId) {
					setError('User ID not found');
					setLoading(false);
					return;
				}

				const response = await axios.get(`http://localhost:5001/clothing`, {
					params: {
						category: 'JACKETS/SWEATERS',
						userId: userId,
					},
				});

				console.log('Response from server:', response.data);
				setClothingItems(response.data);
			} catch (err) {
				setError('Error fetching clothing items');
				console.error('Error fetching clothing items:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchClothingItems();
	}, []);

	if (loading) return <Text>Loading...</Text>;
	if (error) return <Text color='red'>{error}</Text>;
	if (clothingItems.length === 0)
		return <Text>No jackets or sweaters found. Try adding some!</Text>;

	const slides = clothingItems.map((item) => {
		console.log('Item path:', item.path);

		return <ClothingCard key={item._id} image={item.path} name={item.name} />;
	});

	return <Group>{slides}</Group>;
}
