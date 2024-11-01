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
      description: 'Enter in any piece or many pieces of an outfit, and we will find the best combination for you.',
      buttonText: 'Generate',
      href: '/fit-generator',
    },
    {
      icon: IconBrandMessenger,
      title: 'Ask Your Closet',
      description: 'Ask your closet what it has, what it needs, and what it wants.',
      buttonText: 'Ask',
      href: '/ask-closet',
    },
    {
      icon: IconEyeFilled,
      title: 'See Your Closet',
      description:
        'Visualize your closet with your uploaded images and personal labels.',
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
              Start by generating an outfit, ask your closet questions, or add to your 
              closet by uploading images.
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
