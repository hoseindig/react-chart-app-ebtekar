import { useEffect, useState } from "react";
import ChartWrapper from "./components/ChartWrapper";

type ChartData = {
  title: string;
  data: (readonly [number, number | (number | null)[]])[];
};

function App() {
  const [charts, setCharts] = useState<ChartData[]>([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then(setCharts)
      .catch((err) => console.error("Error loading data.json:", err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      {charts.map((chart, index) => (
        <ChartWrapper key={index} chart={chart} />
      ))}
    </div>
  );
}

export default App;
