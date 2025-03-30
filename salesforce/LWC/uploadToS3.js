import { LightningElement } from 'lwc';
import getSignedUrl from '@salesforce/apex/S3SignedUrlService.getSignedUrl';

export default class UploadToS3 extends LightningElement {
    file = null;
    fileName = '';
    fileSize = '';
    message = '';
    uploading = false;

    handleFileChange(event) {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            this.file = selectedFile;
            this.fileName = selectedFile.name;
            this.fileSize = (selectedFile.size / 1024).toFixed(2);
            this.message = '';
        } else {
            this.file = null;
            this.fileName = '';
            this.fileSize = '';
        }
    }

    async handleUpload() {
        if (!this.file) {
            this.message = "❗ Please select a file before uploading.";
            return;
        }

        this.uploading = true;
        this.message = '⏳ Uploading...';

        try {
            const res = await getSignedUrl({
                filename: this.file.name,
                filetype: this.file.type
            });

            const uploadRes = await fetch(res.uploadURL, {
                method: "PUT",
                headers: {
                    "Content-Type": this.file.type
                },
                body: this.file
            });

            if (uploadRes.ok) {
                this.message = '✅ Upload successful!';
                this.resetForm();
            } else {
                this.message = '❌ Upload failed. Status: ' + uploadRes.status;
            }
        } catch (err) {
            console.error('Upload error:', err);
            this.message = '❌ Upload failed: ' + err.message;
        }

        this.uploading = false;
    }

    resetForm() {
        this.file = null;
        this.fileName = '';
        this.fileSize = '';
        const fileInput = this.template.querySelector('lightning-input[name="fileUploader"]');
        if (fileInput) {
            fileInput.value = null; // reset file input
        }
    }
}
