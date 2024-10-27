import { Button, Stack, Image, Text } from '@mantine/core';
import { DropzoneButton } from '../../Upload';
import { GradientSegmentedControl } from './ClothingCategory/GradientSegmentedControl';
import axios from 'axios';
import { getUserId } from '../../../utility/authUtility';
import { useEffect, useState } from 'react';

export default function AddNew() {
	const [selectedCategory, setSelectedCategory] = useState('');
	const [userId, setUserId] = useState<string | null>(null);
	const [uploadedImages, setUploadedImages] = useState<string[]>([]); // State to hold uploaded images

	useEffect(() => {
		const id = getUserId();
		setUserId(id);
	}, []);

	const handleCategoryChange = (category) => {
		console.log('Category selected:', category); // Log the selected category
		setSelectedCategory(category);
	};

	const handleUpload = async (files) => {
		console.log('Handling uploads for files:', files); // Log the selected files
		if (!userId) {
			alert('User not logged in!');
			return;
		}

		const formData = new FormData();
		files.forEach((file) => {
			formData.append('images', file); // Add images to the form data
		});
		formData.append('category', selectedCategory);
		formData.append('userId', userId);

		try {
			const response = await axios.post(
				'http://localhost:5001/upload',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				},
			);
			console.log('--> Data sent: ', response.data);

			// Assuming response.data.files contains the paths of uploaded images
			const uploadedImagePaths = response.data.files.map(
				(file) => file.imagePath,
			);
			setUploadedImages((prevImages) => [...prevImages, ...uploadedImagePaths]); // Update state with new images

			alert(response.data.message);
		} catch (error) {
			console.error('Upload failed:', error.response.data); // Log the error response
			alert('Upload failed, please try again.');
		}
	};

	return (
		<Stack p={16}>
			<Text size='xl' weight={500}>
				Upload new clothes here!
			</Text>
			<GradientSegmentedControl onChange={handleCategoryChange} />
			<DropzoneButton onUpload={handleUpload} />

			{/* Display Uploaded Images */}
			{uploadedImages.length > 0 && (
				<Stack mt={24}>
					<Text size='lg' weight={500}>
						Uploaded Images
					</Text>
					<Stack spacing='md'>
						{uploadedImages.map((image, index) => (
							<Image
								key={index}
								src={image}
								alt={`Uploaded Image ${index + 1}`}
								style={{ maxWidth: '100%', height: 'auto' }}
								withPlaceholder
							/>
						))}
					</Stack>
				</Stack>
			)}
		</Stack>
	);
}
