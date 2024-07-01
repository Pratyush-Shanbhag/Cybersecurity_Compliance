
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient();
const ddbDocClient = DynamoDBDocumentClient.from(client);

function formSubmitRoutes(fastify, options, done) {
    fastify.get('/keywords', async (request, reply) => {      
        const params = {
            TableName: 'keyword-suggest-search-table',
            ProjectionExpression: '#k, #v',
            ExpressionAttributeNames: {
                '#k': 'keyword',
                '#v': 'value'
            }        
        };
      
        try {
            const response = await ddbDocClient.send(new ScanCommand(params));
            if (!response.Items) {
                reply.status(404).send({ error: 'No keywords found' });
                return;
            }

            const data = response.Items.map(item => ({
                keyword: item.keyword,
                value: item.value
            }));
            reply.send({ data });
        } catch (error) {
            fastify.log.error(error);
            reply.status(500).send({ error: 'Error fetching data from DynamoDB' });
        }
    });

    //fastify.options('/surveyform', async (request, reply) => {});

    done()
}

export default formSubmitRoutes