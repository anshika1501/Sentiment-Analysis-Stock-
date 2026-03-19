import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TrendChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="glass-card" style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'300px', color:'rgba(255,255,255,0.3)', fontSize:'14px' }}>
        No trend data available
      </div>
    );
  }

  const chartData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background:'rgba(10,10,26,0.95)', border:'1px solid rgba(0,243,255,0.3)',
          borderRadius:'12px', padding:'12px 16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'11px', marginBottom:'4px' }}>{label}</p>
          <p style={{ color:'#00f3ff', fontWeight:700, fontSize:'16px' }}>
            {Number(payload[0].value).toFixed(2)} / 10
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card" style={{ padding:'24px' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px' }}>
        <p style={{ color:'rgba(255,255,255,0.4)', fontSize:'11px', letterSpacing:'0.2em', textTransform:'uppercase' }}>
          30-Day Sentiment Trend
        </p>
        <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
          <div className="pulse-dot" />
          <span style={{ color:'#00f3ff', fontSize:'11px', letterSpacing:'0.15em', textTransform:'uppercase' }}>Live</span>
        </div>
      </div>

      <div style={{ height:'320px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top:5, right:10, bottom:5, left:-20 }}>
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#bc13ff" />
                <stop offset="100%" stopColor="#00f3ff" />
              </linearGradient>
              <filter id="glow-filter">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill:'rgba(255,255,255,0.3)', fontSize:11 }}
              axisLine={false} tickLine={false}
              interval="preserveStartEnd"
              tickFormatter={v => v.slice(5)}
            />
            <YAxis
              domain={[0,10]}
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill:'rgba(255,255,255,0.3)', fontSize:11 }}
              axisLine={false} tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotoneX"
              dataKey="avg_sentiment"
              stroke="url(#lineGrad)"
              strokeWidth={3}
              dot={false}
              activeDot={{ r:6, fill:'#00f3ff', stroke:'#fff', strokeWidth:2 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
