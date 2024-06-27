import boto3

access_key = ''
s_key = ''
AWS_REGION = 'us-east-1'

dynamodb = boto3.client('dynamodb',
                         aws_access_key_id=access_key, 
                         aws_secret_access_key=s_key,
                         region_name=AWS_REGION)

def create_table():
    try:
        response = dynamodb.create_table(
            TableName='flask-user-form-app',
            KeySchema=[
                {
                    'AttributeName': 'username',
                    'KeyType': 'HASH'  # Partition key
                }
            ],
            AttributeDefinitions=[
                {
                    'AttributeName': 'username',
                    'AttributeType': 'S'
                },
                {
                    'AttributeName': 'email',
                    'AttributeType': 'S'
                }
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5
            },
            GlobalSecondaryIndexes=[
                {
                    'IndexName': 'email-index',
                    'KeySchema': [
                        {
                            'AttributeName': 'email',
                            'KeyType': 'HASH'  # Partition key
                        }
                    ],
                    'Projection': {
                        'ProjectionType': 'ALL'
                    },
                    'ProvisionedThroughput': {
                        'ReadCapacityUnits': 5,
                        'WriteCapacityUnits': 5
                    }
                }
            ]
        )
        print("Table created successfully.")
    except Exception as e:
        print(f"Error creating table: {e}")

create_table()
