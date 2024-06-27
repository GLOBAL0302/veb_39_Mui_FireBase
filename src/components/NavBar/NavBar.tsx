import {AppBar, Button, Toolbar, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';

const NavBar = () => {
  return (
      <AppBar position="static" sx={{mb: 2}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button component={NavLink} to="/" color="inherit">
            Home
          </Button>
          <Button component={NavLink} to="/new-game" color="inherit">
            New Game
          </Button>
        </Toolbar>
      </AppBar>

  );
};

export default NavBar;