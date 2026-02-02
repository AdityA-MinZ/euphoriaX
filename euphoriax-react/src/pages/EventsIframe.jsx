export default function EventsIframe() {
  return (
    <iframe 
      src="/public/index.html"  // Your existing events HTML
      style={{
        width: '100%', height: '100vh', 
        border: 'none', display: 'block'
      }}
      title="EuphoriaX Events"
    />
  )
}
