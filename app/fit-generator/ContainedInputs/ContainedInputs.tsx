'use client';

import { Select, TextInput, Button, Text, Code, Group } from '@mantine/core';
import classes from './ContainedInput.module.css';
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

export function ContainedInputs() {
	const [tops, setTops] = useState<string[]>([]);
	const [bottoms, setBottoms] = useState<string[]>([]);
	const [shoes, setShoes] = useState<string[]>([]);
	const [jackets, setJackets] = useState<string[]>([]);
	const [accessories, setAccessories] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchClothingItems = async () => {
			try {
				const userId = getUserId();
				if (!userId) {
					setError('User ID not found');
					setLoading(false);
					return; // Exit if userId is not found
				}

				const response = await axios.get(`http://localhost:5001/clothing`, {
					params: {
						category: '',
						userId: userId, // Ensure the userId is being sent
					},
				});

				const items: ClothingItem[] = response.data;

				// Categorize items, ensuring they belong to the user

				// Instead of using Set directly in the map
				setTops(
					Array.from(
						new Set(
							items
								.filter(
									(item) => item.category === 'TOPS' && item.userId === userId,
								)
								.map((item) => item.name),
						),
					),
				);
				setBottoms(
					Array.from(
						new Set(
							items
								.filter(
									(item) =>
										item.category === 'BOTTOMS' && item.userId === userId,
								)
								.map((item) => item.name),
						),
					),
				);
				setShoes(
					Array.from(
						new Set(
							items
								.filter(
									(item) => item.category === 'SHOES' && item.userId === userId,
								)
								.map((item) => item.name),
						),
					),
				);
				setJackets(
					Array.from(
						new Set(
							items
								.filter(
									(item) =>
										item.category === 'JACKETS/SWEATERS' &&
										item.userId === userId,
								)
								.map((item) => item.name),
						),
					),
				);
				setAccessories(
					Array.from(
						new Set(
							items
								.filter(
									(item) =>
										item.category === 'ACCESSORIES' && item.userId === userId,
								)
								.map((item) => item.name),
						),
					),
				);
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

	return (
		<div className={classes.container}>
			<div className={classes.inputGroup}>
				<Group className={classes.header} justify='space-between'>
					<Text
						component='span'
						variant='gradient'
						gradient={{ from: 'pink', to: 'white' }}
						inherit
						style={{ fontWeight: 1000, fontSize: '2rem' }}
					>
						Outfit Generator
					</Text>

					<Code fw={700} className={classes.version}>
						v0.1.7
					</Code>
				</Group>
				<TextInput
					label='Occasion'
					placeholder='Fancy Dinner, College Class, etc.'
					classNames={classes}
				/>

				<TextInput
					label='Weather Outside'
					placeholder='75 degrees, super chilly, windy, etc'
					classNames={classes}
				/>

				<Select
					mt='md'
					comboboxProps={{ withinPortal: true }}
					data={tops}
					placeholder='Pick a top or leave empty for us to choose for you'
					label='Tops'
					classNames={classes}
				/>
				<Select
					mt='md'
					comboboxProps={{ withinPortal: true }}
					data={bottoms}
					placeholder='Pick a bottom or leave empty for us to choose for you'
					label='Bottoms'
					classNames={classes}
				/>
				<Select
					mt='md'
					comboboxProps={{ withinPortal: true }}
					data={shoes}
					placeholder='Pick shoes or leave empty for us to choose for you'
					label='Shoes'
					classNames={classes}
				/>
				<Select
					mt='md'
					comboboxProps={{ withinPortal: true }}
					data={jackets}
					placeholder='Pick a jacket/sweater or leave empty for us to choose for you'
					label='Jackets/Sweaters'
					classNames={classes}
				/>
				<Select
					mt='md'
					comboboxProps={{ withinPortal: true }}
					data={accessories}
					placeholder='Pick an accessory or leave empty for us to choose for you'
					label='Accessories'
					classNames={classes}
				/>

				<div>
					<Button
						component='a'
						href=''
						style={{
							alignSelf: 'center',
							backgroundColor: 'var(--mantine-color-pink-5)', // Corrected style syntax
							margin: '20px 0 20px 0px',
						}}
					>
						Generate
					</Button>
				

        </div>

        {/* Display Generated Outfit */}
        {/* {generatedOutfit && (
          <Stack className={classes.generatedOutfit}>
            <Text size='lg' weight={600}>
              Generated Outfit:
            </Text>
            <Text>Season: {generatedOutfit.season}</Text>
            <Text>Tops: {generatedOutfit.tops}</Text>
            <Text>Bottoms: {generatedOutfit.bottoms}</Text>
            <Text>Jackets: {generatedOutfit.jackets}</Text>
            <Text>Shoes: {generatedOutfit.shoes}</Text>
          </Stack>
        )} */}
      </div>
    </div>
  );

}
