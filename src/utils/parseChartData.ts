export type SingleSeriesData = [number, number | null][];
export type MultiSeriesData = [number, (number | null)[]][];

export function parseChartData(rawData: any): {
  type: "single" | "multi";
  data: SingleSeriesData | MultiSeriesData;
} {
  if (!Array.isArray(rawData)) throw new Error("Invalid data format");

  if (
    rawData.every(
      (item) =>
        Array.isArray(item) &&
        typeof item[0] === "number" &&
        (typeof item[1] === "number" || item[1] === null)
    )
  ) {
    return { type: "single", data: rawData as SingleSeriesData };
  }

  if (
    rawData.every(
      (item) =>
        Array.isArray(item) &&
        typeof item[0] === "number" &&
        Array.isArray(item[1])
    )
  ) {
    return { type: "multi", data: rawData as MultiSeriesData };
  }

  throw new Error("Unrecognized data format");
}
