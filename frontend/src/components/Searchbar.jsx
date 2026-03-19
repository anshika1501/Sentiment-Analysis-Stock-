import { useState } from 'react';

export default function Searchbar({ onSearch }) {
  const [ticker, setTicker] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ticker.trim()) onSearch(ticker.trim().toUpperCase());
  };

  return (
    <form onSubmit={handleSubmit} style={{ width:'100%', maxWidth:'640px', margin:'0 auto' }}>
      <div style={{
        position:'relative',
        padding:'2px',
        borderRadius:'9999px',
        background: focused ? 'linear-gradient(135deg, #00f3ff, #bc13ff)' : 'rgba(255,255,255,0.1)',
        boxShadow: focused ? '0 0 30px rgba(0,243,255,0.3)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div style={{ display:'flex', alignItems:'center', background:'#0f0f2e', borderRadius:'9999px', overflow:'hidden' }}>
          <input
            type="text"
            placeholder="Enter ticker: AAPL, TSLA, NVDA..."
            value={ticker}
            onChange={e => setTicker(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              flex:1, background:'transparent', border:'none', outline:'none',
              color:'white', fontSize:'16px', padding:'18px 24px',
              letterSpacing:'0.1em', textTransform:'uppercase',
            }}
            autoComplete="off"
          />
          <button type="submit" style={{
            margin:'6px', padding:'12px 24px', borderRadius:'9999px',
            background:'linear-gradient(135deg, #00f3ff, #bc13ff)',
            border:'none', cursor:'pointer', color:'#0a0a1a',
            fontWeight:700, fontSize:'14px', letterSpacing:'0.1em',
            transition:'opacity 0.2s', whiteSpace:'nowrap',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity='0.8'}
            onMouseLeave={e => e.currentTarget.style.opacity='1'}
          >
            SCAN →
          </button>
        </div>
      </div>
    </form>
  );
}
