import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import '../cssfiles/Support.css';

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left'
}));

export default class Support extends React.Component {
  render() {
    return (
      <Box className="center-container">
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
    );
  }
}


