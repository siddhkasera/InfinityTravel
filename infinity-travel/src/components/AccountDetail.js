import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from "@mui/material/Paper";
import Container from '@mui/material/Container';
import Dashboard from "./Dashboard";


const defaultTheme = createTheme();

class AccountDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      name: "John Doe",
      email: "JohnDoe@gmail.com",
      phone: "(123)456-9101",
      membershioNum: "345876",
    };
  }


  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch("https://api.example.com/data");
      const jsonData = await response.json();
      this.setState({ data: jsonData });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  render() {
    const { data } = this.state;

    return (
      // <div
      //   style={{
      //     position: "absolute",
      //     left: "50%",
      //     top: "50%",
      //     transform: "translate(-50%, -50%)",
      //   }}
      // >
      <ThemeProvider theme={defaultTheme}>
        <Container maxWidth={false} className="main-container" sx={{display:"flex", height:"100%", gap:2}}>
        <Box className="dashboard">
          <Dashboard/>
        </Box>
        <Box className="card-box">
        <Card
          sx={{
            minWidth: 275,
            backgroundColor: `#925FE2`,
            color: `white`,
            marginLeft:30,
            marginTop:30
          }}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" component="div">
                  Welcome back, John!
                </Typography>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                  Here is your account information!
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" style={{ fontWeight: 600 }}>
                  Name:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">{this.state.name}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" style={{ fontWeight: 600 }}>
                  Email:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">{this.state.email}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" style={{ fontWeight: 600 }}>
                  Phone:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">{this.state.phone}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" style={{ fontWeight: 600 }}>
                  #Membership:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">
                  {this.state.membershioNum}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        </Box>
        </Container>
        </ThemeProvider>
      // </div>
    );
  }
}

export default AccountDetail;
