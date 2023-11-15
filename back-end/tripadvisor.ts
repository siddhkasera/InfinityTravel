import * as AWS from 'aws-sdk';
import * as fs from 'fs';

// Initialize DynamoDB client
const dynamoDb = new AWS.DynamoDB({
    region: 'us-east-1'  // Your AWS region (change this if needed)
});

const tableName = 'TripAdvisorData';

// Table creation parameters
const createTableParams: AWS.DynamoDB.CreateTableInput = {
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
const rawData = fs.readFileSync('trip_advisor.json', 'utf-8');
const tripAdvisorData = JSON.parse(rawData).data;



// Function to insert data, including children
const insertData = (data: any, callback: (err?: any, result?: any) => void) => {
    const putItemParams: AWS.DynamoDB.DocumentClient.PutItemInput = {
        TableName: tableName,
        Item: data
    };
    const docClient = new AWS.DynamoDB.DocumentClient({
        region: 'us-east-1'  // Your AWS region (change this if needed)
    });
    docClient.put(putItemParams, callback);
};

// Create table, check status, and insert data
dynamoDb.createTable(createTableParams, (err, data) => {
    if (err && !err.message.includes("already exists")) {
        console.error('Error creating table:', JSON.stringify(err, null, 2));
        return;
    }

    // Wait for table to be ACTIVE and then insert data
    const waitForActive = () => {
        dynamoDb.describeTable({ TableName: tableName }, (descErr, descData) => {
            if (descErr) {
                console.error('Error describing table:', JSON.stringify(descErr, null, 2));
            } else if (descData.Table && descData.Table.TableStatus === 'ACTIVE') {
                // Insert main entries and their children
                tripAdvisorData.forEach((airport: any) => {
                    insertData(airport, (putErr, putData) => {
                        if (putErr) {
                            console.error(`Error inserting main data for ${airport.name}:`, JSON.stringify(putErr, null, 2));
                        } else {
                            console.log(`Data inserted for ${airport.name}.`);
                            
                            if (airport.children) {
                                airport.children.forEach((childAirport: any) => {
                                    insertData(childAirport, (childPutErr, childPutData) => {
                                        if (childPutErr) {
                                            console.error(`Error inserting child data for ${childAirport.name}:`, JSON.stringify(childPutErr, null, 2));
                                        } else {
                                            console.log(`Child data inserted for ${childAirport.name}.`);
                                        }
                                    });
                                });
                            }
                        }
                    });
                });
            } else {
                setTimeout(waitForActive, 5000);  // Check every 5 seconds
            }
        });
    };

    waitForActive();
});
