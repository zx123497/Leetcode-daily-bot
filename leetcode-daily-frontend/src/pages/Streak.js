import React from "react";
// import { Box } from "@mui/material";
// import Paper from '@mui/material/Paper';
// import { BarChart } from '@mui/x-charts/BarChart';
// import { useTheme } from "@emotion/react";
// import Typography from '@mui/material/Typography';
// import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import Container from '@mui/material/Container';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import notfound from '../assets/images/notfound.png';
const About = () => {
//     const theme = useTheme();
//     const [week, setWeek] = React.useState(1);

//   const handleChange = (event) => {
//     setWeek(event.target.value);
//   };
    return (
        <div>
        <img width={300} src={notfound}></img>
        <h3>施工中...</h3>
        </div>
        
//       <Container maxWidth="md" sx={{padding: "1rem .5rem"}}>
//         <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem"}}>
//         <Typography variant="h5" component="div" >
//             Weekly Leaderboard
            
//           </Typography>
//           <Tooltip title="The total days of daily challenges have done.">
//   <IconButton>
//     <HelpOutlineIcon />
//   </IconButton>
// </Tooltip>

          
//         </Box>
//         <FormControl>
        
//         <Box>
//         <InputLabel id="demo-simple-select-label">Week</InputLabel>

// <Select
//   labelId="demo-simple-select-label"
//   id="demo-simple-select"
//   value={week}
//   label="Age"
//   onChange={handleChange}
// >
//   <MenuItem selected value={1}>This Week</MenuItem>
//   <MenuItem value={2}>Last Week</MenuItem>
// </Select>
//         </Box>
        
//       </FormControl>
        
//       <BarChart
//   xAxis={[
//     {
//       id: 'barCategories',
//       data: ['Johnny', 'Leo', 'Lori', 'Carrie', 'Tom', "Shawn"],
      
//       scaleType: 'band',
//     },
//   ]}
//   series={[
//     {
//       data: [28, 21, 21, 17, 9, 3],
//       color: theme.palette.primary.main,
//     },
//   ]}

//   height={300}
// />  

//         <Paper elevation={2} sx={{display: "flex", justifyContent: "space-between", padding: "1rem", marginBottom:".5rem"}}>
//           <div> Johnny </div>
//           <div> 28 days </div>
//         </Paper>
//         <Paper elevation={1} sx={{display: "flex", justifyContent: "space-between", padding: "1rem", marginBottom:".5rem"}}>
//           <div> Leo </div>
//           <div> 21 days </div>
//         </Paper>
//         <Paper elevation={1} sx={{display: "flex", justifyContent: "space-between", padding: "1rem", marginBottom:".5rem"}}>
//           <div> Lori </div>
//           <div> 21 days </div>
//         </Paper>
//         <Paper elevation={1} sx={{display: "flex", justifyContent: "space-between", padding: "1rem", marginBottom:".5rem"}}>
//           <div> Carrie </div>
//           <div> 17 days </div>
//         </Paper>
//         <Paper elevation={1} sx={{display: "flex", justifyContent: "space-between", padding: "1rem", marginBottom:".5rem"}}>
//           <div> Tom </div>
//           <div> 9 days </div>
//         </Paper>
//         <Paper elevation={1} sx={{display: "flex", justifyContent: "space-between", padding: "1rem", marginBottom:".5rem"}}>
//           <div> Shawn </div>
//           <div> 3 days </div>
//         </Paper>
        
        
//       </Container>
        
    );
}

export default About;