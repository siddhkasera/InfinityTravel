import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Dashboard from "./Dashboard";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import FlightsList from "./FlightList";

function Search() {
  const fetchFlights = async (dep, arr, year, month, day) => {
    const url =
      "https://partners.api.skyscanner.net/apiservices/v3/flights/live/search/create";

    const headers = {
      "x-api-key": "sh428739766321522266746152871799", // Replace with your actual API key
    };

    // "LHR"
    // "SIN"
    // 2023
    // 12
    // 22

    const data = {
      query: {
        market: "UK",
        locale: "en-GB",
        currency: "GBP",
        query_legs: [
          {
            origin_place_id: { iata: dep }, // Replace with your origin airport IATA code
            destination_place_id: { iata: arr }, // Replace with your destination airport IATA code
            date: { year: year, month: month, day: day }, // Replace with your desired travel date
          },
        ],
        adults: 1,
        cabin_class: "CABIN_CLASS_ECONOMY",
      },
    };

    axios
      .post("http://localhost:3001/search-flights", data)
      .then((response) => {
        console.log("Response:", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const [data, setData] = React.useState({});

  const defaultTheme = createTheme();

  const initialValues = {
    departure: "",
    destination: "",
    departureDate: dayjs(Date.now()),
    destinationDate: dayjs(Date.now()),
    numberoftravellers: "",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   departure: data.get("departure"),
    //   destination: data.get("destination"),
    //   departureDate: data.get("departureDate"),
    //   destinationDate: data.get("destinationDate"),
    //   numberoftravellers: data.get("numberoftravellers"),
    // });
    console.log("debug222");
    // fetchFlights();
  };

  const submitForm = async (values) => {
    console.log(values.departureDate.$y);
    console.log(values.departureDate.$M + 1);
    console.log(values.departureDate.$D);
    console.log("debug111");
    fetchFlights(
      values.departure,
      values.destination,
      values.departureDate.$y,
      values.departureDate.$M + 1,
      values.departureDate.$D
    );
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={submitForm}>
        {(formik) => {
          const {
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            handleBlur,
          } = formik;

          return (
            <ThemeProvider theme={defaultTheme}>
              <Container
                maxWidth={false}
                component="main"
                sx={{ display: "flex" }}
              >
                <Box className="dashboard" sx={{ width: "27%", ml: -3 }}>
                  <Dashboard />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    border: 3,
                    m: 20,
                    p: 12,
                    height: "100%",
                  }}
                >
                  <Typography component="h1" variant="h5">
                    {" "}
                    Hi! Where are you going?{" "}
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1, display: "flex", flexDirection: "column" }}
                  >
                    <Box
                      className="first-text"
                      sx={{ display: "flex", gap: 5 }}
                    >
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        helperText="LHR"
                        id="departure"
                        label="Departure"
                        name="departure"
                        value={values.departure}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      ></TextField>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        helperText="SIN"
                        id="destination"
                        label="Destination"
                        name="destination"
                        value={values.destination}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{}}
                      ></TextField>
                    </Box>
                    <Box className="dates" sx={{ display: "flex", gap: 5 }}>
                      <LocalizationProvider
                        item
                        xs={12}
                        dateAdapter={AdapterDayjs}
                      >
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            label="Departure Date"
                            required
                            fullWidth
                            id="departureDate"
                            name="departureDate"
                            value={values.departureDate}
                            onChange={(val) => (values.departureDate = val)}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      <LocalizationProvider
                        item
                        xs={12}
                        dateAdapter={AdapterDayjs}
                      >
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            label="Arrival Date"
                            required
                            fullWidth
                            id="destinationDate"
                            name="destinationDate"
                            value={values.destinationDate}
                            onChange={(val) => (values.destinationDate = val)}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      {/* <TextField
                margin="normal"
                required
                fullWidth
                id="date"
                label="Date"
                name="date"
                sx={{
                  marginBottom: "2px",
                }}
              ></TextField> */}
                      {/* <TextField
                margin="normal"
                required
                fullWidth
                id="Date"
                label="Date"
                name="date"
              ></TextField> */}
                    </Box>
                    <Box className="numberoftravellers">
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="numberoftravellers"
                        label="Number of Travellers"
                        name="numberoftravellers"
                        value={values.numberoftravellers}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      ></TextField>
                    </Box>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, backgroundColor: "#925FE2" }}
                    >
                      Search
                    </Button>
                    {data && (
                      <div>
                        <FlightsList flightsData={data} />
                      </div>
                    )}
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
          );
        }}
      </Formik>
    </>
  );
}

export default Search;
