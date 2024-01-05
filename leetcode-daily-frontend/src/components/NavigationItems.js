import * as React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@emotion/react';


const NavigationItems = () => {
  const [value, setValue] = React.useState(0);
const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <nav>
            {theme.breakpoints.up('md') ? <Tabs centered value={value} onChange={handleChange}>
            <Tab label="All Time" component={NavLink} to={"/"}/>
            <Tab label="Weekly" component={NavLink} to={"/about"}/>
            <Tab label="Streak Days" component={NavLink} to={"/streak"}/>
            <Tab label="BobaCoins" component={NavLink} to={"/bobacoin"}/>
        </Tabs> : <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons allowScrollButtonsMobile>
            <Tab label="All Time" component={NavLink} to={"/"}/>
            <Tab label="Weekly" component={NavLink} to={"/about"}/>
            <Tab label="Streak Days" component={NavLink} to={"/streak"}/>
            <Tab label="BobaCoins" component={NavLink} to={"/bobacoin"}/>
        </Tabs>}
        
        
        </nav>
        
      </Box>
    </Box>
  );
}

export default NavigationItems;

