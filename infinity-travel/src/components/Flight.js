import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Flight = ({ itinerary, pricingOptions }) => {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6">Flight Itinerary: {itinerary}</Typography>
                {pricingOptions.map((option, index) => (
                    <Typography key={index}>
                        Price: {option.price.amount} {option.price.unit}
                    </Typography>
                ))}
            </CardContent>
        </Card>
    );
};

export default Flight;
