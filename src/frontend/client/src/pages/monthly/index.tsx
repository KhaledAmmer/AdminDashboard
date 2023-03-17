import React, { useMemo, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { ResponsiveLine, Serie } from '@nivo/line';
import 'react-datepicker/dist/react-datepicker.css';
import { PageContainer } from 'src/components/PageContainer';
import { useGetSalesQuery } from 'src/api/sales';
import Header from 'src/components/Header';

export default function Monthly() {
  const { data, isLoading } = useGetSalesQuery(undefined);
  const theme = useTheme();

  const formattedData = useMemo(() => {
    const res = data?.data[0];
    const totalSalesLine: Serie = {
      id: 'totalSales',
      color: theme.palette.secondary.main,
      data: [],
    };
    const totalUnitsLine: Serie = {
      id: 'totalUnits',
      color: theme.palette.secondary[600],
      data: [],
    };
    if (!res) return [totalSalesLine, totalUnitsLine];

    const { monthlyData } = res;
    Object.values(monthlyData).forEach(({ month, totalSales, totalUnits }) => {
      totalSalesLine.data.push({ x: month, y: totalSales });
      totalUnitsLine.data.push({ x: month, y: totalUnits });
    });

    const formattedData = [totalSalesLine, totalUnitsLine];
    return formattedData;
  }, [data]);

  if (!data?.data || isLoading) return <center>Loading...</center>;

  return (
    <PageContainer>
      <Header title="Monthly SALES" subtitle="Chart of monthly sales" />
      <Box height="75vh">
        {data ? (
          <ResponsiveLine
            data={formattedData}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            colors={{ datum: 'color' }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: 'Month',
              legendOffset: 60,
              legendPosition: 'middle',
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Total',
              legendOffset: -50,
              legendPosition: 'middle',
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: 'top-right',
                direction: 'column',
                justify: false,
                translateX: 50,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemBackground: 'rgba(0, 0, 0, .03)',
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </PageContainer>
  );
}
