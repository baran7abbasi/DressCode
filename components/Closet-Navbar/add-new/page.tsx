import { Button, Stack, Image, Text } from '@mantine/core';
import { DropzoneButton } from '../../Upload';
import { GradientSegmentedControl } from './ClothingCategory/GradientSegmentedControl';
import axios from 'axios';
import { getUserId } from '../../../utility/authUtility';
import { useEffect, useState } from 'react';
import { FloatingLabelInput } from './ClothingName/FloatingInputLabel';

export default function AddNew() {
	const [selectedCategory, setSelectedCategory] = useState('');
	const [userId, setUserId] = useState<string | null>(null);
	const [uploadedImage, setUploadedImage] = useState<
		string | ArrayBuffer | null
	>(null);
	const [imageName, setImageName] = useState('');

	useEffect(() => {
		const id = getUserId();
		setUserId(id);
	}, []);

	const handleCategoryChange = (category) => {
		console.log('Category selected:', category);
		setSelectedCategory(category);
	};

	const handleImageUpload = (files) => {
		const file = files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setUploadedImage(reader.result);
			};
			reader.readAsDataURL(file);
			uploadImage(file);
		}
	};

	const uploadImage = async (file) => {
		if (!userId) {
			console.error('No user ID available');
			return;
		}

		if (!selectedCategory) {
			console.error('No category selected');
			return;
		}

		const formData = new FormData();
		formData.append('image', file);
		formData.append('imageName', imageName);
		formData.append('category', selectedCategory);
		formData.append('userId', userId);

		console.log('Uploading with details:', {
			imageName,
			category: selectedCategory,
			userId,
		});

		try {
			const response = await axios.post(
				'http://localhost:5001/upload',
				formData,
			);
			console.log('Upload successful:', response.data);
		} catch (error) {
			console.error('Error uploading the image', error);
		}
	};

	return (
		<Stack p={16}>
			<Text
				size='xl'
				style={{
					alignSelf: 'center',
					fontWeight: '700',
					color: 'var(--mantine-color-pink-6)',
				}}
			>
				Upload new clothes here!
			</Text>
			<Text
				style={{
					alignSelf: 'center',
					fontWeight: '400',
					fontStyle: 'italic',
				}}
			>
				What is the type of clothing being uploaded?
			</Text>
			<GradientSegmentedControl onChange={handleCategoryChange} />
			<FloatingLabelInput onChange={(name) => setImageName(name)} />
			<DropzoneButton onUpload={handleImageUpload} />
			{uploadedImage && <Image src={uploadedImage} alt='Uploaded Image' />}
		</Stack>
	);
}
