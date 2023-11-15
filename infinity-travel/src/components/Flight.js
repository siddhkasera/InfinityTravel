import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const Flight = ({ itinerary, pricingOptions }) => {
  return (
    <div>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6">Flight Itinerary: {itinerary}</Typography>
          {pricingOptions.map((option, index) => (
            <Typography key={index}>
              Price: ${parseInt(option.price.amount) / 1000}
            </Typography>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Flight;
