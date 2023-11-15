"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AWS = require("aws-sdk");
var fs = require("fs");
// Initialize DynamoDB client
var dynamoDb = new AWS.DynamoDB({
    region: 'us-east-1' // Your AWS region (change this if needed)
});
var tableName = 'TripAdvisorData';
// Table creation parameters
var createTableParams = {
    TableName: tableName,
    KeySchema: [
        { AttributeName: 'name', KeyType: 'HASH' },
        { AttributeName: 'airportCode', KeyType: 'RANGE' },
    ],
    AttributeDefinitions: [
        { AttributeName: 'name', AttributeType: 'S' },
        { AttributeName: 'airportCode', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};
// Read the JSON file
var rawData = fs.readFileSync('trip_advisor.json', 'utf-8');
var tripAdvisorData = JSON.parse(rawData).data;
// Function to insert data, including children
var insertData = function (data, callback) {
    var putItemParams = {
        TableName: tableName,
        Item: data
    };
    var docClient = new AWS.DynamoDB.DocumentClient({
        region: 'us-east-1' // Your AWS region (change this if needed)
    });
    docClient.put(putItemParams, callback);
};
// Create table, check status, and insert data
dynamoDb.createTable(createTableParams, function (err, data) {
    if (err && !err.message.includes("already exists")) {
        console.error('Error creating table:', JSON.stringify(err, null, 2));
        return;
    }
    // Wait for table to be ACTIVE and then insert data
    var waitForActive = function () {
        dynamoDb.describeTable({ TableName: tableName }, function (descErr, descData) {
            if (descErr) {
                console.error('Error describing table:', JSON.stringify(descErr, null, 2));
            }
            else if (descData.Table && descData.Table.TableStatus === 'ACTIVE') {
                // Insert main entries and their children
                tripAdvisorData.forEach(function (airport) {
                    insertData(airport, function (putErr, putData) {
                        if (putErr) {
                            console.error("Error inserting main data for ".concat(airport.name, ":"), JSON.stringify(putErr, null, 2));
                        }
                        else {
                            console.log("Data inserted for ".concat(airport.name, "."));
                            if (airport.children) {
                                airport.children.forEach(function (childAirport) {
                                    insertData(childAirport, function (childPutErr, childPutData) {
                                        if (childPutErr) {
                                            console.error("Error inserting child data for ".concat(childAirport.name, ":"), JSON.stringify(childPutErr, null, 2));
                                        }
                                        else {
                                            console.log("Child data inserted for ".concat(childAirport.name, "."));
                                        }
                                    });
                                });
                            }
                        }
                    });
                });
            }
            else {
                setTimeout(waitForActive, 5000); // Check every 5 seconds
            }
        });
    };
    waitForActive();
});
