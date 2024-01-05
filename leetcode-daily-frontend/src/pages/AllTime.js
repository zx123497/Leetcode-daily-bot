import React, {useEffect} from "react";

import { Box } from "@mui/material";
import Paper from '@mui/material/Paper';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from "@emotion/react";
import Typography from '@mui/material/Typography';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import {motion} from "framer-motion";
const AllTime = () => {
    const theme = useTheme();
    const [names, setNames] = React.useState([]);
    const [counts, setCounts] = React.useState([]);
    const [data, setData] = React.useState([]);

    const compare = ( a, b ) => {
      if ( a.count < b.count ){
        return 1;
      }
      if ( a.count > b.count ){
        return -1;
      }
      return 0;
    }
    useEffect(()=>{
      axios.get("/api/alltime").then((res)=>{
        console.log("frontend",res);
        let nameList = [];
        let countList = [];
        res.data.list.forEach((item)=>{
          nameList.push(item.name);
          countList.push(item.count);
        })

        let temp = res.data.list.sort(compare);
        setData(temp);
  
        setNames(nameList);
        setCounts(countList);
      })
    },[])
    

    return (
      <motion.div initial={{ opacity:0, y: 50 }}
      animate={{ opacity:1, y: 0 }}
      exit={{ opacity:0, y: 50 }}
      transition={{ duration: 0.5, delay: 0.1 }}>
        <Container maxWidth="md" sx={{padding: "1rem .5rem"}}>
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Typography variant="h5" component="div" >
            All-Time Daily Leaderboard
            
          </Typography>
          <Tooltip title="The total days of daily challenges done.">
  <IconButton>
    <HelpOutlineIcon />
  </IconButton>
</Tooltip>
          
        </Box>
        {(names.length && counts.length) ? <BarChart
  xAxis={[
    {
      id: 'barCategories',
      data: names,
      
      scaleType: 'band',
    },
  ]}
  series={[
    {
      data: counts,
      color: theme.palette.primary.main,
    },
  ]}

  height={300}
/> : <Box sx={{height: "300px", display: "flex", alignItems: "center", justifyContent: "center"}}><CircularProgress/></Box> }

{data.length ? data.map((item, i)=>
  (<Paper key={i} elevation={1} sx={{ display: "flex", justifyContent: "space-between", padding: "1rem", marginBottom:".5rem"}}>
  <div> {item.name} </div>
  <div> {item.count} days </div>
  </Paper>)
  
): <>
<Skeleton variant="rectangular" animation="wave" sx={{marginTop: ".5rem"}} height={56} />
<Skeleton variant="rectangular" animation="wave" sx={{marginTop: ".5rem"}} height={56} />
<Skeleton variant="rectangular" animation="wave" sx={{marginTop: ".5rem"}} height={56} />
<Skeleton variant="rectangular" animation="wave" sx={{marginTop: ".5rem"}} height={56} />
<Skeleton variant="rectangular" animation="wave" sx={{marginTop: ".5rem"}} height={56} />
</>}

      </Container>

      </motion.div>
      
        
    );
}

export default AllTime;