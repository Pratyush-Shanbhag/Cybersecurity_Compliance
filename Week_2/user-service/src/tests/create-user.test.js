const { hello } = require('../functions/hello.js');

const AWS = require('aws-sdk-mock')
const AWS_SDK = require('aws-sdk')
AWS.setSDKInstance(AWS_SDK)

describe('hello function', () => {
    it('should return a 200 status code and a welcome message', async () => {
        const event = {}; // Mock event object
        const result = await hello(event);
        
        expect(result.statusCode).toBe(200);

        const body = JSON.parse(result.body);
        expect(body.message).toBe('Hello, Serverless!');
        expect(body).toHaveProperty('input');
        expect(body.input).toEqual(event);
    });
});
