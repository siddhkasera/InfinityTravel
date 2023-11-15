import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

class FlightSearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      departure: "Blacksburg, VA, USA",
      destination: "New York, NY, USA",
      date: new Date(new Date() - Math.random() * 1e12),
      flights: [
        {
          airline: "Delta",
          depTime: new Date(new Date() - Math.random() * 1e12),
          arrTime: new Date(new Date() - Math.random() * 1e12),
          numOfStops: 7,
          price: Math.floor(Math.random() * 800),
          depAirport: "ROA",
          arrAirport: "LGA",
        },
        {
          airline: "United",
          depTime: new Date(new Date() - Math.random() * 1e12),
          arrTime: new Date(new Date() - Math.random() * 1e12),
          numOfStops: 7,
          price: Math.floor(Math.random() * 800),
          depAirport: "ROA",
          arrAirport: "LGA",
        },
        {
          airline: "Spirit",
          depTime: new Date(new Date() - Math.random() * 1e12),
          arrTime: new Date(new Date() - Math.random() * 1e12),
          numOfStops: 7,
          price: Math.floor(Math.random() * 800),
          depAirport: "ROA",
          arrAirport: "LGA",
        },
        {
          airline: "Frontier",
          depTime: new Date(new Date() - Math.random() * 1e12),
          arrTime: new Date(new Date() - Math.random() * 1e12),
          numOfStops: 7,
          price: Math.floor(Math.random() * 800),
          depAirport: "ROA",
          arrAirport: "LGA",
        },
      ],
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

  printTime = (date) => {
    return (
      (date.getHours() < 10 ? "0" : "") +
      date.getHours() +
      ":" +
      (date.getMinutes() < 10 ? "0" : "") +
      date.getMinutes()
    );
  };

  render() {
    const { data } = this.state;

    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Card
          sx={{
            minWidth: 275,
            color: `white`,
          }}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Departure"
                  id="outlined-size-small"
                  defaultValue={this.state.departure}
                  size="small"
                  disabled={true}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Destination"
                  id="outlined-size-small"
                  defaultValue={this.state.destination}
                  size="small"
                  disabled={true}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Date"
                  id="outlined-size-small"
                  defaultValue={this.state.date.toDateString()}
                  size="small"
                  disabled={true}
                />
              </Grid>

              {this.state.flights.map((flight) => (
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography
                        style={{ display: "inline-block" }}
                        variant="body2"
                      >
                        {flight.airline}&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {this.printTime(flight.depTime)}-{">"}
                        {this.printTime(flight.arrTime)}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {flight.depAirport}-{">"}
                        {flight.arrAirport}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {flight.numOfStops}&nbsp;stop(s)
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $
                        {flight.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default FlightSearchResult;
