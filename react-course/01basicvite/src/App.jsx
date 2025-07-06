import Youtube from './Youtube'

function App() {
  const username = "hey"
  
  return (
    <>
      <h1>Vite + React app {2+2}</h1>
      <h1>Vite + React app {username === 'himangshu' ? 'Hii Himangshu': "Nah bye"}</h1>
      <Youtube/>
    </>
  )
}

export default App
