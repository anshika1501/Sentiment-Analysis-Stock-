import Searchbar from '../components/Searchbar';

const TICKERS = ['AAPL', 'NVDA', 'TSLA', 'BTC', 'MSFT', 'GOOGL'];

export default function Home({ onSearch }) {
  return (
    <div style={{
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      minHeight:'100vh', padding:'24px', textAlign:'center',
    }}>
      {/* Logo */}
      <div style={{ marginBottom:'24px' }}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="30" stroke="#00f3ff" strokeWidth="2" opacity="0.3"/>
          <path d="M16 44 L24 28 L32 36 L40 20 L48 32" stroke="#00f3ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" style={{filter:'drop-shadow(0 0 6px #00f3ff)'}} />
          <circle cx="32" cy="36" r="3" fill="#bc13ff" style={{filter:'drop-shadow(0 0 6px #bc13ff)'}}/>
        </svg>
      </div>

      {/* Heading */}
      <h1 style={{
        fontSize:'clamp(40px, 8vw, 80px)',
        fontWeight:900,
        lineHeight:1.1,
        marginBottom:'16px',
        letterSpacing:'-0.02em',
      }}>
        <span style={{ color:'white' }}>Neural</span>
        {' '}
        <span className="neon-blue">Market</span>
      </h1>

      <p style={{
        color:'rgba(255,255,255,0.45)', maxWidth:'480px', lineHeight:1.7,
        fontSize:'15px', marginBottom:'48px', letterSpacing:'0.03em',
      }}>
        AI-powered stock sentiment analysis. Enter a ticker below to trigger a deep news scan and instantly understand market mood.
      </p>

      {/* Search */}
      <div style={{ width:'100%', maxWidth:'600px', marginBottom:'40px' }}>
        <Searchbar onSearch={onSearch} />
      </div>

      {/* Quick picks */}
      <div>
        <p style={{ color:'rgba(255,255,255,0.25)', fontSize:'11px', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'16px' }}>
          Quick Scan
        </p>
        <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'10px' }}>
          {TICKERS.map(t => (
            <button
              key={t}
              onClick={() => onSearch(t)}
              style={{
                padding:'8px 20px', borderRadius:'9999px',
                background:'rgba(255,255,255,0.04)',
                border:'1px solid rgba(255,255,255,0.1)',
                color:'rgba(255,255,255,0.7)', fontSize:'13px',
                letterSpacing:'0.1em', cursor:'pointer',
                transition:'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(0,243,255,0.1)';
                e.currentTarget.style.borderColor = 'rgba(0,243,255,0.5)';
                e.currentTarget.style.color = '#00f3ff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
