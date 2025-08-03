// ChartWrapper.tsx
import SingleSeriesChart from "./SingleSeriesChart";
import MultiSeriesChart from "./MultiSeriesChart";
import { Paper, Typography } from "@mui/material";

type Props = {
  chart: {
    title: string;
    data: (readonly [number, number | (number | null)[]])[];
  };
};

const ChartWrapper = ({ chart }: Props) => {
  const isMultiSeries = Array.isArray(chart.data[0][1]);

  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 4, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        {chart.title}
      </Typography>
      {isMultiSeries ? (
        <MultiSeriesChart data={chart.data as [number, (number | null)[]][]} />
      ) : (
        <SingleSeriesChart data={chart.data as [number, number | null][]} />
      )}
    </Paper>
  );
};

export default ChartWrapper;
