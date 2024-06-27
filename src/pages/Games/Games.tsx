import {useCallback, useEffect, useState} from 'react';
import axiosApi from '../../axiosApi.ts';
import {ApiGames, Game} from '../../types.ts';
import {Grid} from '@mui/material';

const Games = () => {
  const [games, setGames] = useState<Game[]>([])
  const fetchGames = useCallback(async ()=>{
    const response = await axiosApi.get<ApiGames | null>("/games.json")

    const gamesResponse = response.data
    if(gamesResponse !== null){
      const games:Game[] = Object.keys(response.data).map((id:string)=>{
        return{
          ...response.data[id],
          id,
        }
      })
      setGames(games)
    }
   setGames([])
  },[])

  useEffect(() => {
    void fetchGames();
  }, [fetchGames]);

  return (
    <div>
      <Grid container spacing={2}>

      </Grid>
    </div>
  );
};

export default Games;