import { useState } from 'react'
import './App.scss'
import ImageButton from './ImageButton'

function App() {
  const imageUrl = "https://assets.talmudyerushalmi.com/manuscripts/venice/0303_FL77977460.jpg";

  return (
    <div className="App">
      <ImageButton imageUrl={imageUrl}/>
    </div>
  )
}

export default App
