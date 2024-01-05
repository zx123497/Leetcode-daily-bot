import {Routes, Route, BrowserRouter, Outlet} from 'react-router-dom';
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




const App = () => {
  const [mode, setMode] = useState("dark");

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
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<NavbarLayout/>}>
                  <Route path="/" element={<AllTime/>}/>
                  <Route path="/about" element={<Weekly/>}/>
                  <Route path="/streak" element={<Streak/>}/>
                  <Route path="/bobacoin" element={<BobaCoin/>}/>
                </Route>
              </Routes>
            </BrowserRouter>
          </div>
    </ThemeProvider >
    </ColorModeContext.Provider>
    
    
  );
}

const NavbarLayout = () => {
  return(
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default App;
