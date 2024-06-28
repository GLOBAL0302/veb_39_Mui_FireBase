import {useCallback, useEffect, useState} from 'react';
import {ApiGames, GameMutation} from '../../types.ts';
import {CircularProgress, Grid, TextField, Typography} from '@mui/material';
import axiosApi from '../../axiosApi.ts';
import {useNavigate, useParams} from 'react-router-dom';
import {enqueueSnackbar} from 'notistack';
import {LoadingButton} from '@mui/lab';

const initialState = {
  platform: '',
  title: '',
  description: '',
  price: ''
}


const MutateGame = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [isMutating, setIsMutating] = useState(false);
  const [isFetching, setIsFetching] = useState(false)

  const fetchOneGame = useCallback(async (id:string)=>{
    const response = await axiosApi.get<ApiGames | null>(`/games/${id}.json`)
    setIsFetching(true)
    if(response.data){
      setGameMutation({
        ...response.data,
        price: response.data.price.toString()
      })
    }
    setIsFetching(false)
  },[])

  useEffect(() => {
    if(id!==undefined){
      void fetchOneGame(id)
    }
    else{
      setGameMutation(initialState)
    }
  }, [id, fetchOneGame]);

  const [gameMutations, setGameMutation] = useState<GameMutation>(
    initialState
  );



  const onFieldChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = event.target
    setGameMutation((prevState)=>(
      {
      ...prevState,
      [name]:value
    }))
  }

  const onSubmit = async (event:React.FormEvent)=>{
    event.preventDefault()

    try{
      setIsMutating(true)
      const gameData = {
        ...gameMutations,
        price:parseFloat(gameMutations.price)
      }

      if(id!== undefined){
        await  axiosApi.put(`/games/${id}.json`, gameData)

      }else{
        axiosApi.post("/games.json",gameData )
      }

      navigate("/")

    }catch (e){

      enqueueSnackbar({variant:'error', message:"something went Wrong"})
    }
    finally {
      setIsMutating(false)
    }
  }
  return isFetching? (<CircularProgress/>) : (
    <Grid container component="form" direction="column" gap={2} onSubmit={onSubmit}>
      <Grid >
        <Typography variant="h5">
          {id? "Edit a game": "Create a game"}
        </Typography>
      </Grid>
      <Grid item>
      <TextField
        name="platform"
        required
        fullWidth
        label="Platform"
        variant="outlined"
        value={gameMutations.platform}
        onChange={onFieldChange}/>
      </Grid>
      <Grid item>
      <TextField
        name="title"
        required
        fullWidth
        label="Title"
        variant="outlined"
        value={gameMutations.title}
        onChange={onFieldChange}/>
      </Grid>
      <Grid item>
      <TextField
        name="description"
        required
        fullWidth
        label="Description"
        multiline minRows={3}
        variant="outlined"
        value={gameMutations.description}
        onChange={onFieldChange}/>
        </Grid>
      <Grid item>
      <TextField
        name="price"
        required
        fullWidth
        label="Price"
        type="number"
        variant="outlined"
        value={gameMutations.price}
        onChange={onFieldChange}/>
      </Grid>

      <Grid item>
        <LoadingButton
          loading={isMutating}
          loadingPosition="start"
          variant="contained"
          type="submit"
        >
          Save
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default MutateGame;