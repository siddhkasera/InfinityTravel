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
var tableName = 'AirbnbData';
// Table creation parameters
var createTableParams = {
    TableName: tableName,
    KeySchema: [
        { AttributeName: 'id', KeyType: 'HASH' },
    ],
    AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};
// Read the JSON file
var rawData = fs.readFileSync('air_bnb.json', 'utf-8');
var airbnbData = JSON.parse(rawData)['data'];
// Function to check table status
var checkTableStatus = function (callback) {
    dynamoDb.describeTable({ TableName: tableName }, function (err, data) {
        if (err) {
            callback(err);
        }
        else if (data.Table && data.Table.TableStatus === 'ACTIVE') {
            callback();
        }
        else {
            setTimeout(function () { return checkTableStatus(callback); }, 5000); // Poll every 5 seconds
        }
    });
};
// Function to insert data
var insertData = function (data, callback) {
    var putItemParams = {
        TableName: tableName,
        Item: data
    };
    docClient.put(putItemParams, callback);
};
// Create table and insert data
dynamoDb.createTable(createTableParams, function (err, data) {
    if (err && !err.message.includes("already exists")) {
        console.error('Error creating table:', JSON.stringify(err, null, 2));
    }
    else {
        console.log('Table creation initiated.');
        // Poll for table status and insert data once table is ACTIVE
        checkTableStatus(function (statusErr) {
            if (statusErr) {
                console.error('Error waiting for table to be ACTIVE:', JSON.stringify(statusErr, null, 2));
            }
            else {
                console.log('Table is now ACTIVE.');
                // Insert each data point from the JSON file
                airbnbData.forEach(function (entry, index) {
                    insertData(entry, function (putErr, putData) {
                        if (putErr) {
                            console.error("Error inserting data for index ".concat(index, ":"), JSON.stringify(putErr, null, 2));
                        }
                        else {
                            console.log("Data inserted for index ".concat(index, ":"), JSON.stringify(putData, null, 2));
                        }
                    });
                });
            }
        });
    }
});
