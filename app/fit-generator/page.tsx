'user: client';
import { Stack, Grid } from '@mantine/core'; // Remove Col from imports
import { ContainedInputs } from './ContainedInputs/ContainedInputs';
import { HeaderMegaMenu } from '../HeaderMegaMenu/HeaderMegaMenu';
import { BadgeCard } from './BadgeCard/BadgeCard';

export default function FitGenerator() {
  return (
    <Stack p={16} style={{ backgroundColor: '#000', minHeight: '100vh', color: 'white' }}>
      <HeaderMegaMenu />
      <div style={{ display: 'flex', width: '100%' }}>
        <ContainedInputs/>

        {/* Grid container for BadgeCard components */}
        <Grid
          style={{
            marginLeft: '25px', // Space between inputs and cards
            // display: 'grid',
            // gridTemplateColumns: 'repeat(3, 1fr)', // 3 columns
            gap: '10px', // Gap between cards
          }}
        >
		<div style={{
            margin:'10px'
          }}><BadgeCard /><BadgeCard /></div>
		<div style={{
            margin:'10px'
          }}><BadgeCard /><BadgeCard /></div>
        <div style={{
            margin:'10px'
          }}><BadgeCard /><BadgeCard /></div>
        </Grid>
      </div>
    </Stack>
  );
}
