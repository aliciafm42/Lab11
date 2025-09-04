import { useState } from 'react'
import './App.css'
import Header from './Header.jsx'
import Introduction from './Introduction.jsx'
import Card from './Card.jsx'

function App() {
  return (
    <>
      <Header />
      <h1>Profile App</h1>
      <Introduction />
       <Card
        title="Willow"
        description="Willow trees are diverse, graceful, fast-growing deciduous trees or shrubs characterized by simple, typically narrow, serrated leaves, often on slender, flexible branches" 
      />
      <Card 
        title="Evergreen"
        description="In botany, an evergreen is a plant which has foliage that remains green and functional throughout the year. This contrasts with deciduous plants, which lose their foliage completely during the winter or dry season." 
      />
    </>
  )
}

export default App;
