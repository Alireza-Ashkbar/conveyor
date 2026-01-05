"use client";
import { useMemo } from "react";
import ReactECharts from "echarts-for-react";

export function AreaChart({ Data }) {
  const xLabels = Data?.xLabels || [];
  const data = Data?.data || [];
  const color = Data?.color || "#007BFF";

  const option = useMemo(
    () => ({
      grid: { left: 40, right: 20, top: 30, bottom: 40 },
      animation: true,
      animationDuration: 800,
      animationEasing: "cubicOut",
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: xLabels,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: "#2C3E50",
          fontSize: 14,
        },
      },
      yAxis: {
        type: "value",
        axisLine: { show: false },
        splitLine: { lineStyle: { color: "rgba(0,0,0,0.05)" } },
        axisTick: { show: false },
        axisLabel: { color: "#2C3E50", fontSize: 14 },
      },
      series: [
        {
          name: Data.name,
          type: "line",
          //   smooth: true,
          symbolSize: 6,
          lineStyle: { color, width: 3 },
          itemStyle: { color },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: color + "30" }, // semi-transparent
                { offset: 1, color: color + "00" }, // fully transparent
              ],
            },
          },
          data,
            animationDurationUpdate: 800,
            animationEasingUpdate: "cubicOut",
        },
      ],
    }),
    [Data]
  );

  return (
    <ReactECharts
      key={Data?.name}
      option={option}
      style={{ width: "100%", height: "300px" }}
      notMerge={false}
      lazyUpdate={true}
    />
  );
}
