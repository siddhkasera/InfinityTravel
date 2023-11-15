import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import '../cssfiles/Support.css';
import Container from '@mui/material/Container';
import Dashboard from "./Dashboard";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

function Notification() {
  return (
  
  <ThemeProvider theme={defaultTheme}>


    <Container maxWidth= {false} className="main-container" sx={{display:"flex", height:"100%", gap:2}}>
        <Box className="dashboard">
            <Dashboard/>

        </Box>
        <Box className="notification-container">
            <Typography>
                This is notification!!
            </Typography>
        </Box>

    </Container>

    </ThemeProvider>

  )
}

export default Notification
