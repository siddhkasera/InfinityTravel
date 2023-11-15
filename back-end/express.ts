import express = require('express');
import bodyParser = require('body-parser');
import * as AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1'  // Your AWS region (change this if needed)
});

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get('/flights', (req, res) => {
    const params = {
        TableName: 'FlightsData',
    };
    dynamoDb.scan(params, (err, data) => {
        if (err) res.status(500).send(err);
        else res.status(200).send(data.Items);
    });
});
// CREATE a new flight entry
app.post('/flight', (req, res) => {
    const params = {
        TableName: 'FlightsData',
        Item: req.body
    };
    dynamoDb.put(params, (err, data) => {
        if (err) res.status(500).send(err);
        else res.status(200).send(data);
    });
});
// READ a flight entry by its 'flight' key
app.get('/flight/:flight', (req, res) => {
    const params = {
        TableName: 'FlightsData',
        Key: {
            flight: req.params.flight
        }
    };
    dynamoDb.get(params, (err, data) => {
        if (err) res.status(500).send(err);
        else res.status(200).send(data.Item);
    });
});
app.delete('/flight/:flight', (req, res) => {
    const params = {
        TableName: 'FlightsData',
        Key: {
            flight: req.params.flight
        }
    };
    dynamoDb.delete(params, (err, data) => {
        if (err) res.status(500).send(err);
        else res.status(200).send({ message: 'Deleted successfully.' });
    });
});


app.get('/tripadvisor', (req, res) => {
    const params = {
        TableName: 'TripAdvisorData',
    };
    dynamoDb.scan(params, (err, data) => {
        if (err) res.status(500).send(err);
        else res.status(200).send(data.Items);
    });
});
// CREATE a new TripAdvisor entry
app.post('/tripadvisor', (req, res) => {
    const params = {
        TableName: 'TripAdvisorData',
        Item: req.body
    };
    dynamoDb.put(params, (err, data) => {
        if (err) res.status(500).send(err);
        else res.status(200).send(data);
    });
});
// READ a TripAdvisor entry by its 'name' key
app.get('/tripadvisor/:name', (req, res) => {
    const params = {
        TableName: 'TripAdvisorData',
        Key: {
            name: req.params.name
        }
    };
    dynamoDb.get(params, (err, data) => {
        if (err) res.status(500).send(err);
        else res.status(200).send(data.Item);
    });
});
app.delete('/tripadvisor/:name', (req, res) => {
    const params = {
        TableName: 'TripAdvisorData',
        Key: {
            name: req.params.name
        }
    };
    dynamoDb.delete(params, (err, data) => {
        if (err) res.status(500).send(err);
        else res.status(200).send({ message: 'Deleted successfully.' });
    });
});


app.get('/airbnb', (req, res) => {
    const params = {
        TableName: 'AirbnbData',
    };
    dynamoDb.scan(params, (err, data) => {
        if (err) res.status(500).send(err);
        else res.status(200).send(data.Items);
    });
});
// CREATE a new Airbnb entry
app.post('/airbnb', (req, res) => {
    const params = {
        TableName: 'AirbnbData',
        Item: req.body
    };
    dynamoDb.put(params, (err, data) => {
        if (err) res.status(500).send(err);
        else res.status(200).send(data);
    });
});
// READ an Airbnb entry by its 'id' key
app.get('/airbnb/:id', (req, res) => {
    const params = {
        TableName: 'AirbnbData',
        Key: {
            id: req.params.id
        }
    };
    dynamoDb.get(params, (err, data) => {
        if (err) res.status(500).send(err);
        else res.status(200).send(data.Item);
    });
});
app.delete('/airbnb/:id', (req, res) => {
    const params = {
        TableName: 'AirbnbData',
        Key: {
            id: req.params.id
        }
    };
    dynamoDb.delete(params, (err, data) => {
        if (err) res.status(500).send(err);
        else res.status(200).send({ message: 'Deleted successfully.' });
    });
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
