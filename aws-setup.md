#AWS Setup Guide for Salesforce File Upload Integration

This guide explains how to configure AWS components required to upload files from Salesforce to S3 using a Lambda-generated pre-signed URL.

---

##S3 Bucket Setup

###Create a new S3 Bucket
- Name it something like `sf-upload-demo-yourname`
- Keep it **private**
- Enable CORS (see below)

###S3 CORS Configuration

Go to your bucket → **Permissions → CORS configuration** and paste this JSON:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
