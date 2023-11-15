"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var AWS = require("aws-sdk");
var dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1' // Your AWS region (change this if needed)
});
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
var port = 3000;
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
app.listen(port, function () {
    console.log("Server is running at http://localhost:".concat(port));
});
