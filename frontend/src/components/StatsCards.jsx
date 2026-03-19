export default function StatsCards({ stats }) {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
      {stats.map((stat, i) => {
        const colorMap = {
          BULLISH: '#00f3ff',
          BEARISH: '#bc13ff',
          NEUTRAL: 'rgba(255,255,255,0.7)',
          default: 'rgba(255,255,255,0.9)',
        };
        const color = colorMap[stat.value] || colorMap[stat.colorKey] || colorMap.default;

        return (
          <div
            key={i}
            className="glass-card"
            style={{ padding:'20px', transition:'transform 0.2s ease', cursor:'default' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'10px' }}>
              {stat.label}
            </p>
            <p style={{ fontSize:'22px', fontWeight:900, color, textShadow:`0 0 12px ${color}` }}>
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
