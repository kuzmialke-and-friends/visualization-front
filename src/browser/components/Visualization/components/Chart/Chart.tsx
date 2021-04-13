import React, { useEffect } from "react";
import { scaleLinear, select, max, axisLeft, axisBottom, interpolateRainbow, median } from "d3";
import { VisualizationProps } from "../../types";
import { DatasetType, GhostSubject } from "../../../../../types";
import { Unsupported } from "../Unsupported";
import "./Chart.css";

const DeathCountChart = ({ subjects }: VisualizationProps<GhostSubject>) => {
  const chartClassName = "death-count-chart";

  useEffect(() => {
    const initialPersonalityTypes: Record<string, number[]> = {};

    const deathCountPerPersonalityType = Object.values(subjects).reduce(
      (acc, { log, metadata: { personalityType } }) => {
        const accumulatedDeathCount = acc[personalityType] || [];
        const finalDeathCount = Number(log[log.length - 1].deathCount);

        return {
          ...acc,
          [personalityType]: [...accumulatedDeathCount, finalDeathCount],
        };
      },
      initialPersonalityTypes,
    );

    const values: number[] = Object.values(deathCountPerPersonalityType)
      .map((element) => median(element))
      .filter(Boolean) as number[];
    const keys = Object.keys(deathCountPerPersonalityType);
    const width = 750;
    const height = 400;
    const margin = 25;
    const padding = 25;
    const barWidth = 25;

    const x = scaleLinear()
      .domain([0, values.length])
      .range([2 * margin, width - margin]);

    x.tickFormat(undefined);

    const y = scaleLinear()
      .domain([0, max(values) || 50])
      .range([height - margin, margin]);

    const newSvg = select(`.${"death-count-chart"}`).append("svg").attr("width", width).attr("height", height);

    newSvg
      .selectAll("rect")
      .data(values)
      .enter()
      .append("rect")
      .attr("x", (_, index) => x(index))
      .attr("y", (value) => y(value))
      .attr("width", barWidth)
      .attr("fill", (_, index) => `${interpolateRainbow(index / keys.length) || "green"}`)
      .attr("height", (value) => height - margin - y(value));

    newSvg
      .selectAll("text")
      .data(values)
      .enter()
      .append("text")
      .attr("fill", "white")
      .text((value) => value.toFixed())
      .attr("x", (_, index) => x(index))
      .attr("y", (value) => y(value) - 5);

    newSvg
      .append("g")
      .attr("margin", padding)
      .transition()
      .duration(1000)
      .call(axisLeft(y))
      .attr("transform", `translate(${margin})`);

    const xAxis = axisBottom(x);
    xAxis.ticks(keys.length);
    xAxis.tickFormat((_, index) => keys[index]);

    newSvg
      .append("g")
      .transition()
      .duration(1000)
      .call(xAxis)
      .attr("transform", `translate(0, ${height - margin})`)
      .selectAll("text")
      .attr("transform", "rotate(-30)");
  }, [subjects]);

  return <div className={`chart ${chartClassName}`}></div>;
};

const componentMap: Record<DatasetType, (props: VisualizationProps<any>) => JSX.Element> = {
  ghost: DeathCountChart,
  jump: DeathCountChart,
  maze: Unsupported,
};

export const Chart = ({ type, ...rest }: VisualizationProps) => {
  const Component = componentMap[type];

  return <Component {...rest} type={type} />;
};
