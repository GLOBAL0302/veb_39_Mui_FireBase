import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar/NavBar.tsx';
import {Container, Typography} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import Games from './pages/Games/Games.tsx';
import NewGame from './pages/NewGame/NewGame.tsx';

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <NavBar/>
      </header>
      <Container component="main">
        <Routes>
          <Route path="/" element={<Games/>}/>
          <Route path="/new-game" element={<NewGame/>}/>
          <Route path="*" element={<Typography variant="h2">Not Found</Typography>}/>
        </Routes>
      </Container>
    </>
  )
};

export default App
