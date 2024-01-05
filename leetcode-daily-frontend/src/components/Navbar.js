import React, {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';

import NavigationItems from './NavigationItems';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@emotion/react';
import ColorModeContext from '../contexts/ColorModeContext';
import logo from '../assets/images/logo.png';
const Navbar = () => {

    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar sx={{padding: "2rem", textAlign:"center", background: "linear-gradient(#ff5722, #ff9800)"}} position="static">
        <img src={logo} style={{width: "5rem", margin: "auto"}}></img>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1, color: "#FFF" }}>
            Leetcode Daily Challenge
          </Typography>
          <IconButton sx={{ ml: 1, color: "#FFF" }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
          


        
      </AppBar>
      <NavigationItems/>
    </Box>
  );
}

export default Navbar;