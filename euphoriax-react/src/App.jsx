function App() {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      margin: 0, 
      padding: 0,
      overflow: 'hidden',
      backgroundColor: '#000'
    }}>
      <iframe 
        src="/index.html" 
        style={{
          width: '100%', 
          height: '100%', 
          border: 'none',
          display: 'block'
        }}
        title="EuphoriaX Events"
      />
    </div>
  )
}
export default App
