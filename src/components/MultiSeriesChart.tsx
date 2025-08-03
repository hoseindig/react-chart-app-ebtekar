import { useEffect, useRef } from "react";
import * as d3 from "d3";

type Props = {
  data: [number, (number | null)[]][];
};

const colors = ["blue", "green", "red"];

const MultiSeriesChart = ({ data }: Props) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const seriesCount = 3;
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const allData = data
      .flatMap(([x, values]) => values.map((y, i) => ({ x, y, series: i })))
      .filter((d) => d.y !== null) as {
      x: number;
      y: number;
      series: number;
    }[];

    const x = d3
      .scaleLinear()
      .domain(
        d3.extent(data, (d: [number, (number | null)[]]) => d[0]) as [
          number,
          number
        ]
      )
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain(d3.extent(allData, (d) => d.y) as [number, number])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    for (let i = 0; i < seriesCount; i++) {
      const lineData = data
        .map(([x, values]) => [x, values[i]] as [number, number | null])
        .filter(([, y]) => y !== null) as [number, number][];

      const line = d3
        .line<[number, number]>()
        .x((d) => x(d[0]))
        .y((d) => y(d[1]));

      svg
        .append("path")
        .datum(lineData)
        .attr("fill", "none")
        .attr("stroke", colors[i])
        .attr("stroke-width", 1.5)
        .attr("d", line);
    }
  }, [data]);

  return <svg ref={ref} width={500} height={300}></svg>;
};

export default MultiSeriesChart;
