'use client';
import { Card, Image, Group, Text } from '@mantine/core'; // Added Text import
import classes from './BadgeCard.module.css';

const mockdata = {
  image: 'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  title: 'White Top', 
};

export function BadgeCard() {
  const { image, title } = mockdata; // Destructured title here

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={image} height={180} />
        <Text className={classes.text}>
            {title}
          </Text>
      </Card.Section>
    </Card>
  );
}