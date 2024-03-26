import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

//aquí se devuelve una promesa, si se sube o no la imagen
