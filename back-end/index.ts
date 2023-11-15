import * as AWS from 'aws-sdk';
import * as fs from 'fs';

// Initialize DynamoDB client
const dynamoDb = new AWS.DynamoDB({
    region: 'us-east-1'  // Your AWS region (change this if needed)
});
const docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1'  // Your AWS region
});

const tableName = 'FlightsData';

// Table creation parameters
const createTableParams: AWS.DynamoDB.CreateTableInput = {
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
const createTable = (callback: (err?: any, data?: any) => void) => {
    dynamoDb.createTable(createTableParams, callback);
};

// Read the JSON file
const rawData = fs.readFileSync('flights.json', 'utf-8');
const flightsData = JSON.parse(rawData);

// Function to insert data
const insertData = (data: any, callback: (err?: any, result?: any) => void) => {
    const putItemParams: AWS.DynamoDB.DocumentClient.PutItemInput = {
        TableName: tableName,
        Item: data
    };
    docClient.put(putItemParams, callback);
};

// Main Execution
createTable((err, data) => {

        // Insert each data point from the JSON file
        flightsData.forEach((flightData: any, index: number) => {
            insertData(flightData, (putErr, putData) => {
                if (putErr) {
                    console.error(`Error inserting data for index ${index}:`, JSON.stringify(putErr, null, 2));
                } else {
                    console.log(`Data inserted for index ${index}:`, JSON.stringify(putData, null, 2));
                }
            });
        });
    
});
