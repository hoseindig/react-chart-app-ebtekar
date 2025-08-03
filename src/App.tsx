import { useEffect, useState } from "react";
import ChartWrapper from "./components/ChartWrapper";
import { Container, Typography, Box, Divider } from "@mui/material";

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
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        نمودارهای آماری
      </Typography>
      <Divider sx={{ mb: 4 }} />
      {charts.map((chart, index) => (
        <Box
          key={index}
          mb={4}
          p={3}
          boxShadow={3}
          borderRadius={2}
          bgcolor="#fff"
        >
          <ChartWrapper chart={chart} />
        </Box>
      ))}
    </Container>
  );
}

export default App;
