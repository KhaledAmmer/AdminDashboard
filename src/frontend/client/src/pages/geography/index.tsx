import React from 'react';
import { ResponsiveChoroplethCanvas } from '@nivo/geo';
import { geoData } from './geodata';
import { useUsersGeographyQuery } from 'src/api/user';
import { Box, Stack } from '@mui/material';
import { useTheme } from '@mui/material';
import Header from 'src/components/Header';
import { Tooltip } from '@nivo/tooltip';

export default function Geography() {
  const theme = useTheme();
  const { data, isLoading, isError, error } = useUsersGeographyQuery(undefined);
 

  return !isLoading ? (
    <Stack m="1.5rem 2.5rem">
      <Header title="Geography" subtitle="See users geography." />
      <Box
        mt="40px"
        height="75vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
        <ResponsiveChoroplethCanvas
          data={data?.data ?? []}
          features={geoData.features}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          domain={[0, 60]}
          unknownColor="#666666"
          label="properties.name"
          valueFormat=".2s"
          projectionScale={150}
          projectionTranslation={[0.5, 0.6]}
          projectionRotation={[0, 0, 0]}
          borderWidth={0.5}
          borderColor="#ffffff"
          enableGraticule={true}
          graticuleLineColor="#dddddd"
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: true,
              translateX: 0,
              translateY: -125,
              itemsSpacing: 0,
              itemWidth: 94,
              itemHeight: 18,
              itemDirection: "left-to-right",
              itemTextColor: theme.palette.secondary[200],
              itemOpacity: 0.85,
              symbolSize: 18,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: theme.palette.background.paper,
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </Box>
    </Stack>
  ) : (
    <Box>...Loading</Box>
  );
}
