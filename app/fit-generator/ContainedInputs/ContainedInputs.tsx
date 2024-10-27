'use client';
import { useState } from 'react';
import { Select, Button, Text, Code, Group, Stack } from '@mantine/core';
import classes from './ContainedInput.module.css';
import { DropzoneButton } from '../../../components/Upload/DropzoneButton';
import { BadgeCard } from '../BadgeCard/BadgeCard';

export function ContainedInputs() {
  // Default dropdown options (replace these later with imported arrays)
  const seasons = ['None'];
  const topsOptions = ['Top1', 'Top2']; // Add your options here
  const bottomsOptions = ['Bottom1', 'Bottom2']; // Example options
  const jacketsOptions = ['Jacket1', 'Jacket2']; // Example options
  const shoesOptions = ['Shoe1', 'Shoe2']; // Example options

  const [season, setSeason] = useState('');
  const [tops, setTops] = useState('');
  const [bottoms, setBottoms] = useState('');
  const [jackets, setJackets] = useState('');
  const [shoes, setShoes] = useState('');
  const [generatedOutfit, setGeneratedOutfit] = useState(null);

  // State for current items
  const [currentTops, setCurrentTops] = useState([]);
  const [currentBottoms, setCurrentBottoms] = useState([]);
  const [currentJackets, setCurrentJackets] = useState([]);
  const [currentShoes, setCurrentShoes] = useState([]);

  const handleGenerate = () => {
    const outfitData = {
      season,
      tops,
      bottoms,
      jackets,
      shoes,
    };
    setGeneratedOutfit(outfitData);
  };

  return (
    <div className={classes.container}>
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

        <Select
          label="Season"
          placeholder="Select season"
          data={seasons}
          value={season}
          onChange={setSeason}
          className={classes.select}
        />

        <Select
          label="Tops"
          placeholder="Select top"
          data={topsOptions}
          value={tops}
          onChange={setTops}
          className={classes.select}
        />

        <Select
          label="Bottoms"
          placeholder="Select bottoms"
          data={bottomsOptions}
          value={bottoms}
          onChange={setBottoms}
          className={classes.select}
        />

        <Select
          label="Jackets/Sweaters"
          placeholder="Select jacket/sweater"
          data={jacketsOptions}
          value={jackets}
          onChange={setJackets}
          className={classes.select}
        />

        <Select
          label="Shoes"
          placeholder="Select shoes"
          data={shoesOptions}
          value={shoes}
          onChange={setShoes}
          className={classes.select}
        />

        <div>
          <Button
            onClick={handleGenerate} // Add the onClick event here
            style={{
              alignSelf: 'center',
              backgroundColor: 'var(--mantine-color-pink-5)',
              margin: '20px 0 20px 0px',
            }}
          >
            Generate
          </Button>
        </div>

        {/* Display Generated Outfit */}
        {generatedOutfit && (
          <Stack className={classes.generatedOutfit}>
            <Text size='lg' weight={600}>
              Generated Outfit:
            </Text>
            <Text>Season: {generatedOutfit.season}</Text>
            <Text>Tops: {generatedOutfit.tops}</Text>
            <Text>Bottoms: {generatedOutfit.bottoms}</Text>
            <Text>Jackets: {generatedOutfit.jackets}</Text>
            <Text>Shoes: {generatedOutfit.shoes}</Text>
          </Stack>
        )}
      </div>
    </div>
  );
}
