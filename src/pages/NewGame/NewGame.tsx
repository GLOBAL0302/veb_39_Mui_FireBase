import {useState} from 'react';
import {GameMutation} from '../../types.ts';
import {Grid, TextField, Typography} from '@mui/material';
import axiosApi from '../../axiosApi.ts';
import {useNavigate} from 'react-router-dom';
import {enqueueSnackbar} from 'notistack';
import {LoadingButton} from '@mui/lab';


const NewGame = () => {
  const navigate = useNavigate();
  const [gameMutations, setGameMutation] = useState<GameMutation>(
    {
      platform: '',
      title: '',
      description: '',
      price: ''
    }
  );

  const [isLoading, setIsloading] = useState(false)

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
      setIsloading(true)
      const gameData = {
        ...gameMutations,
        price:parseFloat(gameMutations.price)
      }
      axiosApi.post("/games.json",gameData )

      navigate("/")

    }catch (e){
      enqueueSnackbar("error")
      // enqueueSnackbar({variant:'error', message:"something went Wrong"})
    }
    finally {
      setIsloading(false)

    }

  }
  return (
    <Grid container component="form" direction="column" gap={2} onSubmit={onSubmit}>
      <Grid >
        <Typography variant="h5">
          Create New Game
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
          loading={isLoading}
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

export default NewGame;