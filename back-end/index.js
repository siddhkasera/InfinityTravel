"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AWS = require("aws-sdk");
var fs = require("fs");
// Initialize DynamoDB client
var dynamoDb = new AWS.DynamoDB({
    region: 'us-east-1' // Your AWS region (change this if needed)
});
var docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1' // Your AWS region
});
var tableName = 'FlightsData';
// Table creation parameters
var createTableParams = {
    TableName: tableName,
    KeySchema: [
        { AttributeName: 'flight', KeyType: 'HASH' },
    ],
    AttributeDefinitions: [
        { AttributeName: 'flight', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};
// Function to create table
var createTable = function (callback) {
    dynamoDb.createTable(createTableParams, callback);
};
// Read the JSON file
var rawData = fs.readFileSync('flights.json', 'utf-8');
var flightsData = JSON.parse(rawData);
// Function to insert data
var insertData = function (data, callback) {
    var putItemParams = {
        TableName: tableName,
        Item: data
    };
    docClient.put(putItemParams, callback);
};
// Main Execution
createTable(function (err, data) {
    // Insert each data point from the JSON file
    flightsData.forEach(function (flightData, index) {
        insertData(flightData, function (putErr, putData) {
            if (putErr) {
                console.error("Error inserting data for index ".concat(index, ":"), JSON.stringify(putErr, null, 2));
            }
            else {
                console.log("Data inserted for index ".concat(index, ":"), JSON.stringify(putData, null, 2));
            }
        });
    });
});
