# salesforce-aws-s3-file-uploader
Secure file upload from Salesforce to AWS S3 using Lambda &amp; pre-signed URLs


# Salesforce to AWS S3 File Uploader

This project demonstrates a full-stack integration between **Salesforce** and **Amazon S3**, enabling secure file uploads from a **Lightning Web Component (LWC)** directly into an S3 bucket using **pre-signed URLs** generated by **AWS Lambda**.

---

## Architecture
Salesforce LWC → Apex → API Gateway → Lambda → Pre-Signed S3 URL → File Upload



-  Files are uploaded directly from the browser to S3 (no intermediate storage in Salesforce)
-  Lambda signs the upload URL with content-type and expiry
-  No AWS credentials are exposed

---

## Tech Stack

| Platform     | Technology                           |
|--------------|---------------------------------------|
| Salesforce   | Apex, Lightning Web Components (LWC) |
| AWS          | S3, Lambda (Python), API Gateway, IAM|
| Frontend     | HTML, JavaScript (fetch API)         |

---

## Why Pre-Signed URLs?

Pre-signed URLs allow temporary, secure, and permissioned access to a specific S3 resource. This pattern allows Salesforce users to upload directly to S3 **without exposing AWS credentials or routing through Salesforce servers.**

---
---

## Key Benefits

-  Learn cross-cloud integration
-  Save Salesforce storage costs
-  Improve UX with real-time uploads
-  Keep data secure and scalable

---

##  Resources

- [`aws-setup.md`](aws-setup.md): Full AWS configuration
- [`SF_to_AWS_S3_Project_Execution_Guide.pdf`](SF_to_AWS_S3_Project_Execution_Guide.pdf): Visual guide
- [Salesforce Dev Docs](https://developer.salesforce.com/)
- [AWS S3 + Lambda Docs](https://docs.aws.amazon.com/)

---

## Author
**Samarth Gupta**  
