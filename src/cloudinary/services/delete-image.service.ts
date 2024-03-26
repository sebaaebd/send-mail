import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class DeleteImageService {
  async deleteImageByUrl(imageUrl: string): Promise<void> {
    try {
      const publicId = this.getPublicId(imageUrl);
      if (!publicId) {
        throw new Error(
          'No se pudo encontrar el publicId en la URL proporcionada.',
        );
      }
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      throw error;
    }
  }

  private getPublicId(imageUrl: string): string | null {
    const parts = imageUrl.split('/');
    const index = parts.findIndex((part) =>
      part.includes('DragonBall%20Image%20Database'),
    );

    if (index !== -1) {
      const publicIdParts = [
        'DragonBall Image Database',
        ...parts.slice(index + 1),
      ];

      const publicId = publicIdParts
        .map((part) => part.replace(/\.[^.]+$/, ''))
        .join('/');

      return publicId;
    } else {
      return null;
    }
  }
}
