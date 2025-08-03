import { useEffect, useRef } from "react";
import * as d3 from "d3";

type Props = {
  data: [number, number | null][];
};

const SingleSeriesChart = ({ data }: Props) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const validData = data.filter(([, value]) => value !== null) as [
      number,
      number
    ][];

    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const x = d3
      .scaleLinear()
      .domain(
        d3.extent(validData, (d: [number, number]) => d[0]) as [number, number]
      )
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
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }, [data]);

  return <svg ref={ref} width={500} height={300}></svg>;
};

export default SingleSeriesChart;
