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
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#F5EFE6] border border-[#E8DCC4] p-3 rounded-xl shadow-lg">
        <p className="text-xs font-bold text-[#8B7355] mb-1">{label}</p>
        <p className="text-sm font-bold text-[#3D2817]">
          {payload[0].name}: {typeof payload[0].value === 'number' ? `R$ ${payload[0].value}` : payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export const CashFlowChart = ({ data }: { data: any[] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={PALETTE.secondary} stopOpacity={0.3}/>
            <stop offset="95%" stopColor={PALETTE.secondary} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="name" 
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
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: PALETTE.grid, strokeWidth: 1, strokeDasharray: '4 4' }} />
        <Area 
          type="monotone" 
          dataKey="value" 
          stroke={PALETTE.secondary} 
          strokeWidth={3}
          fillOpacity={1} 
          fill="url(#colorValue)" 
          animationDuration={1500}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export const CategoryPieChart = ({ data }: { data: any[] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
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
            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
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
