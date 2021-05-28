import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors, post, Request, requestBody, Response, RestBindings} from '@loopback/rest';
import multer from 'multer';
import path from 'path';
import {Servicekeys as keys} from '../keys/services_keys';
import {UserRepository} from '../repositories';
import {JwtService} from '../services/jwt.service';
const cloudinary = require('cloudinary');

require('dotenv').config()

cloudinary.config({
  cloud_name: keys.CLOUDINARY_NAME,
  api_key: keys.CLOUDINARY_API_KEY,
  api_secret: keys.CLOUDINARY_API_SECRET,
})




export class FileUploadController {
  jwtService: JwtService;
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {
    this.jwtService = new JwtService(this.userRepository);
  }
  /**
   *
   * @param response
   * @param request
   */
  @post('/photo-upload', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de la imagen de la persona.',
      },
    },
  })
  async personImage(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const route_image = path.join(__dirname, keys.ROUTE_PROFILE_PHOTOS);
    let res = await this.StoreFileToPath(route_image, keys.NAME_PROFILE_PHOTO, request, response, keys.EXTENSIONS_IMAGE);

    if (!response.req?.file.filename)
      throw new HttpErrors[401]("No existe identidicador.");

    const newPhoto = await cloudinary.v2.uploader.upload(response.req?.file.path, {
      upload_preset: 'PocketTherapy'
    });
    console.log(response.req?.file.filename.toString());
    const user = await this.jwtService.VerifyExistUser(response.req?.file.filename.toString());
    user.photoUrl = newPhoto.url;

    if (!user)
      throw new HttpErrors[401]("Usuario no valido.");


    this.userRepository.replaceById(user.userId, user);

    return res;
  }



  /**
   * Return a config for multer storage
   * @param path
   */
  private GetMulterStorageConfig(path: string) {
    var filename: string = '';
    const storage = multer.diskStorage({
      destination: function (req: any, file: any, cb: any) {
        cb(null, path)
      },
      filename: function (req: any, file: any, cb: any) {
        filename = file.originalname
        cb(null, filename);
      }
    });
    return storage;
  }

  /**
   * store the file in a specific path
   * @param storePath
   * @param request
   * @param response
   */
  private StoreFileToPath(storePath: string, fieldname: string, request: Request, response: Response, acceptedExt: string[]): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      const storage = this.GetMulterStorageConfig(storePath);
      const upload = multer({
        storage: storage,
        fileFilter: function (req: any, file: any, callback: any) {
          var ext = path.extname(file.originalname).toUpperCase();
          if (acceptedExt.includes(ext)) {
            return callback(null, true);
          }
          return callback(new HttpErrors[400]('El formato del archivo no es permitido.'));
        },
        limits: {
          fileSize: keys.MAX_WIDTH_IMAGE
        }
      },
      ).single(fieldname);
      upload(request, response, (err: any) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  }


}