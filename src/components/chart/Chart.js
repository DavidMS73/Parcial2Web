import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function Chart({ data }) {
  let canvasRef = useRef(null);

  useEffect(() => {
    if (data && navigator.onLine) {
      const canvas = d3.select(canvasRef.current);
      canvas.selectAll("*").remove();
      const width = 900;
      const height = 500;
      const margin = { top: 10, left: 60, bottom: 40, right: 10 };
      const iwidth = width - margin.left - margin.right;
      const iheight = height - margin.top - margin.bottom;

      const svg = canvas.append("svg");
      svg.attr("width", width);
      svg.attr("height", height);

      let g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      let max = 0;
      for (let i in data) {
        max = Math.max(max, data[i].height + data[i].height * 0.1);
      }

      let y = d3.scaleLinear().range([iheight, 0]);

      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.name))
        .range([0, iwidth])
        .padding(0.1);

      let xAxis = g
        .append("g")
        .classed("x--axis", true)
        .attr("transform", `translate(0, ${iheight})`);

      let yAxis = g.append("g").classed("y--axis", true);

      y.domain([0, max]);
      const bars = g.selectAll("rect").data(data);

      bars
        .enter()
        .append("rect")
        .transition()
        .duration(800)
        .attr("class", "bar")
        .style("fill", "steelblue")
        .attr("x", (d) => x(d.name))
        .attr("y", (d) => y(d.height))
        .attr("height", (d) => iheight - y(d.height))
        .attr("width", x.bandwidth());

      xAxis.call(d3.axisBottom(x));
      yAxis.transition().call(d3.axisLeft(y));

      svg
        .append("text")
        .attr("x", iwidth / 2)
        .attr("y", margin.top + 10)
        .style("text-anchor", "middle")
        .text("Pokémon");
    }
  }, [data]);

  return <div ref={canvasRef}></div>;
}
