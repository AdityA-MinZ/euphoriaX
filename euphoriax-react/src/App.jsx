function App() {
  return (
    <div 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw', 
        height: '100vh', 
        margin: 0, 
        padding: 0,
        overflow: 'hidden',
        backgroundColor: '#000000',
        border: 'none'
      }}
    >
      <iframe 
        src="/index.html" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw', 
          height: '100vh', 
          border: 'none',
          margin: 0,
          padding: 0
        }}
        title="EuphoriaX Events"
      />
    </div>
  )
}

export default App
