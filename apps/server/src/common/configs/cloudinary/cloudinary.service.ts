import { v2 as cloudinary } from 'cloudinary';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

@Injectable()
export class CloudinaryService {
  async uploadImage(
    buffer: Buffer,
    folder = 'blogs',
  ): Promise<{ url: string; public_id: string }> {
    try {
      return await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder,
            transformation: [
              {
                width: 1200,
                crop: 'limit',
                quality: 'auto:best',
                fetch_format: 'auto',
              },
            ],
          },
          (error, result) => {
            if (error || !result) {
              console.error('Cloudinary upload error:', error);
              return reject(
                new InternalServerErrorException('Cloudinary upload failed'),
              );
            }
            resolve({ url: result.secure_url, public_id: result.public_id });
          },
        );

        Readable.from(buffer).pipe(uploadStream);
      });
    } catch {
      throw new InternalServerErrorException('Image upload failed');
    }
  }
}
