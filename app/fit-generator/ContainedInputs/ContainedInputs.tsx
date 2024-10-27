'use client';

import {
	Select,
	TextInput,
	Button,
	Text,
	Code,
	Group,
	Flex,
	Image,
	SimpleGrid,
} from '@mantine/core';
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
	const [selectedTop, setSelectedTop] = useState<string>(''); // Default to empty string
	const [selectedBottom, setSelectedBottom] = useState<string>(''); // Default to empty string
	const [selectedShoes, setSelectedShoes] = useState<string>(''); // Default to empty string
	const [selectedJacket, setSelectedJacket] = useState<string>(''); // Default to empty string
	const [selectedAccessory, setSelectedAccessory] = useState<string>('');

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	
	const [occasion, setOccasion] = useState('');
	const [weather, setWeather] = useState('');
	const [top, sendTop] = useState('');
	const [bottom, sendBottom] = useState('');
	const [jacket, sendJacket] = useState('');
	const [shoe, sendShoes] = useState('');
	const [accessory, sendAccessory] = useState('');
	const [generateOutfit, setGenerateOutfit] = useState('');
	const [outfitted, setOutfit] = useState('');


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

	const handleSelect = async (category: string, itemName: string | null) => {
		const userId = getUserId();
		if (!itemName) {
			console.warn("Item name is null");
			return; // Exit early if itemName is null
		}
		switch (category) {
			case 'top':
				sendTop(itemName)
				break;
			case 'bottom':
				sendBottom(itemName)
				break;
			case 'shoes':
				sendShoes(itemName)
				break;
			case 'jacket':
				sendJacket(itemName)
				break;
			case 'accessory':
				sendAccessory(itemName)
				break;
			default:
				console.warn(`Unhandled category: ${category}`);
		}
		console.log('this is the category: ' + category);
		console.log('and this is the item name: ' + itemName);

		// Only proceed if there's an item name
		if (!itemName) return;

		try {
			// Fetch the full item data based on the name and userId
			const response = await axios.get(`http://localhost:5001/clothing`, {
				params: { name: itemName, userId },
			});

			const item = response.data[0];
			const itemPath = item?.path || '';

			console.log('this is the response we get back: ' + itemPath);

			// Set the path based on category
			switch (category) {
				case 'top':
					console.log('the top path is : ' + itemPath);
					setSelectedTop(itemPath);
					break;
				case 'bottom':
					setSelectedBottom(itemPath);
					break;
				case 'shoes':
					setSelectedShoes(itemPath);
					break;
				case 'jacket':
					setSelectedJacket(itemPath);
					break;
				case 'accessory':
					setSelectedAccessory(itemPath);
					break;
				default:
					console.warn(`Unhandled category: ${category}`);
			}
		} catch (error) {
			console.error('Error fetching item path:', error);
		}
	};

	if (loading) return <Text>Loading...</Text>;
	if (error) return <Text c='red'>{error}</Text>;

	const handleGenerate = async () => {
		setLoading(true);
		setError(null);

		if (top === null) {
			sendTop(tops.toString())
		}
	
		if (bottom === null) {
			sendBottom(bottoms.toString())
		}
	
		if (jacket === null) {
			sendJacket(jackets.toString())
		}
	
		if (shoe === null) {
			sendShoes(shoes.toString())
		}
	
		if (accessory === null) {
			sendAccessory(accessories.toString())
		}
		
		try {
		  const response = await axios.post('http://localhost:5000/chat', {
			occasion: occasion,
			weather: weather,
			top: tops,
			bottom: bottoms,
			shoes: shoes,
			jacket: jackets,
			accessory: accessories
		  });
	
		  setGenerateOutfit(response.data.response);
		} catch (error: any) {
		  const errorMessage = error.response?.data?.error || error.message;
		  setError(errorMessage);
		  console.error('Error generating outfit:', errorMessage);
		} finally {
		  setLoading(false);
		}

		console.log(generateOutfit)
	  };

	return (
		// CHANGED
		<Flex style={{backgroundColor:"black", marginTop:"-30px", paddingTop:"30px"}}>
			{/*  */}

			<div className={classes.container} >
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
						value={occasion}
						onChange={(e) => setOccasion(e.currentTarget.value)}
						classNames={classes}
						styles={(theme) => ({
							item: {
								color: 'white', // White text for items in dropdown
								'&[data-hovered]': {
								  backgroundColor: 'var(--mantine-color-dark-6)', // Hover color
								},
								'&[data-selected]': {
								  color: 'white', // White text for selected item
								},
							  },
							  input: {
								color: 'white', // White text for selected item in input field
							  },
							})}
					/>

					<TextInput
						label='Weather Outside'
						placeholder='75 degrees, super chilly, windy, etc'
						value={weather}
						onChange={(e) => setWeather(e.currentTarget.value)}
						classNames={classes}
						styles={(theme) => ({
							item: {
								color: 'white', // White text for items in dropdown
								'&[data-hovered]': {
								  backgroundColor: 'var(--mantine-color-dark-6)', // Hover color
								},
								'&[data-selected]': {
								  color: 'white', // White text for selected item
								},
							  },
							  input: {
								color: 'white', // White text for selected item in input field
							  },
							})}
					/>

					<Select
						data={tops}
						label='Tops'
						mt='md'
						comboboxProps={{ withinPortal: true }}
						placeholder='Pick a top or leave empty for us to choose for you'
						classNames={classes}
						onChange={(value) => handleSelect('top', value)}
						styles={(theme) => ({
							dropdown: {
							  backgroundColor: 'white',
							},
							item: {
							  color: 'white', // White text for items in dropdown
							  '&[data-hovered]': {
								backgroundColor: 'var(--mantine-color-dark-6)', // Hover color
							  },
							  '&[data-selected]': {
								color: 'white', // White text for selected item
							  },
							},
							input: {
							  color: 'white', // White text for selected item in input field
							},
						  })}
					/>
					<Select
						data={bottoms}
						label='Bottoms'
						mt='md'
						comboboxProps={{ withinPortal: true }}
						placeholder='Pick a bottom or leave empty for us to choose for you'
						classNames={classes}
						onChange={(value) => handleSelect('bottom', value)}
						styles={(theme) => ({
							dropdown: {
							  backgroundColor: 'white',
							},
							item: {
							  color: 'white', // White text for items in dropdown
							  '&[data-hovered]': {
								backgroundColor: 'var(--mantine-color-dark-6)', // Hover color
							  },
							  '&[data-selected]': {
								color: 'white', // White text for selected item
							  },
							},
							input: {
							  color: 'white', // White text for selected item in input field
							},
						  })}
					/>
					<Select
						data={shoes}
						label='Shoes'
						mt='md'
						comboboxProps={{ withinPortal: true }}
						placeholder='Pick a pair of shoes or leave empty for us to choose for you'
						classNames={classes}
						onChange={(value) => handleSelect('shoes', value)}
						styles={(theme) => ({
							dropdown: {
							  backgroundColor: 'white',
							},
							item: {
							  color: 'white', // White text for items in dropdown
							  '&[data-hovered]': {
								backgroundColor: 'var(--mantine-color-dark-6)', // Hover color
							  },
							  '&[data-selected]': {
								color: 'white', // White text for selected item
							  },
							},
							input: {
							  color: 'white', // White text for selected item in input field
							},
						  })}
					/>
					<Select
						data={jackets}
						label='Jackets/Sweaters'
						mt='md'
						comboboxProps={{ withinPortal: true }}
						placeholder='Pick a jacket/sweater or leave empty for us to choose for you'
						classNames={classes}
						onChange={(value) => handleSelect('jacket', value)}
						styles={(theme) => ({
							dropdown: {
							  backgroundColor: 'white',
							},
							item: {
							  color: 'white', // White text for items in dropdown
							  '&[data-hovered]': {
								backgroundColor: 'var(--mantine-color-dark-6)', // Hover color
							  },
							  '&[data-selected]': {
								color: 'white', // White text for selected item
							  },
							},
							input: {
							  color: 'white', // White text for selected item in input field
							},
						  })}
					/>
					<Select
						data={accessories}
						label='Accessories'
						mt='md'
						comboboxProps={{ withinPortal: true }}
						placeholder='Pick an accessory or leave empty for us to choose for you'
						classNames={classes}
						onChange={(value) => handleSelect('accessory', value)}
						styles={(theme) => ({
							dropdown: {
							  backgroundColor: 'white',
							},
							item: {
							  color: 'white', // White text for items in dropdown
							  '&[data-hovered]': {
								backgroundColor: 'var(--mantine-color-dark-6)', // Hover color
							  },
							  '&[data-selected]': {
								color: 'white', // White text for selected item
							  },
							},
							input: {
							  color: 'white', // White text for selected item in input field
							},
						  })}
					/>

					<div>
						<Button
							component='a'
							onClick={handleGenerate}
							style={{
								alignSelf: 'center',
								backgroundColor: 'var(--mantine-color-pink-5)', // Corrected style syntax
								margin: '5px 0 20px 0px',
							}}
						>
							Generate
							{/* <Text>{generatedOutfit}</Text> */}
						</Button>
					</div>
				</div>
			</div>
			<div className={classes.outfitGeneration}>
				<SimpleGrid cols={2} mb='20px' mr='20px'>
					<div>
						<Image
							src={`http://localhost:5001/uploads/${selectedTop}`}
							fallbackSrc='https://placehold.co/600x400?text=Placeholder'
							alt='Top'
						/>
					</div>
					<div>
						<Image
							src={`http://localhost:5001/uploads/${selectedAccessory}`}
							fallbackSrc='https://placehold.co/600x400?text=Placeholder'
							alt='Accessory'
						/>
					</div>
					<div>
						<Image
							src={`http://localhost:5001/uploads/${selectedBottom}`}
							fallbackSrc='https://placehold.co/600x400?text=Placeholder'
							alt='Bottom'
						/>
					</div>
					<div>
						<Image
							src={`http://localhost:5001/uploads/${selectedJacket}`}
							fallbackSrc='https://placehold.co/600x400?text=Placeholder'
							alt='Jacket/Sweater'
						/>
					</div>
					<div>
						<Image
							src={`http://localhost:5001/uploads/${selectedShoes}`}
							fallbackSrc='https://placehold.co/600x400?text=Placeholder'
							alt='Shoes'
						/>
					</div>
				</SimpleGrid>
			</div>
		</Flex>
	);
}
