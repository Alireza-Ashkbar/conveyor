"use client";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

// /**
//  * Dynamic single-line chart with customizable data, labels and line color.
//  *
//  * @param {Object} props
//  * @param {number[]} props.data - Y-axis data values
//  * @param {string[]} props.xLabels - X-axis label values (e.g. dates)
//  * @param {string} [props.color="#3B82F6"] - Line color
//  * @param {string} [props.seriesName="Users"] - Name of the line (used in tooltip)
//  */

// export default function LineChart({
//   data = [],
//   xLabels = [],
//   color = "#3B82F6",
//   seriesName = "Users",
// }) {

export const LineChart = ({
  data = [],
  xLabels = [],
  color = "#3B82F6",
  seriesName = "Users",
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const option = {
      grid: {
        left: 40,
        right: 20,
        top: 30,
        bottom: 40,
      },
      tooltip: {
        trigger: "axis",
        backgroundColor: "transparent",
        borderWidth: 0,
        padding: 0,
        textStyle: { color: "#fff" },
        formatter: function (params) {
          const value = params[0]?.value?.toLocaleString();
          return `
            <div style="
              padding: 8px;
              background-color: #27272a;
              border-radius: 0.5rem;
              border: 1px solid rgba(255,255,255,0.1);
              box-shadow: 0px 2px 4px rgba(0,0,0,0.1), 0px 4px 8px rgba(0,0,0,0.1);
              display: inline-flex;
              flex-direction: column;
              gap: 8px;
              min-width: 80px;
            ">
              <div style="color: #f4f4f5; font-size: 12px; font-weight: 500; text-align: center;">${seriesName}</div>
              <div style="display: flex; align-items: center; gap: 4px;">
                <div style="width: 12px; height: 12px; background-color: ${color}; border-radius: 2px;"></div>
                <div style="color: #fafafa; font-size: 12px; font-weight: 600;">${value}</div>
              </div>
            </div>
          `;
        },
      },
      xAxis: {
        type: "category",
        data: xLabels,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: "#9A9FA5",
          fontSize: 12,
          formatter: function (value, index) {
            return index % 7 === 0 ? value : "";
          },
        },
      },
      yAxis: {
        type: "value",
        axisLine: { show: false },
        splitLine: {
          lineStyle: {
            color: "rgba(0,0,0,0.05)",
          },
        },
        axisTick: { show: false },
        axisLabel: {
          color: "#9A9FA5",
          fontSize: 12,
        },
      },
      series: [
        {
          name: seriesName,
          type: "line",
          smooth: true,
          symbol: "circle",
          symbolSize: 4,
          lineStyle: {
            color: color,
            width: 4,
          },
          itemStyle: {
            color: color,
          },
          data: data,
        },
      ],
    };

    chart.setOption(option);
    const handleResize = () => chart.resize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [data, xLabels, color, seriesName]);

  return (
    <div
      ref={chartRef}
      style={{ width: "100%", height: "300px", direction: "ltr" }}
    />
  );
};
