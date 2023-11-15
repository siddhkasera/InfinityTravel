"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var AWS = require("aws-sdk");
var dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1' // Your AWS region (change this if needed)
});
var app = express();
app.use(bodyParser.json());
const cors = require('cors');
// Enable CORS for requests from your frontend origin
app.use(cors({
    origin: 'http://localhost:3000' // Replace with your frontend origin
}));
app.get('/flights', function (req, res) {
    var params = {
        TableName: 'FlightsData',
    };
    dynamoDb.scan(params, function (err, data) {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(data.Items);
    });
});
// CREATE a new flight entry
app.post('/flight', function (req, res) {
    var params = {
        TableName: 'FlightsData',
        Item: req.body
    };
    dynamoDb.put(params, function (err, data) {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(data);
    });
});
// READ a flight entry by its 'flight' key
app.get('/flight/:flight', function (req, res) {
    var params = {
        TableName: 'FlightsData',
        Key: {
            flight: req.params.flight
        }
    };
    dynamoDb.get(params, function (err, data) {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(data.Item);
    });
});
app.delete('/flight/:flight', function (req, res) {
    var params = {
        TableName: 'FlightsData',
        Key: {
            flight: req.params.flight
        }
    };
    dynamoDb.delete(params, function (err, data) {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send({ message: 'Deleted successfully.' });
    });
});
app.get('/tripadvisor', function (req, res) {
    var params = {
        TableName: 'TripAdvisorData',
    };
    dynamoDb.scan(params, function (err, data) {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(data.Items);
    });
});
// CREATE a new TripAdvisor entry
app.post('/tripadvisor', function (req, res) {
    var params = {
        TableName: 'TripAdvisorData',
        Item: req.body
    };
    dynamoDb.put(params, function (err, data) {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(data);
    });
});
// READ a TripAdvisor entry by its 'name' key
app.get('/tripadvisor/:name', function (req, res) {
    var params = {
        TableName: 'TripAdvisorData',
        Key: {
            name: req.params.name
        }
    };
    dynamoDb.get(params, function (err, data) {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(data.Item);
    });
});
app.delete('/tripadvisor/:name', function (req, res) {
    var params = {
        TableName: 'TripAdvisorData',
        Key: {
            name: req.params.name
        }
    };
    dynamoDb.delete(params, function (err, data) {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send({ message: 'Deleted successfully.' });
    });
});
app.get('/airbnb', function (req, res) {
    var params = {
        TableName: 'AirbnbData',
    };
    dynamoDb.scan(params, function (err, data) {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(data.Items);
    });
});
// CREATE a new Airbnb entry
app.post('/airbnb', function (req, res) {
    var params = {
        TableName: 'AirbnbData',
        Item: req.body
    };
    dynamoDb.put(params, function (err, data) {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(data);
    });
});
// READ an Airbnb entry by its 'id' key
app.get('/airbnb/:id', function (req, res) {
    var params = {
        TableName: 'AirbnbData',
        Key: {
            id: req.params.id
        }
    };
    dynamoDb.get(params, function (err, data) {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(data.Item);
    });
});
app.delete('/airbnb/:id', function (req, res) {
    var params = {
        TableName: 'AirbnbData',
        Key: {
            id: req.params.id
        }
    };
    dynamoDb.delete(params, function (err, data) {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send({ message: 'Deleted successfully.' });
    });
});
const axios = require('axios');


const PORT = 3001;

// Skyscanner API endpoint and key
const SKYSCANNER_API_URL = 'https://partners.api.skyscanner.net/apiservices/v3/flights/live/search/create';
const SKYSCANNER_API_KEY = 'sh428739766321522266746152871799'; // Replace with your API key
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// Route to handle flight search
app.post('/search-flights', async (req, res) => {
    var data={}
    while (true){
        console.log("trying")
        try {
            const response = await axios.post(SKYSCANNER_API_URL, req.body, {
                headers: { 'x-api-key': SKYSCANNER_API_KEY }
            });
            data=response.data
            console.log(data)
            res.json(response.data);
            break;
        } catch (error) {
            console.log(error.message)
            console.log("retrying")

        }
        await sleep(500)
    }
    
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


