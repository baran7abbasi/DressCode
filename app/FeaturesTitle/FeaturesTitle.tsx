'use client';
import { Title, SimpleGrid, Text, Button, ThemeIcon, Grid, rem } from '@mantine/core';
import { IconHanger,
	IconShoe,
	IconEyeFilled,
	IconBrandMessenger, } from '@tabler/icons-react';
import classes from './FeaturesTitle.module.css';

const features = [
    {
      icon: IconHanger,
      title: 'Generate an outfit',
      description: 'All packages are published under MIT license, you can use Mantine in any project',
      buttonText: 'Generate',
      href: '/fit-generator',
    },
    {
      icon: IconBrandMessenger,
      title: 'Ask Your Closet',
      description: 'Build type safe applications, all components and hooks export types',
      buttonText: 'Ask',
      href: '/ask-closet',
    },
    {
      icon: IconEyeFilled,
      title: 'See Your Closet',
      description:
        'With new :focus-visible selector focus ring will appear only when user navigates with keyboard',
      buttonText: 'See',
      href: '/closet',
    },
  ];
  
  export function FeaturesTitle() {
    const items = features.map((feature) => (
      <div key={feature.title}>
        <Text fz="xl" fw={800} mt="sm">
          {feature.title}
        </Text>
        <Text c="dimmed" fz="sm">
          {feature.description}
        </Text>
        {/* Add a button below each feature */}
        <Button
          component="a"
          href={feature.href}
          variant="filled"
          color="pink.6"
        //   gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
          size="md"
          mt="sm"
        >
            <feature.icon style={{ width: rem(20), height: rem(20) }} />
        </Button>
      </div>
    ));
  
    return (
      <div className={classes.wrapper}>
        <Grid gutter={80}>
          <Grid.Col span={{ md: 5 }}>
            <Title className={classes.title} order={2}>
              Welcome to Your Closet
            </Title>
            <Text c="dimmed">
              Build fully functional accessible web applications faster than ever – Mantine includes
              more than 120 customizable components and hooks to cover you in any situation
            </Text>
          </Grid.Col>
          <Grid.Col span={{ md: 7 }}>
            <SimpleGrid cols={{ md: 2 }} spacing={30}>
              {items}
            </SimpleGrid>
          </Grid.Col>
        </Grid>
      </div>
    );
  }