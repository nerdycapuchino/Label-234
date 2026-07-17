export default function Home() {
  return (
    <div style={{ padding: '50px', fontFamily: 'sans-serif', textAlign: 'center', backgroundColor: '#f9d7da', color: '#721c24', height: '100vh' }}>
      <h1>⚠️ You are in the wrong folder!</h1>
      <p style={{ fontSize: '1.2rem', marginTop: '20px' }}>
        You started the development server inside the old <code>frontend</code> folder instead of the root project folder.
      </p>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', display: 'inline-block', marginTop: '30px', textAlign: 'left', border: '1px solid #f5c6cb' }}>
        <p><strong>To fix this, please follow these 3 exact steps in your terminal:</strong></p>
        <ol>
          <li>Press <code>Ctrl + C</code> to stop this server.</li>
          <li>Type <code>cd ..</code> and press Enter (this moves you to the correct folder).</li>
          <li>Type <code>npm run dev</code> and press Enter.</li>
        </ol>
      </div>
    </div>
  );
}
