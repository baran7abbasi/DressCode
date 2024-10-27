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

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { setUserId, setUserName } from '../../utility/authUtility';


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

		if (type === 'register') {
			console.log('User is trying to register, is it working?');
			try {
				const response = await axios.post('http://localhost:5001/register', {
					name: form.values.name,
					email: form.values.email,
					password: form.values.password,
					terms: form.values.terms,
				});
				const userId = response.data.userId; // Assuming userId is returned in response
				console.log('register: your user id from the backend is = ' + userId);
				setUserId(userId); // Store userId in localStorage
				setUserName(form.values.name);
				//alert(response.data.message);
				router.push('/dashboard');
			} catch (error) {
				alert('Registration failed!' + error);
				console.log(error);
			}
		} else if (type === 'login') {
			console.log('User is trying to log in, is it working?');
			setPasswordError('');
			try {
				const response = await axios.post('http://localhost:5001/login', {
					email: form.values.email,
					password: form.values.password,
				});
				const userId = response.data.userId; // Assuming userId is returned in response
				console.log('login: your user id from the backend is = ' + userId);
				setUserId(userId); // Store userId in localStorage
				setUserName(form.values.name);
				//alert('Login successful! Welcome back!');
				router.push('/dashboard');
			} catch (error) {
				if (error.response && error.response.status === 401) {
					setPasswordError('Wrong password');
				} else {
					alert(
						'Login failed: ' + "You don't have an account: error : " + error,
					);
				}
			}
		}
	};

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
            <Button type='submit' fullWidth mt='xl' size='md' color="pink">
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
			<Button
              component='a'
              href='/dashboard'
              style={{ alignSelf: 'right' }}
            >
              Get Started
            </Button>
          </Group>
        </Paper>
      </form>
    </>
  );
}
