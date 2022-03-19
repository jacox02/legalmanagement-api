import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import fs from 'fs';

export class FilesService {
  constructor(private readonly configService: ConfigService) {}

  async uploadPublicFile(file: any[], filename: string) {
    const s3 = new S3({
      accessKeyId: this.configService.get('aws_settings.aws_access_key_id'),
      secretAccessKey: this.configService.get('aws_settings.aws_secret_key'),
      region: this.configService.get('aws_settings.aws_region'),
    });

    // const filesStream = fs.createReadStream(file.path);

    file.map(async () => {
      const uploadResult = await s3
        .upload({
          Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
          Body: file,
          Key: filename,
        })
        .promise();

      console.log({ key: uploadResult.Key, url: uploadResult.Location });
    });

    return 'uploadResult';
  }
}
