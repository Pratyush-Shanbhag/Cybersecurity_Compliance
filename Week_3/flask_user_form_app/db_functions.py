import boto3

AWS_ACCESS_KEY = 'AKIA3FLD6H2OHWWUPEXW'
AWS_SECRET_KEY = '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'
AWS_REGION = 'us-east-1'

dynamodb = boto3.client('dynamodb',
                         aws_access_key_id=AWS_ACCESS_KEY, 
                         aws_secret_access_key=AWS_SECRET_KEY,
                         region_name=AWS_REGION)

table_name = 'flask-user-form-app'

def is_email_unique(email):
    try:
        response = dynamodb.query(
            TableName=table_name,
            IndexName='EmailIndex',
            KeyConditionExpression='email = :email',
            ExpressionAttributeValues={
                ':email': {'S': email}
            }
        )
        return len(response.get('Items', [])) == 0
    except Exception as e:
        print(f"Error checking email uniqueness: {e}")
        return False

def put_item(username, name, email, password):
    if not is_email_unique(email):
        print("Email already exists.")
        return

    try:
        response = dynamodb.put_item(
            TableName=table_name,
            Item={
                'username': {'S': username},
                'name': {'S': name},
                'email': {'S': email},
                'password': {'S': password}
            },
            ConditionExpression='attribute_not_exists(username)'
        )
        print("Item inserted successfully.")
    except Exception as e:
        print(f"Error inserting item: {e}")

def query_by_email(email):
    try:
        response = dynamodb.query(
            TableName=table_name,
            IndexName='email-index',
            KeyConditionExpression='email = :email',
            ExpressionAttributeValues={
                ':email': {'S': email}
            }
        )
        items = response.get('Items', [])
        return items
    except Exception as e:
        print(f"Error querying items: {e}")
        return []

def query_by_username(username):
    try:
        response = dynamodb.get_item(
            TableName=table_name,
            Key={
                'username': {'S': username}
            }
        )
        item = response.get('Item', None)
        return item
    except Exception as e:
        print(f"Error querying item: {e}")
        return None

def update_item(username, name, email, password):
    try:
        response = dynamodb.update_item(
            TableName=table_name,
            Key={
                'username': {'S': username}
            },
            UpdateExpression='SET name = :name, email = :email, password = :password',
            ExpressionAttributeValues={
                ':name': {'S': name},
                ':email': {'S': email},
                ':password': {'S': password}
            }
        )
        print("Item updated successfully.")
    except Exception as e:
        print(f"Error updating item: {e}")