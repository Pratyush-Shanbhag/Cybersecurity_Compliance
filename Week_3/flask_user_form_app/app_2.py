from flask import Flask, render_template, request, redirect, url_for
import boto3

import db_functions

app = Flask(__name__)

# AWS S3 configuration
access_key = ''
s_key = ''
AWS_REGION = 'us-east-1'
S3_BUCKETS = {
    'low': 'low-flask-user-form-app',
    'medium': 'medium-flask-user-form-app',
    'high': 'high-flask-user-form-app'
}

s3_client = boto3.client('s3', 
                         aws_access_key_id=access_key, 
                         aws_secret_access_key=s_key,
                         region_name=AWS_REGION)

dynamodb = boto3.client('dynamodb',
                         aws_access_key_id=access_key, 
                         aws_secret_access_key=s_key,
                         region_name=AWS_REGION)

def get_from_s3(bucket_name):
    response = s3_client.list_objects_v2(Bucket=bucket_name)
    if 'Contents' in response:
        for obj in response['Contents']:
            key = obj['Key']
            text_obj = s3_client.get_object(Bucket=bucket_name, Key=key)
            text = text_obj['Body'].read().decode('utf-8')
            return text
    return "No text found in the bucket."

@app.route('/')
def index():
    return render_template('app_2.html')

'''
@app.route('/result', methods=['POST'])
def result():
    option = request.form.get('options')
    bucket_name = S3_BUCKETS.get(option)
    if bucket_name:
        s3_text = get_from_s3(bucket_name)
        return render_template('result.html', s3_text=s3_text)
    return "Invalid option selected."
'''

@app.route('/result', methods=['POST'])
def result():
    name = request.form.get(key='name')
    email = request.form.get(key='email')
    username = request.form.get(key='username')
    password = request.form.get(key='password')

    
    

    #write_to_dynamo_db()


    print(f'Hello {name}, {email}, {username}, {password}')
    
    return render_template('result_2.html', user_text=f'Hello {name}, {email}, {username}, {password}')




if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5001')



