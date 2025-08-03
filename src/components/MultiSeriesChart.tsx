import { useEffect, useRef, useState, useLayoutEffect } from "react";
import * as d3 from "d3";

type Props = {
  data: [number, (number | null)[]][];
};

const colors = ["blue", "green", "red"];

const MultiSeriesChart = ({ data }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 300 });

  // برای تنظیم اندازه responsive
  useLayoutEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setDimensions({
          width: containerWidth,
          height: 300, // ارتفاع ثابت، می‌تونید تغییر بدید
        });
      }
    };

    // اولین بار اندازه را تنظیم کن
    updateDimensions();

    // ResizeObserver برای تشخیص تغییر اندازه
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // event listener برای تغییر اندازه window
    window.addEventListener("resize", updateDimensions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {
    if (!data.length || !svgRef.current) return;

    const seriesCount = 3;
    const { width, height } = dimensions;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // تنظیم اندازه SVG
    svg.attr("width", width).attr("height", height);

    const allData = data
      .flatMap(([x, values]) => values.map((y, i) => ({ x, y, series: i })))
      .filter((d) => d.y !== null) as {
      x: number;
      y: number;
      series: number;
    }[];

    if (allData.length === 0) return;

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

    // محورها
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // خطوط داده
    for (let i = 0; i < seriesCount; i++) {
      const lineData = data
        .map(([x, values]) => [x, values[i]] as [number, number | null])
        .filter(([, y]) => y !== null) as [number, number][];

      if (lineData.length === 0) continue;

      const line = d3
        .line<[number, number]>()
        .x((d) => x(d[0]))
        .y((d) => y(d[1]))
        .curve(d3.curveMonotoneX); // برای نرم‌تر شدن خطوط

      svg
        .append("path")
        .datum(lineData)
        .attr("fill", "none")
        .attr("stroke", colors[i])
        .attr("stroke-width", 2)
        .attr("d", line);

      // اضافه کردن نقاط
      svg
        .selectAll(`.dots-${i}`)
        .data(lineData)
        .enter()
        .append("circle")
        .attr("class", `dots-${i}`)
        .attr("cx", (d) => x(d[0]))
        .attr("cy", (d) => y(d[1]))
        .attr("r", 3)
        .attr("fill", colors[i]);
    }
  }, [data, dimensions]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "300px",
        // border: "1px solid #ddd",
        borderRadius: "4px",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <svg ref={svgRef} style={{ display: "block" }}></svg>
    </div>
  );
};

export default MultiSeriesChart;
