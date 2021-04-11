import React, { useEffect, useState } from "react";
import { scaleLinear, select, Selection, max } from "d3";
import { VisualizationProps } from "../../types";
import { DatasetType, GhostSubject } from "../../../../../types";
import { Unsupported } from "../Unsupported";

const DeathCountChart = ({ subjects }: VisualizationProps<GhostSubject>) => {
  const [svg, setSvg] = useState<Selection<SVGSVGElement, unknown, HTMLElement, any> | undefined>();
  const chartClassName = "death-count-chart";

  useEffect(() => {
    const initialPersonalityTypes: Record<string, number> = {};

    const deathCountPerPersonalityType = Object.values(subjects).reduce(
      (acc, { log, metadata: { personalityType } }) => {
        const accumulatedDeathCount = acc[personalityType] || 0;
        const finalDeathCount = Number(log[log.length - 1].deathCount);

        return {
          ...acc,
          [personalityType]: accumulatedDeathCount + finalDeathCount,
        };
      },
      initialPersonalityTypes,
    );

    const values = Object.values(deathCountPerPersonalityType);
    const keys = Object.keys(deathCountPerPersonalityType);
    const height = 300;

    const x = scaleLinear().domain([0, values.length]).range([0, 345]);
    const y = scaleLinear()
      .domain([0, max(values) || 50])
      .range([0, 345]);

    //   const histogram = bin().domain(x.domain());

    const newSvg = select(`.${"death-count-chart"}`).append("svg").attr("width", 700).attr("height", height);

    newSvg
      .selectAll("rect")
      .data(values)
      .enter()
      .append("rect")
      .attr("x", (_, i) => x(i))
      .attr("y", (d) => height - 10 * d)
      .attr("width", 25)
      .attr("fill", "green")
      .attr("height", (d) => y(d));

    newSvg
      .selectAll("text")
      .data(values)
      .enter()
      .append("text")
      .text((d) => d)
      .attr("x", (_, i) => i * 70)
      .attr("y", (d) => height - 10 * d - 3);

    setSvg(newSvg);
  }, []);

  return <div className={chartClassName}></div>;
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
