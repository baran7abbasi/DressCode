import { SegmentedControl } from '@mantine/core';
import classes from './GradientSegmentedControl.module.css';
import { useEffect, useState } from 'react';

export function GradientSegmentedControl({ onChange }) {
	const [value, setValue] = useState('TOPS');

	useEffect(() => {
		// Reset value to "TOPS" on component mount
		setValue('TOPS');
	}, []);

	const handleChange = (newValue) => {
		setValue(newValue);
		onChange(newValue); // Notify parent component of the selected category
	};

	return (
		<SegmentedControl
			radius='xl'
			size='md'
			data={['TOPS', 'BOTTOMS', 'JACKETS/SWEATERS', 'SHOES', 'ACCESSORIES']}
			classNames={classes}
			value={value}
			onChange={handleChange}
		/>
	);
}
