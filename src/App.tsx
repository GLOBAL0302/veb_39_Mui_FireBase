import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar/NavBar.tsx';
import {Container, Typography} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import Games from './pages/Games/Games.tsx';
import MutateGame from './pages/MutateGame/MutateGame.tsx';
import mutateGame from './pages/MutateGame/MutateGame.tsx';

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
          <Route path="/new-game" element={<MutateGame/>}/>
          <Route path="/games/:id/edit" element={<MutateGame/>}/>
          <Route path="*" element={<Typography variant="h2">Not Found</Typography>}/>
        </Routes>
      </Container>
    </>
  )
};

export default App
