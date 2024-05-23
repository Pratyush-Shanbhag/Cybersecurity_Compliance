'use strict';

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { PutCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({ region: process.env.AWS_REGION});


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
    await client.send(new PutCommand(newUserParams));

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Authorization'
      },
      body: JSON.stringify({ message: 'User created successfully' }),
    };
  } catch(putError) {
    console.log('There was an error putting the new item')
    console.log('putError', putError)
    console.log('newUserParams', newUserParams)
    return new Error('There was an error putting the new item')
  }


};