import {useCallback, useEffect, useState} from 'react';
import axiosApi from '../../axiosApi.ts';
import {ApiGames, Game} from '../../types.ts';
import {Box, Button, Card, CardActions, CardContent, CircularProgress, Grid, Link, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';

const Games = () => {
  const [games, setGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(false)
  console.log(games)
  const fetchGames = useCallback(async ()=>{
    setIsLoading(true)
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
    }else{
      setGames([])
    }
    setIsLoading(false)
  },[])

  useEffect(() => {
    void fetchGames();
  }, [fetchGames]);

  return (
    <div>
      <Grid container spacing={2}>
        {isLoading && (
          <Box sx={{display:"flex" , alignItems:"center", justifyContent:"center", height:"100px", width:"100%"}}>
            <CircularProgress/>
          </Box>
        )}
        {games.length === 0 && !isLoading && (<Typography variant="h2">sorry , there is no games available</Typography>)}
        {games.map(game=>(
          <Grid item>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {game.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Platform: {game.platform}
                </Typography>
                <Typography variant="caption">
                  Price: {game.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={NavLink} to={`/games/${game.id}`}>
                  Learn More
                </Button>
                <Button size="small" component={NavLink} to={`/games/${game.id}/edit`}>
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Games;