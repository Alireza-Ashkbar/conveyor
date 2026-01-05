"use client";
import ReactECharts from "echarts-for-react";

export const PieChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const option = {
    tooltip: {
      trigger: "item",
      backgroundColor: "transparent",
      borderWidth: 0,
      extraCssText: "box-shadow: none; padding: 0;",
      formatter: (params) => {
        const percentage = ((params.value / total) * 100).toFixed(1);
        return `
          <div class="w-max p-2 bg-zinc-800 rounded-lg shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.10)] border border-white/10 inline-flex flex-col gap-2">
            <div class="flex items-start gap-1">
              <div class="size-3 relative rounded-sm" style="background:${
                params.color
              }"></div>
              <div class="text-neutral-50 text-xs font-semibold leading-3">
                ${params.name}: ${params.value.toLocaleString()} 
              </div>
            </div>
          </div>
        `;
      },
    },
    series: [
      {
        type: "pie",
        radius: ["65%", "95%"],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          scale: true,
          label: {
            show: true,
            fontSize: 32,
            fontWeight: "600",
            color: "#2C3E50",
            formatter: (params) => {
              const percentage = ((params.value / total) * 100).toFixed(0);
              return `${percentage}%`;
            },
          },
        },
        labelLine: {
          show: false,
        },
        data: data.map((item) => ({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: item.color,
            borderRadius: 10,
          },
        })),
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ width: "100%", height: "16rem" }} />
  );
};
