import { Routes, Route,  useLocation} from 'react-router-dom';
import AllTime from './pages/AllTime';
import Weekly from './pages/Weekly';
import Streak from './pages/Streak';
import BobaCoin from './pages/BobaCoin';
import React, {useState, useMemo} from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ColorModeContext from './contexts/ColorModeContext';
import CssBaseline from '@mui/material/CssBaseline';
import {AnimatePresence} from 'framer-motion';



const App = () => {
  const [mode, setMode] = useState("dark");
  const location = useLocation();

  const colorMode = useMemo(
    ()=>({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      }
    }), []
  )

  const theme = useMemo(
    ()=> 
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#ff9800",
          },
          secondary: {
            main: "#9198e5",
          },
        }
      })
  , [mode]);




  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <div className="App">
      <Navbar/>
      <AnimatePresence mode='wait' initial={false}>

              <Routes location={location} key={location.pathname.split('/')[1]}>
                
                
                  <Route path="/" element={<AllTime/>}/>
                  <Route  path="/about" element={<Weekly/>}/>
                  <Route path="/streak" element={<Streak/>}/>
                  <Route path="/bobacoin" element={<BobaCoin/>}/>
                
                
                
              </Routes>
              </AnimatePresence>
              
          </div>
          
    </ThemeProvider >
    </ColorModeContext.Provider>
    
    
  );
}



export default App;
