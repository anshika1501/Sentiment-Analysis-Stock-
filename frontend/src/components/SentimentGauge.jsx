import { useEffect, useRef } from 'react';

export default function SentimentGauge({ score }) {
  const normalizedScore = Math.min(Math.max(parseFloat(score) || 0, 0), 10);
  const percentage = (normalizedScore / 10) * 100;

  let color, label;
  if (normalizedScore > 6) { color = '#00f3ff'; label = 'BULLISH'; }
  else if (normalizedScore < 4) { color = '#bc13ff'; label = 'BEARISH'; }
  else { color = '#ffffff'; label = 'NEUTRAL'; }

  const r = 80;
  const circ = 2 * Math.PI * r;
  const dash = circ * (1 - percentage / 100);

  return (
    <div className="glass-card" style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'32px 24px' }}>
      <p style={{ color:'rgba(255,255,255,0.4)', fontSize:'11px', letterSpacing:'0.25em', textTransform:'uppercase', marginBottom:'24px' }}>
        Sentiment Score
      </p>

      <div style={{ position:'relative', width:'200px', height:'200px', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <svg width="200" height="200" style={{ position:'absolute', top:0, left:0, transform:'rotate(-90deg)' }}>
          {/* Track */}
          <circle cx="100" cy="100" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
          {/* Progress */}
          <circle
            cx="100" cy="100" r={r}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeDasharray={circ}
            strokeDashoffset={dash}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 1.5s ease, stroke 0.5s ease',
              filter: `drop-shadow(0 0 8px ${color})`,
            }}
          />
        </svg>
        <div style={{ textAlign:'center', zIndex:1 }}>
          <div style={{ fontSize:'52px', fontWeight:900, color, textShadow:`0 0 20px ${color}`, lineHeight:1 }}>
            {normalizedScore.toFixed(1)}
          </div>
          <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.4)', marginTop:'8px', letterSpacing:'0.2em' }}>
            {label}
          </div>
        </div>
      </div>

      {/* Score bar */}
      <div style={{ width:'100%', marginTop:'24px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'6px', fontSize:'11px', color:'rgba(255,255,255,0.3)' }}>
          <span>0 Bearish</span><span>Bullish 10</span>
        </div>
        <div style={{ height:'6px', borderRadius:'9999px', background:'rgba(255,255,255,0.06)', overflow:'hidden' }}>
          <div style={{
            height:'100%', borderRadius:'9999px',
            width:`${percentage}%`,
            background:`linear-gradient(to right, #bc13ff, #00f3ff)`,
            transition:'width 1.5s ease',
            boxShadow: `0 0 10px ${color}`,
          }} />
        </div>
      </div>
    </div>
  );
}
