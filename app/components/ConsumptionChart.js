"use client";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";
import HashLoader from "react-spinners/HashLoader";

async function getConsumptionData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/consumption`);
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export default function ConsumptionChart() {
  const [consumptionData, setConsumptionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const fillColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--foreground")
    .trim();
  const unFillColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--background")
    .trim();
  const colorBrown = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-brown")
    .trim();

  const fetchConsumptionData = async () => {
    const requireData = await getConsumptionData();
    setConsumptionData(requireData);
    setLoading(false);
  };
  useEffect(() => {
    fetchConsumptionData();
  }, []);
  return loading ? (
    <HashLoader color={fillColor} />
  ) : (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={consumptionData}
        margin={{
          top: 30,
          right: 30,
          left: 20,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="drugName" tick={false} />
        <YAxis />
        <Tooltip
          formatter={(value) => [`${value}`, "Consumed"]}
          contentStyle={{ backgroundColor: `${unFillColor}`, color: "" }}
          labelStyle={{
            color: `${colorBrown}`, // This sets the color of the drug name specifically
          }}
        />
        <Bar dataKey="drugQuantity" fill={fillColor} />
      </BarChart>
    </ResponsiveContainer>
  );
}
