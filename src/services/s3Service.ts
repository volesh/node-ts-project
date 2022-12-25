import { S3 } from 'aws-sdk';
import { v1 as uuidV1 } from 'uuid';
import path from 'node:path';
import { envConfig } from '../configs';

const s3Bucket = new S3({
    region: envConfig.S3_BUCKET_REGION,
    accessKeyId: envConfig.S3_ACCESS_KEY,
    secretAccessKey: envConfig.S3_SECRET_KEY
});

function fileNameGenerator(fileName:string, folderName:string, userId:string) {
    const extName = path.extname(fileName);

    return `${folderName}/${userId}/${uuidV1()}${extName}`;
}

export async function uploadFile(
    fileToUpload: any,
    folderName: string,
    userId: string
):Promise<S3.ManagedUpload.SendData> {
    return s3Bucket.upload({
        ContentType: fileToUpload.mimetype,
        ACL: 'public-read',
        Body: fileToUpload.data,
        Bucket: envConfig.S3_BUCKET_NAME as string,
        Key: fileNameGenerator(fileToUpload.name, folderName, userId)
    }).promise();
}
