import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const StatsDonut = ({ data}) => {
  // ألوان متدرجة بالدرجات المختلفة من الأزرق
  const COLORS = ["#3B82F6", "#2563EB", "#1D4ED8", "#1E40AF"];

  return (
    <div className="flex flex-col">
       
      
      <PieChart width={600} height={600}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={100} // Donut
          outerRadius={140}
          paddingAngle={4}
          labelLine={false} // يخفي الخطوط المتصلة بالليبل
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          verticalAlign="bottom"
          layout="vertical"
          align="center"
          wrapperStyle={{ fontSize: "20px", color: "#0C1B4D" }}
        />
      </PieChart>
    </div>
  );
};

export default StatsDonut;
