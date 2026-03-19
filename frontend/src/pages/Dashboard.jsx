import SentimentGauge from '../components/SentimentGauge';
import StatsCards from '../components/StatsCards';
import TrendChart from '../components/TrendChart';

export default function Dashboard({ stockData, onBack, error }) {
  if (!stockData) return null;

  const { summary, history } = stockData;
  const score = summary ? parseFloat(summary.avg_sentiment) : 5;
  const trend = summary ? summary.daily_trend : 'NEUTRAL';
  const date = summary ? summary.date : new Date().toISOString().split('T')[0];

  const trendColor = trend === 'BULLISH' ? '#00f3ff' : trend === 'BEARISH' ? '#bc13ff' : 'rgba(255,255,255,0.6)';

  const stats = [
    { label: 'Signal', value: trend, colorKey: trend },
    { label: 'Score', value: `${(score * 10).toFixed(0)}%` },
    { label: 'Analysis Date', value: date },
    { label: 'Articles Scanned', value: stockData.articles_processed || '—' },
  ];

  return (
    <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'32px 24px' }}>
      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          display:'flex', alignItems:'center', gap:'8px',
          background:'none', border:'1px solid rgba(255,255,255,0.1)',
          color:'rgba(255,255,255,0.5)', padding:'8px 16px',
          borderRadius:'9999px', cursor:'pointer', fontSize:'12px',
          letterSpacing:'0.15em', textTransform:'uppercase',
          marginBottom:'32px', transition:'all 0.2s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor='#00f3ff'; e.currentTarget.style.color='#00f3ff'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; e.currentTarget.style.color='rgba(255,255,255,0.5)'; }}
      >
        ← New Scan
      </button>

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'40px', flexWrap:'wrap', gap:'16px' }}>
        <div>
          <h1 style={{ fontSize:'clamp(36px, 6vw, 64px)', fontWeight:900, letterSpacing:'-0.02em', margin:0, color:'white' }}>
            {stockData.stock_name}
          </h1>
          <p style={{ color:'rgba(255,255,255,0.3)', fontSize:'12px', marginTop:'4px', letterSpacing:'0.15em', textTransform:'uppercase' }}>
            Sentiment Analysis Report
          </p>
        </div>
        <div style={{
          display:'flex', alignItems:'center', gap:'10px',
          background:'rgba(0,243,255,0.05)',
          border:'1px solid rgba(0,243,255,0.2)',
          padding:'10px 20px', borderRadius:'9999px',
        }}>
          <div className="pulse-dot" />
          <span style={{ color:'#00f3ff', fontSize:'12px', letterSpacing:'0.15em', textTransform:'uppercase', fontWeight:600 }}>
            {trend}
          </span>
        </div>
      </div>

      {/* Error/Demo notice */}
      {error && (
        <div style={{
          background:'rgba(188,19,255,0.08)', border:'1px solid rgba(188,19,255,0.3)',
          borderRadius:'12px', padding:'12px 20px', marginBottom:'24px',
          color:'rgba(255,255,255,0.6)', fontSize:'12px', letterSpacing:'0.05em',
        }}>
          ⚠ {error}
        </div>
      )}

      {/* Main grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'24px', alignItems:'start' }}>
        {/* Left column */}
        <div style={{ display:'flex', flexDirection:'column', gap:'24px' }}>
          <SentimentGauge score={score} />
          <StatsCards stats={stats} />
        </div>

        {/* Right column / Chart */}
        <div style={{ gridColumn:'span 2' }}>
          <TrendChart data={history} />
        </div>
      </div>
    </div>
  );
}
