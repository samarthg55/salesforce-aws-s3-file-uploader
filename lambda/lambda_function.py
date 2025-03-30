import json
import boto3
import os
import uuid

s3 = boto3.client('s3')

def lambda_handler(event, context):
    params = event.get('queryStringParameters') or {}
    file_name = params.get('filename', 'upload')
    file_type = params.get('filetype', 'application/octet-stream')
    bucket = os.environ['BUCKET_NAME']

    object_key = f"{uuid.uuid4()}_{file_name}"
    url = s3.generate_presigned_url(
        'put_object',
        Params={'Bucket': bucket, 'Key': object_key, 'ContentType': file_type},
        ExpiresIn=3600
    )

    return {
        'statusCode': 200,
        'headers': { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        'body': json.dumps({ 'uploadURL': url, 'key': object_key })
    }
