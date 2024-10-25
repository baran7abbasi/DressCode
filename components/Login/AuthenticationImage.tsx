'use client';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
	TextInput,
	PasswordInput,
	Title,
	Paper,
	Group,
	Button,
	Checkbox,
	Anchor,
	Stack,
} from '@mantine/core';
import classes from './AuthenticationImage.module.css';

export function AuthenticationImage() {
	const [type, toggle] = useToggle(['login', 'register']);
	const form = useForm({
		initialValues: {
			email: '',
			name: '',
			password: '',
			terms: true,
		},

		validate: {
			email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
			password: (val) =>
				val.length <= 6
					? 'Password should include at least 6 characters'
					: null,
		},
	});
	return (
		<form className={classes.wrapper} onSubmit={form.onSubmit(() => {})}>
			<Paper className={classes.form} radius={0} p={30}>
				<Stack>
					<Title
						order={2}
						className={classes.title}
						ta='center'
						mt='md'
						mb={50}
					>
						Welcome back to Dress Code!
					</Title>

					{type === 'register' && (
						<TextInput
							label='Name'
							placeholder='Your name'
							value={form.values.name}
							onChange={(event) =>
								form.setFieldValue('name', event.currentTarget.value)
							}
							radius='md'
						/>
					)}

					<TextInput
						required
						label='Email'
						placeholder='hello@dresscode.com'
						value={form.values.email}
						onChange={(event) =>
							form.setFieldValue('email', event.currentTarget.value)
						}
						error={form.errors.email && 'Invalid email'}
						radius='md'
					/>

					<PasswordInput
						required
						label='Password'
						placeholder='Your password'
						value={form.values.password}
						onChange={(event) =>
							form.setFieldValue('password', event.currentTarget.value)
						}
						error={
							form.errors.password &&
							'Password should include at least 6 characters'
						}
						radius='md'
					/>

					{type === 'register' && (
						<Checkbox
							label='I accept terms and conditions'
							checked={form.values.terms}
							onChange={(event) =>
								form.setFieldValue('terms', event.currentTarget.checked)
							}
						/>
					)}
				</Stack>
				<Group style={{ alignSelf: 'center' }}>
					<Button type='submit' fullWidth mt='xl' size='md'>
						{upperFirst(type)}
					</Button>

					<Anchor
						component='button'
						type='button'
						c='dimmed'
						onClick={() => toggle()}
						size='s'
					>
						{type === 'register'
							? 'Already have an account? Login'
							: "Don't have an account? Register"}
					</Anchor>
				</Group>
			</Paper>
		</form>
	);
}
