from flask import Flask, render_template, request, redirect, url_for
import boto3

import db_functions

app = Flask(__name__)

# AWS S3 configuration
AWS_ACCESS_KEY = 'AKIA3FLD6H2OHWWUPEXW'
AWS_SECRET_KEY = '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'
AWS_REGION = 'us-east-1'
S3_BUCKETS = {
    'low': 'low-flask-user-form-app',
    'medium': 'medium-flask-user-form-app',
    'high': 'high-flask-user-form-app'
}

s3_client = boto3.client('s3', 
                         aws_access_key_id=AWS_ACCESS_KEY, 
                         aws_secret_access_key=AWS_SECRET_KEY,
                         region_name=AWS_REGION)

dynamodb = boto3.client('dynamodb',
                         aws_access_key_id=AWS_ACCESS_KEY, 
                         aws_secret_access_key=AWS_SECRET_KEY,
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
    return render_template('app.html')

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
    name = request.form.get(key='name', default='User')
    email = request.form.get(key='email', default='user@gmail.com')
    age = request.form.get('age')
    if age:
        user_text = f'Hello {name} (email: {email}, age: {age}). Here is some generated text based on your experience level.'
    else:
        user_text = f'Hello {name} (email: {email}). Here is some generated text based on your experience level.'

    experience = request.form.get('experience')
    bucket_name = S3_BUCKETS.get(experience)
    s3_text = get_from_s3(bucket_name)
    

    #write_to_dynamo_db()


    if experience == 'low':
        video_url = 'https://www.youtube.com/embed/_DVVNOGYtmU?si=qgTQMQsZ-klEqmUe'
    elif experience == 'medium':
        video_url = 'https://www.youtube.com/embed/34BtwcL7Mkg?si=zd_22KrygAoMsOqN'
    elif experience == 'high':
        video_url = 'https://www.youtube.com/embed/NIRXtMg-0z8?si=lla0wY4e8090dpo5'
    
    return render_template('result.html', user_text=user_text, s3_text=s3_text, video_url=video_url)




if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5001')



