import {useState} from 'react';
import {GameMutation} from '../../types.ts';
import {Button, Grid, TextField, Typography} from '@mui/material';

const NewGame = () => {
  const [gameMutations, setGameMutation] = useState<GameMutation>(
    {
      platform: '',
      title: '',
      description: '',
      price: ''
    }
  );

  const onFieldChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = event.target
    setGameMutation((prevState)=>(
      {
      ...prevState,
      [name]:value
    }))
  }

  const onSubmit = (event:React.FormEvent)=>{
    event.preventDefault()

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
        required
        fullWidth
        label="Platform"
        variant="outlined"
        value={gameMutations.platform}
        onChange={onFieldChange}/>
      </Grid>
      <Grid item>
      <TextField
        required
        fullWidth
        label="Title"
        variant="outlined"
        value={gameMutations.title}
        onChange={onFieldChange}/>
      </Grid>
      <Grid item>
      <TextField
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
        required
        fullWidth
        label="Price"
        type="number"
        variant="outlined"
        value={gameMutations.price}
        onChange={onFieldChange}/>
      </Grid>

      <Grid item>
      <Button variant="contained" type="submit">
        Save
      </Button>
      </Grid>
    </Grid>
  );
};

export default NewGame;