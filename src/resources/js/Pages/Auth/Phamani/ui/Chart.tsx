import { CashFlowPoint } from '@/Types/Phamani';
import { useEffect, useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';

const PALETTE = {
  primary: "#3D2817",
  secondary: "#6B4F3A",
  tertiary: "#D4C5A9",
  success: "#4A7A5E", // Muted Green
  danger: "#D4183D", // Muted Red
  bg: "#F5EFE6",
  grid: "#E8DCC4",
};

const PIE_COLORS = [
  "#3D2817", // Brown
  "#6B4F3A", // Light Brown
  "#A69580", // Beige Dark
  "#D4C5A9", // Beige Light
  "#8B7355", // Accent
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null

  return (
    <div className="bg-[#F5EFE6] border border-[#E8DCC4] p-3 rounded-xl shadow-lg space-y-1">
      <p className="text-xs font-bold text-[#8B7355] mb-1">{label}</p>

      {payload.map((item: any) => (
        <p key={item.dataKey} className="text-sm font-bold" style={{ color: item.color }}>
          {item.name}: R$ {item.value.toLocaleString('pt-BR')}
        </p>
      ))}
    </div>
  )
}

export const CashFlowChart = ({ data }: { data: CashFlowPoint[] }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !data || data.length === 0) {
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={288}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={PALETTE.success} stopOpacity={0.3} />
            <stop offset="95%" stopColor={PALETTE.success} stopOpacity={0} />
          </linearGradient>

          <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={PALETTE.danger} stopOpacity={0.3} />
            <stop offset="95%" stopColor={PALETTE.danger} stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="label"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#8B7355', fontSize: 10 }}
          dy={10}
        />

        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#8B7355', fontSize: 10 }}
        />

        <Tooltip
          content={<CustomTooltip />}
          cursor={{ stroke: PALETTE.grid, strokeWidth: 1, strokeDasharray: '4 4' }}
        />

        {/* RECEITAS */}
        <Area
          type="monotone"
          dataKey="income"
          stroke={PALETTE.success}
          strokeWidth={3}
          fill="url(#incomeGradient)"
          animationDuration={1200}
        />

        {/* DESPESAS */}
        <Area
          type="monotone"
          dataKey="expense"
          stroke={PALETTE.danger}
          strokeWidth={3}
          fill="url(#expenseGradient)"
          animationDuration={1200}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}


export const CategoryPieChart = ({ data }: { data: any[] }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ResponsiveContainer width="100%" height={288}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          stroke="none"
        >
  {data.map((entry, index) => (
    <Cell
      key={`cell-${index}`}
      fill={entry.color} 
    />
  ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          formatter={(value) => <span className="text-[#6B4F3A] text-xs font-medium ml-1">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
