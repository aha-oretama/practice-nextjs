import React from 'react';
import { Line } from 'react-chartjs-2';
import { useTests } from '../../hooks/useTest';

interface Props {
  repositoryId: number;
}

export const CountTimeLine: React.FunctionComponent<Props> = ({
  repositoryId,
}) => {
  const { testsData, isError, isLoading } = useTests(repositoryId);
  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const data = testsData
    .reverse()
    // .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    // FIXME: createdAt is string, not Date
    .map((v) => ({ x: v.createdAt, y: v.tests }));

  return (
    <>
      <h1>Timeline of test count</h1>
      <Line
        data={{
          datasets: [
            {
              data: data,
              label: 'Test count',
              lineTension: 0,
            },
          ],
        }}
        options={{
          scales: {
            xAxes: [
              {
                type: 'time',
                time: {
                  unit: 'day',
                },
              },
            ],
          },
        }}
        plugins={[
          {
            colorschemes: {
              // FIXME: seem that this color doesn't work
              scheme: 'brewer.Accent3',
            },
          },
        ]}
      />
    </>
  );
};
