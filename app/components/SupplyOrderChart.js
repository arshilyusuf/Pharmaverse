"use client";
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";

export default function SupplyOrderChart({ data }) {
  const fillColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--foreground")
    .trim();
  const unFillColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--background")
    .trim();
  const colorBrown = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-brown")
    .trim();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 30,
          right: 30,
          left: 20,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="suppliedTo" tick={false} />
        <YAxis />
        <Tooltip
          formatter={(value) => [`${value}`, "Quanitity"]}
          contentStyle={{ backgroundColor: `${unFillColor}` }}
          labelStyle={{
            color: `${colorBrown}`, // This sets the color of the drug name specifically
          }}
        />
        <Area
          type="natural"
          dataKey="quantity"
          stroke={fillColor}
          fill={fillColor}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
