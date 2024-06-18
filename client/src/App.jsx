import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './Layouts/Layout'
import Products from './components/Products'

function App() {
  const [count, setCount] = useState(0)

  return (
   <Layout>
   <Products />
   </Layout>
  )
}

export default App
