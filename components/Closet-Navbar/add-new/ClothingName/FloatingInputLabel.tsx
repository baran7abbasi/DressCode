import { useState } from 'react';
import { TextInput, Text, Stack } from '@mantine/core';
import classes from './FloatingInputLabel.module.css';

export function FloatingLabelInput({ onChange }) {
	const [focused, setFocused] = useState(false);
	const [value, setValue] = useState('');
	const floating = value.trim().length !== 0 || focused || undefined;

	const handleChange = (event) => {
		const newValue = event.currentTarget.value;
		setValue(newValue);
		onChange(newValue); // Notify parent of name change
	};

	return (
		<Stack>
			<Text
				style={{
					alignSelf: 'center',
					fontWeight: '400',
					fontStyle: 'italic',
				}}
			>
				Name the piece!
			</Text>
			<TextInput
				label='Clothing Article'
				placeholder='EX: tight cropped black-tee'
				required
				classNames={classes}
				value={value}
				onChange={handleChange} // Use the new handleChange
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				mt='md'
				autoComplete='nope'
				data-floating={floating}
				labelProps={{ 'data-floating': floating }}
			/>
		</Stack>
	);
}
