"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
  "#ff0000",
  "#00c49f",
];

const CategoryPieChart = ({ transactions }) => {
  const categoryData = transactions.reduce((acc, { category, amount }) => {
    const existing = acc.find((item) => item.name === category);
    if (existing) {
      existing.value += amount;
    } else {
      acc.push({ name: category, value: amount });
    }
    return acc;
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={categoryData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
        >
          {categoryData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategoryPieChart;
