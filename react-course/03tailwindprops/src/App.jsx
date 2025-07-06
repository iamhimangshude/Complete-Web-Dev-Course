
import './App.css'
import Card from './components/Card'

function App() {

  return (
    <>
     <h1 className='text-3xl bg-green-400 rounded-md p-[10px]'>Vite with tailwind</h1>
     <Card username="hitesh" time="12" post='Teacher'/>
     <Card username='himangshu' role='Student' time='fulltime' post='Learner'/>
     <Card/>
    </>
  )
}

export default App
