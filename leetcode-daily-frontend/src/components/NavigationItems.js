import * as React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';



const NavigationItems = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

            <Tabs centered value={value} onChange={handleChange}>
            <Tab label="All Time" component={NavLink} to={"/"}/>
            <Tab label="Weekly" component={NavLink} to={"/about"}/>
            <Tab label="Streak Days" component={NavLink} to={"/streak"}/>
            <Tab label="BobaCoins" component={NavLink} to={"/bobacoin"}/>
        </Tabs> 
      </Box>
    </Box>
  );
}

export default NavigationItems;

