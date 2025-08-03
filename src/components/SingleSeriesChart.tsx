// SingleSeriesChart.tsx
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

type Props = {
  data: [number, number | null][];
};

const SingleSeriesChart = ({ data }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [width, setWidth] = useState<number>(0);
  const height = 300;

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!width || !svgRef.current) return;

    const validData = data.filter(([, value]) => value !== null) as [
      number,
      number
    ][];

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const x = d3
      .scaleLinear()
      .domain(d3.extent(validData, (d) => d[0]) as [number, number])
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain(d3.extent(validData, (d) => d[1]) as [number, number])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line<[number, number]>()
      .x((d) => x(d[0]))
      .y((d) => y(d[1]));

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg
      .append("path")
      .datum(validData)
      .attr("fill", "none")
      .attr("stroke", "#1976d2") // MUI primary
      .attr("stroke-width", 2)
      .attr("d", line);
  }, [width, data]);

  return (
    <div ref={containerRef} style={{ width: "100%" }}>
      <svg ref={svgRef} width={width} height={height} />
    </div>
  );
};

export default SingleSeriesChart;
