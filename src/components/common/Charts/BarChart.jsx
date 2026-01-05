"use client";
import { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

// Function to lighten a HEX color
function lightenColor(hex, percent) {
  let num = parseInt(hex.replace("#", ""), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = ((num >> 8) & 0x00ff) + amt,
    B = (num & 0x0000ff) + amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

export function BarChart({ Data }) {
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
          type: "bar",
          data,
          barWidth: "12",
          //   itemStyle: {
          //     color,
          //     borderRadius: [6, 6, 0, 0],
          //   },

          //   itemStyle: {
          //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //       { offset: 0, color: "#4064ff" }, // top
          //       { offset: 1, color: "#dce3ff" }, // bottom
          //     ]),
          //     borderRadius: [6, 6, 0, 0],
          //   },

          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: Data.color },
              { offset: 1, color: lightenColor(Data.color, 80) },
            ]),
            borderRadius: [2, 2, 0, 0],
          },

          animationDurationUpdate: 800,
          animationEasingUpdate: "cubicOut",
        },
      ],
    }),
    [Data]
  );

  return (
    <ReactECharts
      option={option}
      style={{ width: "100%", height: "300px" }}
      notMerge={false}
      lazyUpdate={true}
    />
  );
}
