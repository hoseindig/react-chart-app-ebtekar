import SingleSeriesChart from "./SingleSeriesChart";
import MultiSeriesChart from "./MultiSeriesChart";

type Props = {
  chart: {
    title: string;
    data: (readonly [number, number | (number | null)[]])[];
  };
};

const ChartWrapper = ({ chart }: Props) => {
  const isMultiSeries = Array.isArray(chart.data[0][1]);

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2>{chart.title}</h2>
      {isMultiSeries ? (
        <MultiSeriesChart data={chart.data as [number, (number | null)[]][]} />
      ) : (
        <SingleSeriesChart data={chart.data as [number, number | null][]} />
      )}
    </div>
  );
};

export default ChartWrapper;
