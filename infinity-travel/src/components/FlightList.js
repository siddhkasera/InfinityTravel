import React from 'react';
import Flight from './Flight';

const FlightsList = ({ flightsData }) => {
    return (
        <div>
         {flightsData && flightsData.content && flightsData.content.results && flightsData.content.results.itineraries &&
    Object.entries(flightsData.content.results.itineraries).map(([itinerary, data]) => (
        <Flight key={itinerary} itinerary={itinerary} pricingOptions={data.pricingOptions} />
    ))
}
        </div>
    );
};

export default FlightsList;
