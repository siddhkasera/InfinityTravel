import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik, Form } from 'formik';
import {Link} from "react-router-dom";

import Dashboard from './Dashboard';


function Search() {

    const defaultTheme = createTheme();


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
        //   email: data.get('email'),
        //   password: data.get('password'),
    
        });
      };

  return (
    <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="lg" >
        <Box sx={{ marginTop: 8,
                   display: 'flex',
                   flexDirection: 'column',
                   alignItems: 'center',
                   border:3,
                   m:12,
                   p:12,
                   
                    }} >

        <Typography component="h1" variant="h5"> Hi! Where are you going? </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, display:"flex", flexDirection:"column"}}>
            <Box className ="first-text"sx={{display:"flex", gap:5}}>
                <TextField 
                margin= "normal"
                required
                fullWidth
                id="From"
                label="From"
                name="From"
                sx={{border:1}}
                >

                </TextField>
                <TextField 
                margin= "normal"
                required 
                fullWidth
                id="To"
                label="To"
                name="To"
                sx={{border:1}}
                >

                </TextField>
                </Box>
                <Box className ="dates" sx={{display:"flex", gap:5}}>
                <TextField 
                margin= "normal"
                required
                fullWidth
                id="date"
                label="Date"
                name="date"
                sx={{
                    marginBottom:"2px",
                }}
                >
                </TextField>
                <TextField 
                margin= "normal"
                required 
                fullWidth
                id="Date"
                label="Date"
                name="date"
                >
                </TextField>
            </Box>
            <Box className="numberoftravellers" sx={{display:"flex"}}>
                {/* <Typography sx={{fontSize:20}}>
                    Number of Travellers
                </Typography> */}
                <TextField 
                margin= "normal"
                required 
                fullWidth
                id="number of travellers"
                label="Number of Travellers"
                name="date"
                >
                </TextField>


            </Box>
            <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2, backgroundColor:"#925FE2" }}
                          
                        >
                          Search
                        </Button>




        </Box>

        
        
        </Box>



        </Container>



    </ThemeProvider>
  )
}

export default Search
