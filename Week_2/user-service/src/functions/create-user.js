'use strict';

const AWS = require('aws-sdk')

module.exports.createUser = async (event, context) => {
    const body = JSON.parse(event.body)
    const username = body.username
    const password = body.password
    const newUserParams = {
        TableName: process.env.DYNAMODB_USER_TABLE,
        Item: {
            pk: username,
            password: password
        }
    }
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient()
        const putResult = await dynamodb.put(newUserParams).promise()

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Function executed successfully',
                input: event,
            }),
        }
    } catch (putError) {
        console.log
    }

    
};