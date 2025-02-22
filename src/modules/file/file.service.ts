import {BadRequestException, Injectable} from '@nestjs/common';
import {S3} from 'aws-sdk';
import {v4 as uuidv4} from 'uuid';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class FileService {
    private s3: S3;

    constructor(private configService: ConfigService) {
        this.s3 = new S3({
            accessKeyId: this.configService.get<string>('B2_ACCESS_KEY_ID') ,
            secretAccessKey: this.configService.get<string>('B2_SECRET_ACCESS_KEY'),
            endpoint: this.configService.get<string>('B2_S3_ENDPOINT'),
            region: this.configService.get<string>('B2_REGION'),
            s3ForcePathStyle: true
        })
    }

    public async uploadFileToB2(file: Express.Multer.File): Promise<string> {
        const bucketName = process.env.B2_BUCKET_NAME;
        if (!bucketName) {
            throw new BadRequestException('Bucket name is not provided');
        }

        const folder = this.getUploadFolder(file.mimetype);
        const fileExtension = file.originalname.split('.').pop();
        const key = `${folder}/${uuidv4()}.${fileExtension}`;
        const uploadResult = await this.s3.upload({
            Bucket: bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'private',
        }).promise()

        return uploadResult.Location;
    }

    private getUploadFolder(mimeType: string): string {
        if (mimeType.startsWith('image/')) {
            return 'images';
        } else if (mimeType.startsWith('video/')) {
            return 'videos';
        } else if (mimeType.startsWith('application/pdf')) {
            return 'documents';
        } else {
            return 'others';
        }
    }

}
