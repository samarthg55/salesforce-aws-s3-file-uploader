public with sharing class S3SignedUrlService {
    public class S3Response {
        @AuraEnabled public String uploadURL { get; set; }
        @AuraEnabled public String key { get; set; }
    }

    @AuraEnabled(cacheable=false)
    public static S3Response getSignedUrl(String filename, String filetype) {
        HttpRequest req = new HttpRequest();
        String endpoint = 'https://<your-api-id>.execute-api.us-east-1.amazonaws.com/get-signed-url';

        req.setEndpoint(endpoint + '?filename=' + EncodingUtil.urlEncode(filename, 'UTF-8') + '&filetype=' + EncodingUtil.urlEncode(filetype, 'UTF-8'));
        req.setMethod('GET');
        req.setHeader('Content-Type', 'application/json');

        Http http = new Http();
        HttpResponse res = http.send(req);

        if (res.getStatusCode() == 200) {
            return (S3Response) JSON.deserialize(res.getBody(), S3Response.class);
        } else {
            throw new AuraHandledException('Failed to get signed URL. Status: ' + res.getStatus());
        }
    }
}
