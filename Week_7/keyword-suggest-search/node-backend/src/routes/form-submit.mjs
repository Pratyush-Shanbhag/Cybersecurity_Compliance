import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({});

function formSubmitRoutes(fastify, options, done) {
    fastify.get('/keywords', async (request, reply) => {
        const { name, email, experience, age } = request.body;
      
        const params = {
        TableName: 'keyword-suggest-table',
            Item: {
                username: name,
                email: email,
            },
        };
      
        try {
            const data = await client.send(new ScanCommand(params));
            const keywords = data.Items.map(item => item.keyword.S);
            reply.send(keywords);
        } catch (error) {
            fastify.log.error(error);
            reply.status(500).send({ error: 'Error fetching data from DynamoDB' });
        }
    });

    //fastify.options('/surveyform', async (request, reply) => {});

    done()
}

export default formSubmitRoutes