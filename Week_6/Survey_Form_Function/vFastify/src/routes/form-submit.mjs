import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

function formSubmitRoutes(fastify, options, done) {
    fastify.post('/surveyform', async (request, reply) => {
        const { name, email, experience, age } = request.body;
      
        const params = {
        TableName: 'survey-form-table',
            Item: {
                username: name,
                email: email,
            },
        };
      
        try {
          await ddbDocClient.send(new PutCommand(params));
          reply.send({ message: 'User registered successfully', user: { name, email, experience, age }});
        } catch (error) {
          fastify.log.error(error);
          reply.status(500).send({ error: 'Could not register user' });
        }
    });

    fastify.options('/surveyform', async (request, reply) => {});

    done()
}

export default formSubmitRoutes