export default function Loader() {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'100vh', gap:'24px' }}>
      <div style={{ position:'relative', width:'96px', height:'96px', display:'flex', alignItems:'center', justifyContent:'center' }}>
        {/* Outer ring */}
        <div className="spin-cw" style={{
          position:'absolute', inset:0, borderRadius:'50%',
          border: '2px solid transparent',
          borderTop: '2px solid #00f3ff',
          borderRight: '2px solid #00f3ff',
          boxShadow: '0 0 12px #00f3ff',
        }} />
        {/* Inner ring */}
        <div className="spin-ccw" style={{
          position:'absolute', inset:'10px', borderRadius:'50%',
          border: '2px solid transparent',
          borderBottom: '2px solid #bc13ff',
          borderLeft: '2px solid #bc13ff',
          boxShadow: '0 0 12px #bc13ff',
        }} />
        {/* Core */}
        <div className="core-pulse" style={{
          width:'24px', height:'24px', borderRadius:'50%',
          background: 'white',
          boxShadow: '0 0 20px white',
        }} />
      </div>
      <p style={{ color:'#00f3ff', fontWeight:600, letterSpacing:'0.25em', textTransform:'uppercase', fontSize:'13px', textShadow:'0 0 10px #00f3ff' }}>
        Analyzing Market Data...
      </p>
    </div>
  );
}
