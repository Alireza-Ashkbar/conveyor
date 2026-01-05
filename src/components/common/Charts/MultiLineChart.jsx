"use client";
import ReactECharts from "echarts-for-react";
import { useMemo } from "react";

export const MultiLineChart = ({ Data }) => {
  const xLabels = Data?.xLabels || [];
  const lines = Data?.lines || [];

  const option = useMemo(
    () => ({
      grid: { left: 40, right: 20, top: 30, bottom: 40 },
      animation: true,
      animationDuration: 800,
      animationEasing: "cubicOut",
      tooltip: {
        trigger: "axis",
        // backgroundColor: "transparent",
        // borderWidth: 0,
        // padding: 0,
        // textStyle: { color: "#fff" },
        // formatter: function (params) {
        //   const hoveredIndex = params.findIndex(
        //     (p) => p.seriesName === params[0].seriesName
        //   );
        //   const active = params[hoveredIndex];

        //   const rows = params
        //     .map((item) => {
        //       const isActive = item.seriesName === active.seriesName;
        //       const dotColor = item.color;
        //       const textColor = isActive ? "#fafafa" : "#9ca3af";
        //       const fontWeight = isActive ? "600" : "500";
        //       return `
        //         <div style="display: flex; align-items: center; gap: 4px;">
        //           <div style="width: 12px; height: 12px; background-color: ${dotColor}; border-radius: 2px;"></div>
        //           <div style="color: ${textColor}; font-size: 12px; font-weight: ${fontWeight};">
        //             ${item.seriesName}: ${item.value}
        //           </div>
        //         </div>
        //       `;
        //     })
        //     .join("");

        //   return `
        //     <div style="
        //       padding: 8px;
        //       background-color: #27272a;
        //       border-radius: 0.5rem;
        //       border: 1px solid rgba(255,255,255,0.1);
        //       box-shadow: 0px 2px 4px rgba(0,0,0,0.1), 0px 4px 8px rgba(0,0,0,0.1);
        //       display: inline-flex;
        //       flex-direction: column;
        //       gap: 8px;
        //       min-width: 80px;
        //     ">
        //       <div style="color: #f4f4f5; font-size: 12px; font-weight: 500;">${active.name}</div>
        //       ${rows}
        //     </div>
        //   `;
        // },
      },
      // legend: {
      //   data: lines.map((line) => line.name),
      // },
      xAxis: {
        type: "category",
        data: xLabels,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: "#2C3E50",
          fontSize: 16,
        },
      },
      yAxis: {
        type: "value",
        axisLine: { show: false },
        splitLine: { lineStyle: { color: "rgba(0,0,0,0.05)" } },
        axisTick: { show: false },
        axisLabel: { color: "#2C3E50", fontSize: 16 },
      },
      series: lines.map((line) => ({
        name: line.name,
        type: "line",
        // smooth: true,
        symbolSize: 8,
        lineStyle: { color: line.color, width: 4 },
        itemStyle: { color: line.color },
        data: line.data,
        // animationDuration: 800,
        // animationEasing: "cubicOut",
      })),
    }),
    [Data]
  );

  return (
    <ReactECharts
      key={Data?.xLabels?.join("-") + lines.map((l) => l.name).join("-")}
      option={option}
      style={{ width: "100%", height: "17rem" }}
      notMerge={false}
      lazyUpdate={true}
    />
  );
};
