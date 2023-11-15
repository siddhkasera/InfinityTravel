import * as AWS from 'aws-sdk';
import * as fs from 'fs';

// Initialize DynamoDB client
const dynamoDb = new AWS.DynamoDB({
    region: 'us-east-1'  // Your AWS region (change this if needed)
});
const docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1'  // Your AWS region
});
const tableName = 'AirbnbData';

// Table creation parameters
const createTableParams: AWS.DynamoDB.CreateTableInput = {
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
const rawData = fs.readFileSync('air_bnb.json', 'utf-8');
const airbnbData = JSON.parse(rawData)['data'];
// Function to check table status
const checkTableStatus = (callback: (err?: any) => void) => {
    dynamoDb.describeTable({ TableName: tableName }, (err, data) => {
        if (err) {
            callback(err);
        } else if (data.Table && data.Table.TableStatus === 'ACTIVE') {
            callback();
        } else {
            setTimeout(() => checkTableStatus(callback), 5000); // Poll every 5 seconds
        }
    });
};

// Function to insert data
const insertData = (data: any, callback: (err?: any, result?: any) => void) => {
    const putItemParams: AWS.DynamoDB.DocumentClient.PutItemInput = {
        TableName: tableName,
        Item: data
    };
    docClient.put(putItemParams, callback);
};

// Create table and insert data
dynamoDb.createTable(createTableParams, (err, data) => {
    if (err && !err.message.includes("already exists")) {
        console.error('Error creating table:', JSON.stringify(err, null, 2));
    } else {
        console.log('Table creation initiated.');
        
        // Poll for table status and insert data once table is ACTIVE
        checkTableStatus((statusErr) => {
            if (statusErr) {
                console.error('Error waiting for table to be ACTIVE:', JSON.stringify(statusErr, null, 2));
            } else {
                console.log('Table is now ACTIVE.');

                // Insert each data point from the JSON file
                airbnbData.forEach((entry: any, index: number) => {
                    insertData(entry, (putErr, putData) => {
                        if (putErr) {
                            console.error(`Error inserting data for index ${index}:`, JSON.stringify(putErr, null, 2));
                        } else {
                            console.log(`Data inserted for index ${index}:`, JSON.stringify(putData, null, 2));
                        }
                    });
                });
            }
        });
    }
});
