import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import '../cssfiles/Support.css';
import Container from '@mui/material/Container';
import Dashboard from "./Dashboard";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';



const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left'
}));
const defaultTheme = createTheme();

export default class Support extends React.Component {
  render() {
    return (
      <ThemeProvider theme={defaultTheme}>

      <Container maxWidth={false} className="main-container" sx={{display:"flex", height:"100%", gap:2}}>
          <Box className="dashboard-box">
              <Dashboard/>
          </Box>
      <Box className="center-container" sx={{border:1, width:500}}>
        <Card className="card-style">
          <CardContent>
            <Typography variant="h6" gutterBottom component="div">
              Contact Support
            </Typography>
            <Item>Abhimanyu Bhagwati<br />abhimanyu@vt.edu</Item>
            <Item>Amr Aboelnaga<br />amraboelnaga@vt.edu</Item>
            <Item>George Abdel Messih<br />george98@vt.edu</Item>
            <Item>Robin Lu<br />robinlu@vt.edu</Item>
            <Item>Siddhi Kasera<br />siddhikasera@vt.edu</Item>
            <Item>Sudipa Shrestha<br />sudipa54@vt.edu</Item>
            <Item>Joanna Fang<br />joannafg@vt.edu</Item>
          </CardContent>
        </Card>
      </Box>
     </Container>
     </ThemeProvider>

    );
  }
}


