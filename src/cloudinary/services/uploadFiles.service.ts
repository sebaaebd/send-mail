import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from '../responses/cloudinary-response';
const path = require('path');
const streamifier = require('streamifier');

@Injectable()
export class UploadFilesService {
  //procesar la respuesta para retornar los link de las imagenes
  async processCloudinaryResponse(
    response: CloudinaryResponse[],
  ): Promise<string[]> {
    const secureUrls: string[] = response.map((res) => res.secure_url);
    return secureUrls;
  }

  //subir y procesar las fotos
  async uploadAndProcessFiles(
    files: Express.Multer.File[],
    folder: string,
  ): Promise<string[]> {
    const cloudinaryResponse: CloudinaryResponse[] = await this.uploadFiles(
      files,
      folder,
    );
    const stageUrls: string[] =
      await this.processCloudinaryResponse(cloudinaryResponse);
    return stageUrls;
  }

  async uploadFiles(
    files: Express.Multer.File[],
    folder: string,
  ): Promise<CloudinaryResponse[]> {
    const uploadPromises: Promise<CloudinaryResponse>[] = [];
    for (const file of files) {
      const uploadPromise = this.uploadFile(file, folder);
      uploadPromises.push(uploadPromise);
    }

    return await Promise.all(uploadPromises);
  }

  private uploadFile(
    file: Express.Multer.File,
    folder: string,
  ): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  /*findOne(id: number) {
    return `This action returns a #${id} cloudinary`;
  }*/
}
